#!/usr/bin/env node
/**
 * Ajoute ~30 NOUVEAUX produits cadeau au catalogue existant (mode append).
 *
 * - Scrape les pages Amazon.fr les plus orientées "cadeau"
 * - Ignore les ASIN déjà présents dans le catalogue
 * - Ne garde QUE les produits qui tombent dans une vraie catégorie cadeau
 *   (pas "autre" : on évite piles, cartouches d'encre, draps housses…)
 * - Traite chaque image : letterbox blanc 1200x800 (image entière, pas de crop)
 *   puis compression pngquant
 * - Fusionne avec le catalogue, re-trie et réécrit le YAML
 *
 * Usage : node scripts/add-products.mjs [nombre]   (défaut : 30)
 */

import fs from "fs";
import path from "path";
import https from "https";
import zlib from "zlib";
import yaml from "js-yaml";
import { execFileSync } from "child_process";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const CATALOG = path.join(ROOT, "data", "amazon-catalog.yaml");
const IMG_DIR = path.join(ROOT, "public", "images", "amazon");
const PARTNER_TAG = "lebrunnathali-21";
const TARGET = parseInt(process.argv[2] || "30", 10);

fs.mkdirSync(IMG_DIR, { recursive: true });

// Pages Amazon.fr riches en cadeaux (most-gifted / most-wished + bestsellers ciblés)
const SOURCE_PAGES = [
  "https://www.amazon.fr/gp/most-gifted/",
  "https://www.amazon.fr/gp/most-wished-for/",
  "https://www.amazon.fr/gp/most-gifted/toys",
  "https://www.amazon.fr/gp/most-wished-for/toys",
  "https://www.amazon.fr/gp/most-gifted/beauty",
  "https://www.amazon.fr/gp/most-wished-for/beauty",
  "https://www.amazon.fr/gp/most-gifted/luxury-beauty",
  "https://www.amazon.fr/gp/bestsellers/toys",
  "https://www.amazon.fr/gp/bestsellers/toys/ref=zg_bs_pg_2?pg=2",
  "https://www.amazon.fr/gp/bestsellers/beauty",
  "https://www.amazon.fr/gp/bestsellers/watches",
  "https://www.amazon.fr/gp/bestsellers/jewelry",
  "https://www.amazon.fr/gp/bestsellers/videogames",
  "https://www.amazon.fr/gp/bestsellers/kitchen",
  "https://www.amazon.fr/gp/bestsellers/sports",
  "https://www.amazon.fr/gp/bestsellers/lighting",
  "https://www.amazon.fr/gp/bestsellers/musical-instruments",
  "https://www.amazon.fr/gp/bestsellers/garden",
];

// Blacklist : exclure les produits clairement pas-cadeau (ménager, consommable)
const BLACKLIST = [
  "papier toilette", "essuie-tout", "lessive", "détergent", "javel",
  "shampooing dosette", "vaisselle main", "vaisselle mains", "liquide vaisselle",
  "lave-vaisselle", "tablettes lave", "lave-linge", "parfum de linge",
  "perles parfum", "perles de linge", "adoucissant",
  "papier alu", "sac poubelle", "destop", "anti-mousse", "wc gel", "désodorisant",
  "whey protein", "protéine en poudre", "protéine whey", "scitec nutrition",
  "complément alimentaire", "vitamines",
  "plaque pâtisserie", "plaque a pâtisserie", "plaque à pâtisserie", "plaque cuisson",
  "couche bébé", "couches bébé", "couches pampers", "lingettes bébé",
  "lait infantile", "biberon stérilisateur",
  "cartouche d'encre", "cartouche d'Encre", "cartouche encre", "cartouche imprimante",
  "câble usb", "câble hdmi", "rallonge électrique",
  "ampoule led", "ampoule e27", "ampoule gu10", "ampoule e14",
  "piles aa", "piles aaa", "piles boutons", "pile alcaline", "piles alcalines",
  "batterie auto", "huile moteur", "pneu", "vis", "boulon", "filtre à air",
  "cartouche filtre", "filtre brita", "filtre maxtra",
  "anti-puce", "vermifuge", "litière",
  "lames de remplacement", "lames de rasoir", "déodorant stick",
  "ration militaire",
  // Renforts cadeau : utilitaire qui passait en "autre"
  "drap housse", "drap-housse", "protège matelas", "protege matelas",
  "barre de son", "détartrant", "detartrant", "mémoire ram", "ddr4", "ddr5",
  "tapis de souris", "coque pour", "coque magnétique", "coque iphone", "coque samsung",
  "cordon de coque", "cave à vin", "cave a vin", "housse de rangement",
  "extension cheveux", "extension a clip", "extension à clip", "cheveux humains", "extension de cheveux",
  "rideau occultant", "moustiquaire", "carte sd", "carte micro sd", "carte microsd",
  "carte sdxc", "carte microsdxc", "disque dur", "clé usb", "clef usb",
];

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

function isCadeau(title) {
  if (!title) return false;
  const t = title.toLowerCase();
  for (const b of BLACKLIST) if (t.includes(b)) return false;
  return true;
}

function fetchHTML(url, redirects = 5) {
  return new Promise((resolve, reject) => {
    if (redirects <= 0) return reject(new Error("Too many redirects"));
    https
      .get(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
          "Accept-Language": "fr-FR,fr;q=0.9",
          "Accept-Encoding": "gzip, deflate",
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        },
        timeout: 25000,
      }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          const next = res.headers.location.startsWith("http") ? res.headers.location : new URL(res.headers.location, url).href;
          res.resume();
          return fetchHTML(next, redirects - 1).then(resolve, reject);
        }
        if (res.statusCode !== 200) {
          res.resume();
          return reject(new Error(`HTTP ${res.statusCode}`));
        }
        const enc = res.headers["content-encoding"];
        let stream = res;
        if (enc === "gzip") stream = res.pipe(zlib.createGunzip());
        else if (enc === "deflate") stream = res.pipe(zlib.createInflate());
        const chunks = [];
        stream.on("data", (c) => chunks.push(c));
        stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf-8")));
        stream.on("error", reject);
      })
      .on("error", reject);
  });
}

function downloadImage(url, filePath) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { "User-Agent": "Mozilla/5.0 AppleWebKit/537.36" }, timeout: 25000 }, (res) => {
        if (res.statusCode !== 200) {
          res.resume();
          return reject(new Error(`HTTP ${res.statusCode}`));
        }
        const file = fs.createWriteStream(filePath);
        res.pipe(file);
        file.on("finish", () => {
          file.close();
          const size = fs.statSync(filePath).size;
          if (size < 2000) {
            fs.unlinkSync(filePath);
            return reject(new Error("File too small"));
          }
          resolve(size);
        });
        file.on("error", reject);
      })
      .on("error", reject);
  });
}

// Letterbox blanc 1200x800 (image entière) + compression pngquant
function processImage(filePath) {
  try {
    execFileSync("magick", [
      filePath,
      "-resize", "1200x800",
      "-background", "white", "-gravity", "center",
      "-extent", "1200x800",
      filePath,
    ], { stdio: "ignore" });
    // pngquant ne traite que le PNG : on convertit en PNG pour optimiser
    const pngPath = filePath.replace(/\.jpg$/, ".png");
    execFileSync("magick", [filePath, pngPath], { stdio: "ignore" });
    try {
      execFileSync("pngquant", ["--quality=70-85", "--force", "--output", pngPath, pngPath], { stdio: "ignore" });
    } catch { /* pngquant échoue parfois si déjà optimal */ }
    // On reconvertit en jpg (cohérent avec le reste du catalogue) puis on nettoie
    execFileSync("magick", [pngPath, "-background", "white", "-flatten", "-quality", "82", filePath], { stdio: "ignore" });
    fs.unlinkSync(pngPath);
    return true;
  } catch (e) {
    return false;
  }
}

function parseAsins(html) {
  const matches = html.matchAll(/(?:data-asin="|\/dp\/|"asin":")([A-Z0-9]{10})/g);
  return [...new Set([...matches].map((m) => m[1]))];
}
function parsePrice(html) { const m = html.match(/"priceAmount":\s*([0-9]+\.?[0-9]*)/); return m ? parseFloat(m[1]) : null; }
function parseRating(html) { const m = html.match(/title="([0-9],[0-9])\s+sur\s+5\s+étoiles"/); return m ? parseFloat(m[1].replace(",", ".")) : null; }
function parseReviews(html) {
  const m = html.match(/aria-label="([0-9\s ]+)\s+Commentaires?"/);
  if (m) return parseInt(m[1].replace(/[\s ]/g, ""), 10);
  const m2 = html.match(/acrCustomerReviewText[^>]*>\(([0-9\s ]+)\)/);
  return m2 ? parseInt(m2[1].replace(/[\s ]/g, ""), 10) : null;
}
function parseImage(html) {
  const hi = html.match(/"hiRes":"(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+\.jpg)"/);
  if (hi) return hi[1];
  const lg = html.match(/"large":"(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+\.jpg)"/);
  return lg ? lg[1] : null;
}
function parseTitle(html) { const m = html.match(/id="productTitle"[^>]*>([^<]+)</); return m ? m[1].trim().replace(/\s+/g, " ") : null; }

function slugify(s) {
  return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60);
}

function suggestOccasions(category) {
  const map = {
    bijou: ["fete-des-meres", "saint-valentin", "noel", "anniversaire"],
    maquillage: ["fete-des-meres", "noel", "anniversaire"],
    beaute: ["fete-des-meres", "noel", "anniversaire"],
    bougie: ["fete-des-meres", "noel", "anniversaire"],
    montre: ["fete-des-peres", "noel", "anniversaire"],
    alcool: ["fete-des-peres", "noel", "anniversaire"],
    parfum: ["fete-des-meres", "fete-des-peres", "saint-valentin", "noel", "anniversaire"],
    coffret: ["fete-des-meres", "fete-des-peres", "noel", "saint-valentin", "anniversaire"],
    maroquinerie: ["fete-des-meres", "fete-des-peres", "noel", "anniversaire"],
    jouet: ["noel", "anniversaire", "paques"],
    bebe: ["naissance"],
    chocolat: ["paques", "noel", "saint-valentin"],
    livre: ["noel", "anniversaire", "fete-des-peres"],
    tech: ["noel", "anniversaire", "fete-des-peres"],
    jeu_video: ["noel", "anniversaire"],
    sport: ["noel", "anniversaire", "fete-des-peres"],
    deco: ["fete-des-meres", "noel", "anniversaire"],
    cuisine: ["fete-des-meres", "noel", "anniversaire"],
    the_cafe: ["fete-des-meres", "noel", "anniversaire"],
    mode: ["noel", "anniversaire"],
    papeterie: ["noel", "anniversaire"],
  };
  return map[category] || [];
}

function suggestRecipients(category, title) {
  const t = title.toLowerCase();
  const r = [];
  if (/femme|maman|élégante|chic|girly/.test(t) || /eau de parfum/.test(t)) r.push("femme");
  if (/homme|papa|gentleman/.test(t) || /eau de toilette homme/.test(t)) r.push("homme");
  if (/enfant|garçon|fille|kids/.test(t) || category === "jouet") r.push("enfant");
  if (/ado/.test(t)) r.push("ado");
  if (/bébé|naissance/.test(t) || category === "bebe") r.push("bebe");
  if (/couple|amoureux/.test(t)) r.push("couple");
  if (r.length === 0) {
    if (["bijou", "maquillage", "beaute", "bougie"].includes(category)) r.push("femme");
    if (["alcool"].includes(category)) r.push("homme");
    if (category === "jouet") r.push("enfant");
    if (r.length === 0) r.push("femme", "homme");
  }
  return r;
}

async function processAsin(asin, existingSlugs) {
  try {
    const html = await fetchHTML(`https://www.amazon.fr/dp/${asin}`);
    const title = parseTitle(html);
    const image = parseImage(html);
    const price = parsePrice(html);
    if (!title || !image || !price) return null;
    if (!isCadeau(title)) return { _skip: "blacklist" };
    const cat = categorize(title);
    if (cat === "autre") return { _skip: "autre" };
    const slug = `${slugify(title)}-${asin.slice(-6).toLowerCase()}`;
    if (existingSlugs.has(slug)) return { _skip: "slug" };

    const rating = parseRating(html);
    const reviews = parseReviews(html);
    const imgFilename = `${slug}.jpg`;
    const imgPath = path.join(IMG_DIR, imgFilename);
    await downloadImage(image, imgPath);
    processImage(imgPath);

    return {
      asin, slug, title,
      category: cat,
      occasions: suggestOccasions(cat),
      recipients: suggestRecipients(cat, title),
      price,
      ...(rating ? { rating } : {}),
      ...(reviews ? { reviews_count: reviews } : {}),
      image: `/images/amazon/${imgFilename}`,
      affiliate_url: `https://www.amazon.fr/dp/${asin}?tag=${PARTNER_TAG}`,
    };
  } catch (e) {
    return null;
  }
}

async function main() {
  const data = yaml.load(fs.readFileSync(CATALOG, "utf-8"));
  const products = data.products || [];
  const existingAsins = new Set(products.map((p) => p.asin));
  const existingSlugs = new Set(products.map((p) => p.slug));

  console.log(`\n=== Ajout de ~${TARGET} nouveaux produits cadeau ===`);
  console.log(`Catalogue actuel : ${products.length} produits\n`);

  // 1. Collecter des ASIN candidats (pas déjà présents)
  const candidates = [];
  const seen = new Set();
  for (const url of SOURCE_PAGES) {
    try {
      const html = await fetchHTML(url);
      const asins = parseAsins(html);
      let added = 0;
      for (const a of asins) {
        if (!existingAsins.has(a) && !seen.has(a)) { seen.add(a); candidates.push(a); added++; }
      }
      console.log(`  + ${String(added).padStart(3)} candidats depuis ${url.replace("https://www.amazon.fr", "")}`);
    } catch (e) {
      console.log(`  ! ${url} -> ${e.message}`);
    }
    await new Promise((r) => setTimeout(r, 800));
  }
  console.log(`\n→ ${candidates.length} ASIN candidats à traiter\n`);

  // 2. Traiter jusqu'à atteindre TARGET produits non-"autre"
  const added = [];
  let idx = 0;
  for (const asin of candidates) {
    if (added.length >= TARGET) break;
    idx++;
    const r = await processAsin(asin, existingSlugs);
    if (r && !r._skip) {
      existingSlugs.add(r.slug);
      added.push(r);
      console.log(`  ✓ [${added.length}/${TARGET}] ${r.category.padEnd(11)} ${r.price.toFixed(2).padStart(6)}€  ${r.title.slice(0, 50)}`);
    }
    await new Promise((res) => setTimeout(res, 650));
  }

  // 3. Fusionner, trier, réécrire
  const merged = [...products, ...added];
  merged.sort((a, b) => {
    if (a.category !== b.category) return a.category.localeCompare(b.category);
    return (b.rating || 0) - (a.rating || 0);
  });

  fs.writeFileSync(CATALOG, yaml.dump({
    generated_at: new Date().toISOString(),
    count: merged.length,
    products: merged,
  }, { lineWidth: 200, noRefs: true }), "utf-8");

  console.log(`\n=== Résultat ===`);
  console.log(`✓ ${added.length} produits ajoutés | total catalogue : ${merged.length}`);
  const byCat = {};
  for (const p of added) byCat[p.category] = (byCat[p.category] || 0) + 1;
  console.log(`Nouveaux par catégorie :`, byCat);
  console.log(`→ ${CATALOG}\n`);
}

main().catch((e) => { console.error(e); process.exit(1); });
