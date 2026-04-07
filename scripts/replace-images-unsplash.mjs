#!/usr/bin/env node
/**
 * Replace all article images with curated Unsplash photos.
 * Downloads high-quality photos by category and updates MDX frontmatter.
 * Photos are matched by brand/topic relevance, not generic categories.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import https from "https";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const CONTENT_DIR = path.join(ROOT, "content");
const IMAGES_DIR = path.join(ROOT, "public", "images", "articles");

// Curated Unsplash photo IDs by specific theme
const PHOTOS = {
  // Skincare products (serums, creams, face care)
  skincare: [
    "1571781926291-c477ebfd024b",  // Curology skincare
    "1556228578-0d85b1a4d571",    // Cleanser on tiles
    "1599847987657-881f11b92a75",  // Skincare routine
    "1581182800629-7d90925ad072",  // Skincare display
    "1586220742613-b731f66f7743",  // Skincare bottles
    "1603401712778-ab0575182f12",  // Skincare routine
    "1573461160327-b450ce3d8e7f",  // Natural skincare
    "1526947425960-945c6e72858f",  // Skincare products
    "1620916297397-a4a5402a3c6c",  // Skincare display
    "1555820585-c5ae44394b79",    // Skincare aesthetic
  ],
  // Makeup & beauty products (lipstick, palettes, brushes)
  beauty: [
    "1596462502278-27bfdc403348",  // Pink makeup flatlay
    "1522335789203-aabd1fc54bc9",  // Bobbi Brown marble flatlay
    "1512496015851-a90fb38ba796",  // NARS/Too Faced flatlay
    "1612817288484-6f916006741a",  // Beauty products
    "1598528738936-c50861cc75a9",  // Cosmetics arrangement
    "1631730486572-226d1f595b68",  // Beauty products display
    "1625753783470-ec2ab4efeeec",  // Makeup collection
    "1608571423902-eed4a5ad8108",  // Cosmetics flatlay
    "1580870069867-74c57ee1bb07",  // Beauty products
    "1608979048467-6194dabc6a3d",  // Cosmetics display
  ],
  // Perfume & fragrance
  perfume: [
    "1724732678052-1437962cbbab",  // Luxury perfume
    "1719175936556-dbd05e415913",  // Perfume bottle
    "1605463967516-b73a52062ab0",  // Fragrance display
    "1758225502621-9102d2856dc8",  // Perfume aesthetic
    "1757313252125-301331e460ed",  // Perfume bottles
    "1709095458514-573bc6277d3d",  // Luxury fragrance
  ],
  // K-beauty / Korean beauty
  kbeauty: [
    "1593638112487-4ddea6affcfb",  // K-beauty products
    "1608248543803-ba4f8c70ae0b",  // Korean beauty
    "1741896136071-3f8c1d472aa8",  // K-beauty skincare
    "1743931112522-42cb833567fb",  // Korean cosmetics
    "1741896136699-7409848e6657",  // K-beauty display
  ],
  // Jewelry & accessories
  jewelry: [
    "1586878341530-8f9fb3d1fa4b",  // Gold jewelry flatlay
    "1558038785-10eab3e800ab",    // Jewelry display
    "1586878340978-f9ca47ad7d72",  // Necklace bracelet
    "1586878341340-1971696a9b71",  // Jewelry collection
    "1657291334522-6c1dfb9e2b35",  // Gold accessories
    "1571975795053-950dbde7dacc",  // Jewelry flatlay
  ],
  // Food, cooking & meal kits
  food: [
    "1613861214310-1be1202c3d74",  // Fresh cooking ingredients
    "1766596663327-b932edfe968b",  // Meal prep
    "1760445278086-d26317282e10",  // Fresh food
    "1625940947631-908aa92ef5e7",  // Cooking ingredients
    "1765267642339-e6e1c8ed5b88",  // Kitchen meal
  ],
  // Spa, wellness & candles (Baija, Thalasso)
  spa: [
    "1620733719521-fa0625956f5c",  // Spa candles wellness
    "1620733723572-11c53f73a416",  // Spa relaxation
    "1619695663878-54176cc579a0",  // Spa atmosphere
    "1554057009-6798cb3d4a04",    // Wellness spa
    "1620733723429-0025a5c38b1a",  // Candles spa
    "1626096181598-9d31320fa9bf",  // Ocean water spa
  ],
  // Shoes & footwear (Sarenza, Spartoo)
  shoes: [
    "1768726050570-1f41d8c4cf25",  // Elegant shoes
    "1768726051057-0e1c597624b2",  // Shoe display
    "1616598697481-aa1ea5405957",  // Heels
    "1599081753802-61f5cd21b8a5",  // Sneakers
    "1558373431-96c230bdbdc1",    // Shoe collection
    "1535043934128-cf0b28d52f95",  // Shoes display
  ],
  // Essential oils & aromatherapy (Pranarom)
  oils: [
    "1588464190748-fd4cf6ab1909",  // Essential oils bottles
    "1720706829416-7960ac09ac75",  // Aromatherapy
    "1623826538391-4e066d422976",  // Oils display
    "1608571424266-edeb9bbefdec",  // Essential oils
    "1608571424634-58ae03e6edcf",  // Aromatherapy bottles
  ],
  // Fashion & clothing (Showroomprivé, Desigual)
  fashion: [
    "1766721322261-e1522331e619",  // Fashion clothing
    "1766934587163-186d20bf3d40",  // Fashion store
    "1655191747652-2ee24a98b9b8",  // Fashion rack
    "1596484552993-aec4311d3381",  // Clothing display
    "1761090617068-f1b3257d27ad",  // Fashion shopping
  ],
  // Lavender & Provence (L'Occitane)
  provence: [
    "1662486717731-293f2b6ebfa2",  // Lavender beauty
    "1593715857983-5531aa640471",  // Lavender provence
    "1657463193799-b73a73c567f8",  // Provence products
    "1657463183551-71e87a1bdd0b",  // Lavender beauty
    "1720473980025-600fdbba2195",  // Provence beauty
  ],
  // Organic / bio / natural products (Greenweez)
  organic: [
    "1593560369164-8f3a8facd0e6",  // Organic natural products
    "1593560368921-9b9fd9e5841f",  // Bio green products
    "1760828379387-0207cb41c436",  // Natural eco
    "1759200569128-35dff4ea2c92",  // Organic beauty
    "1749138197973-b420d5b5886e",  // Green natural
  ],
  // Tropical beauty (Miss Monoï)
  tropical: [
    "1644061922452-64d0f8673fc5",  // Coconut tropical beauty
    "1654615106281-653b305c50f7",  // Tropical beauty
    "1602075848253-084911080ca1",  // Coconut oil
    "1559637621-52003a42b3c7",    // Tropical flowers
    "1652143034765-b321ef833a94",  // Tropical beauty natural
  ],
  // E-commerce / online shopping (Cdiscount)
  ecommerce: [
    "1768987439378-9f6fe29ba975",  // Online shopping
    "1758351507026-71ad3645cb43",  // Package delivery
    "1770013413878-2530e2c3d82b",  // Shopping online
    "1567570670849-79db9c45cd9d",  // E-commerce
    "1631010231931-d2c396b444ec",  // Online shopping
  ],
  // Auto / car parts (Oscaro)
  auto: [
    "1759419281419-b04552b2691a",  // Automotive
    "1767339736277-980a7d7d1fe5",  // Car parts
    "1727413434026-0f8314c037d8",  // Auto workshop
    "1702146713882-2579afb0bfba",  // Car mechanic
  ],
  // Children / books (Milan Jeunesse)
  kids: [
    "1539616471265-f0ee11383bce",  // Children reading
    "1661760070712-9d349a47f483",  // Kids books
    "1649750291589-8812197b698c",  // Children books colorful
    "1573309463410-ed96625bcd16",  // Kids reading
    "1469013078550-305e63b7c8f7",  // Children books
  ],
};

// Map each article to a specific theme and photo index
const ARTICLE_THEMES = {
  // === MARQUES (brand reviews) ===
  // Skincare brands
  "weleda-avis-2026":               { theme: "skincare", idx: 0 },
  "nuxe-avis-2026":                 { theme: "skincare", idx: 1 },
  "dr-pierre-ricaud-avis-2026":     { theme: "skincare", idx: 2 },
  "ioma-paris-avis-2026":           { theme: "skincare", idx: 3 },
  "thalgo-avis-2026":               { theme: "spa", idx: 0 },       // thalasso/spa brand
  "uriage-avis-2026":               { theme: "skincare", idx: 4 },
  "atida-santediscount-avis-2026":  { theme: "skincare", idx: 5 },  // parapharmacie
  // Beauty & makeup brands
  "glamellina-avis-2026":           { theme: "beauty", idx: 0 },
  "le-rouge-francais-avis-2026":    { theme: "beauty", idx: 1 },
  "magnifaik-avis-2026":            { theme: "beauty", idx: 2 },
  // Spa & wellness brands
  "baija-avis-2026":                { theme: "spa", idx: 1 },       // candles, body care
  // Provence / L'Occitane
  "loccitane-avis-2026":            { theme: "provence", idx: 0 },
  // Perfume brands
  "adopt-avis-2026":                { theme: "perfume", idx: 0 },
  "parfums-moins-cher-avis-2026":   { theme: "perfume", idx: 1 },
  // K-beauty brands
  "miin-cosmetics-avis-2026":       { theme: "kbeauty", idx: 0 },
  "yesstyle-avis-2026":             { theme: "kbeauty", idx: 1 },
  "stylevana-avis-2026":            { theme: "kbeauty", idx: 2 },
  // Tropical beauty
  "miss-monoi-avis-2026":           { theme: "tropical", idx: 0 },
  // Natural / organic / bio
  "greenweez-avis-2026":            { theme: "organic", idx: 0 },
  "pranarom-avis-2026":             { theme: "oils", idx: 0 },      // essential oils
  // Shoes & fashion
  "showroomprive-avis-2026":        { theme: "fashion", idx: 0 },
  "spartoo-avis-2026":              { theme: "shoes", idx: 0 },
  "sarenza-avis-2026":              { theme: "shoes", idx: 1 },
  // Food
  "hellofresh-avis-2026":           { theme: "food", idx: 0 },

  // === CODE PROMO ===
  "code-promo-blissim-fevrier-2026":               { theme: "beauty", idx: 3 },
  "code-promo-biotyfull-box-fevrier-2026":          { theme: "beauty", idx: 4 },
  "code-promo-lookfantastic-fevrier-2026":          { theme: "beauty", idx: 5 },
  "code-promo-nuxe-fevrier-2026":                   { theme: "skincare", idx: 6 },
  "code-promo-weleda-fevrier-2026":                 { theme: "skincare", idx: 7 },
  "code-promo-glamellina-fevrier-2026":             { theme: "beauty", idx: 6 },
  "code-promo-baija-fevrier-2026":                  { theme: "spa", idx: 2 },      // spa candles
  "code-promo-laboratoire-d-plantes-fevrier-2026":  { theme: "oils", idx: 1 },     // essential oils
  "code-promo-cdiscount-fevrier-2026":              { theme: "ecommerce", idx: 0 },
  "code-promo-1001bijoux-fevrier-2026":             { theme: "jewelry", idx: 0 },  // BIJOUX
  "code-promo-hellofresh-fevrier-2026":             { theme: "food", idx: 1 },     // NOURRITURE
  "code-promo-desigual-fevrier-2026":               { theme: "fashion", idx: 1 },
  "code-promo-spartoo-fevrier-2026":                { theme: "shoes", idx: 2 },
  "code-promo-sarenza-fevrier-2026":                { theme: "shoes", idx: 3 },
  "code-promo-thalasso-les-issambres-fevrier-2026": { theme: "spa", idx: 5 },     // ocean spa
  "code-promo-oscaro-fevrier-2026":                 { theme: "auto", idx: 0 },     // AUTO
  "code-promo-les-bijoux-de-felys-fevrier-2026":    { theme: "jewelry", idx: 1 },  // BIJOUX
  "code-promo-milan-jeunesse-fevrier-2026":         { theme: "kids", idx: 0 },     // ENFANTS

  // === COMPARATIFS ===
  "blissim-vs-lookfantastic":          { theme: "beauty", idx: 7 },
  "biotyfull-box-vs-blissim":          { theme: "beauty", idx: 8 },
  "weleda-vs-nuxe":                    { theme: "skincare", idx: 8 },
  "weleda-vs-greenweez":               { theme: "organic", idx: 1 },   // natural/bio
  "seasonly-avis-2026":                { theme: "skincare", idx: 9 },
  "seasonly-vs-dr-pierre-ricaud":      { theme: "skincare", idx: 0 },
  "la-boite-rose-avis-2026":          { theme: "beauty", idx: 9 },
  "adopt-vs-parfums-moins-cher":       { theme: "perfume", idx: 2 },
  "meilleures-marques-k-beauty-2026":  { theme: "kbeauty", idx: 3 },
  "yesstyle-vs-stylevana":             { theme: "kbeauty", idx: 4 },
  "miin-cosmetics-vs-yesstyle":        { theme: "kbeauty", idx: 0 },
  "uriage-vs-thalgo":                  { theme: "spa", idx: 3 },      // spa comparison
  "sarenza-vs-spartoo":               { theme: "shoes", idx: 4 },
  "nuxe-vs-uriage":                    { theme: "skincare", idx: 1 },
  "nuxe-vs-loccitane":                 { theme: "provence", idx: 1 },  // lavender
  "le-rouge-francais-vs-magnifaik":    { theme: "beauty", idx: 0 },

  // === GUIDES ===
  "meilleures-marques-clean-beauty-france-2026":  { theme: "organic", idx: 2 },   // clean beauty = bio
  "meilleurs-parfums-pas-cher-2026":               { theme: "perfume", idx: 3 },
  "meilleurs-sites-chaussures-en-ligne-2026":      { theme: "shoes", idx: 5 },
  "meilleures-marques-k-beauty-france-2026":       { theme: "kbeauty", idx: 1 },
  "meilleurs-sites-cosmetiques-bio-2026":          { theme: "organic", idx: 3 },   // bio
  "meilleures-parapharmacies-en-ligne-2026":       { theme: "skincare", idx: 2 },

  // === MANUAL CONTENT ===
  "meilleures-box-beaute-2026":         { theme: "beauty", idx: 5 },
  "biotyfull-box-fevrier-2026-avis":    { theme: "beauty", idx: 6 },
};

// Download image from Unsplash
function downloadImage(photoId, filePath) {
  return new Promise((resolve, reject) => {
    const url = `https://images.unsplash.com/photo-${photoId}?w=1200&h=630&fit=crop&q=80`;
    https.get(url, { timeout: 15000 }, (res) => {
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error(`HTTP ${res.statusCode} for ${photoId}`));
      }
      const fileStream = fs.createWriteStream(filePath);
      res.pipe(fileStream);
      fileStream.on("finish", () => {
        fileStream.close();
        const stats = fs.statSync(filePath);
        resolve(stats.size);
      });
      fileStream.on("error", reject);
    }).on("error", reject);
  });
}

// Find and update MDX frontmatter
function updateMdxImage(slug, imagePath) {
  const findMdx = (dir) => {
    if (!fs.existsSync(dir)) return null;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        const found = findMdx(full);
        if (found) return found;
      } else if (entry.name === `${slug}.mdx`) {
        return full;
      }
    }
    return null;
  };

  const mdxPath = findMdx(CONTENT_DIR);
  if (!mdxPath) return false;

  let content = fs.readFileSync(mdxPath, "utf-8");
  content = content.replace(
    /^image: "\/images\/[^"]*"$/m,
    `image: "${imagePath}"`
  );
  fs.writeFileSync(mdxPath, content, "utf-8");
  return true;
}

async function main() {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });

  // Clean up old images
  const existingFiles = fs.readdirSync(IMAGES_DIR);
  console.log(`Removing ${existingFiles.length} old images...`);
  for (const file of existingFiles) {
    fs.unlinkSync(path.join(IMAGES_DIR, file));
  }

  const slugs = Object.keys(ARTICLE_THEMES);
  console.log(`\nDownloading Unsplash photos for ${slugs.length} articles...\n`);

  const downloaded = new Map();
  let success = 0;

  for (let i = 0; i < slugs.length; i += 5) {
    const batch = slugs.slice(i, i + 5);
    const results = await Promise.allSettled(
      batch.map(async (slug) => {
        const { theme, idx } = ARTICLE_THEMES[slug];
        const photos = PHOTOS[theme];
        if (!photos || photos.length === 0) {
          throw new Error(`No photos for theme: ${theme}`);
        }
        const photoId = photos[idx % photos.length];
        const filename = `${slug}.jpg`;
        const filePath = path.join(IMAGES_DIR, filename);

        if (downloaded.has(photoId)) {
          fs.copyFileSync(path.join(IMAGES_DIR, downloaded.get(photoId)), filePath);
        } else {
          await downloadImage(photoId, filePath);
          downloaded.set(photoId, filename);
        }

        const imagePath = `/images/articles/${filename}`;
        updateMdxImage(slug, imagePath);

        const stats = fs.statSync(filePath);
        console.log(`  ✓ ${slug} [${theme}] → ${Math.round(stats.size / 1024)}KB`);
        return slug;
      })
    );

    for (const r of results) {
      if (r.status === "fulfilled") success++;
      else console.log(`  ✗ ${r.reason?.message || r.reason}`);
    }
  }

  console.log(`\n✓ Done: ${success}/${slugs.length} articles with Unsplash photos`);
}

main().catch(console.error);
