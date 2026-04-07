/**
 * Kwanko (NetAffiliation) Publisher API Integration
 *
 * API docs: https://developers.kwanko.com/Kwanko/index.html
 * Base URL: https://api.kwanko.com
 * Auth: Bearer token
 *
 * Key endpoints:
 * - /publishers/campaigns → list campaigns (response: { campaigns: [...] })
 * - /publishers/ads?ad_types=deeplink → get deeplinks with tracking URLs
 * - /publishers/ads?ad_types=voucher_code → get promo codes
 */

const KWANKO_API_BASE = "https://api.kwanko.com";

async function kwankoFetch<T>(
    endpoint: string,
    token: string,
): Promise<T> {
    const res = await fetch(`${KWANKO_API_BASE}${endpoint}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Kwanko API ${res.status}: ${text}`);
    }

    return res.json() as Promise<T>;
}

export async function syncKwankoData(apiKey: string) {
    if (!apiKey) throw new Error("Missing KWANKO_API_KEY");

    // 1. Fetch all campaigns
    const campaignsData = await kwankoFetch<any>(
        "/publishers/campaigns",
        apiKey
    );
    const campaigns: any[] = campaignsData?.campaigns || [];

    // 2. Fetch deeplinks (tracking URLs)
    const deeplinksData = await kwankoFetch<any>(
        "/publishers/ads?ad_types=deeplink&limit=500",
        apiKey
    );
    const deeplinks: any[] = deeplinksData?.ads || [];

    // Build a map: campaignId → tracking click URL
    const trackingMap = new Map<string, string>();
    for (const dl of deeplinks) {
        const campaignId = String(dl.campaign?.id || "");
        const clickUrl = dl.tracked_material_per_websites?.[0]?.urls?.click || "";
        if (campaignId && clickUrl) {
            trackingMap.set(campaignId, clickUrl);
        }
    }

    // 3. Fetch voucher codes
    const vouchersData = await kwankoFetch<any>(
        "/publishers/ads?ad_types=voucher_code&limit=500",
        apiKey
    );
    const vouchers: any[] = vouchersData?.ads || [];

    // Build voucher list
    const promoCodes = vouchers.map((v: any) => ({
        campaignId: String(v.campaign?.id || ""),
        campaignName: v.campaign?.name || "Unknown",
        code: v.code || "",
        description: v.description || "",
        validFrom: v.validity_date?.start || "",
        validUntil: v.validity_date?.end || "",
    })).filter((v: any) => v.code);

    // 4. Map campaigns to programs with tracking links
    const programs = campaigns.map((c: any) => {
        const cId = String(c.id);
        const trackingUrl = trackingMap.get(cId) || "";
        // For deeplinks, the URL contains {XXX} placeholder for the destination URL
        // Replace it with the campaign's base URL
        const resolvedTrackingUrl = trackingUrl
            ? trackingUrl.replace("{XXX}", encodeURIComponent(c.url || ""))
            : "";

        return {
            id: c.id,
            name: (c.name || "Unknown").trim(),
            website: c.url || "",
            trackingLink: resolvedTrackingUrl,
            status: c.state || "active",
            hasDeeplink: trackingMap.has(cId),
        };
    });

    return {
        syncedAt: new Date().toISOString(),
        programs,
        promoCodes,
        stats: {
            totalCampaigns: campaigns.length,
            withDeeplinks: trackingMap.size,
            withPromoCodes: promoCodes.length,
        },
    };
}
