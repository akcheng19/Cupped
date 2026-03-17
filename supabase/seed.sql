-- ============================================================
-- Cupped — Seed Data (v2)
-- 13 Roasters · 24 Beans · Tasting Notes · 35+ Reviews
-- ============================================================

-- ============================================================
-- TASTING NOTES
-- ============================================================
INSERT INTO tasting_notes (id, name, category, emoji, slug) VALUES
  -- Fruity
  ('00000000-0000-0000-0001-000000000001', 'Blueberry',    'Fruity', '🫐', 'blueberry'),
  ('00000000-0000-0000-0001-000000000002', 'Strawberry',   'Fruity', '🍓', 'strawberry'),
  ('00000000-0000-0000-0001-000000000003', 'Cherry',       'Fruity', '🍒', 'cherry'),
  ('00000000-0000-0000-0001-000000000004', 'Raspberry',    'Fruity', '🍇', 'raspberry'),
  ('00000000-0000-0000-0001-000000000005', 'Peach',        'Fruity', '🍑', 'peach'),
  ('00000000-0000-0000-0001-000000000006', 'Apricot',      'Fruity', '🟠', 'apricot'),
  ('00000000-0000-0000-0001-000000000007', 'Mango',        'Fruity', '🥭', 'mango'),
  ('00000000-0000-0000-0001-000000000008', 'Citrus',       'Fruity', '🍊', 'citrus'),
  ('00000000-0000-0000-0001-000000000009', 'Lemon',        'Fruity', '🍋', 'lemon'),
  ('00000000-0000-0000-0001-000000000010', 'Orange',       'Fruity', '🍊', 'orange'),
  ('00000000-0000-0000-0001-000000000011', 'Apple',        'Fruity', '🍎', 'apple'),
  ('00000000-0000-0000-0001-000000000012', 'Grape',        'Fruity', '🍇', 'grape'),
  ('00000000-0000-0000-0001-000000000013', 'Tropical',     'Fruity', '🌴', 'tropical'),
  ('00000000-0000-0000-0001-000000000014', 'Passionfruit', 'Fruity', '💛', 'passionfruit'),
  ('00000000-0000-0000-0001-000000000015', 'Watermelon',   'Fruity', '🍉', 'watermelon'),
  -- Chocolate & Nutty
  ('00000000-0000-0000-0001-000000000016', 'Dark Chocolate', 'Chocolate & Nutty', '🍫', 'dark-chocolate'),
  ('00000000-0000-0000-0001-000000000017', 'Milk Chocolate', 'Chocolate & Nutty', '🍫', 'milk-chocolate'),
  ('00000000-0000-0000-0001-000000000018', 'Cocoa',          'Chocolate & Nutty', '🟫', 'cocoa'),
  ('00000000-0000-0000-0001-000000000019', 'Hazelnut',       'Chocolate & Nutty', '🌰', 'hazelnut'),
  ('00000000-0000-0000-0001-000000000020', 'Almond',         'Chocolate & Nutty', '🌰', 'almond'),
  ('00000000-0000-0000-0001-000000000021', 'Walnut',         'Chocolate & Nutty', '🌰', 'walnut'),
  ('00000000-0000-0000-0001-000000000022', 'Peanut',         'Chocolate & Nutty', '🥜', 'peanut'),
  ('00000000-0000-0000-0001-000000000023', 'Pecan',          'Chocolate & Nutty', '🌰', 'pecan'),
  -- Sweet
  ('00000000-0000-0000-0001-000000000024', 'Caramel',      'Sweet', '🍮', 'caramel'),
  ('00000000-0000-0000-0001-000000000025', 'Brown Sugar',  'Sweet', '🟤', 'brown-sugar'),
  ('00000000-0000-0000-0001-000000000026', 'Honey',        'Sweet', '🍯', 'honey'),
  ('00000000-0000-0000-0001-000000000027', 'Vanilla',      'Sweet', '🌿', 'vanilla'),
  ('00000000-0000-0000-0001-000000000028', 'Toffee',       'Sweet', '🍬', 'toffee'),
  ('00000000-0000-0000-0001-000000000029', 'Molasses',     'Sweet', '🟫', 'molasses'),
  ('00000000-0000-0000-0001-000000000030', 'Maple',        'Sweet', '🍁', 'maple'),
  ('00000000-0000-0000-0001-000000000031', 'Butterscotch', 'Sweet', '🍬', 'butterscotch'),
  -- Floral
  ('00000000-0000-0000-0001-000000000032', 'Jasmine',        'Floral', '🌸', 'jasmine'),
  ('00000000-0000-0000-0001-000000000033', 'Rose',           'Floral', '🌹', 'rose'),
  ('00000000-0000-0000-0001-000000000034', 'Lavender',       'Floral', '💜', 'lavender'),
  ('00000000-0000-0000-0001-000000000035', 'Chamomile',      'Floral', '🌼', 'chamomile'),
  ('00000000-0000-0000-0001-000000000036', 'Hibiscus',       'Floral', '🌺', 'hibiscus'),
  ('00000000-0000-0000-0001-000000000037', 'Bergamot',       'Floral', '🍋', 'bergamot'),
  ('00000000-0000-0000-0001-000000000038', 'Orange Blossom', 'Floral', '🌸', 'orange-blossom'),
  -- Earthy & Spicy
  ('00000000-0000-0000-0001-000000000039', 'Cedar',     'Earthy & Spicy', '🌲', 'cedar'),
  ('00000000-0000-0000-0001-000000000040', 'Tobacco',   'Earthy & Spicy', '🍂', 'tobacco'),
  ('00000000-0000-0000-0001-000000000041', 'Leather',   'Earthy & Spicy', '🟤', 'leather'),
  ('00000000-0000-0000-0001-000000000042', 'Pepper',    'Earthy & Spicy', '🌶️', 'pepper'),
  ('00000000-0000-0000-0001-000000000043', 'Cinnamon',  'Earthy & Spicy', '🟤', 'cinnamon'),
  ('00000000-0000-0000-0001-000000000044', 'Clove',     'Earthy & Spicy', '🌿', 'clove'),
  ('00000000-0000-0000-0001-000000000045', 'Cardamom',  'Earthy & Spicy', '🌿', 'cardamom'),
  ('00000000-0000-0000-0001-000000000046', 'Earthy',    'Earthy & Spicy', '🌱', 'earthy'),
  ('00000000-0000-0000-0001-000000000047', 'Herbal',    'Earthy & Spicy', '🌿', 'herbal'),
  ('00000000-0000-0000-0001-000000000048', 'Woody',     'Earthy & Spicy', '🪵', 'woody'),
  -- Roasted
  ('00000000-0000-0000-0001-000000000049', 'Smoky',       'Roasted', '💨', 'smoky'),
  ('00000000-0000-0000-0001-000000000050', 'Toasty',      'Roasted', '🍞', 'toasty'),
  ('00000000-0000-0000-0001-000000000051', 'Nutty Roast', 'Roasted', '🌰', 'nutty-roast'),
  ('00000000-0000-0000-0001-000000000052', 'Bittersweet', 'Roasted', '🍫', 'bittersweet'),
  ('00000000-0000-0000-0001-000000000053', 'Dark Caramel','Roasted', '🟫', 'dark-caramel'),
  ('00000000-0000-0000-0001-000000000054', 'Charcoal',    'Roasted', '⬛', 'charcoal');

-- ============================================================
-- ROASTERS (13)
-- ============================================================
INSERT INTO roasters (id, name, slug, location_city, location_state, location_country, website_url, description, is_featured, affiliate_program) VALUES
  (
    '00000000-0000-0000-0000-000000000001',
    'Blue Bottle Coffee', 'blue-bottle-coffee',
    'Oakland', 'CA', 'US',
    'https://bluebottlecoffee.com',
    'Blue Bottle Coffee was founded in 2002 with a commitment to serving coffee less than 48 hours from roast. They source exceptional single-origin and blended coffees with meticulous care and transparency.',
    true, 'direct'
  ),
  (
    '00000000-0000-0000-0000-000000000002',
    'Stumptown Coffee Roasters', 'stumptown-coffee-roasters',
    'Portland', 'OR', 'US',
    'https://stumptowncoffee.com',
    'Stumptown pioneered the direct trade movement in coffee, building deep relationships with farmers across the globe. Since 1999, they have been committed to extraordinary coffee and the people who grow it.',
    true, 'direct'
  ),
  (
    '00000000-0000-0000-0000-000000000003',
    'Intelligentsia Coffee', 'intelligentsia-coffee',
    'Chicago', 'IL', 'US',
    'https://intelligentsiacoffee.com',
    'Intelligentsia has been at the forefront of specialty coffee since 1995. Their Direct Trade program ensures farmers receive premium prices while delivering some of the most distinctive coffees in the world.',
    true, 'direct'
  ),
  (
    '00000000-0000-0000-0000-000000000004',
    'Counter Culture Coffee', 'counter-culture-coffee',
    'Durham', 'NC', 'US',
    'https://counterculturecoffee.com',
    'Counter Culture has been pushing the boundaries of specialty coffee since 1995. They are committed to sustainability, transparency, and continuous education in coffee excellence.',
    false, 'direct'
  ),
  (
    '00000000-0000-0000-0000-000000000005',
    'Ritual Coffee Roasters', 'ritual-coffee-roasters',
    'San Francisco', 'CA', 'US',
    'https://ritualcoffee.com',
    'Ritual was founded in 2005 in the heart of San Francisco''s Mission District. They travel the world to find extraordinary coffees and roast them to highlight their most interesting characteristics.',
    false, 'direct'
  ),
  (
    '00000000-0000-0000-0000-000000000006',
    'Heart Coffee Roasters', 'heart-coffee-roasters',
    'Portland', 'OR', 'US',
    'https://heartroasters.com',
    'Heart was established in 2009 with a focus on transparency and quality at every step. Their beautiful Scandinavian-inspired approach to coffee has earned them a devoted following.',
    false, 'direct'
  ),
  (
    '00000000-0000-0000-0000-000000000007',
    'Onyx Coffee Lab', 'onyx-coffee-lab',
    'Bentonville', 'AR', 'US',
    'https://onyxcoffeelab.com',
    'Onyx Coffee Lab was founded in 2012 with a scientific, meticulous approach to sourcing and roasting. They consistently produce award-winning coffees with a focus on pushing specialty boundaries.',
    true, 'direct'
  ),
  (
    '00000000-0000-0000-0000-000000000008',
    'George Howell Coffee', 'george-howell-coffee',
    'Acton', 'MA', 'US',
    'https://georgehowellcoffee.com',
    'George Howell has been a pioneer in specialty coffee since the 1970s. Known for incredibly precise sourcing and light roasting that preserves the natural terroir of each bean.',
    false, 'direct'
  ),
  (
    '00000000-0000-0000-0000-000000000009',
    'Verve Coffee Roasters', 'verve-coffee-roasters',
    'Santa Cruz', 'CA', 'US',
    'https://vervecoffee.com',
    'Verve was founded in 2007 in Santa Cruz with a focus on building direct relationships with farmers and honoring the hard work that goes into growing exceptional coffee.',
    false, 'direct'
  ),
  (
    '00000000-0000-0000-0000-000000000010',
    'Sightglass Coffee', 'sightglass-coffee',
    'San Francisco', 'CA', 'US',
    'https://sightglasscoffee.com',
    'Sightglass opened in 2009 in San Francisco''s SoMa neighborhood. They roast thoughtfully and source globally, creating coffees that are complex and accessible.',
    false, 'direct'
  ),
  (
    '00000000-0000-0000-0000-000000000011',
    'Ruby Coffee Roasters', 'ruby-coffee-roasters',
    'Nelsonville', 'WI', 'US',
    'https://rubycoffeeroasters.com',
    'Ruby Coffee was founded in 2013 and has quickly become one of the most respected specialty roasters in the Midwest, known for clean, expressive coffees roasted with extraordinary care.',
    false, 'direct'
  ),
  (
    '00000000-0000-0000-0000-000000000012',
    'Equator Coffees', 'equator-coffees',
    'San Rafael', 'CA', 'US',
    'https://equatorcoffees.com',
    'Equator has been roasting exceptional specialty coffee since 1995 with a deep commitment to sustainability, equity, and environmental responsibility. The first Certified B Corp in the California coffee industry.',
    false, 'direct'
  ),
  (
    '00000000-0000-0000-0000-000000000013',
    'Madcap Coffee', 'madcap-coffee',
    'Grand Rapids', 'MI', 'US',
    'https://madcapcoffee.com',
    'Madcap Coffee was founded in 2008 in Grand Rapids, Michigan. Known for meticulous sourcing and a commitment to traceability, Madcap has built a reputation for some of the most complex and memorable specialty coffees available.',
    false, 'direct'
  );

-- ============================================================
-- BEANS (24 beans)
-- ============================================================
INSERT INTO beans (id, name, slug, roaster_id, origin, region, roast_level, process, altitude_masl, varietal, price_usd, bag_size_oz, description, affiliate_url, is_featured, is_active, order_count) VALUES

  -- Blue Bottle
  (
    '00000000-0000-0000-0000-000000000101',
    'Three Africas', 'three-africas-blue-bottle',
    '00000000-0000-0000-0000-000000000001',
    'Ethiopia', 'Yirgacheffe', 'light', 'washed', 1900, 'Heirloom',
    19.00, 9,
    'A classic blend from three of Ethiopia''s most celebrated growing regions. Bright, floral, and bursting with fruit, this is the coffee that made Blue Bottle famous. Expect a juicy, wine-like body with an exceptionally clean finish.',
    'https://bluebottlecoffee.com/products/three-africas',
    true, true, 0
  ),
  (
    '00000000-0000-0000-0000-000000000102',
    'Honduras El Puente', 'honduras-el-puente-blue-bottle',
    '00000000-0000-0000-0000-000000000001',
    'Honduras', 'Copán', 'medium', 'washed', 1400, 'Catuai',
    17.50, 9,
    'Sourced from small farms in the Copán region of Honduras, El Puente is a smooth, approachable coffee with a balanced sweetness. The washed process highlights its clean clarity while brown sugar and apple notes make it endlessly drinkable.',
    'https://bluebottlecoffee.com/products/honduras-el-puente',
    false, true, 0
  ),

  -- Stumptown
  (
    '00000000-0000-0000-0000-000000000103',
    'Hair Bender', 'hair-bender-stumptown',
    '00000000-0000-0000-0000-000000000002',
    'Ethiopia', 'Multiple Regions', 'medium', 'washed', NULL, NULL,
    16.00, 12,
    'Stumptown''s flagship blend for over two decades. Hair Bender is a complex, dynamic coffee blending Central American and East African beans. Bright citrus acidity, a syrupy body, and lingering chocolate notes make this a benchmark in specialty blending.',
    'https://stumptowncoffee.com/products/hair-bender',
    true, true, 0
  ),
  (
    '00000000-0000-0000-0000-000000000104',
    'Nicaragua El Limoncillo', 'nicaragua-el-limoncillo-stumptown',
    '00000000-0000-0000-0000-000000000002',
    'Nicaragua', 'Nueva Segovia', 'medium', 'washed', 1300, 'Pacamara',
    18.00, 9,
    'From the Mierisch family''s El Limoncillo farm in Nueva Segovia, this beautifully expressive coffee shows what Nicaragua does best. A bright, citrus-forward acidity gives way to a delicate almond sweetness and clean honey finish.',
    'https://stumptowncoffee.com/products/nicaragua-el-limoncillo',
    false, true, 0
  ),

  -- Intelligentsia
  (
    '00000000-0000-0000-0000-000000000105',
    'Black Cat Espresso', 'black-cat-espresso-intelligentsia',
    '00000000-0000-0000-0000-000000000003',
    'Guatemala', 'Huehuetenango', 'medium-dark', 'washed', NULL, NULL,
    17.00, 12,
    'Intelligentsia''s iconic espresso blend has been refined over 20 years. Black Cat delivers a thick, syrupy shot with classic espresso character: bittersweet cocoa, dried cherry, and a long, sweet caramel finish. The gold standard for espresso.',
    'https://intelligentsiacoffee.com/products/black-cat-espresso',
    false, true, 0
  ),
  (
    '00000000-0000-0000-0000-000000000106',
    'Ethiopia Hambela', 'ethiopia-hambela-intelligentsia',
    '00000000-0000-0000-0000-000000000003',
    'Ethiopia', 'Guji Zone', 'light', 'natural', 2000, 'Heirloom',
    22.00, 9,
    'From the Hambela washing station in the Guji Zone, this natural processed coffee is a sensory explosion. Intensely fruity with strawberry jam, peach, and tropical notes that evolve into a floral hibiscus finish. It''s unlike anything else.',
    'https://intelligentsiacoffee.com/products/ethiopia-hambela',
    true, true, 0
  ),

  -- Counter Culture
  (
    '00000000-0000-0000-0000-000000000107',
    'Big Trouble', 'big-trouble-counter-culture',
    '00000000-0000-0000-0000-000000000004',
    'Colombia', 'Multiple Regions', 'medium', 'washed', NULL, NULL,
    14.50, 12,
    'Counter Culture''s most approachable blend, Big Trouble is designed to be delicious at any time of day. Featuring coffees from Colombia and other origins, it delivers rich milk chocolate sweetness with a fruity plum depth and clean finish.',
    'https://counterculturecoffee.com/products/big-trouble',
    false, true, 0
  ),
  (
    '00000000-0000-0000-0000-000000000108',
    'Colombia Nariño', 'colombia-narino-counter-culture',
    '00000000-0000-0000-0000-000000000004',
    'Colombia', 'Nariño', 'medium', 'washed', 2100, 'Castillo',
    19.00, 9,
    'Nariño''s unique high-altitude geography and equatorial climate produce coffees of incredible sweetness and clarity. This lot showcases the best of the region: crisp apple acidity, caramel sweetness, and a long, clean vanilla finish.',
    'https://counterculturecoffee.com/products/colombia-narino',
    false, true, 0
  ),

  -- Ritual
  (
    '00000000-0000-0000-0000-000000000109',
    'Panama Geisha', 'panama-geisha-ritual',
    '00000000-0000-0000-0000-000000000005',
    'Panama', 'Chiriquí', 'light', 'washed', 1700, 'Gesha',
    45.00, 4,
    'The legendary Geisha variety from Panama''s Chiriquí Highlands. This extraordinarily rare and delicate coffee is defined by its intense floral aromatics and tea-like clarity. A once-in-a-lifetime coffee experience for the serious enthusiast.',
    'https://ritualcoffee.com/products/panama-geisha',
    false, true, 0
  ),
  (
    '00000000-0000-0000-0000-000000000110',
    'Bolivia Caranavi', 'bolivia-caranavi-ritual',
    '00000000-0000-0000-0000-000000000005',
    'Bolivia', 'Caranavi', 'light', 'washed', 1800, 'Caturra',
    24.00, 7,
    'Bolivia is one of specialty coffee''s best-kept secrets. This lot from the Caranavi region comes from smallholder farms at extreme altitude, producing a coffee with a distinctive brightness, raspberry fruit, and silky milk chocolate finish.',
    'https://ritualcoffee.com/products/bolivia-caranavi',
    false, true, 0
  ),

  -- Heart
  (
    '00000000-0000-0000-0000-000000000111',
    'Ethiopia Sidama', 'ethiopia-sidama-heart',
    '00000000-0000-0000-0000-000000000006',
    'Ethiopia', 'Sidama', 'light', 'washed', 1900, 'Heirloom',
    21.00, 9,
    'Heart''s Sidama selection exemplifies their philosophy of minimal intervention roasting. Delicate lemon and herbal notes lead to a sweet honey finish. Elegant and restrained, it rewards slow brewing and careful attention.',
    'https://heartroasters.com/products/ethiopia-sidama',
    false, true, 0
  ),
  (
    '00000000-0000-0000-0000-000000000112',
    'Papua New Guinea Eastern Highlands', 'png-eastern-highlands-heart',
    '00000000-0000-0000-0000-000000000006',
    'Papua New Guinea', 'Eastern Highlands', 'medium', 'washed', 1600, 'Arusha',
    20.00, 9,
    'From the remote highlands of Papua New Guinea, this coffee showcases the uniquely earthy and tropical character of the region. Brown sugar sweetness, ripe tropical fruit, and a cedar-wood complexity make this a fascinating cup.',
    'https://heartroasters.com/products/png-eastern-highlands',
    false, true, 0
  ),

  -- Onyx
  (
    '00000000-0000-0000-0000-000000000113',
    'Colombia Pink Bourbon', 'colombia-pink-bourbon-onyx',
    '00000000-0000-0000-0000-000000000007',
    'Colombia', 'Huila', 'light', 'natural', 1850, 'Pink Bourbon',
    32.00, 5,
    'The rare Pink Bourbon variety from Colombia''s Huila department processed via natural fermentation. Onyx''s meticulous sourcing brings out an astonishing array of tropical and floral notes. This is at the very cutting edge of specialty coffee.',
    'https://onyxcoffeelab.com/products/colombia-pink-bourbon',
    true, true, 0
  ),
  (
    '00000000-0000-0000-0000-000000000114',
    'Burundi Kayanza', 'burundi-kayanza-onyx',
    '00000000-0000-0000-0000-000000000007',
    'Burundi', 'Kayanza', 'light', 'washed', 1750, 'Red Bourbon',
    23.00, 9,
    'Burundi''s finest coffees come from the northern province of Kayanza, where cool temperatures and rich volcanic soils produce exceptional cherries. Expect deep grape and cherry fruit with a dark chocolate finish and vibrant floral aromatics.',
    'https://onyxcoffeelab.com/products/burundi-kayanza',
    false, true, 0
  ),

  -- George Howell
  (
    '00000000-0000-0000-0000-000000000115',
    'Brazil Fazenda Sertãozinho', 'brazil-fazenda-sertaozinho-george-howell',
    '00000000-0000-0000-0000-000000000008',
    'Brazil', 'Cerrado Mineiro', 'medium', 'natural', 1050, 'Yellow Bourbon',
    18.00, 9,
    'George Howell''s long-standing relationship with Fazenda Sertãozinho in the Cerrado Mineiro region yields one of Brazil''s most refined naturals. Rich, nutty, and sweet with dark chocolate and peach notes and a smooth, full body.',
    'https://georgehowellcoffee.com/products/brazil-fazenda-sertaozinho',
    false, true, 0
  ),
  (
    '00000000-0000-0000-0000-000000000116',
    'Mexico Chiapas', 'mexico-chiapas-george-howell',
    '00000000-0000-0000-0000-000000000008',
    'Mexico', 'Chiapas', 'medium', 'washed', 1400, 'Bourbon',
    15.00, 9,
    'From smallholder farms in Mexico''s Chiapas highlands, this thoughtfully sourced coffee offers a warming, approachable cup. Classic washed Mexico character with milk chocolate, subtle cinnamon spice, and a sweet cherry finish.',
    'https://georgehowellcoffee.com/products/mexico-chiapas',
    false, true, 0
  ),

  -- Verve
  (
    '00000000-0000-0000-0000-000000000117',
    'Costa Rica Tarrazu', 'costa-rica-tarrazu-verve',
    '00000000-0000-0000-0000-000000000009',
    'Costa Rica', 'Tarrazú', 'medium', 'honey', 1600, 'Catuai',
    20.00, 9,
    'From Costa Rica''s legendary Tarrazú region, this honey processed coffee showcases the best of the Central American terroir. Verve''s sourcing highlights the apricot and peach fruit character while the honey process adds a luscious honey sweetness.',
    'https://vervecoffee.com/products/costa-rica-tarrazu',
    false, true, 0
  ),
  (
    '00000000-0000-0000-0000-000000000118',
    'Sumatra Mandheling', 'sumatra-mandheling-verve',
    '00000000-0000-0000-0000-000000000009',
    'Indonesia', 'North Sumatra', 'dark', 'wet-hulled', 1200, 'Typica',
    17.00, 9,
    'The classic Sumatran experience. Processed using the traditional wet-hulled method, this Mandheling delivers everything lovers of bold coffee seek: earthy complexity, full body, dark chocolate bitterness, and cedar-spice aromatics.',
    'https://vervecoffee.com/products/sumatra-mandheling',
    false, true, 0
  ),

  -- Sightglass
  (
    '00000000-0000-0000-0000-000000000119',
    'Owl''s Howl Espresso', 'owls-howl-espresso-sightglass',
    '00000000-0000-0000-0000-000000000010',
    'Ethiopia', 'Multiple', 'medium', 'natural', NULL, NULL,
    18.00, 12,
    'Sightglass''s flagship espresso blend balances bright East African fruit with a rich chocolate backbone. Owl''s Howl was designed to shine as espresso or with milk, making it one of the most versatile and consistently excellent blends around.',
    'https://sightglasscoffee.com/products/owls-howl-espresso',
    false, true, 0
  ),
  (
    '00000000-0000-0000-0000-000000000120',
    'Tanzania Peaberry', 'tanzania-peaberry-sightglass',
    '00000000-0000-0000-0000-000000000010',
    'Tanzania', 'Kilimanjaro', 'medium', 'washed', 1600, 'Peaberry',
    22.00, 7,
    'Peaberry beans, where a single round seed develops instead of two flat-sided beans, are prized for their concentrated flavor. This Kilimanjaro peaberry delivers elegant herbal complexity, lemon brightness, and a cedar-cherry finish.',
    'https://sightglasscoffee.com/products/tanzania-peaberry',
    false, true, 0
  ),

  -- Ruby
  (
    '00000000-0000-0000-0000-000000000121',
    'Rwanda Musasa', 'rwanda-musasa-ruby',
    '00000000-0000-0000-0000-000000000011',
    'Rwanda', 'Gakenke', 'light', 'washed', 1800, 'Red Bourbon',
    22.00, 9,
    'Ruby''s Rwanda Musasa, sourced from the Musasa washing station in Gakenke district, is everything that makes Rwandan coffee special. Vibrant cherry and raspberry acidity, hibiscus florals, and a lingering dark chocolate finish.',
    'https://rubycoffeeroasters.com/products/rwanda-musasa',
    false, true, 0
  ),

  -- Equator
  (
    '00000000-0000-0000-0000-000000000122',
    'Kenya Kirinyaga', 'kenya-kirinyaga-equator',
    '00000000-0000-0000-0000-000000000012',
    'Kenya', 'Kirinyaga', 'light', 'washed', 1750, 'SL28',
    24.00, 9,
    'Kenya''s double-washed AA-grade coffee from the fertile slopes of Mount Kenya. Equator''s Kirinyaga selection delivers the classic Kenyan profile in its purest form: intense grape and citrus brightness with a brown sugar sweetness and cocoa finish.',
    'https://equatorcoffees.com/products/kenya-kirinyaga',
    false, true, 0
  ),
  (
    '00000000-0000-0000-0000-000000000123',
    'Peru San Ignacio', 'peru-san-ignacio-equator',
    '00000000-0000-0000-0000-000000000012',
    'Peru', 'Cajamarca', 'medium', 'washed', 1700, 'Caturra',
    16.00, 9,
    'From the high-altitude cooperative farms in Peru''s Cajamarca region, this certified organic coffee is clean, sweet, and deeply approachable. Equator''s commitment to fair trade sourcing ensures every cup supports the farming communities who grew it.',
    'https://equatorcoffees.com/products/peru-san-ignacio',
    false, true, 0
  ),

  -- Madcap
  (
    '00000000-0000-0000-0000-000000000124',
    'Ethiopia Yirgacheffe Kochere', 'ethiopia-yirgacheffe-kochere-madcap',
    '00000000-0000-0000-0000-000000000013',
    'Ethiopia', 'Yirgacheffe', 'light', 'washed', 2000, 'Heirloom',
    23.00, 9,
    'Madcap''s Kochere selection from Yirgacheffe is a masterclass in clarity and precision. This washed Ethiopian showcases the region''s signature blueberry and jasmine character with a clean lemon finish that lingers beautifully.',
    'https://madcapcoffee.com/products/ethiopia-yirgacheffe-kochere',
    false, true, 0
  );

-- ============================================================
-- BEAN TASTING NOTES (junction)
-- ============================================================
INSERT INTO bean_tasting_notes (bean_id, note_id) VALUES
  -- Three Africas (101): Blueberry, Jasmine, Bergamot, Cherry
  ('00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0001-000000000001'),
  ('00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0001-000000000032'),
  ('00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0001-000000000037'),
  ('00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0001-000000000003'),

  -- Honduras El Puente (102): Brown Sugar, Apple, Caramel, Hazelnut
  ('00000000-0000-0000-0000-000000000102', '00000000-0000-0000-0001-000000000025'),
  ('00000000-0000-0000-0000-000000000102', '00000000-0000-0000-0001-000000000011'),
  ('00000000-0000-0000-0000-000000000102', '00000000-0000-0000-0001-000000000024'),
  ('00000000-0000-0000-0000-000000000102', '00000000-0000-0000-0001-000000000019'),

  -- Hair Bender (103): Dark Chocolate, Orange, Cherry, Toffee
  ('00000000-0000-0000-0000-000000000103', '00000000-0000-0000-0001-000000000016'),
  ('00000000-0000-0000-0000-000000000103', '00000000-0000-0000-0001-000000000010'),
  ('00000000-0000-0000-0000-000000000103', '00000000-0000-0000-0001-000000000003'),
  ('00000000-0000-0000-0000-000000000103', '00000000-0000-0000-0001-000000000028'),

  -- Nicaragua El Limoncillo (104): Lemon, Apple, Almond, Honey
  ('00000000-0000-0000-0000-000000000104', '00000000-0000-0000-0001-000000000009'),
  ('00000000-0000-0000-0000-000000000104', '00000000-0000-0000-0001-000000000011'),
  ('00000000-0000-0000-0000-000000000104', '00000000-0000-0000-0001-000000000020'),
  ('00000000-0000-0000-0000-000000000104', '00000000-0000-0000-0001-000000000026'),

  -- Black Cat Espresso (105): Cocoa, Cherry, Caramel, Walnut
  ('00000000-0000-0000-0000-000000000105', '00000000-0000-0000-0001-000000000018'),
  ('00000000-0000-0000-0000-000000000105', '00000000-0000-0000-0001-000000000003'),
  ('00000000-0000-0000-0000-000000000105', '00000000-0000-0000-0001-000000000024'),
  ('00000000-0000-0000-0000-000000000105', '00000000-0000-0000-0001-000000000021'),

  -- Ethiopia Hambela (106): Strawberry, Peach, Hibiscus, Tropical
  ('00000000-0000-0000-0000-000000000106', '00000000-0000-0000-0001-000000000002'),
  ('00000000-0000-0000-0000-000000000106', '00000000-0000-0000-0001-000000000005'),
  ('00000000-0000-0000-0000-000000000106', '00000000-0000-0000-0001-000000000036'),
  ('00000000-0000-0000-0000-000000000106', '00000000-0000-0000-0001-000000000013'),

  -- Big Trouble (107): Milk Chocolate, Cherry, Brown Sugar, Almond
  ('00000000-0000-0000-0000-000000000107', '00000000-0000-0000-0001-000000000017'),
  ('00000000-0000-0000-0000-000000000107', '00000000-0000-0000-0001-000000000003'),
  ('00000000-0000-0000-0000-000000000107', '00000000-0000-0000-0001-000000000025'),
  ('00000000-0000-0000-0000-000000000107', '00000000-0000-0000-0001-000000000020'),

  -- Colombia Nariño (108): Apple, Caramel, Vanilla, Citrus
  ('00000000-0000-0000-0000-000000000108', '00000000-0000-0000-0001-000000000011'),
  ('00000000-0000-0000-0000-000000000108', '00000000-0000-0000-0001-000000000024'),
  ('00000000-0000-0000-0000-000000000108', '00000000-0000-0000-0001-000000000027'),
  ('00000000-0000-0000-0000-000000000108', '00000000-0000-0000-0001-000000000008'),

  -- Panama Geisha (109): Jasmine, Bergamot, Peach, Honey
  ('00000000-0000-0000-0000-000000000109', '00000000-0000-0000-0001-000000000032'),
  ('00000000-0000-0000-0000-000000000109', '00000000-0000-0000-0001-000000000037'),
  ('00000000-0000-0000-0000-000000000109', '00000000-0000-0000-0001-000000000005'),
  ('00000000-0000-0000-0000-000000000109', '00000000-0000-0000-0001-000000000026'),

  -- Bolivia Caranavi (110): Raspberry, Lemon, Jasmine, Milk Chocolate
  ('00000000-0000-0000-0000-000000000110', '00000000-0000-0000-0001-000000000004'),
  ('00000000-0000-0000-0000-000000000110', '00000000-0000-0000-0001-000000000009'),
  ('00000000-0000-0000-0000-000000000110', '00000000-0000-0000-0001-000000000032'),
  ('00000000-0000-0000-0000-000000000110', '00000000-0000-0000-0001-000000000017'),

  -- Ethiopia Sidama (111): Lemon, Herbal, Honey, Jasmine
  ('00000000-0000-0000-0000-000000000111', '00000000-0000-0000-0001-000000000009'),
  ('00000000-0000-0000-0000-000000000111', '00000000-0000-0000-0001-000000000047'),
  ('00000000-0000-0000-0000-000000000111', '00000000-0000-0000-0001-000000000026'),
  ('00000000-0000-0000-0000-000000000111', '00000000-0000-0000-0001-000000000032'),

  -- Papua New Guinea (112): Brown Sugar, Tropical, Cedar, Milk Chocolate
  ('00000000-0000-0000-0000-000000000112', '00000000-0000-0000-0001-000000000025'),
  ('00000000-0000-0000-0000-000000000112', '00000000-0000-0000-0001-000000000013'),
  ('00000000-0000-0000-0000-000000000112', '00000000-0000-0000-0001-000000000039'),
  ('00000000-0000-0000-0000-000000000112', '00000000-0000-0000-0001-000000000017'),

  -- Colombia Pink Bourbon (113): Citrus, Passionfruit, Rose, Watermelon
  ('00000000-0000-0000-0000-000000000113', '00000000-0000-0000-0001-000000000008'),
  ('00000000-0000-0000-0000-000000000113', '00000000-0000-0000-0001-000000000014'),
  ('00000000-0000-0000-0000-000000000113', '00000000-0000-0000-0001-000000000033'),
  ('00000000-0000-0000-0000-000000000113', '00000000-0000-0000-0001-000000000015'),

  -- Burundi Kayanza (114): Grape, Cherry, Dark Chocolate, Jasmine
  ('00000000-0000-0000-0000-000000000114', '00000000-0000-0000-0001-000000000012'),
  ('00000000-0000-0000-0000-000000000114', '00000000-0000-0000-0001-000000000003'),
  ('00000000-0000-0000-0000-000000000114', '00000000-0000-0000-0001-000000000016'),
  ('00000000-0000-0000-0000-000000000114', '00000000-0000-0000-0001-000000000032'),

  -- Brazil Fazenda (115): Dark Chocolate, Walnut, Peach, Brown Sugar
  ('00000000-0000-0000-0000-000000000115', '00000000-0000-0000-0001-000000000016'),
  ('00000000-0000-0000-0000-000000000115', '00000000-0000-0000-0001-000000000021'),
  ('00000000-0000-0000-0000-000000000115', '00000000-0000-0000-0001-000000000005'),
  ('00000000-0000-0000-0000-000000000115', '00000000-0000-0000-0001-000000000025'),

  -- Mexico Chiapas (116): Milk Chocolate, Cinnamon, Cherry, Brown Sugar
  ('00000000-0000-0000-0000-000000000116', '00000000-0000-0000-0001-000000000017'),
  ('00000000-0000-0000-0000-000000000116', '00000000-0000-0000-0001-000000000043'),
  ('00000000-0000-0000-0000-000000000116', '00000000-0000-0000-0001-000000000003'),
  ('00000000-0000-0000-0000-000000000116', '00000000-0000-0000-0001-000000000025'),

  -- Costa Rica Tarrazu (117): Apricot, Honey, Peach, Caramel
  ('00000000-0000-0000-0000-000000000117', '00000000-0000-0000-0001-000000000006'),
  ('00000000-0000-0000-0000-000000000117', '00000000-0000-0000-0001-000000000026'),
  ('00000000-0000-0000-0000-000000000117', '00000000-0000-0000-0001-000000000005'),
  ('00000000-0000-0000-0000-000000000117', '00000000-0000-0000-0001-000000000024'),

  -- Sumatra Mandheling (118): Dark Chocolate, Cedar, Earthy, Pepper
  ('00000000-0000-0000-0000-000000000118', '00000000-0000-0000-0001-000000000016'),
  ('00000000-0000-0000-0000-000000000118', '00000000-0000-0000-0001-000000000039'),
  ('00000000-0000-0000-0000-000000000118', '00000000-0000-0000-0001-000000000046'),
  ('00000000-0000-0000-0000-000000000118', '00000000-0000-0000-0001-000000000042'),

  -- Owl's Howl Espresso (119): Raspberry, Dark Chocolate, Brown Sugar, Cherry
  ('00000000-0000-0000-0000-000000000119', '00000000-0000-0000-0001-000000000004'),
  ('00000000-0000-0000-0000-000000000119', '00000000-0000-0000-0001-000000000016'),
  ('00000000-0000-0000-0000-000000000119', '00000000-0000-0000-0001-000000000025'),
  ('00000000-0000-0000-0000-000000000119', '00000000-0000-0000-0001-000000000003'),

  -- Tanzania Peaberry (120): Herbal, Lemon, Cherry, Cedar
  ('00000000-0000-0000-0000-000000000120', '00000000-0000-0000-0001-000000000047'),
  ('00000000-0000-0000-0000-000000000120', '00000000-0000-0000-0001-000000000009'),
  ('00000000-0000-0000-0000-000000000120', '00000000-0000-0000-0001-000000000003'),
  ('00000000-0000-0000-0000-000000000120', '00000000-0000-0000-0001-000000000039'),

  -- Rwanda Musasa (121): Cherry, Hibiscus, Dark Chocolate, Raspberry
  ('00000000-0000-0000-0000-000000000121', '00000000-0000-0000-0001-000000000003'),
  ('00000000-0000-0000-0000-000000000121', '00000000-0000-0000-0001-000000000036'),
  ('00000000-0000-0000-0000-000000000121', '00000000-0000-0000-0001-000000000016'),
  ('00000000-0000-0000-0000-000000000121', '00000000-0000-0000-0001-000000000004'),

  -- Kenya Kirinyaga (122): Grape, Citrus, Brown Sugar, Cocoa
  ('00000000-0000-0000-0000-000000000122', '00000000-0000-0000-0001-000000000012'),
  ('00000000-0000-0000-0000-000000000122', '00000000-0000-0000-0001-000000000008'),
  ('00000000-0000-0000-0000-000000000122', '00000000-0000-0000-0001-000000000025'),
  ('00000000-0000-0000-0000-000000000122', '00000000-0000-0000-0001-000000000018'),

  -- Peru San Ignacio (123): Hazelnut, Milk Chocolate, Apple, Honey
  ('00000000-0000-0000-0000-000000000123', '00000000-0000-0000-0001-000000000019'),
  ('00000000-0000-0000-0000-000000000123', '00000000-0000-0000-0001-000000000017'),
  ('00000000-0000-0000-0000-000000000123', '00000000-0000-0000-0001-000000000011'),
  ('00000000-0000-0000-0000-000000000123', '00000000-0000-0000-0001-000000000026'),

  -- Ethiopia Yirgacheffe Kochere (124): Blueberry, Jasmine, Lemon, Cherry
  ('00000000-0000-0000-0000-000000000124', '00000000-0000-0000-0001-000000000001'),
  ('00000000-0000-0000-0000-000000000124', '00000000-0000-0000-0001-000000000032'),
  ('00000000-0000-0000-0000-000000000124', '00000000-0000-0000-0001-000000000009'),
  ('00000000-0000-0000-0000-000000000124', '00000000-0000-0000-0001-000000000003');

-- ============================================================
-- REVIEWS (36 reviews)
-- ============================================================
INSERT INTO reviews (bean_id, reviewer_name, rating, review_text) VALUES

  -- Three Africas (101)
  ('00000000-0000-0000-0000-000000000101', 'EthiopiaObsessed', 5, 'The jasmine aromatics hit you the moment you open the bag. Brewed as a pour-over, this is one of the most expressive Yirgacheffes I''ve had. The blueberry note is real and the bergamot lingers beautifully on the finish. My new morning ritual.'),
  ('00000000-0000-0000-0000-000000000101', 'CaffeineArtist', 4, 'Blue Bottle has been roasting this profile consistently for years and Three Africas never disappoints. Bright, complex, and incredibly clean. If you haven''t tried proper Ethiopian light roast, this is the perfect starting point.'),
  ('00000000-0000-0000-0000-000000000101', 'MorningBrew42', 4, 'My batch was less floral than reviews suggested — more citrus-forward. Still a very nice light roast with good clarity. Would try again from a fresher roast date.'),

  -- Honduras El Puente (102)
  ('00000000-0000-0000-0000-000000000102', 'DailyDripper', 5, 'This is exactly what I want in an everyday drinker — approachable, sweet, and satisfying without being over-roasted or boring. The apple and caramel balance is spot-on. Works great as drip or French press.'),
  ('00000000-0000-0000-0000-000000000102', 'CentralAmericaFan', 4, 'Honduras doesn''t get enough credit in specialty coffee. El Puente shows what the country can do — clean, balanced, and sweet. The hazelnut note in the finish is lovely. Great with milk too.'),

  -- Hair Bender (103)
  ('00000000-0000-0000-0000-000000000103', 'EspressoHead', 5, 'I''ve been drinking Hair Bender as espresso for ten years. It''s a benchmark — perfectly calibrated between brightness, sweetness, and body. The orange peel and dark chocolate combination is addictive. A non-negotiable in my house.'),
  ('00000000-0000-0000-0000-000000000103', 'BlendBeliever', 5, 'People who dismiss blends haven''t had Hair Bender. It changes and develops as it cools, which is the sign of a thoughtfully composed blend. Works equally well as filter or espresso. Stumptown knows what they''re doing.'),
  ('00000000-0000-0000-0000-000000000103', 'PortlandRoast', 4, 'If you want to understand what made Portland a coffee destination, start here. Hair Bender defined an era of specialty coffee and still holds up beautifully. Cherry and chocolate tones with that signature brightness.'),

  -- Nicaragua El Limoncillo (104)
  ('00000000-0000-0000-0000-000000000104', 'VarietalVirtuoso', 5, 'Pacamara is my favorite variety and El Limoncillo is a prime example of why. The size of the bean delivers incredible body while the lemon-almond profile is uniquely satisfying. Stellar pour-over experience.'),
  ('00000000-0000-0000-0000-000000000104', 'NicaFanatic', 4, 'The Mierisch family consistently produces excellent coffee and this lot is no exception. Very clean, very precise processing shows in the cup — no off-notes, just pure, bright Nicaraguan excellence.'),

  -- Black Cat Espresso (105)
  ('00000000-0000-0000-0000-000000000105', 'ShotPerfectionist', 5, 'Black Cat has been the gold standard in specialty espresso for decades. Pulling it as a ristretto gives you an incredibly thick, syrupy shot with deep cocoa and dried cherry. Add milk and you get one of the best lattes possible.'),
  ('00000000-0000-0000-0000-000000000105', 'CoffeeGeek1984', 5, 'I was skeptical — how good can a classic espresso blend really be after all this time? Very good, it turns out. Intelligentsia keeps this consistent batch after batch. Walnut and caramel with great longevity in the finish.'),
  ('00000000-0000-0000-0000-000000000105', 'MilkFoamMaestro', 4, 'This really shines when paired with steamed milk. The cocoa and caramel notes bloom in a latte or cappuccino in a way that most espresso blends can''t match. A must-try for milk drink enthusiasts.'),

  -- Ethiopia Hambela (106)
  ('00000000-0000-0000-0000-000000000106', 'NaturalProcessPurist', 5, 'I was a washed-only person before this. Hambela''s strawberry and passion fruit intensity is almost shocking — like drinking fruit juice. But it''s not cloying; there''s real depth and complexity here. A transformative coffee.'),
  ('00000000-0000-0000-0000-000000000106', 'EthiopiaEvangelist', 5, 'Ethiopia naturals can be hit or miss but this one delivers consistently. Hibiscus, tropical fruit, and strawberry in perfect balance. Intelligentsia''s Direct Trade sourcing clearly pays off.'),
  ('00000000-0000-0000-0000-000000000106', 'FruitBombFanatic', 5, 'Be warned: this is an assertive natural. If you like your coffee subtle, look elsewhere. If you want an explosion of tropical fruit with genuine complexity, Hambela is your bean. Phenomenal cold-brewed overnight.'),

  -- Panama Geisha (109)
  ('00000000-0000-0000-0000-000000000109', 'GeshaGourmet', 5, 'Yes, $45 for a tiny bag seems absurd. And then you brew it. The jasmine aromatics alone justify the price. The actual cup — peach, bergamot — is unlike anything else in coffee. A luxury I allow myself twice a year.'),
  ('00000000-0000-0000-0000-000000000109', 'FancyCoffeeReviewer', 5, 'Geisha represents what makes specialty coffee special. This particular lot from Ritual is flawlessly processed and roasted. You truly are tasting the terroir of the Chiriquí highlands.'),
  ('00000000-0000-0000-0000-000000000109', 'SipAndPonder', 4, 'The florals are extraordinary but I found it a bit too delicate for my taste — I prefer more body. That said, I can absolutely see why this variety commands such reverence.'),

  -- Colombia Pink Bourbon (113)
  ('00000000-0000-0000-0000-000000000113', 'AnaeronicAdventure', 5, 'Pink lemonade in a cup. I''m serious. The natural processing on Pink Bourbon creates flavor compounds I''ve never encountered before. Onyx is doing things with fermentation that are rewriting what coffee can taste like.'),
  ('00000000-0000-0000-0000-000000000113', 'NewWaveNerd', 4, 'Not for everyone — this is avant-garde coffee. The process-forward flavors are intense and polarizing. But if you appreciate what fermentation science can do for flavor, this is a must-try. Watermelon on the finish!'),

  -- Kenya Kirinyaga (122)
  ('00000000-0000-0000-0000-000000000122', 'KenyaKonoisseur', 5, 'I''ve been chasing the perfect Kenyan coffee for years. Kirinyaga''s double-washed SL28 from Equator hits every note I want: grape brightness, citrus complexity, and a brown sugar sweetness that wakes you up instantly.'),
  ('00000000-0000-0000-0000-000000000122', 'AfricanOriginsFan', 5, 'If you want to explain what Kenya tastes like to someone, use this coffee. The SL28 variety expresses all its characteristic intensity here. Equator''s sourcing ensures the farmers benefit fairly.'),
  ('00000000-0000-0000-0000-000000000122', 'ColdBrewConvert', 4, 'Kenyan coffees are usually best hot but this Kirinyaga cold brewed overnight produced something remarkable — the grape and citrus notes became almost savory-sweet. Highly recommend trying it cold.'),

  -- Rwanda Musasa (121)
  ('00000000-0000-0000-0000-000000000121', 'EastAfricaEnthusiast', 5, 'Ruby''s sourcing from Musasa station consistently delivers one of the best Rwandans available in the US. The cherry and raspberry acidity is vibrant and the dark chocolate finish provides great balance.'),
  ('00000000-0000-0000-0000-000000000121', 'DailyDripper', 4, 'The hibiscus note is really noticeable in the aromatics. Very refreshing and fruit-forward cup. Perfect for warm mornings when you want something bright. Will definitely reorder.'),

  -- Burundi Kayanza (114)
  ('00000000-0000-0000-0000-000000000114', 'BurundiBeliever', 5, 'Burundi doesn''t get enough spotlight in the specialty world. Onyx''s Kayanza shows exactly why it should. Grape and cherry depth with floral complexity and a dark chocolate finish. This rivals any East African coffee.'),
  ('00000000-0000-0000-0000-000000000114', 'FrenchPressFan', 4, 'In a French press, this coffee becomes magnificently juicy. The cherry fruit really opens up after a 4-minute steep. One of the better Burundis I''ve encountered.'),

  -- Costa Rica Tarrazu (117)
  ('00000000-0000-0000-0000-000000000117', 'HoneyProcessHero', 5, 'Verve''s Tarrazu honey is everything I want from this process: the sweetness of a natural with the clarity of a washed. Apricot and peach are real and prominent, with a lovely honey-caramel finish.'),
  ('00000000-0000-0000-0000-000000000117', 'CentralAmericaFan', 4, 'Costa Rica Tarrazu is a benchmark region for a reason, and Verve''s selection honors that reputation. The honey process adds just the right amount of sweetness without muddying the clean character.'),

  -- Brazil Fazenda (115)
  ('00000000-0000-0000-0000-000000000115', 'BrazilBuff', 5, 'George Howell knows Brazil better than anyone. This Sertãozinho natural is silky smooth with real dark chocolate depth and a peach sweetness of a well-processed natural. No ferment defects whatsoever.'),
  ('00000000-0000-0000-0000-000000000115', 'EspressoHead', 4, 'Brazilian naturals are underrated for espresso. The full body and chocolate-walnut sweetness make for an incredibly smooth, approachable shot. Great for beginners and coffee geeks alike.'),

  -- Sumatra Mandheling (118)
  ('00000000-0000-0000-0000-000000000118', 'EarthyBoldBrew', 4, 'Exactly what dark roast Sumatra fans want: full body, cedar and earth notes, black pepper spice, and a satisfying bitterness that holds up beautifully with milk. Verve''s sourcing elevates this above typical Sumatrans.'),
  ('00000000-0000-0000-0000-000000000118', 'MorningBrew42', 3, 'Not my personal preference — I lean toward brighter coffees — but I can objectively say this is very well-sourced and roasted for the style. If you like earthy, dark, and bold, this delivers.'),

  -- Colombia Nariño (108)
  ('00000000-0000-0000-0000-000000000108', 'HighAltitudeHunter', 5, 'Nariño''s extreme altitude gives this coffee its signature brightness and sweetness. Counter Culture has been consistently excellent with Colombian lots and this one continues that tradition.'),
  ('00000000-0000-0000-0000-000000000108', 'SipAndPonder', 4, 'Works equally well as filter or espresso. The vanilla and caramel notes come through cleanly regardless of brew method. A crowd-pleasing coffee for those who find light roasts too challenging.'),

  -- Ethiopia Yirgacheffe Kochere (124)
  ('00000000-0000-0000-0000-000000000124', 'YirgacheffeLover', 5, 'Madcap has done something special with this Kochere. The blueberry note is intensely clear without being jammy, and the jasmine aromatics are everything you could want from a Yirgacheffe. Exceptional precision.'),
  ('00000000-0000-0000-0000-000000000124', 'PourOverPerfectionist', 4, 'Beautifully clean and expressive. The lemon finish is bright and lingering. Madcap''s sourcing philosophy really shines through here. Would pair beautifully with a light breakfast.');
