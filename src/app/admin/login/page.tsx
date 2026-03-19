'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Chyba přihlášení');
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
    <div className="max-w-md mx-auto mt-8 sm:mt-20 bg-white rounded-[var(--radius)] shadow-lg p-6 sm:p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Přihlásit se</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Uživatelské jméno</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full border rounded-[var(--radius)] px-4 py-2"
            placeholder="Uživatelské jméno"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Heslo</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border rounded-[var(--radius)] px-4 py-2"
            placeholder="Heslo"
          />
        </div>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <Button
          type="submit"
          variant="secondary"
          fullWidth
          disabled={loading}
          textColor="text-white"
          iconColor="text-white"
        >
          {loading ? 'Přihlašování...' : 'Přihlásit se'}
        </Button>
      </form>
    </div>
  );
}
