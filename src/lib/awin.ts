/**
 * AWIN API Integration
 * 
 * Fetches active promotions, generates tracking links,
 * and syncs data back to affiliate-links.yaml
 * 
 * API docs: https://wiki.awin.com/index.php/Publisher_API
 * Rate limit: 20 calls/min
 */

const AWIN_API_BASE = "https://api.awin.com";

interface AwinProgram {
    id: number;
    name: string;
    displayUrl: string;
    clickThroughUrl: string;
    currencyCode: string;
    primaryRegion: string;
    status: string;
    kpiModel: string;
    commissionRange: string;
    commissionValue: string;
}

interface AwinPromotion {
    id: number;
    advertiser: {
        id: number;
        name: string;
    };
    type: string;
    code: string;
    description: string;
    startDate: string;
    endDate: string;
    deepLink: string;
    terms: string;
    exclusiveOffer: boolean;
    commissionGroups: Array<{
        code: string;
        description: string;
    }>;
}

interface AwinTrackingLink {
    url: string;
    shortUrl: string;
}

/**
 * Make an authenticated request to the Awin API
 */
async function awinFetch<T>(
    endpoint: string,
    token: string,
    params?: Record<string, string>
): Promise<T> {
    const url = new URL(`${AWIN_API_BASE}${endpoint}`);
    if (params) {
        Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
    }

    const res = await fetch(url.toString(), {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Awin API ${res.status}: ${text}`);
    }

    return res.json() as Promise<T>;
}

/**
 * Get all active programs the publisher is joined to
 */
export async function getActivePrograms(
    publisherId: string,
    token: string
): Promise<AwinProgram[]> {
    return awinFetch<AwinProgram[]>(
        `/publishers/${publisherId}/programmes`,
        token,
        { relationship: "joined", status: "active" }
    );
}

/**
 * Get promotions (voucher codes & offers) from advertiser programs
 */
export async function getPromotions(
    publisherId: string,
    token: string,
    options?: {
        advertiserId?: string;
        promotionType?: "voucher" | "offer" | "promotion";
        category?: string;
    }
): Promise<AwinPromotion[]> {
    const params: Record<string, string> = {};
    if (options?.advertiserId) params.advertiserId = options.advertiserId;
    if (options?.promotionType) params.promotionType = options.promotionType;
    if (options?.category) params.categoryIds = options.category;

    return awinFetch<AwinPromotion[]>(
        `/publishers/${publisherId}/promotions`,
        token,
        params
    );
}

/**
 * Generate a tracking link for a destination URL
 */
export async function createTrackingLink(
    publisherId: string,
    token: string,
    advertiserId: number,
    destinationUrl: string
): Promise<AwinTrackingLink> {
    const url = `${AWIN_API_BASE}/publishers/${publisherId}/linkbuilder`;

    const res = await fetch(url, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({
            advertiserId,
            destinationUrl,
        }),
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Awin Link Builder ${res.status}: ${text}`);
    }

    return res.json() as Promise<AwinTrackingLink>;
}

/**
 * Build an Awin tracking link using the standard redirect format.
 * No API call needed — works for all joined programs.
 */
function buildTrackingUrl(
    publisherId: string,
    advertiserId: number,
    destinationUrl: string
): string {
    return `https://www.awin1.com/cread.php?awinmid=${advertiserId}&awinaffid=${publisherId}&ued=${encodeURIComponent(destinationUrl)}`;
}

/**
 * Full sync: fetch ALL joined programs, promos, generate links, return structured data
 */
export async function syncAwinData(publisherId: string, token: string) {
    // 1. Get ALL active programs (no filter)
    const programs = await getActivePrograms(publisherId, token);

    // 2. Get active promotions for each program
    const allPromos: AwinPromotion[] = [];
    for (const program of programs) {
        try {
            const promos = await getPromotions(publisherId, token, {
                advertiserId: String(program.id),
            });
            allPromos.push(...promos);
        } catch {
            console.warn(`No promos for ${program.name}`);
        }
        // Rate limit: max 20 calls/min
        await new Promise((r) => setTimeout(r, 3100));
    }

    // 3. Build tracking links using standard Awin redirect format
    return {
        programs: programs.map((p) => ({
            id: p.id,
            name: p.name,
            url: p.displayUrl,
            commission: p.commissionRange || p.commissionValue,
            status: p.status,
            trackingLink: buildTrackingUrl(
                publisherId,
                p.id,
                p.displayUrl.startsWith("http") ? p.displayUrl : `https://${p.displayUrl}`
            ),
        })),
        promotions: allPromos.map((p) => ({
            advertiser: p.advertiser.name,
            advertiserId: p.advertiser.id,
            code: p.code,
            description: p.description,
            type: p.type,
            startDate: p.startDate,
            endDate: p.endDate,
            exclusive: p.exclusiveOffer,
            deepLink: p.deepLink,
        })),
        syncedAt: new Date().toISOString(),
    };
}
