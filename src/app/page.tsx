import { getCatalog, getProductsByOccasion, isGiftCandidate, OCCASIONS, RECIPIENTS, BUDGETS } from "@/lib/catalog";
import { GUIDES } from "@/lib/guides";
import { ProductCard } from "@/app/components/ProductCard";
import Image from "next/image";
import {
  ChevronRight, Truck, ShieldCheck, Award, ThumbsUp,
  Gift, Heart, Menu, Wallet, BookOpen, Clock, Search
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Idées cadeaux utiles et petit budget | Kado-Box",
  description: "Trouvez une idée cadeau utile pour Noël, un anniversaire ou une attention. Sélections par personne, occasion et budget.",
  alternates: { canonical: "https://kado-box.fr" },
};

export default function Home() {
  const catalog = getCatalog();
  const curatedCount = catalog.filter(isGiftCandidate).length;
  const featuredGuideSlugs = [
    "cadeau-noel-petit-budget",
    "cadeau-ado-garcon",
    "cadeau-grand-pere",
    "cadeau-anniversaire-mariage",
    "idees-cadeaux-noel-2026",
    "cadeau-ado-fille",
  ];
  const featuredGuides = featuredGuideSlugs
    .map((slug) => GUIDES.find((guide) => guide.slug === slug))
    .filter((guide): guide is (typeof GUIDES)[number] => Boolean(guide));

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
              Noël, anniversaire, grands-parents, ados… Des idées utiles classées par personne, occasion et budget.
            </p>
            <ul className="hero-trust-list">
              <li><Award size={16} /> {curatedCount} idées retenues</li>
              <li><ThumbsUp size={16} /> Les produits hors sujet sont écartés</li>
              <li><Truck size={16} /> Prix et livraison à vérifier chez le marchand</li>
            </ul>
            <div className="hero-cta">
              <a href="#occasions" className="btn btn-primary">
                Trouver une idée <ChevronRight size={16} />
              </a>
              <a href="#cadeaux" className="btn btn-secondary">
                <Search size={16} /> Voir les cadeaux
              </a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-gift-visual">
              <Image
                src="/images/kado-hero-gifts.png"
                alt="Sélection de cadeaux Kado-Box : coffret, fleurs, livre et peluche"
                fill
                priority
                sizes="(max-width: 900px) 100vw, 50vw"
                className="hero-gift-image"
              />
              <span className="hero-float-badge badge-1">🎁 Pour tous les budgets</span>
              <span className="hero-float-badge badge-2">✨ Des idées qui font plaisir</span>
            </div>
          </div>
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

      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2><Wallet size={26} style={{ display: "inline", verticalAlign: "middle" }} /> Choisir par budget</h2>
            <p>Du petit prix au cadeau d'exception, trouvez l'idée selon votre enveloppe.</p>
          </div>
          <div className="occasion-grid">
            {BUDGETS.map((b) => (
              <a key={b.slug} href={`/budget/${b.slug}`} className="occasion-card">
                <div className="occasion-emoji">{b.emoji}</div>
                <div>
                  <h3>{b.name}</h3>
                  <p>{b.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--muted)" }}>
        <div className="container">
          <div className="section-title">
            <h2><BookOpen size={26} style={{ display: "inline", verticalAlign: "middle" }} /> Nos guides cadeaux</h2>
            <p>Des conseils concrets pour bien choisir : par occasion, par âge, par personnalité.</p>
          </div>
          <div className="occasion-grid">
            {featuredGuides.map((g) => (
              <a key={g.slug} href={`/guide/${g.slug}`} className="occasion-card">
                <div>
                  <h3>{g.title}</h3>
                  <p>{g.metaDescription}</p>
                  <span className="occasion-count">
                    <Clock size={12} style={{ display: "inline", verticalAlign: "middle", marginRight: "4px" }} />
                    {g.readingMinutes} min de lecture
                  </span>
                </div>
                <ChevronRight size={20} style={{ alignSelf: "center" }} />
              </a>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "32px" }}>
            <a href="/guide" className="btn btn-secondary">
              Voir tous les guides <ChevronRight size={16} />
            </a>
          </div>
        </div>
      </section>

      <section className="container" id="cadeaux">
        <div className="reassurance-bar">
          <div className="reassurance-item">
            <Truck size={22} />
            <div>
              <strong>Disponibilité</strong>
              <span>À vérifier chez le marchand</span>
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
              <strong>Sélection resserrée</strong>
              <span>Produits hors sujet écartés</span>
            </div>
          </div>
          <div className="reassurance-item">
            <ThumbsUp size={22} />
            <div>
              <strong>{curatedCount} idées</strong>
              <span>Classées par besoin</span>
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
                  badge={i === 0 ? "À découvrir" : i === 1 ? "Autre idée" : undefined}
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
              <p>Des idées cadeaux utiles, classées par personne, occasion et budget.</p>
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
              <h4>Budget</h4>
              <ul className="footer-links">
                {BUDGETS.map((b) => (
                  <li key={b.slug}><a href={`/budget/${b.slug}`}>{b.name}</a></li>
                ))}
                <li><a href="/guide">Tous nos guides</a></li>
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
