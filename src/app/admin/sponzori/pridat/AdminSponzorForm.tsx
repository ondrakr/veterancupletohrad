'use client';

import { useCallback, useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import LogoUploadCanvas from '@/components/LogoUploadCanvas';
import LogoSrovnaniNahled from '@/components/LogoSrovnaniNahled';

export default function AdminSponzorForm() {
  const [typ, setTyp] = useState<'sponzor' | 'partner'>('sponzor');
  const [nazev, setNazev] = useState('');
  const [odkaz, setOdkaz] = useState('');
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPngBlob, setLogoPngBlob] = useState<Blob | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handlePngReady = useCallback((blob: Blob | null) => {
    setLogoPngBlob(blob);
  }, []);

  useEffect(() => {
    function handlePaste(e: ClipboardEvent) {
      const target = e.target as HTMLElement;
      if (target?.closest('input, textarea, [contenteditable="true"]')) return;
      const items = e.clipboardData?.items;
      if (!items) return;
      for (const item of items) {
        if (item.type.startsWith('image/')) {
          const blob = item.getAsFile();
          if (blob) {
            e.preventDefault();
            const ext = blob.type.split('/')[1] || 'png';
            setLogoFile(new File([blob], `vlozeno.${ext}`, { type: blob.type }));
            break;
          }
        }
      }
    }
    document.addEventListener('paste', handlePaste);
    return () => document.removeEventListener('paste', handlePaste);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!logoFile || !logoPngBlob) {
      setError('Vyberte logo a počkejte na náhled');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('typ', typ);
      formData.append('nazev', nazev);
      if (odkaz) formData.append('odkaz', odkaz);
      formData.append('logo', new File([logoPngBlob], 'logo.png', { type: 'image/png' }));

      const res = await fetch('/api/admin/sponzori', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Chyba');
        return;
      }
      router.push('/admin/sponzori');
      router.refresh();
    } catch {
      setError('Chyba připojení');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-4 bg-white p-6 rounded-[var(--radius)] shadow">
      <div>
        <label className="block text-sm font-medium mb-1">Typ</label>
        <select
          value={typ}
          onChange={(e) => setTyp(e.target.value as 'sponzor' | 'partner')}
          className="w-full border border-gray-300 rounded-[var(--radius)] px-4 py-2"
        >
          <option value="sponzor">Sponzor</option>
          <option value="partner">Partner</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Název *</label>
        <input
          type="text"
          value={nazev}
          onChange={(e) => setNazev(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-[var(--radius)] px-4 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Odkaz (URL)</label>
        <input
          type="url"
          value={odkaz}
          onChange={(e) => setOdkaz(e.target.value)}
          placeholder="https://..."
          className="w-full border border-gray-300 rounded-[var(--radius)] px-4 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Logo * (PNG, JPG, WebP nebo Ctrl+V)</label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/webp"
          onChange={(e) => {
            const f = e.target.files?.[0] || null;
            setLogoFile(f);
            if (!f) setLogoPngBlob(null);
          }}
          className="w-full border border-gray-300 rounded-[var(--radius)] px-4 py-2"
        />
        <LogoUploadCanvas
          file={logoFile}
          onPngReady={handlePngReady}
          className="mt-3"
        />
      </div>
      {error && <p className="text-red-600">{error}</p>}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading || !logoFile || !logoPngBlob}
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
    <LogoSrovnaniNahled novyLogoBlob={logoPngBlob} />
    </div>
  );
}
