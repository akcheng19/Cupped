/**
 * Static fallback data — used on all pages when Supabase is not connected.
 * Real data takes priority the moment valid credentials are set.
 */
import type { TastingNote, BeanWithStats, BeanWithReviews, Roaster, RoasterWithBeans, Review, TastingNoteCategory } from '@/types'

// ─── Tasting Notes ─────────────────────────────────────────────────────────

export const FALLBACK_NOTES: TastingNote[] = [
  { id: 'n1',  name: 'Blueberry',      category: 'Fruity',            emoji: '🫐', slug: 'blueberry' },
  { id: 'n2',  name: 'Dark Chocolate', category: 'Chocolate & Nutty', emoji: '🍫', slug: 'dark-chocolate' },
  { id: 'n3',  name: 'Caramel',        category: 'Sweet',             emoji: '🍮', slug: 'caramel' },
  { id: 'n4',  name: 'Jasmine',        category: 'Floral',            emoji: '🌸', slug: 'jasmine' },
  { id: 'n5',  name: 'Cherry',         category: 'Fruity',            emoji: '🍒', slug: 'cherry' },
  { id: 'n6',  name: 'Hazelnut',       category: 'Chocolate & Nutty', emoji: '🌰', slug: 'hazelnut' },
  { id: 'n7',  name: 'Honey',          category: 'Sweet',             emoji: '🍯', slug: 'honey' },
  { id: 'n8',  name: 'Citrus',         category: 'Fruity',            emoji: '🍋', slug: 'citrus' },
  { id: 'n9',  name: 'Brown Sugar',    category: 'Sweet',             emoji: '🧁', slug: 'brown-sugar' },
  { id: 'n10', name: 'Rose',           category: 'Floral',            emoji: '🌹', slug: 'rose' },
  { id: 'n11', name: 'Cedar',          category: 'Earthy & Spicy',    emoji: '🌲', slug: 'cedar' },
  { id: 'n12', name: 'Smoky',          category: 'Roasted',           emoji: '💨', slug: 'smoky' },
  { id: 'n13', name: 'Peach',          category: 'Fruity',            emoji: '🍑', slug: 'peach' },
  { id: 'n14', name: 'Milk Chocolate', category: 'Chocolate & Nutty', emoji: '🍫', slug: 'milk-chocolate' },
  { id: 'n15', name: 'Vanilla',        category: 'Sweet',             emoji: '🍦', slug: 'vanilla' },
  { id: 'n16', name: 'Toffee',         category: 'Sweet',             emoji: '🍬', slug: 'toffee' },
  { id: 'n17', name: 'Mango',          category: 'Fruity',            emoji: '🥭', slug: 'mango' },
  { id: 'n18', name: 'Almond',         category: 'Chocolate & Nutty', emoji: '🌰', slug: 'almond' },
  { id: 'n19', name: 'Bergamot',       category: 'Floral',            emoji: '🍵', slug: 'bergamot' },
  { id: 'n20', name: 'Pepper',         category: 'Earthy & Spicy',    emoji: '🌶️', slug: 'pepper' },
]

export const FALLBACK_NOTES_BY_CATEGORY: Record<TastingNoteCategory, TastingNote[]> = {
  'Fruity':            FALLBACK_NOTES.filter(n => n.category === 'Fruity'),
  'Chocolate & Nutty': FALLBACK_NOTES.filter(n => n.category === 'Chocolate & Nutty'),
  'Sweet':             FALLBACK_NOTES.filter(n => n.category === 'Sweet'),
  'Floral':            FALLBACK_NOTES.filter(n => n.category === 'Floral'),
  'Earthy & Spicy':    FALLBACK_NOTES.filter(n => n.category === 'Earthy & Spicy'),
  'Roasted':           FALLBACK_NOTES.filter(n => n.category === 'Roasted'),
}

// ─── Roasters ──────────────────────────────────────────────────────────────

const mkRoaster = (id: string, name: string, slug: string, city: string, state: string, url: string, desc: string): Roaster => ({
  id, name, slug, location_city: city, location_state: state, location_country: 'US',
  website_url: url, logo_url: null, description: desc,
  is_featured: true, affiliate_program: 'direct', created_at: '2024-01-01',
})

export const FALLBACK_ROASTERS: Roaster[] = [
  mkRoaster('r1', 'Stumptown Coffee',   'stumptown',       'Portland',    'OR', 'https://stumptowncoffee.com',       'Stumptown Coffee Roasters is a specialty coffee roaster founded in Portland, OR in 1999. Known for direct trade relationships and exceptional sourcing.'),
  mkRoaster('r2', 'Intelligentsia',     'intelligentsia',  'Chicago',     'IL', 'https://intelligentsia.com',        'Intelligentsia is a pioneer of the third-wave coffee movement, renowned for direct trade and meticulous sourcing from top farms worldwide.'),
  mkRoaster('r3', 'Counter Culture',    'counter-culture', 'Durham',      'NC', 'https://counterculturecoffee.com',  'Counter Culture Coffee has been pushing the boundaries of specialty coffee since 1995, with a deep commitment to sustainability and education.'),
  mkRoaster('r4', 'Blue Bottle',        'blue-bottle',     'Oakland',     'CA', 'https://bluebottlecoffee.com',      'Blue Bottle Coffee was founded in 2002 with a focus on freshness — never selling coffee more than 48 hours from roast.'),
  mkRoaster('r5', 'Onyx Coffee Lab',    'onyx-coffee',     'Bentonville', 'AR', 'https://onyxcoffeelab.com',         'Onyx Coffee Lab is an award-winning specialty roaster obsessed with traceable, top-scoring coffees from the world\'s best producers.'),
  mkRoaster('r6', 'Verve Coffee',       'verve-coffee',    'Santa Cruz',  'CA', 'https://vervecoffee.com',           'Verve Coffee Roasters blends California surf culture with world-class specialty coffee. Their seasonal offerings rotate to reflect peak harvest.'),
  mkRoaster('r7', 'George Howell',      'george-howell',   'Acton',       'MA', 'https://georgehowellcoffee.com',    'George Howell Coffee is one of the most respected names in specialty coffee, known for terroir-driven, single-origin offerings.'),
  mkRoaster('r8', 'Heart Coffee',       'heart-coffee',    'Portland',    'OR', 'https://heartroasters.com',         'Heart Roasters focuses on clean, transparent coffees that highlight the inherent character of each farm and origin.'),
  mkRoaster('r9', 'Madcap Coffee',      'madcap-coffee',   'Grand Rapids','MI', 'https://madcapcoffee.com',          'Madcap Coffee is a Midwest gem known for their precision roasting and commitment to the full supply chain.'),
  mkRoaster('r10','Ritual Coffee',      'ritual-coffee',   'San Francisco','CA','https://ritualcoffee.com',          'Ritual Coffee Roasters has been at the forefront of San Francisco\'s coffee scene since 2005, with a focus on origin transparency.'),
]

// ─── Beans ─────────────────────────────────────────────────────────────────

const [r1, r2, r3, r4, r5, r6, r7, r8, r9, r10] = FALLBACK_ROASTERS
const [n1,n2,n3,n4,n5,n6,n7,n8,n9,n10,n11,n12,n13,n14,n15,n16,n17,n18,n19,n20] = FALLBACK_NOTES

export const FALLBACK_BEANS: BeanWithStats[] = [
  {
    id: 'b1', name: 'Hair Bender', slug: 'hair-bender', roaster_id: 'r1', roaster: r1,
    origin: 'Blend', region: null, roast_level: 'medium', process: 'washed',
    altitude_masl: null, varietal: null, price_usd: 19.00, bag_size_oz: 12,
    description: 'A complex, sweet, and full-bodied blend with notes of dark chocolate, caramel, and a citrus finish. One of the most beloved blends in specialty coffee.',
    image_url: null, affiliate_url: 'https://stumptowncoffee.com/products/hair-bender',
    is_featured: true, is_active: true, order_count: 312, created_at: '2024-01-01',
    tasting_notes: [n2, n3, n8], avg_rating: 4.7, review_count: 142,
  },
  {
    id: 'b2', name: 'Ethiopia Yirgacheffe', slug: 'ethiopia-yirgacheffe', roaster_id: 'r2', roaster: r2,
    origin: 'Ethiopia', region: 'Yirgacheffe', roast_level: 'light', process: 'washed',
    altitude_masl: 1900, varietal: 'Heirloom', price_usd: 22.00, bag_size_oz: 12,
    description: 'Bright and floral with notes of blueberry, jasmine, and a clean lemon-tea finish. A textbook expression of washed Ethiopian coffee at its finest.',
    image_url: null, affiliate_url: 'https://intelligentsia.com/products/ethiopia-yirgacheffe',
    is_featured: true, is_active: true, order_count: 198, created_at: '2024-01-02',
    tasting_notes: [n1, n4, n8], avg_rating: 4.9, review_count: 87,
  },
  {
    id: 'b3', name: 'Big Truck Blend', slug: 'big-truck-blend', roaster_id: 'r3', roaster: r3,
    origin: 'Colombia', region: 'Huila', roast_level: 'medium', process: 'natural',
    altitude_masl: 1700, varietal: 'Caturra', price_usd: 18.00, bag_size_oz: 12,
    description: 'Sweet and smooth with milk chocolate, hazelnut, and a lingering caramel finish. A reliable daily driver that works beautifully as espresso or drip.',
    image_url: null, affiliate_url: 'https://counterculturecoffee.com/products/big-truck',
    is_featured: true, is_active: true, order_count: 167, created_at: '2024-01-03',
    tasting_notes: [n6, n3, n7], avg_rating: 4.5, review_count: 63,
  },
  {
    id: 'b4', name: 'Kenya Kiambu AA', slug: 'kenya-kiambu-aa', roaster_id: 'r4', roaster: r4,
    origin: 'Kenya', region: 'Kiambu', roast_level: 'light', process: 'washed',
    altitude_masl: 1800, varietal: 'SL28', price_usd: 26.00, bag_size_oz: 12,
    description: 'Juicy and vibrant with black currant, cherry, and brown sugar. The SL28 varietal shines here with exceptional clarity and a wine-like body.',
    image_url: null, affiliate_url: 'https://bluebottlecoffee.com/u/kenya-kiambu',
    is_featured: true, is_active: true, order_count: 134, created_at: '2024-01-04',
    tasting_notes: [n5, n9, n7], avg_rating: 4.6, review_count: 51,
  },
  {
    id: 'b5', name: 'Colombia Granja La Esperanza', slug: 'colombia-granja-la-esperanza', roaster_id: 'r5', roaster: r5,
    origin: 'Colombia', region: 'Valle del Cauca', roast_level: 'light', process: 'natural',
    altitude_masl: 1850, varietal: 'Gesha', price_usd: 48.00, bag_size_oz: 12,
    description: 'An extraordinary Gesha with tropical fruit, bergamot, and a floral complexity that rivals the finest Panamanians. From the legendary Granja La Esperanza estate.',
    image_url: null, affiliate_url: 'https://onyxcoffeelab.com/products/colombia-gesha',
    is_featured: false, is_active: true, order_count: 89, created_at: '2024-01-05',
    tasting_notes: [n17, n19, n4], avg_rating: 4.8, review_count: 32,
  },
  {
    id: 'b6', name: 'Ethiopia Guji Natural', slug: 'ethiopia-guji-natural', roaster_id: 'r6', roaster: r6,
    origin: 'Ethiopia', region: 'Guji', roast_level: 'light', process: 'natural',
    altitude_masl: 2100, varietal: 'Heirloom', price_usd: 24.00, bag_size_oz: 12,
    description: 'Intensely fruity with overripe blueberry, peach, and a creamy vanilla finish. Natural processing brings out wild fruit-forward character.',
    image_url: null, affiliate_url: 'https://vervecoffee.com/products/ethiopia-guji',
    is_featured: false, is_active: true, order_count: 112, created_at: '2024-01-06',
    tasting_notes: [n1, n13, n15], avg_rating: 4.7, review_count: 44,
  },
  {
    id: 'b7', name: 'Guatemala Huehuetenango', slug: 'guatemala-huehuetenango', roaster_id: 'r7', roaster: r7,
    origin: 'Guatemala', region: 'Huehuetenango', roast_level: 'medium', process: 'washed',
    altitude_masl: 1600, varietal: 'Bourbon', price_usd: 21.00, bag_size_oz: 12,
    description: 'Balanced and approachable with dark chocolate, toffee, and a subtle cedar finish. Bourbon varietal from the highlands delivers remarkable sweetness.',
    image_url: null, affiliate_url: 'https://georgehowellcoffee.com/products/guatemala',
    is_featured: false, is_active: true, order_count: 78, created_at: '2024-01-07',
    tasting_notes: [n2, n16, n11], avg_rating: 4.4, review_count: 29,
  },
  {
    id: 'b8', name: 'Rwanda Nyamasheke', slug: 'rwanda-nyamasheke', roaster_id: 'r8', roaster: r8,
    origin: 'Rwanda', region: 'Nyamasheke', roast_level: 'light', process: 'washed',
    altitude_masl: 1700, varietal: 'Red Bourbon', price_usd: 23.00, bag_size_oz: 12,
    description: 'Delicate and tea-like with rose hip, honey, and a stone fruit sweetness. Classic Rwandan cup profile with exceptional clarity.',
    image_url: null, affiliate_url: 'https://heartroasters.com/products/rwanda',
    is_featured: false, is_active: true, order_count: 67, created_at: '2024-01-08',
    tasting_notes: [n10, n7, n13], avg_rating: 4.5, review_count: 23,
  },
  {
    id: 'b9', name: 'Brazil Fazenda Sao Benedito', slug: 'brazil-fazenda-sao-benedito', roaster_id: 'r9', roaster: r9,
    origin: 'Brazil', region: 'Sul de Minas', roast_level: 'medium-dark', process: 'natural',
    altitude_masl: 1100, varietal: 'Yellow Bourbon', price_usd: 17.00, bag_size_oz: 12,
    description: 'Rich and nutty with milk chocolate, almond, and a smooth caramel sweetness. A classic Brazilian natural perfect for espresso blending.',
    image_url: null, affiliate_url: 'https://madcapcoffee.com/products/brazil',
    is_featured: false, is_active: true, order_count: 145, created_at: '2024-01-09',
    tasting_notes: [n14, n18, n3], avg_rating: 4.3, review_count: 58,
  },
  {
    id: 'b10', name: 'Sumatra Mandheling', slug: 'sumatra-mandheling', roaster_id: 'r10', roaster: r10,
    origin: 'Indonesia', region: 'Sumatra', roast_level: 'dark', process: 'wet-hulled',
    altitude_masl: 1200, varietal: 'Typica', price_usd: 16.00, bag_size_oz: 12,
    description: 'Bold and earthy with cedar, dark chocolate, and a smoky, low-acid body. Wet-hulled processing gives this Sumatran its signature syrupy character.',
    image_url: null, affiliate_url: 'https://ritualcoffee.com/products/sumatra',
    is_featured: false, is_active: true, order_count: 203, created_at: '2024-01-10',
    tasting_notes: [n11, n12, n2], avg_rating: 4.2, review_count: 76,
  },
  {
    id: 'b11', name: 'Costa Rica Tarrazú', slug: 'costa-rica-tarrazu', roaster_id: 'r1', roaster: r1,
    origin: 'Costa Rica', region: 'Tarrazú', roast_level: 'medium', process: 'honey',
    altitude_masl: 1500, varietal: 'Caturra', price_usd: 20.00, bag_size_oz: 12,
    description: 'Sweet and vibrant with peach, honey, and a bright citrus acidity. Honey processing adds body and sweetness while retaining crisp fruit notes.',
    image_url: null, affiliate_url: 'https://stumptowncoffee.com/products/costa-rica',
    is_featured: false, is_active: true, order_count: 91, created_at: '2024-01-11',
    tasting_notes: [n13, n7, n8], avg_rating: 4.4, review_count: 37,
  },
  {
    id: 'b12', name: 'Burundi Kayanza', slug: 'burundi-kayanza', roaster_id: 'r2', roaster: r2,
    origin: 'Burundi', region: 'Kayanza', roast_level: 'light', process: 'washed',
    altitude_masl: 1900, varietal: 'Red Bourbon', price_usd: 25.00, bag_size_oz: 12,
    description: 'Bright and complex with blackcurrant, rose, and a mango-like tropical sweetness. One of East Africa\'s most exciting origins.',
    image_url: null, affiliate_url: 'https://intelligentsia.com/products/burundi',
    is_featured: false, is_active: true, order_count: 54, created_at: '2024-01-12',
    tasting_notes: [n1, n10, n17], avg_rating: 4.6, review_count: 19,
  },
  {
    id: 'b13', name: 'Tanzania Peaberry', slug: 'tanzania-peaberry', roaster_id: 'r3', roaster: r3,
    origin: 'Tanzania', region: 'Kilimanjaro', roast_level: 'medium', process: 'washed',
    altitude_masl: 1400, varietal: 'Peaberry', price_usd: 22.00, bag_size_oz: 12,
    description: 'Bright and winey with black pepper, brown sugar, and a citrus zing. Peaberry beans roast more evenly, delivering remarkable consistency.',
    image_url: null, affiliate_url: 'https://counterculturecoffee.com/products/tanzania',
    is_featured: false, is_active: true, order_count: 61, created_at: '2024-01-13',
    tasting_notes: [n20, n9, n8], avg_rating: 4.3, review_count: 27,
  },
  {
    id: 'b14', name: 'Signature Espresso Blend', slug: 'signature-espresso-blend', roaster_id: 'r4', roaster: r4,
    origin: 'Blend', region: null, roast_level: 'medium-dark', process: 'washed',
    altitude_masl: null, varietal: null, price_usd: 18.00, bag_size_oz: 12,
    description: 'Rich and syrupy with dark chocolate, vanilla, and a smooth toffee sweetness. Dialed in for espresso but equally at home as a morning drip.',
    image_url: null, affiliate_url: 'https://bluebottlecoffee.com/u/espresso-blend',
    is_featured: false, is_active: true, order_count: 187, created_at: '2024-01-14',
    tasting_notes: [n2, n15, n16], avg_rating: 4.5, review_count: 94,
  },
]

// ─── Reviews ───────────────────────────────────────────────────────────────

export const FALLBACK_REVIEWS: Review[] = [
  { id: 'rv1',  bean_id: 'b1', reviewer_name: 'Alex M.',    rating: 5, review_text: 'My go-to everyday coffee. Perfectly balanced — great as espresso or pour-over.', helpful_count: 12, created_at: '2024-02-01' },
  { id: 'rv2',  bean_id: 'b1', reviewer_name: 'Jordan K.',  rating: 5, review_text: 'The dark chocolate and caramel notes are unmistakable. A classic for a reason.', helpful_count: 8, created_at: '2024-02-05' },
  { id: 'rv3',  bean_id: 'b1', reviewer_name: 'Sam R.',     rating: 4, review_text: 'Excellent blend. Slightly inconsistent bag to bag but usually outstanding.', helpful_count: 3, created_at: '2024-02-10' },
  { id: 'rv4',  bean_id: 'b2', reviewer_name: 'Taylor W.',  rating: 5, review_text: 'Absolute perfection. The jasmine aroma hits you before the first sip. Stunning.', helpful_count: 15, created_at: '2024-02-02' },
  { id: 'rv5',  bean_id: 'b2', reviewer_name: 'Chris P.',   rating: 5, review_text: 'Best coffee I have ever tasted. The blueberry notes are wild and natural — not artificial.', helpful_count: 11, created_at: '2024-02-08' },
  { id: 'rv6',  bean_id: 'b3', reviewer_name: 'Morgan L.',  rating: 4, review_text: 'Solid daily driver. Creamy body and a sweet chocolate finish. Hard to beat at this price.', helpful_count: 6, created_at: '2024-02-03' },
  { id: 'rv7',  bean_id: 'b3', reviewer_name: 'Riley S.',   rating: 5, review_text: 'I brew this every morning. The hazelnut and caramel balance is spot on.', helpful_count: 9, created_at: '2024-02-15' },
  { id: 'rv8',  bean_id: 'b4', reviewer_name: 'Quinn T.',   rating: 5, review_text: 'Kenyan coffees don\'t get better than this. The juiciness is incredible.', helpful_count: 7, created_at: '2024-02-04' },
  { id: 'rv9',  bean_id: 'b5', reviewer_name: 'Dana F.',    rating: 5, review_text: 'Worth every penny. The bergamot and tropical fruit complexity is unlike anything.', helpful_count: 14, created_at: '2024-02-06' },
  { id: 'rv10', bean_id: 'b6', reviewer_name: 'Casey H.',   rating: 5, review_text: 'The blueberry here is intense and beautiful. Best natural Ethiopian I\'ve tried.', helpful_count: 10, created_at: '2024-02-07' },
]

// ─── Roasters with Beans ────────────────────────────────────────────────────

export const FALLBACK_ROASTERS_WITH_BEANS: RoasterWithBeans[] = FALLBACK_ROASTERS.map((roaster) => {
  const beans = FALLBACK_BEANS.filter((b) => b.roaster_id === roaster.id)
  const allRatings = beans.flatMap((b) => b.avg_rating != null ? [b.avg_rating] : [])
  const avg_rating = allRatings.length > 0
    ? Math.round((allRatings.reduce((s, r) => s + r, 0) / allRatings.length) * 10) / 10
    : null
  const total_reviews = beans.reduce((s, b) => s + b.review_count, 0)
  return { ...roaster, beans, avg_rating, total_reviews }
})

// ─── Beans with Reviews ─────────────────────────────────────────────────────

export const FALLBACK_BEANS_WITH_REVIEWS: BeanWithReviews[] = FALLBACK_BEANS.map((bean) => ({
  ...bean,
  reviews: FALLBACK_REVIEWS.filter((r) => r.bean_id === bean.id),
}))
