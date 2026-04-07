import fs from "fs";
import path from "path";
import yaml from "js-yaml";

const DATA_FILE = path.join(process.cwd(), "data", "affiliate-links.yaml");

export interface BoxData {
    name: string;
    slug: string;
    price: number;
    currency: string;
    billing: string;
    affiliate_url: string;
    website: string;
    logo: string;
    rating: number;
    category: string;
    description: string;
    nb_products: string;
    certifications: string[];
    pros: string[];
    cons: string[];
    verdict: string;
}

export interface PromoCode {
    box: string;
    code: string;
    discount: string;
    type: string;
    conditions: string;
    expires: string;
    affiliate_url: string;
    verified: boolean;
    verified_date: string;
}

interface AffiliateData {
    boxes: BoxData[];
    promo_codes: PromoCode[];
    affiliate_platforms: Record<string, unknown>;
}

let cachedData: AffiliateData | null = null;

/**
 * Load affiliate data from YAML file
 */
function loadData(): AffiliateData {
    if (cachedData) return cachedData;

    if (!fs.existsSync(DATA_FILE)) {
        return { boxes: [], promo_codes: [], affiliate_platforms: {} };
    }

    const fileContent = fs.readFileSync(DATA_FILE, "utf-8");
    cachedData = yaml.load(fileContent) as AffiliateData;
    return cachedData;
}

/**
 * Get all beauty boxes
 */
export function getAllBoxes(): BoxData[] {
    return loadData().boxes || [];
}

/**
 * Get a box by its slug
 */
export function getBoxBySlug(slug: string): BoxData | undefined {
    return getAllBoxes().find((b) => b.slug === slug);
}

/**
 * Get the affiliate URL for a box (with fallback to website)
 */
export function getAffiliateUrl(slug: string): string {
    const box = getBoxBySlug(slug);
    if (!box) return "#";
    return box.affiliate_url || box.website || "#";
}

/**
 * Get all active promo codes (not expired)
 */
export function getActivePromoCodes(): PromoCode[] {
    const now = new Date();
    return (loadData().promo_codes || []).filter((p) => {
        if (!p.expires) return true;
        return new Date(p.expires) > now;
    });
}

/**
 * Get promo codes for a specific box
 */
export function getPromoCodesForBox(boxSlug: string): PromoCode[] {
    return getActivePromoCodes().filter((p) => p.box === boxSlug);
}

/**
 * Generate structured data (JSON-LD) for a review article
 */
export function generateReviewSchema(article: {
    title: string;
    description: string;
    date: string;
    image: string;
    rating?: number;
    price?: string;
    boxName?: string;
}) {
    const schema: Record<string, unknown> = {
        "@context": "https://schema.org",
        "@type": "Review",
        name: article.title,
        description: article.description,
        datePublished: article.date,
        author: {
            "@type": "Person",
            name: "Nathalie",
            url: "https://kado-box.fr/a-propos",
        },
        publisher: {
            "@type": "Organization",
            name: "Kado",
            logo: {
                "@type": "ImageObject",
                url: "https://kado-box.fr/kado-logo.svg",
            },
        },
        image: article.image,
    };

    if (article.rating) {
        schema.reviewRating = {
            "@type": "Rating",
            ratingValue: article.rating,
            bestRating: 5,
            worstRating: 1,
        };
    }

    if (article.boxName) {
        const box = getAllBoxes().find(
            (b) => b.name.toLowerCase() === article.boxName?.toLowerCase()
        );
        if (box) {
            schema.itemReviewed = {
                "@type": "Product",
                name: box.name,
                description: box.description,
                offers: {
                    "@type": "Offer",
                    price: box.price,
                    priceCurrency: box.currency || "EUR",
                    availability: "https://schema.org/InStock",
                    url: box.affiliate_url || box.website,
                },
            };
        }
    }

    return schema;
}

/**
 * Generate FAQ structured data
 */
export function generateFAQSchema(
    faqs: { question: string; answer: string }[]
) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
            },
        })),
    };
}
