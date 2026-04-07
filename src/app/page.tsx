import { getAllBoxes, getAffiliateUrl, getActivePromoCodes } from "@/lib/affiliate";
import {
  Star, X, Check, Tag, Percent, Gift,
} from "lucide-react";
import Header from "@/app/components/Header";
import BoxGrid from "@/app/components/BoxGrid";

export default async function Home() {
  const boxes = getAllBoxes();
  const promoCodes = getActivePromoCodes();

  const sortedBoxes = [...boxes].sort((a, b) => (b.rating || 0) - (a.rating || 0));

  const now = new Date();
  const monthFormatter = new Intl.DateTimeFormat("fr-FR", { month: "long" });
  const currentMonthRaw = monthFormatter.format(now);
  const monthDisplay = currentMonthRaw.charAt(0).toUpperCase() + currentMonthRaw.slice(1);
  const currentYear = now.getFullYear();

  const categoryConfig: Record<string, { label: string }> = {
    bio: { label: "Bio & Naturel" },
    premium: { label: "Premium" },
    mixte: { label: "Mixte" },
    lifestyle: { label: "Lifestyle" },
    enfant: { label: "Enfant" },
    aromatherapie: { label: "Aromathérapie" },
    "bien-être": { label: "Bien-être" },
  };

  // Schema.org — ItemList pour Google rich snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Meilleures Box Beauté ${currentYear} — Comparatif complet`,
    description: `Comparatif des ${sortedBoxes.length} meilleures box beauté françaises : prix, produits, notes et avis.`,
    url: "https://kado-box.fr",
    numberOfItems: sortedBoxes.length,
    itemListElement: sortedBoxes.map((box, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: box.name,
        url: box.website,
        description: box.description,
        offers: {
          "@type": "Offer",
          price: box.price.toFixed(2),
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
        },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />

      {/* ═══════════════════════════════════════
          HERO
      ═══════════════════════════════════════ */}
      <section className="hero hero-centered">
        <div className="container">
          <div className="hero-inner">
            <div className="hero-badge">
              🎁 {monthDisplay} {currentYear} — {boxes.length} box beauté comparées
            </div>
            <h1>
              Trouvez la box beauté{" "}
              <span className="squiggle">faite pour vous</span>
            </h1>
            <p className="hero-subtitle">
              Biotyfull, Blissim, LookFantastic, Prescription Lab, Glowria…
              On a tout comparé : prix, produits, qualité, bio ou pas.
              Plus besoin de tâtonner.
            </p>
            <div className="hero-cta hero-cta-centered">
              <a href="#comparatif" className="btn btn-primary">
                Voir le comparatif →
              </a>
              <a href="/quiz" className="btn btn-secondary">
                Quiz — quelle box pour moi ?
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          STATS
      ═══════════════════════════════════════ */}
      <section className="container">
        <div className="stats-bar">
          <div className="stat-item">
            <span className="stat-number">{boxes.length}</span>
            <span className="stat-label">Box comparées</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">4.4/5</span>
            <span className="stat-label">Note moyenne</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">17,90€</span>
            <span className="stat-label">Prix le plus bas</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">100%</span>
            <span className="stat-label">Avis honnêtes</span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          BOX CARDS — grille comparatif
      ═══════════════════════════════════════ */}
      <section className="section" id="comparatif">
        <div className="container">
          <div className="section-title">
            <h2>
              <Gift size={26} style={{ display: "inline", verticalAlign: "middle", marginRight: "8px" }} />
              Les {boxes.length} box beauté — {monthDisplay} {currentYear}
            </h2>
            <p>
              Classées par note. Chaque box est évaluée sur ses produits, son
              rapport qualité/prix et sa régularité mois après mois.
            </p>
          </div>

          <BoxGrid
            boxes={sortedBoxes}
            affiliateUrls={Object.fromEntries(
              sortedBoxes.map((b) => [b.slug, getAffiliateUrl(b.slug)])
            )}
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════
          TABLEAU COMPARATIF
      ═══════════════════════════════════════ */}
      <section className="section" id="tableau" style={{ background: "var(--muted)" }}>
        <div className="container">
          <div className="section-title">
            <h2>Tableau comparatif complet</h2>
            <p>Toutes les box côte à côte — prix, produits, certifications et notre note.</p>
          </div>

          <div className="table-scroll-wrapper">
            <table className="cmp-table">
              <thead>
                <tr>
                  <th className="cmp-th-name">Box</th>
                  <th>Prix/mois</th>
                  <th>Produits</th>
                  <th>Note</th>
                  <th>Catégorie</th>
                  <th title="Certifié bio">Bio</th>
                  <th title="Cruelty-free">CF</th>
                  <th title="Vegan">Vegan</th>
                  <th>Lien</th>
                </tr>
              </thead>
              <tbody>
                {sortedBoxes.map((box, i) => {
                  const isBio = box.certifications?.includes("bio");
                  const isCF = box.certifications?.includes("cruelty-free");
                  const isVegan = box.certifications?.includes("vegan");
                  const affiliateUrl = getAffiliateUrl(box.slug);
                  const hasCta = affiliateUrl && affiliateUrl !== "#";
                  const ctaUrl = hasCta ? affiliateUrl : box.website;
                  const cat = categoryConfig[box.category] || { label: box.category };

                  return (
                    <tr key={box.slug} className={i === 0 ? "cmp-row-top" : ""}>
                      <td className="cmp-td-name">
                        {i === 0 && <span className="cmp-star">⭐</span>}
                        {box.name}
                      </td>
                      <td>
                        <span className="cmp-price">
                          {box.price.toFixed(2).replace(".", ",")}€
                        </span>
                        {box.billing !== "mois" && (
                          <small style={{ color: "var(--muted-foreground)", marginLeft: "2px" }}>
                            /{box.billing}
                          </small>
                        )}
                      </td>
                      <td style={{ textAlign: "center" }}>{box.nb_products}</td>
                      <td>
                        <span className="cmp-rating">
                          <Star size={12} fill="var(--accent)" color="var(--accent)" />
                          <strong>{box.rating?.toFixed(1)}</strong>
                        </span>
                      </td>
                      <td>
                        <span className="pill pill-soin" style={{ fontSize: "0.68rem", padding: "2px 8px" }}>
                          {cat.label}
                        </span>
                      </td>
                      <td className="cmp-icon-cell">
                        {isBio ? <Check size={15} color="var(--success)" /> : <X size={15} color="var(--muted-foreground)" />}
                      </td>
                      <td className="cmp-icon-cell">
                        {isCF ? <Check size={15} color="var(--success)" /> : <X size={15} color="var(--muted-foreground)" />}
                      </td>
                      <td className="cmp-icon-cell">
                        {isVegan ? <Check size={15} color="var(--success)" /> : <X size={15} color="var(--muted-foreground)" />}
                      </td>
                      <td>
                        <a
                          href={ctaUrl}
                          target="_blank"
                          rel={hasCta ? "nofollow noopener sponsored" : "noopener noreferrer"}
                          className="btn btn-primary btn-sm"
                          style={{ padding: "6px 14px", fontSize: "0.78rem" }}
                        >
                          Voir →
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="table-disclaimer">
            * Certains liens sont des liens affiliés — ça ne change pas notre avis, ça nous aide à rester indépendantes.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CODES PROMO
      ═══════════════════════════════════════ */}

      {/* ═══════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════ */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <a href="/" className="logo">
                <img src="/kado-logo.svg" alt="Kado" className="logo-img logo-img-footer" />
              </a>
              <p>
                Comparatifs honnêtes de box beauté : Biotyfull, Blissim, LookFantastic,
                Prescription Lab, Glowria, My Little Box, Belle au Naturel, Nuoo,
                Mademoiselle Confettis et L&apos;Aroma Box.
              </p>
            </div>

            <div>
              <h4>Box beauté</h4>
              <ul className="footer-links">
                {sortedBoxes.slice(0, 5).map((box) => (
                  <li key={box.slug}>
                    <a href={getAffiliateUrl(box.slug) !== "#" ? getAffiliateUrl(box.slug) : box.website} target="_blank" rel="noopener noreferrer">
                      {box.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4>Suite</h4>
              <ul className="footer-links">
                {sortedBoxes.slice(5).map((box) => (
                  <li key={box.slug}>
                    <a href={getAffiliateUrl(box.slug) !== "#" ? getAffiliateUrl(box.slug) : box.website} target="_blank" rel="noopener noreferrer">
                      {box.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4>Infos</h4>
              <ul className="footer-links">
                <li><a href="#comparatif">Comparatif</a></li>
                <li><a href="#tableau">Tableau</a></li>
                <li><a href="/blog">Blog</a></li>
                <li><a href="/quiz">Quiz</a></li>
                <li><a href="/a-propos">À propos</a></li>
                <li><a href="/contact">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>
              © {currentYear} Kado — Fait avec ❤️ pour vous aider à choisir.
              Certains liens sont affiliés.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
