/** Site-wide SEO + AEO metadata. Update SITE_ORIGIN for production domain. */

export const SITE_ORIGIN = 'https://fivegrouptrading.com';
export const SITE_NAME = 'Five Group Trading';
export const DEFAULT_TITLE = 'Five Group Trading | Premium FMCG Distribution Qatar';
export const DEFAULT_DESCRIPTION =
  'Five Group Trading is a Rawabi Group division distributing 500+ food and non-food product lines across Qatar since 2006 — warehousing, fleet logistics, and wholesale supply.';
export const DEFAULT_OG_IMAGE = '/og-default.webp';

export const ORG = {
  name: 'Five Group Trading Company W.L.L.',
  legalName: 'Five Group Trading Company W.L.L.',
  alternateName: 'Five Group',
  parent: 'Rawabi Group',
  phone: '+97444513537',
  email: 'info@fivegrouptrading.com',
  founded: '2006',
  address: {
    street: 'Building No. 18, Street No. 60, Zone No. 92, Logistic Park-A, Birkat Al Awamer, Al Wukair',
    locality: 'Doha',
    region: 'Doha',
    postal: '31075',
    country: 'QA',
  },
};

/** Per-page titles/descriptions for crawlers and answer engines */
export const PAGE_SEO = {
  home: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    path: '/',
  },
  'about-profile': {
    title: 'About Five Group | Company Profile Qatar',
    description:
      'Learn how Five Group Trading grew from 2006 as a Rawabi Group premium division — mission, timeline, and FMCG distribution across Qatar.',
    path: '/?p=about-profile',
  },
  'about-vision': {
    title: 'Vision & Mission | Five Group Trading',
    description:
      'Five Group vision and mission: premium quality FMCG distribution built on trust, commitment, and customer-first operations in Qatar.',
    path: '/?p=about-vision',
  },
  'about-management': {
    title: 'Management Team | Five Group Trading',
    description:
      'Leadership guiding Five Group Trading strategy, brand partnerships, and distribution operations in Qatar.',
    path: '/?p=about-management',
  },
  'about-quality': {
    title: 'Quality & Compliance | Five Group Trading',
    description:
      'Quality and compliance standards protecting product integrity across Five Group warehousing and retail supply in Qatar.',
    path: '/?p=about-quality',
  },
  'about-csr': {
    title: 'CSR | Five Group Trading Qatar',
    description:
      'Corporate social responsibility at Five Group — community, people, and responsible growth in Qatar.',
    path: '/?p=about-csr',
  },
  'business-loyalty': {
    title: 'Loyalty Customers | Five Group Partners',
    description:
      'Retail and trade partners who trust Five Group Trading for reliable FMCG distribution across Qatar.',
    path: '/?p=business-loyalty',
  },
  'business-fmcg': {
    title: 'FMCG Distribution Qatar | Five Group',
    description:
      'Nationwide FMCG distribution to hypermarkets and retail networks — 500+ product lines from Five Group Trading.',
    path: '/?p=business-fmcg',
  },
  'business-categories': {
    title: 'Product Categories | Five Group Catalog',
    description:
      'Browse Five Group product categories: beverages, confectionery, flours, chips, biscuits, stock cubes, and more wholesale lines.',
    path: '/?p=business-categories',
  },
  'brands-featured': {
    title: 'Featured Brands | Five Group Trading',
    description:
      'Featured international and exclusive brands distributed by Five Group Trading across Qatar retail.',
    path: '/?p=brands-featured',
  },
  'business-portfolio': {
    title: 'Brand Portfolio | Five Group Trading',
    description:
      'International and exclusive brand portfolio distributed by Five Group across Qatar.',
    path: '/?p=business-portfolio',
  },
  'business-import-export': {
    title: 'Import & Export | Five Group Trading',
    description:
      'Global sourcing and import-export capabilities powering Five Group FMCG supply into Qatar.',
    path: '/?p=business-import-export',
  },
  'business-logistics': {
    title: 'Logistics & Warehousing Qatar | Five Group',
    description:
      'Temperature-controlled warehouses and multi-temp fleet logistics from Birkat Al Awamer — dry, chilled, and frozen distribution.',
    path: '/?p=business-logistics',
  },
  'brands-international': {
    title: 'International Brands | Five Group',
    description:
      'Trusted global brands distributed across Qatar by Five Group Trading.',
    path: '/?p=brands-international',
  },
  'brands-partner': {
    title: 'Become a Brand Partner | Five Group',
    description:
      'Partner with Five Group Trading to grow shelf presence for your brand in Qatar retail.',
    path: '/?p=brands-partner',
  },
  'contact-us': {
    title: 'Contact Five Group Trading | Doha Qatar',
    description:
      'Contact Five Group Trading in Doha — wholesale inquiries, phone +974 4451 3537, Logistic Park-A Birkat Al Awamer.',
    path: '/?p=contact-us',
  },
  'contact-quote': {
    title: 'Wholesale Quote | Five Group Trading',
    description:
      'Request a wholesale quote from Five Group Trading for FMCG supply across Qatar.',
    path: '/?p=contact-quote',
  },
  'contact-careers': {
    title: 'Careers | Five Group Trading Qatar',
    description:
      'Join Five Group Trading — careers in distribution, warehouse, fleet, and brand operations in Qatar.',
    path: '/?p=contact-careers',
  },
  'contact-news': {
    title: 'News & Events | Five Group Trading',
    description:
      'Latest Five Group news and events — product launches, partnerships, and distribution updates in Qatar.',
    path: '/?p=contact-news',
  },
};

/** AEO FAQ answers — short, citation-friendly */
export const SEO_FAQS = [
  {
    question: 'What is Five Group Trading?',
    answer:
      'Five Group Trading Company W.L.L. is a premium FMCG distribution division of Rawabi Group, founded in 2006 in Qatar, supplying more than 500 food and non-food product lines to retail partners.',
  },
  {
    question: 'Where is Five Group Trading located?',
    answer:
      'Five Group Trading operates from Building No. 18, Street No. 60, Zone No. 92, Logistic Park-A, Birkat Al Awamer, Al Wukair, PO Box 31075, Doha, Qatar.',
  },
  {
    question: 'How can I contact Five Group for wholesale supply?',
    answer:
      'Call +974 4451 3537 or email info@fivegrouptrading.com for wholesale inquiries and distribution partnerships in Qatar.',
  },
  {
    question: 'What products does Five Group distribute?',
    answer:
      'Five Group distributes beverages, chocolates and confectionery, flours, chips, biscuits and rusks, stock cubes, tinned foods, rice, honey, pickles, and non-food cleaning products across Qatar.',
  },
  {
    question: 'Does Five Group offer chilled and frozen logistics?',
    answer:
      'Yes. Five Group runs temperature-controlled warehouses and a multi-temperature vehicle fleet for dry, chilled, and frozen goods across Qatar.',
  },
];

export function getPageSeo(pageId) {
  return PAGE_SEO[pageId] || PAGE_SEO.home;
}

export function absoluteUrl(path = '/') {
  if (!path || path === '/') return `${SITE_ORIGIN}/`;
  if (path.startsWith('http')) return path;
  return `${SITE_ORIGIN}${path.startsWith('/') ? path : `/${path}`}`;
}

export function buildOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness'],
    '@id': `${SITE_ORIGIN}/#organization`,
    name: ORG.name,
    legalName: ORG.legalName,
    alternateName: ORG.alternateName,
    url: SITE_ORIGIN,
    logo: absoluteUrl('/favicon.svg'),
    image: absoluteUrl(DEFAULT_OG_IMAGE),
    foundingDate: ORG.founded,
    parentOrganization: { '@type': 'Organization', name: ORG.parent },
    email: ORG.email,
    telephone: ORG.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: ORG.address.street,
      addressLocality: ORG.address.locality,
      addressRegion: ORG.address.region,
      postalCode: ORG.address.postal,
      addressCountry: ORG.address.country,
    },
    areaServed: { '@type': 'Country', name: 'Qatar' },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: ORG.phone,
        contactType: 'sales',
        email: ORG.email,
        areaServed: 'QA',
        availableLanguage: ['en', 'ar'],
      },
    ],
  };
}

export function buildWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_ORIGIN}/#website`,
    url: SITE_ORIGIN,
    name: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    publisher: { '@id': `${SITE_ORIGIN}/#organization` },
    inLanguage: 'en',
  };
}

export function buildFaqJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: SEO_FAQS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function pagePathFromLocation(search = '') {
  const params = new URLSearchParams(search);
  return resolveSeoPageId(params.get('p'));
}

export function resolveSeoPageId(raw) {
  if (!raw) return 'home';
  return PAGE_SEO[raw] ? raw : 'home';
}

export function buildPageUrl(pageId, extras = {}) {
  if (pageId === 'home' && !extras.category && !extras.product && !extras.news) {
    return '/';
  }
  const params = new URLSearchParams();
  if (pageId !== 'home') params.set('p', pageId);
  if (extras.category && extras.category !== 'all') params.set('c', extras.category);
  if (extras.product) params.set('sku', extras.product);
  if (extras.news) params.set('n', extras.news);
  const q = params.toString();
  return q ? `/?${q}` : '/';
}
