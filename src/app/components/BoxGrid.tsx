"use client";
import { useState } from "react";
import {
  Star, Leaf, Sparkles, Heart, ExternalLink,
  Check, Package, Droplets, Flame, Gift,
} from "lucide-react";
import type { BoxData } from "@/lib/affiliate";

const categoryConfig: Record<string, { label: string; pill: string; icon: React.ReactNode }> = {
  bio: { label: "Bio & Naturel", pill: "pill-bio", icon: <Leaf size={11} /> },
  premium: { label: "Premium", pill: "pill-luxe", icon: <Sparkles size={11} /> },
  mixte: { label: "Mixte", pill: "pill-soin", icon: <Droplets size={11} /> },
  lifestyle: { label: "Lifestyle", pill: "pill-maquillage", icon: <Heart size={11} /> },
  enfant: { label: "Enfant", pill: "pill-petit-prix", icon: <Gift size={11} /> },
  aromatherapie: { label: "Aromathérapie", pill: "pill-bio", icon: <Droplets size={11} /> },
  "bien-être": { label: "Bien-être", pill: "pill-bio", icon: <Leaf size={11} /> },
};

const filters = [
  { key: "tous", label: "Toutes", pill: "pill-all", icon: <Flame size={12} /> },
  { key: "bio", label: "Bio & Naturel", pill: "pill-bio", icon: <Leaf size={12} /> },
  { key: "premium", label: "Premium", pill: "pill-luxe", icon: <Sparkles size={12} /> },
  { key: "mixte", label: "Mixte", pill: "pill-soin", icon: <Droplets size={12} /> },
  { key: "lifestyle", label: "Lifestyle", pill: "pill-maquillage", icon: <Heart size={12} /> },
];

interface BoxGridProps {
  boxes: BoxData[];
  affiliateUrls: Record<string, string>;
}

export default function BoxGrid({ boxes, affiliateUrls }: BoxGridProps) {
  const getAffiliateUrl = (slug: string) => affiliateUrls[slug] ?? "#";
  const [activeFilter, setActiveFilter] = useState("tous");

  const filtered = activeFilter === "tous"
    ? boxes
    : boxes.filter((b) => b.category === activeFilter);

  return (
    <>
      <div className="pills-row">
        {filters.map((f) => (
          <button
            key={f.key}
            className={`pill ${f.pill}${activeFilter === f.key ? " pill-active" : ""}`}
            style={{ display: "inline-flex", alignItems: "center", gap: "4px", cursor: "pointer", border: "none", background: undefined }}
            onClick={() => setActiveFilter(f.key)}
            aria-pressed={activeFilter === f.key}
          >
            {f.icon} {f.label}
            {activeFilter === f.key && filtered.length !== boxes.length && (
              <span style={{ marginLeft: "4px", fontWeight: 700 }}>({filtered.length})</span>
            )}
          </button>
        ))}
      </div>

      <div className="boxes-grid">
        {filtered.map((box, index) => {
          const cat = categoryConfig[box.category] || {
            label: box.category,
            pill: "pill-soin",
            icon: null,
          };
          const affiliateUrl = getAffiliateUrl(box.slug);
          const hasCta = affiliateUrl && affiliateUrl !== "#";
          const ctaUrl = hasCta ? affiliateUrl : box.website;
          const isFirst = index === 0;

          return (
            <article
              key={box.slug}
              className={`box-card${isFirst ? " box-card-featured" : ""}`}
            >
              {isFirst && (
                <div className="box-card-ribbon">⭐ Coup de cœur Kado</div>
              )}

              <div className={`box-card-img gradient-${(index % 6) + 1}`}>
                <img
                  src={box.logo || `/images/logos/${box.slug}.svg`}
                  alt={box.name}
                  className="box-logo-img"
                  width={120}
                  height={60}
                />
                <div className="box-card-cat">
                  <span
                    className={`pill ${cat.pill}`}
                    style={{ fontSize: "0.72rem", padding: "3px 10px" }}
                  >
                    {cat.icon} {cat.label}
                  </span>
                </div>
              </div>

              <div className="box-card-body">
                <div className="box-card-top-row">
                  <h3 className="box-card-name">{box.name}</h3>
                  <div className="box-card-price">
                    {box.price.toFixed(2).replace(".", ",")}€
                    <span>/{box.billing || "mois"}</span>
                  </div>
                </div>

                <div className="box-card-rating">
                  <span className="box-stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={13}
                        fill={i < Math.floor(box.rating || 4) ? "currentColor" : "none"}
                        stroke="currentColor"
                      />
                    ))}
                  </span>
                  <span className="box-rating-val">{box.rating?.toFixed(1)}/5</span>
                </div>

                <p className="box-card-desc">{box.description}</p>

                <ul className="box-pros">
                  {box.pros?.slice(0, 3).map((pro, i) => (
                    <li key={i}>
                      <Check size={13} color="var(--success)" style={{ flexShrink: 0 }} />
                      {pro}
                    </li>
                  ))}
                </ul>

                <div className="box-meta-row">
                  <span className="box-meta-nb">
                    <Package size={13} /> {box.nb_products} produits
                  </span>
                  {box.certifications?.length > 0 && (
                    <div className="box-certs">
                      {box.certifications.map((c) => (
                        <span key={c} className="cert-badge">{c}</span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="box-card-actions">
                  <a
                    href={ctaUrl}
                    target="_blank"
                    rel={hasCta ? "nofollow noopener sponsored" : "noopener noreferrer"}
                    className="btn btn-primary btn-sm"
                  >
                    {hasCta ? "Découvrir la box" : "Voir le site"}
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p style={{ textAlign: "center", color: "var(--text-muted)", padding: "40px 0" }}>
          Aucune box dans cette catégorie pour le moment.
        </p>
      )}
    </>
  );
}
