#!/usr/bin/env node
/**
 * Fetch OG images from brand websites for all articles
 * Usage: node scripts/fetch-og-images.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import https from "https";
import http from "http";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const CONTENT_DIR = path.join(ROOT, "content");
const IMAGES_DIR = path.join(ROOT, "public", "images", "articles");

// Article slug → website URL mapping
const ARTICLE_WEBSITES = {
  // Marques
  "weleda-avis-2026": "https://www.weleda.fr/",
  "nuxe-avis-2026": "https://fr.nuxe.com/",
  "dr-pierre-ricaud-avis-2026": "https://www.ricaud.com/fr-fr/",
  "ioma-paris-avis-2026": "https://www.ioma-paris.com/fr",
  "miin-cosmetics-avis-2026": "https://miin-cosmetics.fr/",
  "yesstyle-avis-2026": "https://www.yesstyle.com/",
  "stylevana-avis-2026": "https://www.stylevana.com/fr_FR/",
  "thalgo-avis-2026": "https://www.thalgo.fr/",
  "uriage-avis-2026": "https://www.uriage.fr/",
  "le-rouge-francais-avis-2026": "https://lerougefrancais.com/",
  "magnifaik-avis-2026": "https://www.magnifaik.com/",
  "glamellina-avis-2026": "https://www.glamellinacosmetics.com/",
  "atida-santediscount-avis-2026": "https://www.atida.fr/",
  "miss-monoi-avis-2026": "https://miss-monoi.com/",
  "baija-avis-2026": "https://baija.com/",
  "hellofresh-avis-2026": "https://www.hellofresh.fr/",
  "sarenza-avis-2026": "https://www.sarenza.com/",
  "spartoo-avis-2026": "https://www.spartoo.com/",
  "showroomprive-avis-2026": "https://www.showroomprive.com/",
  "greenweez-avis-2026": "https://www.greenweez.com/",
  "loccitane-avis-2026": "https://fr.loccitane.com/",
  "pranarom-avis-2026": "https://pranarom.fr/",
  "adopt-avis-2026": "https://www.adopt.com/",
  "parfums-moins-cher-avis-2026": "https://www.parfumsmoinschers.com/",
  // Code promo
  "code-promo-cdiscount-fevrier-2026": "https://www.cdiscount.com/",
  "code-promo-blissim-fevrier-2026": "https://www.blissim.fr/",
  "code-promo-lookfantastic-fevrier-2026": "https://www.lookfantastic.fr/",
  "code-promo-biotyfull-box-fevrier-2026": "https://www.biotyfullbox.fr/",
  "code-promo-1001bijoux-fevrier-2026": "https://www.1001-bijoux.fr/",
  "code-promo-thalasso-les-issambres-fevrier-2026": "https://www.thalassoissambres.com/",
  "code-promo-desigual-fevrier-2026": "https://www.desigual.com/fr_FR/",
  "code-promo-laboratoire-d-plantes-fevrier-2026": "https://www.dplantes.com/",
  "code-promo-weleda-fevrier-2026": "https://www.weleda.fr/",
  "code-promo-spartoo-fevrier-2026": "https://www.spartoo.com/",
  "code-promo-hellofresh-fevrier-2026": "https://www.hellofresh.fr/",
  "code-promo-sarenza-fevrier-2026": "https://www.sarenza.com/",
  "code-promo-glamellina-fevrier-2026": "https://www.glamellinacosmetics.com/",
  "code-promo-nuxe-fevrier-2026": "https://fr.nuxe.com/",
  "code-promo-baija-fevrier-2026": "https://baija.com/",
  "code-promo-les-bijoux-de-felys-fevrier-2026": "https://www.lesbijouxdefelys.com/",
  "code-promo-oscaro-fevrier-2026": "https://www.oscaro.com/",
  // Comparatifs
  "blissim-vs-lookfantastic": "https://www.blissim.fr/",
  "meilleures-marques-k-beauty-2026": "https://miin-cosmetics.fr/",
  "seasonly-avis-2026": "https://seasonly.fr/",
  "la-boite-rose-avis-2026": "https://www.laboiterose.fr/",
  "biotyfull-box-vs-blissim": "https://www.biotyfullbox.fr/",
  "weleda-vs-nuxe": "https://www.weleda.fr/",
  "uriage-vs-thalgo": "https://www.uriage.fr/",
  "miin-cosmetics-vs-yesstyle": "https://miin-cosmetics.fr/",
  "yesstyle-vs-stylevana": "https://www.yesstyle.com/",
  "seasonly-vs-dr-pierre-ricaud": "https://seasonly.fr/",
  "le-rouge-francais-vs-magnifaik": "https://lerougefrancais.com/",
  "sarenza-vs-spartoo": "https://www.sarenza.com/",
  "nuxe-vs-uriage": "https://fr.nuxe.com/",
  "nuxe-vs-loccitane": "https://fr.nuxe.com/",
  "weleda-vs-greenweez": "https://www.weleda.fr/",
  "adopt-vs-parfums-moins-cher": "https://www.adopt.com/",
  // Guides
  "meilleures-marques-k-beauty-france-2026": "https://miin-cosmetics.fr/",
  "meilleurs-sites-chaussures-en-ligne-2026": "https://www.sarenza.com/",
  "meilleures-marques-clean-beauty-france-2026": "https://seasonly.fr/",
  "meilleures-parapharmacies-en-ligne-2026": "https://www.atida.fr/",
  "meilleurs-sites-cosmetiques-bio-2026": "https://www.greenweez.com/",
  "meilleurs-parfums-pas-cher-2026": "https://www.adopt.com/",
  // Manual content
  "meilleures-box-beaute-2026": "https://www.biotyfullbox.fr/",
  "biotyfull-box-fevrier-2026-avis": "https://www.biotyfullbox.fr/",
};

// Fetch HTML from URL with redirect following
function fetchHTML(url, maxRedirects = 5) {
  return new Promise((resolve, reject) => {
    if (maxRedirects <= 0) return reject(new Error("Too many redirects"));
    const mod = url.startsWith("https") ? https : http;
    const req = mod.get(
      url,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          Accept: "text/html,application/xhtml+xml",
          "Accept-Language": "fr-FR,fr;q=0.9",
        },
        timeout: 10000,
      },
      (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          const redirect = res.headers.location.startsWith("http")
            ? res.headers.location
            : new URL(res.headers.location, url).href;
          res.resume();
          return fetchHTML(redirect, maxRedirects - 1).then(resolve, reject);
        }
        if (res.statusCode !== 200) {
          res.resume();
          return reject(new Error(`HTTP ${res.statusCode}`));
        }
        const chunks = [];
        res.on("data", (chunk) => chunks.push(chunk));
        res.on("end", () => resolve(Buffer.concat(chunks).toString("utf-8")));
        res.on("error", reject);
      }
    );
    req.on("error", reject);
    req.on("timeout", () => {
      req.destroy();
      reject(new Error("Timeout"));
    });
  });
}

// Extract og:image from HTML
function extractOgImage(html, baseUrl) {
  // Try og:image first
  const ogMatch = html.match(
    /<meta\s+(?:property|name)=["']og:image["']\s+content=["']([^"']+)["']/i
  ) || html.match(
    /<meta\s+content=["']([^"']+)["']\s+(?:property|name)=["']og:image["']/i
  );
  if (ogMatch) {
    let imgUrl = ogMatch[1];
    if (imgUrl.startsWith("//")) imgUrl = "https:" + imgUrl;
    if (imgUrl.startsWith("/")) imgUrl = new URL(imgUrl, baseUrl).href;
    return imgUrl;
  }

  // Try twitter:image
  const twMatch = html.match(
    /<meta\s+(?:property|name)=["']twitter:image["']\s+content=["']([^"']+)["']/i
  ) || html.match(
    /<meta\s+content=["']([^"']+)["']\s+(?:property|name)=["']twitter:image["']/i
  );
  if (twMatch) {
    let imgUrl = twMatch[1];
    if (imgUrl.startsWith("//")) imgUrl = "https:" + imgUrl;
    if (imgUrl.startsWith("/")) imgUrl = new URL(imgUrl, baseUrl).href;
    return imgUrl;
  }

  return null;
}

// Download image to file
function downloadImage(url, filePath) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith("https") ? https : http;
    const doDownload = (downloadUrl, redirectsLeft = 5) => {
      if (redirectsLeft <= 0) return reject(new Error("Too many redirects"));
      const m = downloadUrl.startsWith("https") ? https : http;
      m.get(
        downloadUrl,
        {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
          },
          timeout: 15000,
        },
        (res) => {
          if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
            const redirect = res.headers.location.startsWith("http")
              ? res.headers.location
              : new URL(res.headers.location, downloadUrl).href;
            res.resume();
            return doDownload(redirect, redirectsLeft - 1);
          }
          if (res.statusCode !== 200) {
            res.resume();
            return reject(new Error(`HTTP ${res.statusCode}`));
          }
          const fileStream = fs.createWriteStream(filePath);
          res.pipe(fileStream);
          fileStream.on("finish", () => {
            fileStream.close();
            // Check file is not empty
            const stats = fs.statSync(filePath);
            if (stats.size < 1000) {
              fs.unlinkSync(filePath);
              reject(new Error("Image too small (< 1KB)"));
            } else {
              resolve(stats.size);
            }
          });
          fileStream.on("error", reject);
        }
      ).on("error", reject);
    };
    doDownload(url);
  });
}

// Get file extension from URL or content-type
function getExtension(url) {
  const urlPath = new URL(url).pathname.toLowerCase();
  if (urlPath.endsWith(".png")) return ".png";
  if (urlPath.endsWith(".webp")) return ".webp";
  if (urlPath.endsWith(".svg")) return ".svg";
  if (urlPath.endsWith(".gif")) return ".gif";
  return ".jpg";
}

// Update MDX frontmatter image field
function updateMdxImage(slug, imagePath) {
  // Find MDX file
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
  if (!mdxPath) {
    console.log(`  ⚠ MDX file not found for ${slug}`);
    return false;
  }

  let content = fs.readFileSync(mdxPath, "utf-8");
  content = content.replace(
    /^image: "\/images\/hero-beauty\.png"$/m,
    `image: "${imagePath}"`
  );
  fs.writeFileSync(mdxPath, content, "utf-8");
  return true;
}

// Main
async function main() {
  // Create output directory
  fs.mkdirSync(IMAGES_DIR, { recursive: true });

  const slugs = Object.keys(ARTICLE_WEBSITES);
  console.log(`\nFetching OG images for ${slugs.length} articles...\n`);

  let success = 0;
  let failed = 0;
  const errors = [];

  // Process in batches of 5 to avoid overwhelming servers
  for (let i = 0; i < slugs.length; i += 5) {
    const batch = slugs.slice(i, i + 5);
    const results = await Promise.allSettled(
      batch.map(async (slug) => {
        const url = ARTICLE_WEBSITES[slug];
        try {
          // 1. Fetch HTML
          const html = await fetchHTML(url);

          // 2. Extract OG image
          const ogImageUrl = extractOgImage(html, url);
          if (!ogImageUrl) {
            throw new Error("No og:image found");
          }

          // 3. Download image
          const ext = getExtension(ogImageUrl);
          const filename = `${slug}${ext}`;
          const filePath = path.join(IMAGES_DIR, filename);
          const size = await downloadImage(ogImageUrl, filePath);

          // 4. Update MDX
          const imagePath = `/images/articles/${filename}`;
          updateMdxImage(slug, imagePath);

          console.log(
            `  ✓ ${slug} → ${filename} (${Math.round(size / 1024)}KB)`
          );
          return { slug, filename, size };
        } catch (err) {
          console.log(`  ✗ ${slug} → ${err.message}`);
          errors.push({ slug, url, error: err.message });
          throw err;
        }
      })
    );

    for (const r of results) {
      if (r.status === "fulfilled") success++;
      else failed++;
    }
  }

  console.log(`\n--- Results ---`);
  console.log(`✓ Success: ${success}/${slugs.length}`);
  console.log(`✗ Failed: ${failed}/${slugs.length}`);
  if (errors.length > 0) {
    console.log(`\nFailed articles:`);
    for (const e of errors) {
      console.log(`  - ${e.slug} (${e.url}): ${e.error}`);
    }
  }
}

main().catch(console.error);
