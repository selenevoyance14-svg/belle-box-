import { ChevronRight, Gift, Sparkles } from "lucide-react";
import type { CatalogProduct } from "@/lib/catalog";

function decodeTitle(title: string) {
  return title
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"');
}

export function ProductCard({
  product,
  badge,
}: {
  product: CatalogProduct;
  badge?: string;
}) {
  const title = decodeTitle(product.title);

  return (
    <a
      href={product.affiliate_url}
      target="_blank"
      rel="sponsored nofollow noopener noreferrer"
      className="product-card"
      aria-label={`${title} : voir le prix et la disponibilité sur Amazon`}
    >
      {badge && (
        <span className="product-badge">
          <Sparkles size={11} /> {badge}
        </span>
      )}
      <div
        className="product-image"
        aria-hidden="true"
        style={{ display: "grid", placeItems: "center" }}
      >
        <Gift size={54} color="var(--primary)" strokeWidth={1.4} />
      </div>
      <div className="product-body">
        <h3 className="product-title">{title}</h3>
        <p className="muted" style={{ fontSize: "0.82rem", margin: "8px 0 14px" }}>
          Prix et disponibilité à vérifier chez Amazon.
        </p>
        <span className="btn btn-primary btn-sm product-cta">
          Voir l’offre <ChevronRight size={14} />
        </span>
      </div>
    </a>
  );
}
