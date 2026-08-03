import json
import re
import urllib.request
from html import unescape

BASE = "https://fivegrouptrading.com/products/"
PAGES = 12

BLOCK_RE = re.compile(
    r'<div class="col-lg-3[^"]*productBlock\s+([^"]+)"[^>]*>.*?'
    r'<a href="([^"]+)"[^>]*>.*?'
    r'<img src="([^"]+)"[^>]*alt="([^"]*)"[^>]*>.*?'
    r'<h3[^>]*>\s*(.*?)\s*</h3>.*?'
    r'<p class="mt-0 w-100">\s*(.*?)\s*(?:<!--|<)',
    re.S | re.I,
)

CAT_RE = re.compile(
    r'<a[^>]+href="(https://fivegrouptrading.com/products/\?cat=[^"]+)"[^>]*>\s*([^<]+?)\s*</a>',
    re.I,
)


def fetch(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=30) as resp:
        return resp.read().decode("utf-8", "ignore")


def clean(text: str) -> str:
    text = re.sub(r"<!--.*?-->", "", text, flags=re.S)
    text = re.sub(r"<[^>]+>", "", text)
    return unescape(re.sub(r"\s+", " ", text)).strip()


def slugify(name: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")
    return slug or "item"


def scrape_page(page: int):
    url = BASE if page == 1 else f"{BASE}page/{page}/"
    html = fetch(url)
    products = []
    for match in BLOCK_RE.finditer(html):
        category_slug, link, image, alt, title, brand = match.groups()
        name = clean(title)
        products.append({
            "id": slugify(name)[:80],
            "name": name,
            "brand": clean(brand),
            "image": image,
            "alt": clean(alt) or name,
            "url": link,
            "categorySlug": category_slug.lower().strip(),
        })
    return products, html


all_products = []
categories = []

for p in range(1, PAGES + 1):
    items, html = scrape_page(p)
    print(f"page {p}: {len(items)} products", flush=True)
    all_products.extend(items)
    if p == 1:
        categories = [
            {
                "id": clean(name).lower().replace(" & ", "-").replace(" ", "-"),
                "name": clean(name),
                "slug": re.search(r"cat=([^&\"]+)", href, re.I).group(1).lower() if (href := clean(href_raw)) else slugify(clean(name)),
                "url": clean(href_raw),
            }
            for href_raw, name in CAT_RE.findall(html)
        ]

seen = set()
unique = []
for prod in all_products:
    key = prod["name"].lower()
    if key not in seen:
        seen.add(key)
        unique.append(prod)

# Add "All" category at front
cat_slugs = {c["slug"] for c in categories}
for prod in unique:
    if prod["categorySlug"] not in cat_slugs:
        categories.append({
            "id": prod["categorySlug"],
            "name": prod["categorySlug"].replace("-", " ").title(),
            "slug": prod["categorySlug"],
            "url": f"{BASE}?cat={prod['categorySlug']}",
        })
        cat_slugs.add(prod["categorySlug"])

print(f"TOTAL unique products: {len(unique)}", flush=True)
print(f"TOTAL categories: {len(categories)}", flush=True)

output = {
    "categories": [{"id": "all", "name": "All", "slug": "all", "url": BASE}] + categories,
    "products": unique,
}

with open("scripts/products-raw.json", "w", encoding="utf-8") as f:
    json.dump(output, f, indent=2, ensure_ascii=False)

# print category distribution
from collections import Counter
counts = Counter(p["categorySlug"] for p in unique)
print(json.dumps(dict(counts.most_common()), indent=2))
