'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { User } from 'lucide-react';

type Osobnost = {
  id: number;
  jmeno: string;
  sport: string | null;
  img_thumbnail: string | null;
  roky_tymy?: { rok: number; tym: string }[];
  zverejnit: string;
};

export default function AdminOsobnostiList() {
  const [osobnosti, setOsobnosti] = useState<Osobnost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterZverejnit, setFilterZverejnit] = useState<'all' | 'a' | 'n'>('all');
  const [filterRok, setFilterRok] = useState<number | 'all'>('all');

  useEffect(() => {
    fetch('/api/admin/osobnosti')
      .then((r) => r.json())
      .then((data) => {
        setOsobnosti(Array.isArray(data) ? data : []);
      })
      .catch(() => setOsobnosti([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return osobnosti.filter((o) => {
      if (search.trim()) {
        const q = search.toLowerCase().trim();
        if (!o.jmeno?.toLowerCase().includes(q) && !o.sport?.toLowerCase().includes(q)) return false;
      }
      if (filterZverejnit !== 'all' && o.zverejnit !== filterZverejnit) return false;
      if (filterRok !== 'all') {
        const hasRok = o.roky_tymy?.some((r) => r.rok === filterRok);
        if (!hasRok) return false;
      }
      return true;
    });
  }, [osobnosti, search, filterZverejnit, filterRok]);

  async function handleDelete(id: number, jmeno: string) {
    if (!confirm(`Smazat osobnost „${jmeno}“?`)) return;
    const res = await fetch(`/api/admin/osobnosti/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setOsobnosti((prev) => prev.filter((o) => o.id !== id));
    } else {
      alert('Chyba při mazání');
    }
  }

  if (loading) return <p className="text-gray-600">Načítám...</p>;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 items-center p-4 bg-gray-50 rounded-[var(--radius)]">
        <input
          type="text"
          placeholder="Vyhledat podle jména nebo sportu..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-[var(--radius)] px-3 py-2 min-w-[200px] flex-1 max-w-xs"
        />
        <select
          value={filterZverejnit}
          onChange={(e) => setFilterZverejnit(e.target.value as 'all' | 'a' | 'n')}
          className="border border-gray-300 rounded-[var(--radius)] px-3 py-2"
        >
          <option value="all">Všechny</option>
          <option value="a">Pouze zveřejněné</option>
          <option value="n">Pouze skryté</option>
        </select>
        <select
          value={filterRok}
          onChange={(e) => setFilterRok(e.target.value === 'all' ? 'all' : Number(e.target.value))}
          className="border border-gray-300 rounded-[var(--radius)] px-3 py-2"
        >
          <option value="all">Všechny roky</option>
          <option value={23}>2023</option>
          <option value={24}>2024</option>
          <option value={25}>2025</option>
          <option value={26}>2026</option>
        </select>
      </div>

      <div className="bg-white rounded-[var(--radius)] shadow overflow-hidden">
        {!filtered.length ? (
          <p className="text-gray-600 p-6 text-center">
            {osobnosti.length ? 'Žádné osobnosti nevyhovují filtrům.' : 'Žádné osobnosti.'}
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[400px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-3 sm:px-4 font-semibold text-sm sm:text-base">Osobnost</th>
                  <th className="text-left py-3 px-3 sm:px-4 font-semibold hidden md:table-cell text-sm sm:text-base">Sport</th>
                  <th className="text-left py-3 px-3 sm:px-4 font-semibold text-sm sm:text-base">Zveřejnit</th>
                  <th className="text-right py-3 px-3 sm:px-4 font-semibold text-sm sm:text-base">Akce</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((o) => (
                  <tr key={o.id} className="border-t border-gray-200">
                    <td className="py-3 px-3 sm:px-4">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[var(--secondary)] shrink-0 flex items-center justify-center">
                          {o.img_thumbnail?.trim() ? (
                            <Image
                              src={`/profilovky/${o.img_thumbnail}`}
                              alt=""
                              fill
                              className="object-cover"
                              sizes="40px"
                            />
                          ) : (
                            <User className="w-5 h-5 text-white" strokeWidth={1.5} />
                          )}
                        </div>
                        <Link href={`/admin/osobnosti/${o.id}`} className="text-[#134070] hover:underline font-medium">
                          {o.jmeno}
                        </Link>
                      </div>
                    </td>
                    <td className="py-3 px-3 sm:px-4 text-gray-600 hidden md:table-cell">{o.sport || '—'}</td>
                    <td className="py-3 px-3 sm:px-4">{o.zverejnit === 'a' ? 'Ano' : 'Ne'}</td>
                    <td className="py-3 px-3 sm:px-4 text-right">
                      <Link href={`/admin/osobnosti/${o.id}`} className="text-[#134070] hover:underline mr-3">
                        Upravit
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(o.id, o.jmeno)}
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
        )}
      </div>
    </div>
  );
}
