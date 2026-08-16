import type { MetadataRoute } from "next";
import { BUDGETS, OCCASIONS, RECIPIENTS } from "@/lib/catalog";
import { GUIDES } from "@/lib/guides";

const BASE_URL = "https://kado-box.fr";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/guide",
    "/a-propos",
    "/contact",
    "/mentions-legales",
    "/politique-de-confidentialite",
    "/affiliation-amazon",
  ];

  return [
    ...staticPages.map((path, index) => ({
      url: `${BASE_URL}${path}`,
      changeFrequency: index < 2 ? ("weekly" as const) : ("yearly" as const),
      priority: path === "" ? 1 : path === "/guide" ? 0.8 : 0.3,
    })),
    ...OCCASIONS.map(({ slug }) => ({
      url: `${BASE_URL}/occasion/${slug}`,
      changeFrequency: "weekly" as const,
      priority: slug === "noel" ? 0.9 : 0.7,
    })),
    ...RECIPIENTS.map(({ slug }) => ({
      url: `${BASE_URL}/destinataire/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...BUDGETS.map(({ slug }) => ({
      url: `${BASE_URL}/budget/${slug}`,
      changeFrequency: "weekly" as const,
      priority: slug === "moins-de-20-euros" ? 0.9 : 0.7,
    })),
    ...GUIDES.map(({ slug, publishedAt }) => ({
      url: `${BASE_URL}/guide/${slug}`,
      lastModified: new Date(publishedAt),
      changeFrequency: "monthly" as const,
      priority: [
        "cadeau-noel-petit-budget",
        "cadeau-ado-garcon",
        "cadeau-grand-pere",
        "cadeau-anniversaire-mariage",
        "idees-cadeaux-noel-2026",
      ].includes(slug)
        ? 0.8
        : 0.6,
    })),
  ];
}
