import Image from 'next/image';
import BackLink from '@/components/BackLink';
import { PageContainer, ExternalLinks } from '@/components/ui';

export const metadata = {
  title: 'Viktorka',
  description:
    'Viktorka – příjemkyně sbírky Veterán Cup Letohrad. Charitativní podpora nemocných dětí z výtěžku hokejbalového turnaje.',
};

export default function OViktorcePage() {
  return (
    <PageContainer size="sm" className="pt-8 sm:pt-12 pb-8">
      <BackLink className="mb-4 block" />
      <h1 className="text-xl sm:text-2xl font-bold text-[var(--secondary)] mb-4 sm:mb-6">Viktorka</h1>
      <div className="relative h-56 sm:h-80 md:h-[500px] rounded-[var(--radius-lg)] overflow-hidden mb-6">
        <Image
          src="/image/viktorka.webp"
          alt="Viktorka"
          fill
          className="object-cover"
          style={{ objectPosition: '50% 30%' }}
        />
      </div>
      <ExternalLinks
        links={[
          { type: 'web', href: 'https://www.viktorkamps.cz/', label: 'www.viktorkamps.cz' },
        ]}
      />
      <div className="prose prose-sm sm:prose-lg max-w-none text-[var(--foreground)] [&_a]:text-[var(--secondary)] [&_a]:underline [&_h2]:text-[var(--secondary)] [&_h2]:font-bold [&_h2]:uppercase overflow-x-hidden">
        <p>
          Viktorka Čejková trpí vrozeným metabolickým onemocněním s názvem
          Mukopolysacharidoza 3a. Pravidelně navštěvuje logopedii, rehabilitace,
          ergoterapii a finanční pomoc rodičům usnadní se těchto terapií účastnit.
          Peníze budou využity na nákup zdravotních pomůcek a na úpravu auta a
          bydlení na bezbariérové.
        </p>
        <h2>Mukopolysacharidóza 3a</h2>
        <p>
          Jedná se o vrozené metabolické onemocnění s mimořádně obtížným průběhem.
          Nedostatek správně fungujícího enzymu má za následek střádání škodlivých
          látek v tkáních. V současné době neexistuje žádný lék, který by nemoc
          zcela vyléčil.
        </p>
      </div>
    </PageContainer>
  );
}
