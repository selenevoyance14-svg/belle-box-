#!/usr/bin/env python3
"""Revert accents on image paths only (image: / ogImage: lines).

The accent fix script accidentally accented filenames in
`image:` paths but the actual files on disk are ASCII.
"""
import re
import unicodedata
from pathlib import Path

CONTENT_DIR = Path(__file__).resolve().parent.parent / "content"

# Match lines like `image: "/path/to/file.ext"` or `ogImage: "..."` in frontmatter
LINE_RE = re.compile(r'^(\s*(?:image|ogImage|cover|thumbnail)\s*:\s*)"([^"]+)"\s*$', re.MULTILINE)


def deaccent(s: str) -> str:
    # NFD decomposes accented chars to base + combining mark
    nfd = unicodedata.normalize("NFD", s)
    return "".join(c for c in nfd if not unicodedata.combining(c))


def fix_file(path: Path) -> int:
    text = path.read_text(encoding="utf-8")
    changes = 0

    def repl(m: re.Match) -> str:
        nonlocal changes
        prefix = m.group(1)
        url = m.group(2)
        if url.startswith("/") or url.startswith("http"):
            new_url = deaccent(url)
            if new_url != url:
                changes += 1
            return f'{prefix}"{new_url}"'
        return m.group(0)

    new_text = LINE_RE.sub(repl, text)
    if changes:
        path.write_text(new_text, encoding="utf-8")
    return changes


def main() -> None:
    total = 0
    files = 0
    for mdx in CONTENT_DIR.rglob("*.mdx"):
        n = fix_file(mdx)
        if n:
            files += 1
            total += n
    print(f"Reverted accents in image paths: {total} fixes across {files} files")


if __name__ == "__main__":
    main()
