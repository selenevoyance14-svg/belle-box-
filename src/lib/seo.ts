import type { Metadata } from "next";

export const SITE_URL = "https://kado-box.fr";

export function pageMetadata(title: string, description: string, path: string, article?: { publishedAt: string; updatedAt?: string }): Metadata {
  const image = { url: "/og-image.webp", width: 1200, height: 630, alt: "Kado-Box : choisir un cadeau selon ses envies et son budget" };
  return {
    title, description,
    alternates: { canonical: path },
    openGraph: {
      title, description, url: path, siteName: "Kado-Box", locale: "fr_FR",
      images: [image],
      ...(article ? { type: "article" as const, publishedTime: article.publishedAt, modifiedTime: article.updatedAt ?? article.publishedAt } : { type: "website" as const }),
    },
    twitter: { card: "summary_large_image", title, description, images: [image.url] },
  };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem", position: index + 1, name: item.name, item: new URL(item.path, SITE_URL).href,
    })),
  };
}
