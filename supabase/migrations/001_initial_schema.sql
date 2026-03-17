-- ============================================================
-- Cupped — Initial Schema Migration (v2)
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- ROASTERS
-- ============================================================
CREATE TABLE roasters (
  id               UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name             TEXT NOT NULL,
  slug             TEXT UNIQUE NOT NULL,
  location_city    TEXT,
  location_state   TEXT,
  location_country TEXT DEFAULT 'US',
  website_url      TEXT,
  logo_url         TEXT,
  description      TEXT,
  is_featured      BOOLEAN DEFAULT false,
  affiliate_program TEXT, -- 'amazon' | 'direct' | 'tradecoffee' | null
  created_at       TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_roasters_slug ON roasters(slug);
CREATE INDEX idx_roasters_featured ON roasters(is_featured);

-- ============================================================
-- BEANS
-- ============================================================
CREATE TABLE beans (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name          TEXT NOT NULL,
  slug          TEXT UNIQUE NOT NULL,
  roaster_id    UUID NOT NULL REFERENCES roasters(id) ON DELETE CASCADE,
  origin        TEXT NOT NULL,
  region        TEXT,
  roast_level   TEXT NOT NULL
    CHECK (roast_level IN ('light', 'medium', 'medium-dark', 'dark')),
  process       TEXT
    CHECK (process IN ('washed', 'natural', 'honey', 'anaerobic', 'wet-hulled')),
  altitude_masl INTEGER,
  varietal      TEXT,
  price_usd     NUMERIC(6,2),
  bag_size_oz   INTEGER DEFAULT 12,
  description   TEXT,
  image_url     TEXT,
  affiliate_url TEXT NOT NULL,
  is_featured   BOOLEAN DEFAULT false,
  is_active     BOOLEAN DEFAULT true,
  order_count   INTEGER DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_beans_slug ON beans(slug);
CREATE INDEX idx_beans_roaster_id ON beans(roaster_id);
CREATE INDEX idx_beans_origin ON beans(origin);
CREATE INDEX idx_beans_roast_level ON beans(roast_level);
CREATE INDEX idx_beans_process ON beans(process);
CREATE INDEX idx_beans_featured ON beans(is_featured);
CREATE INDEX idx_beans_active ON beans(is_active);

-- ============================================================
-- TASTING NOTES
-- ============================================================
CREATE TABLE tasting_notes (
  id       UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name     TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL
    CHECK (category IN ('Fruity', 'Chocolate & Nutty', 'Sweet', 'Floral', 'Earthy & Spicy', 'Roasted')),
  emoji    TEXT,
  slug     TEXT UNIQUE NOT NULL
);

CREATE INDEX idx_tasting_notes_slug ON tasting_notes(slug);
CREATE INDEX idx_tasting_notes_category ON tasting_notes(category);

-- ============================================================
-- BEAN TASTING NOTES (junction)
-- ============================================================
CREATE TABLE bean_tasting_notes (
  bean_id UUID REFERENCES beans(id) ON DELETE CASCADE,
  note_id UUID REFERENCES tasting_notes(id) ON DELETE CASCADE,
  PRIMARY KEY (bean_id, note_id)
);

CREATE INDEX idx_btn_bean_id ON bean_tasting_notes(bean_id);
CREATE INDEX idx_btn_note_id ON bean_tasting_notes(note_id);

-- ============================================================
-- REVIEWS
-- ============================================================
CREATE TABLE reviews (
  id             UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  bean_id        UUID NOT NULL REFERENCES beans(id) ON DELETE CASCADE,
  reviewer_name  TEXT NOT NULL,
  rating         INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  review_text    TEXT,
  helpful_count  INTEGER DEFAULT 0,
  created_at     TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_reviews_bean_id ON reviews(bean_id);
CREATE INDEX idx_reviews_rating ON reviews(rating);

-- ============================================================
-- VIEW: beans_with_stats
-- ============================================================
CREATE VIEW beans_with_stats AS
SELECT
  b.*,
  r.name          AS roaster_name,
  r.slug          AS roaster_slug,
  r.location_city AS roaster_city,
  r.location_state AS roaster_state,
  r.website_url   AS roaster_website,
  r.logo_url      AS roaster_logo,
  ROUND(AVG(rv.rating)::numeric, 1) AS avg_rating,
  COUNT(rv.id)::integer              AS review_count,
  COALESCE(
    array_agg(tn.name ORDER BY tn.name) FILTER (WHERE tn.name IS NOT NULL),
    '{}'::text[]
  ) AS tasting_note_names,
  COALESCE(
    array_agg(tn.slug ORDER BY tn.name) FILTER (WHERE tn.slug IS NOT NULL),
    '{}'::text[]
  ) AS tasting_note_slugs
FROM beans b
JOIN roasters r ON r.id = b.roaster_id
LEFT JOIN reviews rv ON rv.bean_id = b.id
LEFT JOIN bean_tasting_notes btn ON btn.bean_id = b.id
LEFT JOIN tasting_notes tn ON tn.id = btn.note_id
WHERE b.is_active = true
GROUP BY b.id, r.id;

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
ALTER TABLE roasters        ENABLE ROW LEVEL SECURITY;
ALTER TABLE beans           ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasting_notes   ENABLE ROW LEVEL SECURITY;
ALTER TABLE bean_tasting_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews         ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public read roasters"          ON roasters          FOR SELECT USING (true);
CREATE POLICY "Public read beans"             ON beans             FOR SELECT USING (true);
CREATE POLICY "Public read tasting_notes"     ON tasting_notes     FOR SELECT USING (true);
CREATE POLICY "Public read bean_tasting_notes" ON bean_tasting_notes FOR SELECT USING (true);
CREATE POLICY "Public read reviews"           ON reviews           FOR SELECT USING (true);

-- Allow public review inserts (no auth required for Phase 1)
CREATE POLICY "Public insert reviews" ON reviews FOR INSERT WITH CHECK (true);
