import { CATALOG, getFeaturedHomeProducts } from './catalog';

export const NEWS_INTRO =
  "Get updated with rawabi's news and other details we share with you.";

export const NEWS_ARCHIVE_INTRO =
  'Launches, logistics updates, and partner stories from Five Group across Qatar.';

/** Dhathri SKUs are not in the live catalog yet — curated for news detail sidebar. */
export const DHATHRI_PRODUCTS = [
  {
    id: 'dhathri-hair-oil',
    name: 'Dhathri Hair Oil',
    notes: 'Ayurvedic hair care',
    image: '/media/unsplash-hair-oil.webp',
    priceText: 'In store',
    brand: 'DHATHRI',
    category: 'non-food',
  },
  {
    id: 'dhathri-face-wash',
    name: 'Dhathri Face Wash',
    notes: 'Herbal skin care',
    image: '/media/unsplash-face-wash.webp',
    priceText: 'In store',
    brand: 'DHATHRI',
    category: 'non-food',
  },
  {
    id: 'dhathri-body-lotion',
    name: 'Dhathri Body Lotion',
    notes: 'Natural wellness',
    image: '/media/unsplash-body-lotion.webp',
    priceText: 'In store',
    brand: 'DHATHRI',
    category: 'non-food',
  },
];

const RELATED_PRODUCT_IDS = {
  'peanut-butter': [
    '5star-peanut-butter-crunchy',
    '5star-peanut-butter-chocolate',
    '5-star-peanut-butter',
  ],
  'quality-2006': null, // featured home products
  dhathri: null, // DHATHRI_PRODUCTS
  'fleet-network': null, // featured home products
  'qatar-fmcg-trends': null,
  'cold-chain-retail': null,
};

const RELATED_SIDEBAR_TITLE = {
  'peanut-butter': 'Natural Peanut Butter',
  dhathri: 'Dhathri Products',
  'quality-2006': 'Featured Products',
  'fleet-network': 'Featured Products',
  'qatar-fmcg-trends': 'Featured Products',
  'cold-chain-retail': 'Featured Products',
};

export const NEWS_ITEMS = [
  {
    id: 'quality-2006',
    title: 'Redefining Quality Living Since 2006',
    excerpt:
      'Founded in 2006, as a premium division of Rawabi group with a mission to extend the super quality products including everything to your home…',
    body: 'Founded in 2006, as a premium division of Rawabi group with a mission to extend the super quality products including everything to your home Five group stands as one among the major chain in the middle east. Along with 500 product lines, we are satisfying thousands of customers. We are the team that puts trust, commitment & work into one space.',
    date: 'March 2026',
    image: '/media/story.webp',
    href: 'https://fivegrouptrading.com/news_and_events/redefining-quality-living-since-2006-2/',
  },
  {
    id: 'peanut-butter',
    title: 'Five Group Introduces FIVE STAR Natural Peanut Butter',
    excerpt:
      'Five Group Introduces Five Star Natural Peanut Butter to Qatar Market Doha, Qatar: Five…',
    body: 'Five Group Introduces Five Star Natural Peanut Butter to Qatar Market. Doha, Qatar: Five Group Trading Company successfully launched Five Star Natural Peanut Butter at an exclusive industry gathering held at Abesq Hotel, Doha, attended by leading retail partners, senior management, and key stakeholders from Qatar\'s FMCG sector. The launch marked a significant step in Five Group\'s continued expansion within the fast-moving consumer goods category, reinforcing its commitment to delivering high-quality, nutrition-focused products tailored to modern lifestyles.\n\nThe event witnessed the presence of Mr. K. K. Usman, Managing Director, Five Group, Mr. Kannu Baker, Group General Manager Al Rawabi Group, and senior leadership from United Foods, including Mr. Ayan Bhurani, Managing Partner, Mr. Sandeep Charan, President & CEO, Mr. Basanth, Division Manager, Five Group, and Mr. Haris Usman, Business Development Manager. Together, they highlighted the strategic importance of the peanut-based category and its growing demand among health-conscious consumers.\n\nFive Star Natural Peanut Butter is positioned as a wholesome, protein-rich food suitable for fitness enthusiasts, athletes, and families alike. Made to support active lifestyles, the product offers natural energy, supports muscle recovery, and serves as a versatile ingredient for everyday meals — from breakfast and smoothies to healthy snacks.\n\nSpeaking at the event, Mr. K. K. Usman, Managing Director, Five Group, said: "Five Star Natural Peanut Butter represents our vision to bring nutritious, globally relevant food products to the local market. As consumer awareness around fitness and balanced nutrition continues to grow, we see strong potential for peanut-based products that deliver both taste and functional benefits. This launch reflects our long-term commitment to innovation and quality."\n\nA key highlight of the event was the felicitation of leading retail and distribution partners, recognizing their vital role and continued support in bringing Five Star products to consumers across Qatar. The honored partners included Retail Mart & New Indian Supermarket, Safari Hypermarkets, Grand Hypermarkets, Saudia Hypermarkets, Masskar Hypermarket, Monoprix, Regency Group, Ansar Gallery, Mark & Save, Paris Group, Stop N Shop, Global Max Trading, Marza Group of Companies, and Rawabi Hypermarket.\n\nAs part of its product roadmap, Five Group Trading Company also announced the upcoming launch of additional Five Star innovations, including Five Star Natural Peanut Butter Squeeze Bottle, Five Star Classic Peanut Wafer, and Five Star Peanut Protein Wafer, further strengthening the brand\'s presence in the health and snack segments.\n\nWith the introduction of the Five Star range, Five Group Trading Company aims to build a strong footprint in the better-for-you food category while expanding its retail reach through strategic partnerships and innovative product offerings.',
    date: 'March 2022',
    image: '/media/peanut-butter.webp',
    href: 'https://fivegrouptrading.com/news_and_events/five-group-introduces-five-star-natural-peanut-butter/',
  },
  {
    id: 'dhathri',
    title: 'Five Group Introduces DHATHRI Products',
    excerpt:
      'Rawabi Hypermarket proudly hosted the grand launch of Dhathri products, now distributed exclusively in…',
    body: 'Rawabi Hypermarket proudly hosted the grand launch of Dhathri products, now distributed exclusively in Qatar by Five Group. The event marked an important step in bringing trusted natural wellness and beauty solutions closer to customers across the country.\n\nDhathri, widely known for its commitment to authentic herbal and Ayurvedic formulations, offers a range of products designed to promote healthy hair, skin, and overall well-being. With this launch, customers at Rawabi Hypermarket can now access these high-quality natural products conveniently under one roof.\n\nThe collaboration between Rawabi Hypermarket and Five Group reflects a shared commitment to delivering premium, health-focused products to the community. By introducing Dhathri to the Qatar market, the initiative aims to promote natural beauty and wellness solutions that align with growing consumer demand for herbal and chemical-free products.\n\nRawabi Hypermarket continues to strengthen its position as a destination for quality, variety, and innovation, consistently bringing new and trusted brands to its valued customers.',
    date: 'March 2026',
    image: '/media/dhathri.webp',
    href: 'https://fivegrouptrading.com/news_and_events/five-group-introduce-dhathri-products/',
  },
  {
    id: 'fleet-network',
    title: 'Strengthening Qatar Distribution With Our Vehicle Fleet',
    excerpt:
      'A multi-temperature fleet keeps dry, chilled, and frozen goods moving reliably across Qatar every day…',
    body: 'Five Group continues to invest in a strong distribution network supported by a large multi-temperature vehicle fleet. From ambient grocery essentials to chilled and frozen lines, our logistics team moves products efficiently from warehouse to retail partners across Qatar.\n\nOperating from our Birkat Al Awamer logistics hub, the fleet is built for reliability — helping retailers receive complete, on-time deliveries while protecting product quality at every stage. This capability underpins more than 500 product lines and remains a core part of how we serve hypermarkets, supermarket chains, and specialty partners nationwide.\n\nAs demand grows, we keep expanding capacity and refining route operations so partners can count on consistent supply, faster turnaround, and service standards that match Five Group’s commitment to trust and excellence.',
    date: 'April 2026',
    image: '/media/fleet.webp',
    href: 'https://fivegrouptrading.com/',
  },
  {
    id: 'qatar-fmcg-trends',
    title: 'Qatar FMCG Trends: What Retail Buyers Are Prioritizing',
    excerpt:
      'Better-for-you snacks, natural wellness, and reliable cold-chain grocery lines continue to shape assortment decisions…',
    body: 'Qatar’s FMCG retail landscape continues to reward distributors who combine assortment relevance with operational reliability. Buyers across hypermarkets and specialty chains are prioritizing three themes: better-for-you snacks and proteins, natural wellness and personal care, and everyday staples that arrive on time through a dependable cold and ambient chain.\n\nFor brand principals, that means go-to-market plans must pair product quality with listing readiness, promotional calendars, and temperature-safe logistics. For retailers, it means working with partners who can protect shelf availability during peaks without compromising product integrity.\n\nFive Group tracks these shifts closely across beverages, confectionery, staples, and selected non-food categories — helping partners time launches, balance SKUs, and keep Qatar shoppers supplied with trusted international and exclusive lines.',
    date: 'May 2026',
    image: '/media/unsplash-market.webp',
    href: 'https://fivegrouptrading.com/',
    tag: 'Insights',
  },
  {
    id: 'cold-chain-retail',
    title: 'Why Cold-Chain Discipline Wins Retail Partnerships',
    excerpt:
      'Temperature integrity from Birkat Al Awamer to the store door is becoming a non-negotiable retailer expectation…',
    body: 'As chilled and frozen categories grow, retailers expect more than capacity — they expect proven cold-chain discipline. From warehouse zoning to multi-temperature fleet routing, every handoff affects shelf life, waste, and brand trust.\n\nDistributors that document controls, respond quickly to exceptions, and keep delivery windows predictable earn longer-term listings. That is especially true for juices, dairy-adjacent lines, frozen foods, and any assortment that depends on unbroken temperature control.\n\nFive Group’s Birkat Al Awamer operations and multi-temperature network are designed for that standard: dry, chilled, and frozen under one roof, with last-mile care that protects both product and partner reputation across Qatar.',
    date: 'June 2026',
    image: '/media/unsplash-cold.webp',
    href: 'https://fivegrouptrading.com/',
    tag: 'Insights',
  },
];

function productsByIds(ids) {
  const byId = new Map(CATALOG.map((product) => [product.id, product]));
  return ids.map((id) => byId.get(id)).filter(Boolean);
}

export function getRelatedProductsForNews(articleId) {
  if (articleId === 'dhathri') return DHATHRI_PRODUCTS;
  if (articleId === 'quality-2006' || articleId === 'fleet-network' || articleId === 'qatar-fmcg-trends' || articleId === 'cold-chain-retail') {
    return getFeaturedHomeProducts().slice(0, 4);
  }
  const ids = RELATED_PRODUCT_IDS[articleId];
  if (ids?.length) return productsByIds(ids);
  return getFeaturedHomeProducts().slice(0, 3);
}

export function getRelatedProductsTitle(articleId) {
  return RELATED_SIDEBAR_TITLE[articleId] || 'Related Products';
}

export function getOtherNews(articleId) {
  return NEWS_ITEMS.filter((item) => item.id !== articleId);
}

/** Stable pseudo-random catalog picks for the detail page bottom strip. */
export function getRandomProductsForNews(articleId, count = 4, excludeIds = []) {
  const exclude = new Set(excludeIds);
  const pool = CATALOG.filter((product) => !exclude.has(product.id));
  if (!pool.length) return [];

  let seed = 0;
  const key = String(articleId || 'news');
  for (let i = 0; i < key.length; i += 1) {
    seed = (seed * 31 + key.charCodeAt(i)) >>> 0;
  }

  const shuffled = [...pool];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    const j = seed % (i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, count);
}
