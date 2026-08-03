import json
import re
import urllib.request
from html import unescape
from pathlib import Path

URL = "https://fivegrouptrading.com/clients/"
OUT_DIR = Path(__file__).resolve().parent.parent / "public" / "clients"


def fetch(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=30) as resp:
        return resp.read().decode("utf-8", "ignore")


def clean(text: str) -> str:
    text = re.sub(r"<!--.*?-->", "", text, flags=re.S)
    text = re.sub(r"<[^>]+>", "", text)
    return unescape(re.sub(r"\s+", " ", text)).strip()


def slugify(name: str, index: int) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")
    return slug or f"client-{index}"


def main():
    html = fetch(URL)
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    # Match img tags in client section (site uses <Img> casing)
    img_re = re.compile(
        r'<[Ii]mg[^>]+src=["\']([^"\']+)["\'][^>]*(?:alt=["\']([^"\']*)["\'])?',
        re.I,
    )

    NAME_OVERRIDES = {
        "food-vorld": "Food World",
        "5a1c2d20f65d84088faf13c4": "Lulu Hypermarket",
        "103470423_2960667837362863_7529444013206024650_n": "Monoprix",
        "grand": "Grand Hypermarket",
        "rawabi": "Rawabi Group",
    }

    def name_from_src(src: str, alt: str) -> str:
        if alt and alt.lower() not in {"", "client", "logo"}:
            return clean(alt)
        filename = Path(src.split("?")[0]).stem.lower()
        filename = re.sub(r"-\d+$", "", filename)
        if filename in NAME_OVERRIDES:
            return NAME_OVERRIDES[filename]
        return filename.replace("-", " ").title()

    clients = []
    seen_urls = set()

    for match in img_re.finditer(html):
        src, alt = match.group(1), match.group(2) or ""
        src_lower = src.lower()
        if "logo" in src_lower and "five" in src_lower:
            continue
        if "wp-content/uploads" not in src_lower:
            continue
        if src in seen_urls:
            continue
        seen_urls.add(src)

        name = name_from_src(src, alt)
        clients.append({"src": src, "name": name})

    # Fallback: grab all wp-content images that aren't logos/nav
    if len(clients) < 5:
        clients = []
        seen_urls = set()
        for match in img_re.finditer(html):
            src, alt = match.group(1), match.group(2) or ""
            if "wp-content/uploads" not in src.lower():
                continue
            if any(x in src.lower() for x in ("logo", "ibird", "favicon")):
                continue
            if src in seen_urls:
                continue
            seen_urls.add(src)
            name = clean(alt) if alt and alt.lower() != "client" else ""
            clients.append({"src": src, "name": name})

    downloaded = []
    for i, client in enumerate(clients, start=1):
        src = client["src"]
        if src.startswith("//"):
            src = "https:" + src
        elif src.startswith("/"):
            src = "https://fivegrouptrading.com" + src

        ext = ".png"
        if ".jpg" in src.lower() or ".jpeg" in src.lower():
            ext = ".jpg"
        elif ".webp" in src.lower():
            ext = ".webp"
        elif ".svg" in src.lower():
            ext = ".svg"

        name = client["name"] or f"Client {i}"
        file_id = slugify(name, i)
        filename = f"{file_id}{ext}"
        dest = OUT_DIR / filename

        try:
            req = urllib.request.Request(src, headers={"User-Agent": "Mozilla/5.0"})
            with urllib.request.urlopen(req, timeout=30) as resp:
                dest.write_bytes(resp.read())
            downloaded.append({"id": file_id, "name": name, "image": f"/clients/{filename}"})
            print(f"OK {name} -> {filename}", flush=True)
        except Exception as exc:
            print(f"FAIL {src}: {exc}", flush=True)

    data_path = Path(__file__).resolve().parent.parent / "src" / "data" / "clients.js"
    data_path.parent.mkdir(parents=True, exist_ok=True)
    lines = ["export const CLIENTS = " + json.dumps(downloaded, indent=2) + ";", ""]
    data_path.write_text("\n".join(lines), encoding="utf-8")
    print(f"\nSaved {len(downloaded)} clients to {data_path}", flush=True)


if __name__ == "__main__":
    main()
