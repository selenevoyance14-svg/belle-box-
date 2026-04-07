/**
 * Affilae Publisher API Integration
 *
 * API: https://rest.affilae.com
 * Auth: Bearer token (from Affilae dashboard → API Tokens)
 *
 * Flow:
 * 1. /publisher/publishers.me → get affiliateProfiles[0]._id
 * 2. /publisher/partnerships.list?affiliateProfile={id} → active partnerships
 * 3. /publisher/ads.list?affiliateProfile={id} → ads/creatives
 * 4. /publisher/vouchers.list → promo codes
 * 5. POST /common/tracking/url.build → generate tracking links
 */

const AFFILAE_API_BASE = "https://rest.affilae.com";

async function affilaeFetch<T>(
    endpoint: string,
    token: string
): Promise<T> {
    const res = await fetch(`${AFFILAE_API_BASE}${endpoint}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Affilae API ${res.status}: ${text}`);
    }

    return res.json() as Promise<T>;
}

async function affilaePost<T>(
    endpoint: string,
    token: string,
    body: Record<string, unknown>
): Promise<T> {
    const res = await fetch(`${AFFILAE_API_BASE}${endpoint}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Affilae API POST ${res.status}: ${text}`);
    }

    return res.json() as Promise<T>;
}

function extractArray(data: unknown): any[] {
    if (Array.isArray(data)) return data;
    if (data && typeof data === "object") {
        const obj = data as Record<string, unknown>;
        // Try common keys - also handle nested { key: { data: [...] } }
        for (const key of ["data", "partnerships", "ads", "items", "vouchers"]) {
            const val = obj[key];
            if (Array.isArray(val)) return val as any[];
            if (val && typeof val === "object" && !Array.isArray(val)) {
                const inner = val as Record<string, unknown>;
                if (Array.isArray(inner.data)) return inner.data as any[];
            }
        }
        // Fallback: find first array value in any key
        for (const val of Object.values(obj)) {
            if (Array.isArray(val)) return val as any[];
            if (val && typeof val === "object" && !Array.isArray(val)) {
                const inner = val as Record<string, unknown>;
                if (Array.isArray(inner.data)) return inner.data as any[];
            }
        }
    }
    return [];
}

export async function syncAffilaeData(apiKey: string) {
    if (!apiKey) throw new Error("Missing AFFILAE_API_KEY");

    // 1. Get publisher profile to extract affiliateProfile ID
    const profile = await affilaeFetch<any>(
        "/publisher/publishers.me",
        apiKey
    );

    // affiliateProfiles can be { data: [...] } or a direct array
    const rawProfiles = profile?.affiliateProfiles;
    const affiliateProfiles: any[] = Array.isArray(rawProfiles)
        ? rawProfiles
        : Array.isArray(rawProfiles?.data)
            ? rawProfiles.data
            : [];
    const affiliateProfileId: string = affiliateProfiles[0]?._id || affiliateProfiles[0]?.id || "";

    if (!affiliateProfileId) {
        return {
            syncedAt: new Date().toISOString(),
            profileId: null,
            programs: [],
            ads: [],
            vouchers: [],
            _debug: {
                error: "No affiliateProfile found in publishers.me response",
                profileKeys: profile ? Object.keys(profile) : [],
                affiliateProfiles,
            },
        };
    }

    // 2. Get partnerships with affiliateProfile param
    const partnershipsData = await affilaeFetch<any>(
        `/publisher/partnerships.list?affiliateProfile=${affiliateProfileId}`,
        apiKey
    );
    const partnerships = extractArray(partnershipsData);

    // 3. Get ads with affiliateProfile param (REQUIRED)
    let ads: any[] = [];
    try {
        const adsData = await affilaeFetch<any>(
            `/publisher/ads.list?affiliateProfile=${affiliateProfileId}`,
            apiKey
        );
        ads = extractArray(adsData);
    } catch {
        // Non-critical
    }

    // 4. Get vouchers (promo codes)
    let vouchers: any[] = [];
    try {
        const vouchersData = await affilaeFetch<any>(
            "/publisher/vouchers.list",
            apiKey
        );
        vouchers = extractArray(vouchersData);
    } catch {
        // Non-critical
    }

    // 5. Build tracking maps from ads
    // Map: programId → { trackingDomain, trackingId } for building tracking URLs
    const adTrackingMap = new Map<string, { domain: string; trackingId: number; url: string }>();
    for (const ad of ads) {
        const programId = typeof ad.program === "string" ? ad.program : (ad.program?._id || ad.program?.id || "");
        if (programId && ad.trackingDomain && ad.trackingId && !adTrackingMap.has(programId)) {
            adTrackingMap.set(programId, {
                domain: ad.trackingDomain,
                trackingId: ad.trackingId,
                url: ad.url || "",
            });
        }
    }

    // 6. Build programs with tracking links
    const programs = [];
    let firstTrackingError = "";
    for (const p of partnerships) {
        const partnershipId = p._id || p.id || "";
        const programId = p.program?._id || p.program?.id || "";
        const name = p.program?.name || p.advertiserName || p.name || "Unknown";
        const website = p.program?.url || p.url || p.website || "";

        let trackingLink = p.trackingUrl || p.tracking_url || p.trackingLink || "";

        // Build tracking URL from ad data if available
        if (!trackingLink && adTrackingMap.has(programId)) {
            const adInfo = adTrackingMap.get(programId)!;
            // Affilae tracking URL format: https://{domain}/r/?p={programId}&af={profileId}&lp={encodedUrl}
            trackingLink = `https://${adInfo.domain}/r/?p=${programId}&af=${affiliateProfileId}&lp=${encodeURIComponent(website || adInfo.url)}`;
        }

        // Fallback: try POST /common/tracking/url.build (without affiliateProfile in body)
        if (!trackingLink && website && partnershipId && programs.filter(pr => !pr.trackingLink).length < 3) {
            try {
                const trackingData = await affilaePost<any>(
                    "/common/tracking/url.build",
                    apiKey,
                    {
                        partnership: partnershipId,
                        url: website,
                    }
                );
                trackingLink = trackingData?.url || trackingData?.trackingUrl || "";
            } catch (e) {
                if (!firstTrackingError) {
                    firstTrackingError = e instanceof Error ? e.message : String(e);
                }
            }
        }

        programs.push({
            id: partnershipId,
            name,
            website,
            trackingLink,
            status: p.status || "active",
        });
    }

    return {
        syncedAt: new Date().toISOString(),
        profileId: affiliateProfileId,
        programs,
        ads,
        vouchers,
        _debug: {
            affiliateProfileId,
            affiliateProfilesCount: affiliateProfiles.length,
            partnershipsRawKeys: partnershipsData && !Array.isArray(partnershipsData) ? Object.keys(partnershipsData) : ["(array)"],
            partnershipsRawShape: (() => {
                if (!partnershipsData || typeof partnershipsData !== "object") return String(partnershipsData);
                const obj = partnershipsData as Record<string, unknown>;
                const shape: Record<string, string> = {};
                for (const [k, v] of Object.entries(obj)) {
                    if (Array.isArray(v)) shape[k] = `array(${v.length})`;
                    else if (v && typeof v === "object") {
                        const inner = v as Record<string, unknown>;
                        const innerKeys = Object.keys(inner);
                        shape[k] = `object{${innerKeys.join(",")}}`;
                        if (Array.isArray(inner.data)) shape[k] += `->data(${(inner.data as any[]).length})`;
                    }
                    else shape[k] = typeof v;
                }
                return shape;
            })(),
            partnershipsCount: partnerships.length,
            firstPartnership: partnerships.length > 0 ? partnerships[0] : null,
            adsCount: ads.length,
            firstAd: ads.length > 0 ? ads[0] : null,
            adTrackingMapSize: adTrackingMap.size,
            firstTrackingError: firstTrackingError || null,
            programsWithTracking: programs.filter(p => p.trackingLink).length,
            vouchersCount: vouchers.length,
        },
    };
}
