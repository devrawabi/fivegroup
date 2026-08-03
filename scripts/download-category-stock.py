import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "public/categories/home"
QUERY = "?w=900&h=1200&fit=crop&q=85"

# Verified Unsplash food photography — warm, consistent styling
HOME_CATEGORY_STOCK = {
    "chocolates-confectionery": {
        "file": "chocolates-confectionery.jpg",
        "url": f"https://images.unsplash.com/photo-1549007953-2f2dc0b24019{QUERY}",
    },
    "beverages": {
        "file": "beverages.jpg",
        "url": f"https://images.unsplash.com/photo-1546173159-315724a31696{QUERY}",
    },
    "flours": {
        "file": "flours.jpg",
        "url": f"https://images.unsplash.com/photo-1586444248902-2f64eddc13df{QUERY}",
    },
    "chips": {
        "file": "chips.jpg",
        "url": f"https://images.unsplash.com/photo-1566478989037-eec170784d0b{QUERY}",
    },
}


def download(url: str, dest: Path) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=60) as resp:
        dest.write_bytes(resp.read())
    print(f"Saved {dest.relative_to(ROOT)}", flush=True)


if __name__ == "__main__":
    for meta in HOME_CATEGORY_STOCK.values():
        download(meta["url"], OUT_DIR / meta["file"])
    print("Done.")
