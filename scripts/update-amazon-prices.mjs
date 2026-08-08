import fs from "node:fs/promises";
import path from "node:path";
import yaml from "js-yaml";

const ROOT = process.cwd();
const CATALOG_FILE = path.join(ROOT, "data", "amazon-catalog.yaml");
const MARKETPLACE = process.env.AMAZON_MARKETPLACE || "www.amazon.fr";
const PARTNER_TAG = process.env.AMAZON_PARTNER_TAG || "lebrunnathali-21";
const VERSION = process.env.AMAZON_CREATORS_CREDENTIAL_VERSION || "3.2";
const CREDENTIAL_ID = process.env.AMAZON_CREATORS_CREDENTIAL_ID;
const CREDENTIAL_SECRET = process.env.AMAZON_CREATORS_CREDENTIAL_SECRET;

const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function getToken() {
  if (!CREDENTIAL_ID || !CREDENTIAL_SECRET) {
    throw new Error("Identifiants Amazon Creators API manquants");
  }
  const tokenUrl = VERSION.startsWith("3.")
    ? "https://api.amazon.co.uk/auth/o2/token"
    : "https://creatorsapi.auth.eu-south-2.amazoncognito.com/oauth2/token";
  const isV3 = VERSION.startsWith("3.");
  const response = await fetch(tokenUrl, {
    method: "POST",
    headers: { "content-type": isV3 ? "application/json" : "application/x-www-form-urlencoded" },
    body: isV3
      ? JSON.stringify({
          grant_type: "client_credentials",
          client_id: CREDENTIAL_ID,
          client_secret: CREDENTIAL_SECRET,
          scope: "creatorsapi::default",
        })
      : new URLSearchParams({
          grant_type: "client_credentials",
          client_id: CREDENTIAL_ID,
          client_secret: CREDENTIAL_SECRET,
          scope: "creatorsapi/default",
        }),
  });
  const body = await response.json();
  if (!response.ok || !body.access_token) {
    throw new Error(`Authentification Amazon ${response.status}: ${JSON.stringify(body).slice(0, 300)}`);
  }
  return body.access_token;
}

async function getItems(token, asins) {
  const response = await fetch("https://creatorsapi.amazon/catalog/v1/getItems", {
    method: "POST",
    headers: {
      authorization: VERSION.startsWith("2.") ? `Bearer ${token}, Version ${VERSION}` : `Bearer ${token}`,
      "content-type": "application/json",
      "x-marketplace": MARKETPLACE,
    },
    body: JSON.stringify({
      itemIds: asins,
      itemIdType: "ASIN",
      marketplace: MARKETPLACE,
      partnerTag: PARTNER_TAG,
      resources: [
        "images.primary.large",
        "itemInfo.title",
        "offersV2.listings.price",
        "offersV2.listings.availability",
      ],
    }),
  });
  const text = await response.text();
  if (!response.ok) throw new Error(`Creators API ${response.status}: ${text.slice(0, 500)}`);
  return JSON.parse(text)?.itemsResult?.items || [];
}

async function main() {
  const catalog = yaml.load(await fs.readFile(CATALOG_FILE, "utf8"));
  if (!Array.isArray(catalog?.products) || catalog.products.length === 0) {
    throw new Error("Catalogue Kado Box introuvable ou vide");
  }

  const token = await getToken();
  const byAsin = new Map(catalog.products.map((product) => [String(product.asin), product]));
  const asins = [...byAsin.keys()];
  const updatedAt = new Date().toISOString();
  let updated = 0;

  for (let index = 0; index < asins.length; index += 10) {
    const batch = asins.slice(index, index + 10);
    let items;
    try {
      items = await getItems(token, batch);
    } catch (error) {
      console.error(`Lot ${index / 10 + 1}: ${error.message}`);
      await pause(1200);
      continue;
    }

    for (const item of items) {
      const product = byAsin.get(String(item.asin));
      if (!product) continue;
      const offer = item.offersV2?.listings?.[0];
      const price = offer?.price?.money?.amount;
      const title = item.itemInfo?.title?.displayValue;
      const image = item.images?.primary?.large?.url;
      if (!Number.isFinite(price) || !title || !image) continue;

      product.title = title;
      product.price = price;
      product.image = image;
      product.affiliate_url = item.detailPageURL || `https://www.amazon.fr/dp/${item.asin}?tag=${PARTNER_TAG}`;
      product.amazon_updated_at = updatedAt;
      delete product.rating;
      delete product.reviews_count;
      updated += 1;
    }

    console.log(`${Math.min(index + 10, asins.length)}/${asins.length} ASIN traités · ${updated} prix valides`);
    if (index + 10 < asins.length) await pause(1100);
  }

  if (updated === 0) {
    throw new Error("Aucun prix Amazon reçu : le catalogue existant est conservé");
  }

  catalog.generated_at = updatedAt;
  catalog.count = catalog.products.length;
  await fs.writeFile(CATALOG_FILE, yaml.dump(catalog, { lineWidth: 140, noRefs: true }), "utf8");
  console.log(`Catalogue conservé : ${catalog.products.length} produits · ${updated} produits actualisés`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
