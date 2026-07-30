import fs from "fs";
import path from "path";
import yaml from "js-yaml";

const CATALOG_FILE = path.join(process.cwd(), "data", "amazon-catalog.yaml");

export interface CatalogProduct {
    asin: string;
    slug: string;
    title: string;
    category: string;
    occasions: string[];
    recipients: string[];
    price: number;
    rating?: number;
    reviews_count?: number;
    image: string;
    affiliate_url: string;
}

const NON_GIFT_CATEGORIES = new Set(["autre", "alcool"]);

const NON_GIFT_TERMS = [
    "câble",
    "cable",
    "chargeur",
    "cartouche",
    "coussinets d’allaitement",
    "coussinets d'allaitement",
    "coque pour",
    "crème lanoline",
    "creme lanoline",
    "cuillère bébé",
    "cuillere bebe",
    "détergent",
    "detergent",
    "film de protection",
    "gants jetables",
    "huile moteur",
    "lingettes",
    "masque ffp",
    "moustiquaire",
    "pâte thermique",
    "pate thermique",
    "piles bouton",
    "piles aa",
    "piles aaa",
    "protège plaque",
    "protege plaque",
    "recharge",
    "biberon",
    "sacs poubelle",
    "sérum physiologique",
    "serum physiologique",
    "tablettes lave",
    "thermomètre",
    "thermometre",
    "verre trempé",
    "verre trempe",
];

const STRONG_GIFT_TERMS = [
    "airpods",
    "anniversaire",
    "bijou",
    "bracelet",
    "cadeau",
    "casque audio",
    "coffret",
    "fisher-price",
    "jeu de société",
    "jeu de societe",
    "kindle",
    "lego",
    "montre",
    "nintendo",
    "parfum",
    "peluche",
    "play-doh",
];

function normalizedTitle(product: CatalogProduct): string {
    return product.title
        .replace(/&#39;/g, "'")
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .toLowerCase();
}

export function isGiftCandidate(product: CatalogProduct): boolean {
    const title = normalizedTitle(product);
    if (NON_GIFT_CATEGORIES.has(product.category)) return false;
    if (NON_GIFT_TERMS.some((term) => title.includes(term))) return false;
    if ((product.rating ?? 0) < 4.2) return false;
    if ((product.reviews_count ?? 0) < 20) return false;
    if (product.price < 5 || product.price > 500) return false;
    return true;
}

function giftScore(product: CatalogProduct): number {
    const title = normalizedTitle(product);
    const explicitGiftBonus = STRONG_GIFT_TERMS.some((term) => title.includes(term)) ? 40 : 0;
    const reviewScore = Math.min(25, Math.log10((product.reviews_count ?? 0) + 1) * 6);
    const ratingScore = Math.max(0, ((product.rating ?? 4) - 4) * 20);
    return explicitGiftBonus + reviewScore + ratingScore;
}

function curate(products: CatalogProduct[], limit = 24): CatalogProduct[] {
    return [...products]
        .filter(isGiftCandidate)
        .sort((a, b) => giftScore(b) - giftScore(a))
        .slice(0, limit);
}

interface CatalogData {
    generated_at: string;
    count: number;
    products: CatalogProduct[];
}

let cached: CatalogData | null = null;

// Catégories exclues du site : l'alcool désactive la monétisation AdSense.
// Filtré ici (et non dans le YAML) car le catalogue est régénéré à chaque build.
const EXCLUDED_CATEGORIES = new Set(["alcool"]);

export function getCatalog(): CatalogProduct[] {
    if (cached) return cached.products;
    try {
        if (!fs.existsSync(CATALOG_FILE)) return [];
        const content = fs.readFileSync(CATALOG_FILE, "utf-8");
        cached = yaml.load(content) as CatalogData;
        const products = (cached.products || []).filter(
            (p) => !EXCLUDED_CATEGORIES.has(p.category)
        );
        cached = { ...cached, products };
        return products;
    } catch {
        return [];
    }
}

export function getProductsByOccasion(occasion: string): CatalogProduct[] {
    return curate(getCatalog().filter((p) => p.occasions?.includes(occasion)));
}

export function getProductsByRecipient(recipient: string): CatalogProduct[] {
    return curate(getCatalog().filter((p) => p.recipients?.includes(recipient)));
}

export function getProductsByCategory(category: string): CatalogProduct[] {
    return curate(getCatalog().filter((p) => p.category === category));
}

export function getProductBySlug(slug: string): CatalogProduct | undefined {
    return getCatalog().find((p) => p.slug === slug);
}

export function getProductsByBudget(min: number, max: number): CatalogProduct[] {
    return curate(getCatalog().filter((p) => p.price >= min && p.price <= max));
}

export const BUDGETS: Array<{ slug: string; name: string; emoji: string; min: number; max: number; description: string }> = [
    { slug: "moins-de-20-euros", name: "Moins de 20 €", emoji: "💶", min: 0, max: 20, description: "Petits prix, grands plaisirs : les meilleures idées cadeau à moins de 20 €." },
    { slug: "20-50-euros", name: "Entre 20 et 50 €", emoji: "💰", min: 20.01, max: 50, description: "Le bon compromis : des cadeaux qualitatifs sans se ruiner." },
    { slug: "50-100-euros", name: "Entre 50 et 100 €", emoji: "🎁", min: 50.01, max: 100, description: "Pour marquer le coup : nos cadeaux entre 50 et 100 €." },
    { slug: "plus-de-100-euros", name: "Plus de 100 €", emoji: "💎", min: 100.01, max: 99999, description: "Les cadeaux d'exception, pour les grandes occasions." },
];

export const OCCASIONS: Array<{ slug: string; name: string; emoji: string; description: string }> = [
    { slug: "noel", name: "Noël", emoji: "🎄", description: "Des idées pour faire des heureux à Noël" },
    { slug: "anniversaire", name: "Anniversaire", emoji: "🎂", description: "Le cadeau qui marque, peu importe l'âge" },
    { slug: "saint-valentin", name: "Saint-Valentin", emoji: "💝", description: "Pour lui dire 'je t'aime'" },
    { slug: "naissance", name: "Naissance", emoji: "🍼", description: "Pour accueillir le tout-petit" },
    { slug: "fete-des-meres", name: "Fête des mères", emoji: "💐", description: "Pour faire plaisir à maman" },
    { slug: "fete-des-peres", name: "Fête des pères", emoji: "👔", description: "Pour gâter papa" },
    { slug: "paques", name: "Pâques", emoji: "🐰", description: "Des attentions pour petits et grands" },
];

export const RECIPIENTS: Array<{ slug: string; name: string; emoji: string }> = [
    { slug: "femme", name: "Pour elle", emoji: "👩" },
    { slug: "homme", name: "Pour lui", emoji: "👨" },
    { slug: "enfant", name: "Pour les enfants", emoji: "🧒" },
    { slug: "ado", name: "Pour les ados", emoji: "🎮" },
    { slug: "couple", name: "Pour le couple", emoji: "💑" },
    { slug: "bebe", name: "Pour bébé", emoji: "👶" },
];

export const CATEGORY_LABELS: Record<string, string> = {
    parfum: "Parfum",
    bijou: "Bijou",
    montre: "Montre",
    jouet: "Jouet",
    chocolat: "Chocolat",
    bougie: "Bougie",
    coffret: "Coffret",
    livre: "Livre",
    tech: "Tech",
    maquillage: "Maquillage",
    beaute: "Beauté",
    the_cafe: "Thé / Café",
    alcool: "Alcool",
    deco: "Déco",
    cuisine: "Cuisine",
    maroquinerie: "Maroquinerie",
    mode: "Mode",
    jeu_video: "Jeu vidéo",
    sport: "Sport",
    papeterie: "Papeterie",
    bebe: "Bébé",
    autre: "Autre",
};
