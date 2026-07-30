import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CollectionPage from "@/app/components/CollectionPage";
import { BUDGETS, getProductsByBudget } from "@/lib/catalog";
import { BUDGET_EDITORIAL } from "@/lib/editorial";

interface Props { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return BUDGETS.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const budget = BUDGETS.find((item) => item.slug === slug);
  if (!budget) return { title: "Budget introuvable" };
  return {
    title: `Idée cadeau ${budget.name.toLowerCase()} en 2026 | Kado-Box`,
    description: `${budget.description} Notre sélection Amazon triée et nos conseils pour offrir juste sans dépasser votre enveloppe.`,
    alternates: { canonical: `/budget/${slug}` },
  };
}

export default async function BudgetPage({ params }: Props) {
  const { slug } = await params;
  const budget = BUDGETS.find((item) => item.slug === slug);
  if (!budget) notFound();
  return (
    <CollectionPage
      eyebrow="Choisir selon son budget"
      title={`Idées cadeau ${budget.name.toLowerCase()}`}
      description={budget.description}
      emoji={budget.emoji}
      products={getProductsByBudget(budget.min, budget.max)}
      editorial={BUDGET_EDITORIAL[slug]}
      related={BUDGETS.filter((item) => item.slug !== slug).map((item) => ({
        href: `/budget/${item.slug}`,
        label: item.name,
      }))}
    />
  );
}
