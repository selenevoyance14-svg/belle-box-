"use client";

import Link from "next/link";
import { useState } from "react";

const euros = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" });

export default function GiftBudgetCalculator() {
  const [total, setTotal] = useState("200");
  const [people, setPeople] = useState("6");
  const [extras, setExtras] = useState("20");
  const amount = Number(total);
  const count = Number(people);
  const reserve = Number(extras);
  const valid = total.trim() !== "" && people.trim() !== "" && extras.trim() !== "" &&
    Number.isFinite(amount) && Number.isFinite(count) && Number.isFinite(reserve) &&
    amount >= 0 && Number.isInteger(count) && count > 0 && reserve >= 0 && reserve <= amount;
  const available = valid ? amount - reserve : 0;
  const perPerson = valid ? available / count : 0;
  const budget = perPerson <= 20 ? "moins-de-20-euros" : perPerson <= 50 ? "20-50-euros" : perPerson <= 100 ? "50-100-euros" : "plus-de-100-euros";

  return <section className="kb-section gift-budget-calculator" aria-labelledby="budget-calculator-title">
    <div className="kb-container">
      <div className="kb-section-head"><div><p className="kb-eyebrow">Préparer Noël sans dépasser son budget</p><h2 id="budget-calculator-title">Une enveloppe pour chacun.</h2></div><Link href="/guide/organiser-budget-cadeaux-noel" className="gift-text-link">Organiser mes achats</Link></div>
      <p id="budget-help">Gardez une marge pour les emballages et la livraison, puis répartissez le reste. Vous pouvez ensuite adapter les montants pour chaque personne.</p>
      <div className="gift-budget-fields" aria-describedby="budget-help">
        <label htmlFor="gift-total">Budget total (€)<input id="gift-total" type="number" min="0" step="any" inputMode="decimal" value={total} onChange={(event) => setTotal(event.target.value)} /></label>
        <label htmlFor="gift-people">Nombre de personnes<input id="gift-people" type="number" min="1" step="1" inputMode="numeric" value={people} onChange={(event) => setPeople(event.target.value)} /></label>
        <label htmlFor="gift-extras">Marge pour les frais (€)<input id="gift-extras" type="number" min="0" step="any" inputMode="decimal" value={extras} onChange={(event) => setExtras(event.target.value)} /></label>
      </div>
      <div className="gift-budget-result" role="status" aria-live="polite" aria-atomic="true">
        {valid ? <p><strong>{euros.format(perPerson)}</strong> par personne en moyenne, soit {euros.format(available)} pour les cadeaux.</p> : <p>Indiquez un budget positif ou nul, un nombre entier de personnes supérieur à zéro et une marge comprise entre zéro et votre budget total.</p>}
      </div>
      {valid && available > 0 ? <Link href={`/budget/${budget}`} className="gift-text-link">Explorer cette tranche de budget</Link> : null}
      <p className="gift-price-note">Calcul indicatif, sans enregistrement de vos données. Les prix actuels restent à vérifier chez le marchand.</p>
    </div>
  </section>;
}
