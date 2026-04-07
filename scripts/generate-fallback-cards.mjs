#!/usr/bin/env node
/**
 * Generate branded SVG cards for articles that failed OG image extraction.
 * Uses Google's Favicon API for brand logos.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import https from "https";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const CONTENT_DIR = path.join(ROOT, "content");
const IMAGES_DIR = path.join(ROOT, "public", "images", "articles");

// Failed articles: slug → { domain, brandName, category }
const FAILED_ARTICLES = {
  "nuxe-avis-2026": { domain: "fr.nuxe.com", brand: "Nuxe", cat: "test" },
  "dr-pierre-ricaud-avis-2026": { domain: "ricaud.com", brand: "Dr Pierre Ricaud", cat: "test" },
  "miin-cosmetics-avis-2026": { domain: "miin-cosmetics.fr", brand: "MiiN Cosmetics", cat: "test" },
  "yesstyle-avis-2026": { domain: "yesstyle.com", brand: "YesStyle", cat: "test" },
  "stylevana-avis-2026": { domain: "stylevana.com", brand: "Stylevana", cat: "test" },
  "thalgo-avis-2026": { domain: "thalgo.fr", brand: "Thalgo", cat: "test" },
  "uriage-avis-2026": { domain: "uriage.fr", brand: "Uriage", cat: "test" },
  "le-rouge-francais-avis-2026": { domain: "lerougefrancais.com", brand: "Le Rouge Français", cat: "test" },
  "atida-santediscount-avis-2026": { domain: "atida.fr", brand: "Atida", cat: "test" },
  "miss-monoi-avis-2026": { domain: "miss-monoi.com", brand: "Miss Monoï", cat: "test" },
  "glamellina-avis-2026": { domain: "glamellinacosmetics.com", brand: "Glamellina", cat: "test" },
  "showroomprive-avis-2026": { domain: "showroomprive.com", brand: "Showroomprivé", cat: "test" },
  "spartoo-avis-2026": { domain: "spartoo.com", brand: "Spartoo", cat: "test" },
  "sarenza-avis-2026": { domain: "sarenza.com", brand: "Sarenza", cat: "test" },
  "greenweez-avis-2026": { domain: "greenweez.com", brand: "Greenweez", cat: "test" },
  "parfums-moins-cher-avis-2026": { domain: "parfumsmoinschers.com", brand: "Parfums Moins Cher", cat: "test" },
  // Code promo
  "code-promo-cdiscount-fevrier-2026": { domain: "cdiscount.com", brand: "Cdiscount", cat: "code-promo" },
  "code-promo-lookfantastic-fevrier-2026": { domain: "lookfantastic.fr", brand: "Lookfantastic", cat: "code-promo" },
  "code-promo-thalasso-les-issambres-fevrier-2026": { domain: "thalassoissambres.com", brand: "Thalasso Issambres", cat: "code-promo" },
  "code-promo-desigual-fevrier-2026": { domain: "desigual.com", brand: "Desigual", cat: "code-promo" },
  "code-promo-spartoo-fevrier-2026": { domain: "spartoo.com", brand: "Spartoo", cat: "code-promo" },
  "code-promo-sarenza-fevrier-2026": { domain: "sarenza.com", brand: "Sarenza", cat: "code-promo" },
  "code-promo-nuxe-fevrier-2026": { domain: "fr.nuxe.com", brand: "Nuxe", cat: "code-promo" },
  "code-promo-glamellina-fevrier-2026": { domain: "glamellinacosmetics.com", brand: "Glamellina", cat: "code-promo" },
  "code-promo-les-bijoux-de-felys-fevrier-2026": { domain: "lesbijouxdefelys.com", brand: "Les Bijoux de Félys", cat: "code-promo" },
  "code-promo-milan-jeunesse-fevrier-2026": { domain: "milan.fr", brand: "Milan Jeunesse", cat: "code-promo" },
  // Comparatifs
  "meilleures-marques-k-beauty-2026": { domain: "miin-cosmetics.fr", brand: "K-Beauty", cat: "comparatif" },
  "yesstyle-vs-stylevana": { domain: "yesstyle.com", brand: "YesStyle vs Stylevana", cat: "comparatif" },
  "miin-cosmetics-vs-yesstyle": { domain: "miin-cosmetics.fr", brand: "MiiN vs YesStyle", cat: "comparatif" },
  "uriage-vs-thalgo": { domain: "uriage.fr", brand: "Uriage vs Thalgo", cat: "comparatif" },
  "sarenza-vs-spartoo": { domain: "sarenza.com", brand: "Sarenza vs Spartoo", cat: "comparatif" },
  "nuxe-vs-uriage": { domain: "fr.nuxe.com", brand: "Nuxe vs Uriage", cat: "comparatif" },
  "nuxe-vs-loccitane": { domain: "fr.nuxe.com", brand: "Nuxe vs L'Occitane", cat: "comparatif" },
  "le-rouge-francais-vs-magnifaik": { domain: "lerougefrancais.com", brand: "Le Rouge Fr. vs Magnifaik", cat: "comparatif" },
  // Guides
  "meilleurs-sites-chaussures-en-ligne-2026": { domain: "sarenza.com", brand: "Chaussures en Ligne", cat: "guide" },
  "meilleures-marques-k-beauty-france-2026": { domain: "miin-cosmetics.fr", brand: "K-Beauty France", cat: "guide" },
  "meilleurs-sites-cosmetiques-bio-2026": { domain: "greenweez.com", brand: "Cosmétique Bio", cat: "guide" },
  "meilleures-parapharmacies-en-ligne-2026": { domain: "atida.fr", brand: "Parapharmacies", cat: "guide" },
};

// Color palettes per category
const PALETTES = {
  test: [
    { bg1: "#667eea", bg2: "#764ba2", text: "#fff" },
    { bg1: "#f093fb", bg2: "#f5576c", text: "#fff" },
    { bg1: "#4facfe", bg2: "#00f2fe", text: "#fff" },
    { bg1: "#43e97b", bg2: "#38f9d7", text: "#fff" },
    { bg1: "#fa709a", bg2: "#fee140", text: "#fff" },
    { bg1: "#a18cd1", bg2: "#fbc2eb", text: "#fff" },
  ],
  "code-promo": [
    { bg1: "#f7971e", bg2: "#ffd200", text: "#333" },
    { bg1: "#fc4a1a", bg2: "#f7b733", text: "#fff" },
    { bg1: "#ee0979", bg2: "#ff6a00", text: "#fff" },
  ],
  comparatif: [
    { bg1: "#2c3e50", bg2: "#3498db", text: "#fff" },
    { bg1: "#0f2027", bg2: "#2c5364", text: "#fff" },
    { bg1: "#1a2a6c", bg2: "#b21f1f", text: "#fff" },
  ],
  guide: [
    { bg1: "#11998e", bg2: "#38ef7d", text: "#fff" },
    { bg1: "#56ab2f", bg2: "#a8e063", text: "#fff" },
    { bg1: "#2193b0", bg2: "#6dd5ed", text: "#fff" },
  ],
};

// Fetch favicon from Google API
function fetchFavicon(domain) {
  return new Promise((resolve, reject) => {
    const url = `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${domain}&size=128`;
    https.get(url, { timeout: 10000 }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        // Follow redirect
        https.get(res.headers.location, { timeout: 10000 }, (res2) => {
          const chunks = [];
          res2.on("data", (c) => chunks.push(c));
          res2.on("end", () => resolve(Buffer.concat(chunks)));
          res2.on("error", reject);
        }).on("error", reject);
        res.resume();
        return;
      }
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => resolve(Buffer.concat(chunks)));
      res.on("error", reject);
    }).on("error", reject);
  });
}

// Generate SVG card
function generateSvgCard(brandName, logoBase64, palette, category) {
  const labelMap = { test: "AVIS 2026", "code-promo": "CODE PROMO", comparatif: "COMPARATIF", guide: "GUIDE 2026" };
  const label = labelMap[category] || "";

  // Adjust font size based on brand name length
  const fontSize = brandName.length > 20 ? 28 : brandName.length > 14 ? 34 : 42;

  return `<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${palette.bg1}"/>
      <stop offset="100%" style="stop-color:${palette.bg2}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <!-- Decorative circles -->
  <circle cx="100" cy="100" r="200" fill="white" opacity="0.05"/>
  <circle cx="1100" cy="530" r="300" fill="white" opacity="0.05"/>
  <circle cx="900" cy="80" r="120" fill="white" opacity="0.04"/>
  <!-- Logo -->
  ${logoBase64 ? `<image x="540" y="140" width="120" height="120" href="data:image/png;base64,${logoBase64}" style="border-radius:16px"/>` : ""}
  ${logoBase64 ? `<rect x="540" y="140" width="120" height="120" rx="16" fill="white" opacity="0.15"/>` : ""}
  <!-- Brand name -->
  <text x="600" y="${logoBase64 ? 340 : 300}" text-anchor="middle" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="${fontSize}" font-weight="700" fill="${palette.text}" letter-spacing="1">${escapeXml(brandName)}</text>
  <!-- Category label -->
  <rect x="${600 - label.length * 7}" y="370" width="${label.length * 14 + 40}" height="36" rx="18" fill="white" opacity="0.2"/>
  <text x="600" y="394" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="600" fill="${palette.text}" letter-spacing="3">${label}</text>
  <!-- Kado branding -->
  <text x="600" y="570" text-anchor="middle" font-family="'Georgia', serif" font-size="20" fill="${palette.text}" opacity="0.5">kado-box.fr</text>
</svg>`;
}

function escapeXml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

// Update MDX frontmatter
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
    /^image: "\/images\/hero-beauty\.png"$/m,
    `image: "${imagePath}"`
  );
  fs.writeFileSync(mdxPath, content, "utf-8");
  return true;
}

async function main() {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });

  const slugs = Object.keys(FAILED_ARTICLES);
  console.log(`Generating ${slugs.length} branded cards...\n`);

  let success = 0;
  // Track which domain logos we've already fetched
  const logoCache = new Map();

  for (const slug of slugs) {
    const { domain, brand, cat } = FAILED_ARTICLES[slug];
    const palettes = PALETTES[cat] || PALETTES.test;
    const palette = palettes[success % palettes.length];

    try {
      // Fetch logo (with cache)
      let logoBase64 = "";
      if (logoCache.has(domain)) {
        logoBase64 = logoCache.get(domain);
      } else {
        try {
          const logoBuffer = await fetchFavicon(domain);
          if (logoBuffer.length > 500) {
            logoBase64 = logoBuffer.toString("base64");
          }
          logoCache.set(domain, logoBase64);
        } catch {
          logoCache.set(domain, "");
        }
      }

      // Generate SVG
      const svg = generateSvgCard(brand, logoBase64, palette, cat);
      const filename = `${slug}.svg`;
      const filePath = path.join(IMAGES_DIR, filename);
      fs.writeFileSync(filePath, svg, "utf-8");

      // Update MDX
      const imagePath = `/images/articles/${filename}`;
      updateMdxImage(slug, imagePath);

      console.log(`  ✓ ${slug} (${logoBase64 ? "with logo" : "text only"})`);
      success++;
    } catch (err) {
      console.log(`  ✗ ${slug}: ${err.message}`);
    }
  }

  console.log(`\n✓ Generated ${success}/${slugs.length} cards`);
}

main().catch(console.error);
