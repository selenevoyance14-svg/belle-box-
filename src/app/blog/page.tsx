import { getAllArticles } from "@/lib/articles";
import type { Metadata } from "next";
import { BookOpen, Tag, BarChart3, Droplets, Leaf, Coins, Clock, ChevronRight } from "lucide-react";
import Image from "next/image";
import Header from "@/app/components/Header";

export const metadata: Metadata = {
  title: "Blog & Guides box beauté 2026 | Kado",
  description: "Tous nos articles, tests, comparatifs et codes promo sur les box beauté : Blissim, Biotyfull, LookFantastic, Prescription Lab et plus.",
};

const categoryConfig: Record<string, { label: string; icon: React.ReactNode; pill: string; gradient: string }> = {
  test:         { label: "Test",       icon: <Droplets size={12} />, pill: "pill-soin",        gradient: "gradient-3" },
  comparatif:   { label: "Comparatif", icon: <BarChart3 size={12} />, pill: "pill-luxe",       gradient: "gradient-6" },
  "code-promo": { label: "Code Promo", icon: <Tag size={12} />,       pill: "pill-maquillage", gradient: "gradient-4" },
  guide:        { label: "Guide",      icon: <BookOpen size={12} />,  pill: "pill-bio",         gradient: "gradient-2" },
  bio:          { label: "Bio",        icon: <Leaf size={12} />,      pill: "pill-bio",         gradient: "gradient-2" },
  "petit-prix": { label: "Petit Prix", icon: <Coins size={12} />,     pill: "pill-petit-prix", gradient: "gradient-4" },
};

export default function BlogPage() {
  const articles = getAllArticles();

  const categories = ["tous", ...Array.from(new Set(articles.map((a) => a.meta.category)))];

  return (
    <>
      <Header activePage="/blog" />

      <main>
        {/* HERO */}
        <section className="section" style={{ paddingTop: "48px", paddingBottom: "32px", background: "var(--bg-alt, #faf9f7)" }}>
          <div className="container">
            <nav className="breadcrumbs" aria-label="Fil d'ariane" style={{ marginBottom: "16px" }}>
              <a href="/">Accueil</a>
              <ChevronRight size={12} style={{ margin: "0 4px", opacity: 0.5 }} />
              <span>Blog</span>
            </nav>
            <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: "2.2rem", marginBottom: "12px" }}>
              Guides & Articles box beauté
            </h1>
            <p style={{ color: "var(--text-muted, #6b6b6b)", maxWidth: "560px", lineHeight: 1.6 }}>
              Tests, comparatifs, codes promo et conseils pour choisir ta box beauté idéale.
            </p>
            <p style={{ marginTop: "8px", fontSize: "0.9rem", color: "var(--text-muted, #6b6b6b)" }}>
              {articles.length} article{articles.length > 1 ? "s" : ""}
            </p>
          </div>
        </section>

        {/* GRILLE ARTICLES */}
        <section className="section">
          <div className="container">
            {articles.length === 0 ? (
              <p style={{ textAlign: "center", color: "var(--text-muted, #6b6b6b)", padding: "64px 0" }}>
                Aucun article pour le moment.
              </p>
            ) : (
              <div
                className="articles-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                  gap: "24px",
                }}
              >
                {articles.map((article) => {
                  const cat = categoryConfig[article.meta.category];
                  return (
                    <a
                      key={article.meta.slug}
                      href={`/article/${article.meta.slug}`}
                      className="card"
                      style={{ textDecoration: "none", display: "flex", flexDirection: "column" }}
                    >
                      {/* IMAGE */}
                      <div
                        className={`card-image-placeholder ${cat?.gradient ?? "gradient-1"}`}
                        style={{ height: "180px", overflow: "hidden", borderRadius: "12px 12px 0 0", position: "relative" }}
                      >
                        <Image
                          src={article.meta.image}
                          alt={article.meta.imageAlt}
                          fill
                          style={{ objectFit: "cover" }}
                          sizes="(max-width: 768px) 100vw, 33vw"
                          loading="lazy"
                        />
                      </div>

                      {/* CONTENU */}
                      <div className="card-body" style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
                        {/* CATÉGORIE + DATE */}
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "6px" }}>
                          {cat && (
                            <span className={`pill ${cat.pill}`} style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "0.75rem" }}>
                              {cat.icon} {cat.label}
                            </span>
                          )}
                          <time
                            dateTime={article.meta.date}
                            style={{ fontSize: "0.78rem", color: "var(--text-muted, #6b6b6b)" }}
                          >
                            {new Date(article.meta.date).toLocaleDateString("fr-FR", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </time>
                        </div>

                        {/* TITRE */}
                        <h2
                          className="card-title"
                          style={{ fontSize: "1.05rem", lineHeight: 1.35, margin: 0 }}
                        >
                          {article.meta.title}
                        </h2>

                        {/* DESCRIPTION */}
                        <p
                          className="card-excerpt"
                          style={{ fontSize: "0.88rem", color: "var(--text-muted, #6b6b6b)", lineHeight: 1.5, margin: 0, flex: 1 }}
                        >
                          {article.meta.description}
                        </p>

                        {/* TEMPS DE LECTURE */}
                        <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.78rem", color: "var(--text-muted, #6b6b6b)", marginTop: "auto", paddingTop: "8px" }}>
                          <Clock size={12} />
                          {article.meta.readingTime}
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-bottom">
            <p>© 2026 Kado — Certains liens sont affiliés.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
