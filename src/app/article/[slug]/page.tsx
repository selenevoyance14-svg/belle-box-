import { notFound } from "next/navigation";
import { getArticleBySlug, getArticleSlugs, getRelatedArticles } from "@/lib/articles";
import { getBoxBySlug, getAffiliateUrl, getPromoCodesForBox, generateReviewSchema } from "@/lib/affiliate";
import Image from "next/image";
import type { Metadata } from "next";
import {
    Droplets, BarChart3, Tag, BookOpen, Leaf, Sparkles, Palette,
    Coins, Star, Package, Scale, Heart, Library, Gift,
    Flame, PenLine, Mail, Send, Check, X, AlertTriangle,
    Clock, ExternalLink, Copy, ChevronRight
} from "lucide-react";
import Header from "@/app/components/Header";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return getArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const article = getArticleBySlug(slug);
    if (!article) return {};

    const BASE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://kado-box.fr").replace(/\/+$/, "");

    return {
        title: article.meta.seoTitle || `${article.meta.title} | Kado`,
        description: article.meta.seoDescription || article.meta.description,
        alternates: {
            canonical: `${BASE_URL}/article/${slug}`,
        },
        openGraph: {
            title: article.meta.title,
            description: article.meta.description,
            images: [article.meta.image],
            type: "article",
            publishedTime: article.meta.date,
            modifiedTime: article.meta.updated || article.meta.date,
            tags: article.meta.tags,
        },
        robots: article.meta.noindex ? { index: false, follow: false } : undefined,
        twitter: {
            card: "summary_large_image",
            title: article.meta.title,
            description: article.meta.description,
            images: [article.meta.image],
        },
    };
}

const categoryConfig: Record<string, { icon: React.ReactNode; label: string }> = {
    test: { icon: <Droplets size={14} />, label: "Test" },
    comparatif: { icon: <BarChart3 size={14} />, label: "Comparatif" },
    "code-promo": { icon: <Tag size={14} />, label: "Code Promo" },
    guide: { icon: <BookOpen size={14} />, label: "Guide" },
    bio: { icon: <Leaf size={14} />, label: "Bio" },
    luxe: { icon: <Sparkles size={14} />, label: "Luxe" },
    maquillage: { icon: <Palette size={14} />, label: "Maquillage" },
    "petit-prix": { icon: <Coins size={14} />, label: "Petit Prix" },
    soin: { icon: <Droplets size={14} />, label: "Soin" },
};

function CategoryLabel({ category }: { category: string }) {
    const config = categoryConfig[category];
    if (!config) return <>{category}</>;
    return <><span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>{config.icon} {config.label}</span></>;
}

export default async function ArticlePage({ params }: PageProps) {
    const { slug } = await params;
    const article = getArticleBySlug(slug);

    if (!article) notFound();

    const box = article.meta.boxName
        ? getBoxBySlug(article.meta.boxName.toLowerCase().replace(/\s+/g, "-"))
        : undefined;
    const affiliateUrl = article.meta.affiliateUrl || (box ? getAffiliateUrl(box.slug) : "#");
    const affiliateLabel = article.meta.affiliateLabel || (box ? `Découvrir ${box.name}` : "Voir l'offre");
    const promoCodes = box ? getPromoCodesForBox(box.slug) : [];
    const relatedArticles = getRelatedArticles(slug, article.meta.category);
    const schema = generateReviewSchema(article.meta);

    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Accueil", item: "https://kado-box.fr" },
            { "@type": "ListItem", position: 2, name: article.meta.category, item: `https://kado-box.fr/categorie/${article.meta.category}` },
            { "@type": "ListItem", position: 3, name: article.meta.title, item: `https://kado-box.fr/article/${article.meta.slug}` },
        ],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />

            <Header activePage="/blog" />

            <main className="article-page">
                <div className="container">
                    {/* BREADCRUMBS */}
                    <nav className="breadcrumbs" aria-label="Fil d'ariane">
                        <a href="/">Accueil</a>
                        <ChevronRight size={12} style={{ margin: "0 4px", opacity: 0.5 }} />
                        <a href={`/categorie/${article.meta.category}`}>
                            <CategoryLabel category={article.meta.category} />
                        </a>
                        <ChevronRight size={12} style={{ margin: "0 4px", opacity: 0.5 }} />
                        <span>{article.meta.title}</span>
                    </nav>

                    {/* ARTICLE HEADER */}
                    <article className="article">
                        <div className="article-header">
                            <div className="article-meta-top">
                                <span className={`pill pill-${article.meta.category}`}>
                                    <CategoryLabel category={article.meta.category} />
                                </span>
                                <time dateTime={article.meta.date}>
                                    {new Date(article.meta.date).toLocaleDateString("fr-FR", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    })}
                                </time>
                                <span className="reading-time" style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                                    <Clock size={14} /> {article.meta.readingTime}
                                </span>
                            </div>

                            <h1>{article.meta.title}</h1>

                            <p className="article-subtitle">{article.meta.description}</p>

                            {/* RATING + PRICE BAR */}
                            {(article.meta.rating || article.meta.price || affiliateUrl !== "#") && (
                                <div className="article-rating-bar">
                                    {article.meta.rating && (
                                        <div className="article-rating">
                                            <span className="rating-stars" style={{ display: "inline-flex", gap: "2px", color: "var(--accent)" }}>
                                                {Array.from({ length: Math.round(article.meta.rating) }, (_, i) => (
                                                    <Star key={i} size={16} fill="currentColor" />
                                                ))}
                                            </span>
                                            <span className="rating-value">{article.meta.rating}/5</span>
                                        </div>
                                    )}
                                    {article.meta.price && (
                                        <div className="article-price">{article.meta.price}</div>
                                    )}
                                    {affiliateUrl !== "#" && (
                                        <a
                                            href={affiliateUrl}
                                            className="btn btn-primary btn-sm"
                                            target="_blank"
                                            rel="nofollow sponsored noopener"
                                            style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
                                        >
                                            {affiliateLabel} <ExternalLink size={14} />
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* HERO IMAGE */}
                        <div className="article-hero-image">
                            <Image
                                src={article.meta.image}
                                alt={article.meta.imageAlt}
                                width={800}
                                height={450}
                                style={{ width: "100%", height: "auto" }}
                                priority
                            />
                        </div>

                        {/* ARTICLE CONTENT (rendered MDX would go here) */}
                        <div className="article-content">
                            <div
                                className="mdx-content"
                                dangerouslySetInnerHTML={{ __html: renderBasicMarkdown(article.content) }}
                            />
                        </div>

                        {/* PROMO CODES */}
                        {promoCodes.length > 0 && (
                            <div className="article-promo-section">
                                <h2 style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                    <Tag size={24} /> Codes promo {box?.name}
                                </h2>
                                {promoCodes.map((promo) => (
                                    <div key={promo.code} className="card promo-card" style={{ marginBottom: "16px" }}>
                                        <div className="card-body" style={{ textAlign: "center", padding: "24px" }}>
                                            <h3 style={{ fontFamily: "'Fraunces', serif" }}>
                                                {promo.discount}
                                            </h3>
                                            <p>{promo.conditions}</p>
                                            <div className="promo-code" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                                                {promo.code} <Copy size={14} style={{ opacity: 0.5 }} />
                                            </div>
                                            <br />
                                            {promo.affiliate_url && (
                                                <a
                                                    href={promo.affiliate_url}
                                                    className="btn btn-primary btn-sm"
                                                    target="_blank"
                                                    rel="nofollow sponsored noopener"
                                                    style={{ marginTop: "12px", display: "inline-flex", alignItems: "center", gap: "6px" }}
                                                >
                                                    Utiliser ce code <ExternalLink size={14} />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* BOX INFO CARD */}
                        {box && (
                            <div className="card" style={{ marginTop: "32px" }}>
                                <div className="card-body" style={{ padding: "32px" }}>
                                    <h2 style={{ fontFamily: "'Fraunces', serif", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                                        <Package size={24} /> {box.name} en résumé
                                    </h2>
                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                                        <div>
                                            <strong>Prix :</strong> {box.price}€/{box.billing}
                                        </div>
                                        <div>
                                            <strong>Produits :</strong> {box.nb_products}
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                                            <strong>Note :</strong>
                                            <span style={{ display: "inline-flex", gap: "2px", color: "var(--accent)" }}>
                                                {Array.from({ length: Math.round(box.rating) }, (_, i) => (
                                                    <Star key={i} size={14} fill="currentColor" />
                                                ))}
                                            </span>
                                            {box.rating}/5
                                        </div>
                                        <div>
                                            <strong>Catégorie :</strong> {box.category}
                                        </div>
                                    </div>
                                    <div style={{ marginTop: "16px" }}>
                                        <strong style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                                            <Check size={16} color="var(--primary)" /> On aime :
                                        </strong>
                                        <ul>{box.pros.map((p) => <li key={p}>{p}</li>)}</ul>
                                    </div>
                                    <div style={{ marginTop: "12px" }}>
                                        <strong style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                                            <AlertTriangle size={16} color="var(--accent)" /> Moins bien :
                                        </strong>
                                        <ul>{box.cons.map((c) => <li key={c}>{c}</li>)}</ul>
                                    </div>
                                    <p style={{ marginTop: "16px", fontStyle: "italic" }}>{box.verdict}</p>
                                    {affiliateUrl !== "#" && (
                                        <a
                                            href={affiliateUrl}
                                            className="btn btn-primary"
                                            target="_blank"
                                            rel="nofollow sponsored noopener"
                                            style={{ marginTop: "16px", display: "inline-flex", alignItems: "center", gap: "6px" }}
                                        >
                                            Découvrir {box.name} <ExternalLink size={14} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* DISCLAIMER */}
                        <div className="affiliate-disclaimer">
                            <p>
                                <small style={{ display: "flex", alignItems: "flex-start", gap: "6px" }}>
                                    <Scale size={14} style={{ flexShrink: 0, marginTop: "2px" }} />
                                    <span>
                                        <strong>Transparence :</strong> Certains liens présents dans cet article sont
                                        des liens affiliés. Si tu passes commande via ces liens, nous recevons une petite
                                        commission — sans surcoût pour toi. Cela nous aide à financer nos tests et à garder
                                        le site 100% indépendant. Merci pour ton soutien <Heart size={12} style={{ display: "inline", verticalAlign: "middle", color: "var(--primary)" }} />
                                    </span>
                                </small>
                            </p>
                        </div>
                    </article>

                    {/* RELATED ARTICLES */}
                    {relatedArticles.length > 0 && (
                        <section className="related-articles">
                            <h2 style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <Library size={24} /> Articles similaires
                            </h2>
                            <div className="articles-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
                                {relatedArticles.map((related) => (
                                    <a key={related.meta.slug} href={`/article/${related.meta.slug}`} className="card" style={{ textDecoration: "none" }}>
                                        <div className="card-image-placeholder gradient-1" style={{ position: "relative", height: "180px", overflow: "hidden" }}>
                                            <Image src={related.meta.image} alt={related.meta.imageAlt} fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 100vw, 33vw" />
                                        </div>
                                        <div className="card-body">
                                            <h3 className="card-title">{related.meta.title}</h3>
                                            <p className="card-excerpt">{related.meta.description}</p>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </main>

            <footer className="footer">
                <div className="container">
                    <div className="footer-bottom">
                        <p style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}>
                            © 2026 Kado — Fait avec <Heart size={14} fill="var(--primary)" color="var(--primary)" /> par Nathalie. Certains liens sont
                            des liens affiliés.
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
}

/**
 * Basic markdown to HTML converter for article content
 * Supports: headers, bold, italic, links (new tab), images, lists, tables
 */
function renderBasicMarkdown(content: string): string {
    // Split into lines for table detection
    const lines = content.split("\n");
    const outputLines: string[] = [];
    let inTable = false;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        // Detect table rows (start with |)
        if (line.startsWith("|") && line.endsWith("|")) {
            // Check if this is the separator row (|---|---|)
            const isSeparator = /^\|[\s\-:]+\|/.test(line) && !line.replace(/[\s|:\-]/g, "");

            if (isSeparator) {
                // Skip the separator row, it's part of the table header
                continue;
            }

            if (!inTable) {
                outputLines.push('<div class="table-wrapper"><table class="comparison-table">');
                inTable = true;
                // This first row is the header
                const cells = line.split("|").filter(Boolean).map(c => c.trim());
                outputLines.push("<thead><tr>");
                for (const cell of cells) {
                    outputLines.push(`<th>${inlineFormat(cell)}</th>`);
                }
                outputLines.push("</tr></thead><tbody>");
                continue;
            }

            // Regular table row
            const cells = line.split("|").filter(Boolean).map(c => c.trim());
            outputLines.push("<tr>");
            for (const cell of cells) {
                outputLines.push(`<td>${inlineFormat(cell)}</td>`);
            }
            outputLines.push("</tr>");
            continue;
        }

        // If we were in a table and this line doesn't start with |, close it
        if (inTable) {
            outputLines.push("</tbody></table></div>");
            inTable = false;
        }

        // Regular markdown processing
        outputLines.push(line);
    }

    // Close table if still open at end
    if (inTable) {
        outputLines.push("</tbody></table></div>");
    }

    let html = outputLines.join("\n");

    // Headers
    html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');

    // Inline formatting
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/(?<!\*)\*([^*]+?)\*(?!\*)/g, '<em>$1</em>');

    // Links — open in new tab
    html = html.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="nofollow noopener">$1</a>');

    // Images
    html = html.replace(/!\[(.+?)\]\((.+?)\)/g, '<img src="$2" alt="$1" loading="lazy" />');

    // Lists
    html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');

    // Line breaks into paragraphs
    html = html.replace(/\n\n/g, '</p><p>');
    html = html.replace(/^(?!<)(.+)/gm, '<p>$1</p>');
    html = html.replace(/<p><\/p>/g, '');
    html = html.replace(/<p>(<h[23]>)/g, '$1');
    html = html.replace(/(<\/h[23]>)<\/p>/g, '$1');
    html = html.replace(/<p>(<ul>)/g, '$1');
    html = html.replace(/(<\/ul>)<\/p>/g, '$1');
    html = html.replace(/<p>(<div class="table-wrapper">)/g, '$1');
    html = html.replace(/(<\/div>)<\/p>/g, '$1');
    html = html.replace(/<p>(<thead>|<tbody>|<tr>|<\/thead>|<\/tbody>|<\/tr>|<\/table>)/g, '$1');

    return html;
}

/** Format inline markdown (bold, italic) for table cells */
function inlineFormat(text: string): string {
    return text
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/(?<!\*)\*([^*]+?)\*(?!\*)/g, '<em>$1</em>');
}
