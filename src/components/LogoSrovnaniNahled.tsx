'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

type Sponzor = { id: number; typ: string; nazev: string };

type LogoSrovnaniNahledProps = {
  novyLogoBlob?: Blob | null;
};

export default function LogoSrovnaniNahled({ novyLogoBlob }: LogoSrovnaniNahledProps) {
  const [sponzori, setSponzori] = useState<Sponzor[]>([]);
  const [loading, setLoading] = useState(true);
  const [novyLogoUrl, setNovyLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/sponzori')
      .then((r) => r.json())
      .then((data) => setSponzori(Array.isArray(data) ? data : []))
      .catch(() => setSponzori([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!novyLogoBlob) {
      setNovyLogoUrl(null);
      return;
    }
    const url = URL.createObjectURL(novyLogoBlob);
    setNovyLogoUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [novyLogoBlob]);

  const hasContent = novyLogoUrl || sponzori.length > 0;
  if (loading && !hasContent) return null;

  return (
    <div className="mt-8">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Porovnání velikostí (jako na hlavní stránce)</h3>
      <div className="flex flex-wrap items-center gap-10">
        {novyLogoUrl && (
          <div className="h-20 w-28 flex-shrink-0 flex items-center justify-center relative">
            <img
              src={novyLogoUrl}
              alt="Nové logo"
              className="max-h-full max-w-full object-contain"
            />
          </div>
        )}
        {sponzori.map((s) => (
          <div key={s.id} className="h-20 w-28 flex-shrink-0 relative">
            <Image
              src={`/api/sponzori/${s.id}/logo`}
              alt={s.nazev}
              fill
              className="object-contain"
              sizes="112px"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
