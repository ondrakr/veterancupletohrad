import { getClanky, getClankyCount } from '@/lib/data';
import { ArticleCard, PageContainer, Pagination } from '@/components/ui';

export const dynamic = 'force-dynamic';

const PER_PAGE = 12;

export const metadata = {
  title: 'Novinky',
  description:
    'Aktuality a články z charitativního hokejbalového turnaje Veterán Cup Letohrad. Program, výsledky sbírek, reportáže.',
};

export default async function NovinkyPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, parseInt(pageParam ?? '1', 10) || 1);
  const offset = (page - 1) * PER_PAGE;

  const [clanky, total] = await Promise.all([
    getClanky({ limit: PER_PAGE, offset }),
    getClankyCount(),
  ]);
  const totalPages = Math.ceil(total / PER_PAGE);

  return (
    <PageContainer size="lg" className="pt-8 sm:pt-12 pb-8 flex flex-col gap-8 sm:gap-12">
      <div className="bg-white rounded-[var(--radius-lg)] overflow-hidden">
        <div className="px-4 sm:px-6 pt-6 pb-2">
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--secondary)] uppercase m-0">
            Novinky
          </h2>
        </div>
        <div className="px-4 sm:px-6 pt-4 pb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {clanky.map((c: { id: number; nadpis: string; foto: string; datum?: string; obsah?: string }) => (
              <ArticleCard
                key={c.id}
                id={c.id}
                nadpis={c.nadpis}
                foto={c.foto}
                datum={c.datum}
                obsah={c.obsah}
              />
            ))}
          </div>
          <Pagination currentPage={page} totalPages={totalPages} />
        </div>
      </div>
    </PageContainer>
  );
}
