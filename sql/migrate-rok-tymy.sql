-- Migrace: Týmy podle roku + osobnost-rok-tým
-- Každý rok má vlastní definici týmů (barvy), každá osobnost může mít jiný tým v každém roce

USE veterancup;

-- 1. Tabulka rok_tymy – definice týmů pro každý ročník
CREATE TABLE IF NOT EXISTS rok_tymy (
  id INT AUTO_INCREMENT PRIMARY KEY,
  rok TINYINT NOT NULL COMMENT '24, 25, 26 = ročník',
  tym_kod VARCHAR(10) NOT NULL COMMENT 'c, m, b, tc, tm, tb',
  nazev VARCHAR(100) NOT NULL COMMENT 'Červený tým, Modrý tým, ...',
  poradi INT NOT NULL DEFAULT 0,
  UNIQUE KEY uk_rok_tym (rok, tym_kod)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;

-- 2. Tabulka osobnost_rok_tym – který tým má osobnost v kterém roce
CREATE TABLE IF NOT EXISTS osobnost_rok_tym (
  osobnost_id INT NOT NULL,
  rok TINYINT NOT NULL,
  tym VARCHAR(10) NOT NULL,
  PRIMARY KEY (osobnost_id, rok),
  FOREIGN KEY (osobnost_id) REFERENCES osobnosti(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;

-- 3. Výchozí data pro rok_tymy (2024, 2025, 2026)
INSERT IGNORE INTO rok_tymy (rok, tym_kod, nazev, poradi) VALUES
(24, 'b', 'Bílý tým', 1),
(24, 'm', 'Modrý tým', 2),
(24, 'tb', 'Trenéři bílého týmu', 3),
(24, 'tm', 'Trenéři modrého týmu', 4),
(25, 'c', 'Červený tým', 1),
(25, 'm', 'Modrý tým', 2),
(25, 'tc', 'Trenéři červeného týmu', 3),
(25, 'tm', 'Trenéři modrého týmu', 4),
(26, 'c', 'Červený tým', 1),
(26, 'm', 'Modrý tým', 2),
(26, 'tc', 'Trenéři červeného týmu', 3),
(26, 'tm', 'Trenéři modrého týmu', 4);

-- 4. Migrace existujících osobností do osobnost_rok_tym
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym)
SELECT id, 24, tym FROM osobnosti WHERE (CONCAT(',', COALESCE(NULLIF(TRIM(roky), ''), CAST(rok AS CHAR)), ',') COLLATE utf8mb4_bin) LIKE (CONCAT('%,', '24', ',%') COLLATE utf8mb4_bin);

INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym)
SELECT id, 25, tym FROM osobnosti WHERE (CONCAT(',', COALESCE(NULLIF(TRIM(roky), ''), CAST(rok AS CHAR)), ',') COLLATE utf8mb4_bin) LIKE (CONCAT('%,', '25', ',%') COLLATE utf8mb4_bin);

INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym)
SELECT id, 26, tym FROM osobnosti WHERE (CONCAT(',', COALESCE(NULLIF(TRIM(roky), ''), CAST(rok AS CHAR)), ',') COLLATE utf8mb4_bin) LIKE (CONCAT('%,', '26', ',%') COLLATE utf8mb4_bin);
