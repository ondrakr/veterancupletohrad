'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui';

export default function AdminPrispevekEditForm({
  id,
  datum,
  jmeno,
  castka,
}: {
  id: number;
  datum: string;
  jmeno: string;
  castka: number;
}) {
  const [d, setD] = useState(datum.split('T')[0]);
  const [j, setJ] = useState(jmeno);
  const [c, setC] = useState(String(castka));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/admin/prispevky/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          datum: d,
          jmeno: j,
          castka: parseFloat(c) || 0,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Chyba');
        return;
      }
      router.push('/admin');
      router.refresh();
    } catch {
      setError('Chyba připojení');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Datum</label>
        <input
          type="date"
          value={d}
          onChange={(e) => setD(e.target.value)}
          required
          className="w-full border rounded-[var(--radius)] px-4 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Jméno</label>
        <input
          type="text"
          value={j}
          onChange={(e) => setJ(e.target.value)}
          required
          className="w-full border rounded-[var(--radius)] px-4 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Částka (Kč)</label>
        <input
          type="number"
          value={c}
          onChange={(e) => setC(e.target.value)}
          required
          className="w-full border rounded-[var(--radius)] px-4 py-2"
        />
      </div>
      {error && <p className="text-red-600">{error}</p>}
      <Button
        type="submit"
        variant="secondary"
        size="sm"
        disabled={loading}
        textColor="text-white"
        iconColor="text-white"
      >
        {loading ? 'Ukládám...' : 'Uložit'}
      </Button>
    </form>
  );
}
