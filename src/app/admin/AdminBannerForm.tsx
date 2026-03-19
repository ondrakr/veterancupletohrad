'use client';

import { useState, useEffect } from 'react';

export default function AdminBannerForm() {
  const [popis, setPopis] = useState('');
  const [odkaz, setOdkaz] = useState('');
  const [zobrazit, setZobrazit] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadState, setLoadState] = useState<'loading' | 'done' | 'error'>('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/admin/banner')
      .then((r) => r.json())
      .then((data) => {
        setPopis(data?.popis ?? '');
        setOdkaz(data?.odkaz ?? '');
        setZobrazit(data?.zobrazit !== false);
        setLoadState('done');
      })
      .catch(() => setLoadState('error'));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/banner', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          popis: popis.trim() || null,
          odkaz: odkaz.trim() || null,
          zobrazit,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Chyba');
        return;
      }
      setError('');
    } catch {
      setError('Chyba připojení');
    } finally {
      setLoading(false);
    }
  }

  async function handleToggle() {
    const newZobrazit = !zobrazit;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/banner', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          popis: popis.trim() || null,
          odkaz: odkaz.trim() || null,
          zobrazit: newZobrazit,
        }),
      });
      if (res.ok) {
        setZobrazit(newZobrazit);
      } else {
        const data = await res.json();
        setError(data.error || 'Chyba');
      }
    } catch {
      setError('Chyba připojení');
    } finally {
      setLoading(false);
    }
  }

  if (loadState === 'loading') return <p className="text-gray-600">Načítám...</p>;
  if (loadState === 'error') return <p className="text-red-600">Chyba načtení</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleToggle}
          disabled={loading}
          className={`px-4 py-2 rounded-[var(--radius)] font-medium disabled:opacity-50 ${
            zobrazit
              ? 'bg-red-600 text-white hover:bg-red-700'
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          {zobrazit ? 'Skrýt' : 'Zobrazit'}
        </button>
        <span className="text-sm text-gray-600">
          {zobrazit ? 'Lišta je zobrazená' : 'Lišta je skrytá (text a odkaz zůstávají v databázi)'}
        </span>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">
          Popis (prázdné = lišta se nezobrazí)
        </label>
        <input
          type="text"
          value={popis}
          onChange={(e) => setPopis(e.target.value)}
          placeholder="např. 2. charitativní aukce právě probíhá!"
          className="w-full border border-gray-300 rounded-[var(--radius)] px-4 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Odkaz tlačítka NAVŠTÍVIT (volitelné)</label>
        <input
          type="url"
          value={odkaz}
          onChange={(e) => setOdkaz(e.target.value)}
          placeholder="https://..."
          className="w-full border border-gray-300 rounded-[var(--radius)] px-4 py-2"
        />
      </div>
      {error && <p className="text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-[#134070] text-white rounded-[var(--radius)] hover:bg-[#0d2d52] disabled:opacity-50"
      >
        {loading ? 'Ukládám...' : 'Uložit'}
      </button>
    </form>
  );
}
