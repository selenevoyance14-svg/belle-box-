"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowUpRight, Heart } from "lucide-react";
import type { CatalogProduct } from "@/lib/catalog";
import { CATEGORY_LABELS } from "@/lib/catalog-labels";
import { useFavorites } from "./FavoritesProvider";

export function ProductCard({ product, badge }: { product: CatalogProduct; badge?: string }) {
  const { favorites, toggle } = useFavorites();
  const saved = favorites.includes(product.asin);
  const [fresh, setFresh] = useState(false);
  useEffect(() => {
    const check = () => {
      const date = Date.parse(product.amazon_updated_at ?? "");
      setFresh(Number.isFinite(date) && Date.now() >= date && Date.now() - date < 86400000);
    };
    check();
    const interval = window.setInterval(check, 60000);
    return () => window.clearInterval(interval);
  }, [product.amazon_updated_at]);
  const linkProps = { href: product.affiliate_url, target: "_blank", rel: "sponsored nofollow noopener noreferrer" };
  return (
    <article className="product-card gift-card">
      {badge ? <span className="product-badge">{badge}</span> : null}
      <button className="gift-save" type="button" onClick={() => toggle(product.asin)} aria-pressed={saved} aria-label={`${saved ? "Retirer" : "Ajouter"} ${product.title} ${saved ? "des" : "aux"} favoris`}>
        <Heart size={19} fill={saved ? "currentColor" : "none"} />
      </button>
      <a {...linkProps} className="product-image" aria-label={`${product.title} sur Amazon (nouvel onglet)`}>
        <Image src={product.image} alt={product.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="product-photo" />
        <span className="product-category">{CATEGORY_LABELS[product.category] ?? "Idée cadeau"}</span>
      </a>
      <div className="product-body">
        <h3 className="product-title"><a {...linkProps}>{product.title}</a></h3>
        <p className="gift-reason">{product.reason}</p>
        {product.caution ? <details className="gift-caution"><summary>À vérifier avant d’offrir</summary><p>{product.caution}</p></details> : null}
        <div className="gift-buy">
          {fresh ? <strong className="price-now">{product.price.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}</strong> : null}
          <a {...linkProps} className="btn btn-primary btn-sm product-cta" aria-label={`Voir le prix de ${product.title} sur Amazon (nouvel onglet)`}>Voir le prix sur Amazon <ArrowUpRight size={15} /></a>
          <span className="product-prime">{fresh ? "Prix relevé il y a moins de 24 h, susceptible de changer." : "Prix et disponibilité chez le marchand"}</span>
        </div>
      </div>
    </article>
  );
}
