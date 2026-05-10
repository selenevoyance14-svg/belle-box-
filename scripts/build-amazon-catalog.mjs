#!/usr/bin/env node
/**
 * Construit un catalogue Amazon de cadeaux à partir des pages
 * bestsellers/most-wished-for/most-gifted d'Amazon.fr.
 *
 * Pour chaque ASIN découvert : scrape titre/image/prix/note/avis.
 * Catégorise et associe automatiquement à des occasions/destinataires.
 */

import fs from "fs";
import path from "path";
import https from "https";
import zlib from "zlib";
import yaml from "js-yaml";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const CATALOG = path.join(ROOT, "data", "amazon-catalog.yaml");
const IMG_DIR = path.join(ROOT, "public", "images", "amazon");
const PARTNER_TAG = "lebrunnathali-21";

fs.mkdirSync(IMG_DIR, { recursive: true });

// Sources d'ASIN : pages publiques Amazon.fr qui répondent (testées)
const SOURCE_PAGES = [
  "https://www.amazon.fr/gp/bestsellers/",
  "https://www.amazon.fr/gp/most-wished-for/",
  "https://www.amazon.fr/gp/most-gifted/",
  "https://www.amazon.fr/gp/bestsellers/toys",
  "https://www.amazon.fr/gp/bestsellers/beauty",
  "https://www.amazon.fr/gp/bestsellers/electronics",
  "https://www.amazon.fr/gp/bestsellers/grocery",
  "https://www.amazon.fr/gp/bestsellers/baby",
  "https://www.amazon.fr/gp/bestsellers/sports",
  "https://www.amazon.fr/gp/bestsellers/kitchen",
  "https://www.amazon.fr/gp/bestsellers/books",
  "https://www.amazon.fr/gp/bestsellers/handmade",
  "https://www.amazon.fr/gp/bestsellers/computers",
  "https://www.amazon.fr/gp/bestsellers/videogames",
];

// Blacklist : exclure les produits clairement pas-cadeau
const BLACKLIST = [
  "papier toilette", "lessive", "shampooing dosette",
  "batterie auto", "huile moteur", "pneu",
  "cartouche imprimante", "câble usb",
  "papier alu", "sac poubelle", "javel", "détergent",
  "vis", "boulon", "rallonge électrique",
  "ration militaire", "destop", "couches pampers",
  "ampoule led", "anti-puce",
];

function categorize(title) {
  const t = title.toLowerCase();
  if (/parfum|eau de toilette|eau de parfum|cologne|lancôme|chanel|dior|guerlain|hugo boss|paco rabanne|yves saint laurent/.test(t)) return "parfum";
  if (/bijou|collier|bracelet|bague|boucle d'oreille|pandora|swarovski|argent 925|or 18k/.test(t)) return "bijou";
  if (/montre|festina|casio|garmin|fossil|seiko/.test(t)) return "montre";
  if (/lego|playmobil|barbie|poupée|jouet|peluche|funko|nerf|jeu de société|puzzle/.test(t)) return "jouet";
  if (/chocolat|lindt|ferrero|kinder|milka|bonbon|confiserie|praliné|truffe|nutella|tic-tac/.test(t)) return "chocolat";
  if (/bougie|yankee|diptyque|durance|maison parfumée|rituals/.test(t)) return "bougie";
  if (/coffret|kit cadeau|set cadeau|panier garni|box cadeau/.test(t)) return "coffret";
  if (/livre|roman|bd|manga|encyclopédie|guide|recettes/.test(t)) return "livre";
  if (/echo|kindle|airpod|airtag|tablette|fire|bluetooth|enceinte|casque audio|smartwatch|apple watch/.test(t)) return "tech";
  if (/maquillage|rouge à lèvres|palette|fard|mascara|fond de teint/.test(t)) return "maquillage";
  if (/crème|sérum|soin|masque visage|hydratant|lotion|gommage|gel douche|spa/.test(t)) return "beaute";
  if (/thé|café|infusion|rooibos|kusmi|nespresso|tassimo/.test(t)) return "the_cafe";
  if (/vin|champagne|whisky|rhum|cognac|gin|vodka|bière artisanale|spiritueux/.test(t)) return "alcool";
  if (/déco|décoration|cadre photo|vase|coussin|plaid|lampe/.test(t)) return "deco";
  if (/cuisine|robot culinaire|machine à café|mug|tasse|verre|moule à gâteau/.test(t)) return "cuisine";
  if (/sac|portefeuille|maroquinerie|étui|trousse à maquillage/.test(t)) return "maroquinerie";
  if (/foulard|écharpe|chaussette|bonnet|gants|pull|chemise/.test(t)) return "mode";
  if (/jeu vidéo|playstation|nintendo|xbox|switch|console/.test(t)) return "jeu_video";
  if (/sport|yoga|fitness|haltère|tapis de yoga|raquette|ballon/.test(t)) return "sport";
  if (/papeterie|stylo|carnet|agenda|journal intime/.test(t)) return "papeterie";
  if (/bébé|naissance|biberon|doudou|hochet/.test(t)) return "bebe";
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
      .get(
        url,
        {
          headers: {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
            "Accept-Language": "fr-FR,fr;q=0.9",
            "Accept-Encoding": "gzip, deflate",
            Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          },
          timeout: 25000,
        },
        (res) => {
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
        }
      )
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

function parseAsins(html) {
  const matches = html.matchAll(/(?:data-asin="|\/dp\/|"asin":")([A-Z0-9]{10})/g);
  return [...new Set([...matches].map((m) => m[1]))];
}

function parsePrice(html) {
  const m = html.match(/"priceAmount":\s*([0-9]+\.?[0-9]*)/);
  if (m) return parseFloat(m[1]);
  return null;
}

function parseRating(html) {
  const m = html.match(/title="([0-9],[0-9])\s+sur\s+5\s+étoiles"/);
  if (m) return parseFloat(m[1].replace(",", "."));
  return null;
}

function parseReviews(html) {
  const m = html.match(/aria-label="([0-9\s ]+)\s+Commentaires?"/);
  if (m) return parseInt(m[1].replace(/[\s ]/g, ""), 10);
  const m2 = html.match(/acrCustomerReviewText[^>]*>\(([0-9\s ]+)\)/);
  if (m2) return parseInt(m2[1].replace(/[\s ]/g, ""), 10);
  return null;
}

function parseImage(html) {
  const hi = html.match(/"hiRes":"(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+\.jpg)"/);
  if (hi) return hi[1];
  const lg = html.match(/"large":"(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+\.jpg)"/);
  if (lg) return lg[1];
  return null;
}

function parseTitle(html) {
  const m = html.match(/id="productTitle"[^>]*>([^<]+)</);
  if (m) return m[1].trim().replace(/\s+/g, " ");
  return null;
}

function slugify(s) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

function suggestOccasions(category) {
  const map = {
    parfum: ["fete-des-meres", "fete-des-peres", "saint-valentin", "noel", "anniversaire"],
    bijou: ["fete-des-meres", "saint-valentin", "noel", "anniversaire"],
    montre: ["fete-des-peres", "noel", "anniversaire"],
    jouet: ["noel", "anniversaire", "paques"],
    chocolat: ["paques", "noel", "saint-valentin", "fete-des-meres"],
    bougie: ["fete-des-meres", "noel", "anniversaire"],
    coffret: ["fete-des-meres", "fete-des-peres", "noel", "saint-valentin", "anniversaire"],
    livre: ["noel", "anniversaire", "fete-des-meres", "fete-des-peres"],
    tech: ["noel", "anniversaire", "fete-des-peres"],
    maquillage: ["fete-des-meres", "noel", "anniversaire"],
    beaute: ["fete-des-meres", "noel", "anniversaire"],
    the_cafe: ["fete-des-meres", "noel", "anniversaire"],
    alcool: ["fete-des-peres", "noel", "anniversaire"],
    deco: ["fete-des-meres", "noel", "anniversaire"],
    cuisine: ["fete-des-meres", "noel", "anniversaire"],
    maroquinerie: ["fete-des-meres", "fete-des-peres", "noel", "anniversaire"],
    mode: ["noel", "anniversaire"],
    jeu_video: ["noel", "anniversaire"],
    sport: ["fete-des-peres", "noel", "anniversaire"],
    papeterie: ["noel", "anniversaire"],
    bebe: ["naissance", "noel", "anniversaire"],
  };
  return map[category] || ["noel", "anniversaire"];
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
    if (["alcool", "outils"].includes(category)) r.push("homme");
    if (category === "jouet") r.push("enfant");
    if (r.length === 0) r.push("femme", "homme");
  }
  return r;
}

async function processAsin(asin) {
  try {
    const html = await fetchHTML(`https://www.amazon.fr/dp/${asin}`);
    const title = parseTitle(html);
    const image = parseImage(html);
    const price = parsePrice(html);
    if (!title || !image || !price) return null;
    if (!isCadeau(title)) return { _skip: true, asin, title };
    const rating = parseRating(html);
    const reviews = parseReviews(html);
    const cat = categorize(title);
    const slug = `${slugify(title)}-${asin.slice(-6).toLowerCase()}`;

    const imgFilename = `${slug}.jpg`;
    const imgPath = path.join(IMG_DIR, imgFilename);
    if (!fs.existsSync(imgPath)) {
      await downloadImage(image, imgPath);
    }

    return {
      asin,
      slug,
      title,
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
  console.log(`\n=== Catalogue Amazon Cadeaux ===`);
  console.log(`Sources : ${SOURCE_PAGES.length} pages bestsellers/wished/gifted\n`);

  // 1. Récupérer tous les ASIN depuis les pages bestsellers
  const seenAsins = new Set();
  for (const url of SOURCE_PAGES) {
    try {
      const html = await fetchHTML(url);
      const asins = parseAsins(html);
      let added = 0;
      for (const a of asins) {
        if (!seenAsins.has(a)) {
          seenAsins.add(a);
          added++;
        }
      }
      console.log(`  + ${added.toString().padStart(3)} nouveaux ASINs depuis ${url.replace("https://www.amazon.fr", "")}`);
    } catch (e) {
      console.log(`  ! ${url} -> ${e.message}`);
    }
    await new Promise((r) => setTimeout(r, 800));
  }

  console.log(`\n→ Total : ${seenAsins.size} ASIN uniques à traiter\n`);

  // 2. Pour chaque ASIN, scraper la fiche
  const products = [];
  let skipped = 0, ko = 0, idx = 0;
  for (const asin of seenAsins) {
    idx++;
    const r = await processAsin(asin);
    if (r === null) {
      ko++;
      if (ko <= 3) console.log(`  ✗ [${idx}/${seenAsins.size}] ${asin}`);
    } else if (r._skip) {
      skipped++;
    } else {
      products.push(r);
      console.log(`  ✓ [${idx}/${seenAsins.size}] ${asin} ${r.category.padEnd(12)} ${r.price.toFixed(2).padStart(6)}€  ${r.title.slice(0, 50)}`);
    }
    await new Promise((res) => setTimeout(res, 700));
  }

  // 3. Trier et sauvegarder
  products.sort((a, b) => {
    if (a.category !== b.category) return a.category.localeCompare(b.category);
    return (b.rating || 0) - (a.rating || 0);
  });

  const result = {
    generated_at: new Date().toISOString(),
    count: products.length,
    products,
  };

  fs.writeFileSync(CATALOG, yaml.dump(result, { lineWidth: 200, noRefs: true }), "utf-8");

  const byCat = {};
  for (const p of products) byCat[p.category] = (byCat[p.category] || 0) + 1;
  console.log(`\n=== Résultat ===`);
  console.log(`✓ ${products.length} produits | ⊘ ${skipped} blacklist | ✗ ${ko} KO`);
  console.log(`Catégories :`, byCat);
  console.log(`→ ${CATALOG}\n`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
