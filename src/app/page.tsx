import Link from 'next/link';
import Image from 'next/image';
import { Heart, ChevronRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Charitativní hokejbalový turnaj 2026',
};

import ImageWithFallback from '@/components/ImageWithFallback';
import HeroSection from '@/components/HeroSection';
import LogoMarquee from '@/components/LogoMarquee';
import {
  Button,
  ArticleCard,
  BeneficiaryCard,
  PersonCard,
  PageContainer,
  SectionHeader,
  Card,
} from '@/components/ui';
import {
  getCastka,
  getClanky,
  getSponzori,
  getOsobnosti,
  getBanner,
} from '@/lib/data';

const FALLBACK_PARTNERI = ['pardubicky kraj', 'mlada-boleslav', 'plzen', 'energie', 'slavia', 'vitkovice', 'dynamo', 'letohrad', 'kladno', 'hradec'];

function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

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

async function getData() {
  const [castka, clanky, sponzori, partneri, osobnosti, banner] = await Promise.all([
    getCastka(),
    getClanky(3),
    getSponzori('sponzor'),
    getSponzori('partner'),
    getOsobnosti({ rok: 26 }),
    getBanner(),
  ]);
  return {
    castka,
    clanky,
    sponzori: shuffle(sponzori),
    partneri: shuffle(partneri),
    osobnosti,
    banner,
  };
}

export default async function HomePage() {
  const { castka, clanky, sponzori, partneri, osobnosti, banner } = await getData();
  const castkaFormatted = new Intl.NumberFormat('cs-CZ').format(castka);
  const logoCacheBust = Date.now();

  return (
    <>
      <HeroSection sponzori={sponzori} banner={banner} logoCacheBust={logoCacheBust} />

      {/* Sekce Partneři – samostatně pod hero */}
      <div className="bg-white py-8 sm:py-10">
        <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-[var(--container-px)]">
          <Link
            href="/sponzori"
            className="block mb-8 text-center font-bold text-[22px] leading-normal hover:underline cursor-pointer"
            style={{ color: '#134070' }}
          >
            PARTNEŘI
          </Link>
          {partneri.length > 0 ? (
            <LogoMarquee items={partneri} type="api" logoCacheBust={logoCacheBust} />
          ) : (
            <LogoMarquee
              items={shuffle(FALLBACK_PARTNERI).map((name) => ({ name }))}
              type="static"
              basePath="/partneri-2025"
            />
          )}
        </div>
      </div>

      <div id="obsah" className="overflow-x-hidden">
        <PageContainer size="lg" className="pt-12 pb-8 flex flex-col gap-12">
          <div>
            <div className="text-center">
              <p className="text-[var(--primary)] text-2xl md:text-4xl font-extrabold m-0">
                20. června 2026
              </p>
              <p className="text-[var(--secondary)] text-lg md:text-xl font-bold m-0 mt-1">
                LETOHRAD
              </p>
              <p className="text-gray-600 text-sm md:text-base m-0 mt-2">
                Akce se koná pod záštitou senátora ČR a starosty města Letohrad Petra Fialy
              </p>
            </div>

            <Link
              href="/sbirka"
              className="block rounded-[var(--radius-lg)] overflow-hidden border border-gray-200 hover:border-gray-300 transition-colors mt-6"
            >
              <div className="bg-[var(--secondary)] text-white py-8 px-6 md:px-10">
                <p className="text-base md:text-lg font-normal m-0 mb-4 text-center">
                  Veřejná sbírka pro ZSŠ Neratov, Janičku, Viktorku a Klub nemocných
                  cystickou fibrózou
                </p>
                <p className="text-3xl md:text-4xl font-bold m-0 text-center">
                  {castkaFormatted} Kč
                </p>
              </div>
            </Link>
          </div>

          <div>
            <SectionHeader className="mb-6">Komu pomáháme?</SectionHeader>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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
            <div className="flex justify-center">
              <Button
                href="/sbirka"
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

          <div className="bg-white rounded-[var(--radius-lg)] overflow-hidden">
            <div className="pt-6 pb-2">
              <Link href="/novinky" className="group flex items-center justify-between gap-2">
                <h2 className="text-2xl font-bold text-[var(--secondary)] uppercase m-0">
                  Novinky
                </h2>
                <span className="text-[var(--secondary)] text-sm font-medium group-hover:underline flex items-center gap-1">
                  Všechny články
                  <ChevronRight className="w-4 h-4 shrink-0" />
                </span>
              </Link>
            </div>
            <div className="pt-4 pb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            </div>
          </div>

          <div id="program" className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[var(--secondary)] py-10 sm:py-12 scroll-mt-24">
            <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-[var(--container-px)]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                <div className="flex flex-col">
                  <h3 className="text-2xl font-bold text-white mb-0 pt-0 pb-4 uppercase">
                    Program celého dne
                  </h3>
                  <ol className="divide-y divide-white/20">
                    <li className="flex gap-4 py-4 pr-6">
                      <span className="shrink-0 inline-flex items-center justify-center min-w-[4.5rem] h-8 px-2 rounded-[var(--radius)] bg-white text-[var(--secondary)] text-sm font-semibold">
                        9:30
                      </span>
                      <span className="text-white pt-0.5">Turnaj veteránů</span>
                    </li>
                    <li className="flex gap-4 py-4 pr-6">
                      <span className="shrink-0 inline-flex items-center justify-center min-w-[4.5rem] h-8 px-2 rounded-[var(--radius)] bg-white text-[var(--secondary)] text-sm font-semibold">
                        15:20
                      </span>
                      <span className="text-white pt-0.5">
                        Beseda Davida Nyče
                        <span className="block text-sm mt-1 text-white/80">Utkání dětí ZSŠ Neratov a SK Hokejbal Letohrad</span>
                      </span>
                    </li>
                    <li className="flex gap-4 py-4 pr-6">
                      <span className="shrink-0 inline-flex items-center justify-center min-w-[4.5rem] h-8 px-2 rounded-[var(--radius)] bg-white text-[var(--secondary)] text-sm font-semibold">
                        16:00
                      </span>
                      <span className="text-white pt-0.5">Utkání osobností</span>
                    </li>
                    <li className="flex gap-4 py-4 pr-6">
                      <span className="shrink-0 inline-flex items-center justify-center min-w-[4.5rem] h-8 px-2 rounded-[var(--radius)] bg-white text-[var(--secondary)] text-sm font-semibold">
                        18:00
                      </span>
                      <span className="text-white pt-0.5">Předání šeku</span>
                    </li>
                  </ol>
                </div>
                <div className="relative h-full min-h-[280px] lg:min-h-0 overflow-hidden rounded-[var(--radius-lg)]">
                  <Image
                    src="/image/rocnik2025.jpg"
                    alt="Veterán Cup 2025 – účastníci a hosté na hřišti v Letohradě"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sekce moderátorka – prozatím skryta, odkomentovat pro zobrazení
          <div>
            <SectionHeader className="mb-4">Moderátorka</SectionHeader>
            <Card padding="lg" hover={false} className="overflow-hidden">
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-center sm:items-start">
                <div className="flex-1 text-center sm:text-left order-2 sm:order-1">
                  <h2 className="text-xl sm:text-2xl font-bold text-[var(--secondary)] uppercase m-0 mb-3">
                    Tereza Kubíčková
                  </h2>
                  <p className="text-gray-600 m-0 leading-relaxed max-w-2xl">
                    Moderátorkou 12. ročníku charitativního hokejbalového turnaje Veterán Cup Letohrad bude opět Tereza Kubíčková. Tato výrazná osobnost české sportovní žurnalistiky působí od roku 2018 jako hokejová reportérka na stanici O2 TV Sport, nyní Oneplay Sport. Tereza pochází ze Znojma, kde její vášeň k hokeji vznikla již v dětství. Během své kariéry působila v různých médiích, včetně Českého rozhlasu a Eurosportu. Na Oneplay Sport se jako reportérka podílí na přenosech ze zápasů hokejové Tipsport extraligy a fotbalové Chance Ligy, věnuje se dabingu, moderuje také pořad HandiTalks, který se věnuje inspirativním příběhům sportovců s handicapem.
                  </p>
                </div>
                <div className="shrink-0 w-40 h-40 sm:w-48 sm:h-48 rounded-[var(--radius-lg)] overflow-hidden order-1 sm:order-2">
                  <Image
                    src="/image/kubickova.png"
                    alt="Tereza Kubíčková – moderátorka"
                    width={192}
                    height={192}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </Card>
          </div>
          */}

          <div className="bg-white rounded-[var(--radius-lg)] overflow-hidden">
            <div className="pt-6 pb-2">
              <Link href="/osobnosti" className="group flex items-center justify-between gap-2">
                <h2 className="text-2xl font-bold text-[var(--secondary)] uppercase m-0">
                  Utkání osobností 2026
                </h2>
                <span className="text-[var(--secondary)] text-sm font-medium group-hover:underline flex items-center gap-1">
                  Všechny osobnosti
                  <ChevronRight className="w-4 h-4 shrink-0" />
                </span>
              </Link>
            </div>
            <div className="pt-4 pb-6">
              {osobnosti.length > 0 ? (
                <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-4 md:gap-6">
                  {osobnosti.map(
                    (o: {
                      id: number;
                      jmeno: string;
                      img_thumbnail: string;
                      popis?: string | null;
                    }) => (
                      <div key={o.id} className="break-inside-avoid mb-4 md:mb-6 last:mb-0">
                        <PersonCard
                          id={o.id}
                          jmeno={o.jmeno}
                          img_thumbnail={o.img_thumbnail}
                          link={!!o.popis}
                          popis={o.popis}
                          imageHeight="xs"
                        />
                      </div>
                    )
                  )}
                </div>
              ) : (
                <div className="py-8">
                  <p className="text-gray-600 text-lg leading-relaxed m-0 max-w-2xl">
                    V následujících týdnech začneme představovat známé sportovce, kteří se zúčastní utkání osobností. Sledujte sociální sítě a webové stránky pro nejnovější informace.
                  </p>
                </div>
              )}
            </div>
          </div>
        </PageContainer>
      </div>
    </>
  );
}
