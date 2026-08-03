import { useEffect } from 'react';
import {
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  absoluteUrl,
  buildFaqJsonLd,
  buildOrganizationJsonLd,
  buildWebsiteJsonLd,
  getPageSeo,
} from '@/data/seo';

function upsertMeta(attr, key, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function upsertJsonLd(id, data) {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

/**
 * Keeps document title, meta, canonical, and JSON-LD in sync with the active view.
 * Helps SEO/AEO for this SPA and supports Google rich results expectations.
 */
export default function SeoManager({
  pageId = 'home',
  title: titleOverride,
  description: descriptionOverride,
  image,
  noIndex = false,
  includeFaq = false,
}) {
  useEffect(() => {
    const seo = getPageSeo(pageId);
    const title = titleOverride || seo.title;
    const description = descriptionOverride || seo.description;
    const ogImage = absoluteUrl(image || DEFAULT_OG_IMAGE);
    const canonicalPath =
      typeof window !== 'undefined'
        ? `${window.location.pathname}${window.location.search}`
        : seo.path;
    const canonical = absoluteUrl(
      canonicalPath === '/' || canonicalPath === '' ? '/' : canonicalPath,
    );

    document.title = title;
    upsertMeta('name', 'description', description);
    upsertMeta('name', 'robots', noIndex ? 'noindex,nofollow' : 'index,follow,max-image-preview:large');
    upsertMeta('property', 'og:type', pageId === 'home' ? 'website' : 'article');
    upsertMeta('property', 'og:site_name', SITE_NAME);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', canonical);
    upsertMeta('property', 'og:image', ogImage);
    upsertMeta('property', 'og:locale', 'en_QA');
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', ogImage);
    upsertLink('canonical', canonical);

    upsertJsonLd('ld-org', buildOrganizationJsonLd());
    upsertJsonLd('ld-website', buildWebsiteJsonLd());
    upsertJsonLd('ld-webpage', {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${canonical}#webpage`,
      url: canonical,
      name: title,
      description,
      isPartOf: { '@id': `${absoluteUrl('/')}#website` },
      about: { '@id': `${absoluteUrl('/')}#organization` },
      inLanguage: 'en',
      primaryImageOfPage: ogImage,
    });

    if (includeFaq || pageId === 'home') {
      upsertJsonLd('ld-faq', buildFaqJsonLd());
    } else {
      document.getElementById('ld-faq')?.remove();
    }
  }, [pageId, titleOverride, descriptionOverride, image, noIndex, includeFaq]);

  return null;
}
