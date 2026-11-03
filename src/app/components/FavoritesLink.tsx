"use client";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useFavorites } from "./FavoritesProvider";
export default function FavoritesLink() {
  const { favorites } = useFavorites();
  return <Link href="/favoris" className="gift-favorites-link" aria-label={`Mes favoris, ${favorites.length} ${favorites.length === 1 ? "idée" : "idées"}`}><Heart size={18} /><span>Mes idées</span>{favorites.length ? <b>{favorites.length}</b> : null}</Link>;
}
