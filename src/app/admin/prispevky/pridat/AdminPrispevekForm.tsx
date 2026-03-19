'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui';

export default function AdminPrispevekForm() {
  const [datum, setDatum] = useState('');
  const [jmeno, setJmeno] = useState('');
  const [castka, setCastka] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/prispevky', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          datum,
          jmeno,
          castka: parseFloat(castka) || 0,
        }),
      });
      if (!res.ok) {
        const d = await res.json();
        setError(d.error || 'Chyba');
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
          value={datum}
          onChange={(e) => setDatum(e.target.value)}
          required
          className="w-full border rounded-[var(--radius)] px-4 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Jméno</label>
        <input
          type="text"
          value={jmeno}
          onChange={(e) => setJmeno(e.target.value)}
          required
          className="w-full border rounded-[var(--radius)] px-4 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Částka (Kč)</label>
        <input
          type="number"
          value={castka}
          onChange={(e) => setCastka(e.target.value)}
          required
          className="w-full border rounded-[var(--radius)] px-4 py-2"
        />
      </div>
      {error && <p className="text-red-600">{error}</p>}
      <Button
        variant="secondary"
        size="sm"
        type="submit"
        disabled={loading}
        textColor="text-white"
        iconColor="text-white"
      >
        {loading ? 'Ukládám...' : 'Přidat'}
      </Button>
    </form>
  );
}
