import fs from "fs";
import path from "path";
import matter from "gray-matter";
import yaml from "js-yaml";

const CONTENT_DIR = path.join(process.cwd(), "content");
const DATA_FILE = path.join(process.cwd(), "data", "affiliate-links.yaml");
const OUTPUT_PATH = path.join(process.cwd(), "public", "sitemap.xml");
const BASE_URL = "https://kado-box.fr";
const today = new Date().toISOString().split("T")[0];

const CATEGORY_SLUGS = ["bio", "premium", "mixte", "lifestyle", "comparatif", "guide", "general"];

// Articles
function findMdxFiles(dir: string): { slug: string; filePath: string }[] {
  if (!fs.existsSync(dir)) return [];
  const results: { slug: string; filePath: string }[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findMdxFiles(fullPath));
    } else if (entry.name.endsWith(".mdx")) {
      results.push({ slug: entry.name.replace(/\.mdx$/, ""), filePath: fullPath });
    }
  }
  return results;
}

const articleEntries: string[] = [];
for (const { slug, filePath } of findMdxFiles(CONTENT_DIR)) {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data } = matter(raw);
  if (data.published === false) continue;
  const date = data.updated || data.date || today;
  const priority = data.featured ? "0.9" : data.category === "code-promo" ? "0.85" : "0.7";
  articleEntries.push(`  <url>
    <loc>${BASE_URL}/article/${slug}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>`);
}

// Boxes
let boxEntries: string[] = [];
if (fs.existsSync(DATA_FILE)) {
  const yamlData = yaml.load(fs.readFileSync(DATA_FILE, "utf-8")) as { boxes?: { slug: string }[] };
  if (yamlData.boxes) {
    boxEntries = yamlData.boxes.map((box) => `  <url>
    <loc>${BASE_URL}/box/${box.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`);
  }
}

// Categories
const categoryEntries = CATEGORY_SLUGS.map((slug) => `  <url>
    <loc>${BASE_URL}/categorie/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`);

// Static pages
const staticPages = [
  { url: "", priority: "1.0", freq: "weekly" },
  { url: "/box-beaute", priority: "0.9", freq: "weekly" },
  { url: "/blog", priority: "0.8", freq: "weekly" },
  { url: "/a-propos", priority: "0.4", freq: "yearly" },
  { url: "/contact", priority: "0.3", freq: "yearly" },
];

const staticEntries = staticPages.map((p) => `  <url>
    <loc>${BASE_URL}${p.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.freq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticEntries.join("\n")}
${boxEntries.join("\n")}
${categoryEntries.join("\n")}
${articleEntries.join("\n")}
</urlset>`;

fs.writeFileSync(OUTPUT_PATH, sitemap);
const total = staticPages.length + boxEntries.length + CATEGORY_SLUGS.length + articleEntries.length;
console.log(`Generated sitemap.xml with ${total} URLs`);
