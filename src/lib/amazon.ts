/**
 * Amazon Creators API Client (replaces PA-API 5.0)
 * Region: Europe (v2.2)
 * OAuth 2.0 Client Credentials flow via Amazon Cognito
 *
 * Env vars needed:
 *   AMAZON_CREDENTIAL_ID     — from Associates Central → Creators API
 *   AMAZON_CREDENTIAL_SECRET — from Associates Central → Creators API
 *   AMAZON_PARTNER_TAG       — your affiliate tag (e.g. mytag-21)
 *
 * Legacy vars (kept for backwards compat during migration):
 *   AMAZON_ACCESS_KEY  → falls back as CREDENTIAL_ID
 *   AMAZON_SECRET_KEY  → falls back as CREDENTIAL_SECRET
 */

const API_BASE = 'https://creatorsapi.amazon/catalog/v1';
const MARKETPLACE = 'www.amazon.fr';

// Regional token endpoints and API versions
const REGIONS = {
    eu:   { url: 'https://creatorsapi.auth.eu-south-2.amazoncognito.com/oauth2/token', version: '2.2' },
    na:   { url: 'https://creatorsapi.auth.us-east-1.amazoncognito.com/oauth2/token', version: '2.1' },
    fe:   { url: 'https://creatorsapi.auth.us-west-2.amazoncognito.com/oauth2/token', version: '2.3' },
} as const;

// Default to EU for amazon.fr, but can be overridden
const DEFAULT_REGION = (process.env.AMAZON_REGION as keyof typeof REGIONS) || 'eu';

// In-memory token cache
let cachedToken: { token: string; expiresAt: number; version: string } | null = null;

function getCredentials() {
    const credentialId = process.env.AMAZON_CREDENTIAL_ID || process.env.AMAZON_ACCESS_KEY;
    const credentialSecret = process.env.AMAZON_CREDENTIAL_SECRET || process.env.AMAZON_SECRET_KEY;
    const partnerTag = process.env.AMAZON_PARTNER_TAG;

    if (!credentialId || !credentialSecret || !partnerTag) {
        throw new Error(
            'Missing Amazon Creators API credentials. Set AMAZON_CREDENTIAL_ID, AMAZON_CREDENTIAL_SECRET, and AMAZON_PARTNER_TAG.'
        );
    }

    return { credentialId, credentialSecret, partnerTag };
}

/**
 * Try to get an OAuth token from a specific region endpoint.
 */
async function tryTokenForRegion(
    credentialId: string,
    credentialSecret: string,
    regionKey: string,
    tokenUrl: string,
): Promise<{ token: string; error?: never } | { token?: never; error: string }> {
    const basicAuth = Buffer.from(`${credentialId}:${credentialSecret}`).toString('base64');

    const response = await fetch(tokenUrl, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${basicAuth}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials&scope=creatorsapi/default',
    });

    if (!response.ok) {
        const text = await response.text();
        return { error: `${regionKey}: ${response.status} ${text.slice(0, 150)}` };
    }

    const data = await response.json();
    if (!data.access_token) {
        return { error: `${regionKey}: no access_token in response` };
    }

    return { token: data.access_token };
}

/**
 * Get an OAuth 2.0 access token via client_credentials grant.
 * Tries the default region first, then all others as fallback.
 * Tokens are cached for ~59 minutes (they last 1 hour).
 */
async function getAccessToken(): Promise<{ token: string; version: string }> {
    const { credentialId, credentialSecret } = getCredentials();

    // Return cached token if still valid
    if (cachedToken && Date.now() < cachedToken.expiresAt) {
        return { token: cachedToken.token, version: cachedToken.version };
    }

    // Try default region first
    const defaultReg = REGIONS[DEFAULT_REGION];
    const defaultResult = await tryTokenForRegion(credentialId, credentialSecret, DEFAULT_REGION, defaultReg.url);

    if (defaultResult.token) {
        cachedToken = { token: defaultResult.token, version: defaultReg.version, expiresAt: Date.now() + 3570_000 };
        return { token: defaultResult.token, version: defaultReg.version };
    }

    // Try other regions as fallback
    const errors = [defaultResult.error!];
    for (const [key, reg] of Object.entries(REGIONS)) {
        if (key === DEFAULT_REGION) continue;
        const result = await tryTokenForRegion(credentialId, credentialSecret, key, reg.url);
        if (result.token) {
            cachedToken = { token: result.token, version: reg.version, expiresAt: Date.now() + 3570_000 };
            console.log(`Amazon OAuth: authenticated via ${key} region (not default ${DEFAULT_REGION})`);
            return { token: result.token, version: reg.version };
        }
        errors.push(result.error!);
    }

    throw new Error(`Amazon OAuth failed on all regions:\n${errors.join('\n')}`);
}

/**
 * Diagnostic: test all regions and report which work.
 */
export async function diagnosAmazonAuth() {
    const { credentialId, credentialSecret } = getCredentials();
    const results: Record<string, string> = {};

    for (const [key, reg] of Object.entries(REGIONS)) {
        const r = await tryTokenForRegion(credentialId, credentialSecret, key, reg.url);
        results[key] = r.token ? `OK (version ${reg.version})` : r.error!;
    }

    return {
        credential_id_prefix: credentialId.slice(0, 8) + '...',
        partner_tag: process.env.AMAZON_PARTNER_TAG,
        regions: results,
    };
}

/**
 * Make an authenticated request to the Creators API.
 */
async function creatorsApiRequest(operation: string, body: Record<string, any>) {
    const { token, version } = await getAccessToken();

    const response = await fetch(`${API_BASE}/${operation}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}, Version ${version}`,
            'x-marketplace': MARKETPLACE,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        const text = await response.text();
        console.error(`Amazon Creators API Error (${operation}):`, text);
        try {
            const errJson = JSON.parse(text);
            const errMsg = errJson.errors?.[0]?.message || errJson.message || errJson.__type || text.slice(0, 200);
            throw new Error(`Amazon Creators API ${response.status}: ${errMsg}`);
        } catch (parseErr) {
            if (parseErr instanceof SyntaxError) {
                throw new Error(`Amazon Creators API ${response.status}: ${text.slice(0, 200)}`);
            }
            throw parseErr;
        }
    }

    return response.json();
}

/**
 * Search for items on Amazon.
 * Returns normalized results compatible with the rest of the codebase.
 */
export async function searchAmazonItems(keywords: string, limit: number = 1) {
    const { partnerTag } = getCredentials();

    const data = await creatorsApiRequest('searchItems', {
        keywords,
        resources: [
            'itemInfo.title',
            'itemInfo.features',
            'itemInfo.productInfo',
            'offersV2.listings.price',
            'images.primary.large',
        ],
        partnerTag,
        partnerType: 'associates',
        marketplace: MARKETPLACE,
        itemCount: Math.min(limit, 10),
    });

    // Creators API uses camelCase in responses
    const items = data.searchResult?.items || data.SearchResult?.Items || [];

    return items.map((item: any) => ({
        asin: item.asin || item.ASIN,
        title: item.itemInfo?.title?.displayValue || item.ItemInfo?.Title?.DisplayValue,
        url: item.detailPageUrl || item.DetailPageURL,
        price: item.offersV2?.listings?.[0]?.price?.displayAmount
            || item.offers?.listings?.[0]?.price?.displayAmount,
        image: item.images?.primary?.large?.url || item.Images?.Primary?.Large?.URL,
        features: item.itemInfo?.features?.displayValues
            || item.ItemInfo?.Features?.DisplayValues || [],
    }));
}
