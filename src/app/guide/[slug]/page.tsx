import { pageMetadata, breadcrumbSchema } from "@/lib/seo";
import { getRelatedGuides, getGuideCollections, sectionId } from "@/lib/guide-links";
import { GUIDES, getGuideBySlug } from "@/lib/guides";
import { getProductsForGuide } from "@/lib/guide-products";
import { ProductCard } from "@/app/components/ProductCard";
import Header from "@/app/components/Header";
import SiteFooter from "@/app/components/SiteFooter";
import { ChevronRight, Clock, Calendar } from "lucide-react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

interface Props { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const g = getGuideBySlug(slug);
  if (!g) return { title: "Guide introuvable" };
  return {
    ...pageMetadata(g.metaTitle, g.metaDescription, `/guide/${slug}`, g),
    authors: [{ name: "Nathalie Lebrun", url: "/a-propos" }],
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const products = getProductsForGuide(guide);

  const otherGuides = getRelatedGuides(guide);
  const collectionLinks = getGuideCollections(guide);
  const breadcrumbs = breadcrumbSchema([{ name: "Accueil", path: "/" }, { name: "Guides cadeaux", path: "/guide" }, { name: guide.title, path: `/guide/${slug}` }]);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.metaDescription,
    datePublished: guide.publishedAt,
    dateModified: guide.updatedAt ?? guide.publishedAt,
    inLanguage: "fr-FR",
    image: "https://kado-box.fr/og-image.webp",
    author: { "@type": "Person", name: "Nathalie Lebrun", url: "https://kado-box.fr/a-propos" },
    publisher: { "@type": "Organization", name: "Kado-Box", url: "https://kado-box.fr" },
    mainEntityOfPage: `https://kado-box.fr/guide/${guide.slug}`,
  };

  return (
    <>
      <Header />

      <article className="static-page kb-guide-article">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([articleJsonLd, breadcrumbs]).replace(/</g, "\\u003c") }} />
        <div className="kb-container" style={{ maxWidth: "820px" }}>
          <nav className="kb-breadcrumb" aria-label="Fil d’Ariane"><Link href="/">Accueil</Link><span aria-hidden="true">/</span><Link href="/guide">Guides cadeaux</Link><span aria-hidden="true">/</span><span aria-current="page">{guide.title}</span></nav>

          <h1 style={{ marginTop: "12px" }}>{guide.title}</h1>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", color: "var(--muted-text)", fontSize: "0.9rem", marginBottom: "24px" }}>
            <span><Calendar size={13} style={{ display: "inline", verticalAlign: "middle", marginRight: "4px" }} /> {guide.updatedAt ? "Mis à jour le" : "Publié le"} {new Date(guide.updatedAt ?? guide.publishedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            <span><Clock size={13} style={{ display: "inline", verticalAlign: "middle", marginRight: "4px" }} /> {guide.readingMinutes} min de lecture</span>
            <span>Par <Link href="/a-propos">Nathalie Lebrun</Link></span>
          </div>

          <p style={{ fontSize: "1.1rem", lineHeight: "1.7", marginBottom: "32px" }}>{guide.intro}</p>

          <p className="guide-method-note">Des pistes éditoriales pour choisir : <Link href="/a-propos">notre méthode de sélection</Link> et <Link href="/affiliation-amazon">le fonctionnement des liens affiliés</Link>.</p>
          <nav className="guide-toc" aria-label="Sommaire du guide">
            <h2>Dans ce guide</h2>
            <ol>{guide.sections.map((section, index) => <li key={section.heading}><a href={`#${sectionId(index)}`}>{section.heading}</a></li>)}</ol>
          </nav>
          <aside className="guide-collections" aria-label="Sélections de cadeaux associées">
            <h2>Explorer les sélections</h2>
            <div>{collectionLinks.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}</div>
          </aside>


          <p><Link href="/trouver-cadeau" className="gift-text-link">Affiner ma recherche par envie et budget →</Link></p>
          {guide.sections.map((s, i) => (
            <section key={i} id={sectionId(i)} className="guide-content-section" style={{ marginBottom: "32px" }}>
              <h2 style={{ marginTop: "32px" }}>{s.heading}</h2>
              {s.paragraphs.map((p, j) => (
                <p key={j} style={{ lineHeight: "1.7" }}>{p}</p>
              ))}
            </section>
          ))}

          {products.length > 0 && (
            <section style={{ marginTop: "48px" }}>
              <h2>Notre sélection de produits Amazon</h2>
              <p style={{ color: "var(--muted-text)" }}>Liens affiliés : une commission peut nous être versée, sans surcoût. Vérifiez le prix et la disponibilité sur Amazon.</p>
              <div className="product-grid kb-product-grid" style={{ marginTop: "24px" }}>
                {products.map((p) => (
                  <ProductCard
                    key={p.asin}
                    product={p}
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
                  <Link key={g.slug} href={`/guide/${g.slug}`} className="occasion-card">
                    <div>
                      <h3>{g.title}</h3>
                      <p>{g.metaDescription}</p>
                    </div>
                    <ChevronRight size={20} style={{ alignSelf: "center" }} />
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>

      <SiteFooter />
    </>
  );
}
