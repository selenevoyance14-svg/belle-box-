import { GUIDES, getGuideBySlug } from "@/lib/guides";
import { getProductsByOccasion, getProductsByRecipient, OCCASIONS, type CatalogProduct } from "@/lib/catalog";
import { Star, ChevronRight, Truck, Sparkles, Menu, ArrowLeft, Clock, Calendar } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface Props { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const g = getGuideBySlug(slug);
  if (!g) return { title: "Guide introuvable" };
  return {
    title: g.metaTitle,
    description: g.metaDescription,
    alternates: { canonical: `https://kado-box.fr/guide/${slug}` },
  };
}

function decodeTitle(t: string) {
  return t.replace(/&#39;/g, "'").replace(/&amp;/g, "&").replace(/&quot;/g, '"');
}

function formatPrice(p: number) {
  return `${p.toFixed(2).replace('.', ',')} €`;
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div style={{ display: "inline-flex", gap: "1px", color: "var(--star)" }}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={13} fill={i < Math.round(rating) ? "currentColor" : "none"} stroke="currentColor" />
      ))}
    </div>
  );
}

function ProductCard({ product, badge }: { product: CatalogProduct; badge?: string }) {
  return (
    <a
      href={product.affiliate_url}
      target="_blank"
      rel="nofollow noopener noreferrer"
      className="product-card"
    >
      {badge && <span className="product-badge"><Sparkles size={11} /> {badge}</span>}
      <div className="product-image">
        {product.image && (
          <Image
            src={product.image}
            alt={decodeTitle(product.title)}
            fill
            style={{ objectFit: "contain", padding: "14px" }}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        )}
      </div>
      <div className="product-body">
        <h3 className="product-title">{decodeTitle(product.title)}</h3>
        {product.rating && (
          <div className="product-rating">
            <StarRow rating={product.rating} />
            <span className="rating-num">{product.rating}/5</span>
            {product.reviews_count && (
              <span className="muted">· {product.reviews_count.toLocaleString('fr-FR')} avis</span>
            )}
          </div>
        )}
        <div className="product-price">
          <span className="price-now">{formatPrice(product.price)}</span>
        </div>
        <span className="btn btn-primary btn-sm product-cta">
          Voir sur Amazon <ChevronRight size={14} />
        </span>
        <span className="product-prime"><Truck size={12} /> Livraison Prime</span>
      </div>
    </a>
  );
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  let products: CatalogProduct[] = [];
  if (guide.occasionSlug) {
    products = getProductsByOccasion(guide.occasionSlug);
  } else if (guide.recipientSlug) {
    products = getProductsByRecipient(guide.recipientSlug);
  }
  products = products
    .sort((a, b) => (b.reviews_count || 0) - (a.reviews_count || 0))
    .slice(0, 6);

  const otherGuides = GUIDES.filter((g) => g.slug !== slug).slice(0, 3);

  return (
    <>
      <header className="header">
        <div className="container">
          <a href="/" className="logo" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
            Kado<span style={{ color: 'var(--primary)' }}>-Box</span>
          </a>
          <nav className="nav">
            {OCCASIONS.slice(0, 4).map((o) => (
              <a key={o.slug} href={`/occasion/${o.slug}`}>{o.name}</a>
            ))}
          </nav>
          <button className="mobile-menu-btn" aria-label="Menu"><Menu size={20} /></button>
        </div>
      </header>

      <article className="static-page">
        <div className="container" style={{ maxWidth: "820px" }}>
          <a href="/guide" className="breadcrumb-back">
            <ArrowLeft size={14} /> Tous les guides
          </a>

          <h1 style={{ marginTop: "12px" }}>{guide.title}</h1>
          <div style={{ display: "flex", gap: "16px", color: "var(--muted-text)", fontSize: "0.9rem", marginBottom: "24px" }}>
            <span><Calendar size={13} style={{ display: "inline", verticalAlign: "middle", marginRight: "4px" }} /> Mis à jour le {new Date(guide.publishedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            <span><Clock size={13} style={{ display: "inline", verticalAlign: "middle", marginRight: "4px" }} /> {guide.readingMinutes} min de lecture</span>
          </div>

          <p style={{ fontSize: "1.1rem", lineHeight: "1.7", marginBottom: "32px" }}>{guide.intro}</p>

          {guide.sections.map((s, i) => (
            <section key={i} style={{ marginBottom: "32px" }}>
              <h2 style={{ marginTop: "32px" }}>{s.heading}</h2>
              {s.paragraphs.map((p, j) => (
                <p key={j} style={{ lineHeight: "1.7" }}>{p}</p>
              ))}
            </section>
          ))}

          {products.length > 0 && (
            <section style={{ marginTop: "48px" }}>
              <h2>Notre sélection de produits Amazon</h2>
              <p style={{ color: "var(--muted-text)" }}>Triés par avis vérifiés. En cliquant, vous accédez à la fiche produit Amazon.</p>
              <div className="product-grid" style={{ marginTop: "24px" }}>
                {products.map((p, i) => (
                  <ProductCard
                    key={p.asin}
                    product={p}
                    badge={i === 0 ? "Top vente" : i === 1 ? "Coup de cœur" : undefined}
                  />
                ))}
              </div>
            </section>
          )}

          {guide.faq && guide.faq.length > 0 && (
            <section style={{ marginTop: "48px" }}>
              <h2>Questions fréquentes</h2>
              {guide.faq.map((item, i) => (
                <div key={i} style={{ marginBottom: "20px" }}>
                  <h3 style={{ fontSize: "1.05rem", marginBottom: "8px" }}>{item.q}</h3>
                  <p style={{ lineHeight: "1.7", margin: 0 }}>{item.a}</p>
                </div>
              ))}
            </section>
          )}

          {otherGuides.length > 0 && (
            <section style={{ marginTop: "60px", padding: "32px", background: "var(--muted)", borderRadius: "16px" }}>
              <h2 style={{ marginTop: 0 }}>À lire aussi</h2>
              <div className="occasion-grid" style={{ marginTop: "20px" }}>
                {otherGuides.map((g) => (
                  <a key={g.slug} href={`/guide/${g.slug}`} className="occasion-card">
                    <div>
                      <h3>{g.title}</h3>
                      <p>{g.metaDescription}</p>
                    </div>
                    <ChevronRight size={20} style={{ alignSelf: "center" }} />
                  </a>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>

      <footer className="footer">
        <div className="container">
          <div className="footer-bottom">
            <p>© 2026 Kado-Box. En tant que Partenaire Amazon, nous réalisons un bénéfice sur les achats remplissant les conditions requises.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
