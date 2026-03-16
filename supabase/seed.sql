-- ============================================================
-- Cupped — Seed Data
-- 12 Roasters · 23 Beans · 35 Reviews
-- ============================================================

-- ============================================================
-- ROASTERS
-- ============================================================
INSERT INTO roasters (id, name, slug, location, description, website, founded_year) VALUES
  (
    '00000000-0000-0000-0000-000000000001',
    'Blue Bottle Coffee',
    'blue-bottle-coffee',
    'Oakland, CA',
    'Blue Bottle Coffee was founded in 2002 with a commitment to serving coffee that is less than 48 hours from roast. They source exceptional single-origin and blended coffees with meticulous care and transparency.',
    'https://bluebottlecoffee.com',
    2002
  ),
  (
    '00000000-0000-0000-0000-000000000002',
    'Stumptown Coffee Roasters',
    'stumptown-coffee-roasters',
    'Portland, OR',
    'Stumptown pioneered the direct trade movement in coffee, building deep relationships with farmers across the globe. Since 1999, they have been committed to extraordinary coffee and the people who grow it.',
    'https://stumptowncoffee.com',
    1999
  ),
  (
    '00000000-0000-0000-0000-000000000003',
    'Intelligentsia Coffee',
    'intelligentsia-coffee',
    'Chicago, IL',
    'Intelligentsia has been at the forefront of specialty coffee since 1995. Their Direct Trade program ensures farmers receive premium prices while delivering some of the most distinctive coffees in the world.',
    'https://intelligentsiacoffee.com',
    1995
  ),
  (
    '00000000-0000-0000-0000-000000000004',
    'Counter Culture Coffee',
    'counter-culture-coffee',
    'Durham, NC',
    'Counter Culture has been pushing the boundaries of specialty coffee since 1995. They are committed to sustainability, transparency, and continuous education in coffee excellence.',
    'https://counterculturecoffee.com',
    1995
  ),
  (
    '00000000-0000-0000-0000-000000000005',
    'Ritual Coffee Roasters',
    'ritual-coffee-roasters',
    'San Francisco, CA',
    'Ritual was founded in 2005 in the heart of San Francisco''s Mission District. They travel the world to find extraordinary coffees and roast them to highlight their most interesting characteristics.',
    'https://ritualcoffee.com',
    2005
  ),
  (
    '00000000-0000-0000-0000-000000000006',
    'Heart Coffee Roasters',
    'heart-coffee-roasters',
    'Portland, OR',
    'Heart was established in 2009 with a focus on transparency and quality at every step. Their beautiful Scandinavian-inspired approach to coffee has earned them a devoted following.',
    'https://heartroasters.com',
    2009
  ),
  (
    '00000000-0000-0000-0000-000000000007',
    'Onyx Coffee Lab',
    'onyx-coffee-lab',
    'Bentonville, AR',
    'Onyx Coffee Lab was founded in 2012 with a scientific, meticulous approach to sourcing and roasting. They consistently produce award-winning coffees with a focus on pushing specialty boundaries.',
    'https://onyxcoffeelab.com',
    2012
  ),
  (
    '00000000-0000-0000-0000-000000000008',
    'George Howell Coffee',
    'george-howell-coffee',
    'Acton, MA',
    'George Howell has been a pioneer in specialty coffee since the 1970s. Known for incredibly precise sourcing and light roasting that preserves the natural terroir of each bean.',
    'https://georgehowellcoffee.com',
    2004
  ),
  (
    '00000000-0000-0000-0000-000000000009',
    'Verve Coffee Roasters',
    'verve-coffee-roasters',
    'Santa Cruz, CA',
    'Verve was founded in 2007 in Santa Cruz with a focus on building direct relationships with farmers and honoring the hard work that goes into growing exceptional coffee.',
    'https://vervecoffee.com',
    2007
  ),
  (
    '00000000-0000-0000-0000-000000000010',
    'Sightglass Coffee',
    'sightglass-coffee',
    'San Francisco, CA',
    'Sightglass opened in 2009 in San Francisco''s SoMa neighborhood. They roast thoughtfully and source globally, creating coffees that are complex and accessible.',
    'https://sightglasscoffee.com',
    2009
  ),
  (
    '00000000-0000-0000-0000-000000000011',
    'Ruby Coffee Roasters',
    'ruby-coffee-roasters',
    'Nelsonville, WI',
    'Ruby Coffee was founded in 2013 and has quickly become one of the most respected specialty roasters in the Midwest, known for clean, expressive coffees roasted with extraordinary care.',
    'https://rubycoffeeroasters.com',
    2013
  ),
  (
    '00000000-0000-0000-0000-000000000012',
    'Equator Coffees',
    'equator-coffees',
    'San Rafael, CA',
    'Equator has been roasting exceptional specialty coffee since 1995 with a deep commitment to sustainability, equity, and environmental responsibility. They were the first Certified B Corp in the California coffee industry.',
    'https://equatorcoffees.com',
    1995
  );


-- ============================================================
-- BEANS (23 beans)
-- ============================================================
INSERT INTO beans (id, name, slug, roaster_id, origin, region, process, roast_level, flavor_notes, description, price, weight_grams, is_single_origin, altitude_meters, variety, harvest_year) VALUES
  -- Blue Bottle (1-2)
  (
    '00000000-0000-0000-0000-000000000101',
    'Three Africas',
    'three-africas-blue-bottle',
    '00000000-0000-0000-0000-000000000001',
    'Ethiopia',
    'Yirgacheffe',
    'washed',
    'light',
    ARRAY['blueberry', 'jasmine', 'bergamot', 'stone fruit'],
    'A classic blend from three of Ethiopia''s most celebrated growing regions. Bright, floral, and bursting with fruit, this is the coffee that made Blue Bottle famous. Expect a juicy, wine-like body with an exceptionally clean finish.',
    19.00,
    250,
    false,
    1900,
    'Heirloom',
    2023
  ),
  (
    '00000000-0000-0000-0000-000000000102',
    'Honduras El Puente',
    'honduras-el-puente-blue-bottle',
    '00000000-0000-0000-0000-000000000001',
    'Honduras',
    'Copán',
    'washed',
    'medium',
    ARRAY['brown sugar', 'apple', 'caramel', 'hazelnut'],
    'Sourced from small farms in the Copán region of Honduras, El Puente is a smooth, approachable coffee with a balanced sweetness. The washed process highlights its clean clarity while brown sugar and apple notes make it endlessly drinkable.',
    17.50,
    250,
    true,
    1400,
    'Catuai',
    2023
  ),

  -- Stumptown (3-4)
  (
    '00000000-0000-0000-0000-000000000103',
    'Hair Bender',
    'hair-bender-stumptown',
    '00000000-0000-0000-0000-000000000002',
    'Ethiopia',
    'Multiple Regions',
    'washed',
    'medium',
    ARRAY['dark chocolate', 'orange peel', 'cherry', 'toffee'],
    'Stumptown''s flagship blend for over two decades. Hair Bender is a complex, dynamic coffee blending Central American and East African beans. Bright citrus acidity, a syrupy body, and lingering chocolate notes make this a benchmark in specialty blending.',
    16.00,
    340,
    false,
    NULL,
    NULL,
    2023
  ),
  (
    '00000000-0000-0000-0000-000000000104',
    'Nicaragua El Limoncillo',
    'nicaragua-el-limoncillo-stumptown',
    '00000000-0000-0000-0000-000000000002',
    'Nicaragua',
    'Nueva Segovia',
    'washed',
    'medium-light',
    ARRAY['lemon zest', 'green apple', 'almond', 'honey'],
    'From the Mierisch family''s El Limoncillo farm in Nueva Segovia, this beautifully expressive coffee shows what Nicaragua does best. A bright, citrus-forward acidity gives way to a delicate almond sweetness and clean honey finish.',
    18.00,
    250,
    true,
    1300,
    'Pacamara',
    2023
  ),

  -- Intelligentsia (5-6)
  (
    '00000000-0000-0000-0000-000000000105',
    'Black Cat Espresso',
    'black-cat-espresso-intelligentsia',
    '00000000-0000-0000-0000-000000000003',
    'Guatemala',
    'Huehuetenango',
    'washed',
    'medium-dark',
    ARRAY['cocoa', 'dried cherry', 'caramel', 'walnut'],
    'Intelligentsia''s iconic espresso blend has been refined over 20 years. Black Cat delivers a thick, syrupy shot with classic espresso character: bittersweet cocoa, dried cherry, and a long, sweet caramel finish. The gold standard for espresso.',
    17.00,
    340,
    false,
    NULL,
    NULL,
    2023
  ),
  (
    '00000000-0000-0000-0000-000000000106',
    'Ethiopia Hambela',
    'ethiopia-hambela-intelligentsia',
    '00000000-0000-0000-0000-000000000003',
    'Ethiopia',
    'Guji Zone',
    'natural',
    'light',
    ARRAY['strawberry', 'peach', 'hibiscus', 'tropical fruit'],
    'From the Hambela washing station in the Guji Zone, this natural processed coffee is a sensory explosion. Intensely fruity with strawberry jam, peach, and tropical notes that evolve into a floral hibiscus finish. It''s unlike anything else.',
    22.00,
    250,
    true,
    2000,
    'Heirloom',
    2023
  ),

  -- Counter Culture (7-8)
  (
    '00000000-0000-0000-0000-000000000107',
    'Big Trouble',
    'big-trouble-counter-culture',
    '00000000-0000-0000-0000-000000000004',
    'Colombia',
    'Multiple Regions',
    'washed',
    'medium',
    ARRAY['milk chocolate', 'plum', 'brown sugar', 'toasted almond'],
    'Counter Culture''s most approachable blend, Big Trouble is designed to be delicious at any time of day. Featuring coffees from Colombia and other origins, it delivers rich milk chocolate sweetness with a fruity plum depth and clean finish.',
    14.50,
    340,
    false,
    NULL,
    NULL,
    2023
  ),
  (
    '00000000-0000-0000-0000-000000000108',
    'Colombia Nariño',
    'colombia-narino-counter-culture',
    '00000000-0000-0000-0000-000000000004',
    'Colombia',
    'Nariño',
    'washed',
    'medium-light',
    ARRAY['red apple', 'caramel', 'vanilla', 'bright citrus'],
    'Nariño''s unique high-altitude geography and equatorial climate produce coffees of incredible sweetness and clarity. This lot showcases the best of the region: crisp apple acidity, caramel sweetness, and a long, clean vanilla finish.',
    19.00,
    250,
    true,
    2100,
    'Castillo',
    2023
  ),

  -- Ritual (9-10)
  (
    '00000000-0000-0000-0000-000000000109',
    'Panama Geisha',
    'panama-geisha-ritual',
    '00000000-0000-0000-0000-000000000005',
    'Panama',
    'Chiriquí',
    'washed',
    'light',
    ARRAY['jasmine', 'bergamot', 'peach', 'white wine', 'honeysuckle'],
    'The legendary Geisha variety from Panama''s Chiriquí Highlands. This extraordinarily rare and delicate coffee is defined by its intense floral aromatics and tea-like clarity. A once-in-a-lifetime coffee experience for the serious enthusiast.',
    45.00,
    100,
    true,
    1700,
    'Geisha',
    2023
  ),
  (
    '00000000-0000-0000-0000-000000000110',
    'Bolivia Caranavi',
    'bolivia-caranavi-ritual',
    '00000000-0000-0000-0000-000000000005',
    'Bolivia',
    'Caranavi',
    'washed',
    'light',
    ARRAY['raspberry', 'lemon curd', 'floral', 'milk chocolate'],
    'Bolivia is one of specialty coffee''s best-kept secrets. This lot from the Caranavi region comes from smallholder farms at extreme altitude, producing a coffee with a distinctive brightness, raspberry fruit, and silky milk chocolate finish.',
    24.00,
    200,
    true,
    1800,
    'Caturra',
    2023
  ),

  -- Heart (11-12)
  (
    '00000000-0000-0000-0000-000000000111',
    'Ethiopia Sidama',
    'ethiopia-sidama-heart',
    '00000000-0000-0000-0000-000000000006',
    'Ethiopia',
    'Sidama',
    'washed',
    'light',
    ARRAY['lemon verbena', 'green tea', 'honeydew', 'floral'],
    'Heart''s Sidama selection exemplifies their philosophy of minimal intervention roasting. Delicate lemon verbena and green tea notes lead to a sweet honeydew melon finish. Elegant and restrained, it rewards slow brewing and careful attention.',
    21.00,
    250,
    true,
    1900,
    'Heirloom',
    2023
  ),
  (
    '00000000-0000-0000-0000-000000000112',
    'Papua New Guinea Eastern Highlands',
    'png-eastern-highlands-heart',
    '00000000-0000-0000-0000-000000000006',
    'Papua New Guinea',
    'Eastern Highlands',
    'washed',
    'medium',
    ARRAY['brown sugar', 'tropical fruit', 'cedar', 'milk chocolate'],
    'From the remote highlands of Papua New Guinea, this coffee showcases the uniquely earthy and tropical character of the region. Brown sugar sweetness, ripe tropical fruit, and a cedar-wood complexity make this a fascinating and distinctive cup.',
    20.00,
    250,
    true,
    1600,
    'Arusha',
    2023
  ),

  -- Onyx (13-14)
  (
    '00000000-0000-0000-0000-000000000113',
    'Colombia Pink Bourbon',
    'colombia-pink-bourbon-onyx',
    '00000000-0000-0000-0000-000000000007',
    'Colombia',
    'Huila',
    'natural',
    'light',
    ARRAY['pink lemonade', 'passion fruit', 'rose', 'watermelon'],
    'The rare Pink Bourbon variety from Colombia''s Huila department processed via natural fermentation. Onyx''s meticulous sourcing brings out an astonishing array of tropical and floral notes. This is at the very cutting edge of specialty coffee.',
    32.00,
    150,
    true,
    1850,
    'Pink Bourbon',
    2023
  ),
  (
    '00000000-0000-0000-0000-000000000114',
    'Burundi Kayanza',
    'burundi-kayanza-onyx',
    '00000000-0000-0000-0000-000000000007',
    'Burundi',
    'Kayanza',
    'washed',
    'light',
    ARRAY['blackcurrant', 'plum', 'dark chocolate', 'floral'],
    'Burundi''s finest coffees come from the northern province of Kayanza, where cool temperatures and rich volcanic soils produce exceptional cherries. Expect deep blackcurrant and plum fruit with a dark chocolate finish and vibrant floral aromatics.',
    23.00,
    250,
    true,
    1750,
    'Red Bourbon',
    2023
  ),

  -- George Howell (15-16)
  (
    '00000000-0000-0000-0000-000000000115',
    'Brazil Fazenda Sertãozinho',
    'brazil-fazenda-sertaozinho-george-howell',
    '00000000-0000-0000-0000-000000000008',
    'Brazil',
    'Cerrado Mineiro',
    'natural',
    'medium-light',
    ARRAY['dark chocolate', 'walnut', 'dried fig', 'brown sugar'],
    'George Howell''s long-standing relationship with Fazenda Sertãozinho in the Cerrado Mineiro region yields one of Brazil''s most refined naturals. Rich, nutty, and sweet with dark chocolate and dried fig notes and a smooth, full body.',
    18.00,
    250,
    true,
    1050,
    'Yellow Bourbon',
    2023
  ),
  (
    '00000000-0000-0000-0000-000000000116',
    'Mexico Chiapas',
    'mexico-chiapas-george-howell',
    '00000000-0000-0000-0000-000000000008',
    'Mexico',
    'Chiapas',
    'washed',
    'medium',
    ARRAY['milk chocolate', 'cinnamon', 'dried fruit', 'brown sugar'],
    'From smallholder farms in Mexico''s Chiapas highlands, this thoughtfully sourced coffee offers a warming, approachable cup. Classic washed Mexico character with milk chocolate, subtle cinnamon spice, and a sweet dried fruit finish.',
    15.00,
    250,
    true,
    1400,
    'Bourbon',
    2023
  ),

  -- Verve (17-18)
  (
    '00000000-0000-0000-0000-000000000117',
    'Costa Rica Tarrazu',
    'costa-rica-tarrazu-verve',
    '00000000-0000-0000-0000-000000000009',
    'Costa Rica',
    'Tarrazú',
    'honey',
    'medium-light',
    ARRAY['apricot', 'honey', 'nectarine', 'caramel'],
    'From Costa Rica''s legendary Tarrazú region, this honey processed coffee showcases the best of the Central American terroir. Verve''s sourcing highlights the apricot and nectarine fruit character while the honey process adds a luscious sweetness.',
    20.00,
    250,
    true,
    1600,
    'Catuai',
    2023
  ),
  (
    '00000000-0000-0000-0000-000000000118',
    'Indonesia Sumatra Mandheling',
    'indonesia-sumatra-mandheling-verve',
    '00000000-0000-0000-0000-000000000009',
    'Indonesia',
    'North Sumatra',
    'wet-hulled',
    'dark',
    ARRAY['dark chocolate', 'cedar', 'earth', 'black pepper', 'tobacco'],
    'The classic Sumatran experience. Processed using the traditional wet-hulled method, this Mandheling delivers everything lovers of bold coffee seek: earthy complexity, full body, dark chocolate bitterness, and cedar-spice aromatics.',
    17.00,
    250,
    true,
    1200,
    'Typica',
    2023
  ),

  -- Sightglass (19-20)
  (
    '00000000-0000-0000-0000-000000000119',
    'Owl''s Howl Espresso',
    'owls-howl-espresso-sightglass',
    '00000000-0000-0000-0000-000000000010',
    'Ethiopia',
    'Multiple',
    'natural',
    'medium',
    ARRAY['raspberry jam', 'dark chocolate', 'brown sugar', 'cherry'],
    'Sightglass''s flagship espresso blend balances bright East African fruit with a rich chocolate backbone. Owl''s Howl was designed to shine as espresso or with milk, making it one of the most versatile and consistently excellent blends around.',
    18.00,
    340,
    false,
    NULL,
    NULL,
    2023
  ),
  (
    '00000000-0000-0000-0000-000000000120',
    'Tanzania Peaberry',
    'tanzania-peaberry-sightglass',
    '00000000-0000-0000-0000-000000000010',
    'Tanzania',
    'Kilimanjaro',
    'washed',
    'medium-light',
    ARRAY['black tea', 'lemon', 'dried cherry', 'cedar'],
    'Peaberry beans, where a single round seed develops instead of two flat-sided beans, are prized for their concentrated flavor. This Kilimanjaro peaberry delivers elegant black tea complexity, lemon brightness, and a cedar-dried cherry finish.',
    22.00,
    200,
    true,
    1600,
    'Peaberry',
    2023
  ),

  -- Ruby (21)
  (
    '00000000-0000-0000-0000-000000000121',
    'Rwanda Musasa',
    'rwanda-musasa-ruby',
    '00000000-0000-0000-0000-000000000011',
    'Rwanda',
    'Gakenke',
    'washed',
    'light',
    ARRAY['cranberry', 'pomegranate', 'hibiscus', 'dark chocolate'],
    'Ruby''s Rwanda Musasa, sourced from the Musasa washing station in Gakenke district, is everything that makes Rwandan coffee special. Vibrant cranberry and pomegranate acidity, hibiscus florals, and a lingering dark chocolate finish.',
    22.00,
    250,
    true,
    1800,
    'Red Bourbon',
    2023
  ),

  -- Equator (22-23)
  (
    '00000000-0000-0000-0000-000000000122',
    'Kenya Kirinyaga',
    'kenya-kirinyaga-equator',
    '00000000-0000-0000-0000-000000000012',
    'Kenya',
    'Kirinyaga',
    'washed',
    'light',
    ARRAY['blackcurrant', 'tomato', 'grapefruit', 'brown sugar'],
    'Kenya''s double-washed AA-grade coffee from the fertile slopes of Mount Kenya. Equator''s Kirinyaga selection delivers the classic Kenyan profile in its purest form: intense blackcurrant, savory tomato, and grapefruit brightness with a molasses-like sweetness.',
    24.00,
    250,
    true,
    1750,
    'SL28',
    2023
  ),
  (
    '00000000-0000-0000-0000-000000000123',
    'Peru San Ignacio',
    'peru-san-ignacio-equator',
    '00000000-0000-0000-0000-000000000012',
    'Peru',
    'Cajamarca',
    'washed',
    'medium',
    ARRAY['hazelnut', 'milk chocolate', 'green apple', 'honey'],
    'From the high-altitude cooperative farms in Peru''s Cajamarca region, this certified organic coffee is clean, sweet, and deeply approachable. Equator''s commitment to fair trade sourcing ensures every cup supports the farming communities who grew it.',
    16.00,
    250,
    true,
    1700,
    'Caturra',
    2023
  );


-- ============================================================
-- REVIEWS (35 reviews across 20+ beans)
-- ============================================================
INSERT INTO reviews (bean_id, reviewer_name, rating, title, body, brew_method) VALUES

  -- Three Africas (bean 101) - 3 reviews
  (
    '00000000-0000-0000-0000-000000000101',
    'EthiopiaObsessed',
    4.5,
    'A floral masterpiece',
    'The jasmine aromatics hit you the moment you open the bag. Brewed as a pour-over, this is one of the most expressive Yirgacheffes I''ve had. The blueberry note is real and the bergamot lingers beautifully on the finish. My new morning ritual.',
    'pour-over'
  ),
  (
    '00000000-0000-0000-0000-000000000101',
    'CaffeineArtist',
    4.0,
    'Worth the price',
    'Blue Bottle has been roasting this profile consistently for years and Three Africas never disappoints. Bright, complex, and incredibly clean. If you haven''t tried proper Ethiopian light roast, this is the perfect starting point.',
    'pour-over'
  ),
  (
    '00000000-0000-0000-0000-000000000101',
    'MorningBrew42',
    3.5,
    'Good but expected more floral',
    'My batch was less floral than reviews suggested — more citrus-forward. Still a very nice light roast with good clarity. Perhaps I received an older bag. Would try again from a fresher roast date.',
    'aeropress'
  ),

  -- Honduras El Puente (bean 102) - 2 reviews
  (
    '00000000-0000-0000-0000-000000000102',
    'DailyDripper',
    4.5,
    'Perfect everyday coffee',
    'This is exactly what I want in an everyday drinker — approachable, sweet, and satisfying without being over-roasted or boring. The apple and caramel balance is spot-on. Works great as drip or French press.',
    'drip'
  ),
  (
    '00000000-0000-0000-0000-000000000102',
    'CentralAmericaFan',
    4.0,
    'Solid Honduras',
    'Honduras doesn''t get enough credit in specialty coffee. El Puente shows what the country can do — clean, balanced, and sweet. The hazelnut note in the finish reminds me of roasted nuts. Great with milk too.',
    'french-press'
  ),

  -- Hair Bender (bean 103) - 3 reviews
  (
    '00000000-0000-0000-0000-000000000103',
    'EspressoHead',
    5.0,
    'The best espresso blend I''ve ever had',
    'I''ve been drinking Hair Bender as espresso for ten years. It''s a benchmark — perfectly calibrated between brightness, sweetness, and body. The orange peel + dark chocolate combination is addictive. A non-negotiable in my house.',
    'espresso'
  ),
  (
    '00000000-0000-0000-0000-000000000103',
    'BlendBeliever',
    4.5,
    'Complex and dynamic',
    'People who dismiss blends haven''t had Hair Bender. It changes and develops as it cools, which is the sign of a thoughtfully composed blend. Works equally well as filter or espresso. Stumptown knows what they''re doing.',
    'pour-over'
  ),
  (
    '00000000-0000-0000-0000-000000000103',
    'PortlandRoast',
    4.0,
    'Classic Stumptown',
    'If you want to understand what made Portland a coffee destination, start here. Hair Bender defined an era of specialty coffee and still holds up beautifully. Cherry and chocolate tones with that signature brightness.',
    'drip'
  ),

  -- Nicaragua El Limoncillo (bean 104) - 2 reviews
  (
    '00000000-0000-0000-0000-000000000104',
    'VarietalVirtuoso',
    4.5,
    'Pacamara at its best',
    'Pacamara is my favorite variety and El Limoncillo is a prime example of why. The size of the bean delivers incredible body while the lemon-almond profile is uniquely satisfying. Stellar pour-over experience.',
    'pour-over'
  ),
  (
    '00000000-0000-0000-0000-000000000104',
    'NicaFanatic',
    4.0,
    'Bright and clean',
    'The Mierisch family consistently produces excellent coffee and this lot is no exception. Very clean, very precise processing shows in the cup — no off-notes, just pure, bright Nicaraguan excellence.',
    'aeropress'
  ),

  -- Black Cat Espresso (bean 105) - 3 reviews
  (
    '00000000-0000-0000-0000-000000000105',
    'ShotPerfectionist',
    5.0,
    'Set the benchmark for espresso blends',
    'Black Cat has been the gold standard in specialty espresso for decades. Pulling it as a ristretto gives you an incredibly thick, syrupy shot with deep cocoa and dried cherry. Add milk and you get one of the best lattes possible.',
    'espresso'
  ),
  (
    '00000000-0000-0000-0000-000000000105',
    'CoffeeGeek_1984',
    4.5,
    'Lives up to the legend',
    'I was skeptical — how good can a "classic" espresso blend really be after all this time? Very good, it turns out. Intelligentsia keeps this consistent batch after batch. Walnut and caramel with great longevity in the finish.',
    'espresso'
  ),
  (
    '00000000-0000-0000-0000-000000000105',
    'MilkFoamMaestro',
    4.0,
    'Exceptional with milk',
    'This really shines when paired with steamed milk. The cocoa and caramel notes bloom in a latte or cappuccino in a way that most espresso blends can''t match. A must-try for milk drink enthusiasts.',
    'espresso'
  ),

  -- Ethiopia Hambela (bean 106) - 3 reviews
  (
    '00000000-0000-0000-0000-000000000106',
    'NaturalProcessPurist',
    5.0,
    'This changed how I think about coffee',
    'I was a washed-only person before this. Hambela''s strawberry and passion fruit intensity is almost shocking — like drinking fruit juice. But it''s not cloying; there''s real depth and complexity here. A transformative coffee.',
    'pour-over'
  ),
  (
    '00000000-0000-0000-0000-000000000106',
    'EthiopiaEvangelist',
    5.0,
    'Best natural Ethiopian I''ve found',
    'Ethiopia naturals can be hit or miss but this one delivers consistently. Hibiscus, tropical fruit, and strawberry in perfect balance. Intelligentsia''s Direct Trade sourcing clearly pays off. I order this every season it''s available.',
    'pour-over'
  ),
  (
    '00000000-0000-0000-0000-000000000106',
    'FruitBombFanatic',
    4.5,
    'Intensely fruity and complex',
    'Be warned: this is an assertive natural. If you like your coffee subtle, look elsewhere. If you want an explosion of tropical fruit with genuine complexity, Hambela is your bean. Phenomenal cold-brewed overnight.',
    'cold-brew'
  ),

  -- Panama Geisha (bean 109) - 3 reviews
  (
    '00000000-0000-0000-0000-000000000109',
    'GeshaGourmet',
    5.0,
    'Worth every penny',
    'Yes, $45 for 100g seems absurd. And then you brew it. The jasmine aromatics alone justify the price. The actual cup — white wine, peach, bergamot — is unlike anything else in coffee. A luxury I allow myself twice a year.',
    'pour-over'
  ),
  (
    '00000000-0000-0000-0000-000000000109',
    'FancyCoffeeReviewer',
    4.5,
    'The pinnacle of the craft',
    'Geisha represents what makes specialty coffee special. This particular lot from Ritual is flawlessly processed and roasted. You truly are tasting the terroir of the Chiriquí highlands. Brew it at 93°C with a Chemex for maximum florals.',
    'pour-over'
  ),
  (
    '00000000-0000-0000-0000-000000000109',
    'SipAndPonder',
    4.0,
    'Beautiful but delicate',
    'The florals are extraordinary but I found it a bit too delicate for my taste — I prefer more body. That said, I can absolutely see why this variety commands such reverence. Exceptional brewing precision rewarded.',
    'pour-over'
  ),

  -- Colombia Pink Bourbon (bean 113) - 2 reviews
  (
    '00000000-0000-0000-0000-000000000113',
    'AnaeronicAdventure',
    5.0,
    'Most unique coffee I''ve ever had',
    'Pink lemonade in a cup. I''m serious. The anaerobic natural processing on Pink Bourbon creates flavor compounds I''ve never encountered before. Onyx is doing things with fermentation that are completely rewriting what coffee can taste like.',
    'pour-over'
  ),
  (
    '00000000-0000-0000-0000-000000000113',
    'NewWaveNerd',
    4.5,
    'Wild and wonderful',
    'Not for everyone — this is avant-garde coffee. The process-forward flavors are intense and polarizing. But if you appreciate what fermentation science can do for flavor development, this is a must-try. Watermelon on the finish!',
    'aeropress'
  ),

  -- Kenya Kirinyaga (bean 122) - 3 reviews
  (
    '00000000-0000-0000-0000-000000000122',
    'KenyaKonoisseur',
    5.0,
    'Classic Kenya done perfectly',
    'I''ve been chasing the perfect Kenyan coffee for years. Kirinyaga''s double-washed SL28 from Equator hits every note I want: blackcurrant brightness, tomato savory complexity, and a grapefruit zing that wakes you up instantly.',
    'pour-over'
  ),
  (
    '00000000-0000-0000-0000-000000000122',
    'AfricanOriginsFan',
    4.5,
    'Quintessential Kenyan',
    'If you want to explain what Kenya tastes like to someone, use this coffee. The SL28 variety expresses all its characteristic intensity here. Equator''s sourcing ensures the farmers benefit fairly. Guilt-free and spectacular.',
    'pour-over'
  ),
  (
    '00000000-0000-0000-0000-000000000122',
    'ColdBrewConvert',
    4.0,
    'Incredible cold brewed',
    'Kenyan coffees are usually best hot but this Kirinyaga cold brewed overnight produced something remarkable — the blackcurrant and tomato notes became almost savory-sweet, like a complex shrub. Highly recommend trying it cold.',
    'cold-brew'
  ),

  -- Rwanda Musasa (bean 121) - 2 reviews
  (
    '00000000-0000-0000-0000-000000000121',
    'EastAfricaEnthusiast',
    4.5,
    'Rwanda''s finest',
    'Ruby''s sourcing from Musasa station consistently delivers one of the best Rwandans available in the US. The pomegranate and cranberry acidity is vibrant and the dark chocolate finish provides great balance. Light, bright, and elegant.',
    'pour-over'
  ),
  (
    '00000000-0000-0000-0000-000000000121',
    'DailyDripper',
    4.0,
    'Refreshingly bright',
    'The hibiscus note is really noticeable in the aromatics. Very refreshing and fruit-forward cup. Perfect for warm mornings when you want something bright without the heaviness of a full-bodied coffee. Will definitely reorder.',
    'drip'
  ),

  -- Burundi Kayanza (bean 114) - 2 reviews
  (
    '00000000-0000-0000-0000-000000000114',
    'BurundiBeliever',
    5.0,
    'Hidden gem origin',
    'Burundi doesn''t get enough spotlight in the specialty world. Onyx''s Kayanza shows exactly why it should. Blackcurrant and plum depth with floral complexity and a dark chocolate finish. This rivals any East African coffee at twice the price.',
    'pour-over'
  ),
  (
    '00000000-0000-0000-0000-000000000114',
    'FrenchPressFan',
    4.0,
    'Rich and juicy',
    'In a French press, this coffee becomes magnificently juicy. The plum fruit really opens up after a 4-minute steep. A coffee that rewards patience and coarser grinds. One of the better Burundis I''ve encountered.',
    'french-press'
  ),

  -- Costa Rica Tarrazu (bean 117) - 2 reviews
  (
    '00000000-0000-0000-0000-000000000117',
    'HoneyProcessHero',
    4.5,
    'Honey process done right',
    'Verve''s Tarrazu honey is everything I want from this process: the sweetness of a natural with the clarity of a washed. Apricot and nectarine are real and prominent, with a lovely caramel finish. Excellent in a V60.',
    'pour-over'
  ),
  (
    '00000000-0000-0000-0000-000000000117',
    'CentralAmericaFan',
    4.0,
    'Reliably excellent',
    'Costa Rica Tarrazu is a benchmark region for a reason, and Verve''s selection honors that reputation. The honey process adds just the right amount of sweetness without muddying the clean Tarrazú character.',
    'drip'
  ),

  -- Brazil Fazenda (bean 115) - 2 reviews
  (
    '00000000-0000-0000-0000-000000000115',
    'BrazilBuff',
    4.5,
    'Best Brazilian natural I''ve tried',
    'George Howell knows Brazil better than anyone. This Sertãozinho natural is silky smooth with real dark chocolate depth and the dried fig sweetness of a well-processed natural. No ferment defects whatsoever — just clean, rich sweetness.',
    'drip'
  ),
  (
    '00000000-0000-0000-0000-000000000115',
    'EspressoHead',
    4.0,
    'Killer as espresso',
    'Brazilian naturals are underrated for espresso. The full body and chocolate-walnut sweetness of Sertãozinho make for an incredibly smooth, approachable shot. Great for beginners and coffee geeks alike.',
    'espresso'
  ),

  -- Sumatra Mandheling (bean 118) - 2 reviews
  (
    '00000000-0000-0000-0000-000000000118',
    'EarthyBoldBrew',
    4.0,
    'Classic Sumatra',
    'Exactly what dark roast Sumatra fans want: full body, cedar and earth notes, black pepper spice, and a satisfying bitterness that holds up beautifully with milk. Verve''s sourcing elevates this above typical grocery-store Sumatrans.',
    'french-press'
  ),
  (
    '00000000-0000-0000-0000-000000000118',
    'MorningBrew42',
    3.5,
    'Good if you like this style',
    'Not my personal preference — I lean toward brighter coffees — but I can objectively say this is very well-sourced and roasted for the style. If you like earthy, dark, and bold, this delivers exactly what it promises.',
    'drip'
  ),

  -- Colombia Nariño (bean 108) - 2 reviews
  (
    '00000000-0000-0000-0000-000000000108',
    'HighAltitudeHunter',
    4.5,
    'The altitude shows in the cup',
    'Nariño''s extreme altitude gives this coffee its signature brightness and sweetness. Counter Culture has been consistently excellent with Colombian lots and this one continues that tradition. Crisp, clean, and beautifully sweet.',
    'pour-over'
  ),
  (
    '00000000-0000-0000-0000-000000000108',
    'SipAndPonder',
    4.0,
    'Versatile and approachable',
    'Works equally well as filter or espresso. The vanilla and caramel notes come through cleanly regardless of brew method. A crowd-pleasing coffee for those who find light roasts too challenging.',
    'espresso'
  );
