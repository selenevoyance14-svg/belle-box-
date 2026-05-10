import { getCatalog, getProductsByOccasion, OCCASIONS, RECIPIENTS, type CatalogProduct } from "@/lib/catalog";
import {
  Star, ChevronRight, Truck, ShieldCheck, Award, ThumbsUp,
  Gift, Heart, Sparkles, Menu
} from "lucide-react";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kado-Box — Idées cadeaux Amazon par occasion (2026)",
  description: "Trouvez le cadeau parfait : Fête des mères, Noël, anniversaire, Saint-Valentin… Sélection des meilleurs cadeaux Amazon avec prix et avis vérifiés.",
  alternates: { canonical: "https://kado-box.fr" },
};

function formatPrice(p: number) {
  return `${p.toFixed(2).replace('.', ',')} €`;
}

function decodeTitle(t: string) {
  return t.replace(/&#39;/g, "'").replace(/&amp;/g, "&").replace(/&quot;/g, '"');
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

export default function Home() {
  const catalog = getCatalog();

  const featured = [...catalog]
    .filter((p) => (p.rating || 0) >= 4.5 && (p.reviews_count || 0) >= 200)
    .sort((a, b) => (b.reviews_count || 0) - (a.reviews_count || 0))[0];

  const occasionsBlocks = OCCASIONS.map((occ) => ({
    ...occ,
    products: getProductsByOccasion(occ.slug)
      .sort((a, b) => (b.reviews_count || 0) - (a.reviews_count || 0))
      .slice(0, 6),
  })).filter((o) => o.products.length >= 3);

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
          <button className="mobile-menu-btn" aria-label="Menu">
            <Menu size={20} />
          </button>
        </div>
      </header>

      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <Gift size={14} /> Idées cadeaux 2026
            </div>
            <h1>
              Trouvez le cadeau <span className="squiggle">parfait</span>
            </h1>
            <p className="hero-subtitle">
              Fête des mères, Noël, anniversaire, Saint-Valentin… Notre sélection des meilleurs cadeaux Amazon, avec prix et avis vérifiés.
            </p>
            <ul className="hero-trust-list">
              <li><Award size={16} /> {catalog.length} idées sélectionnées</li>
              <li><ThumbsUp size={16} /> Triées par avis vérifiés Amazon</li>
              <li><Truck size={16} /> Livraison Prime offerte</li>
            </ul>
            <div className="hero-cta">
              <a href="#occasions" className="btn btn-primary">
                Choisir une occasion <ChevronRight size={16} />
              </a>
            </div>
          </div>
          {featured && (
            <div className="hero-visual">
              <a
                href={featured.affiliate_url}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="hero-product-card"
              >
                <div className="hero-product-image">
                  <Image
                    src={featured.image}
                    alt={decodeTitle(featured.title)}
                    fill
                    style={{ objectFit: "contain", padding: "20px" }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
                <div className="hero-product-body">
                  <span className="hero-product-tag"><Award size={12} /> Le coup de cœur</span>
                  <h3>{decodeTitle(featured.title).slice(0, 75)}{decodeTitle(featured.title).length > 75 ? "…" : ""}</h3>
                  {featured.rating && (
                    <div className="hero-product-rating">
                      <StarRow rating={featured.rating} />
                      <span>{featured.rating}/5</span>
                      {featured.reviews_count && (
                        <span className="muted">({featured.reviews_count.toLocaleString('fr-FR')} avis)</span>
                      )}
                    </div>
                  )}
                  <div className="hero-product-price">
                    <span className="price-now">{formatPrice(featured.price)}</span>
                  </div>
                  <span className="btn btn-primary btn-sm" style={{ width: "100%", justifyContent: "center" }}>
                    Voir sur Amazon <ChevronRight size={14} />
                  </span>
                </div>
              </a>
            </div>
          )}
        </div>
      </section>

      <section className="section" id="occasions">
        <div className="container">
          <div className="section-title">
            <h2>Choisir par occasion</h2>
            <p>Cliquez sur une occasion pour voir notre sélection complète.</p>
          </div>
          <div className="occasion-grid">
            {OCCASIONS.map((o) => {
              const count = getProductsByOccasion(o.slug).length;
              return (
                <a key={o.slug} href={`/occasion/${o.slug}`} className="occasion-card">
                  <div className="occasion-emoji">{o.emoji}</div>
                  <div>
                    <h3>{o.name}</h3>
                    <p>{o.description}</p>
                    <span className="occasion-count">{count} idées</span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--muted)" }}>
        <div className="container">
          <div className="section-title">
            <h2><Heart size={26} style={{ display: "inline", verticalAlign: "middle" }} /> Pour qui ?</h2>
            <p>Sélection ciblée par destinataire.</p>
          </div>
          <div className="recipient-grid">
            {RECIPIENTS.map((r) => (
              <a key={r.slug} href={`/destinataire/${r.slug}`} className="recipient-card">
                <span className="recipient-emoji">{r.emoji}</span>
                <span>{r.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="container">
        <div className="reassurance-bar">
          <div className="reassurance-item">
            <Truck size={22} />
            <div>
              <strong>Livraison rapide</strong>
              <span>Prime offerte 24h</span>
            </div>
          </div>
          <div className="reassurance-item">
            <ShieldCheck size={22} />
            <div>
              <strong>Achat sécurisé</strong>
              <span>Paiement & retour Amazon</span>
            </div>
          </div>
          <div className="reassurance-item">
            <Award size={22} />
            <div>
              <strong>Sélection vérifiée</strong>
              <span>Triée par avis clients</span>
            </div>
          </div>
          <div className="reassurance-item">
            <ThumbsUp size={22} />
            <div>
              <strong>{catalog.length} idées</strong>
              <span>Tous prix confondus</span>
            </div>
          </div>
        </div>
      </section>

      {occasionsBlocks.map((block, idx) => (
        <section
          key={block.slug}
          className="section"
          style={idx % 2 === 0 ? {} : { background: "var(--muted)" }}
        >
          <div className="container">
            <div className="section-title">
              <h2><span style={{ marginRight: "8px" }}>{block.emoji}</span> {block.name}</h2>
              <p>{block.description}</p>
            </div>
            <div className="product-grid">
              {block.products.map((p, i) => (
                <ProductCard
                  key={p.asin}
                  product={p}
                  badge={i === 0 ? "Top vente" : i === 1 ? "Coup de cœur" : undefined}
                />
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: "32px" }}>
              <a href={`/occasion/${block.slug}`} className="btn btn-secondary">
                Voir tous les cadeaux <ChevronRight size={16} />
              </a>
            </div>
          </div>
        </section>
      ))}

      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <a href="/" className="logo" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', textDecoration: 'none' }}>
                Kado<span style={{ color: 'var(--primary-light)' }}>-Box</span>
              </a>
              <p>Le guide des meilleures idées cadeaux Amazon, mis à jour en continu.</p>
            </div>
            <div>
              <h4>Occasions</h4>
              <ul className="footer-links">
                {OCCASIONS.slice(0, 6).map((o) => (
                  <li key={o.slug}><a href={`/occasion/${o.slug}`}>{o.name}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Pour qui</h4>
              <ul className="footer-links">
                {RECIPIENTS.map((r) => (
                  <li key={r.slug}><a href={`/destinataire/${r.slug}`}>{r.name}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Infos</h4>
              <ul className="footer-links">
                <li><a href="/a-propos">À propos</a></li>
                <li><a href="/contact">Contact</a></li>
                <li><a href="/mentions-legales">Mentions légales</a></li>
                <li><a href="/politique-de-confidentialite">Confidentialité</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 Kado-Box. En tant que Partenaire Amazon, nous réalisons un bénéfice sur les achats remplissant les conditions requises.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
