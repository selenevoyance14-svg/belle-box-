#!/usr/bin/env node
/**
 * Generate SVG guide images for new guide articles
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const CONTENT_DIR = path.join(ROOT, "content");
const IMAGES_DIR = path.join(ROOT, "public", "images", "articles");

const GUIDE_PALETTES = [
  { bg1: "#11998e", bg2: "#38ef7d", text: "#fff", accent: "#fff" },
  { bg1: "#2193b0", bg2: "#6dd5ed", text: "#fff", accent: "#fff" },
  { bg1: "#56ab2f", bg2: "#a8e063", text: "#fff", accent: "#fff" },
  { bg1: "#834d9b", bg2: "#d04ed6", text: "#fff", accent: "#fff" },
  { bg1: "#f7971e", bg2: "#ffd200", text: "#333", accent: "#333" },
  { bg1: "#c94b4b", bg2: "#4b134f", text: "#fff", accent: "#fff" },
  { bg1: "#1a1a2e", bg2: "#16213e", text: "#fff", accent: "#e94560" },
  { bg1: "#005c97", bg2: "#363795", text: "#fff", accent: "#fff" },
];

const GUIDES = [
  { slug: "box-beaute-luxe-2026", title: "Box Beauté Luxe", subtitle: "Les meilleures options premium 2026", icon: "💎", palette: 0 },
  { slug: "box-beaute-peau-sensible-2026", title: "Box Peau Sensible", subtitle: "Sans irritants ni allergènes", icon: "🌿", palette: 1 },
  { slug: "box-beaute-homme-2026", title: "Box Beauté Homme", subtitle: "Les meilleures sélections masculines", icon: "✂️", palette: 2 },
  { slug: "resilier-box-beaute-2026", title: "Résilier sa Box", subtitle: "Guide pas à pas 2026", icon: "📋", palette: 3 },
  { slug: "box-beaute-vegan-cruelty-free-2026", title: "Box Vegan & Cruelty-Free", subtitle: "La beauté éthique 2026", icon: "🐰", palette: 4 },
  { slug: "box-beaute-economique-2026", title: "Box Beauté Économique ?", subtitle: "Le calcul complet 2026", icon: "💰", palette: 5 },
  { slug: "box-beaute-maquillage-2026", title: "Box Maquillage", subtitle: "Les meilleures box make-up", icon: "💄", palette: 6 },
  { slug: "box-beaute-personnalisee-2026", title: "Box Personnalisée", subtitle: "Les box qui s'adaptent à vous", icon: "✨", palette: 7 },
  { slug: "premiere-box-beaute-guide-2026", title: "Ma Première Box", subtitle: "Guide débutante 2026", icon: "🎁", palette: 0 },
  { slug: "box-beaute-capillaire-2026", title: "Box Capillaire", subtitle: "Les meilleurs soins cheveux", icon: "💇", palette: 1 },
  { slug: "box-beaute-anti-age-2026", title: "Box Anti-Âge", subtitle: "Pour une peau jeune et lumineuse", icon: "⭐", palette: 2 },
  { slug: "box-beaute-abonnement-annuel-vs-mensuel-2026", title: "Annuel vs Mensuel", subtitle: "Quel abonnement choisir ?", icon: "📅", palette: 3 },
  { slug: "box-beaute-bio-vs-conventionnelle-2026", title: "Box Bio vs Conventionnelle", subtitle: "Laquelle choisir en 2026 ?", icon: "🌱", palette: 4 },
  { slug: "box-beaute-cadeau-noel-anniversaire-2026", title: "Box Cadeau Beauté", subtitle: "Noël et anniversaires 2026", icon: "🎀", palette: 5 },
  { slug: "comment-choisir-box-beaute-2026", title: "Comment Choisir sa Box ?", subtitle: "Guide complet 2026", icon: "🔍", palette: 6 },
];

function escapeXml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function generateSvg(title, subtitle, icon, palette) {
  const p = GUIDE_PALETTES[palette % GUIDE_PALETTES.length];
  const titleFontSize = title.length > 20 ? 36 : title.length > 14 ? 44 : 52;
  const subtitleFontSize = subtitle.length > 35 ? 20 : 22;

  return `<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${p.bg1}"/>
      <stop offset="100%" style="stop-color:${p.bg2}"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="rgba(0,0,0,0.2)"/>
    </filter>
  </defs>
  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>
  <!-- Decorative circles -->
  <circle cx="100" cy="100" r="220" fill="white" opacity="0.05"/>
  <circle cx="1100" cy="530" r="300" fill="white" opacity="0.05"/>
  <circle cx="950" cy="80" r="150" fill="white" opacity="0.04"/>
  <circle cx="200" cy="550" r="180" fill="white" opacity="0.03"/>
  <!-- Guide badge -->
  <rect x="460" y="80" width="280" height="44" rx="22" fill="white" opacity="0.2"/>
  <text x="600" y="110" text-anchor="middle" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="16" font-weight="700" fill="${p.text}" letter-spacing="4">GUIDE 2026</text>
  <!-- Icon -->
  <text x="600" y="240" text-anchor="middle" font-family="system-ui, sans-serif" font-size="80">${icon}</text>
  <!-- Title -->
  <text x="600" y="330" text-anchor="middle" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="${titleFontSize}" font-weight="700" fill="${p.text}" filter="url(#shadow)" letter-spacing="-0.5">${escapeXml(title)}</text>
  <!-- Subtitle -->
  <text x="600" y="380" text-anchor="middle" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="${subtitleFontSize}" font-weight="400" fill="${p.text}" opacity="0.85">${escapeXml(subtitle)}</text>
  <!-- Divider -->
  <rect x="500" y="410" width="200" height="2" rx="1" fill="${p.text}" opacity="0.3"/>
  <!-- Kado branding -->
  <text x="600" y="470" text-anchor="middle" font-family="'Georgia', serif" font-size="22" font-weight="700" fill="${p.text}" opacity="0.6" letter-spacing="2">Kado</text>
  <text x="600" y="500" text-anchor="middle" font-family="system-ui, sans-serif" font-size="14" fill="${p.text}" opacity="0.4">kado-box.fr</text>
</svg>`;
}

function updateMdxFrontmatter(slug, newImagePath) {
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
    console.warn(`  ⚠️  MDX not found for slug: ${slug}`);
    return false;
  }

  let content = fs.readFileSync(mdxPath, "utf-8");
  // Replace the image field in frontmatter
  content = content.replace(
    /^image: ".*?"$/m,
    `image: "${newImagePath}"`
  );
  fs.writeFileSync(mdxPath, content, "utf-8");
  return true;
}

fs.mkdirSync(IMAGES_DIR, { recursive: true });

console.log(`Generating ${GUIDES.length} guide images...\n`);

let success = 0;
for (const guide of GUIDES) {
  const svg = generateSvg(guide.title, guide.subtitle, guide.icon, guide.palette);
  const filename = `${guide.slug}.svg`;
  const filePath = path.join(IMAGES_DIR, filename);
  const imagePath = `/images/articles/${filename}`;

  fs.writeFileSync(filePath, svg, "utf-8");

  const updated = updateMdxFrontmatter(guide.slug, imagePath);
  if (updated) {
    console.log(`✅ ${guide.slug}`);
    success++;
  } else {
    console.log(`❌ ${guide.slug} (MDX not found)`);
  }
}

console.log(`\nDone: ${success}/${GUIDES.length} images generated.`);
