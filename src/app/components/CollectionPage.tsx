import Link from "next/link";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import Header from "@/app/components/Header";
import SiteFooter from "@/app/components/SiteFooter";
import { EditorialBody } from "@/app/components/EditorialContent";
import { ProductCard } from "@/app/components/ProductCard";
import type { CatalogProduct } from "@/lib/catalog";
import type { Editorial } from "@/lib/editorial";

type RelatedLink = { href: string; label: string };

export default function CollectionPage({
  eyebrow,
  title,
  description,
  emoji,
  products,
  editorial,
  related,
}: {
  eyebrow: string;
  title: string;
  description: string;
  emoji: string;
  products: CatalogProduct[];
  editorial?: Editorial;
  related: RelatedLink[];
}) {
  const faq = editorial?.faq ?? [];
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: title,
        description,
        isPartOf: { "@type": "WebSite", name: "Kado-Box", url: "https://kado-box.fr" },
      },
      ...(faq.length ? [{
        "@type": "FAQPage",
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      }] : []),
      {
        "@type": "ItemList",
        name: `Sélection ${title}`,
        numberOfItems: products.length,
        itemListElement: products.map((product, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: product.title,
          url: product.affiliate_url,
        })),
      },
    ],
  };

  return (
    <>
      <Header />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <section className="collection-hero">
          <div className="kb-container">
            <nav className="kb-breadcrumb" aria-label="Fil d’Ariane">
              <Link href="/">Accueil</Link><span>/</span><span>{title}</span>
            </nav>
            <div className="collection-hero-grid">
              <div>
                <p className="kb-eyebrow">{eyebrow}</p>
                <h1>{title}</h1>
                <p className="collection-lead">{description}</p>
                <div className="collection-trust">
                  <span><Check size={14} /> Produits triés</span>
                  <span><Check size={14} /> Plusieurs budgets</span>
                  <span><Check size={14} /> Achat sur Amazon</span>
                </div>
              </div>
              <div className="collection-symbol" aria-hidden>{emoji}</div>
            </div>
          </div>
        </section>

        {editorial ? (
          <section className="collection-answer">
            <div className="kb-container collection-answer-grid">
              <p className="kb-eyebrow">La réponse rapide</p>
              <p>{editorial.intro}</p>
            </div>
          </section>
        ) : null}

        <section className="kb-section">
          <div className="kb-container">
            <div className="kb-section-head">
              <div>
                <p className="kb-eyebrow"><Sparkles size={14} /> Notre sélection</p>
                <h2>{products.length} idées qui méritent d’être offertes</h2>
              </div>
              <p>Prix et disponibilité à vérifier directement chez Amazon avant l’achat.</p>
            </div>
            <p className="collection-disclosure">
              Sélection indépendante mise à jour régulièrement. Certains liens sont affiliés :
              Kado-Box peut recevoir une commission, sans surcoût pour vous. Nous privilégions
              l’utilité, la qualité perçue, les avis disponibles et la cohérence avec l’occasion.
            </p>
            <div className="product-grid kb-product-grid">
              {products.map((product, index) => (
                <ProductCard
                  key={product.asin}
                  product={product}
                  badge={index === 0 ? "Notre choix" : index === 1 ? "Très apprécié" : undefined}
                />
              ))}
            </div>
          </div>
        </section>

        {editorial ? (
          <section className="kb-editorial-section">
            <div className="kb-container kb-editorial-wrap">
              <p className="kb-eyebrow">Bien choisir</p>
              <EditorialBody editorial={editorial} />
            </div>
          </section>
        ) : null}

        <section className="related-links">
          <div className="kb-container">
            <p className="kb-eyebrow">Poursuivre la recherche</p>
            <h2>D’autres pistes pour trouver juste</h2>
            <div className="related-link-grid">
              {related.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}<ArrowRight size={18} />
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
