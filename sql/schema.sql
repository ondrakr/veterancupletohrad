-- Kompletní schéma databáze Veterán Cup Letohrad
-- Spusťte v phpMyAdmin nebo MySQL klientu

CREATE DATABASE IF NOT EXISTS veterancup CHARACTER SET utf8mb4 COLLATE utf8mb4_czech_ci;
USE veterancup;

-- Sponzoři a partneři (loga v databázi)
CREATE TABLE IF NOT EXISTS sponzori (
  id INT AUTO_INCREMENT PRIMARY KEY,
  typ ENUM('sponzor', 'partner') NOT NULL DEFAULT 'sponzor',
  nazev VARCHAR(255) NOT NULL,
  odkaz VARCHAR(500) DEFAULT NULL,
  logo LONGBLOB NOT NULL,
  mime_type VARCHAR(50) NOT NULL DEFAULT 'image/png',
  poradi INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;

-- Články
CREATE TABLE IF NOT EXISTS clanky (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nadpis VARCHAR(500) NOT NULL,
  obsah TEXT,
  foto VARCHAR(500) DEFAULT NULL,
  kategorie VARCHAR(100) DEFAULT NULL,
  datum TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;

-- Týmy podle ročníku – definice barev/názvů týmů pro každý rok
CREATE TABLE IF NOT EXISTS rok_tymy (
  id INT AUTO_INCREMENT PRIMARY KEY,
  rok TINYINT NOT NULL COMMENT '24, 25, 26 = ročník',
  tym_kod VARCHAR(10) NOT NULL COMMENT 'c, m, b, tc, tm, tb',
  nazev VARCHAR(100) NOT NULL COMMENT 'Červený tým, Modrý tým, ...',
  poradi INT NOT NULL DEFAULT 0,
  UNIQUE KEY uk_rok_tym (rok, tym_kod)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;

-- Osobnosti
CREATE TABLE IF NOT EXISTS osobnosti (
  id INT AUTO_INCREMENT PRIMARY KEY,
  jmeno VARCHAR(255) NOT NULL,
  sport VARCHAR(255) DEFAULT NULL,
  popis TEXT,
  rok TINYINT NOT NULL COMMENT 'zastaralé, používá se osobnost_rok_tym',
  roky VARCHAR(50) DEFAULT NULL COMMENT 'zastaralé, používá se osobnost_rok_tym',
  tym VARCHAR(10) NOT NULL COMMENT 'zastaralé, používá se osobnost_rok_tym',
  img VARCHAR(255) DEFAULT NULL,
  img_thumbnail VARCHAR(255) DEFAULT NULL,
  zverejnit ENUM('a', 'n') DEFAULT 'a',
  osobnost ENUM('a', 'n') DEFAULT 'n'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;

-- Osobnost – rok – tým (každá osobnost může mít jiný tým v každém roce)
CREATE TABLE IF NOT EXISTS osobnost_rok_tym (
  osobnost_id INT NOT NULL,
  rok TINYINT NOT NULL,
  tym VARCHAR(10) NOT NULL,
  PRIMARY KEY (osobnost_id, rok),
  FOREIGN KEY (osobnost_id) REFERENCES osobnosti(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;

-- Aktuální částka sbírky
CREATE TABLE IF NOT EXISTS vybrana_castka (
  id INT AUTO_INCREMENT PRIMARY KEY,
  castka DECIMAL(15,2) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;

-- Seznam přispěvatelů
CREATE TABLE IF NOT EXISTS seznam_prispeli (
  id INT AUTO_INCREMENT PRIMARY KEY,
  datum DATE NOT NULL,
  jmeno VARCHAR(255) NOT NULL,
  castka DECIMAL(15,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;

-- Uživatelé adminu
CREATE TABLE IF NOT EXISTS users_veteran (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;

-- Výchozí záznam pro částku (pokud neexistuje)
INSERT IGNORE INTO vybrana_castka (id, castka) VALUES (1, 0);

-- Horní oznámení (banner) – popis a odkaz, zobrazit=0 skryje lištu
CREATE TABLE IF NOT EXISTS banner_oznameni (
  id INT AUTO_INCREMENT PRIMARY KEY,
  popis VARCHAR(500) DEFAULT NULL,
  odkaz VARCHAR(500) DEFAULT NULL,
  zobrazit TINYINT(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;
INSERT IGNORE INTO banner_oznameni (id, popis, odkaz, zobrazit) VALUES (1, '2. charitativní aukce právě probíhá!', 'https://www.sportovniaukce.cz/homepage/auction/4314', 1);

-- Pro existující DB bez sloupce zobrazit:
-- ALTER TABLE banner_oznameni ADD COLUMN zobrazit TINYINT(1) NOT NULL DEFAULT 1;
