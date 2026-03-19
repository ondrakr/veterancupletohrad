-- Seed osobností podle obrázků (2023, 2024, 2025)
-- Spusťte po migrate-rok-tymy.sql
-- Obrázek 1 = 2025, obrázky 2+3 = 2023, obrázek 4 = 2024

USE veterancup;

-- Přidat rok 2023 do rok_tymy
INSERT IGNORE INTO rok_tymy (rok, tym_kod, nazev, poradi) VALUES
(23, 'c', 'Červený tým', 1),
(23, 'm', 'Modrý tým', 2),
(23, 'tc', 'Trenéři červeného týmu', 3),
(23, 'tm', 'Trenéři modrého týmu', 4);

-- Pomocná funkce: vloží osobu pokud neexistuje, pak přiřadí rok-tým
-- 2025 MODRÝ TÝM (m)
INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Michal Břetenář', 'Hokejbal', NULL, 25, '25', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Michal Břetenář' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 25, 'm' FROM osobnosti WHERE jmeno = 'Michal Břetenář' LIMIT 1;

INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Pavlína Horálková', 'Hokejbal', NULL, 25, '25', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Pavlína Horálková' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 25, 'm' FROM osobnosti WHERE jmeno = 'Pavlína Horálková' LIMIT 1;

INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Alena Polenská', 'Hokejbal', NULL, 25, '25', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Alena Polenská' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 25, 'm' FROM osobnosti WHERE jmeno = 'Alena Polenská' LIMIT 1;

INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Denisa Křížová', 'Hokejbal', NULL, 25, '25', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Denisa Křížová' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 25, 'm' FROM osobnosti WHERE jmeno = 'Denisa Křížová' LIMIT 1;

INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Jan Bečka', 'Hokejbal', NULL, 25, '25', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Jan Bečka' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 25, 'm' FROM osobnosti WHERE jmeno = 'Jan Bečka' LIMIT 1;

INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Jiří Ticháček', 'Hokejbal', NULL, 25, '25', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Jiří Ticháček' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 25, 'm' FROM osobnosti WHERE jmeno = 'Jiří Ticháček' LIMIT 1;

INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Zdeněk Dědek', 'Hokejbal', NULL, 25, '25', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Zdeněk Dědek' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 25, 'm' FROM osobnosti WHERE jmeno = 'Zdeněk Dědek' LIMIT 1;

INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Petr Koukal', 'Hokejbal', NULL, 25, '25', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Petr Koukal' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 25, 'm' FROM osobnosti WHERE jmeno = 'Petr Koukal' LIMIT 1;

INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'David Kohút', 'Hokejbal', NULL, 25, '25', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'David Kohút' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 25, 'm' FROM osobnosti WHERE jmeno = 'David Kohút' LIMIT 1;

INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Michal Kovář', 'Hokejbal', NULL, 25, '25', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Michal Kovář' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 25, 'm' FROM osobnosti WHERE jmeno = 'Michal Kovář' LIMIT 1;

INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Jakub Štáfek', 'Hokejbal', NULL, 25, '25', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Jakub Štáfek' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 25, 'm' FROM osobnosti WHERE jmeno = 'Jakub Štáfek' LIMIT 1;

INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Jan Pospíšil', 'Hokejbal', NULL, 25, '25', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Jan Pospíšil' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 25, 'm' FROM osobnosti WHERE jmeno = 'Jan Pospíšil' LIMIT 1;

INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Michal Uhlíř', 'Hokejbal', NULL, 25, '25', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Michal Uhlíř' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 25, 'm' FROM osobnosti WHERE jmeno = 'Michal Uhlíř' LIMIT 1;

INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Petr Vrána', 'Hokejbal', NULL, 25, '25', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Petr Vrána' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 25, 'm' FROM osobnosti WHERE jmeno = 'Petr Vrána' LIMIT 1;

INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'David Halbrštát', 'Hokejbal', NULL, 25, '25', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'David Halbrštát' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 25, 'm' FROM osobnosti WHERE jmeno = 'David Halbrštát' LIMIT 1;

INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Veronika Víšková', 'Hokejbal', NULL, 25, '25', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Veronika Víšková' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 25, 'm' FROM osobnosti WHERE jmeno = 'Veronika Víšková' LIMIT 1;

INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Lukáš Sterenčák', 'Hokejbal', NULL, 25, '25', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Lukáš Sterenčák' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 25, 'm' FROM osobnosti WHERE jmeno = 'Lukáš Sterenčák' LIMIT 1;

INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Michal Šupík', 'Hokejbal', NULL, 25, '25', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Michal Šupík' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 25, 'm' FROM osobnosti WHERE jmeno = 'Michal Šupík' LIMIT 1;

-- 2025 TRENÉŘI MODRÉHO (tm)
INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Josef Kozel', 'Hokejbal', NULL, 25, '25', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Josef Kozel' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 25, 'tm' FROM osobnosti WHERE jmeno = 'Josef Kozel' LIMIT 1;

INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Petr Mocek', 'Hokejbal', NULL, 25, '25', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Petr Mocek' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 25, 'tm' FROM osobnosti WHERE jmeno = 'Petr Mocek' LIMIT 1;

INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Kristýna Kaltounková', 'Hokejbal', NULL, 25, '25', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Kristýna Kaltounková' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 25, 'tm' FROM osobnosti WHERE jmeno = 'Kristýna Kaltounková' LIMIT 1;

INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Jana Schwarzová', 'Hokejbal', NULL, 25, '25', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Jana Schwarzová' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 25, 'tm' FROM osobnosti WHERE jmeno = 'Jana Schwarzová' LIMIT 1;

-- 2025 ČERVENÝ TÝM (c)
INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Tomáš Fořt', 'Hokejbal', NULL, 25, '25', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Tomáš Fořt' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 25, 'c' FROM osobnosti WHERE jmeno = 'Tomáš Fořt' LIMIT 1;

INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Vojtěch Čihař', 'Hokejbal', NULL, 25, '25', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Vojtěch Čihař' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 25, 'c' FROM osobnosti WHERE jmeno = 'Vojtěch Čihař' LIMIT 1;

INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Martin Kettner', 'Hokejbal', NULL, 25, '25', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Martin Kettner' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 25, 'c' FROM osobnosti WHERE jmeno = 'Martin Kettner' LIMIT 1;

INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Michal Macháček', 'Hokejbal', NULL, 25, '25', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Michal Macháček' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 25, 'c' FROM osobnosti WHERE jmeno = 'Michal Macháček' LIMIT 1;

INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Jan Bacovský', 'Hokejbal', NULL, 25, '25', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Jan Bacovský' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 25, 'c' FROM osobnosti WHERE jmeno = 'Jan Bacovský' LIMIT 1;

INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Vojtěch Hradec', 'Hokejbal', NULL, 25, '25', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Vojtěch Hradec' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 25, 'c' FROM osobnosti WHERE jmeno = 'Vojtěch Hradec' LIMIT 1;

INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Jan Čejka', 'Hokejbal', NULL, 25, '25', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Jan Čejka' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 25, 'c' FROM osobnosti WHERE jmeno = 'Jan Čejka' LIMIT 1;

INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Robin Sapoušek', 'Hokejbal', NULL, 25, '25', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Robin Sapoušek' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 25, 'c' FROM osobnosti WHERE jmeno = 'Robin Sapoušek' LIMIT 1;

INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Michal Broulík', 'Hokejbal', NULL, 25, '25', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Michal Broulík' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 25, 'c' FROM osobnosti WHERE jmeno = 'Michal Broulík' LIMIT 1;

INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'David Nyč', 'Hokejbal', NULL, 25, '25', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'David Nyč' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 25, 'c' FROM osobnosti WHERE jmeno = 'David Nyč' LIMIT 1;

INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Lukáš Lajčiak', 'Hokejbal', NULL, 25, '25', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Lukáš Lajčiak' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 25, 'c' FROM osobnosti WHERE jmeno = 'Lukáš Lajčiak' LIMIT 1;

INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Lucie Manhartová', 'Hokejbal', NULL, 25, '25', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Lucie Manhartová' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 25, 'c' FROM osobnosti WHERE jmeno = 'Lucie Manhartová' LIMIT 1;

INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Jana Baloušová Fričová', 'Hokejbal', NULL, 25, '25', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Jana Baloušová Fričová' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 25, 'c' FROM osobnosti WHERE jmeno = 'Jana Baloušová Fričová' LIMIT 1;

INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Tomáš Friml', 'Hokejbal', NULL, 25, '25', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Tomáš Friml' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 25, 'c' FROM osobnosti WHERE jmeno = 'Tomáš Friml' LIMIT 1;

INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Milan Faltus', 'Hokejbal', NULL, 25, '25', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Milan Faltus' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 25, 'c' FROM osobnosti WHERE jmeno = 'Milan Faltus' LIMIT 1;

INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Michal Šťovíček', 'Hokejbal', NULL, 25, '25', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Michal Šťovíček' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 25, 'c' FROM osobnosti WHERE jmeno = 'Michal Šťovíček' LIMIT 1;

INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'David Stárek', 'Hokejbal', NULL, 25, '25', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'David Stárek' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 25, 'c' FROM osobnosti WHERE jmeno = 'David Stárek' LIMIT 1;

INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Michal Novák', 'Hokejbal', NULL, 25, '25', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Michal Novák' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 25, 'c' FROM osobnosti WHERE jmeno = 'Michal Novák' LIMIT 1;

-- 2025 TRENÉŘI ČERVENÉHO (tc)
INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Kamil Mlejnek', 'Hokejbal', NULL, 25, '25', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Kamil Mlejnek' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 25, 'tc' FROM osobnosti WHERE jmeno = 'Kamil Mlejnek' LIMIT 1;

INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Pavel Kormunda', 'Hokejbal', NULL, 25, '25', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Pavel Kormunda' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 25, 'tc' FROM osobnosti WHERE jmeno = 'Pavel Kormunda' LIMIT 1;

INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Tomáš Ulrych', 'Hokejbal', NULL, 25, '25', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Tomáš Ulrych' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 25, 'tc' FROM osobnosti WHERE jmeno = 'Tomáš Ulrych' LIMIT 1;

INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Radka Zapletalová', 'Hokejbal', NULL, 25, '25', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Radka Zapletalová' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 25, 'tc' FROM osobnosti WHERE jmeno = 'Radka Zapletalová' LIMIT 1;

-- ========== 2023 (obrázky 2+3) ==========
-- Obrázek 2 - seznam bez týmu (přiřazeno k modrému)
INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Michal Krčmář', 'Hokejbal', NULL, 23, '23', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Michal Krčmář' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 23, 'm' FROM osobnosti WHERE jmeno = 'Michal Krčmář' LIMIT 1;

INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Jana Kanada Baloušová Fričová', 'Hokejbal', NULL, 23, '23', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Jana Kanada Baloušová Fričová' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 23, 'm' FROM osobnosti WHERE jmeno = 'Jana Kanada Baloušová Fričová' LIMIT 1;

INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Ondřej Kejř', 'Hokejbal', NULL, 23, '23', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Ondřej Kejř' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 23, 'm' FROM osobnosti WHERE jmeno = 'Ondřej Kejř' LIMIT 1;

INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Tomáš Zeman', 'Hokejbal', NULL, 23, '23', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Tomáš Zeman' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 23, 'm' FROM osobnosti WHERE jmeno = 'Tomáš Zeman' LIMIT 1;

INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Ondřej Matýs', 'Hokejbal', NULL, 23, '23', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Ondřej Matýs' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 23, 'm' FROM osobnosti WHERE jmeno = 'Ondřej Matýs' LIMIT 1;

INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Martin Pala', 'Hokejbal', NULL, 23, '23', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Martin Pala' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 23, 'm' FROM osobnosti WHERE jmeno = 'Martin Pala' LIMIT 1;

INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Michal Dědič', 'Hokejbal', NULL, 23, '23', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Michal Dědič' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 23, 'm' FROM osobnosti WHERE jmeno = 'Michal Dědič' LIMIT 1;

INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Alena Mills', 'Hokejbal', NULL, 23, '23', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Alena Mills' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 23, 'm' FROM osobnosti WHERE jmeno = 'Alena Mills' LIMIT 1;

INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Šimon Marha', 'Hokejbal', NULL, 23, '23', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Šimon Marha' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 23, 'm' FROM osobnosti WHERE jmeno = 'Šimon Marha' LIMIT 1;

INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Roman Ondráček', 'Hokejbal', NULL, 23, '23', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Roman Ondráček' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 23, 'm' FROM osobnosti WHERE jmeno = 'Roman Ondráček' LIMIT 1;

-- Obrázek 3 (2023) - přidat roky těm co už máme, nové s týmy
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 23, 'm' FROM osobnosti WHERE jmeno = 'Pavlína Horálková' LIMIT 1;
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 23, 'm' FROM osobnosti WHERE jmeno = 'Denisa Křížová' LIMIT 1;
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 23, 'm' FROM osobnosti WHERE jmeno = 'Michal Uhlíř' LIMIT 1;
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 23, 'm' FROM osobnosti WHERE jmeno = 'Lucie Manhartová' LIMIT 1;
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 23, 'm' FROM osobnosti WHERE jmeno = 'Lukáš Lajčiak' LIMIT 1;

-- Obrázek 3 - další jména (modrý tým)
INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Tomáš Mikyska', 'Hokejbal', NULL, 23, '23', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Tomáš Mikyska' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 23, 'm' FROM osobnosti WHERE jmeno = 'Tomáš Mikyska' LIMIT 1;

INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Matěj Blümel', 'Hokejbal', NULL, 23, '23', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Matěj Blümel' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 23, 'm' FROM osobnosti WHERE jmeno = 'Matěj Blümel' LIMIT 1;

INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Ondřej Moravec', 'Hokejbal', NULL, 23, '23', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Ondřej Moravec' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 23, 'm' FROM osobnosti WHERE jmeno = 'Ondřej Moravec' LIMIT 1;

INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Josef Tomáš', 'Hokejbal', NULL, 23, '23', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Josef Tomáš' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 23, 'm' FROM osobnosti WHERE jmeno = 'Josef Tomáš' LIMIT 1;

INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Petr Věchet', 'Hokejbal', NULL, 23, '23', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Petr Věchet' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 23, 'm' FROM osobnosti WHERE jmeno = 'Petr Věchet' LIMIT 1;

INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Mikuláš Karlík', 'Hokejbal', NULL, 23, '23', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Mikuláš Karlík' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 23, 'm' FROM osobnosti WHERE jmeno = 'Mikuláš Karlík' LIMIT 1;

INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Michael Málek', 'Hokejbal', NULL, 23, '23', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Michael Málek' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 23, 'm' FROM osobnosti WHERE jmeno = 'Michael Málek' LIMIT 1;

INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Petra Staňová', 'Hokejbal', NULL, 23, '23', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Petra Staňová' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 23, 'm' FROM osobnosti WHERE jmeno = 'Petra Staňová' LIMIT 1;

-- Trenéři 2023
INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Tomáš Nosek', 'Hokejbal', NULL, 23, '23', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Tomáš Nosek' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 23, 'tc' FROM osobnosti WHERE jmeno = 'Tomáš Nosek' LIMIT 1;

INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Klára Peslarová', 'Hokejbal', NULL, 23, '23', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Klára Peslarová' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 23, 'tc' FROM osobnosti WHERE jmeno = 'Klára Peslarová' LIMIT 1;

INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Filip Červinka', 'Hokejbal', NULL, 23, '23', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Filip Červinka' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 23, 'tc' FROM osobnosti WHERE jmeno = 'Filip Červinka' LIMIT 1;

INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Aneta Tejlarová', 'Hokejbal', NULL, 23, '23', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Aneta Tejlarová' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 23, 'tc' FROM osobnosti WHERE jmeno = 'Aneta Tejlarová' LIMIT 1;

INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Michal Katerinjuk', 'Hokejbal', NULL, 23, '23', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Michal Katerinjuk' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 23, 'tc' FROM osobnosti WHERE jmeno = 'Michal Katerinjuk' LIMIT 1;

-- Přidat 2023 těm co už mají 2025
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 23, 'm' FROM osobnosti WHERE jmeno = 'Michal Břetenář' LIMIT 1;
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 23, 'm' FROM osobnosti WHERE jmeno = 'Michal Kovář' LIMIT 1;
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 23, 'm' FROM osobnosti WHERE jmeno = 'Robin Sapoušek' LIMIT 1;
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 23, 'm' FROM osobnosti WHERE jmeno = 'Michal Šťovíček' LIMIT 1;
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 23, 'm' FROM osobnosti WHERE jmeno = 'Michal Novák' LIMIT 1;
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 23, 'm' FROM osobnosti WHERE jmeno = 'Martin Kettner' LIMIT 1;
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 23, 'm' FROM osobnosti WHERE jmeno = 'Petr Mocek' LIMIT 1;
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 23, 'm' FROM osobnosti WHERE jmeno = 'Tomáš Friml' LIMIT 1;
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 23, 'm' FROM osobnosti WHERE jmeno = 'Veronika Víšková' LIMIT 1;
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 23, 'm' FROM osobnosti WHERE jmeno = 'Lukáš Sterenčák' LIMIT 1;

-- ========== 2024 (obrázek 4) - Modrý a Bílý tým ==========
-- Modrý tým 2024
INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Alena Polanská', 'Hokejbal', NULL, 24, '24', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Alena Polanská' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 24, 'm' FROM osobnosti WHERE jmeno = 'Alena Polanská' LIMIT 1;

INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Daniel Hnízdil', 'Hokejbal', NULL, 24, '24', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Daniel Hnízdil' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 24, 'm' FROM osobnosti WHERE jmeno = 'Daniel Hnízdil' LIMIT 1;

INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Jiří Kulich', 'Hokejbal', NULL, 24, '24', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Jiří Kulich' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 24, 'm' FROM osobnosti WHERE jmeno = 'Jiří Kulich' LIMIT 1;

INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Adam Kubík', 'Hokejbal', NULL, 24, '24', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Adam Kubík' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 24, 'm' FROM osobnosti WHERE jmeno = 'Adam Kubík' LIMIT 1;

INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Milan Jelen', 'Hokejbal', NULL, 24, '24', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Milan Jelen' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 24, 'm' FROM osobnosti WHERE jmeno = 'Milan Jelen' LIMIT 1;

-- Bílý tým 2024
INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Ondřej Hubálek', 'Hokejbal', NULL, 24, '24', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Ondřej Hubálek' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 24, 'b' FROM osobnosti WHERE jmeno = 'Ondřej Hubálek' LIMIT 1;

INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Jakub Martinec', 'Hokejbal', NULL, 24, '24', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Jakub Martinec' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 24, 'b' FROM osobnosti WHERE jmeno = 'Jakub Martinec' LIMIT 1;

INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Michal Martínek', 'Hokejbal', NULL, 24, '24', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Michal Martínek' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 24, 'b' FROM osobnosti WHERE jmeno = 'Michal Martínek' LIMIT 1;

INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Michael Špaček', 'Hokejbal', NULL, 24, '24', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Michael Špaček' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 24, 'b' FROM osobnosti WHERE jmeno = 'Michael Špaček' LIMIT 1;

INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Filip Zadina', 'Hokejbal', NULL, 24, '24', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Filip Zadina' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 24, 'b' FROM osobnosti WHERE jmeno = 'Filip Zadina' LIMIT 1;

INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Tomáš Bureš', 'Hokejbal', NULL, 24, '24', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Tomáš Bureš' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 24, 'b' FROM osobnosti WHERE jmeno = 'Tomáš Bureš' LIMIT 1;

INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Michal Hnízdil', 'Hokejbal', NULL, 24, '24', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Michal Hnízdil' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 24, 'tb' FROM osobnosti WHERE jmeno = 'Michal Hnízdil' LIMIT 1;

INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Zdeněk Matyáš', 'Hokejbal', NULL, 24, '24', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Zdeněk Matyáš' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 24, 'tb' FROM osobnosti WHERE jmeno = 'Zdeněk Matyáš' LIMIT 1;

INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Petr Menc', 'Hokejbal', NULL, 24, '24', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Petr Menc' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 24, 'b' FROM osobnosti WHERE jmeno = 'Petr Menc' LIMIT 1;

INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost)
SELECT 'Filip Pavlík', 'Hokejbal', NULL, 24, '24', 'c', '', '', 'a', 'n' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM osobnosti WHERE jmeno = 'Filip Pavlík' LIMIT 1);
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 24, 'b' FROM osobnosti WHERE jmeno = 'Filip Pavlík' LIMIT 1;

-- Přidat 2024 těm co už existují (z obrázku 4)
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 24, 'm' FROM osobnosti WHERE jmeno = 'Michal Břetenář' LIMIT 1;
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 24, 'm' FROM osobnosti WHERE jmeno = 'Pavlína Horálková' LIMIT 1;
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 24, 'm' FROM osobnosti WHERE jmeno = 'Denisa Křížová' LIMIT 1;
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 24, 'm' FROM osobnosti WHERE jmeno = 'Jan Bacovský' LIMIT 1;
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 24, 'm' FROM osobnosti WHERE jmeno = 'Robin Sapoušek' LIMIT 1;
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 24, 'm' FROM osobnosti WHERE jmeno = 'Martin Kettner' LIMIT 1;
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 24, 'm' FROM osobnosti WHERE jmeno = 'Jan Bečka' LIMIT 1;
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 24, 'm' FROM osobnosti WHERE jmeno = 'Lukáš Lajčiak' LIMIT 1;
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 24, 'm' FROM osobnosti WHERE jmeno = 'David Halbrštát' LIMIT 1;
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 24, 'm' FROM osobnosti WHERE jmeno = 'Michal Šťovíček' LIMIT 1;
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 24, 'm' FROM osobnosti WHERE jmeno = 'David Stárek' LIMIT 1;
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 24, 'tm' FROM osobnosti WHERE jmeno = 'Pavel Kormunda' LIMIT 1;
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 24, 'tm' FROM osobnosti WHERE jmeno = 'Zdeněk Dědek' LIMIT 1;
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 24, 'b' FROM osobnosti WHERE jmeno = 'Michal Krčmář' LIMIT 1;
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 24, 'b' FROM osobnosti WHERE jmeno = 'Petr Věchet' LIMIT 1;
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 24, 'b' FROM osobnosti WHERE jmeno = 'Ondřej Moravec' LIMIT 1;
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 24, 'b' FROM osobnosti WHERE jmeno = 'Josef Tomáš' LIMIT 1;
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 24, 'b' FROM osobnosti WHERE jmeno = 'Michal Uhlíř' LIMIT 1;
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 24, 'b' FROM osobnosti WHERE jmeno = 'David Nyč' LIMIT 1;
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 24, 'b' FROM osobnosti WHERE jmeno = 'Veronika Víšková' LIMIT 1;
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 24, 'b' FROM osobnosti WHERE jmeno = 'Lukáš Sterenčák' LIMIT 1;
INSERT IGNORE INTO osobnost_rok_tym (osobnost_id, rok, tym) SELECT id, 24, 'tb' FROM osobnosti WHERE jmeno = 'Kamil Mlejnek' LIMIT 1;
