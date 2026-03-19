-- Migrace: Osobnosti – více roků u jedné osobnosti
-- Spusťte v phpMyAdmin nebo MySQL klientu

USE veterancup;

-- Přidat sloupec roky (24,25,26 = 2024, 2025, 2026)
-- Pokud sloupec už existuje, tento řádek selže – lze ignorovat
ALTER TABLE osobnosti ADD COLUMN roky VARCHAR(50) DEFAULT NULL;

-- Pro existující záznamy: převést rok na roky
UPDATE osobnosti SET roky = CAST(rok AS CHAR) WHERE roky IS NULL OR roky = '';
