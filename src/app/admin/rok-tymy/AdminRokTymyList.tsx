'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type RokTym = {
  id: number;
  rok: number;
  tym_kod: string;
  nazev: string;
  poradi: number;
};

const ROK_LABELS: Record<number, string> = {
  24: '2024',
  25: '2025',
  26: '2026',
};

export default function AdminRokTymyList() {
  const [items, setItems] = useState<RokTym[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<number | null>(null);
  const [editNazev, setEditNazev] = useState('');
  const [newItem, setNewItem] = useState({ rok: 25, tym_kod: '', nazev: '' });

  useEffect(() => {
    fetch('/api/admin/rok-tymy')
      .then((r) => r.json())
      .then((data) => setItems(Array.isArray(data) ? data : []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  async function handleSave(id: number) {
    const res = await fetch(`/api/admin/rok-tymy/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...items.find((i) => i.id === id),
        nazev: editNazev,
      }),
    });
    if (res.ok) {
      setItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, nazev: editNazev } : i))
      );
      setEditing(null);
    }
  }

  async function handleDelete(id: number, nazev: string) {
    if (!confirm(`Smazat tým „${nazev}“?`)) return;
    const res = await fetch(`/api/admin/rok-tymy/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setItems((prev) => prev.filter((i) => i.id !== id));
    }
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!newItem.tym_kod.trim() || !newItem.nazev.trim()) return;
    const res = await fetch('/api/admin/rok-tymy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...newItem,
        poradi: items.filter((i) => i.rok === newItem.rok).length,
      }),
    });
    if (res.ok) {
      const data = await fetch('/api/admin/rok-tymy').then((r) => r.json());
      setItems(Array.isArray(data) ? data : []);
      setNewItem({ rok: 25, tym_kod: '', nazev: '' });
    }
  }

  if (loading) return <p className="text-gray-600">Načítám...</p>;

  const byRok = items.reduce(
    (acc, i) => {
      if (!acc[i.rok]) acc[i.rok] = [];
      acc[i.rok].push(i);
      return acc;
    },
    {} as Record<number, RokTym[]>
  );

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleAdd}
        className="bg-white p-4 rounded-[var(--radius)] shadow flex flex-wrap gap-4 items-end"
      >
        <div>
          <label className="block text-sm font-medium mb-1">Ročník</label>
          <select
            value={newItem.rok}
            onChange={(e) => setNewItem((p) => ({ ...p, rok: Number(e.target.value) }))}
            className="border border-gray-300 rounded-[var(--radius)] px-3 py-2"
          >
            <option value={23}>2023</option>
            <option value={24}>2024</option>
            <option value={25}>2025</option>
            <option value={26}>2026</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Kód týmu</label>
          <input
            type="text"
            value={newItem.tym_kod}
            onChange={(e) => setNewItem((p) => ({ ...p, tym_kod: e.target.value }))}
            placeholder="c, m, b, tc, tm, tb"
            className="border border-gray-300 rounded-[var(--radius)] px-3 py-2 w-24"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Název</label>
          <input
            type="text"
            value={newItem.nazev}
            onChange={(e) => setNewItem((p) => ({ ...p, nazev: e.target.value }))}
            placeholder="Červený tým"
            className="border border-gray-300 rounded-[var(--radius)] px-3 py-2 min-w-[180px]"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded-[var(--radius)] hover:bg-green-700"
        >
          Přidat tým
        </button>
      </form>

      <div className="bg-white rounded-[var(--radius)] shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 font-semibold">Ročník</th>
                <th className="text-left py-3 px-4 font-semibold">Kód</th>
                <th className="text-left py-3 px-4 font-semibold">Název</th>
                <th className="text-right py-3 px-4 font-semibold">Akce</th>
              </tr>
            </thead>
            <tbody>
              {([26, 25, 24, 23] as const).flatMap((rok) =>
                (byRok[rok] || []).map((i) => (
                  <tr key={i.id} className="border-t border-gray-200">
                    <td className="py-3 px-4">{ROK_LABELS[rok] || rok}</td>
                    <td className="py-3 px-4 font-mono text-sm">{i.tym_kod}</td>
                    <td className="py-3 px-4">
                      {editing === i.id ? (
                        <input
                          type="text"
                          value={editNazev}
                          onChange={(e) => setEditNazev(e.target.value)}
                          className="border border-gray-300 rounded px-2 py-1 w-full max-w-xs"
                          autoFocus
                        />
                      ) : (
                        <span>{i.nazev}</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      {editing === i.id ? (
                        <>
                          <button
                            type="button"
                            onClick={() => handleSave(i.id)}
                            className="text-green-600 hover:underline mr-3"
                          >
                            Uložit
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditing(null)}
                            className="text-gray-500 hover:underline"
                          >
                            Zrušit
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={() => {
                              setEditing(i.id);
                              setEditNazev(i.nazev);
                            }}
                            className="text-[#134070] hover:underline mr-3"
                          >
                            Upravit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(i.id, i.nazev)}
                            className="text-red-600 hover:underline"
                          >
                            Smazat
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
