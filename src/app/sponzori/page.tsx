import { getSponzori } from '@/lib/data';
import { getLogosFromFolder } from '@/lib/logos';
import { LogoItem, PageContainer, SectionHeader } from '@/components/ui';
import CollapsibleSection from '@/components/CollapsibleSection';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Sponzoři',
  description:
    'Partneři a sponzoři charitativního hokejbalového turnaje Veterán Cup Letohrad. HC Dynamo, Slavia, Plzeň, Energie a další podporují dobrou věc.',
};

const MEDIALNI_PARTNERI = [
  { href: 'https://www.oiktv.cz/', img: '/sponzori-2025/oik.png', alt: 'OIK TV' },
];

export default async function SponzoriPage() {
  const partneri2025 = getLogosFromFolder('partneri-2025');
  const sponzori2025 = getLogosFromFolder('sponzori-2025');
  // 2024 a 2023: složka sponzori (podle sponzori.php – sponzori-2024/2023 neexistují, používá se sponzori)
  const sponzori2024 = getLogosFromFolder('sponzori-2024').length > 0
    ? getLogosFromFolder('sponzori-2024')
    : getLogosFromFolder('sponzori');
  const sponzori2023 = getLogosFromFolder('sponzori-2023').length > 0
    ? getLogosFromFolder('sponzori-2023')
    : getLogosFromFolder('sponzori');

  let partneriDb: Awaited<ReturnType<typeof getSponzori>> = [];
  let sponzoriDb: Awaited<ReturnType<typeof getSponzori>> = [];
  try {
    [partneriDb, sponzoriDb] = await Promise.all([
      getSponzori('partner'),
      getSponzori('sponzor'),
    ]);
  } catch {
    // Databáze nedostupná – zobrazíme jen loga ze složek
  }

  const logoCacheBust = Date.now();

  return (
    <PageContainer size="lg" className="pt-8 sm:pt-12 pb-8 flex flex-col gap-8 sm:gap-12">
      <section>
        <SectionHeader>Mediální partneři</SectionHeader>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {MEDIALNI_PARTNERI.map((item) => (
            <LogoItem
              key={item.alt}
              src={item.img}
              alt={item.alt}
              href={item.href}
            />
          ))}
        </div>
      </section>

      {partneriDb.length > 0 && (
        <section>
          <SectionHeader>Partneři</SectionHeader>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {partneriDb.map((item) => (
              <LogoItem
                key={item.id}
                alt={item.nazev}
                href={item.odkaz}
                apiLogo={{ id: item.id }}
                logoCacheBust={logoCacheBust}
              />
            ))}
          </div>
        </section>
      )}

      {sponzoriDb.length > 0 && (
        <section>
          <SectionHeader>Sponzoři</SectionHeader>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {sponzoriDb.map((item) => (
              <LogoItem
                key={item.id}
                alt={item.nazev}
                href={item.odkaz}
                apiLogo={{ id: item.id }}
                logoCacheBust={logoCacheBust}
              />
            ))}
          </div>
        </section>
      )}

      <CollapsibleSection title="Ročník 2025" defaultOpen={false}>
        <div className="flex flex-col gap-8">
          <div className="pt-4">
            <h3 className="text-base font-bold text-[var(--secondary)] uppercase mb-4">Mediální partneři</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {MEDIALNI_PARTNERI.map((item) => (
                <LogoItem key={item.alt} src={item.img} alt={item.alt} href={item.href} />
              ))}
            </div>
          </div>
          {partneri2025.length > 0 && (
            <div>
              <h3 className="text-base font-bold text-[var(--secondary)] uppercase mb-4">Partneři</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {partneri2025.map((item) => (
                  <LogoItem key={item.src} src={item.src} alt={item.alt} />
                ))}
              </div>
            </div>
          )}
          {sponzori2025.length > 0 && (
            <div>
              <h3 className="text-base font-bold text-[var(--secondary)] uppercase mb-4">Sponzoři</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {sponzori2025.map((item) => (
                  <LogoItem key={item.src} src={item.src} alt={item.alt} />
                ))}
              </div>
            </div>
          )}
        </div>
      </CollapsibleSection>

      {sponzori2024.length > 0 && (
        <CollapsibleSection title="Ročník 2024" defaultOpen={false}>
          <div className="pt-4">
            <h3 className="text-base font-bold text-[var(--secondary)] uppercase mb-4">Sponzoři</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {sponzori2024.map((item) => (
                <LogoItem key={item.src} src={item.src} alt={item.alt} />
              ))}
            </div>
          </div>
        </CollapsibleSection>
      )}

      {sponzori2023.length > 0 && (
        <CollapsibleSection title="Ročník 2023" defaultOpen={false}>
          <div className="pt-4">
            <h3 className="text-base font-bold text-[var(--secondary)] uppercase mb-4">Sponzoři</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {sponzori2023.map((item) => (
                <LogoItem key={item.src} src={item.src} alt={item.alt} />
              ))}
            </div>
          </div>
        </CollapsibleSection>
      )}
    </PageContainer>
  );
}
