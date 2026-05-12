#!/usr/bin/env node
/**
 * Re-applique la catégorisation et le filtrage SUR LE YAML EXISTANT.
 * Plus rapide que re-télécharger : juste re-classer.
 */
import fs from "fs";
import yaml from "js-yaml";

const FILE = "data/amazon-catalog.yaml";
const d = yaml.load(fs.readFileSync(FILE, "utf-8"));

const BLACKLIST = [
  "papier toilette", "essuie-tout", "lessive", "détergent", "javel",
  "shampooing dosette", "vaisselle main", "vaisselle mains", "liquide vaisselle",
  "lave-vaisselle", "tablettes lave", "lave-linge", "parfum de linge",
  "perles parfum", "perles de linge", "adoucissant",
  "papier alu", "sac poubelle", "destop", "anti-mousse", "wc gel", "désodorisant",
  "whey protein", "protéine en poudre", "protéine whey", "scitec nutrition",
  "complément alimentaire",
  "plaque pâtisserie", "plaque a pâtisserie", "plaque à pâtisserie", "plaque cuisson",
  "couche bébé", "couches bébé", "couches pampers", "lingettes bébé",
  "lait infantile", "biberon stérilisateur",
  "cartouche d'encre", "cartouche d'Encre", "cartouche encre", "cartouche imprimante",
  "câble usb", "câble hdmi", "rallonge électrique",
  "ampoule led", "ampoule e27", "ampoule gu10", "ampoule e14",
  "piles aa", "piles aaa", "piles boutons",
  "batterie auto", "huile moteur", "pneu", "vis", "boulon", "filtre à air",
  "cartouche filtre", "filtre brita", "filtre maxtra",
  "anti-puce", "vermifuge", "litière",
  "lames de remplacement", "lames de rasoir", "déodorant stick",
  "ration militaire",
];

function isCadeau(title) {
  if (!title) return false;
  const t = title.toLowerCase();
  return !BLACKLIST.some((b) => t.includes(b));
}

function categorize(title) {
  const t = title.toLowerCase();
  if (/(^|[^a-z])(bébé|bebe|biberon|tétine|doudou|hochet|allaitement|naissance|nouveau-né|nourrisson|pédiatrie|crème change|siège bébé|dentition|baby|newborn|infant)([^a-z]|$)/.test(t)) return "bebe";
  if (/\b(parfum|eau de toilette|eau de parfum|cologne|lancôme|chanel|dior|guerlain|hugo boss|paco rabanne|yves saint laurent)\b/.test(t)) return "parfum";
  if (/\b(bijou|bijoux|collier|bracelet|bague|pandora|swarovski|argent 925|or 18k)\b/.test(t) || /boucles? d'oreille/.test(t)) return "bijou";
  if (/\b(montre|festina|casio|garmin|fossil|seiko|smartwatch|apple watch)\b/.test(t)) return "montre";
  if (/\b(lego|playmobil|barbie|poupée|peluche|funko|nerf|puzzle|play-doh|pâte à modeler|magnet|magneti)\b/.test(t) || /jeu (de société|éducatif|enfant|pour enfant|de mime)/.test(t)) return "jouet";
  if (/\b(chocolat|lindt|ferrero|kinder|milka|bonbon|confiserie|praliné|truffe|nutella)\b/.test(t)) return "chocolat";
  if (/\b(bougie|yankee|diptyque|durance|rituals)\b/.test(t)) return "bougie";
  if (/\b(coffret cadeau|kit cadeau|set cadeau|panier garni|box cadeau)\b/.test(t)) return "coffret";
  if (/\b(livre|roman|bd|manga|encyclopédie|annale|annales|bescherelle)\b/.test(t)) return "livre";
  if (/\b(echo|kindle|airpod|airpods|airtag|tablette|fire tablet|bluetooth|enceinte|casque audio)\b/.test(t)) return "tech";
  if (/\b(maquillage|rouge à lèvres|palette|fard|mascara|fond de teint)\b/.test(t)) return "maquillage";
  if (/\b(crème|sérum|soin visage|masque visage|hydratant|gommage)\b/.test(t)) return "beaute";
  if (/\b(thé|infusion|rooibos|kusmi|nespresso|tassimo|capsules café)\b/.test(t)) return "the_cafe";
  if (/\b(vin|champagne|whisky|rhum|cognac|gin tonic|vodka|spiritueux)\b/.test(t) || /bière (artisanale|craft)/.test(t)) return "alcool";
  if (/\b(décoration|vase|coussin|plaid|lampe d'ambiance|cadre photo)\b/.test(t)) return "deco";
  if (/\b(machine à café|mug|tasse|verre à vin|moule à gâteau|robot pâtissier)\b/.test(t)) return "cuisine";
  if (/\b(sac à main|portefeuille|maroquinerie|trousse à maquillage)\b/.test(t)) return "maroquinerie";
  if (/\b(foulard|écharpe|bonnet|gants|pull|chemise)\b/.test(t)) return "mode";
  if (/\b(playstation|nintendo|xbox|switch|console|jeu vidéo)\b/.test(t)) return "jeu_video";
  if (/\b(yoga|fitness|haltère|tapis de yoga|raquette|ballon de sport|musculation)\b/.test(t)) return "sport";
  if (/\b(stylo|carnet|agenda|journal intime|papeterie)\b/.test(t)) return "papeterie";
  return "autre";
}

function suggestOccasions(category) {
  const map = {
    bijou:       ["fete-des-meres", "saint-valentin", "noel", "anniversaire"],
    maquillage:  ["fete-des-meres", "noel", "anniversaire"],
    beaute:      ["fete-des-meres", "noel", "anniversaire"],
    bougie:      ["fete-des-meres", "noel", "anniversaire"],
    montre:      ["fete-des-peres", "noel", "anniversaire"],
    alcool:      ["fete-des-peres", "noel", "anniversaire"],
    parfum:      ["fete-des-meres", "fete-des-peres", "saint-valentin", "noel", "anniversaire"],
    coffret:     ["fete-des-meres", "fete-des-peres", "noel", "saint-valentin", "anniversaire"],
    maroquinerie:["fete-des-meres", "fete-des-peres", "noel", "anniversaire"],
    jouet:       ["noel", "anniversaire", "paques"],
    bebe:        ["naissance"],
    chocolat:    ["paques", "noel", "saint-valentin"],
    livre:       ["noel", "anniversaire", "fete-des-peres"],
    tech:        ["noel", "anniversaire", "fete-des-peres"],
    jeu_video:   ["noel", "anniversaire"],
    sport:       ["noel", "anniversaire", "fete-des-peres"],
    deco:        ["fete-des-meres", "noel", "anniversaire"],
    cuisine:     ["fete-des-meres", "noel", "anniversaire"],
    the_cafe:    ["fete-des-meres", "noel", "anniversaire"],
    mode:        ["noel", "anniversaire"],
    papeterie:   ["noel", "anniversaire"],
  };
  return map[category] || [];
}

const before = d.products.length;
const cleaned = d.products
  .filter((p) => isCadeau(p.title))
  .map((p) => {
    const cat = categorize(p.title);
    return { ...p, category: cat, occasions: suggestOccasions(cat) };
  });
const after = cleaned.length;

d.products = cleaned;
d.count = cleaned.length;
d.generated_at = new Date().toISOString();

fs.writeFileSync(FILE, yaml.dump(d, { lineWidth: 200, noRefs: true }), "utf-8");

const byCat = {};
const byOcc = {};
for (const p of cleaned) {
  byCat[p.category] = (byCat[p.category] || 0) + 1;
  for (const o of p.occasions) byOcc[o] = (byOcc[o] || 0) + 1;
}
console.log(`Re-catégorisation : ${before} → ${after} produits (${before - after} blacklistés)`);
console.log("\nPar catégorie :", byCat);
console.log("\nPar occasion :", byOcc);
