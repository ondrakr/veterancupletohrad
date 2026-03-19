import { Heart, MapPin, Phone, Mail, User, ExternalLink } from 'lucide-react';
import {
  PageContainer,
  SectionHeader,
  Card,
  BeneficiaryCard,
  TextLink,
  Button,
} from '@/components/ui';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'O Veterán Cupu',
  description:
    'Charitativní hokejbalový turnaj Veterán Cup Letohrad – komu pomáháme, výsledky sbírek, utkání osobností. Kontakty na organizátory. Tradiční akce v Letohradě.',
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

export default function ONasPage() {
  return (
    <PageContainer size="lg" className="pt-8 sm:pt-12 pb-12 sm:pb-16 flex flex-col gap-10 sm:gap-14">
      {/* Úvod */}
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--secondary)] uppercase m-0">
          O Veterán Cupu
        </h1>
      </div>

      {/* O akci */}
      <Card padding="lg" hover={false}>
        <div className="prose prose-lg max-w-none text-[var(--foreground)]">
          <p>
            Veterán Cup Letohrad je tradiční charitativní hokejbalový turnaj, který se každoročně koná na konci června na hokejbalovém hřišti v Letohradě. Akce spojuje sportovní zážitky s pomocí těm, kteří ji nejvíce potřebují – součástí celého dne je veřejná sbírka, jejíž výtěžek putuje na podporu nemocných dětí.
          </p>
          <p>
            Program začíná turnajem veteránů, při kterém se na hřišti setkávají bývalí hokejbaloví hráči a připomínají si atmosféru svých aktivních let. Vrcholem celé akce je utkání osobností, v němž nastupují známá jména českého sportu – od hokejistů až po biatlonisty a další významné sportovce.
          </p>
          <p>
            Nedílnou součástí Veterán Cupu jsou také charitativní aukce sportovních předmětů, které probíhají po celý rok. Fanoušci tak mají jedinečnou možnost vydražit si například podepsané hokejky, rukavice, kopačky či další sportovní vybavení a zároveň přispět na dobrou věc.
          </p>
        </div>
      </Card>

      {/* Komu pomáháme */}
      <section>
        <SectionHeader className="mb-6">
          <span className="flex items-center gap-2">
            <Heart className="w-6 h-6" strokeWidth={1.5} />
            Komu pomáháme
          </span>
        </SectionHeader>
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
      </section>

      {/* Kontakty */}
      <section id="kontakt">
        <SectionHeader className="mb-4">Kontakty</SectionHeader>
        <Card padding="lg" hover={false}>
          <h2 className="text-xl font-bold uppercase text-[var(--secondary)] mb-6 m-0">
            Kontaktní údaje
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex gap-3">
              <div className="shrink-0 w-10 h-10 rounded-full bg-[var(--secondary)]/10 flex items-center justify-center">
                <User className="w-5 h-5 text-[var(--secondary)]" strokeWidth={1.5} />
              </div>
              <div>
                <p className="font-bold text-[var(--secondary)] m-0 mb-1">Hlavní organizátor</p>
                <p className="m-0">Martin Motyčka</p>
              </div>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-6">
          <Card padding="lg" hover={false}>
            <div className="flex gap-3">
              <div className="shrink-0 w-10 h-10 rounded-full bg-[var(--secondary)]/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-[var(--secondary)]" strokeWidth={1.5} />
              </div>
              <div>
                <p className="font-bold text-[var(--secondary)] m-0 mb-2">SK Hokejbal Letohrad</p>
                <p className="m-0">Taušlova 867</p>
                <p className="m-0">561 51 Letohrad</p>
                <div className="flex flex-wrap gap-3 mt-4">
                  <Button
                    href="https://www.hokejbal-letohrad.com/"
                    variant="outline"
                    size="sm"
                    icon={<ExternalLink className="w-4 h-4" strokeWidth={1.5} />}
                  >
                    Web klubu
                  </Button>
                  <Button
                    href="https://maps.app.goo.gl/ppHWPYCNotgcgQBF6"
                    variant="outline"
                    size="sm"
                    icon={<MapPin className="w-4 h-4" strokeWidth={1.5} />}
                  >
                    Otevřít v Mapách
                  </Button>
                </div>
              </div>
            </div>
          </Card>
          <div className="rounded-[var(--radius-lg)] overflow-hidden border border-gray-200 aspect-[4/3] min-h-[220px] sm:min-h-[280px]">
            <iframe
              src="https://www.google.com/maps?q=Tau%C5%A1lova+867,+561+51+Letohrad&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa – SK Hokejbal Letohrad, Taušlova 867"
              className="block w-full h-full min-h-[280px]"
            />
          </div>
        </div>
      </section>
    </PageContainer>
  );
}
