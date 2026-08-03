/**
 * One-shot asset optimizer:
 * - download remote Unsplash / fivegrouptrading images into public/media
 * - convert public/products PNG files to WebP (max 900px, q80)
 * - rewrite catalog.js image paths to .webp
 * - compress corporate-story.mp4 when ffmpeg is available
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { Readable } from 'node:stream';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const execFileAsync = promisify(execFile);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MEDIA = path.join(ROOT, 'public', 'media');
const PRODUCTS = path.join(ROOT, 'public', 'products');

const REMOTE_MAP = {
  // Five Group story / news
  story: 'https://fivegrouptrading.com/wp-content/uploads/2026/03/2B2A1582-scaled.jpg',
  'peanut-butter': 'https://fivegrouptrading.com/wp-content/uploads/2022/03/2B2A1334-scaled.jpg',
  dhathri: 'https://fivegrouptrading.com/wp-content/uploads/2026/03/2B2A6481-scaled.jpg',
  fleet: 'https://fivegrouptrading.com/wp-content/uploads/2022/04/vehicle-fleet.jpg',
  // Unsplash — news / careers / nav / about timeline (unique ids)
  'unsplash-hair-oil': 'https://images.unsplash.com/photo-1608248543800-baa9a9e5a6b0?auto=format&fit=crop&w=640&q=80',
  'unsplash-face-wash': 'https://images.unsplash.com/photo-1556228578-0d85b1a4d451?auto=format&fit=crop&w=640&q=80',
  'unsplash-body-lotion': 'https://images.unsplash.com/photo-1570194065650-d99fb4b38b17?auto=format&fit=crop&w=640&q=80',
  'unsplash-office': 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
  'unsplash-warehouse': 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
  'unsplash-retail': 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=1200&q=80',
  'unsplash-meeting': 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80',
  'unsplash-careers': 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1600&q=80',
  'unsplash-building': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=800&fit=crop&q=80',
  'unsplash-store': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=800&fit=crop&q=80',
  'unsplash-grocery': 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=800&fit=crop&q=80',
  'unsplash-shipping': 'https://images.unsplash.com/photo-1578574577315-3fceb0c9d0b4?w=800&h=800&fit=crop&q=80',
  'unsplash-cold': 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&h=800&fit=crop&q=80',
  'unsplash-containers': 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&h=800&fit=crop&q=80',
  'unsplash-truck': 'https://images.unsplash.com/photo-1601584115197-04ecc1da58d1?w=800&h=800&fit=crop&q=80',
  'unsplash-delivery': 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=800&h=800&fit=crop&q=80',
  'unsplash-market': 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=800&h=800&fit=crop&q=80',
  'unsplash-handshake': 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=800&fit=crop&q=80',
  'unsplash-shop': 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=800&fit=crop&q=80',
  'unsplash-team': 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=800&fit=crop&q=80',
  'unsplash-desk': 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=800&fit=crop&q=80',
};

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function download(url, dest) {
  try {
    await fs.access(dest);
    return { skipped: true, dest };
  } catch {
    /* continue */
  }
  const res = await fetch(url, {
    headers: { 'User-Agent': 'FiveGroupAssetOptimizer/1.0' },
  });
  if (!res.ok) throw new Error(`Download failed ${res.status} ${url}`);
  await ensureDir(path.dirname(dest));
  await pipeline(Readable.fromWeb(res.body), createWriteStream(dest));
  return { skipped: false, dest };
}

async function optimizeDownloaded(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) return filePath;
  const tmp = `${filePath}.tmp.webp`;
  await sharp(filePath)
    .rotate()
    .resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(tmp);
  const webpPath = filePath.replace(/\.(jpe?g|png)$/i, '.webp');
  await fs.rename(tmp, webpPath);
  if (webpPath !== filePath) {
    try {
      await fs.unlink(filePath);
    } catch {
      /* ignore */
    }
  }
  return webpPath;
}

async function walkPngs(dir) {
  const out = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walkPngs(full)));
    else if (entry.isFile() && entry.name.toLowerCase().endsWith('.png')) out.push(full);
  }
  return out;
}

async function convertProductPngs() {
  const pngs = await walkPngs(PRODUCTS);
  let bytesIn = 0;
  let bytesOut = 0;
  let converted = 0;
  for (const png of pngs) {
    const webp = png.replace(/\.png$/i, '.webp');
    const inStat = await fs.stat(png);
    bytesIn += inStat.size;
    await sharp(png)
      .rotate()
      .resize({ width: 900, height: 900, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(webp);
    const outStat = await fs.stat(webp);
    bytesOut += outStat.size;
    await fs.unlink(png);
    converted += 1;
  }
  return { converted, bytesIn, bytesOut };
}

async function rewriteCatalog() {
  const catalogPath = path.join(ROOT, 'src', 'data', 'catalog.js');
  let text = await fs.readFile(catalogPath, 'utf8');
  const next = text.replace(/(\/products\/[^"']+)\.png/g, '$1.webp');
  if (next !== text) {
    await fs.writeFile(catalogPath, next, 'utf8');
    return true;
  }
  return false;
}

async function findFfmpeg() {
  try {
    await execFileAsync('ffmpeg', ['-version']);
    return 'ffmpeg';
  } catch {
    /* try npm package */
  }
  try {
    const mod = await import('@ffmpeg-installer/ffmpeg');
    return mod.default.path;
  } catch {
    return null;
  }
}

async function compressVideo() {
  const input = path.join(ROOT, 'public', 'videos', 'corporate-story.mp4');
  const output = path.join(ROOT, 'public', 'videos', 'corporate-story.tmp.mp4');
  const ffmpeg = await findFfmpeg();
  if (!ffmpeg) return { ok: false, reason: 'ffmpeg-not-found' };
  const before = (await fs.stat(input)).size;
  await execFileAsync(
    ffmpeg,
    [
      '-y',
      '-i',
      input,
      '-vf',
      'scale=1280:-2',
      '-c:v',
      'libx264',
      '-preset',
      'medium',
      '-crf',
      '28',
      '-c:a',
      'aac',
      '-b:a',
      '96k',
      '-movflags',
      '+faststart',
      output,
    ],
    { maxBuffer: 20 * 1024 * 1024 },
  );
  const after = (await fs.stat(output)).size;
  if (after >= before * 0.95) {
    await fs.unlink(output);
    return { ok: false, reason: 'no-savings', before, after };
  }
  await fs.rename(output, input);
  return { ok: true, before, after };
}

async function main() {
  await ensureDir(MEDIA);
  console.log('Downloading remote media…');
  const downloads = {};
  for (const [key, url] of Object.entries(REMOTE_MAP)) {
    const provisional = path.join(MEDIA, `${key}.jpg`);
    try {
      const result = await download(url, provisional);
      const finalPath = await optimizeDownloaded(result.skipped ? provisional : provisional);
      // If download was skipped and webp already exists
      let resolved = finalPath;
      try {
        await fs.access(finalPath);
      } catch {
        const webpExisting = provisional.replace(/\.(jpe?g|png)$/i, '.webp');
        try {
          await fs.access(webpExisting);
          resolved = webpExisting;
        } catch {
          resolved = finalPath;
        }
      }
      downloads[key] = `/media/${path.basename(resolved)}`;
      console.log(`  ${key} → ${downloads[key]}${result.skipped ? ' (cached)' : ''}`);
    } catch (err) {
      console.error(`  FAIL ${key}:`, err.message);
    }
  }

  // Prefer local fleet asset if download failed
  if (!downloads.fleet) {
    const localFleet = path.join(ROOT, 'src', 'assets', 'locations', 'fleet.jpg');
    try {
      await fs.copyFile(localFleet, path.join(MEDIA, 'fleet.webp'));
      // re-encode copy
      await sharp(localFleet)
        .resize({ width: 1600, withoutEnlargement: true })
        .webp({ quality: 78 })
        .toFile(path.join(MEDIA, 'fleet.webp'));
      downloads.fleet = '/media/fleet.webp';
    } catch {
      /* ignore */
    }
  }

  console.log('Converting product PNGs → WebP…');
  const pngStats = await convertProductPngs();
  console.log(
    `  ${pngStats.converted} files · ${(pngStats.bytesIn / 1e6).toFixed(1)} MB → ${(pngStats.bytesOut / 1e6).toFixed(1)} MB`,
  );

  const catalogUpdated = await rewriteCatalog();
  console.log(`Catalog rewrite: ${catalogUpdated ? 'updated' : 'no changes'}`);

  console.log('Compressing video…');
  let video = await compressVideo();
  if (!video.ok && video.reason === 'ffmpeg-not-found') {
    console.log('  Installing @ffmpeg-installer/ffmpeg…');
    await execFileAsync('npm', ['install', '-D', '@ffmpeg-installer/ffmpeg'], {
      cwd: ROOT,
      shell: true,
      maxBuffer: 20 * 1024 * 1024,
    });
    video = await compressVideo();
  }
  if (video.ok) {
    console.log(
      `  Video ${(video.before / 1e6).toFixed(1)} MB → ${(video.after / 1e6).toFixed(1)} MB`,
    );
  } else {
    console.log(`  Video skipped: ${video.reason}`);
  }

  await fs.writeFile(
    path.join(MEDIA, 'manifest.json'),
    JSON.stringify({ downloads, pngStats, video }, null, 2),
  );
  console.log('Done. Manifest written to public/media/manifest.json');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
