/*
# Create menu_items and settings tables for Velvet & Bean café

1. New Tables
- `menu_items`: stores the café's product catalog (name, description, price, image_url, category). Seed data includes Artisanal Cappuccino, Avocado Toast, and Butter Croissant.
- `settings`: key-value store for café-wide configuration such as the active discount code and discount percentage.

2. Security
- Enable RLS on both tables.
- This is a single-tenant app with no sign-in, so all CRUD is allowed for anon + authenticated (data is intentionally public/shared).
*/

CREATE TABLE IF NOT EXISTS menu_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL DEFAULT '',
  price numeric(10,2) NOT NULL DEFAULT 0,
  image_url text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT 'coffee',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_menu" ON menu_items;
CREATE POLICY "anon_select_menu" ON menu_items FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_menu" ON menu_items;
CREATE POLICY "anon_insert_menu" ON menu_items FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_menu" ON menu_items;
CREATE POLICY "anon_update_menu" ON menu_items FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_menu" ON menu_items;
CREATE POLICY "anon_delete_menu" ON menu_items FOR DELETE
  TO anon, authenticated USING (true);

CREATE TABLE IF NOT EXISTS settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value text NOT NULL DEFAULT '',
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_settings" ON settings;
CREATE POLICY "anon_select_settings" ON settings FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_settings" ON settings;
CREATE POLICY "anon_insert_settings" ON settings FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_settings" ON settings;
CREATE POLICY "anon_update_settings" ON settings FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_settings" ON settings;
CREATE POLICY "anon_delete_settings" ON settings FOR DELETE
  TO anon, authenticated USING (true);

-- Seed menu items
INSERT INTO menu_items (name, description, price, image_url, category) VALUES
  ('Artisanal Cappuccino', 'Rich single-origin espresso topped with velvety microfoam, crafted by hand.', 5.50, 'https://images.pexels.com/photos/11385490/pexels-photo-11385490.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'coffee')
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, description, price, image_url, category) VALUES
  ('Avocado Toast', 'Sourdough toast with smashed avocado, chili flakes, and a poached egg.', 9.00, 'https://images.pexels.com/photos/7936680/pexels-photo-7936680.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'food')
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, description, price, image_url, category) VALUES
  ('Butter Croissant', 'Flaky, golden French-style croissant baked fresh every morning.', 4.25, 'https://images.pexels.com/photos/20002837/pexels-photo-20002837.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'pastry')
ON CONFLICT DO NOTHING;

-- Seed discount settings
INSERT INTO settings (key, value) VALUES
  ('discount_code', 'COFFEE10')
ON CONFLICT (key) DO NOTHING;

INSERT INTO settings (key, value) VALUES
  ('discount_percentage', '10')
ON CONFLICT (key) DO NOTHING;
