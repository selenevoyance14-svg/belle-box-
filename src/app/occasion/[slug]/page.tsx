import { pageMetadata } from "@/lib/seo";
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
  return pageMetadata(
    `Cadeaux ${occasion.name} 2026 : idées et conseils | Kado-Box`,
    `${occasion.description}. Explorez nos sélections par envie et budget, et nos guides pour choisir une attention adaptée.`,
    `/occasion/${slug}`,
  );
}

export default async function OccasionPage({ params }: Props) {
  const { slug } = await params;
  const occasion = OCCASIONS.find((item) => item.slug === slug);
  if (!occasion) notFound();
  const products = getProductsByOccasion(slug);
  return (
    <CollectionPage
      path={`/occasion/${slug}`}
      occasion={slug}
      eyebrow="Choisir par occasion"
      title={`Cadeaux ${occasion.name}`}
      description={`${occasion.description}. Une sélection claire, avec plusieurs budgets et des conseils pour éviter le cadeau choisi par défaut.`}
      emoji={occasion.emoji}
      image={occasion.image}
      products={products}
      editorial={OCCASION_EDITORIAL[slug]}
      related={OCCASIONS.filter((item) => item.slug !== slug).slice(0, 4).map((item) => ({
        href: `/occasion/${item.slug}`,
        label: `Cadeaux ${item.name}`,
      }))}
    />
  );
}
