import fs from "fs";
import path from "path";
import yaml from "js-yaml";
export { CATEGORY_LABELS } from "./catalog-labels";

const CATALOG_FILE = path.join(process.cwd(), "data", "amazon-catalog.yaml");

export interface CatalogProduct {
    asin: string;
    slug: string;
    title: string;
    category: string;
    occasions: string[];
    recipients: string[];
    price: number;
    amazon_updated_at?: string;
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
    "couches",
    "couches-culottes",
    "détergent",
    "detergent",
    "film de protection",
    "fond de teint",
    "drap housse",
    "draps housse",
    "gants jetables",
    "huile moteur",
    "huile parfumée",
    "huile parfumee",
    "lingettes",
    "masque ffp",
    "moustiquaire",
    "nappies",
    "pillow",
    "pâte thermique",
    "pate thermique",
    "piles bouton",
    "piles aa",
    "piles aaa",
    "pierres et cristaux pour bijoux",
    "protège plaque",
    "protege plaque",
    "recharge",
    "biberon",
    "sacs poubelle",
    "sérum physiologique",
    "serum physiologique",
    "tablettes lave",
    "taie oreiller",
    "taie d'oreiller",
    "thermomètre",
    "thermometre",
    "verre trempé",
    "verre trempe",
    "carte micro sd",
    "carte mémoire",
    "carte memoire",
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
    if (product.price < 5 || product.price > 500) return false;
    return true;
}

function giftScore(product: CatalogProduct): number {
    const title = normalizedTitle(product);
    const explicitGiftBonus = STRONG_GIFT_TERMS.some((term) => title.includes(term)) ? 40 : 0;
    const ratingScore = Math.max(0, (product.rating ?? 0) - 3.5) * 12;
    const reviewScore = Math.min(24, Math.log10((product.reviews_count ?? 0) + 1) * 6);
    return explicitGiftBonus + ratingScore + reviewScore;
}

function curate(products: CatalogProduct[], limit = 24): CatalogProduct[] {
    return [...products]
        .filter(isGiftCandidate)
        .sort((a, b) => giftScore(b) - giftScore(a))
        .slice(0, limit);
}

const RECIPIENT_CATEGORY_BONUSES: Record<string, Record<string, number>> = {
    femme: { bijou: 45, parfum: 40, beaute: 34, maquillage: 32, coffret: 28, mode: 22, livre: 16, deco: 12 },
    homme: { montre: 42, parfum: 36, tech: 30, sport: 28, maroquinerie: 28, coffret: 22, livre: 16, jeu_video: 12 },
    enfant: { jouet: 45, livre: 30, jeu_video: 24, sport: 20, papeterie: 18 },
    ado: { jeu_video: 38, tech: 34, mode: 28, beaute: 24, sport: 22, livre: 16 },
    couple: { coffret: 38, deco: 32, cuisine: 28, jeu_video: 18, livre: 16 },
    bebe: { bebe: 48, jouet: 38, livre: 28 },
};

function curateForRecipient(products: CatalogProduct[], recipient: string, limit = 24): CatalogProduct[] {
    const bonuses = RECIPIENT_CATEGORY_BONUSES[recipient] ?? {};
    return [...products]
        .filter(isGiftCandidate)
        .filter((product) => recipient === "bebe" || product.category !== "bebe")
        .sort((a, b) =>
            giftScore(b) + (bonuses[b.category] ?? 0)
            - giftScore(a) - (bonuses[a.category] ?? 0)
        )
        .slice(0, limit);
}

const OCCASION_CATEGORY_BONUSES: Record<string, Record<string, number>> = {
    naissance: { bebe: 50, jouet: 36, livre: 25 },
    "saint-valentin": { bijou: 45, parfum: 40, coffret: 32, beaute: 24, chocolat: 24 },
    "fete-des-meres": { bijou: 42, parfum: 38, beaute: 34, coffret: 28, livre: 18, deco: 15 },
    "fete-des-peres": { montre: 42, tech: 34, sport: 28, maroquinerie: 28, coffret: 22, livre: 18 },
    paques: { chocolat: 45, jouet: 34, livre: 20 },
};

function curateForOccasion(products: CatalogProduct[], occasion: string, limit = 24): CatalogProduct[] {
    const bonuses = OCCASION_CATEGORY_BONUSES[occasion] ?? {};
    const restrictedCategories = occasion === "naissance"
        ? new Set(["bebe", "jouet", "livre"])
        : null;
    return [...products]
        .filter(isGiftCandidate)
        .filter((product) => !restrictedCategories || restrictedCategories.has(product.category))
        .filter((product) => occasion === "naissance" || product.category !== "bebe")
        .sort((a, b) =>
            giftScore(b) + (bonuses[b.category] ?? 0)
            - giftScore(a) - (bonuses[a.category] ?? 0)
        )
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
    return curateForOccasion(
        getCatalog().filter((p) => p.occasions?.includes(occasion)),
        occasion,
    );
}

export function getProductsByRecipient(recipient: string): CatalogProduct[] {
    return curateForRecipient(
        getCatalog().filter((p) => p.recipients?.includes(recipient)),
        recipient,
    );
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

export const OCCASIONS: Array<{ slug: string; name: string; emoji: string; description: string; image?: string }> = [
    { slug: "noel", name: "Noël", emoji: "🎄", description: "Des idées pour faire des heureux à Noël", image: "/images/categories/noel.webp" },
    { slug: "anniversaire", name: "Anniversaire", emoji: "🎂", description: "Le cadeau qui marque, peu importe l'âge", image: "/images/categories/anniversaire.webp" },
    { slug: "saint-valentin", name: "Saint-Valentin", emoji: "💝", description: "Pour lui dire 'je t'aime'", image: "/images/categories/saint-valentin.webp" },
    { slug: "naissance", name: "Naissance", emoji: "🍼", description: "Pour accueillir le tout-petit", image: "/images/categories/naissance.webp" },
    { slug: "fete-des-meres", name: "Fête des mères", emoji: "💐", description: "Pour faire plaisir à maman", image: "/images/categories/fete-des-meres.webp" },
    { slug: "fete-des-peres", name: "Fête des pères", emoji: "👔", description: "Pour gâter papa", image: "/images/categories/fete-des-peres.webp" },
    { slug: "paques", name: "Pâques", emoji: "🐰", description: "Des attentions pour petits et grands", image: "/images/categories/paques.webp" },
];

export const RECIPIENTS: Array<{ slug: string; name: string; emoji: string; image: string }> = [
    { slug: "femme", name: "Pour elle", emoji: "👩", image: "/images/categories/femme.webp" },
    { slug: "homme", name: "Pour lui", emoji: "👨", image: "/images/categories/homme.webp" },
    { slug: "enfant", name: "Pour les enfants", emoji: "🧒", image: "/images/categories/enfant.webp" },
    { slug: "ado", name: "Pour les ados", emoji: "🎮", image: "/images/categories/ado.webp" },
    { slug: "couple", name: "Pour le couple", emoji: "💑", image: "/images/categories/couple.webp" },
    { slug: "bebe", name: "Pour bébé", emoji: "👶", image: "/images/categories/bebe.webp" },
];
