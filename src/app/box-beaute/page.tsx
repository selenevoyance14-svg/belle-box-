import type { Metadata } from "next";
import { getAllBoxes, getAffiliateUrl } from "@/lib/affiliate";
import { ChevronRight, Leaf, Sparkles, Droplets, Heart, Gift } from "lucide-react";
import Header from "@/app/components/Header";
import BoxGrid from "@/app/components/BoxGrid";

export const metadata: Metadata = {
  title: "Box Beauté — Comparatif Complet 2026 | Kado",
  description:
    "Découvrez les meilleures box beauté en France en 2026. Comparatif complet : prix, produits, avis et codes promo pour Biotyfull, Blissim, LookFantastic et plus.",
  alternates: {
    canonical: "https://kado-box.fr/box-beaute",
  },
  openGraph: {
    title: "Box Beauté — Comparatif Complet 2026",
    description:
      "Toutes les box beauté françaises comparées honnêtement : prix, produits, avis et codes promo.",
    url: "https://kado-box.fr/box-beaute",
    type: "website",
    locale: "fr_FR",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Qu'est-ce qu'une box beauté ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Une box beauté est un abonnement mensuel qui livre chez vous une sélection de produits cosmétiques : soins, maquillage, parfums ou accessoires. Chaque mois, vous découvrez des nouveautés de marques connues ou émergentes.",
      },
    },
    {
      "@type": "Question",
      name: "Combien coûte une box beauté par mois ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Les box beauté en France coûtent entre 17,90€ et 39,90€ par mois. Blissim et My Little Box démarrent à 17,90€, tandis que Biotyfull Box est à 39,90€ mais propose des produits full-size d'une valeur d'environ 80€.",
      },
    },
    {
      "@type": "Question",
      name: "Peut-on résilier une box beauté facilement ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui, la plupart des box beauté proposent un abonnement sans engagement résiliable en quelques clics depuis votre espace client. Certaines offrent aussi des formules trimestrielles ou annuelles avec une réduction.",
      },
    },
    {
      "@type": "Question",
      name: "Quelle box beauté est la meilleure en 2026 ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Selon notre comparatif, Biotyfull Box est la meilleure pour les amatrices de bio (4,8/5), Prescription Lab pour le premium (4,6/5) et Blissim pour le meilleur rapport qualité/prix (4,3/5 à 17,90€/mois).",
      },
    },
    {
      "@type": "Question",
      name: "Existe-t-il des codes promo pour les box beauté ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui, nous maintenons une liste de codes promo vérifiés pour toutes les grandes box beauté. Rendez-vous sur notre page codes promo pour les offres du moment.",
      },
    },
  ],
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://kado-box.fr" },
    { "@type": "ListItem", position: 2, name: "Box Beauté", item: "https://kado-box.fr/box-beaute" },
  ],
};

const categories = [
  { slug: "bio", label: "Box Bio & Naturel", icon: <Leaf size={16} />, pill: "pill-bio" },
  { slug: "premium", label: "Box Premium", icon: <Sparkles size={16} />, pill: "pill-luxe" },
  { slug: "mixte", label: "Box Soin & Maquillage", icon: <Droplets size={16} />, pill: "pill-soin" },
  { slug: "lifestyle", label: "Box Lifestyle", icon: <Heart size={16} />, pill: "pill-maquillage" },
];

export default function BoxBeautePage() {
  const boxes = getAllBoxes();
  const affiliateUrls = Object.fromEntries(
    boxes.map((b) => [b.slug, getAffiliateUrl(b.slug)])
  );
  const year = new Date().getFullYear();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <Header />

      <main>
        {/* BREADCRUMB */}
        <div className="container" style={{ paddingTop: "16px" }}>
          <nav className="breadcrumbs" aria-label="Fil d'ariane">
            <a href="/">Accueil</a>
            <ChevronRight size={14} aria-hidden="true" />
            <span aria-current="page">Box Beauté</span>
          </nav>
        </div>

        {/* HERO */}
        <section className="section" style={{ paddingTop: "32px", paddingBottom: "32px" }}>
          <div className="container">
            <div className="section-title">
              <div className="hero-badge" style={{ display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "16px" }}>
                <Gift size={16} aria-hidden="true" />
                {boxes.length} box comparées — {year}
              </div>
              <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", lineHeight: 1.2, marginBottom: "16px" }}>
                Box Beauté — Comparatif Complet {year}
              </h1>
              <p style={{ maxWidth: "640px", margin: "0 auto 24px", color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: 1.6 }}>
                Une box beauté, c'est la surprise d'une sélection de produits cosmétiques livrée chaque mois.
                On a comparé les {boxes.length} meilleures box françaises pour vous aider à choisir sans vous tromper.
              </p>
              <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
                <a href="#comparatif" className="btn btn-primary">Voir le comparatif →</a>
                <a href="/quiz" className="btn btn-secondary">Quiz — quelle box pour moi ?</a>
              </div>
            </div>
          </div>
        </section>

        {/* CATEGORIES */}
        <section style={{ background: "var(--muted)", padding: "32px 0" }}>
          <div className="container">
            <p style={{ textAlign: "center", fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: "16px" }}>
              Filtrer par type de box
            </p>
            <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
              {categories.map((cat) => (
                <a
                  key={cat.slug}
                  href={`/categorie/${cat.slug}`}
                  className={`pill ${cat.pill}`}
                  style={{ display: "inline-flex", alignItems: "center", gap: "6px", textDecoration: "none", padding: "8px 16px" }}
                >
                  {cat.icon}
                  {cat.label}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* COMPARATIF */}
        <section className="section" id="comparatif">
          <div className="container">
            <div className="section-title">
              <h2>Les {boxes.length} meilleures box beauté {year}</h2>
              <p>Classées par note. Avis basés sur des tests réels, sans partenariat commercial.</p>
            </div>
            <BoxGrid boxes={boxes} affiliateUrls={affiliateUrls} />
          </div>
        </section>

        {/* INTRO EDITORIALE */}
        <section className="section" style={{ background: "var(--muted)" }}>
          <div className="container" style={{ maxWidth: "760px" }}>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "1.6rem", marginBottom: "20px" }}>
              Qu'est-ce qu'une box beauté ?
            </h2>
            <p style={{ lineHeight: 1.7, color: "var(--text-muted)", marginBottom: "16px" }}>
              Une <strong>box beauté</strong> est un abonnement mensuel qui vous livre à domicile une sélection
              de produits cosmétiques. Chaque mois, vous recevez entre 5 et 7 produits : soins du visage,
              maquillage, parfums, accessoires... selon la box choisie.
            </p>
            <p style={{ lineHeight: 1.7, color: "var(--text-muted)", marginBottom: "16px" }}>
              Le concept est apparu en France autour de 2011 avec Birchbox (devenue Blissim). Depuis,
              les box beauté se sont multipliées pour couvrir tous les profils : box bio, box premium,
              box lifestyle, box personnalisées...
            </p>
            <p style={{ lineHeight: 1.7, color: "var(--text-muted)", marginBottom: "24px" }}>
              <strong>Le prix moyen est de 20€ à 40€ par mois</strong>, pour une valeur de produits
              généralement supérieure. C'est aussi une excellente façon de découvrir des marques avant
              d'investir dans un produit à plein tarif.
            </p>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <a href="/article/comment-choisir-box-beaute-2026" className="btn btn-primary">
                Comment choisir sa box →
              </a>
              <a href="/blog" className="btn btn-secondary">
                Voir tous nos guides
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section" aria-labelledby="faq-heading">
          <div className="container" style={{ maxWidth: "760px" }}>
            <h2 id="faq-heading" className="section-title" style={{ textAlign: "left" }}>
              Questions fréquentes sur les box beauté
            </h2>
            <dl className="faq-list">
              {faqJsonLd.mainEntity.map((item) => (
                <div key={item.name} className="faq-item">
                  <dt className="faq-question">{item.name}</dt>
                  <dd className="faq-answer">{item.acceptedAnswer.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <p className="footer-legal">
            © {year} Kado Box — Ce site contient des liens affiliés. Nous pouvons percevoir une commission
            si vous vous abonnez via nos liens, sans frais supplémentaires pour vous.
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
