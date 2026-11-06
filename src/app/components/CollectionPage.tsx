import { getCollectionGuides } from "@/lib/guide-links";
import { breadcrumbSchema } from "@/lib/seo";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Header from "./Header";
import SiteFooter from "./SiteFooter";
import { EditorialBody } from "./EditorialContent";
import FilterableProductGrid from "./FilterableProductGrid";
import type { CatalogProduct } from "@/lib/catalog";
import type { Editorial } from "@/lib/editorial";

type RelatedLink = { href: string; label: string };
export default function CollectionPage({ title, description, products, editorial, related, recipient, occasion, budget, path }: {
  eyebrow: string; title: string; description: string; emoji: string; image?: string;
  products: CatalogProduct[]; editorial?: Editorial; related: RelatedLink[];
  recipient?: string; occasion?: string; budget?: string; path: string;
}) {
  const guides = getCollectionGuides({ occasion, recipient, budget });
  const breadcrumbs = breadcrumbSchema([{ name: "Accueil", path: "/" }, { name: title, path }]);
  const jsonLd = {
    "@context": "https://schema.org", "@graph": [
      { "@type": "CollectionPage", name: title, description, url: `https://kado-box.fr${path}`, inLanguage: "fr-FR" },
      { "@type": "ItemList", name: title, numberOfItems: products.length,
        itemListElement: products.map((p, index) => ({ "@type": "ListItem", position: index + 1, name: p.title, url: p.affiliate_url })) },
    ],
  };
  return <>
    <Header />
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([jsonLd, breadcrumbs]).replace(/</g, "\\u003c") }} />
      <section className="collection-hero collection-hero-compact"><div className="kb-container">
        <nav className="kb-breadcrumb" aria-label="Fil d’Ariane"><Link href="/">Accueil</Link><span>/</span><span>{title}</span></nav>
        <h1>{title}</h1>
        <p className="collection-lead">{description}</p>
      </div></section>
      <section className="kb-section collection-products"><div className="kb-container">
        <FilterableProductGrid products={products} fixedRecipient={recipient} fixedOccasion={occasion} />
      </div></section>
      {editorial ? <section className="kb-editorial-section"><div className="kb-container kb-editorial-wrap"><details className="gift-advice"><summary>Nos conseils pour bien choisir</summary><EditorialBody editorial={editorial} /></details></div></section> : null}
      {guides.length > 0 && <section className="related-links"><div className="kb-container"><h2>Des guides pour vous aider à choisir</h2><div className="related-link-grid">{guides.map((guide) => <Link key={guide.slug} href={`/guide/${guide.slug}`}>{guide.title}<ArrowRight size={18} /></Link>)}</div></div></section>}
      <section className="related-links"><div className="kb-container"><h2>D’autres idées à explorer</h2><div className="related-link-grid">
        {related.map((item) => <Link key={item.href} href={item.href}>{item.label}<ArrowRight size={18} /></Link>)}
      </div></div></section>
    </main><SiteFooter />
  </>;
}
