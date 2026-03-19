'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui';

export default function AdminCastkaForm() {
  const [castka, setCastka] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/castka')
      .then((r) => r.json())
      .then((d) => setCastka(String(d.castka || 0)));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch('/api/admin/castka', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ castka: parseFloat(castka) || 0 }),
      });
      if (res.ok) {
        setMessage('Částka úspěšně aktualizována');
      } else {
        setMessage('Chyba při aktualizaci');
      }
    } catch {
      setMessage('Chyba připojení');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
      <input
        type="number"
        value={castka}
        onChange={(e) => setCastka(e.target.value)}
        className="border rounded-[var(--radius)] px-4 py-2 w-40"
      />
      <Button
        type="submit"
        variant="secondary"
        size="sm"
        disabled={loading}
        textColor="text-white"
        iconColor="text-white"
      >
        Aktualizovat
      </Button>
      {message && <span className="text-green-600">{message}</span>}
    </form>
  );
}
