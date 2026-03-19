/**
 * Centrální konfigurace aplikace – všechny proměnné z jednoho místa.
 * Hodnoty se načítají z .env.local (lokálně) nebo .env (produkce).
 */

export const config = {
  /** Databáze MySQL */
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'veterancup',
  },

  /** Doména webu (např. pro canonical URL, sitemap) */
  site: {
    domain: process.env.SITE_DOMAIN || 'veterancupletohrad.cz',
    url: process.env.SITE_URL || 'https://veterancupletohrad.cz',
  },

  /** Autentizace – JWT pro admin */
  auth: {
    jwtSecret: process.env.JWT_SECRET || 'fallback-secret',
    isProduction: process.env.NODE_ENV === 'production',
  },
} as const;
