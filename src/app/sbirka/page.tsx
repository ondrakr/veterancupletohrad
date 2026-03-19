import Image from 'next/image';
import { Heart, Info } from 'lucide-react';
import CopyAccountButton from '@/components/CopyAccountButton';
import { getCastka, getPrispevky } from '@/lib/data';
import {
  BeneficiaryCard,
  PageContainer,
  SectionHeader,
  PrispevkyTable,
  Button,
} from '@/components/ui';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Sbírka',
  description:
    'Přispějte na charitativní sbírku Veterán Cup Letohrad. Výtěžek pomáhá ZSŠ Neratov, Janičce, Viktorce a Klubu nemocných cystickou fibrózou. Číslo účtu a informace o přispění.',
};

const BENEFICIARIES = [
  { href: '/o-neratovu', img: '/image/zss-neratov.jpg', label: 'ZSŠ Neratov' },
  { href: '/o-janicce', img: '/image/janicka.jpg', label: 'Janička', objectPosition: '50% 15%' },
  { href: '/o-viktorce', img: '/image/viktorka.webp', label: 'Viktorka', objectPosition: '50% 30%' },
  {
    href: '/o-klubu',
    img: '/image/cysticka-fibroza.jpg',
    label: 'Klub nemocných cystickou fibrózou',
  },
];

export default async function SbirkaPage() {
  const [castka, prispevky2026, prispevky2025, prispevky2024] = await Promise.all([
    getCastka(),
    getPrispevky('2026'),
    getPrispevky('2025'),
    getPrispevky('2024'),
  ]);
  const castkaFormatted = new Intl.NumberFormat('cs-CZ').format(castka);

  return (
    <PageContainer size="lg" className="pt-8 sm:pt-12 pb-8 flex flex-col gap-8 sm:gap-12">
      {/* Hero sekce – modrý box s nadpisem a částkou */}
      <div className="text-center">
        <div className="rounded-[var(--radius-lg)] overflow-hidden border border-gray-200">
          <div className="bg-[var(--secondary)] text-white py-8 sm:py-10 px-4 sm:px-6 md:px-12">
            <p className="text-sm sm:text-base md:text-lg font-normal m-0 mb-4 text-white mx-auto leading-tight">
              Veřejná sbírka pro ZSŠ Neratov, Janičku, Viktorku a Klub nemocných cystickou fibrózou
            </p>
            <p className="text-3xl sm:text-4xl md:text-5xl font-bold m-0">
              {castkaFormatted} Kč
            </p>
          </div>
        </div>
      </div>

      {/* Jak přispět – bankovní účet */}
      <div id="jak-prispet" className="scroll-mt-8">
        <h2 className="text-xl font-bold uppercase m-0 flex items-center gap-2 text-[var(--primary)] mb-6">
          <Heart className="w-6 h-6" strokeWidth={1.5} />
          Jak přispět
        </h2>
        <div className="bg-white rounded-[var(--radius-lg)] overflow-hidden border border-gray-200">
          <div className="p-4 sm:p-6 md:p-8 flex flex-col sm:flex-row flex-wrap items-start justify-between gap-6">
            <div>
              <p className="text-xs font-medium text-[var(--secondary)] uppercase tracking-wider mb-2">
                Číslo účtu
              </p>
              <CopyAccountButton />
              <p className="text-[var(--foreground)]/80 text-sm m-0 mt-2">
                Libovolnou částku pošlete na účet níže. Každá koruna se počítá. Děkujeme!
              </p>
              <p className="text-[var(--foreground)]/70 text-sm mt-3 flex items-center gap-2">
                <Info className="w-4 h-4 shrink-0 text-[var(--secondary)]" strokeWidth={1.5} />
                Do poznámky napište &quot;chci zveřejnit&quot; či &quot;nechci zveřejnit&quot; na sociálních sítích a webu Veterán Cupu.
              </p>
            </div>
            <div className="shrink-0 mx-auto sm:ml-auto sm:mr-0">
              <Image
                src="/img/qr_kod.png"
                alt="QR kód pro platbu"
                width={140}
                height={140}
                className="rounded-[var(--radius)] border border-gray-200"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Již přispěli */}
      <div>
        <SectionHeader className="mb-4">Již přispěli</SectionHeader>
        <div className="bg-white rounded-[var(--radius-lg)] overflow-hidden border border-gray-200 p-4 sm:p-6 overflow-x-auto">
          <PrispevkyTable data={prispevky2026} />
        </div>
      </div>

      <div>
        <SectionHeader className="mb-4">Přispěli v roce 2025</SectionHeader>
        <div className="bg-white rounded-[var(--radius-lg)] overflow-hidden border border-gray-200 p-4 sm:p-6 overflow-x-auto">
          <PrispevkyTable data={prispevky2025} />
        </div>
      </div>

      <div>
        <SectionHeader className="mb-4">Přispěli v roce 2024</SectionHeader>
        <div className="bg-white rounded-[var(--radius-lg)] overflow-hidden border border-gray-200 p-4 sm:p-6 overflow-x-auto">
          <PrispevkyTable data={prispevky2024} />
        </div>
      </div>

      {/* Komu pomáháme */}
      <div>
        <SectionHeader className="mb-6">Komu pomáháme?</SectionHeader>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BENEFICIARIES.map((item) => (
            <BeneficiaryCard
              key={item.href}
              href={item.href}
              img={item.img}
              label={item.label}
              objectPosition={'objectPosition' in item ? item.objectPosition : undefined}
            />
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Button
            href="/sbirka#jak-prispet"
            variant="secondary"
            rounded="full"
            icon={<Heart className="w-5 h-5" strokeWidth={1} />}
            textColor="text-white"
            iconColor="text-white"
          >
            CHCI PŘISPĚT
          </Button>
        </div>
      </div>
    </PageContainer>
  );
}
