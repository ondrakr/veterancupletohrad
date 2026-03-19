'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const YEAR_OPTIONS = [
  { value: 23, label: '2023' },
  { value: 24, label: '2024' },
  { value: 25, label: '2025' },
  { value: 26, label: '2026' },
];

type RokTym = { id: number; rok: number; tym_kod: string; nazev: string };

export default function AdminOsobnostEditForm({
  id,
  jmeno,
  sport,
  popis,
  roky_tymy: rokyTymyProp,
  img,
  img_thumbnail,
  zverejnit,
  osobnost,
}: {
  id: number;
  jmeno: string;
  sport: string;
  popis: string;
  roky_tymy: { rok: number; tym: string }[];
  img: string;
  img_thumbnail: string;
  zverejnit: string;
  osobnost: string;
}) {
  const [j, setJ] = useState(jmeno);
  const [s, setS] = useState(sport);
  const [p, setP] = useState(popis);
  const [rokyTymy, setRokyTymy] = useState<{ rok: number; tym: string }[]>(
    rokyTymyProp?.length ? rokyTymyProp : [{ rok: 25, tym: 'c' }]
  );
  const [rokTymy, setRokTymy] = useState<RokTym[]>([]);
  const [i, setI] = useState(img);
  const [it, setIt] = useState(img_thumbnail);
  const [z, setZ] = useState(zverejnit);
  const [os, setOs] = useState(osobnost);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetch('/api/rok-tymy')
      .then((r) => r.json())
      .then((data) => setRokTymy(Array.isArray(data) ? data : []))
      .catch(() => setRokTymy([]));
  }, []);

  const tymyByRok = rokTymy.reduce(
    (acc, rt) => {
      if (!acc[rt.rok]) acc[rt.rok] = [];
      acc[rt.rok].push(rt);
      return acc;
    },
    {} as Record<number, RokTym[]>
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/admin/osobnosti/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jmeno: j,
          sport: s || null,
          popis: p || null,
          roky_tymy: rokyTymy.length ? rokyTymy : [{ rok: 25, tym: 'c' }],
          img: i || null,
          img_thumbnail: it || i || null,
          zverejnit: z,
          osobnost: os,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Chyba');
        return;
      }
      router.push('/admin/osobnosti');
      router.refresh();
    } catch {
      setError('Chyba připojení');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-4 bg-white p-6 rounded-[var(--radius)] shadow">
      <div>
        <label className="block text-sm font-medium mb-1">Jméno *</label>
        <input
          type="text"
          value={j}
          onChange={(e) => setJ(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-[var(--radius)] px-4 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Sport</label>
        <input
          type="text"
          value={s}
          onChange={(e) => setS(e.target.value)}
          className="w-full border border-gray-300 rounded-[var(--radius)] px-4 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Popis (HTML)</label>
        <textarea
          value={p}
          onChange={(e) => setP(e.target.value)}
          rows={6}
          className="w-full border border-gray-300 rounded-[var(--radius)] px-4 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Ročníky a týmy</label>
        <p className="text-xs text-gray-500 mb-2">
          Pro každý ročník vyberte tým. Týmy nastavíte v{' '}
          <a href="/admin/rok-tymy" className="text-[#134070] hover:underline" target="_blank" rel="noopener noreferrer">
            Týmy podle ročníku
          </a>
          .
        </p>
        <div className="space-y-3">
          {YEAR_OPTIONS.map((y) => {
            const tymy = tymyByRok[y.value] || [];
            const current = rokyTymy.find((r) => r.rok === y.value);
            const isChecked = !!current;
            return (
              <div key={y.value} className="flex items-center gap-4 flex-wrap">
                <label className="flex items-center gap-2 cursor-pointer min-w-[80px]">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => {
                      if (e.target.checked) {
                        const defaultTym = tymy[0]?.tym_kod || 'c';
                        setRokyTymy((prev) => [...prev.filter((r) => r.rok !== y.value), { rok: y.value, tym: defaultTym }].sort((a, b) => a.rok - b.rok));
                      } else {
                        setRokyTymy((prev) => prev.filter((r) => r.rok !== y.value));
                      }
                    }}
                    className="rounded"
                  />
                  <span className="font-medium">{y.label}</span>
                </label>
                {isChecked && (
                  <select
                    value={current?.tym || ''}
                    onChange={(e) => {
                      const v = e.target.value;
                      setRokyTymy((prev) =>
                        prev.map((r) => (r.rok === y.value ? { ...r, tym: v } : r))
                      );
                    }}
                    className="border border-gray-300 rounded-[var(--radius)] px-3 py-2 min-w-[180px]"
                  >
                    {tymy.map((ty) => (
                      <option key={ty.tym_kod} value={ty.tym_kod}>
                        {ty.nazev}
                      </option>
                    ))}
                    {tymy.length === 0 && (
                      <option value="c">— nejdříve přidejte týmy pro tento ročník</option>
                    )}
                  </select>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Fotka (soubor v /profilovky/)</label>
        <input
          type="text"
          value={i}
          onChange={(e) => setI(e.target.value)}
          className="w-full border border-gray-300 rounded-[var(--radius)] px-4 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Náhled fotky</label>
        <input
          type="text"
          value={it}
          onChange={(e) => setIt(e.target.value)}
          className="w-full border border-gray-300 rounded-[var(--radius)] px-4 py-2"
        />
      </div>
      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={z === 'a'}
            onChange={(e) => setZ(e.target.checked ? 'a' : 'n')}
          />
          Zveřejnit
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={os === 'a'}
            onChange={(e) => setOs(e.target.checked ? 'a' : 'n')}
          />
          Má popis (odkaz na detail)
        </label>
      </div>
      {error && <p className="text-red-600">{error}</p>}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-[#134070] text-white rounded-[var(--radius)] hover:bg-[#0d2d52] disabled:opacity-50"
        >
          {loading ? 'Ukládám...' : 'Uložit'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 border border-gray-300 rounded-[var(--radius)] hover:bg-gray-50"
        >
          Zrušit
        </button>
      </div>
    </form>
  );
}
