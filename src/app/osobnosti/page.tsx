import { getOsobnosti, getRokTymy } from '@/lib/data';
import { PersonCard, PageContainer } from '@/components/ui';
import CollapsibleSection from '@/components/CollapsibleSection';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Utkání osobností',
  description:
    'Známé sportovní osobnosti na charitativním turnaji Veterán Cup Letohrad. Seznam hráčů a hostů utkání osobností 2026.',
};

function RokContent({
  rok,
  teamsByRok,
  byRokTym,
}: {
  rok: number;
  teamsByRok: Record<number, Record<string, string>>;
  byRokTym: Record<string, { id: number; jmeno: string; img_thumbnail: string; popis: string | null }[]>;
}) {
  const teams = teamsByRok[rok] || {};
  return (
    <>
      {Object.entries(teams).map(([tymCode, tymName]) => {
        const items = byRokTym[`${rok}-${tymCode}`] || [];
        if (!items.length) return null;
        return (
          <div key={tymCode} className="mb-8 last:mb-0">
            <h3 className="text-lg font-bold text-[var(--secondary)] uppercase mb-4">{tymName}</h3>
            <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-4">
              {items.map((o) => (
                <div key={o.id} className="break-inside-avoid mb-4">
                  <PersonCard
                    id={o.id}
                    jmeno={o.jmeno}
                    img_thumbnail={o.img_thumbnail}
                    link={!!o.popis}
                    popis={o.popis}
                    imageHeight="sm"
                  />
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
}

export default async function OsobnostiPage() {
  const [allOsobnosti, rokTymy] = await Promise.all([
    getOsobnosti(),
    getRokTymy(),
  ]);

  const teamsByRok = rokTymy.reduce(
    (acc, rt) => {
      if (!acc[rt.rok]) acc[rt.rok] = {};
      acc[rt.rok][rt.tym_kod] = rt.nazev;
      return acc;
    },
    {} as Record<number, Record<string, string>>
  );

  const byRokTym = allOsobnosti.reduce(
    (acc, o) => {
      const key = `${o.rok}-${o.tym}`;
      if (!acc[key]) acc[key] = [];
      acc[key].push(o);
      return acc;
    },
    {} as Record<string, (typeof allOsobnosti)[0][]>
  );

  const hasRok = (rok: number) => {
    const teams = teamsByRok[rok] || {};
    return Object.keys(teams).some((tc) => (byRokTym[`${rok}-${tc}`] || []).length > 0);
  };

  return (
    <PageContainer size="lg" className="pt-12 pb-8 flex flex-col gap-12">
      <div>
        <h2 className="text-2xl font-bold text-[var(--secondary)] uppercase mb-6">
          Utkání osobností
        </h2>
      </div>

      {/* Ročník 2026 – vždy viditelný */}
      <section>
        <h2 className="text-xl font-bold text-[var(--secondary)] uppercase mb-6">
          Seznam osobností 2026
        </h2>
        {hasRok(26) ? (
          <RokContent rok={26} teamsByRok={teamsByRok} byRokTym={byRokTym} />
        ) : (
          <p className="text-gray-600 text-lg leading-relaxed m-0 max-w-2xl">
            V následujících týdnech začneme představovat známé sportovce, kteří se zúčastní utkání osobností. Sledujte sociální sítě a webové stránky pro nejnovější informace.
          </p>
        )}
      </section>

      {/* Ročníky 2025, 2024, 2023 – rozbalovací */}
      {hasRok(25) && (
        <CollapsibleSection title="Ročník 2025" defaultOpen={false}>
          <div className="pt-4">
            <RokContent rok={25} teamsByRok={teamsByRok} byRokTym={byRokTym} />
          </div>
        </CollapsibleSection>
      )}

      {hasRok(24) && (
        <CollapsibleSection title="Ročník 2024" defaultOpen={false}>
          <div className="pt-4">
            <RokContent rok={24} teamsByRok={teamsByRok} byRokTym={byRokTym} />
          </div>
        </CollapsibleSection>
      )}

      {hasRok(23) && (
        <CollapsibleSection title="Ročník 2023" defaultOpen={false}>
          <div className="pt-4">
            <RokContent rok={23} teamsByRok={teamsByRok} byRokTym={byRokTym} />
          </div>
        </CollapsibleSection>
      )}
    </PageContainer>
  );
}
