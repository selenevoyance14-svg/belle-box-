import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const CONTENT_DIR = path.join(process.cwd(), "content");

export interface ArticleMeta {
    slug: string;
    title: string;
    description: string;
    date: string;
    updated?: string;
    category: string;
    tags: string[];
    image: string;
    imageAlt: string;
    rating?: number;
    price?: string;
    affiliateUrl?: string;
    affiliateLabel?: string;
    promoCode?: string;
    promoDiscount?: string;
    boxName?: string;
    readingTime: string;
    published: boolean;
    featured?: boolean;
    seoTitle?: string;
    seoDescription?: string;
    noindex?: boolean;
}

export interface Article {
    meta: ArticleMeta;
    content: string;
}

/**
 * Recursively find all .mdx files in a directory
 */
function findMdxFiles(dir: string): { slug: string; filePath: string }[] {
    if (!fs.existsSync(dir)) return [];

    const results: { slug: string; filePath: string }[] = [];

    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            results.push(...findMdxFiles(fullPath));
        } else if (entry.name.endsWith(".mdx")) {
            results.push({
                slug: entry.name.replace(/\.mdx$/, ""),
                filePath: fullPath,
            });
        }
    }

    return results;
}

// Cache the file map to avoid re-scanning on every call
let fileMapCache: Map<string, string> | null = null;

function getFileMap(): Map<string, string> {
    if (fileMapCache) return fileMapCache;
    fileMapCache = new Map();
    for (const { slug, filePath } of findMdxFiles(CONTENT_DIR)) {
        fileMapCache.set(slug, filePath);
    }
    return fileMapCache;
}

/**
 * Get all article slugs from the content directory (including subdirectories)
 */
export function getArticleSlugs(): string[] {
    return Array.from(getFileMap().keys());
}

/**
 * Get a single article by slug
 */
export function getArticleBySlug(slug: string): Article | null {
    const filePath = getFileMap().get(slug);

    if (!filePath || !fs.existsSync(filePath)) return null;

    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);
    const stats = readingTime(content);

    return {
        meta: {
            slug,
            title: data.title || "",
            description: data.description || "",
            date: data.date || new Date().toISOString(),
            updated: data.updated,
            category: data.category || "general",
            tags: data.tags || [],
            image: data.image || "/images/hero-beauty.png",
            imageAlt: data.imageAlt || data.title || "",
            rating: data.rating,
            price: data.price,
            affiliateUrl: data.affiliateUrl,
            affiliateLabel: data.affiliateLabel,
            promoCode: data.promoCode,
            promoDiscount: data.promoDiscount,
            boxName: data.boxName,
            readingTime: stats.text.replace("min read", "min"),
            published: data.published !== false,
            featured: data.featured || false,
            seoTitle: data.seoTitle,
            seoDescription: data.seoDescription,
            noindex: data.noindex === true,
        },
        content,
    };
}

/**
 * Get all published articles, sorted by date (newest first)
 */
export function getAllArticles(): Article[] {
    return getArticleSlugs()
        .map((slug) => getArticleBySlug(slug))
        .filter((a): a is Article => a !== null && a.meta.published)
        .sort(
            (a, b) =>
                new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
        );
}

/**
 * Get articles by category
 */
export function getArticlesByCategory(category: string): Article[] {
    return getAllArticles().filter((a) => a.meta.category === category);
}

/**
 * Get featured articles
 */
export function getFeaturedArticles(): Article[] {
    return getAllArticles().filter((a) => a.meta.featured);
}

/**
 * Get related articles (same category, excluding current)
 */
export function getRelatedArticles(
    slug: string,
    category: string,
    limit = 3
): Article[] {
    return getAllArticles()
        .filter((a) => a.meta.slug !== slug && a.meta.category === category)
        .slice(0, limit);
}
