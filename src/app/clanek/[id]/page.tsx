import ImageWithFallback from '@/components/ImageWithFallback';
import BackLink from '@/components/BackLink';
import { getClanek } from '@/lib/data';
import { enhanceArticleHtml } from '@/lib/html';
import { notFound } from 'next/navigation';
import { PageContainer } from '@/components/ui';
import { normalizeFotoPath } from '@/lib/img';
import { parsePositiveIntId } from '@/lib/parse-id';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const idNum = parsePositiveIntId(id);
  if (idNum == null) return { title: 'Článek' };
  const clanek = await getClanek(idNum);
  return {
    title: clanek?.nadpis ?? 'Článek',
    description: clanek?.obsah?.replace(/<[^>]*>/g, '').slice(0, 160) ?? undefined,
  };
}

export default async function ClanekPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const idNum = parsePositiveIntId(id);
  if (idNum == null) notFound();
  const clanek = await getClanek(idNum);
  if (!clanek) notFound();

  const fotoPath = normalizeFotoPath(clanek.foto);

  return (
    <PageContainer size="sm" className="pt-8 sm:pt-12 pb-8">
      <BackLink className="mb-4 block" />
      <h1 className="text-xl sm:text-2xl font-bold text-[var(--secondary)] mb-4 sm:mb-6 break-words">{clanek.nadpis}</h1>
      <div className="relative h-56 sm:h-80 md:h-[500px] rounded-[var(--radius-lg)] overflow-hidden mb-6">
        <ImageWithFallback
          src={fotoPath}
          alt={clanek.nadpis}
          fill
          className="object-cover"
          randomFallbackOnError={false}
        />
      </div>
      {clanek.obsah && (
        <div
          className="prose prose-sm sm:prose-lg max-w-none text-[var(--foreground)] [&_a]:text-[var(--secondary)] [&_a]:underline overflow-x-hidden"
          dangerouslySetInnerHTML={{ __html: enhanceArticleHtml(clanek.obsah) }}
        />
      )}
    </PageContainer>
  );
}
