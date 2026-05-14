'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { normalizeSponsorTyp } from '@/lib/sponzoriTyp';

type Sponzor = { id: number; typ: string; nazev: string; odkaz: string | null };

export default function AdminSponzoriList() {
  const [sponzori, setSponzori] = useState<Sponzor[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const logoCacheBustRef = useRef(String(Date.now()));

  useEffect(() => {
    fetch('/api/admin/sponzori')
      .then(async (r) => {
        const data = await r.json();
        if (!r.ok) {
          setLoadError(typeof data?.error === 'string' ? data.error : 'Chyba načtení seznamu');
          setSponzori([]);
          return;
        }
        setLoadError(null);
        setSponzori(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        setLoadError('Chyba připojení');
        setSponzori([]);
      })
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id: number, nazev: string) {
    if (!confirm(`Smazat „${nazev}“?`)) return;
    const res = await fetch(`/api/admin/sponzori/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setSponzori((prev) => prev.filter((s) => s.id !== id));
    } else {
      alert('Chyba při mazání');
    }
  }

  if (loading) return <p className="text-gray-600">Načítám...</p>;
  if (loadError) return <p className="text-red-600">{loadError}</p>;
  if (!sponzori.length) return <p className="text-gray-600">Žádní sponzoři ani partneři.</p>;

  const logoCacheBust = logoCacheBustRef.current;
  const partneri = sponzori.filter((s) => normalizeSponsorTyp(s.typ) === 'partner');
  const sponzoriOnly = sponzori.filter((s) => normalizeSponsorTyp(s.typ) === 'sponzor');

  return (
    <div className="space-y-8">
      {partneri.length > 0 && (
        <div>
          <h2 className="text-lg font-bold mb-4">Partneři</h2>
          <div className="bg-white rounded-[var(--radius)] shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[280px]">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-3 sm:px-4 font-semibold text-sm sm:text-base">Logo</th>
                    <th className="text-left py-3 px-3 sm:px-4 font-semibold text-sm sm:text-base">Název</th>
                    <th className="text-right py-3 px-3 sm:px-4 font-semibold text-sm sm:text-base">Akce</th>
                  </tr>
                </thead>
                <tbody>
                  {partneri.map((s) => (
                    <tr key={s.id} className="border-t border-gray-200">
                      <td className="py-3 px-3 sm:px-4">
                        <div className="relative h-10 w-20">
                          <Image
                            src={`/api/sponzori/${s.id}/logo?t=${logoCacheBust}`}
                            alt=""
                            fill
                            className="object-contain"
                            sizes="80px"
                            unoptimized
                          />
                        </div>
                      </td>
                      <td className="py-3 px-3 sm:px-4">
                        <Link href={`/admin/sponzori/${s.id}`} className="text-[#134070] hover:underline font-medium">
                          {s.nazev}
                        </Link>
                      </td>
                      <td className="py-3 px-3 sm:px-4 text-right">
                        <Link href={`/admin/sponzori/${s.id}`} className="text-[#134070] hover:underline mr-3">
                          Upravit
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(s.id, s.nazev)}
                          className="text-red-600 hover:underline"
                        >
                          Smazat
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {sponzoriOnly.length > 0 && (
        <div>
          <h2 className="text-lg font-bold mb-4">Sponzoři</h2>
          <div className="bg-white rounded-[var(--radius)] shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[280px]">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-3 sm:px-4 font-semibold text-sm sm:text-base">Logo</th>
                    <th className="text-left py-3 px-3 sm:px-4 font-semibold text-sm sm:text-base">Název</th>
                    <th className="text-right py-3 px-3 sm:px-4 font-semibold text-sm sm:text-base">Akce</th>
                  </tr>
                </thead>
                <tbody>
                  {sponzoriOnly.map((s) => (
                    <tr key={s.id} className="border-t border-gray-200">
                      <td className="py-3 px-3 sm:px-4">
                        <div className="relative h-10 w-20">
                          <Image
                            src={`/api/sponzori/${s.id}/logo?t=${logoCacheBust}`}
                            alt=""
                            fill
                            className="object-contain"
                            sizes="80px"
                            unoptimized
                          />
                        </div>
                      </td>
                      <td className="py-3 px-3 sm:px-4">
                        <Link href={`/admin/sponzori/${s.id}`} className="text-[#134070] hover:underline font-medium">
                          {s.nazev}
                        </Link>
                      </td>
                      <td className="py-3 px-3 sm:px-4 text-right">
                        <Link href={`/admin/sponzori/${s.id}`} className="text-[#134070] hover:underline mr-3">
                          Upravit
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(s.id, s.nazev)}
                          className="text-red-600 hover:underline"
                        >
                          Smazat
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
