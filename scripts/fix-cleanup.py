#!/usr/bin/env python3
"""Cleanup pass after the bulk accent fix:
1) Revert accents inside URLs (markdown links and href= values).
2) Revert known false-positive present-tense verbs that were
   incorrectly upgraded to past participles.
"""
import re
import unicodedata
from pathlib import Path

CONTENT_DIR = Path(__file__).resolve().parent.parent / "content"

# Match markdown link URL part: [text](url)
MD_URL_RE = re.compile(r"(\]\()([^)]+)(\))")
# Match href="url"
HREF_RE = re.compile(r'(href\s*=\s*")([^"]+)(")')


def deaccent(s: str) -> str:
    nfd = unicodedata.normalize("NFD", s)
    return "".join(c for c in nfd if not unicodedata.combining(c))


def fix_urls(text: str) -> tuple[str, int]:
    count = 0

    def md_repl(m: re.Match) -> str:
        nonlocal count
        url = m.group(2)
        new = deaccent(url)
        if new != url:
            count += 1
        return f"{m.group(1)}{new}{m.group(3)}"

    text = MD_URL_RE.sub(md_repl, text)

    def href_repl(m: re.Match) -> str:
        nonlocal count
        url = m.group(2)
        new = deaccent(url)
        if new != url:
            count += 1
        return f"{m.group(1)}{new}{m.group(3)}"

    text = HREF_RE.sub(href_repl, text)
    return text, count


# Verbs that often appear in present tense and were wrongly accented.
# Map: bad spelling -> correct (no-accent) spelling.
# Only revert in clearly verbal contexts (subject + verb).
VERB_FALSE_POSITIVES = {
    "Glowria proposé": "Glowria propose",
    "Blissim proposé": "Blissim propose",
    "Biotyfull Box proposé": "Biotyfull Box propose",
    "Biotyfull proposé": "Biotyfull propose",
    "Lookfantastic proposé": "Lookfantastic propose",
    "LookFantastic proposé": "LookFantastic propose",
    "Prescription Lab proposé": "Prescription Lab propose",
    "My Little Box proposé": "My Little Box propose",
    "Belle au Naturel proposé": "Belle au Naturel propose",
    "Nuoo proposé": "Nuoo propose",
    "Mademoiselle Confettis proposé": "Mademoiselle Confettis propose",
    "L'Aroma Box proposé": "L'Aroma Box propose",
    "Amazon proposé": "Amazon propose",
    "marque proposé": "marque propose",
    "site proposé": "site propose",
    "boutique proposé": "boutique propose",
    "Marque proposé": "Marque propose",
    "Site proposé": "Site propose",
    "valeur dépassé": "valeur dépasse",
    "qui dépassé": "qui dépasse",
    "elle dépassé": "elle dépasse",
    "il dépassé": "il dépasse",
    "ce qui dépassé": "ce qui dépasse",
    "elle propose": "elle propose",
    "il propose": "il propose",
    # propose (verb) followed by "des/un/une/le/la"
}

# Generic patterns: "<Word> propose <article>" should be "propose" not "proposé"
PROPOSE_RE = re.compile(r"\bproposé\b(?=\s+(des|un|une|le|la|les|aux|au|à|d['e]|de\s|du\s|sa|son|ses|notre|votre|leur))", re.IGNORECASE)
DEPASSE_RE = re.compile(r"\bdépassé\b(?=\s+(les|le|la|des|un|une|de|d['e]|à|en|son|sa|ses|leur))", re.IGNORECASE)


def fix_verbs(text: str) -> tuple[str, int]:
    count = 0
    for bad, good in VERB_FALSE_POSITIVES.items():
        new = text.replace(bad, good)
        if new != text:
            count += text.count(bad)
            text = new
    new, n = PROPOSE_RE.subn(lambda m: "propose" if m.group(0)[0].islower() else "Propose", text)
    text = new
    count += n
    new, n = DEPASSE_RE.subn(lambda m: "dépasse" if m.group(0)[0].islower() else "Dépasse", text)
    text = new
    count += n
    return text, count


def fix_file(path: Path) -> tuple[int, int]:
    text = path.read_text(encoding="utf-8")
    text, url_n = fix_urls(text)
    text, verb_n = fix_verbs(text)
    if url_n or verb_n:
        path.write_text(text, encoding="utf-8")
    return url_n, verb_n


def main() -> None:
    total_url = 0
    total_verb = 0
    files = 0
    for mdx in CONTENT_DIR.rglob("*.mdx"):
        u, v = fix_file(mdx)
        if u or v:
            files += 1
            total_url += u
            total_verb += v
    print(f"URL fixes: {total_url} | Verb fixes: {total_verb} | Files: {files}")


if __name__ == "__main__":
    main()
