#!/usr/bin/env node
/**
 * Add inline images to all articles and guides
 * - Test/avis articles: box brand card image after first H2
 * - Guide articles: category illustration after intro paragraph
 * - Comparatif articles: comparison visual
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const CONTENT_DIR = path.join(ROOT, "content");
const IMAGES_DIR = path.join(ROOT, "public", "images", "inline");

fs.mkdirSync(IMAGES_DIR, { recursive: true });

// ─── SVG Generators ────────────────────────────────────────────────────────

function escapeXml(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/** Fiche résumé pour une box (utilisée dans les avis) */
function generateBoxSummaryCard(boxName, price, rating, badge, bgColor, textColor) {
  const stars = "★".repeat(Math.round(rating)) + "☆".repeat(5 - Math.round(rating));
  return `<svg width="800" height="200" viewBox="0 0 800 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${bgColor};stop-opacity:1"/>
      <stop offset="100%" style="stop-color:${bgColor};stop-opacity:0.85"/>
    </linearGradient>
  </defs>
  <rect width="800" height="200" rx="16" fill="url(#bg)"/>
  <rect x="0" y="0" width="8" height="200" rx="4" fill="${textColor === '#fff' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.2)'}"/>
  <!-- Box name -->
  <text x="36" y="70" font-family="system-ui,-apple-system,'Segoe UI',sans-serif" font-size="32" font-weight="800" fill="${textColor}">${escapeXml(boxName)}</text>
  <!-- Badge -->
  <rect x="36" y="90" width="${badge.length * 8 + 24}" height="28" rx="14" fill="${textColor === '#fff' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.12)'}"/>
  <text x="48" y="110" font-family="system-ui,sans-serif" font-size="13" font-weight="600" fill="${textColor}" letter-spacing="1">${escapeXml(badge)}</text>
  <!-- Stars -->
  <text x="36" y="150" font-family="system-ui,sans-serif" font-size="24" fill="#FFD700">${stars}</text>
  <text x="${36 + stars.length * 16}" y="150" font-family="system-ui,sans-serif" font-size="18" fill="${textColor}" opacity="0.8"> ${rating}/5</text>
  <!-- Price -->
  <text x="700" y="80" text-anchor="end" font-family="system-ui,sans-serif" font-size="36" font-weight="800" fill="${textColor}">${escapeXml(price)}</text>
  <text x="700" y="110" text-anchor="end" font-family="system-ui,sans-serif" font-size="15" fill="${textColor}" opacity="0.7">par mois</text>
  <!-- Kado label -->
  <text x="700" y="165" text-anchor="end" font-family="Georgia,serif" font-size="13" fill="${textColor}" opacity="0.45">kado-box.fr</text>
</svg>`;
}

/** Comparatif visuel 2 boxes */
function generateComparaisonSvg(box1, price1, rating1, col1, box2, price2, rating2, col2) {
  const stars1 = "★".repeat(Math.round(rating1)) + "☆".repeat(5 - Math.round(rating1));
  const stars2 = "★".repeat(Math.round(rating2)) + "☆".repeat(5 - Math.round(rating2));
  return `<svg width="800" height="220" viewBox="0 0 800 220" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="220" rx="16" fill="#f8f9fa"/>
  <!-- Box 1 -->
  <rect x="20" y="20" width="355" height="180" rx="12" fill="${col1}"/>
  <text x="197" y="80" text-anchor="middle" font-family="system-ui,sans-serif" font-size="26" font-weight="800" fill="#fff">${escapeXml(box1)}</text>
  <text x="197" y="115" text-anchor="middle" font-family="system-ui,sans-serif" font-size="32" font-weight="800" fill="#fff">${escapeXml(price1)}</text>
  <text x="197" y="150" text-anchor="middle" font-family="system-ui,sans-serif" font-size="20" fill="#FFD700">${stars1}</text>
  <!-- VS -->
  <circle cx="400" cy="110" r="28" fill="#fff" stroke="#e0e0e0" stroke-width="2"/>
  <text x="400" y="118" text-anchor="middle" font-family="system-ui,sans-serif" font-size="16" font-weight="800" fill="#555">VS</text>
  <!-- Box 2 -->
  <rect x="425" y="20" width="355" height="180" rx="12" fill="${col2}"/>
  <text x="602" y="80" text-anchor="middle" font-family="system-ui,sans-serif" font-size="26" font-weight="800" fill="#fff">${escapeXml(box2)}</text>
  <text x="602" y="115" text-anchor="middle" font-family="system-ui,sans-serif" font-size="32" font-weight="800" fill="#fff">${escapeXml(price2)}</text>
  <text x="602" y="150" text-anchor="middle" font-family="system-ui,sans-serif" font-size="20" fill="#FFD700">${stars2}</text>
</svg>`;
}

/** Infographie guide — top recommandations */
function generateGuideRecoSvg(title, items) {
  const itemH = 56;
  const totalH = 80 + items.length * itemH + 20;
  const rows = items.map((item, i) => {
    const y = 80 + i * itemH;
    const bg = i % 2 === 0 ? "#f0f9f4" : "#ffffff";
    return `
  <rect x="20" y="${y}" width="760" height="${itemH - 4}" rx="8" fill="${bg}"/>
  <circle cx="56" cy="${y + (itemH - 4) / 2}" r="18" fill="${item.color || '#11998e'}"/>
  <text x="56" y="${y + (itemH - 4) / 2 + 6}" text-anchor="middle" font-family="system-ui" font-size="16" fill="#fff" font-weight="700">${i + 1}</text>
  <text x="90" y="${y + 28}" font-family="system-ui,-apple-system,sans-serif" font-size="18" font-weight="700" fill="#1a1a2e">${escapeXml(item.name)}</text>
  <text x="90" y="${y + 48}" font-family="system-ui,sans-serif" font-size="13" fill="#666">${escapeXml(item.desc)}</text>
  <text x="755" y="${y + 28}" text-anchor="end" font-family="system-ui,sans-serif" font-size="20" font-weight="800" fill="${item.color || '#11998e'}">${escapeXml(item.price)}</text>`;
  }).join("");

  return `<svg width="800" height="${totalH}" viewBox="0 0 800 ${totalH}" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="${totalH}" rx="16" fill="#fff" stroke="#e8f5e9" stroke-width="2"/>
  <rect x="0" y="0" width="800" height="60" rx="16" fill="#11998e"/>
  <rect x="0" y="44" width="800" height="16" fill="#11998e"/>
  <text x="400" y="38" text-anchor="middle" font-family="system-ui,-apple-system,sans-serif" font-size="20" font-weight="700" fill="#fff" letter-spacing="1">${escapeXml(title)}</text>
  ${rows}
</svg>`;
}

// ─── Article configurations ─────────────────────────────────────────────────

const ARTICLE_IMAGES = [
  // ── Avis Biotyfull ──
  {
    slug: "biotyfull-box-fevrier-2026-avis",
    after: "## Ce qu'il y a dans la box ce mois-ci",
    filename: "summary-biotyfull.svg",
    generate: () => generateBoxSummaryCard("Biotyfull Box", "23.90€", 4.8, "BIO CERTIFIÉE", "#2d6a4f", "#fff"),
    alt: "Biotyfull Box — résumé abonnement bio certifié Nature & Progrès",
  },
  {
    slug: "biotyfull-box-mars-2026-avis",
    after: "## Ce qu'il y a dans la box ce mois-ci",
    filename: "summary-biotyfull.svg",
    alt: "Biotyfull Box — résumé abonnement bio certifié",
  },
  {
    slug: "biotyfull-box-avril-2026-avis",
    after: "## Ce qu'il y a dans la box ce mois-ci",
    filename: "summary-biotyfull.svg",
    alt: "Biotyfull Box — fiche abonnement bio",
  },
  // ── Avis Blissim ──
  {
    slug: "blissim-fevrier-2026",
    after: "## Ce que contient la box",
    filename: "summary-blissim.svg",
    generate: () => generateBoxSummaryCard("Blissim", "16.90€", 4.3, "BEAUTÉ MIXTE", "#4a90d9", "#fff"),
    alt: "Blissim — fiche abonnement box beauté mixte",
  },
  {
    slug: "blissim-mars-2026",
    after: "## Ce que contient la box",
    filename: "summary-blissim.svg",
    alt: "Blissim — fiche abonnement box beauté",
  },
  {
    slug: "blissim-avril-2026",
    after: "## Ce que contient la box",
    filename: "summary-blissim.svg",
    alt: "Blissim — fiche abonnement mensuel",
  },
  // ── Avis Lookfantastic ──
  {
    slug: "lookfantastic-mars-2026",
    after: "## Ce que contient la box",
    filename: "summary-lookfantastic.svg",
    generate: () => generateBoxSummaryCard("Lookfantastic", "16.50€", 4.2, "PREMIUM INTERNATIONAL", "#1a1a2e", "#fff"),
    alt: "Lookfantastic Beauty Box — fiche abonnement premium international",
  },
  {
    slug: "lookfantastic-avril-2026",
    after: "## Ce que contient la box",
    filename: "summary-lookfantastic.svg",
    alt: "Lookfantastic Beauty Box — fiche abonnement",
  },
  // ── Avis Prescription Lab ──
  {
    slug: "prescription-lab-mars-2026",
    after: "## Ce que contient la box",
    filename: "summary-prescription-lab.svg",
    generate: () => generateBoxSummaryCard("Prescription Lab", "25.90€", 4.6, "BOX PERSONNALISÉE", "#7b2d8b", "#fff"),
    alt: "Prescription Lab — fiche abonnement box personnalisée haut de gamme",
  },
  {
    slug: "prescription-lab-avril-2026",
    after: "## Ce que contient la box",
    filename: "summary-prescription-lab.svg",
    alt: "Prescription Lab — fiche abonnement personnalisé",
  },
  // ── Comparatif ──
  {
    slug: "biotyfull-vs-blissim",
    after: "## Biotyfull Box vs Blissim : le comparatif",
    filename: "comparatif-biotyfull-vs-blissim.svg",
    generate: () => generateComparaisonSvg("Biotyfull Box", "23.90€", 4.8, "#2d6a4f", "Blissim", "16.90€", 4.3, "#4a90d9"),
    alt: "Comparatif Biotyfull Box vs Blissim — prix et notes",
  },
  // ── Guide : choisir ──
  {
    slug: "comment-choisir-box-beaute-2026",
    after: "## Tableau récapitulatif pour choisir",
    filename: "guide-reco-choisir.svg",
    generate: () => generateGuideRecoSvg("Notre sélection par profil", [
      { name: "Blissim", desc: "Pour débuter, budget serré, peau normale", price: "16.90€", color: "#4a90d9" },
      { name: "Biotyfull Box", desc: "Peau sensible, naturalité, bio certifié", price: "23.90€", color: "#2d6a4f" },
      { name: "Prescription Lab", desc: "Personnalisation maximale, premium", price: "25.90€", color: "#7b2d8b" },
      { name: "Lookfantastic", desc: "Marques internationales, soins & maquillage", price: "16.50€", color: "#1a1a2e" },
    ]),
    alt: "Tableau comparatif — quelle box beauté choisir selon son profil",
  },
  // ── Guide : luxe ──
  {
    slug: "box-beaute-luxe-2026",
    after: "## Les meilleures box beauté luxe en France en 2026",
    filename: "guide-reco-luxe.svg",
    generate: () => generateGuideRecoSvg("Top box beauté premium 2026", [
      { name: "Lookfantastic", desc: "6 produits premium, marques internationales", price: "16.50€", color: "#1a1a2e" },
      { name: "Prescription Lab", desc: "Personnalisation, produits taille réelle", price: "25.90€", color: "#7b2d8b" },
      { name: "Glowria", desc: "Expérience premium, curation experte", price: "29.00€", color: "#c0392b" },
    ]),
    alt: "Comparatif des meilleures box beauté luxe et premium en 2026",
  },
  // ── Guide : peau sensible ──
  {
    slug: "box-beaute-peau-sensible-2026",
    after: "## Les meilleures box pour peaux sensibles en 2026",
    filename: "guide-reco-peau-sensible.svg",
    generate: () => generateGuideRecoSvg("Meilleures box peaux sensibles 2026", [
      { name: "Biotyfull Box", desc: "Certifiée Nature & Progrès, sans irritants", price: "23.90€", color: "#2d6a4f" },
      { name: "Belle au Naturel", desc: "100% naturel, cruelty-free et vegan", price: "20.00€", color: "#27ae60" },
      { name: "Nuoo", desc: "Bio + éco-responsable, peaux réactives", price: "25.00€", color: "#16a085" },
    ]),
    alt: "Sélection des meilleures box beauté pour peaux sensibles",
  },
  // ── Guide : maquillage ──
  {
    slug: "box-beaute-maquillage-2026",
    after: "## Les meilleures box maquillage en 2026",
    filename: "guide-reco-maquillage.svg",
    generate: () => generateGuideRecoSvg("Top box maquillage 2026", [
      { name: "Blissim", desc: "Mix soins + make-up, profil personnalisable", price: "16.90€", color: "#e91e8c" },
      { name: "Lookfantastic", desc: "Make-up premium international (NYX, Hourglass...)", price: "16.50€", color: "#1a1a2e" },
      { name: "Mademoiselle Confettis", desc: "Univers lifestyle & make-up thématique", price: "20.00€", color: "#f39c12" },
    ]),
    alt: "Classement des meilleures box beauté spécialisées maquillage",
  },
  // ── Guide : vegan ──
  {
    slug: "box-beaute-vegan-cruelty-free-2026",
    after: "## Les meilleures box beauté vegan et cruelty-free en 2026",
    filename: "guide-reco-vegan.svg",
    generate: () => generateGuideRecoSvg("Meilleures box vegan & cruelty-free 2026", [
      { name: "Belle au Naturel", desc: "100% vegan, cruelty-free, naturel", price: "20.00€", color: "#27ae60" },
      { name: "Biotyfull Box", desc: "Bio certifié, majorité des produits vegan", price: "23.90€", color: "#2d6a4f" },
      { name: "Nuoo", desc: "Vegan + engagement écologique B Corp", price: "25.00€", color: "#16a085" },
    ]),
    alt: "Sélection des meilleures box beauté vegan et cruelty-free",
  },
  // ── Guide : anti-âge ──
  {
    slug: "box-beaute-anti-age-2026",
    after: "## Les meilleures box beauté anti-âge en 2026",
    filename: "guide-reco-anti-age.svg",
    generate: () => generateGuideRecoSvg("Top box anti-âge 2026", [
      { name: "Prescription Lab", desc: "Personnalisation anti-âge, produits taille réelle", price: "25.90€", color: "#7b2d8b" },
      { name: "Lookfantastic", desc: "Olaplex, Paula's Choice, actifs premium", price: "16.50€", color: "#1a1a2e" },
      { name: "Glowria", desc: "Soins premium, sélection experte anti-âge", price: "29.00€", color: "#c0392b" },
    ]),
    alt: "Classement des meilleures box beauté anti-âge",
  },
  // ── Guide : capillaire ──
  {
    slug: "box-beaute-capillaire-2026",
    after: "## Les meilleures box capillaires en 2026",
    filename: "guide-reco-capillaire.svg",
    generate: () => generateGuideRecoSvg("Top box soins capillaires 2026", [
      { name: "Lookfantastic", desc: "Olaplex, GHD, Moroccanoil, Redken...", price: "16.50€", color: "#1a1a2e" },
      { name: "Biotyfull Box", desc: "Soins capillaires bio certifiés", price: "23.90€", color: "#2d6a4f" },
      { name: "Blissim", desc: "Mix capillaire + beauté, profil personnalisable", price: "16.90€", color: "#4a90d9" },
    ]),
    alt: "Sélection des meilleures box beauté pour soins capillaires",
  },
  // ── Guide : personnalisée ──
  {
    slug: "box-beaute-personnalisee-2026",
    after: "## Les box beauté les plus personnalisées en 2026",
    filename: "guide-reco-personnalisee.svg",
    generate: () => generateGuideRecoSvg("Niveau de personnalisation 2026", [
      { name: "Prescription Lab", desc: "⭐⭐⭐⭐⭐ — Ordonnance beauté sur-mesure", price: "25.90€", color: "#7b2d8b" },
      { name: "Glowria", desc: "⭐⭐⭐⭐ — Profil beauté détaillé", price: "29.00€", color: "#c0392b" },
      { name: "Blissim", desc: "⭐⭐⭐ — Personnalisation progressive par notation", price: "16.90€", color: "#4a90d9" },
    ]),
    alt: "Comparatif niveau de personnalisation des box beauté",
  },
  // ── Guide : première box ──
  {
    slug: "premiere-box-beaute-guide-2026",
    after: "## Quelle box choisir pour sa première fois ?",
    filename: "guide-reco-premiere-box.svg",
    generate: () => generateGuideRecoSvg("Recommandations pour débutantes", [
      { name: "Blissim", desc: "La référence française, accessible et variée", price: "16.90€", color: "#4a90d9" },
      { name: "Biotyfull Box", desc: "Pour peaux sensibles, 100% bio certifié", price: "23.90€", color: "#2d6a4f" },
      { name: "Lookfantastic", desc: "Meilleur rapport qualité-prix premium", price: "16.50€", color: "#1a1a2e" },
    ]),
    alt: "Quelle box beauté choisir pour sa première fois",
  },
  // ── Guide : bio vs conventionnelle ──
  {
    slug: "box-beaute-bio-vs-conventionnelle-2026",
    after: "## Pour qui choisir quoi ?",
    filename: "comparatif-bio-vs-conventionnel.svg",
    generate: () => generateComparaisonSvg("Box Bio", "20-24€", 4.5, "#2d6a4f", "Box Conventionnelle", "15-17€", 4.2, "#4a90d9"),
    alt: "Comparatif box beauté bio versus box conventionnelle — prix et notes",
  },
  // ── Guide : économique ──
  {
    slug: "box-beaute-economique-2026",
    after: "## Dans quels cas une box beauté est économique ?",
    filename: "guide-reco-economique.svg",
    generate: () => generateGuideRecoSvg("Meilleur rapport qualité-prix 2026", [
      { name: "Lookfantastic", desc: "Valeur contenu ~80€ pour 16.50€/mois", price: "16.50€", color: "#11998e" },
      { name: "Blissim", desc: "Valeur contenu ~60€ pour 16.90€/mois", price: "16.90€", color: "#4a90d9" },
      { name: "Biotyfull Box", desc: "Valeur contenu ~75€ pour 23.90€/mois", price: "23.90€", color: "#2d6a4f" },
    ]),
    alt: "Comparatif rapport qualité-prix des box beauté en 2026",
  },
  // ── Guide : homme ──
  {
    slug: "box-beaute-homme-2026",
    after: "## Nos recommandations par profil",
    filename: "guide-reco-homme.svg",
    generate: () => generateGuideRecoSvg("Meilleures box pour homme 2026", [
      { name: "Lookfantastic", desc: "Soins masculins premium, marques pro", price: "16.50€", color: "#1a1a2e" },
      { name: "Biotyfull Box", desc: "Pour homme peau sensible, 100% naturel", price: "23.90€", color: "#2d6a4f" },
      { name: "Prescription Lab", desc: "Personnalisation profil masculin sur-mesure", price: "25.90€", color: "#7b2d8b" },
    ]),
    alt: "Sélection des meilleures box beauté pour homme",
  },
  // ── Guide : abonnement annuel vs mensuel ──
  {
    slug: "box-beaute-abonnement-annuel-vs-mensuel-2026",
    after: "## Comparatif des économies réelles en 2026",
    filename: "guide-reco-abonnement.svg",
    generate: () => generateGuideRecoSvg("Économies abonnement annuel vs mensuel", [
      { name: "Lookfantastic", desc: "Économie annuelle : ~59€ (≈ 3 mois offerts)", price: "~59€/an", color: "#1a1a2e" },
      { name: "Blissim", desc: "Économie annuelle : ~36€ (≈ 2 mois offerts)", price: "~36€/an", color: "#4a90d9" },
      { name: "Biotyfull Box", desc: "Économie annuelle : ~48€ (≈ 2 mois offerts)", price: "~48€/an", color: "#2d6a4f" },
    ]),
    alt: "Économies réalisées avec un abonnement annuel vs mensuel",
  },
  // ── Guide : cadeau ──
  {
    slug: "box-beaute-cadeau-noel-anniversaire-2026",
    after: "## Quelle box choisir selon l'occasion",
    filename: "guide-reco-cadeau.svg",
    generate: () => generateGuideRecoSvg("Meilleures box cadeau 2026", [
      { name: "Glowria", desc: "Coffret premium, idéale pour offrir", price: "29.00€", color: "#c0392b" },
      { name: "Mademoiselle Confettis", desc: "Univers lifestyle festif, thématique", price: "20.00€", color: "#f39c12" },
      { name: "Blissim", desc: "Polyvalente, accessible, offre de bienvenue", price: "16.90€", color: "#4a90d9" },
    ]),
    alt: "Meilleures box beauté à offrir en cadeau",
  },
  // ── Guide : résilier ──
  {
    slug: "resilier-box-beaute-2026",
    after: "## Comment résilier les principales box beauté en 2026",
    filename: "guide-resilier-steps.svg",
    generate: () => {
      return `<svg width="800" height="160" viewBox="0 0 800 160" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="160" rx="16" fill="#fff8f0" stroke="#ffe0b2" stroke-width="2"/>
  <text x="400" y="40" text-anchor="middle" font-family="system-ui,sans-serif" font-size="17" font-weight="700" fill="#e65100">⚡ Résiliation en 3 étapes simples</text>
  ${[
    ["1", "Connectez-vous", "à votre compte", "75"],
    ["2", "Mon abonnement", "→ Résilier", "275"],
    ["3", "Confirmez", "et notez la confirmation", "475"],
  ].map(([num, t1, t2, x]) => `
  <circle cx="${+x + 50}" cy="95" r="32" fill="#e65100"/>
  <text x="${+x + 50}" y="102" text-anchor="middle" font-family="system-ui,sans-serif" font-size="22" font-weight="800" fill="#fff">${num}</text>
  <text x="${+x + 50}" y="140" text-anchor="middle" font-family="system-ui,sans-serif" font-size="14" font-weight="600" fill="#e65100">${t1}</text>
  <text x="${+x + 50}" y="156" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12" fill="#777">${t2}</text>`).join("")}
  <line x1="125" y1="95" x2="225" y2="95" stroke="#e65100" stroke-width="2" stroke-dasharray="6,3"/>
  <line x1="325" y1="95" x2="425" y2="95" stroke="#e65100" stroke-width="2" stroke-dasharray="6,3"/>
</svg>`;
    },
    alt: "Étapes pour résilier son abonnement box beauté en 3 clics",
  },
];

// ─── Process articles ───────────────────────────────────────────────────────

function findMdx(dir, slug) {
  if (!fs.existsSync(dir)) return null;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const found = findMdx(full, slug);
      if (found) return found;
    } else if (entry.name === `${slug}.mdx`) {
      return full;
    }
  }
  return null;
}

let success = 0;
const generated = new Set();

for (const cfg of ARTICLE_IMAGES) {
  const mdxPath = findMdx(CONTENT_DIR, cfg.slug);
  if (!mdxPath) {
    console.warn(`  ⚠  Not found: ${cfg.slug}`);
    continue;
  }

  // Generate SVG if needed (only once per filename)
  const svgPath = path.join(IMAGES_DIR, cfg.filename);
  if (!generated.has(cfg.filename) && cfg.generate) {
    fs.writeFileSync(svgPath, cfg.generate(), "utf-8");
    generated.add(cfg.filename);
  }

  const imageSrc = `/images/inline/${cfg.filename}`;
  const imageTag = `\n\n![${cfg.alt}](${imageSrc})\n`;

  let content = fs.readFileSync(mdxPath, "utf-8");

  // Check if image already added
  if (content.includes(imageSrc)) {
    console.log(`  ⏭  Already done: ${cfg.slug}`);
    continue;
  }

  // Find the insertion point
  const insertAfter = cfg.after;
  const idx = content.indexOf(insertAfter);
  if (idx === -1) {
    // Try to insert after the first H2
    const h2Match = content.match(/\n## /);
    if (h2Match) {
      const h2Idx = content.indexOf(h2Match[0]);
      const afterH2End = content.indexOf("\n\n", h2Idx + 4);
      if (afterH2End !== -1) {
        content = content.slice(0, afterH2End) + imageTag + content.slice(afterH2End);
        fs.writeFileSync(mdxPath, content, "utf-8");
        console.log(`  ✅ ${cfg.slug} (fallback: after first H2)`);
        success++;
        continue;
      }
    }
    console.warn(`  ⚠  No insertion point: ${cfg.slug} (looking for: "${insertAfter}")`);
    continue;
  }

  // Insert after the heading and its following paragraph
  const afterHeading = idx + insertAfter.length;
  const nextSection = content.indexOf("\n\n", afterHeading);
  const insertAt = nextSection !== -1 ? nextSection : afterHeading;

  content = content.slice(0, insertAt) + imageTag + content.slice(insertAt);
  fs.writeFileSync(mdxPath, content, "utf-8");
  console.log(`  ✅ ${cfg.slug}`);
  success++;
}

console.log(`\n${success}/${ARTICLE_IMAGES.length} articles updated with inline images`);
console.log(`${generated.size} SVG files generated in /public/images/inline/`);
