"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronRight, Sparkles } from "lucide-react";
import type { CatalogProduct } from "@/lib/catalog";
import { CATEGORY_LABELS } from "@/lib/catalog-labels";

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
  const updatedAt = product.amazon_updated_at ? new Date(product.amazon_updated_at) : null;
  const [priceIsFresh, setPriceIsFresh] = useState(false);

  useEffect(() => {
    const priceDate = product.amazon_updated_at ? new Date(product.amazon_updated_at) : null;
    const timer = window.setTimeout(() => {
      setPriceIsFresh(Boolean(
        priceDate &&
        !Number.isNaN(priceDate.getTime()) &&
        Date.now() - priceDate.getTime() < 24 * 60 * 60 * 1000
      ));
    }, 0);

    return () => window.clearTimeout(timer);
  }, [product.amazon_updated_at]);

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
        <div className="product-price">
          <span className="price-now">{priceIsFresh ? formattedPrice : "Voir le prix sur Amazon"}</span>
        </div>
        <span className="btn btn-primary btn-sm product-cta">
          Voir sur Amazon <ChevronRight size={14} />
        </span>
        <span className="product-prime">
          {priceIsFresh && updatedAt
            ? `Prix relevé le ${updatedAt.toLocaleDateString("fr-FR")}. Prix et disponibilité susceptibles de changer.`
            : "Prix et disponibilité à vérifier sur Amazon"}
        </span>
      </div>
    </a>
  );
}
