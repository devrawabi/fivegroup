import json
import re
import urllib.request
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
RAW = json.loads((ROOT / "scripts/products-raw.json").read_text(encoding="utf-8"))
PRODUCTS_DIR = ROOT / "public/products"
CATEGORIES_DIR = PRODUCTS_DIR / "_categories"

CATEGORY_META = {
    "all": {"name": "All"},
    "beverages": {"name": "Beverages", "banner": "https://fivegrouptrading.com/wp-content/uploads/2022/03/cat-tea.jpg"},
    "chocalates-confectionery": {
        "name": "Chocolates & Confectionery",
        "banner": "https://fivegrouptrading.com/wp-content/uploads/2022/03/cat-jam.jpg",
    },
    "flours": {"name": "Flours", "banner": "https://fivegrouptrading.com/wp-content/uploads/2022/03/cat-salt.jpg"},
    "chips": {"name": "Chips", "banner": "https://fivegrouptrading.com/wp-content/uploads/2022/03/cat-canedfish.jpg"},
    "biscuits-rusk": {"name": "Biscuits & Rusks", "banner": "https://fivegrouptrading.com/wp-content/uploads/2022/03/cat-jam.jpg"},
    "stock-cubes-powders": {"name": "Stock Cubes & Powders", "banner": "https://fivegrouptrading.com/wp-content/uploads/2022/03/cat-salt.jpg"},
    "packet-foods": {"name": "Packet Foods", "banner": "https://fivegrouptrading.com/wp-content/uploads/2022/03/cat-canedfish.jpg"},
    "non-food": {"name": "Non Food", "banner": "https://fivegrouptrading.com/wp-content/uploads/2022/03/cat-salt.jpg"},
    "rice": {"name": "Rice", "banner": "https://fivegrouptrading.com/wp-content/uploads/2022/03/cat-salt.jpg"},
    "vinegar": {"name": "Vinegar", "banner": "https://fivegrouptrading.com/wp-content/uploads/2022/03/cat_pickle.jpg"},
    "spreads": {"name": "Spreads", "banner": "https://fivegrouptrading.com/wp-content/uploads/2022/03/cat-jam.jpg"},
    "honey": {"name": "Honey", "banner": "https://fivegrouptrading.com/wp-content/uploads/2022/03/cat-jam.jpg"},
    "jam": {"name": "Jam", "banner": "https://fivegrouptrading.com/wp-content/uploads/2022/03/cat-jam.jpg"},
    "pickles": {"name": "Pickles", "banner": "https://fivegrouptrading.com/wp-content/uploads/2022/03/cat_pickle.jpg"},
    "instant-drinks": {"name": "Instant Drinks", "banner": "https://fivegrouptrading.com/wp-content/uploads/2022/03/cat-tea.jpg"},
    "tinned-food": {"name": "Tinned Food", "banner": "https://fivegrouptrading.com/wp-content/uploads/2022/03/cat-canedfish.jpg"},
}

PACK_RE = re.compile(r"(\d+\s*[xX×]\s*[\d.]+\s*(?:ML|GM|KG|G|L|LT|LTR|PCS|PC))", re.I)


def format_notes(name: str) -> str:
    match = PACK_RE.search(name)
    if match:
        return match.group(1).upper().replace(" ", "")
    return "Wholesale pack format"


def format_name(name: str) -> str:
    return re.sub(r"\s+", " ", name).strip()


def file_ext(url: str) -> str:
    ext = Path(urlparse(url).path).suffix.lower()
    return ext if ext in {".png", ".jpg", ".jpeg", ".webp", ".gif"} else ".png"


def local_product_image(product_id: str, category: str, remote_url: str) -> str:
    return f"/products/{category}/{product_id}{file_ext(remote_url)}"


def download_file(url: str, dest: Path) -> bool:
    if dest.exists() and dest.stat().st_size > 0:
        return True
    dest.parent.mkdir(parents=True, exist_ok=True)
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            dest.write_bytes(resp.read())
        return True
    except Exception as exc:
        print(f"  download failed {dest}: {exc}")
        return False


products = []
seen_ids = set()
for item in RAW["products"]:
    pid = item["id"]
    if pid in seen_ids:
        pid = f"{pid}-{len(seen_ids)}"
    seen_ids.add(pid)

    slug = item["categorySlug"]
    remote_image = item["image"]
    local_image = local_product_image(pid, slug, remote_image)
    dest = ROOT / "public" / local_image.lstrip("/")

    print(f"Fetching {slug}/{dest.name}...", flush=True)
    if download_file(remote_image, dest):
        image = local_image
    else:
        image = remote_image

    products.append(
        {
            "id": pid,
            "name": format_name(item["name"]),
            "notes": format_notes(item["name"]),
            "image": image,
            "priceText": "Wholesale",
            "brand": item["brand"].strip() or "FIVE GROUP",
            "category": slug,
            "url": item["url"],
        }
    )

# Download category banner images
for slug, meta in CATEGORY_META.items():
    if slug == "all" or "banner" not in meta:
        continue
    ext = file_ext(meta["banner"])
    banner_local = f"/products/_categories/{slug}{ext}"
    dest = ROOT / "public" / banner_local.lstrip("/")
    if download_file(meta["banner"], dest):
        meta["image"] = banner_local
    else:
        meta["image"] = meta["banner"]

# Category images: banner local path, else first product in category
for slug, meta in CATEGORY_META.items():
    if slug == "all":
        first = products[0]
        meta["image"] = first["image"]
        continue
    if "image" not in meta:
        first = next((p for p in products if p["category"] == slug), None)
        meta["image"] = first["image"] if first else meta.get("banner", "")

categories = []
for slug, meta in CATEGORY_META.items():
    count = len([p for p in products if slug == "all" or p["category"] == slug])
    categories.append(
        {
            "id": slug,
            "slug": slug,
            "name": meta["name"],
            "image": meta["image"],
            "count": len(products) if slug == "all" else count,
        }
    )

ORDER = [
    "all",
    "chocalates-confectionery",
    "beverages",
    "flours",
    "chips",
    "biscuits-rusk",
    "stock-cubes-powders",
    "packet-foods",
    "non-food",
    "rice",
    "vinegar",
    "spreads",
    "honey",
    "jam",
    "pickles",
    "instant-drinks",
    "tinned-food",
]
categories.sort(key=lambda c: ORDER.index(c["slug"]) if c["slug"] in ORDER else 99)

out = ROOT / "src/data/catalog.js"
out.parent.mkdir(parents=True, exist_ok=True)

with out.open("w", encoding="utf-8") as f:
    f.write("/** Auto-generated from fivegrouptrading.com/products catalog */\n\n")
    f.write(f"export const PRODUCT_CATEGORIES = {json.dumps(categories, indent=2)};\n\n")
    f.write(f"export const CATALOG = {json.dumps(products, indent=2)};\n\n")
    f.write("export const PRODUCTS_PER_PAGE = 12;\n\n")
    f.write(
        "export const FEATURED_HOME_PRODUCT_IDS = [\n"
        "  'coco-queen-lychee-juice-with-nata-de-coco-24x320ml',\n"
        "  'coco-queen-melon-juice-with-nata-de-coco-24x320ml',\n"
        "  'coco-queen-straw-juice-with-nata-de-coco-24x320ml',\n"
        "  'coco-queen-mango-juice-with-nata-de-coco-24x320ml',\n"
        "  'coco-queen-orange-juice-with-nata-de-coco-24x320ml',\n"
        "  'coco-queen-pineapple-juice-with-nata-de-coco-24x320ml',\n"
        "  'coco-queen-coconut-juice-with-nata-de-coco-24x320ml',\n"
        "  '5star-luxury-cream-fudge-10x900gm',\n"
        "];\n\n"
    )
    f.write(
        "export function getFeaturedHomeProducts() {\n"
        "  const byId = new Map(CATALOG.map((product) => [product.id, product]));\n"
        "  return FEATURED_HOME_PRODUCT_IDS.map((id) => byId.get(id)).filter(Boolean);\n"
        "}\n\n"
    )
    f.write(
        "export function getProductsByCategory(categorySlug = 'all') {\n"
        "  if (!categorySlug || categorySlug === 'all') return CATALOG;\n"
        "  return CATALOG.filter((product) => product.category === categorySlug);\n"
        "}\n\n"
    )
    f.write(
        "export function getCategoryBySlug(slug) {\n"
        "  return PRODUCT_CATEGORIES.find((category) => category.slug === slug);\n"
        "}\n\n"
    )
    f.write(
        "export function getProductSpecs(product) {\n"
        "  const brand = product.brand || 'Five Group';\n"
        "  const category = product.category || '';\n"
        "  const defaults = {\n"
        "    brand,\n"
        "    origin: 'International',\n"
        "    format: product.notes,\n"
        "    caseFormat: 'As per catalog sheet',\n"
        "    storage: 'Ambient storage unless stated on pack',\n"
        "    shelfLife: 'See packaging',\n"
        "    certificates: 'Halal · ISO compliant supply chain',\n"
        "  };\n"
        "  const byCategory = {\n"
        "    beverages: { origin: 'Thailand', format: '320ml bottle', caseFormat: '24 bottles per case', storage: 'Ambient, chilled after opening', shelfLife: '24 months', certificates: 'Halal, GMP, HACCP' },\n"
        "    'chocalates-confectionery': { origin: 'Poland', format: 'Retail & bulk packs', caseFormat: '10–14 units per carton', storage: 'Cool & dry (16–20°C)', shelfLife: '12 months', certificates: 'Halal, ISO 22000' },\n"
        "    'non-food': { origin: 'GCC / International', format: 'Household pack sizes', caseFormat: 'Multi-pack promo cartons', storage: 'Dry storage', shelfLife: '36 months', certificates: 'Quality assured imports' },\n"
        "    'tinned-food': { origin: 'International', format: 'Tinned retail packs', caseFormat: '12–24 tins per case', storage: 'Cool, dry place', shelfLife: '24–36 months', certificates: 'Halal where applicable' },\n"
        "    jam: { origin: 'International', format: 'Glass jar', caseFormat: '12 jars per case', storage: 'Ambient', shelfLife: '18 months', certificates: 'Halal' },\n"
        "    pickles: { origin: 'International', format: 'Glass jar', caseFormat: '12 jars per case', storage: 'Ambient', shelfLife: '24 months', certificates: 'Halal' },\n"
        "    rice: { origin: 'India / Pakistan', format: 'PP bag', caseFormat: '10kg / 20kg sacks', storage: 'Dry, ventilated', shelfLife: '24 months', certificates: 'Food-grade handling' },\n"
        "  };\n"
        "  return { ...defaults, ...(byCategory[category] || {}) };\n"
        "}\n"
    )

print(f"Wrote {out} with {len(products)} products and {len(categories)} categories")
