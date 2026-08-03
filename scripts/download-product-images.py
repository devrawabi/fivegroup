import json
import re
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CATALOG_JS = ROOT / "src/data/catalog.js"
PRODUCTS_DIR = ROOT / "public/products"

# Extract CATALOG JSON from catalog.js
catalog_text = CATALOG_JS.read_text(encoding="utf-8")
match = re.search(r"export const CATALOG = (\[[\s\S]*?\]);", catalog_text)
if not match:
    raise SystemExit("Could not parse CATALOG from catalog.js")

products = json.loads(match.group(1))


def safe_filename(product_id: str, url: str) -> str:
    ext = Path(urllib.request.urlparse(url).path).suffix.lower() or ".png"
    if ext not in {".png", ".jpg", ".jpeg", ".webp", ".gif"}:
        ext = ".png"
    return f"{product_id}{ext}"


def download(url: str, dest: Path) -> bool:
    if dest.exists() and dest.stat().st_size > 0:
        return True
    dest.parent.mkdir(parents=True, exist_ok=True)
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            dest.write_bytes(resp.read())
        return True
    except Exception as exc:
        print(f"  FAIL {dest.name}: {exc}")
        return False


mapping = {}
ok = 0
fail = 0

for product in products:
    category = product.get("category", "uncategorized")
    product_id = product["id"]
    url = product.get("image", "")
    if not url:
        fail += 1
        continue

    filename = safe_filename(product_id, url)
    rel_path = f"/products/{category}/{filename}"
    dest = PRODUCTS_DIR / category / filename

    print(f"Downloading {category}/{filename}...", flush=True)
    if download(url, dest):
        mapping[product_id] = rel_path
        ok += 1
    else:
        mapping[product_id] = url
        fail += 1

# Update products in catalog.js with local paths
for product in products:
    if product["id"] in mapping:
        product["image"] = mapping[product["id"]]

# Update category images to first local product in each category
cat_match = re.search(r"export const PRODUCT_CATEGORIES = (\[[\s\S]*?\]);", catalog_text)
categories = json.loads(cat_match.group(1))

for cat in categories:
    if cat["slug"] == "all":
        continue
    first = next((p for p in products if p["category"] == cat["slug"]), None)
    if first and first["image"].startswith("/products/"):
        cat["image"] = first["image"]

# Rewrite catalog.js
header = "/** Auto-generated from fivegrouptrading.com/products catalog */\n\n"
helpers = catalog_text[catalog_text.find("export const PRODUCTS_PER_PAGE") :]

with CATALOG_JS.open("w", encoding="utf-8") as f:
    f.write(header)
    f.write(f"export const PRODUCT_CATEGORIES = {json.dumps(categories, indent=2)};\n\n")
    f.write(f"export const CATALOG = {json.dumps(products, indent=2)};\n\n")
    f.write(helpers)

summary_path = ROOT / "scripts/product-image-map.json"
summary_path.write_text(json.dumps(mapping, indent=2), encoding="utf-8")

print(f"\nDone: {ok} downloaded, {fail} failed")
print(f"Images root: {PRODUCTS_DIR}")
print(f"Mapping saved: {summary_path}")
