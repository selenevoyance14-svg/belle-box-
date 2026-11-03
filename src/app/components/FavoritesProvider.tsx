"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
const KEY = "kado-box-favorites-v1";
const FavoritesContext = createContext<{ favorites: string[]; toggle: (asin: string) => void; ready: boolean }>({ favorites: [], toggle: () => {}, ready: false });
export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      const stored: unknown = JSON.parse(localStorage.getItem(KEY) ?? "[]");
      if (Array.isArray(stored)) setFavorites(stored.filter((value): value is string => typeof value === "string"));
    } catch { /* La liste reste utilisable si le stockage est indisponible. */ }
    setReady(true);
    const sync = (event: StorageEvent) => {
      if (event.key !== KEY) return;
      try { const next: unknown = JSON.parse(event.newValue ?? "[]"); if (Array.isArray(next)) setFavorites(next.filter((value): value is string => typeof value === "string")); } catch { /* Ignore une valeur corrompue. */ }
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);
  function toggle(asin: string) {
    setFavorites((current) => {
      const next = current.includes(asin) ? current.filter((item) => item !== asin) : [...current, asin];
      try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* Favoris conservés pour la session. */ }
      return next;
    });
  }
  return <FavoritesContext.Provider value={{ favorites, toggle, ready }}>{children}</FavoritesContext.Provider>;
}
export const useFavorites = () => useContext(FavoritesContext);
