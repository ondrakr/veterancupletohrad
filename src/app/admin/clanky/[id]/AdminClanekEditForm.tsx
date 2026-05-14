'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import RichTextEditor from '@/components/RichTextEditor';
import { normalizeFotoPath } from '@/lib/img';

const CATEGORY_OPTIONS = [
  { value: 'c', label: 'Článek' },
  { value: 'r', label: 'Rozhovor' },
] as const;

function normalizeCategory(value: string): 'c' | 'r' {
  const v = value.trim().toLowerCase();
  if (v === 'r' || v === 'rozhovor') return 'r';
  return 'c';
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () => reject(new Error('Nepodařilo se přečíst soubor'));
    reader.readAsDataURL(file);
  });
}

export default function AdminClanekEditForm({
  id,
  nadpis,
  obsah,
  foto,
  kategorie,
}: {
  id: number;
  nadpis: string;
  obsah: string;
  foto: string;
  kategorie: string;
}) {
  const [n, setN] = useState(nadpis);
  const [o, setO] = useState(obsah);
  const [fotoPath, setFotoPath] = useState(foto || '');
  const [fotoFile, setFotoFile] = useState<File | null>(null);
  const [fotoPreview, setFotoPreview] = useState<string | null>(null);
  const [k, setK] = useState<'c' | 'r'>(normalizeCategory(kategorie || 'c'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fotoInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const currentFoto = fotoPreview || (fotoPath ? normalizeFotoPath(fotoPath) : null);

  function handleFotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setFotoFile(file);
      setFotoPreview(URL.createObjectURL(file));
    } else {
      setFotoFile(null);
      if (fotoPreview) URL.revokeObjectURL(fotoPreview);
      setFotoPreview(null);
      if (fotoInputRef.current) fotoInputRef.current.value = '';
    }
  }

  function clearFoto() {
    setFotoFile(null);
    if (fotoPreview) URL.revokeObjectURL(fotoPreview);
    setFotoPreview(null);
    if (fotoInputRef.current) fotoInputRef.current.value = '';
    setFotoPath('');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      let finalFoto: string | null = fotoPath || null;
      if (fotoFile) {
        finalFoto = await fileToDataUrl(fotoFile);
      }
      const res = await fetch(`/api/admin/clanky/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nadpis: n,
          obsah: o || null,
          foto: finalFoto,
          kategorie: k || null,
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
          value={n}
          onChange={(e) => setN(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-[var(--radius)] px-4 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Obsah</label>
        <RichTextEditor value={o} onChange={setO} placeholder="Napište obsah článku..." />
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
        {currentFoto && (
          <div className="mt-2 relative inline-block">
            <div className="relative w-48 h-32 rounded-[var(--radius)] overflow-hidden border border-gray-200">
              <Image src={currentFoto} alt="Náhled" fill className="object-cover" unoptimized={!!fotoPreview} />
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
        <select
          value={k}
          onChange={(e) => setK(e.target.value as 'c' | 'r')}
          className="w-full border border-gray-300 rounded-[var(--radius)] px-4 py-2"
        >
          {CATEGORY_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
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
