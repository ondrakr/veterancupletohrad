import Image from 'next/image';
import Link from 'next/link';
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Heart,
  FileText,
  Download,
  Mail,
  Phone,
  ImageIcon,
  Video,
  ExternalLink,
} from 'lucide-react';
import { getCastka, getClanky, getCastkaForYear } from '@/lib/data';
import {
  PageContainer,
  SectionHeader,
  Button,
  Card,
  TextLink,
} from '@/components/ui';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Pro média',
  description:
    'Informace pro novináře a média – tiskové materiály, kontakty, program a fakta o charitativním hokejbalovém turnaji Veterán Cup Letohrad.',
};

const BENEFICIARIES = [
  { href: '/o-neratovu', label: 'Základní škola speciální Neratov' },
  { href: '/o-janicce', label: 'Janička "Kanada"' },
  { href: '/o-viktorce', label: 'Viktorka Čejková' },
  { href: '/o-klubu', label: 'Klub nemocných cystickou fibrózou' },
];

const PROGRAM = [
  {
    time: '9:30',
    title: 'Turnaj veteránů',
    desc: 'Turnaj bývalých hokejbalových hráčů, kterého se účastní čtyři týmy. Hraje se systémem každý s každým, přičemž jednotlivá utkání mají formát 2×10 minut. Zápasy se hrají s tenisovým míčkem, stejně jako tomu bylo v dřívějších dobách hokejbalu.',
  },
  {
    time: '15:20',
    title: 'Diskuze Davida Nyče',
    sub: 'Utkání dětí ZSŠ Neratov a SK Hokejbal Letohrad',
    desc: 'Součástí programu bude diskuze moderovaná komentátorem a reportérem Oneplay Sport Davidem Nyčem, který vyzpovídá vybrané sportovce. Současně si na jedné straně hřiště zahrají děti ze Základní školy speciální Neratov a na té druhé nejmladší hráči SK Hokejbal Letohrad. ',
  },
  {
    time: '16:00',
    title: 'Utkání osobností',
    desc: 'Benefiční utkání, kterého se účastní znamé osobnosti. Zápas si v minulosti zahráli hokejisté NHL i extraligy, olympijští vítězové v biatlonu nebo reprezentantky české hokejové reprezentace žen.',
  },
  {
    time: '18:00',
    title: 'Předání šeku',
    desc: 'Slavnostní předání výtěžku veřejné sbírky zástupcům, kterým se pomáhá – ZSŠ Neratov, Janička, Viktorka, Klub nemocných cystickou fibrózou.',
  },
];

function formatDatum(d: string | Date | null | undefined): string {
  if (!d) return '';
  const date = typeof d === 'string' ? new Date(d) : d;
  return date.toLocaleDateString('cs-CZ', { day: 'numeric', month: 'numeric', year: 'numeric' });
}

const VYSLEDKY_ZNAME: Record<number, number> = {
  2025: 563_687,
  2024: 510_015,
  2023: 391_000,
};

const LOGO_DOWNLOADS = [
  { href: '/stazeni/logo_veterancup.pdf', label: 'Logo PDF' },
  { href: '/stazeni/logo_veterancup.png', label: 'Logo PNG' },
  { href: '/stazeni/logo_veterancup.svg', label: 'Logo SVG' },
];

export default async function ProMediaPage() {
  const [castka2026, clanky, castka2019, castka2018] = await Promise.all([
    getCastka(),
    getClanky(5),
    getCastkaForYear(2019),
    getCastkaForYear(2018),
  ]);
  const formatCastka = (n: number) => new Intl.NumberFormat('cs-CZ').format(n);

  return (
    <PageContainer size="lg" className="pt-8 sm:pt-12 pb-12 sm:pb-16 flex flex-col gap-10 sm:gap-14">
      {/* Úvodní hero */}
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--secondary)] uppercase m-0 mb-2">
          Informace pro média
        </h1>
        <p className="text-lg text-[var(--foreground)]/80 m-0">
          Charitativní hokejbalový turnaj Veterán Cup Letohrad – 12. ročník
        </p>
      </div>

      {/* Základní informace – přehledová karta */}
      <Card padding="lg" hover={false}>
        <h2 className="text-xl font-bold uppercase text-[var(--secondary)] mb-6 m-0">
          Základní informace
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex gap-3">
            <Calendar className="w-6 h-6 shrink-0 text-[var(--primary)]" strokeWidth={1.5} />
            <div>
              <p className="text-xs font-medium text-[var(--secondary)] uppercase tracking-wider m-0 mb-1">
                Datum
              </p>
              <p className="font-semibold m-0">20. června 2026</p>
            </div>
          </div>
          <div className="flex gap-3">
            <MapPin className="w-6 h-6 shrink-0 text-[var(--primary)]" strokeWidth={1.5} />
            <div>
              <p className="text-xs font-medium text-[var(--secondary)] uppercase tracking-wider m-0 mb-1">
                Místo
              </p>
              <p className="font-semibold m-0">Letohrad</p>
              <TextLink href="https://www.hokejbal-letohrad.com/" external className="text-sm">
                SK Hokejbal Letohrad
              </TextLink>
              <br />
              <TextLink href="https://maps.app.goo.gl/ppHWPYCNotgcgQBF6" external className="text-sm">
                Taušlova 867, 561 51 Letohrad
              </TextLink>
            </div>
          </div>
          <div className="flex gap-3">
            <Clock className="w-6 h-6 shrink-0 text-[var(--primary)]" strokeWidth={1.5} />
            <div>
              <p className="text-xs font-medium text-[var(--secondary)] uppercase tracking-wider m-0 mb-1">
                Začátek
              </p>
              <p className="font-semibold m-0">9:30</p>
              <p className="text-sm text-[var(--foreground)]/70 m-0">turnaj veteránů</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Users className="w-6 h-6 shrink-0 text-[var(--primary)]" strokeWidth={1.5} />
            <div>
              <p className="text-xs font-medium text-[var(--secondary)] uppercase tracking-wider m-0 mb-1">
                Typ akce
              </p>
              <p className="font-semibold m-0">Charitativní hokejbalový turnaj</p>
              <p className="text-sm text-[var(--foreground)]/70 m-0">veteráni + utkání osobností</p>
            </div>
          </div>
        </div>
      </Card>

      {/* O akci */}
      <section>
        <SectionHeader className="mb-4">O akci</SectionHeader>
        <div className="prose prose-lg max-w-none text-[var(--foreground)]">
          <p>
          Veterán Cup Letohrad je tradiční charitativní hokejbalový turnaj, který se každoročně koná na konci června na hokejbalovém hřišti v Letohradě. Akce spojuje sportovní zážitky s pomocí těm, kteří ji nejvíce potřebují – součástí celého dne je veřejná sbírka, jejíž výtěžek putuje na podporu nemocných dětí.

Program začíná turnajem veteránů, při kterém se na hřišti setkávají bývalí hokejbaloví hráči a připomínají si atmosféru svých aktivních let. Vrcholem celé akce je utkání osobností, v němž nastupují známá jména českého sportu – od hokejistů až po biatlonisty a další významné sportovce.

Nedílnou součástí Veterán Cupu jsou také charitativní aukce sportovních předmětů, které probíhají po celý rok. Fanoušci tak mají jedinečnou možnost vydražit si například podepsané hokejky, rukavice, kopačky či další sportovní vybavení a zároveň přispět na dobrou věc.
          </p>
        </div>
      </section>

      {/* Charitativní cíl */}
      <section>
        <SectionHeader className="mb-4">
          <span className="flex items-center gap-2">
            <Heart className="w-6 h-6" strokeWidth={1.5} />
            Komu pomáháme
          </span>
        </SectionHeader>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BENEFICIARIES.map((item) => (
            <Card key={item.href} href={item.href} as="link" padding="md">
              <p className="font-semibold text-[var(--secondary)] m-0">{item.label}</p>
              <span className="text-sm text-[var(--foreground)]/70">Více informací →</span>
            </Card>
          ))}
        </div>
      </section>

      {/* Výsledky sbírek */}
      <section>
        <SectionHeader className="mb-4">Výsledky sbírek</SectionHeader>
        <div className="bg-white rounded-[var(--radius-lg)] border border-gray-200 overflow-hidden">
          <ul className="divide-y divide-gray-200">
            <li className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-4 md:p-5 bg-[var(--secondary)]/5">
              <div>
                <p className="font-semibold m-0">2026</p>
                <p className="text-sm text-[var(--foreground)]/70 m-0">(probíhá)</p>
              </div>
              <p className="text-xl font-bold text-[var(--secondary)] m-0">{formatCastka(castka2026)} Kč</p>
            </li>
            <li className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-4 md:p-5">
              <p className="font-semibold m-0">2025</p>
              <p className="text-xl font-bold m-0">{formatCastka(VYSLEDKY_ZNAME[2025])} Kč</p>
            </li>
            <li className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-4 md:p-5">
              <p className="font-semibold m-0">2024</p>
              <p className="text-xl font-bold m-0">{formatCastka(VYSLEDKY_ZNAME[2024])} Kč</p>
            </li>
            <li className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-4 md:p-5">
              <p className="font-semibold m-0">2023</p>
              <p className="text-xl font-bold m-0">{formatCastka(VYSLEDKY_ZNAME[2023])} Kč</p>
            </li>
            <li className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-4 md:p-5">
              <p className="font-semibold m-0">2019</p>
              <p className="text-xl font-bold m-0">
                {(VYSLEDKY_ZNAME[2019] ?? castka2019) > 0
                  ? `${formatCastka(VYSLEDKY_ZNAME[2019] ?? castka2019)} Kč`
                  : '—'}
              </p>
            </li>
            <li className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-4 md:p-5">
              <p className="font-semibold m-0">2018</p>
              <p className="text-xl font-bold m-0">
                {(VYSLEDKY_ZNAME[2018] ?? castka2018) > 0
                  ? `${formatCastka(VYSLEDKY_ZNAME[2018] ?? castka2018)} Kč`
                  : '—'}
              </p>
            </li>
          </ul>
        </div>
      </section>

      {/* Program dne */}
      <section>
        <SectionHeader className="mb-4">Program dne</SectionHeader>
        <div className="bg-white rounded-[var(--radius-lg)] border border-gray-200 overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {PROGRAM.map((item) => (
              <li key={item.time} className="flex gap-4 p-4 md:p-5">
                <span className="shrink-0 inline-flex items-center justify-center min-w-[4rem] h-8 px-2 rounded-[var(--radius)] bg-[var(--secondary)] text-white text-sm font-semibold">
                  {item.time}
                </span>
                <div className="min-w-0">
                  <p className="font-semibold m-0">{item.title}</p>
                  {item.sub && (
                    <p className="text-sm text-[var(--foreground)]/70 m-0 mt-0.5">{item.sub}</p>
                  )}
                  {item.desc && (
                    <p className="text-sm text-[var(--foreground)]/80 m-0 mt-2">{item.desc}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Kontakt pro média */}
      <section>
        <SectionHeader className="mb-4">Kontakt pro média</SectionHeader>
        <Card padding="lg" hover={false}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            <div>
              <p className="font-bold text-[var(--secondary)] m-0 mb-1">Tiskový kontakt</p>
              <p className="m-0">Martin Motyčka – hlavní organizátor</p>
            </div>
            <div className="flex gap-3">
              <div className="shrink-0 w-10 h-10 rounded-full bg-[var(--secondary)]/10 flex items-center justify-center">
                <Phone className="w-5 h-5 text-[var(--secondary)]" strokeWidth={1.5} />
              </div>
              <div>
                <p className="font-bold text-[var(--secondary)] m-0 mb-1">Telefon</p>
                <TextLink href="tel:+420777152999">+420 777 152 999</TextLink>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="shrink-0 w-10 h-10 rounded-full bg-[var(--secondary)]/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-[var(--secondary)]" strokeWidth={1.5} />
              </div>
              <div>
                <p className="font-bold text-[var(--secondary)] m-0 mb-1">Email</p>
                <TextLink href="mailto:motycka.hokejbal@tiscali.cz">
                  motycka.hokejbal@tiscali.cz
                </TextLink>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Ke stažení */}
      <section>
        <SectionHeader className="mb-4">
          <span className="flex items-center gap-2">
            <Download className="w-6 h-6" strokeWidth={1.5} />
            Ke stažení
          </span>
        </SectionHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-bold text-[var(--secondary)] uppercase mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5" strokeWidth={1.5} />
              Logo a grafické materiály
            </h3>
            <div className="flex flex-wrap gap-3">
              {LOGO_DOWNLOADS.map((item) => (
                <Button
                  key={item.href}
                  href={item.href}
                  variant="outline"
                  download
                  icon={<Download className="w-4 h-4" strokeWidth={1.5} />}
                >
                  {item.label}
                </Button>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-3">
              <Image
                src="/stazeni/logo_veterancup.png"
                alt="Logo Veterán Cup"
                width={120}
                height={120}
                className="rounded-[var(--radius)] border border-gray-200"
              />
              <p className="text-sm text-[var(--foreground)]/70 m-0">
                Logo je k dispozici ve formátech PDF (vektor), PNG a SVG pro tisk i web.
              </p>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-[var(--secondary)] uppercase mb-3 flex items-center gap-2">
              <ImageIcon className="w-5 h-5" strokeWidth={1.5} />
              Fotografie a videa
            </h3>
            <div className="flex flex-col gap-3">
              <Button
                href="/galerie#fotogalerie"
                variant="outline"
                icon={<ImageIcon className="w-4 h-4" strokeWidth={1.5} />}
              >
                Fotogalerie
              </Button>
              <Button
                href="/galerie#videa"
                variant="outline"
                icon={<Video className="w-4 h-4" strokeWidth={1.5} />}
              >
                Videa
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Tiskové zprávy / Novinky */}
      <section>
        <SectionHeader href="/novinky" className="mb-4">
          Tiskové zprávy a novinky
        </SectionHeader>
        <div className="space-y-3">
          {clanky.map(
            (c: { id: number; nadpis: string; datum?: string }) => (
              <Link
                key={c.id}
                href={`/clanek/${c.id}`}
                className="flex items-center justify-between gap-4 p-4 bg-white rounded-[var(--radius-lg)] border border-gray-200 hover:border-gray-300 transition-colors group"
              >
                <div>
                  <p className="font-semibold m-0 group-hover:text-[var(--secondary)]">
                    {c.nadpis}
                  </p>
                  {c.datum && (
                    <p className="text-sm text-[var(--foreground)]/60 m-0 mt-1">{formatDatum(c.datum)}</p>
                  )}
                </div>
                <ExternalLink className="w-5 h-5 shrink-0 text-[var(--secondary)] opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            )
          )}
        </div>
        <div className="mt-4">
          <Button href="/novinky" variant="outline">
            Všechny články
          </Button>
        </div>
      </section>

      {/* Partneři a sponzoři */}
      <section>
        <SectionHeader href="/sponzori" className="mb-4">
          Partneři a sponzoři
        </SectionHeader>
        <p className="text-[var(--foreground)]/80 mb-4">
          Veterán Cup Letohrad podporují významné hokejové kluby a regionální partneři.
          Kompletní přehled najdete na stránce Sponzoři.
        </p>
        <Button href="/sponzori" variant="secondary" textColor="text-white" iconColor="text-white">
          Zobrazit partnery a sponzory
        </Button>
      </section>

      {/* Rychlé odkazy */}
      <section className="border-t border-gray-200 pt-8">
        <h2 className="text-lg font-bold uppercase text-[var(--secondary)] mb-4 m-0">
          Rychlé odkazy
        </h2>
        <div className="flex flex-wrap gap-3">
          <Button href="/" variant="ghost" size="sm">
            Úvodní stránka
          </Button>
          <Button href="/sbirka" variant="ghost" size="sm">
            Veřejná sbírka
          </Button>
          <Button href="/osobnosti" variant="ghost" size="sm">
            Osobnosti
          </Button>
          <Button href="/o-nas" variant="ghost" size="sm">
            O nás
          </Button>
        </div>
      </section>
    </PageContainer>
  );
}
