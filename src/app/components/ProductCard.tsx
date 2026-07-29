import Image from "next/image";
import { ChevronRight, Sparkles, Star } from "lucide-react";
import { CATEGORY_LABELS, type CatalogProduct } from "@/lib/catalog";

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
  const category = CATEGORY_LABELS[product.category] ?? "Idée cadeau";
  const formattedPrice = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(product.price);

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
      <div className="product-image">
        <Image
          src={product.image}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="product-photo"
        />
        <span className="product-category">{category}</span>
      </div>
      <div className="product-body">
        <h3 className="product-title">{title}</h3>
        {product.rating && (
          <div className="product-rating">
            <Star size={15} fill="currentColor" />
            <span className="rating-num">{product.rating.toFixed(1)}</span>
            {product.reviews_count && (
              <span className="muted">
                ({product.reviews_count.toLocaleString("fr-FR")} avis)
              </span>
            )}
          </div>
        )}
        <div className="product-price">
          <span className="price-now">{formattedPrice}</span>
        </div>
        <span className="btn btn-primary btn-sm product-cta">
          Voir sur Amazon <ChevronRight size={14} />
        </span>
        <span className="product-prime">Prix et disponibilité à vérifier</span>
      </div>
    </a>
  );
}
