/** Prefer compact catalog thumbs over heavy decorative shots. */

export const HOME_CATEGORY_STOCK_IMAGES = {
  'chocalates-confectionery': '/products/_categories/chocalates-confectionery.webp',
  beverages: '/products/_categories/beverages.webp',
  flours: '/products/_categories/flours.webp',
  chips: '/products/_categories/chips.webp',
  'biscuits-rusk': '/products/_categories/biscuits-rusk.webp',
  'stock-cubes-powders': '/products/_categories/stock-cubes-powders.webp',
};

export function getHomeCategoryImage(slug) {
  return HOME_CATEGORY_STOCK_IMAGES[slug] || null;
}
