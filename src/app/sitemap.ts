import { MetadataRoute } from 'next';
import { config } from '@/lib/config';
import db from '@/lib/db';

const baseUrl = config.site.url;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/o-nas`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/sbirka`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/osobnosti`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/sponzori`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/novinky`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/galerie`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/pro-media`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/ke-stazeni`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/o-neratovu`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/o-janicce`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/o-viktorce`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/o-klubu`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ];

  let clanky: { id: number; datum: Date | string }[] = [];
  let osobnosti: { id: number }[] = [];
  try {
    const [clankyRes, osobnostiRes] = await Promise.all([
      db.query<any[]>('SELECT id, datum FROM clanky ORDER BY datum DESC'),
      db.query<any[]>('SELECT id FROM osobnosti WHERE zverejnit = "a"'),
    ]);
    clanky = (clankyRes[0] as typeof clanky) || [];
    osobnosti = (osobnostiRes[0] as typeof osobnosti) || [];
  } catch {
    // DB nedostupná – použijeme jen statické stránky
  }

  const clanekPages: MetadataRoute.Sitemap = clanky.map((c) => ({
    url: `${baseUrl}/clanek/${c.id}`,
    lastModified: c.datum ? new Date(c.datum) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const profilPages: MetadataRoute.Sitemap = osobnosti.map((o) => ({
    url: `${baseUrl}/profil-osobnosti/${o.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  return [...staticPages, ...clanekPages, ...profilPages];
}
