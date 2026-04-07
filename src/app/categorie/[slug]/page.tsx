import { getAllBoxes, getAffiliateUrl } from "@/lib/affiliate";
import { getAllArticles } from "@/lib/articles";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/app/components/Header";
import BoxGrid from "@/app/components/BoxGrid";
import { Leaf, Sparkles, Droplets, Heart, BarChart3, BookOpen, Globe, Clock, ChevronRight } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const categories = {
  bio: {
    label: "Box beauté Bio & Naturel",
    description: "Les meilleures box beauté bio, naturelles et cruelty-free. Des produits certifiés pour prendre soin de vous sans compromis.",
    seoTitle: "Meilleures Box Beauté Bio 2026 — Comparatif | Kado",
    seoDescription: "Comparatif des meilleures box beauté bio et naturelles en France 2026. Biotyfull, Belle au Naturel, Nuoo : notre sélection honnête.",
    icon: "Leaf",
    pill: "pill-bio",
    articlesOnly: false,
    faq: [
      { q: "Quelle est la meilleure box beauté bio en 2026 ?", a: "Biotyfull Box est notre coup de cœur : 100% bio, cruelty-free, avec des produits full-size. Belle au Naturel et Nuoo sont également d'excellentes alternatives." },
      { q: "Les box beauté bio sont-elles certifiées ?", a: "Les meilleures box bio portent des certifications officielles : COSMOS Organic, Ecocert, ou labels cruelty-free. Biotyfull Box est par exemple certifiée bio et cruelty-free." },
      { q: "Combien coûte une box beauté bio par mois ?", a: "Les box bio sont souvent entre 20€ et 40€/mois. Biotyfull Box est à 39,90€, ce qui reste raisonnable pour la valeur des produits reçus (environ 80€ de valeur)." },
    ],
  },
  premium: {
    label: "Box beauté Premium",
    description: "Box beauté haut de gamme avec des marques internationales et des produits full-size sélectionnés par des experts.",
    seoTitle: "Meilleures Box Beauté Premium 2026 — Comparatif | Kado",
    seoDescription: "Les box beauté premium et luxe en France 2026. Glowria, Lookfantastic, Prescription Lab : notre comparatif des offres haut de gamme.",
    icon: "Sparkles",
    pill: "pill-luxe",
    articlesOnly: false,
    faq: [
      { q: "Quelle est la meilleure box beauté premium en 2026 ?", a: "Prescription Lab et Lookfantastic Beauty Box se distinguent par la qualité de leurs marques (NARS, Charlotte Tilbury, Elemis) et leurs produits souvent full-size." },
      { q: "Les box premium proposent-elles des produits de luxe ?", a: "Oui, les box premium incluent des produits de marques reconnues internationalement. Lookfantastic collabore avec plus de 2 000 marques dont beaucoup sont haut de gamme." },
      { q: "Quelle est la différence entre une box standard et premium ?", a: "Une box premium propose des produits de marques reconnues, souvent en taille réelle (full-size), avec une valeur perçue plus élevée. Le prix est généralement entre 20€ et 30€/mois." },
    ],
  },
  mixte: {
    label: "Box Soin & Maquillage",
    description: "Box beauté polyvalentes qui combinent soin du visage et maquillage chaque mois. La formule idéale pour toutes les routines.",
    seoTitle: "Meilleures Box Soin & Maquillage 2026 — Comparatif | Kado",
    seoDescription: "Box beauté mixtes alliant soin et maquillage en 2026. Blissim et les autres : notre comparatif des meilleures box polyvalentes.",
    icon: "Droplets",
    pill: "pill-soin",
    articlesOnly: false,
    faq: [
      { q: "Quelle est la meilleure box soin et maquillage en 2026 ?", a: "Blissim (ex-Birchbox) est la référence des box mixtes : à partir de 17,90€/mois, elle combine produits de soin et maquillage de marques variées." },
      { q: "Peut-on personnaliser sa box soin et maquillage ?", a: "Blissim propose un profil beauté pour adapter les produits à votre type de peau et vos préférences. Certaines box permettent aussi de choisir des produits spécifiques." },
      { q: "Combien de produits reçoit-on dans une box mixte ?", a: "En général entre 5 et 7 produits par mois, un mix entre soins visage, corps et produits de maquillage comme du mascara, du fond de teint ou du rouge à lèvres." },
    ],
  },
  lifestyle: {
    label: "Box Beauté Lifestyle",
    description: "Box qui mélangent beauté et accessoires lifestyle : mode, déco, papeterie. Pour une surprise complète chaque mois.",
    seoTitle: "Meilleures Box Beauté Lifestyle 2026 — Comparatif | Kado",
    seoDescription: "Box beauté lifestyle 2026 : beauté + accessoires de vie. My Little Box et les autres alternatives lifestyle.",
    icon: "Heart",
    pill: "pill-maquillage",
    articlesOnly: false,
    faq: [
      { q: "Quelle est la meilleure box beauté lifestyle en 2026 ?", a: "My Little Box est la référence du genre : elle mêle beauté, mode et objets de vie quotidienne autour d'un thème mensuel poétique et original." },
      { q: "Qu'est-ce qu'une box lifestyle par rapport à une box beauté classique ?", a: "Une box lifestyle ne contient pas que des produits beauté : on y trouve aussi des accessoires de mode, des objets déco, de la papeterie ou des snacks selon la marque." },
      { q: "Les box lifestyle sont-elles plus chères ?", a: "Pas nécessairement. My Little Box est à 17,90€/mois, un prix similaire aux box beauté classiques, mais avec une variété de produits plus large." },
    ],
  },
  comparatif: {
    label: "Comparatifs box beauté",
    description: "Tous nos comparatifs honnêtes : box vs box, marques vs marques. Pour choisir en connaissance de cause.",
    seoTitle: "Comparatifs Box Beauté 2026 — Toutes nos analyses | Kado",
    seoDescription: "Comparatifs détaillés de box beauté et marques cosmétiques en France. Biotyfull vs Blissim, Lookfantastic vs Prescription Lab et bien d'autres.",
    icon: "BarChart3",
    pill: "pill-luxe",
    articlesOnly: true,
    faq: [
      { q: "Quelle est la différence entre Biotyfull Box et Blissim ?", a: "Biotyfull Box est 100% bio à 39,90€/mois avec des produits full-size. Blissim est plus abordable (17,90€) avec un mix soin/maquillage de marques variées. L'une cible le naturel, l'autre la découverte." },
      { q: "Comment comparer deux box beauté efficacement ?", a: "Comparez le prix mensuel, le nombre et la taille des produits (full-size ou mini), les marques proposées, et si la box correspond à votre routine (bio, maquillage, soin, lifestyle)." },
      { q: "Peut-on s'abonner à plusieurs box beauté en même temps ?", a: "Oui, certaines abonnées cumulent une box bio et une box maquillage pour varier les plaisirs. Pensez à votre budget et à l'espace de stockage produits." },
    ],
  },
  guide: {
    label: "Guides box beauté",
    description: "Nos guides complets pour bien choisir sa box beauté, comprendre les abonnements et profiter des meilleures offres.",
    seoTitle: "Guides Box Beauté 2026 — Conseils & Astuces | Kado",
    seoDescription: "Tous nos guides pour choisir, offrir et profiter d'une box beauté en France. Conseils experts, astuces et comparatifs détaillés.",
    icon: "BookOpen",
    pill: "pill-bio",
    articlesOnly: true,
    faq: [
      { q: "Comment choisir sa première box beauté ?", a: "Commencez par définir votre budget (17-40€/mois), vos préférences (bio, maquillage, soin) et si vous voulez être surprise ou personnaliser. Notre quiz peut vous aider à trouver la box idéale." },
      { q: "Peut-on offrir une box beauté en cadeau ?", a: "Oui, la plupart des box proposent des formules cadeau (1 mois, 3 mois, 6 mois) avec un bel emballage. My Little Box et Biotyfull Box sont particulièrement appréciées en cadeau." },
      { q: "Comment résilier une box beauté facilement ?", a: "La résiliation se fait généralement en quelques clics depuis votre espace client, avant la date de renouvellement. Aucune pénalité n'est habituellement appliquée pour les abonnements sans engagement." },
    ],
  },
  general: {
    label: "Articles beauté",
    description: "Actualités, tendances et conseils beauté pour profiter au mieux de vos box et découvrir de nouvelles marques.",
    seoTitle: "Articles Beauté & Box — Actus et Conseils | Kado",
    seoDescription: "Articles, actus et conseils beauté autour des box beauté françaises. Tendances, nouveautés et bons plans.",
    icon: "Globe",
    pill: "pill-soin",
    articlesOnly: true,
    faq: [
      { q: "Quelles sont les tendances beauté en 2026 ?", a: "En 2026, les grandes tendances sont le clean beauty, la K-beauty, les soins anti-âge accessibles et les routines minimalistes. Les box beauté permettent de découvrir ces tendances à moindre coût." },
      { q: "Comment rester informée des nouveautés box beauté ?", a: "Consultez notre blog régulièrement — nous publions chaque mois des avis sur les nouvelles éditions, des codes promo et des guides sur les tendances beauté." },
      { q: "Les box beauté sont-elles adaptées aux peaux sensibles ?", a: "Oui, certaines box proposent des produits spécifiquement formulés pour les peaux sensibles et réactives. Biotyfull Box (certifiée bio) et Belle au Naturel sont particulièrement recommandées." },
    ],
  },
};

type CategorySlug = keyof typeof categories;

const iconMap: Record<string, React.ReactNode> = {
  Leaf: <Leaf size={28} />,
  Sparkles: <Sparkles size={28} />,
  Droplets: <Droplets size={28} />,
  Heart: <Heart size={28} />,
  BarChart3: <BarChart3 size={28} />,
  BookOpen: <BookOpen size={28} />,
  Globe: <Globe size={28} />,
};


export function generateStaticParams() {
  return Object.keys(categories).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cat = categories[slug as CategorySlug];
  if (!cat) return {};
  return {
    title: cat.seoTitle,
    description: cat.seoDescription,
    alternates: { canonical: `https://kado-box.fr/categorie/${slug}` },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;

  const cat = categories[slug as CategorySlug];
  if (!cat) notFound();

  const catBoxes = cat.articlesOnly ? [] : getAllBoxes().filter((b) => b.category === slug);
  const catArticles = cat.articlesOnly ? getAllArticles().filter((a) => a.meta.category === slug) : [];

  const affiliateUrls = Object.fromEntries(
    catBoxes.map((b) => [b.slug, getAffiliateUrl(b.slug)])
  );

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: cat.faq.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Header activePage="/" />

      <main>
        {/* HERO */}
        <section className="section" style={{ paddingTop: "48px", paddingBottom: "32px" }}>
          <div className="container">
            <nav className="breadcrumbs" aria-label="Fil d'ariane" style={{ marginBottom: "16px" }}>
              <a href="/">Accueil</a>
              <ChevronRight size={12} style={{ margin: "0 4px", opacity: 0.5 }} />
              <span aria-current="page">{cat.label}</span>
            </nav>
            <div className="section-title">
              <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", justifyContent: "center", marginBottom: "16px" }}>
                <span className={`pill ${cat.pill}`} style={{ fontSize: "0.85rem", padding: "6px 14px" }}>
                  {iconMap[cat.icon]} {cat.label}
                </span>
              </div>
              <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(1.6rem, 4vw, 2.4rem)", marginBottom: "16px", lineHeight: 1.2 }}>
                {cat.label}
              </h1>
              <p style={{ maxWidth: "620px", margin: "0 auto 12px", color: "var(--text-muted)", fontSize: "1.05rem" }}>
                {cat.description}
              </p>
              <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
                {cat.articlesOnly
                  ? `${catArticles.length} article${catArticles.length > 1 ? "s" : ""}`
                  : `${catBoxes.length} box${catBoxes.length > 1 ? "es" : ""} dans cette catégorie`}
              </p>
            </div>
          </div>
        </section>

        {/* BOX GRID — catégories box */}
        {!cat.articlesOnly && (
          <section className="section" style={{ paddingTop: "0", paddingBottom: "64px" }}>
            <div className="container">
              <BoxGrid boxes={catBoxes} affiliateUrls={affiliateUrls} />
            </div>
          </section>
        )}

        {/* ARTICLE GRID — catégories contenu */}
        {cat.articlesOnly && (
          <section className="section" style={{ paddingTop: "0", paddingBottom: "64px" }}>
            <div className="container">
              {catArticles.length === 0 ? (
                <p style={{ textAlign: "center", color: "var(--text-muted)", padding: "48px 0" }}>
                  Aucun article dans cette catégorie pour le moment.
                </p>
              ) : (
                <div className="articles-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "24px" }}>
                  {catArticles.map((article) => (
                    <a
                      key={article.meta.slug}
                      href={`/article/${article.meta.slug}`}
                      className="card"
                      style={{ textDecoration: "none", display: "flex", flexDirection: "column" }}
                    >
                      <div className="card-body" style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px", padding: "20px" }}>
                        <h2 className="card-title" style={{ fontSize: "1.05rem", lineHeight: 1.35, margin: 0 }}>
                          {article.meta.title}
                        </h2>
                        <p className="card-excerpt" style={{ fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.5, margin: 0, flex: 1 }}>
                          {article.meta.description}
                        </p>
                        <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "auto", paddingTop: "8px" }}>
                          <Clock size={12} />
                          {article.meta.readingTime}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* BACK LINK */}
        <section style={{ textAlign: "center", paddingBottom: "56px" }}>
          <a href="/blog" className="btn btn-secondary">
            ← Voir tous les articles
          </a>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Kado — Certains liens sont affiliés.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
