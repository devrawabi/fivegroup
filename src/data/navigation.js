/**
 * Primary navigation model — Al Rawabi–style conglomerate IA
 * 4 main menus; everything else is a submenu / page.
 * Logo navigates Home. Inspired by https://alrawabigroup.com/
 */

export const PAGE_ALIASES = {
  home: 'home',
  about: 'about-profile',
  products: 'business-categories',
  logistics: 'business-logistics',
  news: 'contact-news',
  contact: 'contact-us',
}

export function resolvePageId(id) {
  if (!id) return 'home'
  return PAGE_ALIASES[id] || id
}

export const NAV_MENUS = [
  {
    id: 'about-us',
    label: 'About Us',
    eyebrow: 'Company',
    title: 'About Five Group',
    description:
      'Premium FMCG distribution since 2006 — a Rawabi Group division serving Qatar with trust, commitment, and operational excellence.',
    cta: { label: 'Company profile', page: 'about-profile' },
    featuredImage: '/media/unsplash-office.webp',
    items: [
      {
        id: 'about-profile',
        label: 'Company Profile',
        description: 'Our story, timeline, and role within Rawabi Group.',
        page: 'about-profile',
      },
      {
        id: 'about-vision',
        label: 'Vision & Mission',
        description: 'Where we are headed and how we serve every partner.',
        page: 'about-vision',
      },
      {
        id: 'about-management',
        label: 'Management',
        description: 'Leadership guiding strategy, brands, and operations.',
        page: 'about-management',
      },
      {
        id: 'about-quality',
        label: 'Quality & Compliance',
        description: 'Standards that protect product integrity end to end.',
        page: 'about-quality',
      },
      {
        id: 'about-csr',
        label: 'CSR',
        description: 'Community, people, and responsible growth in Qatar.',
        page: 'about-csr',
      },
    ],
  },
  {
    id: 'our-business',
    label: 'Our Business',
    eyebrow: 'Operations',
    title: 'Distribution & trade',
    description:
      'End-to-end FMCG capabilities — from global sourcing and warehousing to category management across Qatar retail.',
    cta: { label: 'Explore distribution', page: 'business-fmcg' },
    featuredImage: '/media/unsplash-warehouse.webp',
    items: [
      {
        id: 'business-loyalty',
        label: 'Loyalty Customers',
        description: 'Retail and trade partners who trust Five Group.',
        page: 'business-loyalty',
      },
      {
        id: 'business-fmcg',
        label: 'FMCG Distribution',
        description: 'Nationwide supply to hypermarkets and retail networks.',
        page: 'business-fmcg',
      },
      {
        id: 'business-categories',
        label: 'Product Categories',
        description: '500+ SKUs across food and non-food categories.',
        page: 'business-categories',
        category: 'all',
      },
      {
        id: 'business-portfolio',
        label: 'Brand Portfolio',
        description: 'International and exclusive lines we bring to market.',
        page: 'business-portfolio',
      },
      {
        id: 'business-import-export',
        label: 'Import & Export',
        description: 'Sourcing from 11+ countries with reliable logistics.',
        page: 'business-import-export',
      },
      {
        id: 'business-logistics',
        label: 'Logistics & Warehousing',
        description: 'Dry, chilled, and frozen facilities plus fleet.',
        page: 'business-logistics',
      },
    ],
  },
  {
    id: 'brands',
    label: 'Brands',
    eyebrow: 'Portfolio',
    title: 'Brands we champion',
    description:
      'From global staples to exclusive launches — partner with Five Group to grow shelf presence in Qatar.',
    cta: { label: 'Become a partner', page: 'brands-partner' },
    featuredImage: '/media/unsplash-retail.webp',
    items: [
      {
        id: 'brands-international',
        label: 'International Brands',
        description: 'Trusted global names distributed across Qatar.',
        page: 'brands-international',
      },
      {
        id: 'brands-exclusive',
        label: 'Exclusive Brands',
        description: 'Lines we launch and represent exclusively.',
        page: 'brands-exclusive',
      },
      {
        id: 'brands-featured',
        label: 'Featured Products',
        description: 'Highlight SKUs driving retail demand today.',
        page: 'brands-featured',
        category: 'all',
      },
      {
        id: 'brands-partner',
        label: 'Become a Partner',
        description: 'Bring your brand into Qatar with our network.',
        page: 'brands-partner',
      },
    ],
  },
  {
    id: 'contact',
    label: 'Contact',
    eyebrow: 'Connect',
    title: 'Talk to Five Group',
    description:
      'Wholesale inquiries, careers, news, and branch access — one team ready to support your next step.',
    cta: { label: 'Contact us', page: 'contact-us' },
    featuredImage: '/media/unsplash-meeting.webp',
    items: [
      {
        id: 'contact-careers',
        label: 'Careers',
        description: 'Join a team built on trust and commitment.',
        page: 'contact-careers',
      },
      {
        id: 'contact-news',
        label: 'News & Events',
        description: 'Launches, campaigns, and company updates.',
        page: 'contact-news',
      },
      {
        id: 'contact-us',
        label: 'Contact Us',
        description: 'Reach our Doha team for trading support.',
        page: 'contact-us',
      },
      {
        id: 'contact-quote',
        label: 'Request a Quote',
        description: 'Wholesale pricing and catalog shipments.',
        page: 'contact-quote',
      },
      {
        id: 'contact-branches',
        label: 'Branch Locations',
        description: 'Warehouses, hubs, and fleet coverage.',
        page: 'contact-branches',
      },
    ],
  },
]

export const ALL_NAV_PAGES = NAV_MENUS.flatMap((menu) => menu.items)

export function getMenuForPage(pageId) {
  const resolved = resolvePageId(pageId)
  return NAV_MENUS.find((menu) => menu.items.some((item) => item.page === resolved)) || null
}

export function isMenuActive(menu, pageId) {
  const resolved = resolvePageId(pageId)
  return menu.items.some((item) => item.page === resolved)
}

export const FOOTER_LINKS = [
  { page: 'home', label: 'Home' },
  { page: 'about-profile', label: 'About Us' },
  { page: 'business-fmcg', label: 'Our Business' },
  { page: 'brands-international', label: 'Brands' },
  { page: 'contact-us', label: 'Contact' },
  { page: 'contact-news', label: 'News' },
]
