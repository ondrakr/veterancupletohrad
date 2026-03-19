'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type Clanek = { id: number; nadpis: string; foto: string | null; datum: string };

export default function AdminClankyList() {
  const [clanky, setClanky] = useState<Clanek[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/clanky')
      .then((r) => r.json())
      .then((data) => {
        setClanky(Array.isArray(data) ? data : []);
      })
      .catch(() => setClanky([]))
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id: number, nadpis: string) {
    if (!confirm(`Smazat článek „${nadpis}“?`)) return;
    const res = await fetch(`/api/admin/clanky/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setClanky((prev) => prev.filter((c) => c.id !== id));
    } else {
      alert('Chyba při mazání');
    }
  }

  if (loading) return <p className="text-gray-600">Načítám...</p>;
  if (!clanky.length) return <p className="text-gray-600">Žádné články.</p>;

  return (
    <div className="bg-white rounded-[var(--radius)] shadow overflow-hidden overflow-x-auto">
      <table className="w-full min-w-[280px]">
        <thead className="bg-gray-50">
          <tr>
            <th className="text-left py-3 px-3 sm:px-4 font-semibold text-sm sm:text-base">Nadpis</th>
            <th className="text-left py-3 px-3 sm:px-4 font-semibold hidden sm:table-cell text-sm sm:text-base">Datum</th>
            <th className="text-right py-3 px-3 sm:px-4 font-semibold text-sm sm:text-base">Akce</th>
          </tr>
        </thead>
        <tbody>
          {clanky.map((c) => (
            <tr key={c.id} className="border-t border-gray-200">
              <td className="py-3 px-3 sm:px-4">
                <Link href={`/admin/clanky/${c.id}`} className="text-[#134070] hover:underline font-medium">
                  {c.nadpis}
                </Link>
              </td>
              <td className="py-3 px-3 sm:px-4 text-gray-600 hidden sm:table-cell">
                {c.datum ? new Date(c.datum).toLocaleDateString('cs-CZ') : '—'}
              </td>
              <td className="py-3 px-3 sm:px-4 text-right">
                <Link
                  href={`/admin/clanky/${c.id}`}
                  className="text-[#134070] hover:underline mr-3"
                >
                  Upravit
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(c.id, c.nadpis)}
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
  );
}
