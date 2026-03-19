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

export default function AdminOsobnostForm() {
  const [rokTymy, setRokTymy] = useState<RokTym[]>([]);
  const [jmeno, setJmeno] = useState('');
  const [sport, setSport] = useState('');
  const [popis, setPopis] = useState('');
  const [rokyTymy, setRokyTymy] = useState<{ rok: number; tym: string }[]>([{ rok: 25, tym: 'c' }]);
  const [img, setImg] = useState('');
  const [img_thumbnail, setImgThumbnail] = useState('');
  const [zverejnit, setZverejnit] = useState('a');
  const [osobnost, setOsobnost] = useState('n');
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
      const res = await fetch('/api/admin/osobnosti', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jmeno,
          sport: sport || null,
          popis: popis || null,
          roky_tymy: rokyTymy.length ? rokyTymy : [{ rok: 25, tym: 'c' }],
          img: img || null,
          img_thumbnail: img_thumbnail || img || null,
          zverejnit,
          osobnost,
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
          value={jmeno}
          onChange={(e) => setJmeno(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-[var(--radius)] px-4 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Sport</label>
        <input
          type="text"
          value={sport}
          onChange={(e) => setSport(e.target.value)}
          placeholder="např. Hokej"
          className="w-full border border-gray-300 rounded-[var(--radius)] px-4 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Popis (HTML)</label>
        <textarea
          value={popis}
          onChange={(e) => setPopis(e.target.value)}
          rows={6}
          className="w-full border border-gray-300 rounded-[var(--radius)] px-4 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Ročníky a týmy</label>
        <p className="text-xs text-gray-500 mb-2">
          Pro každý ročník vyberte, zda se osobnost účastní a v jakém týmu. Nejprve nastavte týmy v{' '}
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
        <label className="block text-sm font-medium mb-1">Fotka (soubor v /profilovky/, např. jan-novak.png)</label>
        <input
          type="text"
          value={img}
          onChange={(e) => {
            setImg(e.target.value);
            if (!img_thumbnail) setImgThumbnail(e.target.value);
          }}
          placeholder="jan-novak.png"
          className="w-full border border-gray-300 rounded-[var(--radius)] px-4 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Náhled fotky (nebo stejné jako fotka)</label>
        <input
          type="text"
          value={img_thumbnail}
          onChange={(e) => setImgThumbnail(e.target.value)}
          placeholder="jan-novak.png"
          className="w-full border border-gray-300 rounded-[var(--radius)] px-4 py-2"
        />
      </div>
      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={zverejnit === 'a'}
            onChange={(e) => setZverejnit(e.target.checked ? 'a' : 'n')}
          />
          Zveřejnit
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={osobnost === 'a'}
            onChange={(e) => setOsobnost(e.target.checked ? 'a' : 'n')}
          />
          Má popis (odkaz na detail)
        </label>
      </div>
      {error && <p className="text-red-600">{error}</p>}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-green-600 text-white rounded-[var(--radius)] hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? 'Ukládám...' : 'Přidat'}
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
