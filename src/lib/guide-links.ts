import { BUDGETS, OCCASIONS, RECIPIENTS } from "./catalog";
import { GUIDES, type Guide } from "./guides";

export function getRelatedGuides(guide: Guide, limit = 3): Guide[] {
  return GUIDES.filter((candidate) => candidate.slug !== guide.slug)
    .map((candidate) => ({ candidate, score:
      (guide.recipientSlug && candidate.recipientSlug === guide.recipientSlug ? 2 : 0) +
      (guide.occasionSlug && candidate.occasionSlug === guide.occasionSlug ? 3 : 0),
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit).map(({ candidate }) => candidate);
}

export function getGuideCollections(guide: Guide) {
  const occasion = OCCASIONS.find((item) => item.slug === guide.occasionSlug);
  const recipient = RECIPIENTS.find((item) => item.slug === guide.recipientSlug);
  return [
    ...(occasion ? [{ href: `/occasion/${occasion.slug}`, label: `Les idées cadeaux pour ${occasion.name}` }] : []),
    ...(recipient ? [{ href: `/destinataire/${recipient.slug}`, label: `La sélection ${recipient.name.toLowerCase()}` }] : []),
    ...BUDGETS.map((budget) => ({ href: `/budget/${budget.slug}`, label: `Cadeaux ${budget.name.toLowerCase()}` })),
  ];
}

export function getCollectionGuides({ occasion, recipient, budget }: { occasion?: string; recipient?: string; budget?: string }): Guide[] {
  if (budget === "moins-de-20-euros") return GUIDES.filter((guide) => /petit-budget|secret-santa/.test(guide.slug));
  if (budget) return GUIDES.filter((guide) => ["cadeau-noel-homme", "cadeau-noel-femme", "cadeau-couple"].includes(guide.slug));
  return GUIDES.filter((guide) =>
    (occasion ? guide.occasionSlug === occasion : false) ||
    (recipient ? guide.recipientSlug === recipient : false)
  ).slice(0, 6);
}

export function sectionId(index: number) { return `conseil-${index + 1}`; }
