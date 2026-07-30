import { GUIDES, getGuideBySlug } from "@/lib/guides";
import { getProductsByOccasion, getProductsByRecipient, type CatalogProduct } from "@/lib/catalog";
import { ProductCard } from "@/app/components/ProductCard";
import Header from "@/app/components/Header";
import SiteFooter from "@/app/components/SiteFooter";
import { ChevronRight, ArrowLeft, Clock, Calendar } from "lucide-react";
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
    title: g.metaTitle,
    description: g.metaDescription,
    alternates: { canonical: `/guide/${slug}` },
  };
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
      <Header />

      <article className="static-page kb-guide-article">
        <div className="kb-container" style={{ maxWidth: "820px" }}>
          <Link href="/guide" className="breadcrumb-back">
            <ArrowLeft size={14} /> Tous les guides
          </Link>

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
              <p style={{ color: "var(--muted-text)" }}>Une sélection resserrée. Le prix et la disponibilité sont à vérifier sur Amazon.</p>
              <div className="product-grid kb-product-grid" style={{ marginTop: "24px" }}>
                {products.map((p, i) => (
                  <ProductCard
                    key={p.asin}
                    product={p}
                    badge={i === 0 ? "À découvrir" : i === 1 ? "Autre idée" : undefined}
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

      <SiteFooter />
    </>
  );
}
