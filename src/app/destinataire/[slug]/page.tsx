import { getProductsByRecipient, RECIPIENTS, type CatalogProduct } from "@/lib/catalog";
import { Star, ChevronRight, Truck, Sparkles, Menu, ArrowLeft } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface Props { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return RECIPIENTS.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const r = RECIPIENTS.find((x) => x.slug === slug);
  if (!r) return { title: "Destinataire introuvable" };
  return {
    title: `Cadeaux ${r.name.toLowerCase()} — Kado-Box`,
    description: `Idées cadeaux ${r.name.toLowerCase()} : sélection des meilleurs produits Amazon avec prix et avis.`,
    alternates: { canonical: `https://kado-box.fr/destinataire/${slug}` },
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

export default async function RecipientPage({ params }: Props) {
  const { slug } = await params;
  const r = RECIPIENTS.find((x) => x.slug === slug);
  if (!r) notFound();
  const products = getProductsByRecipient(slug)
    .sort((a, b) => (b.reviews_count || 0) - (a.reviews_count || 0));

  return (
    <>
      <header className="header">
        <div className="container">
          <a href="/" className="logo" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
            Kado<span style={{ color: 'var(--primary)' }}>-Box</span>
          </a>
          <nav className="nav">
            {RECIPIENTS.slice(0, 4).map((x) => (
              <a key={x.slug} href={`/destinataire/${x.slug}`}>{x.name}</a>
            ))}
          </nav>
          <button className="mobile-menu-btn" aria-label="Menu"><Menu size={20} /></button>
        </div>
      </header>

      <section className="static-page">
        <div className="container">
          <a href="/" className="breadcrumb-back">
            <ArrowLeft size={14} /> Retour à l'accueil
          </a>
          <div className="occasion-header">
            <div className="occasion-header-emoji">{r.emoji}</div>
            <div>
              <h1>Cadeaux {r.name.toLowerCase()}</h1>
              <p className="occasion-header-desc">Notre sélection ciblée pour faire mouche.</p>
              <span className="muted">{products.length} idées sélectionnées sur Amazon</span>
            </div>
          </div>

          {products.length === 0 ? (
            <p style={{ textAlign: "center", padding: "60px 0" }}>
              Aucun produit pour ce destinataire pour l'instant.
            </p>
          ) : (
            <div className="product-grid" style={{ marginTop: "40px" }}>
              {products.map((p, i) => (
                <ProductCard
                  key={p.asin}
                  product={p}
                  badge={i === 0 ? "Top vente" : i === 1 ? "Coup de cœur" : undefined}
                />
              ))}
            </div>
          )}
        </div>
      </section>

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
