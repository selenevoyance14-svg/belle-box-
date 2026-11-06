import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";

// Contrôle l’export réel, y compris les liens produits par les composants partagés.
const root = path.resolve("out");
const origin = "https://kado-box.fr";
const files = fs.readdirSync(root, { recursive: true }).filter((name) => name.endsWith(".html") && !name.startsWith("_next/") && !["404.html", "_not-found.html", "_not-found/index.html"].includes(name));
const pages = new Map(files.map((name) => [name === "index.html" ? "/" : `/${name.replace(/(?:\/index)?\.html$/, "")}`, fs.readFileSync(path.join(root, name), "utf8")]));
const inbound = new Map();
const titles = new Set();
const failures = [];
let links = 0;
const check = (condition, message) => { if (!condition) failures.push(message); };
for (const [route, html] of pages) {
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
  check(title && !titles.has(title), `${route}: titre absent ou dupliqué`);
  titles.add(title);
  check((html.match(/<h1(?:\s|>)/g) ?? []).length === 1, `${route}: nombre de H1 incorrect`);
  check(/<meta name="description" content="[^"]+"/.test(html) || route === "/favoris", `${route}: description absente`);
  check(html.includes(`<link rel="canonical" href="${origin}${route === "/" ? "" : route}"`), `${route}: canonique incorrecte`);
  for (const [, json] of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
    try { JSON.parse(json); } catch { failures.push(`${route}: JSON-LD invalide`); }
  }
  if (/^\/(guide\/|occasion\/|destinataire\/|budget\/)/.test(route)) {
    check(html.includes('"@type":"BreadcrumbList"'), `${route}: fil d’Ariane structuré absent`);
    check(html.includes('property="og:url"'), `${route}: URL de partage absente`);
  }
  for (const [, raw] of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
    const url = new URL(raw.replaceAll("&amp;", "&"), `${origin}${route}`);
    if (url.origin !== origin) continue;
    const target = url.pathname.replace(/\/$/, "") || "/";
    if (/\.[a-z0-9]+$/i.test(target)) continue;
    links++;
    const content = pages.get(target);
    check(content, `${route}: lien cassé vers ${target}`);
    if (target !== route) inbound.set(target, (inbound.get(target) ?? 0) + 1);
    if (url.hash && content) check(content.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`), `${route}: ancre absente ${target}${url.hash}`);
  }
}
for (const route of pages.keys()) {
  if (route !== "/") check(inbound.has(route), `${route}: page orpheline`);
}
const sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
for (const [, url] of sitemap.matchAll(/<loc>(.*?)<\/loc>/g)) {
  const route = new URL(url).pathname.replace(/\/$/, "") || "/";
  check(pages.has(route), `Sitemap : page absente ${route}`);
  check(!/<meta name="robots" content="[^"]*noindex/.test(pages.get(route) ?? ""), `Sitemap : page non indexable ${route}`);
}
assert.deepEqual(failures, [], failures.join("\n"));
console.log(`${pages.size} pages et ${links} liens internes vérifiés : titres, H1, canoniques, JSON-LD, ancres, sitemap et absence de pages orphelines.`);
