import { getAllBoxes, getBoxBySlug, getAffiliateUrl } from "@/lib/affiliate";
import { getAllArticles } from "@/lib/articles";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/app/components/Header";
import {
  Star,
  Check,
  X,
  ExternalLink,
  ChevronRight,
  Package,
  Leaf,
  Sparkles,
  Shield,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface PageProps {
  params: Promise<{ slug: string }>;
}

// ---------------------------------------------------------------------------
// ISR — revalidate every 24h without full rebuild
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Static params
// ---------------------------------------------------------------------------

export async function generateStaticParams() {
  const boxes = getAllBoxes();
  return boxes.map((box) => ({ slug: box.slug }));
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const box = getBoxBySlug(slug);

  if (!box) {
    return {
      title: "Box introuvable",
      description: "Cette box beauté n'existe pas.",
    };
  }

  return {
    title: `${box.name} — Avis, prix et contenu | Kado Box`,
    description: `Découvrez ${box.name} : ${box.description} À partir de ${box.price}${box.currency}/${box.billing}. Avis complet, pros et cons.`,
    openGraph: {
      title: `${box.name} — Avis complet ${new Date().getFullYear()}`,
      description: box.description,
      url: `https://kado-box.fr/box/${box.slug}`,
      siteName: "Kado Box",
      images: [
        {
          url: box.logo,
          width: 400,
          height: 400,
          alt: `Logo ${box.name}`,
        },
      ],
      type: "website",
    },
    alternates: {
      canonical: `https://kado-box.fr/box/${box.slug}`,
    },
  };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function renderStars(rating: number) {
  return Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      size={20}
      className={i < Math.round(rating) ? "star-filled" : "star-empty"}
      fill={i < Math.round(rating) ? "currentColor" : "none"}
    />
  ));
}

function getPillClass(category: string): string {
  const map: Record<string, string> = {
    bio: "pill-bio",
    luxe: "pill-luxe",
    soin: "pill-soin",
    maquillage: "pill-maquillage",
  };
  return map[category.toLowerCase()] ?? "pill";
}

function isCrueltyFree(certifications: string[]): boolean {
  return certifications.some((c) =>
    c.toLowerCase().includes("cruelty") || c.toLowerCase().includes("vegan")
  );
}

// ---------------------------------------------------------------------------
// JSON-LD helpers
// ---------------------------------------------------------------------------

function buildProductJsonLd(box: Awaited<ReturnType<typeof getBoxBySlug>> & object) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `https://kado-box.fr/box/${box.slug}`,
    name: box.name,
    description: box.description,
    image: box.logo,
    brand: {
      "@type": "Brand",
      name: box.name,
    },
    offers: {
      "@type": "Offer",
      price: String(box.price),
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: `https://kado-box.fr/box/${box.slug}`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: String(box.rating),
      bestRating: "5",
      reviewCount: "1",
    },
  };
}

function buildBreadcrumbJsonLd(box: Awaited<ReturnType<typeof getBoxBySlug>> & object) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://kado-box.fr" },
      { "@type": "ListItem", position: 2, name: box.name, item: `https://kado-box.fr/box/${box.slug}` },
    ],
  };
}

function buildFaqJsonLd(box: Awaited<ReturnType<typeof getBoxBySlug>> & object) {
  const crueltyFreeAnswer = isCrueltyFree(box.certifications)
    ? `Oui, ${box.name} est cruelty-free${box.certifications.length ? ` (${box.certifications.join(", ")})` : ""}.`
    : `${box.name} ne dispose pas de certification cruelty-free officielle. Consultez leur site pour plus d'informations.`;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Combien coûte ${box.name} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${box.name} est disponible à partir de ${box.price}${box.currency} par ${box.billing}.`,
        },
      },
      {
        "@type": "Question",
        name: `Combien de produits dans ${box.name} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${box.name} contient ${box.nb_products} produits par mois.`,
        },
      },
      {
        "@type": "Question",
        name: `${box.name} est-elle cruelty-free ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: crueltyFreeAnswer,
        },
      },
    ],
  };
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default async function BoxPage({ params }: PageProps) {
  const { slug } = await params;
  const box = getBoxBySlug(slug);

  if (!box) {
    notFound();
  }

  const affiliateUrl = getAffiliateUrl(slug);

  // Related articles: match by tag or box name (first word, case-insensitive)
  const firstWord = box.name.toLowerCase().split(" ")[0];
  const allArticles = getAllArticles();
  const relatedArticles = allArticles
    .filter(
      (a) =>
        a.meta.tags?.includes(slug) ||
        a.meta.boxName?.toLowerCase().includes(firstWord)
    )
    .slice(0, 3);

  const productJsonLd = buildProductJsonLd(box);
  const faqJsonLd = buildFaqJsonLd(box);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(box);
  const pillClass = `pill ${getPillClass(box.category)}`;

  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <Header />

      <main>
        {/* ------------------------------------------------------------------ */}
        {/* Breadcrumb                                                          */}
        {/* ------------------------------------------------------------------ */}
        <div className="container">
          <nav className="breadcrumbs" aria-label="Fil d'ariane">
            <a href="/">Accueil</a>
            <ChevronRight size={14} aria-hidden="true" />
            <a href="/box">Box beauté</a>
            <ChevronRight size={14} aria-hidden="true" />
            <span aria-current="page">{box.name}</span>
          </nav>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* Hero                                                                */}
        {/* ------------------------------------------------------------------ */}
        <section className="section">
          <div className="container">
            <div className="hero-inner">
              {/* Logo */}
              <div className="hero-logo-wrapper">
                <img
                  src={box.logo}
                  alt={`Logo ${box.name}`}
                  width={120}
                  height={120}
                  className="hero-logo"
                />
              </div>

              {/* Info */}
              <div className="hero-content">
                {/* Category badge */}
                <span className={pillClass}>{box.category}</span>

                <h1 className="hero-title">{box.name}</h1>

                <p className="hero-description">{box.description}</p>

                {/* Rating */}
                <div className="hero-rating" aria-label={`Note : ${box.rating} sur 5`}>
                  <span className="hero-stars">{renderStars(box.rating)}</span>
                  <span className="hero-rating-value">
                    {box.rating.toFixed(1)}<span className="hero-rating-max">/5</span>
                  </span>
                </div>

                {/* Price */}
                <p className="hero-price">
                  <span className="hero-price-amount">
                    {box.price}{box.currency}
                  </span>
                  <span className="hero-price-period">/{box.billing}</span>
                </p>

                {/* CTAs */}
                <div className="hero-cta-group">
                  <a
                    href={affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="btn btn-primary"
                  >
                    Découvrir {box.name}
                    <ExternalLink size={16} aria-hidden="true" />
                  </a>
                  <a
                    href={box.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                  >
                    Voir le site officiel
                    <ExternalLink size={16} aria-hidden="true" />
                  </a>
                </div>

                {/* Certifications */}
                {box.certifications.length > 0 && (
                  <div className="hero-certifications">
                    {box.certifications.map((cert) => (
                      <span key={cert} className="pill pill-bio">
                        <Leaf size={12} aria-hidden="true" />
                        {cert}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* Stats bar                                                           */}
        {/* ------------------------------------------------------------------ */}
        <div className="stats-bar">
          <div className="container">
            <div className="stats-bar-inner">
              <div className="stat-item">
                <span className="stat-number">
                  {box.price}{box.currency}
                </span>
                <span className="stat-label">par {box.billing}</span>
              </div>

              <div className="stat-item">
                <Package size={20} aria-hidden="true" />
                <span className="stat-number">{box.nb_products}</span>
                <span className="stat-label">produits / mois</span>
              </div>

              <div className="stat-item">
                <Star size={20} aria-hidden="true" />
                <span className="stat-number">{box.rating.toFixed(1)}/5</span>
                <span className="stat-label">notre note</span>
              </div>

              <div className="stat-item">
                <Shield size={20} aria-hidden="true" />
                <span className="stat-number">
                  {box.certifications.length > 0
                    ? box.certifications.length
                    : "—"}
                </span>
                <span className="stat-label">
                  {box.certifications.length === 1
                    ? "certification"
                    : box.certifications.length > 1
                    ? "certifications"
                    : "certification"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* Pros / Cons                                                         */}
        {/* ------------------------------------------------------------------ */}
        <section className="section" aria-labelledby="pros-cons-heading">
          <div className="container">
            <h2 id="pros-cons-heading" className="section-title">
              Points forts et points faibles
            </h2>

            <div className="pros-cons-grid">
              {/* Pros */}
              <div className="pros-cons-card pros-card">
                <h3 className="pros-cons-card-title">
                  <Check size={20} aria-hidden="true" />
                  Les plus
                </h3>
                <ul className="box-pros">
                  {box.pros.map((pro) => (
                    <li key={pro}>
                      <Check size={16} aria-hidden="true" />
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cons */}
              <div className="pros-cons-card cons-card">
                <h3 className="pros-cons-card-title">
                  <X size={20} aria-hidden="true" />
                  Les moins
                </h3>
                <ul className="box-pros">
                  {box.cons.map((con) => (
                    <li key={con}>
                      <X size={16} aria-hidden="true" />
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* Verdict                                                             */}
        {/* ------------------------------------------------------------------ */}
        <section className="section" aria-labelledby="verdict-heading">
          <div className="container">
            <div className="verdict-card">
              <div className="verdict-header">
                <Sparkles size={24} aria-hidden="true" />
                <h2 id="verdict-heading">Notre verdict sur {box.name}</h2>
              </div>
              <p className="verdict-text">{box.verdict}</p>
              <a
                href={affiliateUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="btn btn-primary"
              >
                Essayer {box.name}
                <ExternalLink size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* Related articles                                                    */}
        {/* ------------------------------------------------------------------ */}
        {relatedArticles.length > 0 && (
          <section className="section" aria-labelledby="articles-heading">
            <div className="container">
              <h2 id="articles-heading" className="section-title">
                Articles liés à {box.name}
              </h2>

              <div className="articles-grid">
                {relatedArticles.map((article) => (
                  <a
                    key={article.meta.slug}
                    href={`/article/${article.meta.slug}`}
                    className="box-card-body article-card-link"
                  >
                    <article className="article-card">
                      {article.meta.image && (
                        <Image
                          src={article.meta.image}
                          alt={article.meta.title}
                          width={400}
                          height={220}
                          className="article-card-image"
                          style={{ width: "100%", height: "auto" }}
                        />
                      )}
                      <div className="article-card-content">
                        {article.meta.tags && article.meta.tags.length > 0 && (
                          <span className="pill">
                            {article.meta.tags[0]}
                          </span>
                        )}
                        <h3 className="article-card-title">
                          {article.meta.title}
                        </h3>
                        {article.meta.description && (
                          <p className="article-card-excerpt">
                            {article.meta.description}
                          </p>
                        )}
                        <span className="article-card-cta">
                          Lire l'article
                          <ChevronRight size={14} aria-hidden="true" />
                        </span>
                      </div>
                    </article>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* FAQ                                                                 */}
        {/* ------------------------------------------------------------------ */}
        <section className="section" aria-labelledby="faq-heading">
          <div className="container">
            <h2 id="faq-heading" className="section-title">
              Questions fréquentes sur {box.name}
            </h2>

            <dl className="faq-list">
              <div className="faq-item">
                <dt className="faq-question">
                  Combien coûte {box.name} ?
                </dt>
                <dd className="faq-answer">
                  {box.name} est disponible à partir de{" "}
                  <strong>
                    {box.price}{box.currency} par {box.billing}
                  </strong>
                  . Le tarif peut varier selon la formule choisie (mensuel,
                  trimestriel, annuel).
                </dd>
              </div>

              <div className="faq-item">
                <dt className="faq-question">
                  Combien de produits dans {box.name} ?
                </dt>
                <dd className="faq-answer">
                  Chaque mois, {box.name} contient{" "}
                  <strong>{box.nb_products} produits</strong> soigneusement
                  sélectionnés selon le thème du moment.
                </dd>
              </div>

              <div className="faq-item">
                <dt className="faq-question">
                  {box.name} est-elle cruelty-free ?
                </dt>
                <dd className="faq-answer">
                  {isCrueltyFree(box.certifications) ? (
                    <>
                      Oui, {box.name} est cruelty-free
                      {box.certifications.length > 0 && (
                        <>
                          {" "}et dispose des certifications suivantes :{" "}
                          <strong>{box.certifications.join(", ")}</strong>
                        </>
                      )}
                      .
                    </>
                  ) : (
                    <>
                      {box.name} ne dispose pas de certification cruelty-free
                      officielle. Nous vous recommandons de consulter leur{" "}
                      <a
                        href={box.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        site officiel
                      </a>{" "}
                      pour obtenir les informations les plus récentes.
                    </>
                  )}
                </dd>
              </div>
            </dl>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* Footer CTA                                                          */}
        {/* ------------------------------------------------------------------ */}
        <section className="section">
          <div className="container">
            <div className="footer-cta-box">
              <p className="footer-cta-label hero-badge">
                Offre du moment
              </p>
              <h2 className="footer-cta-title">
                Prête à essayer {box.name} ?
              </h2>
              <p className="footer-cta-subtitle">
                Abonnez-vous dès aujourd'hui et recevez{" "}
                {box.nb_products} produits beauté chaque mois pour seulement{" "}
                {box.price}{box.currency}/{box.billing}.
              </p>
              <a
                href={affiliateUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="btn btn-primary"
              >
                Découvrir {box.name}
                <ExternalLink size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* -------------------------------------------------------------------- */}
      {/* Footer                                                               */}
      {/* -------------------------------------------------------------------- */}
      <footer className="site-footer">
        <div className="container">
          <p className="footer-legal">
            © {new Date().getFullYear()} Kado Box — Ce site contient des liens
            affiliés. Nous pouvons percevoir une commission si vous vous abonnez
            via nos liens, sans frais supplémentaires pour vous.
          </p>
          <nav className="footer-nav" aria-label="Navigation pied de page">
            <a href="/mentions-legales">Mentions légales</a>
            <a href="/politique-de-confidentialite">Confidentialité</a>
            <a href="/contact">Contact</a>
          </nav>
        </div>
      </footer>
    </>
  );
}
