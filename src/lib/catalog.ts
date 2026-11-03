import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import { GIFT_SELECTION } from "./gift-selection";
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
    reason?: string;
    caution?: string;
    interests?: string[];
    family?: string;
    editorialRank?: number;
}

export function getCatalog(): CatalogProduct[] {
    const data = yaml.load(fs.readFileSync(CATALOG_FILE, "utf8")) as { products: CatalogProduct[] };
    return data.products;
}

export function isGiftCandidate(product: CatalogProduct): boolean {
    return GIFT_SELECTION.some((gift) => gift.asin === product.asin);
}

export function getGiftCatalog(): CatalogProduct[] {
    const source = new Map(getCatalog().map((product) => [product.asin, product]));
    const selected = GIFT_SELECTION.flatMap((gift, index) => {
        const product = source.get(gift.asin);
        if (!product || !product.image || !Number.isFinite(product.price) || product.price <= 0) return [];
        const url = new URL(product.affiliate_url);
        if (url.hostname !== "www.amazon.fr" || !url.searchParams.get("tag")) return [];
        return [{ ...product, ...gift, editorialRank: index }];
    });
    // Alterner les univers pour que les premières cartes ne soient pas huit jeux similaires.
    const buckets = new Map<string, CatalogProduct[]>();
    for (const product of selected) {
        const bucket = buckets.get(product.category) ?? [];
        bucket.push(product);
        buckets.set(product.category, bucket);
    }
    const varied: CatalogProduct[] = [];
    while (varied.length < selected.length) {
        for (const bucket of buckets.values()) {
            const next = bucket.shift();
            if (next) varied.push(next);
        }
    }
    return varied;
}

export function getProductsByOccasion(occasion: string): CatalogProduct[] {
    return getGiftCatalog().filter((p) => p.occasions.includes(occasion));
}

export function getProductsByRecipient(recipient: string): CatalogProduct[] {
    return getGiftCatalog().filter((p) => p.recipients.includes(recipient));
}

export function getProductsByCategory(category: string): CatalogProduct[] {
    return getGiftCatalog().filter((p) => p.category === category);
}

export function getProductBySlug(slug: string): CatalogProduct | undefined {
    return getGiftCatalog().find((p) => p.slug === slug);
}

export function getProductsByBudget(min: number, max: number): CatalogProduct[] {
    return getGiftCatalog().filter((p) => p.price >= min && p.price <= max);
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
