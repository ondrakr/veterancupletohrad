import Image from 'next/image';
import BackLink from '@/components/BackLink';
import { PageContainer, TextLink, ExternalLinks } from '@/components/ui';

export const metadata = {
  title: 'ZSŠ Neratov',
  description:
    'Základní škola speciální Neratov – jeden z příjemců sbírky Veterán Cup Letohrad. Pomáháme dětem s handicapem.',
};

export default function ONeratovuPage() {
  return (
    <PageContainer size="sm" className="pt-8 sm:pt-12 pb-8">
      <BackLink className="mb-4 block" />
      <h1 className="text-xl sm:text-2xl font-bold text-[var(--secondary)] mb-4 sm:mb-6 break-words">Základní škola speciální Neratov</h1>
      <div className="relative h-56 sm:h-80 md:h-[500px] rounded-[var(--radius-lg)] overflow-hidden mb-6">
        <Image
          src="/image/zss-neratov.jpg"
          alt="ZSŠ Neratov"
          fill
          className="object-cover"
        />
      </div>
      <ExternalLinks
        links={[
          { type: 'web', href: 'https://www.zakladniskolaspecialnineratov.cz/', label: 'www.zakladniskolaspecialnineratov.cz' },
        ]}
      />
      <div className="prose prose-sm sm:prose-lg max-w-none text-[var(--foreground)] [&_a]:text-[var(--secondary)] [&_a]:underline [&_h2]:text-[var(--secondary)] [&_h2]:font-bold [&_h2]:uppercase overflow-x-hidden">
        <p>
          Výuka probíhá podle školního vzdělávacího programu, vycházejícího z
          RVP ZŠS, schváleného Ministerstvem školství, mládeže a tělovýchovy, pod
          vedením kvalifikovaných pedagogů. Naším cílem je propojit výuku ve
          škole s přírodou, realizovanou častými pobyty venku, mimo školní
          lavice.
        </p>
        <p>
          Škola sama se svými žáky připravuje vystoupení a besídky pro rodiče a
          širokou veřejnost. Součástí školy je také odpolední školní družina a
          jídelna. Žákům je k dispozici školní zahrada a bezbariérová cvičná
          kuchyňka a keramická dílna.
        </p>
        <h2>Proč jsme školu založili?</h2>
        <p>
          Škola pro děti s postižením souzní se záměry sdružení Neratov –
          obnovovat vysídlenou ves a poutní místo smíření a pomáhat zde lidem
          handicapovaným či jinak znevýhodněným.
        </p>
        <h2>Jaká má naše škola být?</h2>
        <p>
          Chceme školu malou, rodinnou a přátelskou. Důraz klademe na harmonický
          rozvoj osobnosti dítěte, na vyvážení výuky, odpočinku a her.
        </p>
        <p>
          Více informací na{' '}
          <TextLink href="https://www.neratov.cz" external className="underline">
            www.neratov.cz
          </TextLink>
        </p>
      </div>
    </PageContainer>
  );
}
