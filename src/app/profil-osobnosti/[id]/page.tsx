import ImageWithFallback from '@/components/ImageWithFallback';
import BackLink from '@/components/BackLink';
import { getOsobnost } from '@/lib/data';
import { User } from 'lucide-react';
import { notFound } from 'next/navigation';
import { PageContainer } from '@/components/ui';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const o = await getOsobnost(parseInt(id, 10));
  return {
    title: o?.jmeno ?? 'Profil',
    description: o ? `Profil ${o.jmeno} – účastník utkání osobností Veterán Cup Letohrad. ${o.sport ?? ''}`.trim() : undefined,
  };
}

export default async function ProfilOsobnostiPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const o = await getOsobnost(parseInt(id, 10));
  if (!o) notFound();

  return (
    <div className="bg-[var(--secondary-dark)] min-h-screen -mx-4 sm:-mx-6 lg:-m-8 p-4 sm:p-6 lg:p-8 rounded-none sm:rounded-[var(--radius-lg)]">
      <PageContainer size="sm" className="pt-12 pb-8">
        <BackLink className="!text-white/90 hover:!text-white mb-6 block" />
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          <div className="relative w-48 sm:w-56 md:w-64 h-60 sm:h-72 md:h-80 rounded-[var(--radius-lg)] overflow-hidden flex-shrink-0 mx-auto md:mx-0 bg-[var(--secondary)] flex items-center justify-center">
            {o.img?.trim() ? (
              <ImageWithFallback
                src={`/profilovky/${o.img}`}
                alt={o.jmeno}
                fill
                className="object-cover"
              />
            ) : (
              <User className="w-24 sm:w-28 md:w-32 h-24 sm:h-28 md:h-32 text-white" strokeWidth={1.5} />
            )}
          </div>
          <div className="text-white">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-center md:text-left">{o.jmeno}</h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-6 text-center md:text-left">{o.sport}</p>
            {o.popis && (
              <div
                className="prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: o.popis }}
              />
            )}
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
