'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui';

export default function AdminPrispevkyList() {
  const [data, setData] = useState<
    { id: number; datum: string; jmeno: string; castka: number }[]
  >([]);

  useEffect(() => {
    fetch('/api/prispevky')
      .then((r) => r.json())
      .then(setData);
  }, []);

  async function handleDelete(id: number) {
    if (!confirm('Opravdu chcete odstranit tento řádek?')) return;
    const res = await fetch(`/api/admin/prispevky/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setData((prev) => prev.filter((p) => p.id !== id));
    }
  }

  const formatDatum = (d: string) =>
    new Date(d).toLocaleDateString('cs-CZ', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    });

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse min-w-[400px]">
      <thead>
        <tr className="border-b">
          <th className="text-left py-2">Datum</th>
          <th className="text-left py-2">Jméno</th>
          <th className="text-left py-2">Částka</th>
          <th className="text-left py-2">Akce</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id} className="border-b">
            <td className="py-2 px-2 sm:px-4 text-sm sm:text-base">{formatDatum(row.datum)}</td>
            <td className="py-2 px-2 sm:px-4 text-sm sm:text-base">{row.jmeno}</td>
            <td className="py-2 px-2 sm:px-4 text-sm sm:text-base">{row.castka}</td>
            <td className="py-2 px-2 sm:px-4 flex flex-wrap gap-2">
              <Button
                href={`/admin/prispevky/${row.id}`}
                variant="secondary"
                size="sm"
                textColor="text-white"
                iconColor="text-white"
              >
                Upravit
              </Button>
              <Button
                onClick={() => handleDelete(row.id)}
                variant="destructive"
                size="sm"
              >
                Odstranit
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}
