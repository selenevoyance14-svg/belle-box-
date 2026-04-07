/**
 * generate-all-thumbnails.mjs
 * Génère des thumbnails SVG colorés pour tous les articles publiés.
 * Chaque catégorie a une palette, chaque article un emoji/titre unique.
 * Met aussi à jour le frontmatter MDX (.jpg → .svg).
 *
 * Usage: node scripts/generate-all-thumbnails.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'content');
const IMAGES_DIR = path.join(ROOT, 'public', 'images', 'articles');

// ============================================================
// Palettes de couleurs par catégorie
// ============================================================
const CATEGORY_GRADIENTS = {
  test:        { g1: '#FF6B5C', g2: '#FF9685', badge: 'TEST & AVIS' },
  comparatif:  { g1: '#667eea', g2: '#764ba2', badge: 'COMPARATIF' },
  'code-promo':{ g1: '#FF6B9D', g2: '#C44BFF', badge: 'CODE PROMO' },
  guide:       { g1: '#11998e', g2: '#38ef7d', badge: 'GUIDE 2026' }, // fallback
};

// Palettes spécifiques par slug (override de la catégorie)
const SLUG_OVERRIDES = {
  // ── GUIDES (15 existants — nouvelles couleurs uniques) ──
  'box-beaute-abonnement-annuel-vs-mensuel-2026': { g1: '#667eea', g2: '#764ba2', emoji: '📅', badge: 'GUIDE 2026' },
  'box-beaute-anti-age-2026':                     { g1: '#834d9b', g2: '#d04ed6', emoji: '✨', badge: 'GUIDE 2026' },
  'box-beaute-bio-vs-conventionnelle-2026':        { g1: '#56ab2f', g2: '#a8e063', emoji: '🌿', badge: 'GUIDE 2026' },
  'box-beaute-cadeau-noel-anniversaire-2026':      { g1: '#e96f4a', g2: '#ffb347', emoji: '🎁', badge: 'GUIDE 2026' },
  'box-beaute-capillaire-2026':                    { g1: '#11998e', g2: '#38ef7d', emoji: '💇', badge: 'GUIDE 2026' },
  'box-beaute-economique-2026':                    { g1: '#f7971e', g2: '#ffd200', emoji: '💰', badge: 'GUIDE 2026' },
  'box-beaute-homme-2026':                         { g1: '#2c3e50', g2: '#4ca1af', emoji: '🧴', badge: 'GUIDE 2026' },
  'box-beaute-luxe-2026':                          { g1: '#614385', g2: '#c04848', emoji: '💎', badge: 'GUIDE 2026' },
  'box-beaute-maquillage-2026':                    { g1: '#e91e8c', g2: '#ff6b9d', emoji: '💄', badge: 'GUIDE 2026' },
  'box-beaute-peau-sensible-2026':                 { g1: '#4facfe', g2: '#a1c4fd', emoji: '🌸', badge: 'GUIDE 2026' },
  'box-beaute-personnalisee-2026':                 { g1: '#FF6B5C', g2: '#FFC947', emoji: '🎀', badge: 'GUIDE 2026' },
  'box-beaute-vegan-cruelty-free-2026':            { g1: '#1d976c', g2: '#93f9b9', emoji: '🌱', badge: 'GUIDE 2026' },
  'comment-choisir-box-beaute-2026':               { g1: '#7F00FF', g2: '#E100FF', emoji: '🔍', badge: 'GUIDE 2026' },
  'premiere-box-beaute-guide-2026':                { g1: '#f6d365', g2: '#fda085', emoji: '🎉', badge: 'GUIDE 2026' },
  'resilier-box-beaute-2026':                      { g1: '#757F9A', g2: '#D7DDE8', emoji: '📝', badge: 'GUIDE 2026' },
  // ── GUIDES JPG → SVG ──
  'box-beaute-pas-cher-2026':   { g1: '#f7971e', g2: '#ffd200', emoji: '💸', badge: 'GUIDE 2026' },
  'box-beaute-pour-ado-2026':   { g1: '#a18cd1', g2: '#fbc2eb', emoji: '💅', badge: 'GUIDE 2026' },
  'meilleures-box-beaute-2026': { g1: '#FF6B5C', g2: '#FFC947', emoji: '🏆', badge: 'GUIDE 2026' },
  'quelle-box-beaute-offrir-2026': { g1: '#e96f4a', g2: '#ffb347', emoji: '🎁', badge: 'GUIDE 2026' },
  // ── TEST JPG → SVG ──
  'biotyfull-box-fevrier-2026-avis': { g1: '#56ab2f', g2: '#a8e063', emoji: '🌿', badge: 'TEST & AVIS' },
  'biotyfull-box-mars-2026-avis':    { g1: '#56ab2f', g2: '#a8e063', emoji: '🌿', badge: 'TEST & AVIS' },
  'blissim-fevrier-2026':            { g1: '#f953c6', g2: '#b91d73', emoji: '💕', badge: 'TEST & AVIS' },
  'blissim-mars-2026':               { g1: '#f953c6', g2: '#b91d73', emoji: '💕', badge: 'TEST & AVIS' },
  'lookfantastic-mars-2026':         { g1: '#12c2e9', g2: '#f64f59', emoji: '✨', badge: 'TEST & AVIS' },
  'prescription-lab-mars-2026':      { g1: '#5433FF', g2: '#20BDFF', emoji: '🔬', badge: 'TEST & AVIS' },
  'calendrier-avent-miin-cosmetics-2026': { g1: '#667eea', g2: '#764ba2', emoji: '🗓️', badge: 'TEST & AVIS' },
  // ── COMPARATIF JPG → SVG ──
  'biotyfull-vs-blissim':        { g1: '#56ab2f', g2: '#f953c6', emoji: '⚖️', badge: 'COMPARATIF' },
  'comparatif-box-beaute-bio-2026': { g1: '#1d976c', g2: '#93f9b9', emoji: '🌿', badge: 'COMPARATIF' },
  // ── CODE PROMO JPG → SVG ──
  'code-promo-blissim-mars-2026':  { g1: '#FF6B9D', g2: '#C44BFF', emoji: '🏷️', badge: 'CODE PROMO' },
  'code-promo-blissim-avril-2026': { g1: '#FF6B9D', g2: '#C44BFF', emoji: '🏷️', badge: 'CODE PROMO' },
};

// Emojis auto par mots-clés dans le titre/slug
function autoEmoji(slug, category) {
  if (slug.includes('biotyfull'))       return '🌿';
  if (slug.includes('blissim'))         return '💕';
  if (slug.includes('lookfantastic'))   return '✨';
  if (slug.includes('prescription'))    return '🔬';
  if (slug.includes('miin'))            return '🌸';
  if (slug.includes('code-promo'))      return '🏷️';
  if (slug.includes('vs') || slug.includes('comparatif')) return '⚖️';
  if (slug.includes('luxe'))            return '💎';
  if (slug.includes('bio'))             return '🌿';
  if (slug.includes('vegan'))           return '🌱';
  if (slug.includes('maquillage'))      return '💄';
  if (slug.includes('homme'))           return '🧴';
  if (slug.includes('anti-age'))        return '✨';
  if (slug.includes('capillaire'))      return '💇';
  if (slug.includes('econom') || slug.includes('pas-cher') || slug.includes('petit-prix')) return '💰';
  if (slug.includes('cadeau') || slug.includes('offrir') || slug.includes('noel')) return '🎁';
  if (slug.includes('ado'))             return '💅';
  if (slug.includes('peau-sensible'))   return '🌸';
  if (slug.includes('personnalis'))     return '🎀';
  if (slug.includes('choisir'))         return '🔍';
  if (slug.includes('premiere'))        return '🎉';
  if (slug.includes('resilier'))        return '📝';
  if (slug.includes('abonnement'))      return '📅';
  if (slug.includes('meilleur'))        return '🏆';
  if (category === 'guide')             return '📖';
  if (category === 'test')              return '⭐';
  if (category === 'comparatif')        return '⚖️';
  if (category === 'code-promo')        return '🏷️';
  return '💄';
}

// Découpe un titre en 2 lignes max intelligemment
function splitTitle(title) {
  if (title.length <= 22) return [title, ''];
  // Cherche un espace vers le milieu
  const mid = Math.floor(title.length / 2);
  let split = title.lastIndexOf(' ', mid + 6);
  if (split < 10) split = title.indexOf(' ', mid - 6);
  if (split < 0) return [title.slice(0, 20), title.slice(20)];
  return [title.slice(0, split), title.slice(split + 1)];
}

// Génère le SVG
function makeSVG({ title, emoji, g1, g2, badge, subtitle }) {
  const [t1, t2] = splitTitle(title);
  const hasTwoLines = t2 && t2.length > 0;

  const titleY1 = hasTwoLines ? 290 : 320;
  const titleY2 = 348;
  const subtitleY = hasTwoLines ? 398 : 378;

  return `<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${g1}"/>
      <stop offset="100%" style="stop-color:${g2}"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="rgba(0,0,0,0.25)"/>
    </filter>
  </defs>
  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>
  <!-- Décorations géométriques -->
  <circle cx="80"  cy="80"  r="200" fill="white" opacity="0.05"/>
  <circle cx="1120" cy="550" r="280" fill="white" opacity="0.05"/>
  <circle cx="970"  cy="70"  r="140" fill="white" opacity="0.04"/>
  <circle cx="180"  cy="560" r="170" fill="white" opacity="0.03"/>
  <!-- Motif losange subtil -->
  <rect x="550" y="0" width="100" height="630" fill="white" opacity="0.02" transform="rotate(12 600 315)"/>
  <!-- Badge catégorie -->
  <rect x="450" y="72" width="300" height="46" rx="23" fill="white" opacity="0.2"/>
  <text x="600" y="102" text-anchor="middle" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="15" font-weight="700" fill="#fff" letter-spacing="4">${badge}</text>
  <!-- Emoji -->
  <text x="600" y="225" text-anchor="middle" font-family="system-ui, sans-serif" font-size="90">${emoji}</text>
  <!-- Titre ligne 1 -->
  <text x="600" y="${titleY1}" text-anchor="middle" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="52" font-weight="700" fill="#fff" filter="url(#shadow)">${t1}</text>${hasTwoLines ? `
  <!-- Titre ligne 2 -->
  <text x="600" y="${titleY2}" text-anchor="middle" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="52" font-weight="700" fill="#fff" filter="url(#shadow)">${t2}</text>` : ''}
  <!-- Sous-titre -->
  <text x="600" y="${subtitleY}" text-anchor="middle" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="22" font-weight="400" fill="#fff" opacity="0.85">${subtitle}</text>
  <!-- Séparateur -->
  <rect x="500" y="${subtitleY + 24}" width="200" height="2" rx="1" fill="#fff" opacity="0.3"/>
  <!-- Branding Kado -->
  <text x="600" y="${subtitleY + 68}" text-anchor="middle" font-family="Georgia, serif" font-size="24" font-weight="700" fill="#fff" opacity="0.65" letter-spacing="3">Kado</text>
  <text x="600" y="${subtitleY + 94}" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" fill="#fff" opacity="0.4">kado-box.fr</text>
</svg>`;
}

// ============================================================
// Lit un fichier MDX et extrait les métadonnées frontmatter
// ============================================================
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const fm = {};
  for (const line of match[1].split('\n')) {
    const m = line.match(/^(\w[\w-]*):\s*(.*)$/);
    if (m) fm[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
  return fm;
}

// Collecte récursivement tous les fichiers MDX
function findMdx(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results.push(...findMdx(full));
    else if (entry.name.endsWith('.mdx')) results.push(full);
  }
  return results;
}

// ============================================================
// MAIN
// ============================================================
const mdxFiles = findMdx(CONTENT_DIR);
let generated = 0;
let updated = 0;

for (const filePath of mdxFiles) {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const fm = parseFrontmatter(raw);

  if (fm.published === 'false') continue; // articles dépubliés

  const slug = path.basename(filePath, '.mdx');
  const category = fm.category || 'guide';
  const title = fm.title || slug;

  // Calcul des couleurs / emoji
  const override = SLUG_OVERRIDES[slug] || {};
  const catDef = CATEGORY_GRADIENTS[category] || CATEGORY_GRADIENTS['guide'];
  const g1 = override.g1 || catDef.g1;
  const g2 = override.g2 || catDef.g2;
  const badge = override.badge || catDef.badge;
  const emoji = override.emoji || autoEmoji(slug, category);

  // Sous-titre = description courte
  const subtitle = (fm.description || '').slice(0, 60) || 'Kado — Box Beauté 2026';

  // Chemin SVG de sortie
  const svgName = `${slug}.svg`;
  const svgPath = path.join(IMAGES_DIR, svgName);

  // Génère le SVG
  const svgContent = makeSVG({ title, emoji, g1, g2, badge, subtitle });
  fs.writeFileSync(svgPath, svgContent, 'utf-8');
  generated++;

  // Met à jour le frontmatter si l'image actuelle est un .jpg ou .png
  const currentImage = fm.image || '';
  if (currentImage && !currentImage.endsWith('.svg')) {
    const newImage = `/images/articles/${svgName}`;
    const updatedRaw = raw.replace(
      /^(image:\s*)["']?[^"'\n]+["']?/m,
      `$1"${newImage}"`
    );
    if (updatedRaw !== raw) {
      fs.writeFileSync(filePath, updatedRaw, 'utf-8');
      updated++;
    }
  }
}

console.log(`✅ ${generated} SVG générés dans public/images/articles/`);
console.log(`✅ ${updated} fichiers MDX mis à jour (.jpg → .svg)`);
