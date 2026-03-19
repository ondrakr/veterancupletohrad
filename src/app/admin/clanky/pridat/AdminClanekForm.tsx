'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import RichTextEditor from '@/components/RichTextEditor';

export default function AdminClanekForm() {
  const [nadpis, setNadpis] = useState('');
  const [obsah, setObsah] = useState('');
  const [fotoFile, setFotoFile] = useState<File | null>(null);
  const [fotoPreview, setFotoPreview] = useState<string | null>(null);
  const [kategorie, setKategorie] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fotoInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  function handleFotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setFotoFile(file);
      setFotoPreview(URL.createObjectURL(file));
    } else {
      setFotoFile(null);
      if (fotoPreview) URL.revokeObjectURL(fotoPreview);
      setFotoPreview(null);
    }
  }

  function clearFoto() {
    setFotoFile(null);
    if (fotoPreview) URL.revokeObjectURL(fotoPreview);
    setFotoPreview(null);
    if (fotoInputRef.current) fotoInputRef.current.value = '';
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      let fotoPath: string | null = null;
      if (fotoFile) {
        const fd = new FormData();
        fd.append('file', fotoFile);
        const upRes = await fetch('/api/admin/clanky/upload', { method: 'POST', body: fd });
        const upData = await upRes.json();
        if (!upRes.ok) {
          setError(upData.error || 'Chyba při nahrávání fotky');
          return;
        }
        fotoPath = upData.path;
      }
      const res = await fetch('/api/admin/clanky', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nadpis,
          obsah: obsah || null,
          foto: fotoPath,
          kategorie: kategorie || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Chyba');
        return;
      }
      router.push('/admin/clanky');
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
        <label className="block text-sm font-medium mb-1">Nadpis *</label>
        <input
          type="text"
          value={nadpis}
          onChange={(e) => setNadpis(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-[var(--radius)] px-4 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Obsah</label>
        <RichTextEditor value={obsah} onChange={setObsah} placeholder="Napište obsah článku..." />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Úvodní foto</label>
        <input
          ref={fotoInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={handleFotoChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-[var(--radius)] file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
        />
        {fotoPreview && (
          <div className="mt-2 relative inline-block">
            <div className="relative w-48 h-32 rounded-[var(--radius)] overflow-hidden border border-gray-200">
              <Image src={fotoPreview} alt="Náhled" fill className="object-cover" unoptimized />
            </div>
            <button
              type="button"
              onClick={clearFoto}
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-sm hover:bg-red-600"
            >
              ×
            </button>
          </div>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Kategorie</label>
        <input
          type="text"
          value={kategorie}
          onChange={(e) => setKategorie(e.target.value)}
          className="w-full border border-gray-300 rounded-[var(--radius)] px-4 py-2"
        />
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
