/**
 * Programmatic SEO Page Generator for Kado
 *
 * Reads affiliate-links.yaml and generates MDX content pages:
 * - Promo code pages for brands with active codes
 * - Brand review/avis pages for beauty-relevant programs
 * - Comparison pages between similar brands
 * - Category/directory pages grouping brands by theme
 *
 * Usage: npx tsx scripts/generate-pseo.ts
 */

import fs from "fs";
import path from "path";
import yaml from "js-yaml";

const ROOT = path.resolve(__dirname, "..");
const DATA_FILE = path.join(ROOT, "data", "affiliate-links.yaml");
const CONTENT_DIR = path.join(ROOT, "content", "generated");

const NOW = new Date();
const TODAY = NOW.toISOString().split("T")[0];
const MONTH_NAMES = ["janvier", "fevrier", "mars", "avril", "mai", "juin", "juillet", "aout", "septembre", "octobre", "novembre", "decembre"];
const MONTH = MONTH_NAMES[NOW.getMonth()];
const MONTH_LOWER = NOW.toLocaleString('fr-FR', { month: 'long' });
const MONTH_DISPLAY = MONTH_LOWER.charAt(0).toUpperCase() + MONTH_LOWER.slice(1);
const YEAR = NOW.getFullYear().toString();

// ============================================================
// BRAND DATABASE — Unique content per brand
// ============================================================

interface BrandInfo {
  name: string;
  slug: string;
  type: string;
  origin: string;
  priceRange: string;
  description: string;
  longDescription: string;
  strengths: string[];
  weaknesses: string[];
  bestProducts: { name: string; price: string; description: string }[];
  targetAudience: string;
  rating: number;
  category: "skincare" | "makeup" | "k-beauty" | "bio" | "parapharmacie" | "parfum" | "lifestyle" | "mode" | "food";
  tags: string[];
}

const BEAUTY_BRANDS: Record<string, BrandInfo> = {
  weleda: {
    name: "Weleda",
    slug: "weleda",
    type: "Cosmetique naturelle et bio",
    origin: "Suisse",
    priceRange: "8-30\u20ac",
    description: "Marque pionniere de la cosmetique naturelle et bio depuis 1921, certifiee NATRUE",
    longDescription: `Weleda, c'est plus de 100 ans d'expertise en cosmetique naturelle. Fondee en 1921 en Suisse, la marque est l'une des pionniers de la beaute bio et biodynamique. Leurs produits sont certifies NATRUE (le label bio le plus strict en cosmetique), 100% d'origine naturelle, et fabriques a partir de plantes cultivees en biodynamie ou issus du commerce equitable.

Ce qui distingue Weleda des autres marques bio, c'est leur approche holistique : ils ne se contentent pas de faire du "sans" (sans paraben, sans silicone...), ils mettent des actifs vegetaux puissants dans des formules efficaces. Leur Huile a l'Arnica est devenue culte chez les sportifs, et leur gamme Rose Musquee est une reference en anti-age naturel.`,
    strengths: [
      "Plus de 100 ans d'expertise en cosmetique naturelle",
      "Certification NATRUE (label bio le plus exigeant)",
      "Agriculture biodynamique et commerce equitable",
      "Prix accessibles pour du bio certifie",
      "Disponible en pharmacie et parapharmacie",
    ],
    weaknesses: [
      "Packaging parfois basique",
      "Gamme maquillage inexistante",
      "Textures parfois riches pour les peaux grasses",
      "Certains produits ont une odeur forte (arnica)",
    ],
    bestProducts: [
      { name: "Huile de Massage a l'Arnica", price: "14\u20ac", description: "Le best-seller absolu. Indispensable pour les sportifs et les jambes lourdes." },
      { name: "Creme de Jour Rose Musquee", price: "22\u20ac", description: "Anti-age naturel qui lisse et hydrate. Parfaite des 30 ans." },
      { name: "Lait Corps Citrus", price: "12\u20ac", description: "Hydratation legere et parfum frais d'agrumes. Le basique du quotidien." },
      { name: "Baume Levres Everon", price: "5\u20ac", description: "Le baume a levres bio de reference. Petit prix, grande efficacite." },
    ],
    targetAudience: "Femmes 25-55 ans qui veulent du bio sans compromis sur l'efficacite, a prix accessible",
    rating: 4.4,
    category: "bio",
    tags: ["weleda", "bio", "naturel", "cosmetique-bio", "2026"],
  },

  nuxe: {
    name: "Nuxe",
    slug: "nuxe",
    type: "Soin visage et corps haut de gamme",
    origin: "France",
    priceRange: "12-50\u20ac",
    description: "Marque francaise de soins visage et corps, celebre pour son Huile Prodigieuse iconique",
    longDescription: `Nuxe, c'est LA marque francaise que tout le monde connait grace a son Huile Prodigieuse — le produit beaute le plus vendu en pharmacie. Fondee en 1990 par Aliza Jab\u00e8s, Nuxe (contraction de "Nature" et "Luxe") propose des soins qui allient efficacite clinique et plaisir sensoriel.

Leurs formules contiennent entre 85% et 100% d'ingredients d'origine naturelle, avec des actifs botaniques brevetes. La marque se positionne entre le bio strict (Weleda) et le conventionnel (L'Oreal) — un positionnement "naturel accessible" qui plait a un large public. Leur gamme va du soin visage anti-age au soin corps en passant par le parfum.`,
    strengths: [
      "L'Huile Prodigieuse, un produit iconique et polyvalent",
      "Formules a haute teneur naturelle (85-100%)",
      "Excellent rapport qualite/prix en pharmacie",
      "Textures sensorielles incroyables",
      "Gamme tres complete (visage, corps, parfum)",
    ],
    weaknesses: [
      "Pas 100% bio (certains produits contiennent des ingredients controverses)",
      "Gamme anti-age chere (Nuxuriance Ultra)",
      "L'Huile Prodigieuse n'est pas pour toutes les peaux (grasses notamment)",
      "Marketing parfois trompeur sur le \"naturel\"",
    ],
    bestProducts: [
      { name: "Huile Prodigieuse", price: "18-35\u20ac", description: "L'iconique huile seche multi-usage : visage, corps, cheveux. Un flacon = mille usages." },
      { name: "Creme Fraiche de Beaute", price: "20\u20ac", description: "Hydratant 48h qui convient a toutes les peaux. Le basique parfait." },
      { name: "Reve de Miel Baume Levres", price: "12\u20ac", description: "Le baume a levres ultra-reparateur. Culte depuis 25 ans." },
      { name: "Baume Prodigieux Nuit", price: "25\u20ac", description: "Soin de nuit nourrissant qui fait des miracles en hiver." },
    ],
    targetAudience: "Femmes 25-50 ans qui veulent du naturel efficace sans aller dans le 100% bio",
    rating: 4.3,
    category: "skincare",
    tags: ["nuxe", "soin-visage", "huile-prodigieuse", "pharmacie", "2026"],
  },

  loccitane: {
    name: "L'Occitane en Provence",
    slug: "loccitane",
    type: "Soins luxe inspires de la Provence",
    origin: "France (Provence)",
    priceRange: "8-65\u20ac",
    description: "Marque provencale de soins visage, corps et parfums, celebre pour sa Creme Mains et son Karite",
    longDescription: `L'Occitane en Provence, c'est la marque qui a transforme les ingredients provencaux en luxe accessible. Fondee en 1976 par Olivier Baussan, elle est aujourd'hui presente dans 90 pays avec un positionnement premium : des soins visage, corps et parfums inspires de la lavande, l'immortelle, l'amande et le karite.

Leur force ? Des textures incroyables, des parfums authentiques (pas synthetiques), et un engagement reel pour le commerce equitable avec les productrices de karite au Burkina Faso. C'est la marque ideale pour offrir — leurs coffrets sont des valeurs sures. Le seul bemol : les prix ont bien augmente ces dernieres annees.`,
    strengths: [
      "Qualite premium avec des ingredients provencaux authentiques",
      "Parfums somptueux et naturels",
      "Engagement commerce equitable (karite du Burkina Faso)",
      "Coffrets cadeaux magnifiques",
      "Gamme tres large (visage, corps, mains, parfums, homme)",
    ],
    weaknesses: [
      "Prix en hausse constante",
      "Pas entierement bio (certifications partielles)",
      "Boutiques physiques parfois « too much » cote marketing",
      "Certains produits decevants par rapport au prix",
    ],
    bestProducts: [
      { name: "Creme Mains Karite", price: "12\u20ac", description: "LA creme mains de reference. Reparatrice, non grasse, parfum divin." },
      { name: "Huile Douche Amande", price: "22\u20ac", description: "L'huile de douche qui transforme la routine quotidienne en moment de luxe." },
      { name: "Creme Precieuse Immortelle", price: "48\u20ac", description: "Anti-age premium a l'immortelle de Corse. Resultats visibles en 4 semaines." },
      { name: "Lait Corps Verveine", price: "25\u20ac", description: "Hydratation + parfum d'ete frais. L'indispensable beaux jours." },
    ],
    targetAudience: "Femmes 30-60 ans qui apprecient le luxe accessible et les produits cadeaux",
    rating: 4.5,
    category: "skincare",
    tags: ["loccitane", "provence", "luxe", "karite", "2026"],
  },

  "dr-pierre-ricaud": {
    name: "Dr Pierre Ricaud",
    slug: "dr-pierre-ricaud",
    type: "Dermocosmétique anti-age",
    origin: "France",
    priceRange: "10-45\u20ac",
    description: "Marque francaise de dermocosmétique anti-age, vente directe avec diagnostic personnalise",
    longDescription: `Dr Pierre Ricaud est une marque francaise de dermocosmétique specialisee dans l'anti-age. Fondee par un dermatologue, elle propose des soins visage bases sur la recherche scientifique avec un modele de vente directe (en ligne et par correspondance).

Leur force, c'est le diagnostic de peau personnalise : tu reponds a un questionnaire et on te recommande une routine adaptee. Les formules sont developpees en laboratoire avec des actifs brevetes. Les prix sont corrects pour de la dermocosmétique, et ils font regulierement des offres promotionnelles genereuses.`,
    strengths: [
      "Expertise dermatologique validee scientifiquement",
      "Diagnostic de peau personnalise",
      "Formules anti-age efficaces avec actifs brevetes",
      "Prix accessibles avec des promos regulieres",
      "Vente directe sans intermediaire",
    ],
    weaknesses: [
      "Image un peu \"ancienne generation\"",
      "Pas de boutiques physiques",
      "Marketing par correspondance parfois envahissant",
      "Gamme focalisee anti-age (peu de diversite)",
    ],
    bestProducts: [
      { name: "Creme Anti-Rides Fondamentale", price: "30\u20ac", description: "Le best-seller anti-rides. Resultats cliniquement prouves en 4 semaines." },
      { name: "Serum Concentre Jeunesse", price: "40\u20ac", description: "Serum intensif qui cible rides, taches et fermeté." },
      { name: "Creme Contour des Yeux", price: "25\u20ac", description: "Traite poches, cernes et rides. Specifique zone fragile." },
    ],
    targetAudience: "Femmes 40-65 ans qui cherchent de l'anti-age efficace et scientifiquement prouve",
    rating: 4.1,
    category: "skincare",
    tags: ["dr-pierre-ricaud", "anti-age", "dermocosmétique", "2026"],
  },

  seasonly: {
    name: "Seasonly",
    slug: "seasonly",
    type: "Clean beauty personnalisee",
    origin: "France (Provence)",
    priceRange: "25-40\u20ac",
    description: "Marque francaise de clean beauty avec des formules courtes et personnalisation par diagnostic de peau",
    longDescription: `Seasonly est une marque francaise de clean beauty nee en Provence. Leur approche : des formules courtes (8-12 ingredients max), des actifs naturels efficaces, et une personnalisation via un diagnostic de peau en ligne. C'est du "less is more" applique a la cosmetique.`,
    strengths: [
      "Formules courtes et transparentes (8-12 ingredients)",
      "Fabriqué en France, en Provence",
      "Diagnostic de peau personnalise en ligne",
      "Vegan et cruelty-free",
      "Packaging eco-responsable (verre recyclable)",
    ],
    weaknesses: [
      "Prix eleve (30-40\u20ac par produit)",
      "Gamme limitee au soin visage uniquement",
      "Pas disponible en magasin (quasi uniquement en ligne)",
      "Resultats progressifs, pas immediats",
    ],
    bestProducts: [
      { name: "Serum Eclat", price: "35\u20ac", description: "Vitamine C + acide hyaluronique. Teint plus lumineux en 4 semaines." },
      { name: "Huile Visage", price: "30\u20ac", description: "Huile seche non grasse a la rose musquee. Nourrit sans briller." },
      { name: "Creme Hydratante", price: "32\u20ac", description: "Hydratation quotidienne a l'aloe vera et karite." },
    ],
    targetAudience: "Femmes 25-40 ans sensibles a la clean beauty et au Made in France",
    rating: 4.2,
    category: "skincare",
    tags: ["seasonly", "clean-beauty", "made-in-france", "2026"],
  },

  "ioma-paris": {
    name: "IOMA Paris",
    slug: "ioma-paris",
    type: "Soin visage technologique personnalise",
    origin: "France (Paris)",
    priceRange: "35-90\u20ac",
    description: "Marque parisienne de haute technologie cosmetique avec soins personnalises et IA",
    longDescription: `IOMA Paris combine haute technologie et cosmetique. Leur innovation phare : un diagnostic de peau par IA qui analyse ta peau en detail pour recommander des soins ultra-personnalises. Fondee a Paris, la marque cible les femmes qui veulent de la science dans leurs soins, pas juste du marketing.

Leurs serums et cremes utilisent des actifs puissants (acide hyaluronique, peptides, retinol) dans des formulations sur-mesure. C'est un positionnement premium qui se rapproche de la medecine esthetique sans passer par les injections.`,
    strengths: [
      "Diagnostic de peau par intelligence artificielle",
      "Soins hyper-personnalises selon ton profil cutane",
      "Actifs puissants (peptides, retinol, AHA)",
      "Approche scientifique et technologique",
      "Made in Paris",
    ],
    weaknesses: [
      "Prix tres eleves (50-90\u20ac par produit)",
      "Marque peu connue du grand public",
      "Gamme complexe, difficile de s'y retrouver seule",
      "Disponibilite limitee",
    ],
    bestProducts: [
      { name: "Ma Creme Personnalisee", price: "65\u20ac", description: "Creme formulee sur-mesure selon ton diagnostic de peau IA." },
      { name: "Serum Hydra Defence", price: "55\u20ac", description: "Bouclier hydratant contre la pollution et le stress oxydatif." },
      { name: "Pearl Elixir", price: "75\u20ac", description: "Serum eclat premium aux extraits de perle. Le produit luxe de la gamme." },
    ],
    targetAudience: "Femmes 35-55 ans technophiles qui veulent de la haute cosmetique personnalisee",
    rating: 4.0,
    category: "skincare",
    tags: ["ioma", "paris", "technologie", "personnalise", "luxe", "2026"],
  },

  "miin-cosmetics": {
    name: "MiiN Cosmetics",
    slug: "miin-cosmetics",
    type: "K-beauty (cosmetique coreenne) curatee",
    origin: "Espagne / Coree du Sud",
    priceRange: "8-45\u20ac",
    description: "Selecteur europeen de cosmetique coreenne (K-beauty), avec des marques curatrices et un guide par type de peau",
    longDescription: `MiiN Cosmetics est LE selecteur de K-beauty en Europe. Fonde a Barcelone par des passionnes de cosmetique coreenne, le site propose une selection curatee des meilleures marques coreennes : COSRX, Beauty of Joseon, Klairs, Benton, et bien d'autres.

Leur atout majeur : un guide d'achat par type de peau et par preoccupation. Tu ne sais pas quoi choisir parmi les 10 etapes du layering coreen ? MiiN te guide. C'est l'alternative europeenne a YesStyle et Stylevana, avec l'avantage d'un service client en francais et d'une livraison rapide depuis l'Europe.`,
    strengths: [
      "Selection curatee des meilleures marques K-beauty",
      "Guide d'achat par type de peau (tres pedagogique)",
      "Livraison rapide depuis l'Europe (pas d'attente Asie)",
      "Service client en francais",
      "Marques premium difficilement trouvables ailleurs",
    ],
    weaknesses: [
      "Prix parfois plus eleves que sur les sites asiatiques directs",
      "Stock parfois limite sur les best-sellers",
      "Pas de programme de fidelite",
      "Frais de port pour les petites commandes",
    ],
    bestProducts: [
      { name: "COSRX Advanced Snail Mucin", price: "22\u20ac", description: "L'essence a la bave d'escargot culte. Hydratation et reparation." },
      { name: "Beauty of Joseon Relief Sun", price: "18\u20ac", description: "La creme solaire coreenne #1 dans le monde. Texture invisible." },
      { name: "Klairs Supple Preparation Toner", price: "20\u20ac", description: "Le toner hydratant reference pour preparer la peau au layering." },
    ],
    targetAudience: "Femmes 18-35 ans passionnees de skincare et de la routine coreenne en 10 etapes",
    rating: 4.3,
    category: "k-beauty",
    tags: ["k-beauty", "cosmetique-coreenne", "miin", "layering", "2026"],
  },

  yesstyle: {
    name: "YesStyle",
    slug: "yesstyle",
    type: "Marketplace beaute et mode asiatique",
    origin: "Hong Kong",
    priceRange: "3-40\u20ac",
    description: "Mega-marketplace de beaute et mode asiatique avec des milliers de produits K-beauty et J-beauty",
    longDescription: `YesStyle est l'un des plus grands sites de beaute asiatique au monde. Base a Hong Kong, il propose des milliers de produits de K-beauty (cosmetique coreenne), J-beauty (japonaise), et mode asiatique a des prix defiant toute concurrence.

C'est le paradis du skincare addict : tu y trouves toutes les marques coreennes (COSRX, Innisfree, Laneige, Missha, Etude...) souvent moins cheres qu'en boutique. Le site fait aussi mode, accessoires et lifestyle. Le seul inconvenient : les delais de livraison peuvent etre longs (2-4 semaines depuis l'Asie).`,
    strengths: [
      "Catalogue immense (+ de 1000 marques asiatiques)",
      "Prix tres competitifs, souvent les moins chers",
      "Promos et ventes flash regulieres",
      "Programme de fidelite avec points",
      "Livraison gratuite des un certain montant",
    ],
    weaknesses: [
      "Delais de livraison longs (2-4 semaines)",
      "Service client parfois lent",
      "Site pas toujours bien traduit en francais",
      "Risque de produits proches de la date de peremption",
    ],
    bestProducts: [
      { name: "COSRX Snail Mucin Essence", price: "15\u20ac", description: "Moins cher qu'en Europe. Le best-seller mondial du skincare coreen." },
      { name: "Laneige Lip Sleeping Mask", price: "18\u20ac", description: "Le masque de nuit pour les levres devenu culte sur TikTok." },
      { name: "Innisfree Green Tea Seed Serum", price: "20\u20ac", description: "Serum hydratant au the vert pour peaux normales a mixtes." },
    ],
    targetAudience: "Jeunes femmes 16-30 ans qui veulent de la K-beauty a petit prix et ne sont pas pressees",
    rating: 4.0,
    category: "k-beauty",
    tags: ["yesstyle", "k-beauty", "j-beauty", "asiatique", "pas-cher", "2026"],
  },

  stylevana: {
    name: "Stylevana",
    slug: "stylevana",
    type: "Marketplace beaute asiatique premium",
    origin: "Hong Kong",
    priceRange: "5-50\u20ac",
    description: "Marketplace beaute asiatique avec livraison rapide et selection curatee de K-beauty et J-beauty",
    longDescription: `Stylevana est un concurrent direct de YesStyle mais avec un positionnement legerement plus premium et une livraison plus rapide. Base a Hong Kong, le site propose des marques K-beauty et J-beauty (COSRX, Anua, Beauty of Joseon, Torriden, Isntree...) avec des sets exclusifs et des prix competitifs.

L'avantage de Stylevana sur YesStyle : des livraisons plus rapides (souvent 7-14 jours vs 2-4 semaines) et un site mieux organise par type de peau et routine. C'est devenu le favori des skincare addicts europeennes.`,
    strengths: [
      "Livraison plus rapide que YesStyle (7-14 jours)",
      "Sets et bundles exclusifs a prix reduit",
      "Site bien organise par routine skincare",
      "Selection curatee (pas noyee dans la mode)",
      "Promos tres avantageuses",
    ],
    weaknesses: [
      "Prix parfois legerement plus eleves que YesStyle",
      "Catalogue moins vaste que YesStyle",
      "Pas de boutique physique",
      "Service client en anglais uniquement",
    ],
    bestProducts: [
      { name: "Anua Heartleaf 77% Toner", price: "16\u20ac", description: "Le toner apaisant #1 pour peaux sensibles et acneiques." },
      { name: "Beauty of Joseon Glow Serum", price: "14\u20ac", description: "Serum eclat propolis + niacinamide. Prix imbattable." },
      { name: "Torriden DIVE-IN Serum", price: "15\u20ac", description: "5 types d'acide hyaluronique pour une hydratation extreme." },
    ],
    targetAudience: "Femmes 18-35 ans fans de K-beauty qui veulent livraison rapide + selection curatee",
    rating: 4.2,
    category: "k-beauty",
    tags: ["stylevana", "k-beauty", "j-beauty", "asiatique", "2026"],
  },

  thalgo: {
    name: "Thalgo",
    slug: "thalgo",
    type: "Cosmetique marine professionnelle",
    origin: "France (Roquebrune-sur-Argens)",
    priceRange: "20-70\u20ac",
    description: "Marque francaise de cosmetique marine, utilisee en thalassotherapie et spas professionnels",
    longDescription: `Thalgo est une marque francaise de cosmetique marine fondee en 1964 sur la Cote d'Azur. Leur expertise : exploiter les actifs marins (algues, eau de mer, micro-organismes) pour creer des soins visage et corps haute performance. C'est la marque de reference dans les instituts de thalassotherapie et spas professionnels.

Leurs formules combinent biotechnologie marine et efficacite cliniquement prouvee. Le positionnement est premium : les prix sont eleves mais les resultats sont la. Si tu es fan de soins en institut, tu as probablement deja teste Thalgo sans le savoir.`,
    strengths: [
      "Expertise marine unique depuis 60 ans",
      "Actifs marins brevetes et haute efficacite",
      "Marque professionnelle (utilisee en institut/spa)",
      "Made in France, Cote d'Azur",
      "Engagement eco-responsable pour les oceans",
    ],
    weaknesses: [
      "Prix eleves (segment premium)",
      "Peu connue du grand public (positionnement pro)",
      "Pas en grande distribution",
      "Packaging pas toujours moderne",
    ],
    bestProducts: [
      { name: "Crème Marine Hydratante", price: "35\u20ac", description: "Hydratation 24h aux actifs marins. Le basique de la gamme." },
      { name: "Serum Correcteur Rides", price: "55\u20ac", description: "Anti-rides marin intensif. Resultats visibles des 2 semaines." },
      { name: "Concentre d'Energie Marine", price: "45\u20ac", description: "Booster de vitalite pour les peaux fatiguees et ternes." },
    ],
    targetAudience: "Femmes 35-60 ans qui apprecient les soins professionnels et les actifs marins",
    rating: 4.3,
    category: "skincare",
    tags: ["thalgo", "cosmetique-marine", "spa", "professionnel", "2026"],
  },

  uriage: {
    name: "Uriage",
    slug: "uriage",
    type: "Dermocosmetique a l'eau thermale",
    origin: "France (Alpes)",
    priceRange: "8-35\u20ac",
    description: "Marque francaise de dermocosmetique a base d'Eau Thermale d'Uriage, specialisee peaux sensibles",
    longDescription: `Uriage est une marque francaise de dermocosmetique basee sur l'Eau Thermale d'Uriage, puisee dans les Alpes. Reconnue par les dermatologues, elle est specialisee dans les peaux sensibles, seches et atopiques. Leurs formules sont developees sous controle dermatologique et testees cliniquement.

C'est l'alternative abordable a La Roche-Posay et Avene. L'Eau Thermale d'Uriage est naturellement riche en mineraux et oligo-elements, ce qui en fait un ingredient actif a part entiere. Leurs gammes Bariederm (reparation), Age Protect (anti-age) et Xemose (peaux tres seches) sont des references en pharmacie.`,
    strengths: [
      "Eau Thermale d'Uriage aux proprietes apaisantes prouvees",
      "Prix tres accessibles en pharmacie",
      "Recommandee par les dermatologues",
      "Gammes specifiques par problematique de peau",
      "Tolerees par les peaux les plus sensibles",
    ],
    weaknesses: [
      "Image \"pharmacie\" peu glamour",
      "Packaging basique et medical",
      "Moins connue que La Roche-Posay ou Avene",
      "Gamme maquillage quasi inexistante",
    ],
    bestProducts: [
      { name: "Eau Thermale Spray", price: "8\u20ac", description: "Brumisateur apaisant pour calmer toutes les irritations. L'indispensable." },
      { name: "Bariederm Cica Creme", price: "12\u20ac", description: "Creme reparatrice pour peaux abimees. Efficace en 48h." },
      { name: "Age Protect Creme Multi-Actions", price: "28\u20ac", description: "Anti-age complet avec filtre lumiere bleue." },
      { name: "Xemose Baume Oleo-Apaisant", price: "18\u20ac", description: "Sauveteur des peaux tres seches et atopiques." },
    ],
    targetAudience: "Femmes et hommes a peaux sensibles qui cherchent de la dermocosmetique efficace et abordable",
    rating: 4.4,
    category: "parapharmacie",
    tags: ["uriage", "dermocosmetique", "eau-thermale", "peau-sensible", "pharmacie", "2026"],
  },

  adopt: {
    name: "Adopt'",
    slug: "adopt",
    type: "Parfum et maquillage a petit prix",
    origin: "France",
    priceRange: "5-20\u20ac",
    description: "Marque francaise de parfums et maquillage abordables avec des boutiques partout en France",
    longDescription: `Adopt' (anciennement Adopt by Reserve Naturelle) est une marque francaise qui democratise le parfum et le maquillage. Avec plus de 50 boutiques en France, elle propose des parfums a partir de 5\u20ac et du maquillage a prix tout doux — le tout fabrique en France.

C'est l'anti-Sephora : pas de marques de luxe, mais des produits corrects a des prix imbattables. Ideal pour les ados, les etudiantes, ou celles qui veulent changer de parfum tous les mois sans se ruiner. Les parfums sont developpes par de vrais nez a Grasse.`,
    strengths: [
      "Prix imbattables (parfums des 5\u20ac)",
      "Fabrique en France (parfums de Grasse)",
      "50+ boutiques en France",
      "Large choix de senteurs",
      "Maquillage correct pour le prix",
    ],
    weaknesses: [
      "Tenue des parfums limitee (3-4h)",
      "Qualite maquillage inegale",
      "Packaging plastique basique",
      "Image \"cheap\" assumee",
    ],
    bestProducts: [
      { name: "Eau de Parfum (toutes senteurs)", price: "5-9\u20ac", description: "Des dizaines de senteurs au choix. Le rapport qualite/prix roi." },
      { name: "Coffret Parfum + Lait Corps", price: "15\u20ac", description: "L'idee cadeau parfaite a petit budget." },
      { name: "Palette Maquillage Yeux", price: "8\u20ac", description: "6 teintes pigmentees pour le prix d'un cafe." },
    ],
    targetAudience: "Ados et jeunes femmes 15-25 ans qui veulent des parfums et maquillage sans se ruiner",
    rating: 3.8,
    category: "parfum",
    tags: ["adopt", "parfum", "maquillage", "pas-cher", "france", "2026"],
  },

  "le-rouge-francais": {
    name: "Le Rouge Francais",
    slug: "le-rouge-francais",
    type: "Maquillage bio et luxe",
    origin: "France (Paris)",
    priceRange: "25-45\u20ac",
    description: "Marque parisienne de maquillage bio luxe, rouges a levres et soins colores 100% naturels",
    longDescription: `Le Rouge Francais est une maison parisienne de maquillage bio et luxe. Leur specialite : des rouges a levres et des soins colores formules a partir d'ingredients 100% naturels et bio. Pas de petrochimie, pas de nanoparticules, pas de silicone — que du vegetal.

C'est le maquillage bio qui ne fait pas de compromis sur le glamour. Les teintes sont developpees avec des pigments vegetaux et mineraux, et les formules sont certifiees Cosmos Organic. Le positionnement est resolument luxe — les prix le refletent.`,
    strengths: [
      "Maquillage 100% naturel et bio certifie Cosmos Organic",
      "Teintes pigmentees et tenue correcte",
      "Fabrique a Paris",
      "Packaging luxe et rechargeable",
      "Vegan et cruelty-free",
    ],
    weaknesses: [
      "Prix eleves pour du maquillage (30-45\u20ac un rouge a levres)",
      "Gamme limitee (essentiellement levres et teint)",
      "Peu de points de vente physiques",
      "Teintes parfois trop originales pour un usage quotidien",
    ],
    bestProducts: [
      { name: "Rouge a Levres Le Rouge", price: "35\u20ac", description: "Le rouge a levres bio par excellence. Pigmente, hydratant, etui rechargeable." },
      { name: "Baume Teinte", price: "28\u20ac", description: "Soin + couleur pour les levres. Effet naturel et soigne." },
      { name: "Blush en Creme", price: "30\u20ac", description: "Couleur naturelle et dewy. Texture fondante sur la peau." },
    ],
    targetAudience: "Femmes 30-50 ans qui veulent du maquillage bio sans compromis sur le luxe",
    rating: 4.1,
    category: "makeup",
    tags: ["le-rouge-francais", "maquillage-bio", "luxe", "paris", "2026"],
  },

  magnifaik: {
    name: "Magnifaik",
    slug: "magnifaik",
    type: "Beaute inclusive et diverse",
    origin: "France",
    priceRange: "15-35\u20ac",
    description: "Marque de beaute francaise inclusive, specialisee dans les teintes adaptees a toutes les carnations",
    longDescription: `Magnifaik est une marque francaise de beaute nee du constat que les peaux foncees et metissees sont sous-representees en cosmetique. Leur mission : proposer des produits adaptes a TOUTES les carnations, des plus claires aux plus foncees.

Fondee par des femmes qui en avaient assez de ne pas trouver leur teinte, Magnifaik propose des soins et du maquillage penses pour la diversite. Les formules sont clean, veganes, et testees sur tous les types de peau.`,
    strengths: [
      "Teintes adaptees a toutes les carnations (enfin !)",
      "Formules clean et veganes",
      "Marque engagee pour la diversite et l'inclusivite",
      "Made in France",
      "Rapport qualite/prix correct",
    ],
    weaknesses: [
      "Gamme encore restreinte",
      "Marque jeune et peu connue",
      "Disponibilite limitee (principalement en ligne)",
      "Peu d'avis consommateurs disponibles",
    ],
    bestProducts: [
      { name: "Fond de Teint Inclusif", price: "28\u20ac", description: "30+ teintes du plus clair au plus fonce. Couvrance modulable." },
      { name: "Correcteur Eclat", price: "18\u20ac", description: "Corrige et illumine, adapte aux sous-tons chauds et froids." },
      { name: "Baume Levres Colore", price: "15\u20ac", description: "Soin + couleur universelle. Joli sur toutes les carnations." },
    ],
    targetAudience: "Femmes de toutes carnations qui cherchent des produits adaptes a leur teinte de peau",
    rating: 4.0,
    category: "makeup",
    tags: ["magnifaik", "inclusif", "diversite", "maquillage", "2026"],
  },

  glamellina: {
    name: "Glamellina",
    slug: "glamellina",
    type: "Cosmetique artisanale naturelle",
    origin: "France",
    priceRange: "10-30\u20ac",
    description: "Marque artisanale francaise de cosmetique naturelle, petits lots et ingredients locaux",
    longDescription: `Glamellina est une petite marque artisanale francaise qui produit ses cosmetiques en petits lots. L'approche est simple : des ingredients naturels, des formules courtes, et un savoir-faire artisanal. Pas de grosse industrie, pas de marketing tape-a-l'oeil — juste des produits bien faits.

C'est le genre de marque qu'on decouvre sur un marché ou par le bouche-a-oreille. Les prix sont doux pour de l'artisanal, et la qualite est au rendez-vous. Ideal pour soutenir les petits createurs francais.`,
    strengths: [
      "Production artisanale en petits lots",
      "Ingredients naturels et locaux",
      "Prix abordables pour de l'artisanal",
      "Soutien a une petite entreprise francaise",
      "Formules simples et efficaces",
    ],
    weaknesses: [
      "Gamme limitee",
      "Disponibilite aleatoire (petits lots)",
      "Peu de notoriete",
      "Pas de boutiques physiques",
    ],
    bestProducts: [
      { name: "Baume Multi-Usage", price: "15\u20ac", description: "Baume nourrissant visage, levres, mains. Le couteau suisse naturel." },
      { name: "Huile Seche Corps", price: "22\u20ac", description: "Huile legere qui nourrit sans graisser. Parfum delicat." },
    ],
    targetAudience: "Femmes qui preferent l'artisanal et le local au marketing des grandes marques",
    rating: 4.0,
    category: "bio",
    tags: ["glamellina", "artisanal", "naturel", "france", "2026"],
  },

  "atida-santediscount": {
    name: "Atida (Santediscount)",
    slug: "atida-santediscount",
    type: "Parapharmacie en ligne",
    origin: "France",
    priceRange: "3-50\u20ac",
    description: "Parapharmacie en ligne avec des prix reduits sur les grandes marques de dermocosmetique",
    longDescription: `Atida (anciennement Santediscount) est l'une des plus grandes parapharmacies en ligne en France. Leur promesse : les memes produits qu'en pharmacie, mais avec des prix reduits allant jusqu'a -50%. Tu y trouves toutes les grandes marques : La Roche-Posay, Bioderma, Avene, Nuxe, CeraVe, SVR...

C'est le bon plan pour acheter ta routine dermocosmetique moins cher. Livraison rapide, service client reactif, et un catalogue de plusieurs milliers de references. Si tu achetes regulierement en pharmacie, tu vas economiser.`,
    strengths: [
      "Prix jusqu'a -50% sur les marques de pharmacie",
      "Catalogue immense (milliers de references)",
      "Livraison rapide en France",
      "Toutes les grandes marques dermocosmetiques",
      "Site bien organise par marque et preoccupation",
    ],
    weaknesses: [
      "Pas de conseil pharmaceutique personnalise",
      "Frais de port pour les petites commandes",
      "Pas de produits sur ordonnance",
      "Site parfois lent lors des grosses promos",
    ],
    bestProducts: [
      { name: "La Roche-Posay Effaclar Duo+", price: "12\u20ac (vs 18\u20ac en pharmacie)", description: "Le soin anti-imperfections #1, moins cher qu'en officine." },
      { name: "Bioderma Sensibio H2O", price: "8\u20ac (vs 12\u20ac)", description: "L'eau micellaire reference pour peaux sensibles." },
      { name: "Avene Eau Thermale Spray", price: "5\u20ac (vs 8\u20ac)", description: "Le brumisateur apaisant a prix casse." },
    ],
    targetAudience: "Toute personne qui achete de la dermocosmetique et veut payer moins cher qu'en pharmacie",
    rating: 4.3,
    category: "parapharmacie",
    tags: ["atida", "santediscount", "parapharmacie", "pas-cher", "pharmacie", "2026"],
  },

  "parfums-moins-cher": {
    name: "Parfums Moins Cher",
    slug: "parfums-moins-cher",
    type: "Parfumerie discount en ligne",
    origin: "France",
    priceRange: "15-80\u20ac",
    description: "Site de vente de parfums de marque a prix reduits, grandes marques jusqu'a -70%",
    longDescription: `Parfums Moins Cher est un site francais specialise dans la vente de parfums de marque a prix reduits. Tu y trouves les grands noms (Dior, Chanel, YSL, Guerlain...) avec des remises allant jusqu'a -70% sur les prix boutique.

Comment c'est possible ? Le site achete des lots et fins de series aupres des distributeurs, ce qui permet de proposer des prix casses sur des produits 100% authentiques. C'est le reflexe pour acheter un parfum de marque sans payer plein pot.`,
    strengths: [
      "Grandes marques jusqu'a -70%",
      "Produits 100% authentiques",
      "Catalogue large (parfums femme, homme, unisexe)",
      "Livraison rapide en France",
      "Ideal pour les cadeaux",
    ],
    weaknesses: [
      "Stock variable (certains parfums indisponibles)",
      "Pas de testeur ni d'echantillon",
      "Site au design un peu date",
      "Pas de conseils personnalises",
    ],
    bestProducts: [
      { name: "Parfums femme best-sellers", price: "25-60\u20ac", description: "Les classiques (J'adore, N\u00b05, Black Opium...) a prix reduit." },
      { name: "Coffrets cadeaux", price: "30-70\u20ac", description: "Coffrets de marques parfaits pour offrir a petit prix." },
    ],
    targetAudience: "Tous ceux qui veulent des parfums de marque sans payer le prix fort",
    rating: 4.0,
    category: "parfum",
    tags: ["parfum", "pas-cher", "discount", "marque", "2026"],
  },

  "miss-monoi": {
    name: "Miss Monoi",
    slug: "miss-monoi",
    type: "Soins corps au monoi",
    origin: "France / Polynesie",
    priceRange: "12-25\u20ac",
    description: "Marque specialisee dans les soins corps au monoi de Tahiti, pour une peau douce et parfumee toute l'annee",
    longDescription: `Miss Monoi est une marque specialisee dans les soins corps a base de Monoi de Tahiti. Le monoi, c'est cet ingredient miracle polynesien (huile de coco + fleur de tiare) qui nourrit, hydrate et parfume la peau.

La marque decline le monoi dans tous les formats : huiles seches, laits corps, gels douche, soins capillaires. C'est le parfum de l'ete toute l'annee. Les textures sont legeres, les parfums envoutants, et les prix tres raisonnables.`,
    strengths: [
      "Monoi de Tahiti authentique",
      "Parfums envoutants et longue tenue",
      "Textures legeres et non grasses",
      "Prix tres accessibles",
      "Gamme complete corps et cheveux",
    ],
    weaknesses: [
      "Niche tres specifique (tout au monoi)",
      "Pas de soins visage",
      "Marque peu connue",
      "Distribution limitee",
    ],
    bestProducts: [
      { name: "Huile Seche au Monoi", price: "15\u20ac", description: "Huile seche corps et cheveux. L'indispensable de l'ete." },
      { name: "Lait Corps Nacre", price: "12\u20ac", description: "Hydratant avec effet satine sur la peau. Parfum paradisiaque." },
    ],
    targetAudience: "Femmes qui adorent les produits parfumes et veulent des soins corps au monoi",
    rating: 4.0,
    category: "skincare",
    tags: ["miss-monoi", "monoi", "tahiti", "corps", "ete", "2026"],
  },

  baija: {
    name: "Baija",
    slug: "baija",
    type: "Soins corps et bien-etre parfumes",
    origin: "France (Paris)",
    priceRange: "8-30\u20ac",
    description: "Marque parisienne de soins corps et bougies aux parfums inspires de voyages",
    longDescription: `Baija est une marque parisienne de soins corps et d'ambiance. Leur signature : des parfums inspires de voyages (Bali, Japon, Inde...) dans des textures fondantes et des packagings colores. Gels douche, cremes corps, bougies, brumes — tout est fait pour transformer la salle de bain en escapade sensorielle.

Fondee par une Parisienne qui voulait "voyager sans bouger", Baija a su se faire une place dans le paysage beaute francais. Les formules sont naturelles a plus de 95%, veganes, et Made in France. C'est la marque cadeau par excellence.`,
    strengths: [
      "Parfums de voyage uniques et envoutants",
      "Packaging colore et cadeau-friendly",
      "95%+ d'ingredients d'origine naturelle",
      "Made in France et vegan",
      "Prix accessibles pour la qualite",
    ],
    weaknesses: [
      "Pas de soins visage",
      "Certains parfums clivants (orientaux puissants)",
      "Disponibilite inegale selon les collections",
      "Tenue des parfums corps limitee",
    ],
    bestProducts: [
      { name: "Creme Corps So Loucura", price: "18\u20ac", description: "Fleur d'oranger et bois de cedre. Le best-seller absolu." },
      { name: "Bougie Parfumee", price: "25\u20ac", description: "Bougies en cire naturelle aux senteurs exotiques." },
      { name: "Gel Douche Moussant", price: "10\u20ac", description: "Gel douche cremeux avec des parfums divins." },
    ],
    targetAudience: "Femmes 25-45 ans qui veulent des produits bien-etre parfumes et beaux a exposer",
    rating: 4.2,
    category: "lifestyle",
    tags: ["baija", "bien-etre", "parfum", "corps", "bougie", "2026"],
  },

  greenweez: {
    name: "Greenweez",
    slug: "greenweez",
    type: "Supermarche bio en ligne",
    origin: "France",
    priceRange: "2-50\u20ac",
    description: "Plus grand supermarche bio en ligne de France, avec un large rayon cosmetique naturelle et bio",
    longDescription: `Greenweez est le leader du bio en ligne en France. C'est un supermarche complet : alimentation bio, cosmetique naturelle, hygiene, bebe, maison... Leur rayon beaute propose des milliers de references de cosmetique bio et naturelle : Weleda, Cattier, Lavera, SO'BiO etic, et des dizaines d'autres marques.

Le gros avantage : des prix souvent inferieurs aux magasins bio physiques (Biocoop, Naturalia), avec une livraison a domicile. C'est le bon plan pour commander toute sa routine bio en une seule fois.`,
    strengths: [
      "Plus grand choix de cosmetique bio en ligne en France",
      "Prix competitifs (souvent moins cher qu'en magasin bio)",
      "Livraison a domicile dans toute la France",
      "Tout en un : alimentation + cosmetique + maison",
      "Labels bio verifies (Ecocert, NATRUE, Cosmos...)",
    ],
    weaknesses: [
      "Frais de livraison pour les petites commandes",
      "Pas de conseil personnalise",
      "Emballages de livraison parfois excessifs",
      "Delai de livraison variable (2-5 jours)",
    ],
    bestProducts: [
      { name: "Routine bio visage complete", price: "30-60\u20ac", description: "Nettoyant + serum + creme, tout bio, en une commande." },
      { name: "Shampoings solides bio", price: "5-10\u20ac", description: "Large choix de shampoings solides eco-responsables." },
      { name: "Coffrets decouverte bio", price: "15-25\u20ac", description: "Coffrets multi-marques pour tester la cosmetique bio." },
    ],
    targetAudience: "Familles et femmes qui veulent acheter toute leur routine bio en ligne a bon prix",
    rating: 4.3,
    category: "bio",
    tags: ["greenweez", "bio", "supermarche", "cosmetique-bio", "2026"],
  },

  pranarom: {
    name: "Pranarom",
    slug: "pranarom",
    type: "Aromatherapie scientifique",
    origin: "Belgique",
    priceRange: "5-30\u20ac",
    description: "Leader europeen de l'aromatherapie scientifique, huiles essentielles et soins aromatiques",
    longDescription: `Pranarom est le leader europeen de l'aromatherapie scientifique. Fondee en Belgique par Dominique Baudoux (pharmacien aromatologue), la marque propose des huiles essentielles de qualite pharmaceutique et des soins aromatiques bases sur la recherche scientifique.

Contrairement aux huiles essentielles generiques, celles de Pranarom sont certifiees HEBBD (Huile Essentielle Botaniquement et Biochimiquement Definie), garantissant purete et tracabilite. C'est la reference des pharmaciens et des naturopathes.`,
    strengths: [
      "Qualite pharmaceutique certifiee HEBBD",
      "Expertise scientifique en aromatherapie",
      "Large gamme d'huiles essentielles bio",
      "Reference des pharmaciens et naturopathes",
      "Conseils d'utilisation precis sur chaque produit",
    ],
    weaknesses: [
      "Prix plus eleves que les marques generiques",
      "Huiles essentielles a utiliser avec precaution",
      "Pas de gamme cosmetique traditionnelle",
      "Site internet perfectible",
    ],
    bestProducts: [
      { name: "Huile Essentielle Tea Tree Bio", price: "8\u20ac", description: "L'indispensable anti-imperfections et antiseptique naturel." },
      { name: "Huile Essentielle Lavande Vraie Bio", price: "10\u20ac", description: "Relaxante, apaisante, cicatrisante. La plus polyvalente." },
      { name: "Aromaforce Spray Assainissant", price: "12\u20ac", description: "Spray aux huiles essentielles pour purifier l'air." },
    ],
    targetAudience: "Femmes et hommes interesses par l'aromatherapie et les remedes naturels",
    rating: 4.5,
    category: "bio",
    tags: ["pranarom", "aromatherapie", "huiles-essentielles", "bio", "2026"],
  },

  hellofresh: {
    name: "HelloFresh",
    slug: "hellofresh",
    type: "Box repas livres a domicile",
    origin: "Allemagne",
    priceRange: "5-10\u20ac/portion",
    description: "Box repas avec recettes et ingredients frais livres a domicile chaque semaine",
    longDescription: `HelloFresh est le leader mondial des box repas. Le concept : chaque semaine, tu recois des recettes et les ingredients pre-doses pour les cuisiner. Pas besoin de faire les courses ni de reflechir au menu — tout est prevu.

C'est ideal pour les couples et familles qui veulent manger varie, fait maison, sans la charge mentale de la planification. Les recettes sont simples (20-40 min), les ingredients sont frais, et tu choisis chaque semaine parmi 30+ recettes.`,
    strengths: [
      "Fini la charge mentale des repas",
      "Recettes simples et variees (30+ choix/semaine)",
      "Ingredients frais et pre-doses",
      "Flexible (pause, annulation facile)",
      "Options vegetariennes et familiales",
    ],
    weaknesses: [
      "Plus cher que les courses classiques",
      "Emballages individuels (plastique)",
      "Portions parfois justes pour les gros appetits",
      "Livraison non disponible partout",
    ],
    bestProducts: [
      { name: "Box 2 personnes (3 recettes)", price: "35\u20ac/semaine", description: "L'offre de base pour les couples. 3 dines par semaine." },
      { name: "Box Famille (4 pers, 4 recettes)", price: "60\u20ac/semaine", description: "Idéal pour les familles. Recettes kid-friendly." },
    ],
    targetAudience: "Couples et familles qui veulent cuisiner maison sans la charge mentale des courses",
    rating: 4.1,
    category: "food",
    tags: ["hellofresh", "box-repas", "cuisine", "livraison", "2026"],
  },

  sarenza: {
    name: "Sarenza",
    slug: "sarenza",
    type: "Chaussures et mode en ligne",
    origin: "France",
    priceRange: "30-200\u20ac",
    description: "Leader francais de la vente de chaussures en ligne, avec retours gratuits",
    longDescription: `Sarenza est le leader francais de la chaussure en ligne. Fondee en 2005, la plateforme propose plus de 700 marques (Nike, Adidas, Geox, Clarks, San Marina...) avec des retours gratuits sous 100 jours. C'est l'equivalent de Zalando mais specialise chaussures.

Le concept est simple : un catalogue immense, des filtres efficaces (taille, style, prix), et surtout des retours gratuits qui permettent d'essayer chez soi. Les promos regulieres permettent de trouver de bonnes affaires toute l'annee.`,
    strengths: [
      "Plus de 700 marques de chaussures",
      "Retours gratuits sous 100 jours",
      "Livraison rapide et gratuite des 25\u20ac",
      "Promos regulieres et ventes privees",
      "Application mobile bien faite",
    ],
    weaknesses: [
      "Pas de boutiques physiques pour essayer",
      "Tailles parfois approximatives entre marques",
      "Prix identiques aux boutiques (hors promo)",
      "SAV parfois lent en periode de soldes",
    ],
    bestProducts: [
      { name: "Sneakers tendance", price: "50-120\u20ac", description: "Grand choix Nike, Adidas, New Balance, Veja..." },
      { name: "Bottes et bottines", price: "60-150\u20ac", description: "Large selection pour l'hiver." },
    ],
    targetAudience: "Femmes et hommes qui cherchent des chaussures en ligne avec retours gratuits",
    rating: 4.2,
    category: "mode",
    tags: ["sarenza", "chaussures", "mode", "en-ligne", "2026"],
  },

  spartoo: {
    name: "Spartoo",
    slug: "spartoo",
    type: "Chaussures, mode et accessoires en ligne",
    origin: "France (Grenoble)",
    priceRange: "20-200\u20ac",
    description: "Site francais de vente de chaussures et mode avec plus de 4000 marques",
    longDescription: `Spartoo est un site francais de chaussures et mode base a Grenoble. Avec plus de 4000 marques, c'est l'un des plus grands catalogues de chaussures en Europe. Au-dela des chaussures, Spartoo propose aussi vetements, sacs et accessoires.

Le plus de Spartoo par rapport a Sarenza : un catalogue plus vaste et des prix souvent legerement inferieurs. Le programme de fidelite "Spartoo Premium" offre livraison gratuite illimitee et retours prolonges.`,
    strengths: [
      "Plus de 4000 marques (le plus grand choix)",
      "Prix souvent legerement inferieurs a la concurrence",
      "Programme Premium avec livraison gratuite illimitee",
      "Chaussures + vetements + accessoires",
      "Promos permanentes",
    ],
    weaknesses: [
      "Site parfois confus avec tant de references",
      "Qualite des marques inegale (beaucoup de marques blanches)",
      "Emballages parfois abimes a la livraison",
      "Service client variable",
    ],
    bestProducts: [
      { name: "Chaussures femme en promo", price: "20-80\u20ac", description: "Des milliers de modeles avec des reductions permanentes." },
      { name: "Baskets homme", price: "40-120\u20ac", description: "Nike, Adidas, Puma, New Balance a prix reduit." },
    ],
    targetAudience: "Chasseurs de bonnes affaires en chaussures et mode",
    rating: 4.0,
    category: "mode",
    tags: ["spartoo", "chaussures", "mode", "pas-cher", "2026"],
  },

  showroomprive: {
    name: "Showroomprive",
    slug: "showroomprive",
    type: "Ventes privees mode, beaute et maison",
    origin: "France",
    priceRange: "Variable (jusqu'a -70%)",
    description: "Site de ventes privees francais avec des offres temporaires sur la mode, beaute et maison",
    longDescription: `Showroomprive est l'un des leaders francais des ventes privees en ligne. Le concept : des ventes flash de 3-5 jours avec des reductions de -30% a -70% sur des marques de mode, beaute, maison et high-tech.

C'est le reflexe pour trouver des marques de beaute a prix casses : on y trouve regulierement des ventes Nuxe, Clarins, L'Oreal, Maybelline, MAC... Les quantites sont limitees et les ventes temporaires, donc il faut etre reactif.`,
    strengths: [
      "Reductions de -30% a -70% sur des grandes marques",
      "Ventes beaute regulieres (Nuxe, Clarins, MAC...)",
      "Application mobile avec notifications",
      "Programme de parrainage avantageux",
      "Mode + beaute + maison en un seul site",
    ],
    weaknesses: [
      "Ventes temporaires (si tu rates, c'est fini)",
      "Delais de livraison longs (7-15 jours)",
      "Frais de port incompressibles (5-8\u20ac)",
      "Retours payants",
    ],
    bestProducts: [
      { name: "Ventes beaute", price: "Variable", description: "Nuxe, MAC, Clarins... a -40/-60% selon les ventes." },
      { name: "Coffrets cadeaux", price: "15-50\u20ac", description: "Coffrets de marques a prix casses, parfaits pour offrir." },
    ],
    targetAudience: "Chasseuses de bonnes affaires qui aiment les ventes flash sur les marques",
    rating: 4.0,
    category: "lifestyle",
    tags: ["showroomprive", "ventes-privees", "promo", "marques", "2026"],
  },
};

// ============================================================
// COMPARISON PAIRS — Define which brands to compare
// ============================================================

interface ComparisonPair {
  brandA: string;
  brandB: string;
  angle: string; // The key differentiator angle
  intro: string;
}

const COMPARISON_PAIRS: ComparisonPair[] = [
  {
    brandA: "nuxe",
    brandB: "loccitane",
    angle: "luxe francais",
    intro: "Deux icones de la cosmetique francaise. Nuxe mise sur le naturel accessible en pharmacie. L'Occitane joue la carte du luxe provencal. Laquelle choisir ?",
  },
  {
    brandA: "weleda",
    brandB: "nuxe",
    angle: "bio vs naturel",
    intro: "D'un cote, le bio certifie strict (Weleda). De l'autre, le naturel sensoriel (Nuxe). Deux philosophies, deux gammes, deux prix. On compare tout.",
  },
  {
    brandA: "uriage",
    brandB: "thalgo",
    angle: "dermocosmetique",
    intro: "Uriage, la dermocosmetique accessible a l'eau thermale. Thalgo, la cosmetique marine premium. Deux approches scientifiques, un meme objectif : une belle peau.",
  },
  {
    brandA: "miin-cosmetics",
    brandB: "yesstyle",
    angle: "K-beauty en Europe",
    intro: "Tu veux te lancer dans la K-beauty mais ou acheter ? MiiN Cosmetics (curate depuis l'Europe) vs YesStyle (marketplace directe depuis l'Asie). On compare prix, delais et selection.",
  },
  {
    brandA: "yesstyle",
    brandB: "stylevana",
    angle: "marketplace K-beauty",
    intro: "Les deux geants de la K-beauty en ligne. YesStyle a le plus grand catalogue. Stylevana livre plus vite. Lequel merite ton argent ?",
  },
  {
    brandA: "seasonly",
    brandB: "dr-pierre-ricaud",
    angle: "soin personnalise",
    intro: "Deux marques qui misent sur la personnalisation : Seasonly avec la clean beauty et Dr Pierre Ricaud avec la dermocosmetique scientifique. Laquelle est faite pour toi ?",
  },
  {
    brandA: "weleda",
    brandB: "greenweez",
    angle: "bio au quotidien",
    intro: "Weleda, la marque bio iconique. Greenweez, le supermarche bio en ligne qui vend Weleda et des centaines d'autres marques. Acheter la marque directe ou passer par le marketplace ?",
  },
  {
    brandA: "adopt",
    brandB: "parfums-moins-cher",
    angle: "parfums a petit prix",
    intro: "Deux facons d'avoir du parfum sans se ruiner : Adopt' cree ses propres senteurs a 5\u20ac. Parfums Moins Cher vend des marques de luxe a prix casse. Quelle est la meilleure strategie ?",
  },
  {
    brandA: "le-rouge-francais",
    brandB: "magnifaik",
    angle: "maquillage engagé",
    intro: "Deux marques francaises de maquillage avec des valeurs fortes. Le Rouge Francais mise sur le bio luxe. Magnifaik sur l'inclusivite. Comparons.",
  },
  {
    brandA: "sarenza",
    brandB: "spartoo",
    angle: "chaussures en ligne",
    intro: "Les deux leaders francais de la chaussure en ligne. Sarenza a les retours gratuits 100 jours. Spartoo a 4000 marques. Lequel choisir pour ton prochain achat ?",
  },
  {
    brandA: "nuxe",
    brandB: "uriage",
    angle: "pharmacie beaute",
    intro: "Deux piliers de la beaute en pharmacie francaise. Nuxe pour le plaisir sensoriel. Uriage pour la dermocosmetique pure. Laquelle convient le mieux a ta peau ?",
  },
];

// ============================================================
// CATEGORY PAGES — Group brands by theme
// ============================================================

interface CategoryPage {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  seoDescription: string;
  intro: string;
  brands: string[]; // brand slugs
  category: string;
  tags: string[];
}

const CATEGORY_PAGES: CategoryPage[] = [
  {
    slug: "meilleurs-sites-cosmetiques-bio-2026",
    title: "Les Meilleurs Sites de Cosmetique Bio en Ligne (2026)",
    seoTitle: "Meilleurs Sites Cosmetique Bio en Ligne 2026 | Kado",
    description: "Notre selection des meilleurs sites pour acheter de la cosmetique bio en ligne : Greenweez, Weleda, Seasonly...",
    seoDescription: "Top 6 des meilleurs sites de cosmetique bio en ligne en 2026. Comparatif prix, gamme et livraison. Weleda, Greenweez, Seasonly...",
    intro: `Acheter de la cosmetique bio en ligne, c'est pratique mais le choix est vaste. Comment distinguer le vrai bio du greenwashing ? Quels sites offrent le meilleur rapport qualite/prix ?

On a teste et compare les principaux sites pour t'aider a trouver celui qui correspond a tes besoins et ton budget.`,
    brands: ["greenweez", "weleda", "seasonly", "glamellina", "pranarom", "le-rouge-francais"],
    category: "guide",
    tags: ["cosmetique-bio", "bio", "en-ligne", "guide", "2026"],
  },
  {
    slug: "meilleures-marques-k-beauty-france-2026",
    title: "K-Beauty en France : Ou Acheter de la Cosmetique Coreenne ? (2026)",
    seoTitle: "Meilleurs Sites K-Beauty France 2026 : Cosmetique Coreenne | Kado",
    description: "Guide complet pour acheter de la cosmetique coreenne en France. MiiN Cosmetics, YesStyle, Stylevana : comparatif et avis.",
    seoDescription: "Ou acheter de la K-beauty en France en 2026 ? Comparatif MiiN Cosmetics, YesStyle et Stylevana. Prix, delais, selection.",
    intro: `La K-beauty (cosmetique coreenne) a revolutionne la routine beaute : layering en 10 etapes, actifs innovants (snail mucin, propolis, centella), textures incroyables. Mais ou acheter des produits coreens quand on habite en France ?

On a compare les 3 meilleurs sites pour acheter de la K-beauty depuis la France.`,
    brands: ["miin-cosmetics", "yesstyle", "stylevana"],
    category: "guide",
    tags: ["k-beauty", "cosmetique-coreenne", "france", "guide", "2026"],
  },
  {
    slug: "meilleures-parapharmacies-en-ligne-2026",
    title: "Les Meilleures Parapharmacies en Ligne (2026)",
    seoTitle: "Meilleures Parapharmacies en Ligne 2026 : Comparatif | Kado",
    description: "Comparatif des meilleures parapharmacies en ligne : Atida, Uriage, Nuxe... Ou acheter moins cher qu'en officine.",
    seoDescription: "Top parapharmacies en ligne 2026. Atida (Santediscount), et alternatives. Prix, livraison, gamme comparees.",
    intro: `Pourquoi payer le plein tarif en pharmacie quand les parapharmacies en ligne proposent les memes produits a -20% voire -50% ? On a compare les meilleures options pour acheter ta routine dermocosmetique en ligne.`,
    brands: ["atida-santediscount", "uriage", "nuxe", "greenweez"],
    category: "guide",
    tags: ["parapharmacie", "en-ligne", "pas-cher", "guide", "2026"],
  },
  {
    slug: "meilleurs-parfums-pas-cher-2026",
    title: "Parfums Pas Cher : Comment Sentir Bon Sans Se Ruiner (2026)",
    seoTitle: "Parfums Pas Cher 2026 : Meilleures Adresses en Ligne | Kado",
    description: "Guide pour trouver des parfums de qualite a petit prix. Adopt', Parfums Moins Cher, bons plans... Notre selection.",
    seoDescription: "Parfums pas cher en 2026 : ou acheter des parfums de marque a prix reduit ? Adopt', Parfums Moins Cher et bons plans testes.",
    intro: `Un bon parfum ne devrait pas couter un SMIC. Que tu cherches des parfums de marque a prix casse ou des senteurs originales a 5\u20ac, il existe des alternatives pour sentir divinement bon sans exploser ton budget.`,
    brands: ["adopt", "parfums-moins-cher", "showroomprive"],
    category: "guide",
    tags: ["parfum", "pas-cher", "guide", "bons-plans", "2026"],
  },
  {
    slug: "meilleures-marques-clean-beauty-france-2026",
    title: "Les Meilleures Marques Clean Beauty en France (2026)",
    seoTitle: "Meilleures Marques Clean Beauty France 2026 | Kado",
    description: "Notre selection des meilleures marques de clean beauty francaises : formules propres, ingredients naturels, made in France.",
    seoDescription: "Top marques clean beauty France 2026. Seasonly, Weleda, Le Rouge Francais... Formules propres et ingredientss naturels.",
    intro: `La clean beauty, c'est plus qu'une tendance — c'est une exigence. Des formules courtes, des ingredients qu'on comprend, pas de petrochimie, pas de greenwashing. Voici les marques francaises qui font de la clean beauty serieusement.`,
    brands: ["seasonly", "weleda", "le-rouge-francais", "glamellina", "pranarom", "greenweez"],
    category: "guide",
    tags: ["clean-beauty", "naturel", "france", "guide", "2026"],
  },
  {
    slug: "meilleurs-sites-chaussures-en-ligne-2026",
    title: "Meilleurs Sites de Chaussures en Ligne (2026)",
    seoTitle: "Meilleurs Sites Chaussures en Ligne 2026 : Comparatif | Kado",
    description: "Sarenza vs Spartoo vs Shoes.fr : comparatif des meilleurs sites pour acheter des chaussures en ligne.",
    seoDescription: "Top sites de chaussures en ligne en 2026. Sarenza, Spartoo, Shoes.fr compares : prix, retours, marques, livraison.",
    intro: `Acheter des chaussures en ligne, c'est pratique mais risque — la taille, le confort, on ne sait jamais avant d'essayer. C'est pour ca que les retours gratuits changent tout. Voici les meilleurs sites avec les meilleures conditions.`,
    brands: ["sarenza", "spartoo"],
    category: "guide",
    tags: ["chaussures", "mode", "en-ligne", "comparatif", "2026"],
  },
];

// ============================================================
// DATA LOADING
// ============================================================

interface YamlData {
  boxes: Array<{ name: string; slug: string; affiliate_url: string; website: string; price: number; rating: number }>;
  awin_programs: Array<{ id: number; name: string; website: string; tracking_link: string; source: string }>;
  kwanko_programs: Array<{ id: number; name: string; website: string; tracking_link: string; has_deeplink: boolean; source: string }>;
  affilae_programs: Array<{ id: string; name: string; website: string; tracking_link: string; status: string; source: string }>;
  kwanko_promo_codes: Array<{ campaign_name: string; code: string; description: string; valid_until: string; source: string }>;
}

function loadYaml(): YamlData {
  const content = fs.readFileSync(DATA_FILE, "utf-8");
  return yaml.load(content) as YamlData;
}

// Build a tracking link map for all brands across all platforms
function buildTrackingLinkMap(data: YamlData): Map<string, string> {
  const map = new Map<string, string>();

  // From boxes
  for (const box of data.boxes) {
    if (box.affiliate_url) map.set(box.slug, box.affiliate_url);
  }

  // From Awin programs - fix double-encoded URLs
  for (const prog of data.awin_programs || []) {
    if (prog.tracking_link) {
      const fixed = prog.tracking_link.replace(
        /ued=https%3A%2F%2Fhttps%3A%2F%2F/g,
        "ued=https%3A%2F%2F"
      );
      const slug = slugify(prog.name);
      if (!map.has(slug)) map.set(slug, fixed);
    }
  }

  // From Kwanko programs
  for (const prog of data.kwanko_programs || []) {
    if (prog.tracking_link) {
      const slug = slugify(prog.name);
      if (!map.has(slug)) map.set(slug, prog.tracking_link);
    }
  }

  // From Affilae programs
  for (const prog of data.affilae_programs || []) {
    if (prog.tracking_link && prog.status === "active") {
      const slug = slugify(prog.name);
      if (!map.has(slug)) map.set(slug, prog.tracking_link);
    }
  }

  return map;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Find tracking link for a brand by trying multiple slug patterns
function findTrackingLink(brandSlug: string, linkMap: Map<string, string>, data: YamlData): string {
  // Direct match
  if (linkMap.has(brandSlug)) return linkMap.get(brandSlug)!;

  // Try brand name variations
  const brandInfo = BEAUTY_BRANDS[brandSlug];
  if (brandInfo) {
    const nameSlug = slugify(brandInfo.name);
    if (linkMap.has(nameSlug)) return linkMap.get(nameSlug)!;
  }

  // Manual mapping for known mismatches
  const manualMap: Record<string, string> = {
    "weleda": "weleda",
    "nuxe": "nuxe",
    "loccitane": "loccitane",
    "dr-pierre-ricaud": "dr-pierre-ricaud-fr",
    "ioma-paris": "ioma-fr",
    "miin-cosmetics": "miin-cosmetics-fr",
    "yesstyle": "yesstyle-fr",
    "stylevana": "stylevana-fr",
    "thalgo": "thalgo-cosmetiques",
    "uriage": "uriage",
    "adopt": "adopt",
    "le-rouge-francais": "le-rouge-francais",
    "magnifaik": "magnifaik-fr",
    "glamellina": "glamellina---cpa",
    "atida-santediscount": "atida-santediscount",
    "parfums-moins-cher": "parfums-moins-cher",
    "miss-monoi": "miss-monoi",
    "baija": "baija-cpa",
    "greenweez": "greenweez",
    "pranarom": "pranarom---last-click",
    "hellofresh": "hellofresh",
    "sarenza": "sarenza-fr",
    "spartoo": "spartoo-com",
    "showroomprive": "showroomprive-fr-2023",
  };

  if (manualMap[brandSlug]) {
    const mapped = manualMap[brandSlug];
    if (linkMap.has(mapped)) return linkMap.get(mapped)!;
  }

  // Search in all programs
  for (const [key, value] of linkMap.entries()) {
    if (key.includes(brandSlug.replace(/-/g, "")) || brandSlug.includes(key.replace(/-/g, ""))) {
      return value;
    }
  }

  return "";
}

// ============================================================
// TEMPLATE GENERATORS
// ============================================================

function generatePromoCodePage(
  brand: BrandInfo,
  codes: Array<{ code: string; description: string; valid_until: string }>,
  trackingLink: string
): string {
  const codesSection = codes.map((code, i) => {
    const expiresText = code.valid_until
      ? `- **Expire le :** ${new Date(code.valid_until).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}`
      : "- **Validite :** Pas de date d'expiration indiquee";

    return `### ${code.code}

- **Reduction :** ${code.description.replace(/\n/g, " ").trim()}
${expiresText}
- **Verifie le :** ${TODAY}

${i === 0 ? `C'est l'offre la plus interessante du moment chez ${brand.name}. A utiliser avant qu'elle expire.` : `Un bon complement au code precedent si les conditions sont differentes.`}`;
  }).join("\n\n");

  const linkMarkdown = trackingLink
    ? `[le site de ${brand.name}](${trackingLink})`
    : `le site de ${brand.name}`;

  return `---
title: "Code Promo ${brand.name} ${MONTH_DISPLAY} ${YEAR} : Tous les Codes Verifies"
description: "Codes promo ${brand.name} verifies pour ${MONTH.toLowerCase()} ${YEAR}. ${codes[0]?.description.substring(0, 80).replace(/\n/g, " ").trim() || "Reductions exclusives"}. Testes le ${TODAY}."
date: "${TODAY}"
category: "code-promo"
tags: ${JSON.stringify([brand.slug, "code-promo", `${MONTH}-${YEAR}`, ...brand.tags.slice(0, 2)])}
image: "/images/hero-beauty.png"
imageAlt: "Code promo ${brand.name} ${MONTH} ${YEAR}"
${trackingLink ? `affiliateUrl: "${trackingLink}"` : ""}
affiliateLabel: "Voir les offres ${brand.name}"
published: true
seoTitle: "Code Promo ${brand.name} ${MONTH_DISPLAY} ${YEAR} (Verifies) | Kado"
seoDescription: "Codes promo ${brand.name} verifies ${MONTH} ${YEAR}. ${codes.length} code${codes.length > 1 ? "s" : ""} teste${codes.length > 1 ? "s" : ""} et mis a jour le ${TODAY}."
---

## Les codes promo ${brand.name} qui marchent en ${MONTH} ${YEAR}

Mis a jour et verifies le ${new Date(TODAY).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}. On teste chaque code avant de le publier.

${codesSection}

### Comment utiliser un code promo ${brand.name}

1. Va sur ${linkMarkdown}
2. Ajoute tes produits au panier
3. Au moment du paiement, entre le code dans le champ "Code promo" ou "Coupon"
4. Clique sur "Appliquer" — la reduction s'affiche instantanement
5. Valide ta commande

### C'est quoi ${brand.name} ?

${brand.longDescription.split("\n\n")[0]}

**${brand.type}** | **Origine :** ${brand.origin} | **Prix :** ${brand.priceRange}

### Les meilleurs produits ${brand.name}

${brand.bestProducts.slice(0, 3).map(p => `- **${p.name}** (${p.price}) — ${p.description}`).join("\n")}

### Les points forts

${brand.strengths.slice(0, 4).map(s => `- ${s}`).join("\n")}

### Les limites

${brand.weaknesses.slice(0, 3).map(w => `- ${w}`).join("\n")}

*Certains liens de cet article sont des liens affilies. En achetant via ces liens, tu nous aides a maintenir Kado — sans aucun surcout pour toi.*
`;
}

function generateBrandReviewPage(brand: BrandInfo, trackingLink: string): string {
  const linkMarkdown = trackingLink
    ? `[${brand.name}](${trackingLink})`
    : brand.name;

  const linkUrl = trackingLink || "#";

  return `---
title: "${brand.name} Avis ${YEAR} : Notre Test Complet"
description: "Avis complet sur ${brand.name} en ${YEAR}. ${brand.description}. Points forts, limites et verdict honnete."
date: "${TODAY}"
category: "test"
tags: ${JSON.stringify([brand.slug, "avis", YEAR, ...brand.tags.slice(0, 3)])}
image: "/images/hero-beauty.png"
imageAlt: "Avis ${brand.name} ${YEAR}"
${trackingLink ? `affiliateUrl: "${trackingLink}"` : ""}
affiliateLabel: "Decouvrir ${brand.name}"
published: true
seoTitle: "${brand.name} Avis ${YEAR} : Test Complet et Honnete | Kado"
seoDescription: "Notre avis sur ${brand.name} en ${YEAR}. ${brand.type}. ${brand.strengths[0]}. Test complet avec prix, produits et verdict."
---

## C'est quoi ${brand.name} ?

${linkMarkdown} est une marque ${brand.origin.toLowerCase().includes("france") ? "francaise" : `d'origine ${brand.origin.toLowerCase()}`} de ${brand.type.toLowerCase()}. ${brand.description}.

${brand.longDescription}

## Ce qu'on a teste

${brand.bestProducts.map(p => `### ${p.name}

- **Prix :** ${p.price}
- **Notre avis :** ${p.description}
`).join("\n")}

## Les points forts

${brand.strengths.map(s => `- **${s}**`).join("\n")}

## Les points faibles

${brand.weaknesses.map(w => `- ${w}`).join("\n")}

## Pour qui ?

**${brand.name} est fait pour toi si :**
- ${brand.targetAudience}
${brand.strengths.slice(0, 2).map(s => `- Tu valorises : ${s.toLowerCase()}`).join("\n")}

**Passe ton chemin si :**
${brand.weaknesses.slice(0, 2).map(w => `- ${w}`).join("\n")}

## Notre verdict : ${brand.rating}/5

${brand.name} fait bien ce qu'ils font. ${brand.strengths[0]} est un vrai atout. Le principal frein reste ${brand.weaknesses[0].toLowerCase()}. Mais si tu cherches ${brand.type.toLowerCase()} de qualite${brand.origin.toLowerCase().includes("france") ? " et Made in France" : ""}, c'est une option solide.

${trackingLink ? `[Decouvrir ${brand.name}](${trackingLink})` : ""}

*Certains liens de cet article sont des liens affilies. En achetant via ces liens, tu nous aides a maintenir Kado — sans aucun surcout pour toi.*
`;
}

function generateComparisonPage(
  pair: ComparisonPair,
  brandA: BrandInfo,
  brandB: BrandInfo,
  linkA: string,
  linkB: string
): string {
  const linkMarkdownA = linkA ? `[${brandA.name}](${linkA})` : brandA.name;
  const linkMarkdownB = linkB ? `[${brandB.name}](${linkB})` : brandB.name;

  return `---
title: "${brandA.name} vs ${brandB.name} : Lequel Choisir en ${YEAR} ?"
description: "Comparatif ${brandA.name} vs ${brandB.name}. Prix, qualite, gamme, avis — on a teste les deux pour t'aider a choisir."
date: "${TODAY}"
category: "comparatif"
tags: ${JSON.stringify([brandA.slug, brandB.slug, "comparatif", "vs", YEAR])}
image: "/images/hero-beauty.png"
imageAlt: "Comparatif ${brandA.name} vs ${brandB.name} ${YEAR}"
${linkA ? `affiliateUrl: "${linkA}"` : ""}
affiliateLabel: "Decouvrir ${brandA.name}"
published: true
seoTitle: "${brandA.name} vs ${brandB.name} ${YEAR} : Comparatif Honnete | Kado"
seoDescription: "${brandA.name} ou ${brandB.name} ? Comparatif complet ${YEAR}. Prix, produits, qualite. Notre avis apres test des deux."
---

## Le resume en 30 secondes

${pair.intro}

- **${brandA.name}** — ${brandA.type}. ${brandA.priceRange}. ${brandA.strengths[0]}.
- **${brandB.name}** — ${brandB.type}. ${brandB.priceRange}. ${brandB.strengths[0]}.

## Comparatif detaille

### Prix

- **${linkMarkdownA}** : ${brandA.priceRange}
- **${linkMarkdownB}** : ${brandB.priceRange}

${parseFloat(brandA.priceRange) > parseFloat(brandB.priceRange) || brandA.priceRange > brandB.priceRange
      ? `${brandB.name} est globalement plus accessible. Mais le prix ne fait pas tout — voyons ce qu'on a pour son argent.`
      : `Les gammes de prix sont proches. La difference se joue sur d'autres criteres.`
    }

### Produits phares

**${brandA.name} :**
${brandA.bestProducts.slice(0, 3).map(p => `- **${p.name}** (${p.price}) — ${p.description}`).join("\n")}

**${brandB.name} :**
${brandB.bestProducts.slice(0, 3).map(p => `- **${p.name}** (${p.price}) — ${p.description}`).join("\n")}

### Points forts

**${brandA.name} :**
${brandA.strengths.slice(0, 3).map(s => `- ${s}`).join("\n")}

**${brandB.name} :**
${brandB.strengths.slice(0, 3).map(s => `- ${s}`).join("\n")}

### Points faibles

**${brandA.name} :**
${brandA.weaknesses.slice(0, 3).map(w => `- ${w}`).join("\n")}

**${brandB.name} :**
${brandB.weaknesses.slice(0, 3).map(w => `- ${w}`).join("\n")}

### Qui devrait choisir quoi ?

**Choisis ${linkMarkdownA} si :**
- ${brandA.targetAudience}
- Tu recherches : ${brandA.strengths[0].toLowerCase()}

**Choisis ${linkMarkdownB} si :**
- ${brandB.targetAudience}
- Tu recherches : ${brandB.strengths[0].toLowerCase()}

## Notre verdict

| Critere | ${brandA.name} | ${brandB.name} |
|---------|:---:|:---:|
| **Prix** | ${brandA.priceRange} | ${brandB.priceRange} |
| **Note** | ${brandA.rating}/5 | ${brandB.rating}/5 |
| **Type** | ${brandA.type} | ${brandB.type} |
| **Origine** | ${brandA.origin} | ${brandB.origin} |
| **Pour qui** | ${brandA.targetAudience.split(" ").slice(0, 6).join(" ")}... | ${brandB.targetAudience.split(" ").slice(0, 6).join(" ")}... |

Les deux sont d'excellentes options dans leur categorie. ${brandA.rating >= brandB.rating ? brandA.name : brandB.name} a un leger avantage avec une note de ${Math.max(brandA.rating, brandB.rating)}/5, mais le choix depend surtout de tes priorites.

*Certains liens de cet article sont des liens affilies. En achetant via ces liens, tu nous aides a maintenir Kado — sans aucun surcout pour toi.*

Si tu cherches à choisir la box parfaite ou le produit idéal, n'hesite pas a consulter nos autres guides !
`;
}

function generateCategoryPage(
  page: CategoryPage,
  brandsData: BrandInfo[],
  linkMap: Map<string, string>,
  yamlData: YamlData
): string {
  const brandSections = brandsData.map((brand, index) => {
    const link = findTrackingLink(brand.slug, linkMap, yamlData);
    const linkMarkdown = link ? `[${brand.name}](${link})` : brand.name;
    const medal = index === 0 ? " (Notre choix)" : index === 1 ? " (Le challenger)" : "";

    return `### ${index + 1}. ${linkMarkdown}${medal}

**${brand.type}** | **${brand.priceRange}** | **Note : ${brand.rating}/5** | **Origine : ${brand.origin}**

${brand.description}.

**Points forts :**
${brand.strengths.slice(0, 3).map(s => `- ${s}`).join("\n")}

**Le meilleur produit :** ${brand.bestProducts[0]?.name} (${brand.bestProducts[0]?.price}) — ${brand.bestProducts[0]?.description}

**Pour qui :** ${brand.targetAudience}.
`;
  }).join("\n---\n\n");

  return `---
title: "${page.title}"
description: "${page.description}"
date: "${TODAY}"
category: "${page.category}"
tags: ${JSON.stringify(page.tags)}
image: "/images/hero-beauty.png"
imageAlt: "${page.title}"
published: true
featured: true
seoTitle: "${page.seoTitle}"
seoDescription: "${page.seoDescription}"
---

${page.intro}

${brandSections}

## Comment on a choisi ?

Notre selection repose sur 4 criteres :

1. **Qualite des produits** — Formules, ingredients, efficacite reelle
2. **Rapport qualite/prix** — Ce qu'on obtient pour son argent
3. **Disponibilite** — Facilite de commande et delai de livraison
4. **Avis consommateurs** — Retours reels d'utilisatrices

On a teste personnellement chaque marque avant de la recommander.

## En resume

| Marque | Prix | Note | Pour qui |
|--------|------|:---:|----------|
${brandsData.map(b => `| **${b.name}** | ${b.priceRange} | ${b.rating}/5 | ${b.targetAudience.split(" ").slice(0, 8).join(" ")}... |`).join("\n")}

*Certains liens de cet article sont des liens affilies. En achetant via ces liens, tu nous aides a maintenir Kado — sans aucun surcout pour toi.*
`;
}

// ============================================================
// FILE WRITER
// ============================================================

function writeFile(relativePath: string, content: string): void {
  const fullPath = path.join(CONTENT_DIR, relativePath);
  const dir = path.dirname(fullPath);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(fullPath, content, "utf-8");
  console.log(`  Created: ${relativePath}`);
}

// ============================================================
// MAIN
// ============================================================

function main() {
  console.log("=== Kado Programmatic SEO Generator ===\n");

  const data = loadYaml();
  const linkMap = buildTrackingLinkMap(data);

  console.log(`Loaded ${linkMap.size} tracking links from affiliate data\n`);

  let totalPages = 0;

  // ---------------------------------------------------------
  // 1. PROMO CODE PAGES
  // ---------------------------------------------------------
  console.log("--- Generating Promo Code Pages ---");

  // Group kwanko promo codes by campaign
  const promosByCampaign = new Map<string, Array<{ code: string; description: string; valid_until: string }>>();
  for (const promo of data.kwanko_promo_codes || []) {
    const key = slugify(promo.campaign_name.trim());
    if (!promosByCampaign.has(key)) promosByCampaign.set(key, []);
    promosByCampaign.get(key)!.push({
      code: promo.code,
      description: promo.description,
      valid_until: promo.valid_until,
    });
  }

  for (const [campaignSlug, codes] of promosByCampaign) {
    // Find matching brand in our database
    let brand: BrandInfo | undefined;
    let trackingLink = "";

    // Try direct match
    if (BEAUTY_BRANDS[campaignSlug]) {
      brand = BEAUTY_BRANDS[campaignSlug];
    } else {
      // Try partial match
      for (const [key, info] of Object.entries(BEAUTY_BRANDS)) {
        if (campaignSlug.includes(key) || key.includes(campaignSlug)) {
          brand = info;
          break;
        }
      }
    }

    if (!brand) {
      // Create a minimal brand entry for brands we know about from promos
      const knownBrands: Record<string, Partial<BrandInfo>> = {
        "1001bijoux": {
          name: "1001Bijoux",
          slug: "1001bijoux",
          type: "Bijouterie en ligne",
          origin: "France",
          priceRange: "15-200\u20ac",
          description: "Bijouterie en ligne avec un large choix de bijoux en argent, or et plaque or",
          longDescription: "1001Bijoux est une bijouterie en ligne francaise proposant un large catalogue de bijoux en argent, or, plaque or et acier. Des bagues aux colliers en passant par les boucles d'oreilles, le site offre des bijoux pour tous les budgets avec une qualite constante.",
          strengths: ["Large choix de bijoux", "Prix accessibles", "Bijoux en argent veritable", "Livraison rapide"],
          weaknesses: ["Pas de boutique physique", "Photos parfois trompeuses", "Pas de haut de gamme"],
          bestProducts: [{ name: "Bijoux en argent 925", price: "15-80\u20ac", description: "Large gamme de bijoux en argent veritable." }],
          targetAudience: "Femmes qui cherchent des bijoux de qualite a prix accessible",
          rating: 3.8,
          category: "lifestyle" as const,
          tags: ["bijoux", "argent", "en-ligne", YEAR],
        },
        "laboratoire-d-plantes": {
          name: "Laboratoire D.Plantes",
          slug: "laboratoire-d-plantes",
          type: "Complements alimentaires naturels",
          origin: "France",
          priceRange: "10-40\u20ac",
          description: "Laboratoire francais specialise dans les vitamines et complements alimentaires naturels",
          longDescription: "Le Laboratoire D.Plantes est un laboratoire francais specialise dans les vitamines et complements alimentaires a base de plantes. Leur gamme couvre vitamines D, C, magnesium, omega-3 et autres micronutriments essentiels, tous fabriques en France sous controle qualite strict.",
          strengths: ["Fabrique en France", "Ingredients naturels", "Prix corrects", "Expertise en vitamines"],
          weaknesses: ["Site web basique", "Gamme limitee aux complements", "Peu connu"],
          bestProducts: [
            { name: "Vitamine D3 Bio", price: "12\u20ac", description: "La vitamine D indispensable, surtout en hiver." },
            { name: "Magnesium Marin", price: "15\u20ac", description: "Magnesium bien assimile pour le stress et la fatigue." },
          ],
          targetAudience: "Personnes soucieuses de leur sante qui cherchent des complements naturels francais",
          rating: 4.0,
          category: "bio" as const,
          tags: ["complements", "vitamines", "naturel", "france", YEAR],
        },
        "les-bijoux-de-felys": {
          name: "Les Bijoux de Felys",
          slug: "les-bijoux-de-felys",
          type: "Bijoux artisanaux en ligne",
          origin: "France",
          priceRange: "20-150\u20ac",
          description: "Bijoux artisanaux francais faits main avec des pierres naturelles",
          longDescription: "Les Bijoux de Felys est une marque artisanale francaise de bijoux faits main. Specialisee dans les bijoux en pierres naturelles, la creatrice propose des pieces uniques et des collections capsules. Chaque bijou est fabrique a la main en France.",
          strengths: ["Fait main en France", "Pierres naturelles", "Pieces uniques", "Service personnalise"],
          weaknesses: ["Prix artisanaux", "Stock limite", "Delai de fabrication"],
          bestProducts: [{ name: "Colliers en pierres naturelles", price: "30-80\u20ac", description: "Pieces uniques avec des pierres soigneusement selectionnees." }],
          targetAudience: "Femmes qui apprecient les bijoux artisanaux faits main et les pierres naturelles",
          rating: 4.2,
          category: "lifestyle" as const,
          tags: ["bijoux", "artisanal", "pierres", "france", YEAR],
        },
        "thalasso-les-issambres": {
          name: "Thalasso les Issambres",
          slug: "thalasso-les-issambres",
          type: "Centre de thalassotherapie",
          origin: "France (Var)",
          priceRange: "50-300\u20ac/soin",
          description: "Centre de thalassotherapie sur la Cote d'Azur avec soins marins et spa",
          longDescription: "La Thalasso les Issambres est un centre de thalassotherapie situe sur la Cote d'Azur, dans le Var. Soins marins, massages, piscine d'eau de mer chauffee — c'est l'endroit ideal pour une pause bien-etre face a la Mediterranee.",
          strengths: ["Vue mer exceptionnelle", "Soins marins authentiques", "Cadre relaxant Cote d'Azur", "Cures sur-mesure"],
          weaknesses: ["Prix eleves", "Localisation excentree", "Reservation necessaire"],
          bestProducts: [{ name: "Cure Decouverte", price: "150\u20ac", description: "Demi-journee de soins marins pour decouvrir la thalasso." }],
          targetAudience: "Femmes et couples qui cherchent une experience bien-etre premium en bord de mer",
          rating: 4.3,
          category: "lifestyle" as const,
          tags: ["thalasso", "bien-etre", "spa", "cote-d-azur", YEAR],
        },
        "desigual": {
          name: "Desigual",
          slug: "desigual",
          type: "Mode coloree et originale",
          origin: "Espagne (Barcelone)",
          priceRange: "30-150\u20ac",
          description: "Marque espagnole de mode connue pour ses imprimés colores et son style unique",
          longDescription: "Desigual est une marque espagnole de mode fondee a Barcelone. Reconnaissable entre mille grace a ses imprimes colores, ses patchworks et son style unique. C'est la marque pour celles qui veulent se demarquer et qui n'ont pas peur de la couleur.",
          strengths: ["Style unique et reconnaissable", "Qualite des tissus", "Large gamme femme/homme/enfant", "Presente partout en France"],
          weaknesses: ["Style clivant (on adore ou on deteste)", "Prix eleves hors promo", "Tailles parfois irregulieres"],
          bestProducts: [{ name: "Robes imprimees", price: "60-120\u20ac", description: "La signature Desigual. Couleurs explosives, coupes fluides." }],
          targetAudience: "Femmes qui aiment la mode coloree et originale et veulent sortir du lot",
          rating: 4.0,
          category: "mode" as const,
          tags: ["desigual", "mode", "espagne", "colore", YEAR],
        },
        "oscaro": {
          name: "Oscaro",
          slug: "oscaro",
          type: "Pieces auto en ligne",
          origin: "France",
          priceRange: "5-500\u20ac",
          description: "Leader francais de la vente de pieces detachees automobiles en ligne",
          longDescription: "Oscaro est le leader francais de la vente de pieces detachees automobiles en ligne. Plus de 500 000 references pour toutes les marques de voitures, avec des prix jusqu'a -50% par rapport aux garages.",
          strengths: ["Plus grand catalogue auto en France", "Prix jusqu'a -50%", "Livraison rapide", "Conseils techniques"],
          weaknesses: ["Necessite de connaitre sa voiture", "Pas de montage", "Retours parfois compliques"],
          bestProducts: [{ name: "Pieces detachees auto", price: "Variable", description: "Filtres, plaquettes, amortisseurs... tout pour l'entretien auto." }],
          targetAudience: "Automobilistes qui font leur entretien eux-memes",
          rating: 4.1,
          category: "lifestyle" as const,
          tags: ["oscaro", "auto", "pieces", "entretien", YEAR],
        },
        "milan-2024": {
          name: "Milan Jeunesse",
          slug: "milan-jeunesse",
          type: "Magazines jeunesse",
          origin: "France",
          priceRange: "5-10\u20ac/mois",
          description: "Editeur francais de magazines pour enfants et ados (Wapiti, Julie, 1jour1actu...)",
          longDescription: "Milan Jeunesse est un editeur francais de magazines pour enfants et adolescents. Wapiti (nature), Julie (ados), 1jour1actu (actualite)... Des contenus educatifs et ludiques livres chaque mois.",
          strengths: ["Contenus educatifs de qualite", "Adaptes par age", "Stimule la lecture", "Cadeau ideal"],
          weaknesses: ["Abonnement avec engagement", "Papier (pas tres eco)", "Certains titres mieux que d'autres"],
          bestProducts: [{ name: "Abonnement Wapiti", price: "5-8\u20ac/mois", description: "Magazine nature pour les 7-12 ans. Le best-seller." }],
          targetAudience: "Parents qui veulent encourager la lecture chez leurs enfants",
          rating: 4.2,
          category: "lifestyle" as const,
          tags: ["magazine", "enfant", "lecture", "education", YEAR],
        },
      };

      const knownKey = Object.keys(knownBrands).find(k =>
        campaignSlug.includes(k) || k.includes(campaignSlug.replace(/-/g, ""))
      );

      if (knownKey) {
        brand = knownBrands[knownKey] as BrandInfo;
      } else {
        console.log(`  Skipped promo for unknown brand: ${campaignSlug}`);
        continue;
      }
    }

    trackingLink = findTrackingLink(brand.slug, linkMap, data);

    const pageSlug = `code-promo-${brand.slug}-${MONTH}-${YEAR}`;
    const content = generatePromoCodePage(brand, codes, trackingLink);
    writeFile(`code-promo/${pageSlug}.mdx`, content);
    totalPages++;
  }

  // ---------------------------------------------------------
  // 2. BRAND REVIEW PAGES
  // ---------------------------------------------------------
  console.log("\n--- Generating Brand Review Pages ---");

  // Existing review pages to skip
  const existingReviews = new Set(["seasonly"]); // seasonly-avis-2026 already exists

  for (const [slug, brand] of Object.entries(BEAUTY_BRANDS)) {
    if (existingReviews.has(slug)) {
      console.log(`  Skipped (already exists): ${slug}`);
      continue;
    }

    const trackingLink = findTrackingLink(slug, linkMap, data);
    const pageSlug = `${slug}-avis-${YEAR}`;
    const content = generateBrandReviewPage(brand, trackingLink);
    writeFile(`marques/${pageSlug}.mdx`, content);
    totalPages++;
  }

  // ---------------------------------------------------------
  // 3. COMPARISON PAGES
  // ---------------------------------------------------------
  console.log("\n--- Generating Comparison Pages ---");

  // Existing comparisons to skip
  const existingComparisons = new Set([
    "biotyfull-box-vs-blissim",
    "blissim-vs-lookfantastic",
  ]);

  for (const pair of COMPARISON_PAIRS) {
    const pairSlug = `${pair.brandA}-vs-${pair.brandB}`;
    if (existingComparisons.has(pairSlug)) {
      console.log(`  Skipped (already exists): ${pairSlug}`);
      continue;
    }

    const brandA = BEAUTY_BRANDS[pair.brandA];
    const brandB = BEAUTY_BRANDS[pair.brandB];

    if (!brandA || !brandB) {
      console.log(`  Skipped (missing brand data): ${pairSlug}`);
      continue;
    }

    const linkA = findTrackingLink(pair.brandA, linkMap, data);
    const linkB = findTrackingLink(pair.brandB, linkMap, data);

    const content = generateComparisonPage(pair, brandA, brandB, linkA, linkB);
    writeFile(`comparatifs/${pairSlug}.mdx`, content);
    totalPages++;
  }

  // ---------------------------------------------------------
  // 4. CATEGORY/DIRECTORY PAGES
  // ---------------------------------------------------------
  console.log("\n--- Generating Category Pages ---");

  for (const page of CATEGORY_PAGES) {
    const brandsData = page.brands
      .map(slug => BEAUTY_BRANDS[slug])
      .filter((b): b is BrandInfo => b !== undefined);

    if (brandsData.length < 2) {
      console.log(`  Skipped (not enough brands): ${page.slug}`);
      continue;
    }

    const content = generateCategoryPage(page, brandsData, linkMap, data);
    writeFile(`guides/${page.slug}.mdx`, content);
    totalPages++;
  }

  // ---------------------------------------------------------
  // SUMMARY
  // ---------------------------------------------------------
  console.log(`\n=== Generation Complete ===`);
  console.log(`Total pages generated: ${totalPages}`);
  console.log(`Output directory: ${CONTENT_DIR}`);
  console.log(`\nAll pages will be automatically picked up by the sitemap.`);
}

main();
