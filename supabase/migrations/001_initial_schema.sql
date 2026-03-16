-- ============================================================
-- Cupped — Initial Schema Migration
-- ============================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- ROASTERS
-- ============================================================
CREATE TABLE roasters (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  location TEXT NOT NULL,
  description TEXT,
  website TEXT,
  founded_year INTEGER,
  logo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_roasters_slug ON roasters(slug);

-- ============================================================
-- BEANS
-- ============================================================
CREATE TABLE beans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  roaster_id UUID NOT NULL REFERENCES roasters(id) ON DELETE CASCADE,
  origin TEXT NOT NULL,
  region TEXT,
  process TEXT NOT NULL
    CHECK (process IN ('washed', 'natural', 'honey', 'anaerobic', 'wet-hulled')),
  roast_level TEXT NOT NULL
    CHECK (roast_level IN ('light', 'medium-light', 'medium', 'medium-dark', 'dark')),
  flavor_notes TEXT[] NOT NULL DEFAULT '{}',
  description TEXT,
  price NUMERIC(10, 2),
  weight_grams INTEGER,
  image_url TEXT,
  is_single_origin BOOLEAN NOT NULL DEFAULT true,
  altitude_meters INTEGER,
  variety TEXT,
  harvest_year INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_beans_roaster_id ON beans(roaster_id);
CREATE INDEX idx_beans_slug ON beans(slug);
CREATE INDEX idx_beans_origin ON beans(origin);
CREATE INDEX idx_beans_roast_level ON beans(roast_level);
CREATE INDEX idx_beans_process ON beans(process);

-- ============================================================
-- REVIEWS
-- ============================================================
CREATE TABLE reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  bean_id UUID NOT NULL REFERENCES beans(id) ON DELETE CASCADE,
  reviewer_name TEXT NOT NULL DEFAULT 'Anonymous',
  rating NUMERIC(2, 1) NOT NULL
    CHECK (rating >= 1.0 AND rating <= 5.0),
  title TEXT,
  body TEXT NOT NULL,
  brew_method TEXT
    CHECK (brew_method IN (
      'espresso', 'pour-over', 'french-press',
      'aeropress', 'cold-brew', 'drip', 'moka-pot'
    )),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_reviews_bean_id ON reviews(bean_id);
CREATE INDEX idx_reviews_rating ON reviews(rating);

-- ============================================================
-- ROW LEVEL SECURITY (read-only public access for Phase 1)
-- ============================================================
ALTER TABLE roasters ENABLE ROW LEVEL SECURITY;
ALTER TABLE beans ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public read roasters" ON roasters FOR SELECT USING (true);
CREATE POLICY "Public read beans" ON beans FOR SELECT USING (true);
CREATE POLICY "Public read reviews" ON reviews FOR SELECT USING (true);
