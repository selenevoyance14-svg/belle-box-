#!/usr/bin/env node
import fs from "fs";
import yaml from "js-yaml";

const file = "data/amazon-catalog.yaml";
const catalog = yaml.load(fs.readFileSync(file, "utf8"));

const rules = [
  ["jeu_video", /tomodachi|mario kart|pokémon pokopia|directive 8020|assassin's creed/i],
  ["jouet", /pat patrouille|crack list|squishy|trading cards|carte anniversaire 18 ans/i],
  ["livre", /au saccage des petits bonheurs|accords toltèques|femme de ménage|l'autre moi|unique lueur|franck thilliez|la prof|la psy|la locataire|heures fragiles|d'autres printemps|l'intruse|bien dormir|callisthénie/i],
  ["tech", /apple ipad|fire tv stick|batterie externe|samsung a16|earpods|jbl wave beam|iphone 1[23]|macbook air/i],
  ["mode", /levi's|levi&#39;s|birkenstock|new era|vans mixte|superga|pepe jeans/i],
  ["sport", /ballon de football|neoprene dumbbell|tapis de course|tapis de marche/i],
  ["beaute", /ordinary tonique|cerave.+gel nettoyant|biodance|huile de ricin bio|celimax/i],
  ["deco", /bol chantant|lampe à lave|guirlande lumineuse guinguette/i],
  ["papeterie", /peinture acrylique aérosol|emporte-pièce pour pâte polymère/i],
];

const occasions = {
  jeu_video: ["noel", "anniversaire"], jouet: ["noel", "anniversaire", "paques"],
  livre: ["noel", "anniversaire", "fete-des-meres", "fete-des-peres"],
  tech: ["noel", "anniversaire", "fete-des-peres"], mode: ["noel", "anniversaire"],
  sport: ["noel", "anniversaire", "fete-des-peres"], beaute: ["fete-des-meres", "noel", "anniversaire"],
  deco: ["fete-des-meres", "noel", "anniversaire"], papeterie: ["noel", "anniversaire"],
};

let promoted = 0;
for (const product of catalog.products) {
  if (product.category !== "autre") continue;
  const match = rules.find(([, pattern]) => pattern.test(product.title));
  if (!match) continue;
  product.category = match[0];
  product.occasions = occasions[match[0]];
  promoted += 1;
}

catalog.generated_at = new Date().toISOString();
fs.writeFileSync(file, yaml.dump(catalog, { lineWidth: 200, noRefs: true }), "utf8");
console.log(`${promoted} produits cadeaux réintégrés dans les sélections.`);
