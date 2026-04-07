#!/usr/bin/env node
/**
 * Générateur d'articles mensuels — Kado
 *
 * Usage :
 *   node scripts/new-month.mjs            → génère le mois prochain
 *   node scripts/new-month.mjs avril 2026 → génère un mois spécifique
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = path.join(__dirname, "../content");

// ─── Configuration des box ────────────────────────────────────────────────────

const BOXES = [
  {
    id: "blissim",
    name: "Blissim",
    price: "17,90€/mois",
    rating: 4.5,
    affiliateUrl:
      "https://www.awin1.com/cread.php?awinmid=15574&awinaffid=990397&ued=https%3A%2F%2Fblissim.fr%2F",
    affiliateLabel: "Découvrir la box Blissim",
    tags: ["blissim", "test"],
    filename: (mois, annee) => `blissim-${mois}-${annee}.mdx`,
    seoTitle: (moisLabel, annee) =>
      `Blissim ${capitalize(moisLabel)} ${annee} : Avis, Contenu et Code Promo | Kado`,
    seoDesc: (moisLabel, annee) =>
      `Tout sur la box Blissim de ${moisLabel} ${annee}. 5 miniatures de luxe et un format vente. Notre avis sur le rapport qualité/prix de ce mois-ci.`,
    template: blissimTemplate,
  },
  {
    id: "biotyfull",
    name: "Biotyfull Box",
    price: "23,90€/mois",
    rating: 4.7,
    affiliateUrl:
      "https://xno.biotyfullbox.fr/?P51362157CD2D1D1&redir=https%3A%2F%2Fwww.biotyfullbox.fr%2F",
    affiliateLabel: "S'abonner à la Biotyfull Box",
    tags: ["biotyfull-box", "bio", "test"],
    filename: (mois, annee) => `biotyfull-box-${mois}-${annee}-avis.mdx`,
    seoTitle: (moisLabel, annee) =>
      `Biotyfull Box ${capitalize(moisLabel)} ${annee} : Contenu, Avis et Code Promo | Kado`,
    seoDesc: (moisLabel, annee) =>
      `Découvrez notre test complet de la Biotyfull Box de ${moisLabel} ${annee}. 5 à 6 produits bio full-size. Photos et verdict.`,
    template: biotyfullTemplate,
  },
  {
    id: "lookfantastic",
    name: "Lookfantastic",
    price: "20€/mois",
    rating: 4.4,
    affiliateUrl:
      "https://www.awin1.com/cread.php?awinmid=7496&awinaffid=990397&ued=https%3A%2F%2Fwww.lookfantastic.fr%2F",
    affiliateLabel: "Acheter la box Lookfantastic",
    tags: ["lookfantastic", "premium", "test"],
    filename: (mois, annee) => `lookfantastic-${mois}-${annee}.mdx`,
    seoTitle: (moisLabel, annee) =>
      `Lookfantastic ${capitalize(moisLabel)} ${annee} : Avis, Prix et Contenu | Kado`,
    seoDesc: (moisLabel, annee) =>
      `Examen de la sélection Lookfantastic pour ${moisLabel} ${annee}. Plus de 60€ de valeur de produits pour seulement 20€. Notre verdict d'experts.`,
    template: lookfantasticTemplate,
  },
  {
    id: "prescription-lab",
    name: "Prescription Lab",
    price: "25,90€/mois",
    rating: 4.6,
    affiliateUrl:
      "https://lb.affilae.com/r/?p=666750775c33cdebea5c1e66&af=6267adb39671d12b09ec1f3f&lp=https%3A%2F%2Fwww.prescriptionlab.com",
    affiliateLabel: "Découvrir Prescription Lab",
    tags: ["prescription-lab", "premium", "test"],
    filename: (mois, annee) => `prescription-lab-${mois}-${annee}.mdx`,
    seoTitle: (moisLabel, annee) =>
      `Prescription Lab ${capitalize(moisLabel)} ${annee} : Avis et Contenu | Kado`,
    seoDesc: (moisLabel, annee) =>
      `Notre test de la Prescription Lab de ${moisLabel} ${annee}. 3 produits full-size ultra-ciblés à 25,90€. Contenu, valeur réelle et verdict honnête.`,
    template: prescriptionLabTemplate,
  },
  {
    id: "code-promo-blissim",
    name: "Blissim",
    price: "17,90€/mois",
    rating: 4.3,
    affiliateUrl:
      "https://www.awin1.com/cread.php?awinmid=15574&awinaffid=990397&ued=https%3A%2F%2Fblissim.fr%2F",
    affiliateLabel: "S'abonner à Blissim avec notre offre",
    tags: ["code-promo-blissim", "blissim", "promo"],
    filename: (mois, annee) => `code-promo-blissim-${mois}-${annee}.mdx`,
    seoTitle: (moisLabel, annee) =>
      `Code Promo Blissim ${capitalize(moisLabel)} ${annee} : 1ère Box Moins Chère | Kado`,
    seoDesc: (moisLabel, annee) =>
      `Tous les codes promo Blissim valides en ${moisLabel} ${annee}. 1ère box à tarif réduit pour les nouveaux abonnés. Offres vérifiées et mises à jour.`,
    template: codePromoBlissimTemplate,
  },
];

// ─── Mois français ────────────────────────────────────────────────────────────

const MOIS_LABELS = {
  janvier: "janvier",
  fevrier: "février",
  mars: "mars",
  avril: "avril",
  mai: "mai",
  juin: "juin",
  juillet: "juillet",
  aout: "août",
  septembre: "septembre",
  octobre: "octobre",
  novembre: "novembre",
  decembre: "décembre",
};

// Numéro du mois → slug sans accent
const MOIS_PAR_NUM = [
  null,
  "janvier",
  "fevrier",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "aout",
  "septembre",
  "octobre",
  "novembre",
  "decembre",
];

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ─── Parsing des arguments ────────────────────────────────────────────────────

function parseMoisAnnee() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    // Mois prochain par défaut
    const d = new Date();
    d.setMonth(d.getMonth() + 1);
    const num = d.getMonth() + 1;
    const annee = d.getFullYear();
    return { moisSlug: MOIS_PAR_NUM[num], annee };
  }

  // Accepte "avril 2026" ou "avril" (année courante)
  const inputMois = args[0].toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const annee = args[1] ? parseInt(args[1]) : new Date().getFullYear();

  const moisSlug = MOIS_PAR_NUM.find((m) => m === inputMois);
  if (!moisSlug) {
    console.error(`❌ Mois inconnu : "${args[0]}"`);
    console.error(`   Valeurs acceptées : ${MOIS_PAR_NUM.slice(1).join(", ")}`);
    process.exit(1);
  }

  return { moisSlug, annee };
}

// ─── Date du 1er du mois ──────────────────────────────────────────────────────

function dateString(moisSlug, annee) {
  const num = MOIS_PAR_NUM.indexOf(moisSlug);
  return `${annee}-${String(num).padStart(2, "0")}-01`;
}

// ─── Templates ───────────────────────────────────────────────────────────────

function frontmatter(box, moisSlug, annee, title, description) {
  const label = MOIS_LABELS[moisSlug];
  const tags = [...box.tags, `${moisSlug}-${annee}`].map((t) => `"${t}"`).join(", ");
  return `---
title: "${title}"
description: "${description}"
date: "${dateString(moisSlug, annee)}"
category: "test"
tags: [${tags}]
image: "/images/articles/${box.filename(moisSlug, annee).replace(".mdx", "")}.jpg"
imageAlt: "Contenu ${box.name} ${capitalize(label)} ${annee}"
rating: ${box.rating}
price: "${box.price}"
boxName: "${box.name}"
affiliateUrl: "${box.affiliateUrl}"
affiliateLabel: "${box.affiliateLabel}"
published: true
featured: false
seoTitle: "${box.seoTitle(label, annee)}"
seoDescription: "${box.seoDesc(label, annee)}"
---`;
}

function blissimTemplate(moisSlug, annee) {
  const label = MOIS_LABELS[moisSlug];
  const box = BOXES.find((b) => b.id === "blissim");
  return `${frontmatter(
    box,
    moisSlug,
    annee,
    `Blissim ${capitalize(label)} ${annee} : Notre test de la box du mois`,
    `Découvrez le contenu de la box Blissim de ${label} ${annee}. Sélection de soins et maquillage avec notre avis honnête. Code promo exclusif.`
  )}

## Blissim ${capitalize(label)} ${annee} : ce qu'on a reçu

<!-- 🖊️ COMPLÉTER : Thème du mois + 2-3 phrases d'introduction -->
[À COMPLÉTER — ex : "Ce mois-ci, Blissim mise sur... avec une sélection axée..."]

## Contenu de la box ${label} ${annee}

### 1. [Nom du produit 1] — [marque] — format [taille]

<!-- 🖊️ COMPLÉTER : Description du produit, texture, utilisation, impression -->
[À COMPLÉTER]

### 2. [Nom du produit 2] — [marque]

[À COMPLÉTER]

### 3. [Nom du produit 3] — [marque]

[À COMPLÉTER]

### 4. [Nom du produit 4] — [marque]

[À COMPLÉTER]

### 5. [Produit surprise]

[À COMPLÉTER]

## La valeur de la box en chiffres

| Produit | Valeur estimée |
|---|---|
| [Produit 1] | ~[X]€ |
| [Produit 2] | ~[X]€ |
| [Produit 3] | ~[X]€ |
| [Produit 4] | ~[X]€ |
| [Produit 5] | ~[X]€ |
| **Total** | **~[XX]€** |

Pour ${box.price}, c'est un rapport qualité/prix difficile à battre.

## Ce qu'on a aimé

<!-- 🖊️ COMPLÉTER selon les produits reçus -->
- [Point positif 1]
- [Point positif 2]
- [Point positif 3]

## Ce qu'on aurait aimé

- [Point négatif 1]
- [Point négatif 2]

## Notre verdict — ${label} ${annee}

<!-- 🖊️ COMPLÉTER : 3-4 phrases de conclusion personnalisées -->
[À COMPLÉTER]

**Note : ${box.rating}/5**
`;
}

function biotyfullTemplate(moisSlug, annee) {
  const label = MOIS_LABELS[moisSlug];
  const box = BOXES.find((b) => b.id === "biotyfull");
  return `${frontmatter(
    box,
    moisSlug,
    annee,
    `Biotyfull Box ${capitalize(label)} ${annee} : test de la sélection bio du mois`,
    `Test complet de la Biotyfull Box de ${label} ${annee}. Découvrez les produits bio full-size sélectionnés ce mois-ci. Notre avis honnête.`
  )}

## Biotyfull Box ${capitalize(label)} ${annee} : le thème du mois

<!-- 🖊️ COMPLÉTER : Thème de la box + contexte saisonnier -->
[À COMPLÉTER — ex : "Pour ce mois de ${label}, Biotyfull mise sur..."]

## Contenu — 100% bio, 100% full-size

### 1. [Produit 1] — [marque] — [type de soin]

<!-- 🖊️ COMPLÉTER : Ingrédients clés, texture, résultats attendus -->
[À COMPLÉTER]

### 2. [Produit 2] — [marque]

[À COMPLÉTER]

### 3. [Produit 3] — [marque]

[À COMPLÉTER]

### 4. [Produit 4] — [marque]

[À COMPLÉTER]

### 5. [Produit 5 ou accessoire]

[À COMPLÉTER]

## Valeur totale de la box

| Produit | Valeur estimée |
|---|---|
| [Produit 1] | ~[X]€ |
| [Produit 2] | ~[X]€ |
| [Produit 3] | ~[X]€ |
| [Produit 4] | ~[X]€ |
| [Produit 5] | ~[X]€ |
| **Total** | **~[XX]€** |

## Ce qu'on a particulièrement aimé

<!-- 🖊️ COMPLÉTER -->
- [Point fort 1]
- [Point fort 2]

## Les petits bémols

- [Bémol 1]

## Notre verdict ${label} ${annee}

<!-- 🖊️ COMPLÉTER -->
[À COMPLÉTER]

**Note : ${box.rating}/5** — Notre recommandation pour les amatrices de cosmétiques naturels.
`;
}

function lookfantasticTemplate(moisSlug, annee) {
  const label = MOIS_LABELS[moisSlug];
  const box = BOXES.find((b) => b.id === "lookfantastic");
  return `${frontmatter(
    box,
    moisSlug,
    annee,
    `Lookfantastic Beauty Box ${capitalize(label)} ${annee} : Luxe et Innovation`,
    `Test de la box Lookfantastic de ${label} ${annee}. Des marques internationales premium pour une routine de soins high-tech et sensorielle.`
  )}

## Lookfantastic ${capitalize(label)} ${annee} : la sélection du mois

<!-- 🖊️ COMPLÉTER : 2-3 phrases d'intro sur la tendance du mois -->
[À COMPLÉTER]

## Contenu de la box ${label} ${annee}

### 1. [Produit 1] — [marque] — full-size

[À COMPLÉTER]

### 2. [Produit 2] — [marque]

[À COMPLÉTER]

### 3. [Produit 3] — [marque]

[À COMPLÉTER]

### 4. [Produit 4] — [marque]

[À COMPLÉTER]

### 5. [Produit 5 / accessoire]

[À COMPLÉTER]

## La valeur réelle de la box

| Produit | Valeur estimée |
|---|---|
| [Produit 1] | ~[X]€ |
| [Produit 2] | ~[X]€ |
| [Produit 3] | ~[X]€ |
| [Produit 4] | ~[X]€ |
| [Produit 5] | ~[X]€ |
| **Total** | **~[XX]€** |

## Notre verdict — ${label} ${annee}

<!-- 🖊️ COMPLÉTER -->
[À COMPLÉTER]

**Note : ${box.rating}/5**
`;
}

function prescriptionLabTemplate(moisSlug, annee) {
  const label = MOIS_LABELS[moisSlug];
  const box = BOXES.find((b) => b.id === "prescription-lab");
  return `${frontmatter(
    box,
    moisSlug,
    annee,
    `Prescription Lab ${capitalize(label)} ${annee} : 3 Produits, Zéro Compromis`,
    `Test complet de la Prescription Lab de ${label} ${annee}. 3 produits full-size ultra-ciblés. Valeur, personnalisation et verdict honnête.`
  )}

## Prescription Lab ${capitalize(label)} ${annee} : la philosophie "less is more"

<!-- 🖊️ COMPLÉTER : contexte du mois, quelle problématique peau ce mois cible-t-il ? -->
[À COMPLÉTER — ex : "En ${label}, la peau traverse..."]

## Les 3 produits du mois

### Produit 1 — [Nom] — [marque]

<!-- 🖊️ COMPLÉTER : pourquoi ce produit ce mois-ci ? formule ? résultats ? -->
[À COMPLÉTER]

### Produit 2 — [Nom] — [marque]

[À COMPLÉTER]

### Produit 3 — [Nom] — [marque]

[À COMPLÉTER]

## La personnalisation — ça marche vraiment ?

<!-- 🖊️ COMPLÉTER : Est-ce que les produits correspondaient bien au profil ? -->
[À COMPLÉTER]

## Valeur de la sélection

| Produit | Valeur boutique |
|---|---|
| [Produit 1] | ~[X]€ |
| [Produit 2] | ~[X]€ |
| [Produit 3] | ~[X]€ |
| **Total** | **~[XX]€** |

## Notre verdict — ${label} ${annee}

<!-- 🖊️ COMPLÉTER -->
[À COMPLÉTER]

**Note : ${box.rating}/5**
`;
}

function codePromoBlissimTemplate(moisSlug, annee) {
  const label = MOIS_LABELS[moisSlug];
  const box = BOXES.find((b) => b.id === "code-promo-blissim");
  return `---
title: "Code Promo Blissim ${capitalize(label)} ${annee} : Toutes les Offres du Moment"
description: "Retrouvez tous les codes promo Blissim valides en ${label} ${annee}. 1ère box à prix réduit, offres partenaires et astuces pour s'abonner moins cher."
date: "${dateString(moisSlug, annee)}"
category: "code-promo"
tags: ["code-promo-blissim", "blissim", "promo", "${moisSlug}-${annee}", "reduction"]
image: "/images/articles/code-promo-blissim-${moisSlug}-${annee}.jpg"
imageAlt: "Code promo Blissim ${label} ${annee} - offres et réductions"
rating: 4.3
price: "17,90€/mois"
boxName: "Blissim"
affiliateUrl: "${box.affiliateUrl}"
affiliateLabel: "${box.affiliateLabel}"
published: true
featured: false
seoTitle: "Code Promo Blissim ${capitalize(label)} ${annee} : 1ère Box Moins Chère | Kado"
seoDescription: "Tous les codes promo Blissim valides en ${label} ${annee}. 1ère box à tarif réduit pour les nouveaux abonnés. Offres vérifiées et mises à jour le 1er ${label} ${annee}."
---

## Codes promo Blissim — ${capitalize(label)} ${annee}

<!-- 🖊️ COMPLÉTER : Y a-t-il des codes promo actifs ce mois-ci ? Sinon garder le texte générique -->

Vous cherchez à recevoir votre première box Blissim au meilleur prix ? Voici toutes les offres disponibles en ${label} ${annee}.

## Offre du moment

<!-- 🖊️ COMPLÉTER : Code promo actif si disponible -->

| Offre | Détail | Valide jusqu'au |
|---|---|---|
| 1ère box à prix réduit | Via notre lien partenaire | Fin ${label} ${annee} |
| [Code si dispo] | [Description] | [Date] |

## Comment obtenir sa 1ère box Blissim moins chère

1. Cliquer sur notre lien ci-dessous
2. Créer votre compte et remplir votre profil beauté
3. La réduction s'applique automatiquement

## Notre avis sur Blissim en ${label} ${annee}

<!-- 🖊️ COMPLÉTER : lien vers l'article test du même mois -->
→ Lire notre test complet : [Blissim ${capitalize(label)} ${annee}](/article/blissim-${moisSlug}-${annee})

**Note : 4.3/5**
`;
}

// ─── Génération principale ────────────────────────────────────────────────────

function generate(moisSlug, annee) {
  const label = MOIS_LABELS[moisSlug];
  const created = [];
  const skipped = [];

  for (const box of BOXES) {
    const filename = box.filename(moisSlug, annee);
    const filepath = path.join(CONTENT_DIR, filename);

    if (fs.existsSync(filepath)) {
      skipped.push(filename);
      continue;
    }

    const content = box.template(moisSlug, annee);
    fs.writeFileSync(filepath, content, "utf-8");
    created.push(filename);
  }

  console.log(`\n📅 Génération pour ${capitalize(label)} ${annee}\n`);

  if (created.length > 0) {
    console.log(`✅ Créés (${created.length}) :`);
    created.forEach((f) => console.log(`   • ${f}`));
  }

  if (skipped.length > 0) {
    console.log(`\n⏭️  Déjà existants — non écrasés (${skipped.length}) :`);
    skipped.forEach((f) => console.log(`   • ${f}`));
  }

  if (created.length > 0) {
    console.log(`\n📝 Prochaines étapes :`);
    console.log(`   1. Ouvrir chaque fichier et remplacer les [À COMPLÉTER]`);
    console.log(`   2. git add content/ && git commit -m "feat(content): articles ${label} ${annee}"`);
    console.log(`   3. git push → Vercel déploie automatiquement\n`);
  }
}

// ─── Lancement ────────────────────────────────────────────────────────────────

const { moisSlug, annee } = parseMoisAnnee();
generate(moisSlug, annee);
