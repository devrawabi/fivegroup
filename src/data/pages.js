import { ABOUT_OVERVIEW, ABOUT_PILLARS, SOURCE_COUNTRIES } from '@/data/about'
import { PRODUCT_CATEGORIES } from '@/data/catalog'
import {
  AWARDS,
  BUSINESS_LINES,
  KEY_STATS,
  QUALITY_BADGES,
  TESTIMONIALS,
  WHY_PARTNER,
} from '@/data/companyFacts'
import { STORAGE_DIVISIONS, WAREHOUSE_FACILITIES, WAREHOUSE_INTRO } from '@/data/warehouse'

const vision = ABOUT_PILLARS.find((p) => p.id === 'vision')
const mission = ABOUT_PILLARS.find((p) => p.id === 'mission')
const values = ABOUT_PILLARS.find((p) => p.id === 'values')

const categoryNames = PRODUCT_CATEGORIES.filter((c) => c.slug !== 'all').map((c) => c.name)

/** Content pages keyed by page id (Model) */
export const PAGE_CONTENT = {
  'about-vision': {
    eyebrow: 'About Us',
    title: 'Vision & Mission',
    lead: 'Clear direction for a premium FMCG distributor serving Qatar and the wider Middle East.',
    sections: [
      {
        title: vision?.title || 'Vision',
        body: vision?.body,
      },
      {
        title: mission?.title || 'Mission',
        body: mission?.body,
      },
      {
        title: values?.title || 'Values',
        body: values?.body,
      },
    ],
    highlights: [
      { label: 'Founded', value: '2006' },
      { label: 'Product lines', value: '500+' },
      { label: 'Source markets', value: '11+' },
    ],
    cta: { label: 'Company profile', page: 'about-profile' },
  },

  'about-management': {
    eyebrow: 'About Us',
    title: 'Management',
    lead: 'Experienced leadership spanning trading, brand development, logistics, and retail partnerships across Qatar.',
    sections: [
      {
        title: 'Leadership focus',
        body: 'Five Group leadership aligns commercial growth with operational excellence — protecting brand equity while scaling reliable supply into hypermarkets, wholesalers, and specialty retail.',
      },
      {
        title: 'How we lead',
        body: 'Strategy is driven by market insight, partner feedback, and disciplined category planning. Day-to-day execution prioritizes service levels, cold-chain integrity, and transparent communication with principals and buyers.',
      },
      {
        title: 'Within Rawabi Group',
        body: 'As a premium division of Rawabi Group, Five Group benefits from group-scale infrastructure while operating with the agility of a specialist FMCG distributor.',
      },
    ],
    cards: [
      {
        title: 'Commercial',
        body: 'Key account management, launches, and retail activation across Qatar.',
      },
      {
        title: 'Supply chain',
        body: 'Import planning, warehouse control, and multi-temperature fleet routing.',
      },
      {
        title: 'Brand stewardship',
        body: 'Portfolio curation, compliance, and exclusive brand representation.',
      },
    ],
    cta: { label: 'Contact leadership team', page: 'contact-us' },
  },

  'about-quality': {
    eyebrow: 'About Us',
    title: 'Quality & Compliance',
    lead: 'Non-compromising quality from origin to shelf — with processes aligned to international safety and storage standards.',
    sections: [
      {
        title: 'Product integrity',
        body: 'Every line we distribute is selected for consistent quality. Temperature-controlled handling, batch traceability practices, and careful warehouse zoning protect goods from arrival through last-mile delivery.',
      },
      {
        title: 'Operational controls',
        body: WAREHOUSE_INTRO,
      },
      {
        title: 'Partner confidence',
        body: 'Retailers and brand principals rely on Five Group for dependable documentation, responsive issue handling, and service that meets Qatar market expectations.',
      },
    ],
    cards: STORAGE_DIVISIONS.map((d) => ({ title: d.title, body: d.body })),
    badges: QUALITY_BADGES,
    cta: { label: 'View warehousing', page: 'business-logistics' },
  },

  'about-csr': {
    eyebrow: 'About Us',
    title: 'Corporate Social Responsibility',
    lead: 'People first — building a workplace and community presence that reflects trust, commitment, and long-term responsibility.',
    sections: [
      {
        title: 'Our people',
        body: 'Team Five Group places employees at the center of every field of work. Fair opportunity, recognition, and safer logistics environments are core to how we grow.',
      },
      {
        title: 'Community & market care',
        body: 'Through responsible distribution and partnerships with trusted brands, we help Qatar households access quality essentials while supporting retailers with reliable supply.',
      },
      {
        title: 'Sustainable operations',
        body: 'Efficient routing, consolidated imports, and modern storage reduce waste and protect product life — practical steps toward a more responsible supply chain.',
      },
    ],
    cards: AWARDS,
    cta: { label: 'Explore careers', page: 'contact-careers' },
  },

  'business-fmcg': {
    eyebrow: 'Our Business',
    title: 'FMCG Distribution',
    lead: 'A full-service distribution engine connecting global brands to Qatar’s retail shelves — with speed, coverage, and category expertise.',
    sections: [
      {
        title: 'What we distribute',
        body: `${ABOUT_OVERVIEW}`,
      },
      {
        title: 'Retail reach',
        body: 'We supply hypermarkets, wholesale channels, and specialty retailers with scheduled deliveries and account support designed for high-turn FMCG environments.',
      },
      {
        title: 'Service model',
        body: 'Forecast collaboration, launch support, in-warehouse readiness, and multi-temperature transport keep promotions and everyday demand covered.',
      },
    ],
    highlights: KEY_STATS,
    cards: BUSINESS_LINES,
    cta: { label: 'Browse categories', page: 'business-categories' },
    secondaryCta: { label: 'Import & export', page: 'business-import-export' },
  },

  'business-portfolio': {
    eyebrow: 'Our Business',
    title: 'Brand Portfolio',
    lead: 'A curated mix of international staples and exclusive introductions tailored to Qatar consumer demand.',
    sections: [
      {
        title: 'Balanced portfolio',
        body: 'From beverages and confectionery to staples, spreads, and selected non-food lines, our catalog is built for retail velocity and brand differentiation.',
      },
      {
        title: 'Category coverage',
        body: `Active families include ${categoryNames.slice(0, 8).join(', ')}, and more.`,
      },
      {
        title: 'Go-to-market support',
        body: 'We combine listing readiness, launch events, and ongoing key-account coverage so brands scale with confidence.',
      },
    ],
    showBrandGrid: true,
    cta: { label: 'See international brands', page: 'brands-international' },
    secondaryCta: { label: 'Browse products', page: 'business-categories' },
  },

  'business-import-export': {
    eyebrow: 'Our Business',
    title: 'Import & Export',
    lead: 'Global sourcing with operational discipline — bringing quality FMCG into Qatar and supporting cross-border trade flows.',
    sections: [
      {
        title: 'Sourcing network',
        body: `We import from ${SOURCE_COUNTRIES.join(', ')} — building resilient supplier relationships that protect availability and quality.`,
      },
      {
        title: 'Trade capability',
        body: 'Import planning, documentation coordination, and warehouse intake processes keep inbound shipments moving smoothly into dry, chilled, and frozen zones.',
      },
      {
        title: 'Market access',
        body: 'For brand owners entering Qatar, Five Group provides a ready distribution platform into established retail and wholesale channels.',
      },
    ],
    highlights: SOURCE_COUNTRIES.slice(0, 6).map((country) => ({
      label: 'Origin',
      value: country,
    })),
    cta: { label: 'Partner with us', page: 'brands-partner' },
  },

  'brands-international': {
    eyebrow: 'Brands',
    title: 'International Brands',
    lead: 'Global brand names brought to Qatar through disciplined distribution, retail relationships, and cold-chain care.',
    sections: [
      {
        title: 'Why principals choose us',
        body: 'Market knowledge, warehouse infrastructure, and hypermarket access make Five Group a reliable home for international FMCG brands.',
      },
      {
        title: 'What we deliver',
        body: 'Listing support, continuous replenishment, and brand-safe handling across temperature zones — so product quality matches brand promise.',
      },
    ],
    cards: [
      { title: 'Beverages & juices', body: 'Including coconut and fruit beverage lines with strong retail visibility.' },
      { title: 'Confectionery', body: 'Premium sweets and fudge ranges for impulse and gifting occasions.' },
      { title: 'Grocery staples', body: 'Flours, rice, tinned foods, spreads, and everyday essentials.' },
    ],
    cta: { label: 'View featured products', page: 'brands-featured' },
  },

  'brands-exclusive': {
    eyebrow: 'Brands',
    title: 'Exclusive Brands',
    lead: 'Select lines we introduce and represent with focused activation — including recent wellness, bakery, and specialty launches.',
    sections: [
      {
        title: 'Exclusive representation',
        body: 'Five Group partners with brand owners for exclusive Qatar distribution, combining launch events, retail storytelling, and sustained account coverage.',
      },
      {
        title: 'Recent momentum',
        body: 'Exclusive introductions have included natural wellness and specialty food brands launched with leading retail partners such as Rawabi Hypermarket.',
      },
    ],
    cards: [
      { title: 'Launch ready', body: 'Event support, POS readiness, and key-account introductions.' },
      { title: 'Shelf discipline', body: 'Assortment planning tailored to Qatar shopper behavior.' },
      { title: 'Long-term care', body: 'Ongoing replenishment and brand stewardship after launch.' },
    ],
    cta: { label: 'Become a partner', page: 'brands-partner' },
  },

  'brands-partner': {
    eyebrow: 'Brands',
    title: 'Become a Partner',
    lead: 'Enter or expand in Qatar with a distributor built for FMCG performance — from first listing to nationwide coverage.',
    sections: [
      {
        title: 'Who we partner with',
        body: 'International manufacturers, exclusive brand owners, and retailers seeking dependable bulk supply across food and non-food categories.',
      },
      {
        title: 'Partnership path',
        body: 'Share your portfolio and ambitions. Our commercial team reviews category fit, logistics needs, and go-to-market options, then proposes a clear distribution plan.',
      },
      {
        title: 'What you gain',
        body: 'Warehouse infrastructure, multi-temperature fleet, retail relationships, and a team that treats brand reputation as carefully as volume.',
      },
    ],
    cards: WHY_PARTNER,
    testimonials: TESTIMONIALS,
    cta: { label: "I'm a brand", page: 'contact-quote' },
    secondaryCta: { label: "I'm a retailer", page: 'contact-us' },
  },

  'contact-careers': {
    eyebrow: 'Contact',
    title: 'Careers',
    lead: 'Build your career with a premium Rawabi Group division that values people, discipline, and customer commitment.',
    sections: [
      {
        title: 'Life at Five Group',
        body: 'We work across trading, warehouse operations, fleet, and brand development. Team members are recognized for ownership, reliability, and care for partners.',
      },
      {
        title: 'Roles we grow',
        body: 'Commercial sales, category support, warehouse and logistics operations, and coordination roles that keep Qatar retail supplied every day.',
      },
      {
        title: 'How to apply',
        body: 'Send your profile and interest area to our team. We review applications carefully and respond when there is a fit with current or upcoming needs.',
      },
    ],
    cta: { label: 'Contact HR / team', page: 'contact-us' },
  },

  'contact-quote': {
    eyebrow: 'Contact',
    title: 'Request a Quote',
    lead: 'Tell us what you need — wholesale volumes, category focus, or brand partnership — and our team will respond with next steps.',
    sections: [
      {
        title: 'Wholesale & retail buyers',
        body: 'Request catalog access, pricing guidance, and delivery options for Qatar retail or wholesale operations.',
      },
      {
        title: 'Brand principals',
        body: 'Share your assortment and market goals. We will outline distribution scope, warehouse readiness, and commercial collaboration options.',
      },
    ],
    formMode: 'quote',
    cta: { label: 'Open inquiry form', page: 'contact-us' },
  },

  'contact-branches': {
    eyebrow: 'Contact',
    title: 'Branch Locations',
    lead: 'Warehousing and operational hubs supporting dry, chilled, and frozen distribution across Qatar.',
    sections: [
      {
        title: 'Facilities snapshot',
        body: 'Our network includes Logistic Park-A operations in Birkat Al Awamer and supporting sites that enable All under one roof distribution for retail partners.',
      },
    ],
    cards: WAREHOUSE_FACILITIES.map((f) => ({
      title: f.name,
      body: `${f.location} · ${f.area}${f.detail ? ` — ${f.detail}` : ''}`,
    })),
    showLocations: true,
    cta: { label: 'Contact us', page: 'contact-us' },
  },
}
