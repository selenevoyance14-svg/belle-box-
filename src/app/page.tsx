import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Gift, Heart, Search, Sparkles } from "lucide-react";
import Header from "@/app/components/Header";
import SiteFooter from "@/app/components/SiteFooter";
import { ProductCard } from "@/app/components/ProductCard";
import { BUDGETS, getCatalog, isGiftCandidate, OCCASIONS, RECIPIENTS } from "@/lib/catalog";
import { GUIDES } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Idées cadeaux 2026 par occasion et budget | Kado-Box",
  description:
    "Trouvez une idée cadeau vraiment adaptée : sélections Amazon triées par occasion, destinataire et budget, avec conseils pour choisir sans se tromper.",
  alternates: { canonical: "https://kado-box.fr" },
};

const FEATURED_OCCASIONS = ["naissance", "anniversaire", "noel", "fete-des-meres"];
const FEATURED_GUIDES = [
  "cadeau-ado-garcon",
  "cadeau-grand-pere",
  "cadeau-noel-petit-budget",
];

export default function Home() {
  const gifts = getCatalog().filter(isGiftCandidate);
  const featuredProducts = [...gifts]
    .sort((a, b) => (b.reviews_count ?? 0) - (a.reviews_count ?? 0))
    .slice(0, 4);
  const guides = FEATURED_GUIDES
    .map((slug) => GUIDES.find((guide) => guide.slug === slug))
    .filter((guide): guide is (typeof GUIDES)[number] => Boolean(guide));
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://kado-box.fr/#website",
        url: "https://kado-box.fr",
        name: "Kado-Box",
        description: "Guide indépendant d’idées cadeaux par occasion, destinataire et budget.",
        inLanguage: "fr-FR",
      },
      {
        "@type": "Organization",
        "@id": "https://kado-box.fr/#organization",
        name: "Kado-Box",
        url: "https://kado-box.fr",
        logo: "https://kado-box.fr/kado-logo.png",
      },
    ],
  };

  return (
    <>
      <Header />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        <section className="kb-hero">
          <div className="kb-container kb-hero-grid">
            <div className="kb-hero-copy">
              <p className="kb-eyebrow"><Sparkles size={14} /> Le guide cadeau qui va à l’essentiel</p>
              <h1>Le bon cadeau.<br /><em>Sans chercher des heures.</em></h1>
              <p className="kb-hero-lead">
                Dites-nous l’occasion, la personne ou votre budget. Nous gardons
                uniquement les idées qui ont vraiment du sens à offrir.
              </p>
              <div className="kb-hero-actions">
                <Link href="/occasion/anniversaire" className="kb-button kb-button-primary">
                  Trouver une idée <ArrowRight size={17} />
                </Link>
                <Link href="/budget/moins-de-20-euros" className="kb-button kb-button-secondary">
                  Cadeaux à moins de 20 €
                </Link>
              </div>
              <div className="kb-hero-trust">
                <span><Check size={14} /> Sélection resserrée</span>
                <span><Check size={14} /> Liens directs vers Amazon</span>
                <span><Check size={14} /> Guides gratuits</span>
              </div>
            </div>
            <div className="kb-hero-visual">
              <div className="kb-hero-image">
                <Image
                  src="/images/kado-hero-gifts.png"
                  alt="Une sélection élégante de cadeaux pour toutes les occasions"
                  fill
                  priority
                  sizes="(max-width: 900px) 100vw, 48vw"
                />
              </div>
              <div className="kb-hero-note">
                <Gift size={18} />
                <span><strong>{gifts.length} idées triées</strong>Pas de catalogue interminable</span>
              </div>
            </div>
          </div>
        </section>

        <section className="finder-section">
          <div className="kb-container">
            <div className="kb-section-head">
              <div><p className="kb-eyebrow"><Search size={14} /> Commencer ici</p><h2>Quelle est l’occasion ?</h2></div>
              <p>Une entrée simple pour arriver directement aux cadeaux les plus pertinents.</p>
            </div>
            <div className="occasion-editorial-grid">
              {OCCASIONS.filter((item) => FEATURED_OCCASIONS.includes(item.slug)).map((item, index) => (
                <Link key={item.slug} href={`/occasion/${item.slug}`} className="occasion-editorial-card">
                  <span className="occasion-index">0{index + 1}</span>
                  <span className="occasion-big-emoji">{item.emoji}</span>
                  <div><h3>{item.name}</h3><p>{item.description}</p></div>
                  <ArrowRight size={19} />
                </Link>
              ))}
            </div>
            <div className="occasion-more">
              {OCCASIONS.filter((item) => !FEATURED_OCCASIONS.includes(item.slug)).map((item) => (
                <Link key={item.slug} href={`/occasion/${item.slug}`}>{item.emoji} {item.name}</Link>
              ))}
            </div>
          </div>
        </section>

        <section className="recipient-band">
          <div className="kb-container">
            <p className="kb-eyebrow kb-eyebrow-light"><Heart size={14} /> Pour qui cherchez-vous ?</p>
            <div className="recipient-pill-grid">
              {RECIPIENTS.map((item) => (
                <Link key={item.slug} href={`/destinataire/${item.slug}`}>
                  <span>{item.emoji}</span>{item.name}<ArrowRight size={15} />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="kb-section">
          <div className="kb-container">
            <div className="kb-section-head">
              <div><p className="kb-eyebrow">Valeurs sûres</p><h2>Les cadeaux les plus appréciés</h2></div>
              <p>Sélection éditoriale de cadeaux classés par occasion, destinataire et budget.</p>
            </div>
            <div className="product-grid kb-product-grid kb-product-grid-four">
              {featuredProducts.map((product, index) => (
                <ProductCard key={product.asin} product={product} badge={index === 0 ? "Le plus apprécié" : undefined} />
              ))}
            </div>
          </div>
        </section>

        <section className="budget-section">
          <div className="kb-container">
            <div className="kb-section-head">
              <div><p className="kb-eyebrow">Respecter son budget</p><h2>Faire plaisir au bon prix</h2></div>
            </div>
            <div className="budget-editorial-grid">
              {BUDGETS.map((item) => (
                <Link key={item.slug} href={`/budget/${item.slug}`}>
                  <span>{item.emoji}</span><h3>{item.name}</h3><p>{item.description}</p><b>Voir les idées →</b>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="guide-showcase">
          <div className="kb-container guide-showcase-grid">
            <div>
              <p className="kb-eyebrow kb-eyebrow-light">Le conseil avant le clic</p>
              <h2>Offrir juste,<br />ça s’apprend.</h2>
              <p>Nos guides répondent aux vraies questions : quoi offrir, quel budget prévoir et quelles erreurs éviter.</p>
              <Link href="/guide" className="kb-button kb-button-light">Tous les guides <ArrowRight size={17} /></Link>
            </div>
            <div className="guide-list">
              {guides.map((guide, index) => (
                <Link key={guide.slug} href={`/guide/${guide.slug}`}>
                  <span>0{index + 1}</span>
                  <div><h3>{guide.title}</h3><p>{guide.readingMinutes} min de lecture</p></div>
                  <ArrowRight size={18} />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
