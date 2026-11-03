import { ArrowRight } from "lucide-react";
import { INTERESTS } from "@/lib/gift-selection";
export default function GiftFinderForm() {
  return <form action="/trouver-cadeau" className="gift-quick-form">
    <p className="kb-eyebrow">Votre prochaine bonne idée</p>
    <h2>On offre à qui ?</h2>
    <div className="gift-quick-fields">
      <label>La personne<select name="recipient" defaultValue="all"><option value="all">Tout le monde</option><option value="femme">Pour elle</option><option value="homme">Pour lui</option><option value="ado">Un ado</option><option value="enfant">Un enfant</option><option value="couple">Un couple</option><option value="bebe">Un bébé</option></select></label>
      <label>Votre budget<select name="budget" defaultValue="all"><option value="all">Je ne sais pas encore</option><option value="under-20">20 € maximum</option><option value="20-50">20 à 50 €</option><option value="50-100">50 à 100 €</option><option value="over-100">Plus de 100 €</option></select></label>
      <label className="gift-quick-interest">Ce qui lui plaît<select name="interest" defaultValue="all"><option value="all">Surprenez-moi</option>{INTERESTS.map((i) => <option key={i.value} value={i.value}>{i.label}</option>)}</select></label>
    </div>
    <button className="kb-button kb-button-primary" type="submit">Trouver ses cadeaux <ArrowRight size={18} /></button>
    <small>Gratuit · sans compte · budgets indicatifs</small>
  </form>;
}
