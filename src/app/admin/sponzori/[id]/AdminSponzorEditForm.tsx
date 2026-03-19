'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import LogoUploadCanvas from '@/components/LogoUploadCanvas';
import LogoSrovnaniNahled from '@/components/LogoSrovnaniNahled';

export default function AdminSponzorEditForm({
  id,
  typ,
  nazev,
  odkaz,
}: {
  id: number;
  typ: string;
  nazev: string;
  odkaz: string;
}) {
  const [t, setT] = useState(typ);
  const [n, setN] = useState(nazev);
  const [o, setO] = useState(odkaz);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPngBlob, setLogoPngBlob] = useState<Blob | null>(null);
  const [logoPreviewUrl, setLogoPreviewUrl] = useState<string | null>(null);
  const logoPngBlobRef = useRef<Blob | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [logoCacheBust] = useState(() => Date.now());
  const router = useRouter();

  useEffect(() => {
    logoPngBlobRef.current = logoPngBlob;
  }, [logoPngBlob]);

  useEffect(() => {
    if (!logoPngBlob) {
      setLogoPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(logoPngBlob);
    setLogoPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [logoPngBlob]);

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
    if (logoFile && !logoPngBlob) {
      setError('Počkejte na náhled loga před uložením');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('typ', t);
      formData.append('nazev', n);
      formData.append('odkaz', o);
      const blob = logoPngBlobRef.current;
      if (logoFile && blob) {
        formData.append('logo', new File([blob], 'logo.png', { type: 'image/png' }));
      }

      const res = await fetch(`/api/admin/sponzori/${id}`, {
        method: 'PUT',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Chyba');
        return;
      }
      router.push(`/admin/sponzori?r=${Date.now()}`);
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
        <label className="block text-sm font-medium mb-1">
          {logoPngBlob ? 'Nové logo (náhled)' : 'Aktuální logo'}
        </label>
        <div className="relative h-16 w-24 border border-gray-200 rounded-[var(--radius)] p-2">
          {logoPreviewUrl ? (
            <img
              src={logoPreviewUrl}
              alt=""
              className="w-full h-full object-contain"
            />
          ) : (
            <Image
              src={`/api/sponzori/${id}/logo?t=${logoCacheBust}`}
              alt=""
              fill
              className="object-contain"
              sizes="96px"
              unoptimized
            />
          )}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Typ</label>
        <select
          value={t}
          onChange={(e) => setT(e.target.value)}
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
          value={n}
          onChange={(e) => setN(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-[var(--radius)] px-4 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Odkaz (URL)</label>
        <input
          type="url"
          value={o}
          onChange={(e) => setO(e.target.value)}
          placeholder="https://..."
          className="w-full border border-gray-300 rounded-[var(--radius)] px-4 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Nové logo (volitelné – nebo Ctrl+V)</label>
        <input
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
          disabled={loading || (!!logoFile && !logoPngBlob)}
          className="px-4 py-2 bg-[#134070] text-white rounded-[var(--radius)] hover:bg-[#0d2d52] disabled:opacity-50"
        >
          {loading ? 'Ukládám...' : logoFile && !logoPngBlob ? 'Počkejte na náhled...' : 'Uložit'}
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
