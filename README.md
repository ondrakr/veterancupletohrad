# Veterán Cup Letohrad – Next.js

Profesionální přepis původního PHP webu do **Next.js 16** s **MySQL** databází.

## Technologie

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS**
- **MySQL** (mysql2)
- **JWT** pro admin autentizaci (s podporou starého MD5 z PHP)

## Struktura projektu

```
veteran-cup-next/
├── src/
│   ├── app/              # Stránky a API routes
│   │   ├── admin/        # Admin sekce
│   │   ├── api/          # API endpoints
│   │   ├── clanek/       # Detail článku
│   │   ├── profil-osobnosti/
│   │   └── ...
│   ├── components/       # React komponenty
│   └── lib/              # DB, auth, data helpers
├── public/               # Statické soubory (img, favicon, ...)
├── sql/
│   └── schema.sql       # Databázové schéma
└── .env.local            # Konfigurace (viz níže)
```

## Instalace

### 1. Databáze

Spusťte schéma v MySQL (phpMyAdmin nebo příkazová řádka):

```bash
mysql -u root -p < sql/schema.sql
```

Nebo zkopírujte obsah `sql/schema.sql` do phpMyAdmin a spusťte.

**Důležité:** Pokud migrujete z původního PHP webu, databáze `veterancup` už existuje. Schéma používá `CREATE TABLE IF NOT EXISTS`, takže stávající tabulky zůstanou zachovány.

### 2. Konfigurace

Zkopírujte `.env.local.example` na `.env.local` a upravte:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=veterancup

JWT_SECRET=nahradte-nahodnym-heslem-pro-produkci
```

### 3. Spuštění

```bash
npm install
npm run dev
```

Web běží na [http://localhost:3000](http://localhost:3000).

## Admin přístup

- **URL:** `/admin`
- **Přihlášení:** `/admin/login`

Autentizace podporuje:
- **MD5 hesla** (původní PHP admin) – stávající uživatelé fungují
- **bcrypt** – pro nové účty (doporučeno)

Pro vytvoření nového admina s bcrypt heslem:

```sql
-- Vygenerujte hash např. na https://bcrypt-generator.com/
INSERT INTO users_veteran (username, password) 
VALUES ('admin', '$2a$10$...váš_bcrypt_hash...');
```

## Migrace z PHP

1. **Assety:** Složky `img`, `favicon`, `profilovky`, `partneri-2025`, `sponzori-2025`, `stazeni` jsou zkopírovány do `public/`.
2. **Databáze:** Použijte stávající databázi `veterancup` – schéma je kompatibilní.
3. **Články:** Pole `foto` může obsahovat cestu s `../` – kód to normalizuje.

## Produkce

```bash
npm run build
npm start
```

Pro produkci nastavte v `.env.local`:
- `DB_HOST`, `DB_USER`, `DB_PASSWORD` pro produkční MySQL
- Silné `JWT_SECRET`

## Rozšíření adminu

Stránky `/admin/osobnosti`, `/admin/clanky`, `/admin/sponzori` jsou zatím placeholdery. CRUD operace lze doplnit podle vzoru `/admin/prispevky`.
