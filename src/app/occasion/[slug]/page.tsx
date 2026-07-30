import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CollectionPage from "@/app/components/CollectionPage";
import { getProductsByOccasion, OCCASIONS } from "@/lib/catalog";
import { OCCASION_EDITORIAL } from "@/lib/editorial";

interface Props { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return OCCASIONS.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const occasion = OCCASIONS.find((item) => item.slug === slug);
  if (!occasion) return { title: "Occasion introuvable" };
  return {
    title: `Cadeau ${occasion.name.toLowerCase()} : idées utiles 2026 | Kado-Box`,
    description: `${occasion.description}. Découvrez des idées cadeau ${occasion.name.toLowerCase()} triées par popularité et budget, avec nos conseils pour bien choisir.`,
    alternates: { canonical: `/occasion/${slug}` },
    openGraph: {
      title: `Idées cadeau ${occasion.name.toLowerCase()} 2026`,
      description: occasion.description,
      url: `/occasion/${slug}`,
      type: "website",
    },
  };
}

export default async function OccasionPage({ params }: Props) {
  const { slug } = await params;
  const occasion = OCCASIONS.find((item) => item.slug === slug);
  if (!occasion) notFound();
  const products = getProductsByOccasion(slug);
  return (
    <CollectionPage
      eyebrow="Choisir par occasion"
      title={`Idées cadeau ${occasion.name.toLowerCase()}`}
      description={`${occasion.description}. Une sélection claire, avec plusieurs budgets et des conseils pour éviter le cadeau choisi par défaut.`}
      emoji={occasion.emoji}
      products={products}
      editorial={OCCASION_EDITORIAL[slug]}
      related={OCCASIONS.filter((item) => item.slug !== slug).slice(0, 4).map((item) => ({
        href: `/occasion/${item.slug}`,
        label: `Cadeaux ${item.name}`,
      }))}
    />
  );
}
