import Image from 'next/image';
import BackLink from '@/components/BackLink';
import { PageContainer, ExternalLinks } from '@/components/ui';

export const metadata = {
  title: 'Klub nemocných cystickou fibrózou',
  description:
    'Klub nemocných cystickou fibrózou – příjemce sbírky Veterán Cup Letohrad. Podpora lidí s cystickou fibrózou.',
};

export default function OKlubuPage() {
  return (
    <PageContainer size="sm" className="pt-8 sm:pt-12 pb-8">
      <BackLink className="mb-4 block" />
      <h1 className="text-xl sm:text-2xl font-bold text-[var(--secondary)] mb-4 sm:mb-6 break-words">Klub nemocných cystickou fibrózou, z.s.</h1>
      <div className="relative h-56 sm:h-80 md:h-[500px] rounded-[var(--radius-lg)] overflow-hidden mb-6">
        <Image
          src="/image/cysticka-fibroza.jpg"
          alt="Klub CF"
          fill
          className="object-cover"
        />
      </div>
      <ExternalLinks
        links={[
          { type: 'web', href: 'https://klubcf.cz/', label: 'www.klubcf.cz' },
        ]}
      />
      <div className="prose prose-sm sm:prose-lg max-w-none text-[var(--foreground)] [&_a]:text-[var(--secondary)] [&_a]:underline [&_h2]:text-[var(--secondary)] [&_h2]:font-bold [&_h2]:uppercase overflow-x-hidden">
        <p>
          Klub nemocných cystickou fibrózou je pacientská organizace, která v
          sobě spojuje odhodlání, naději a neúnavnou podporu pro ty, kteří žijí
          s jedním z nejnáročnějších genetických onemocnění. Naše poslání je
          zlepšovat kvalitu života lidí s cystickou fibrózou a jejich rodin.
        </p>
        <p>
          Cystická fibróza je závažné onemocnění, které postihuje především plíce
          a trávicí systém. Naše organizace poskytuje pacientům komplexní
          podporu – od přístupu ke zdravotnickým pomůckám, přes poradenství, až
          po emocionální podporu.
        </p>
      </div>
    </PageContainer>
  );
}
