import Image from 'next/image';
import BackLink from '@/components/BackLink';
import { PageContainer, ExternalLinks } from '@/components/ui';

export const metadata = {
  title: 'Janička',
  description:
    'Janička – příjemkyně sbírky Veterán Cup Letohrad. Pomáháme nemocným dětem prostřednictvím charitativního hokejbalového turnaje.',
};

export default function OJaniccePage() {
  return (
    <PageContainer size="sm" className="pt-8 sm:pt-12 pb-8">
      <BackLink className="mb-4 block" />
      <h1 className="text-xl sm:text-2xl font-bold text-[var(--secondary)] mb-4 sm:mb-6">Janička</h1>
      <div className="relative h-56 sm:h-80 md:h-[500px] rounded-[var(--radius-lg)] overflow-hidden mb-6">
        <Image
          src="/image/janicka.jpg"
          alt="Janička"
          fill
          className="object-cover"
          style={{ objectPosition: '50% 15%' }}
        />
      </div>
      <ExternalLinks
        links={[
          { type: 'instagram', href: 'https://www.instagram.com/mala_kanada/', label: 'mala_kanada' },
          { type: 'facebook', href: 'https://www.facebook.com/profile.php?id=100088917845187', label: 'Malá Kanada' },
        ]}
      />
      <div className="prose prose-sm sm:prose-lg max-w-none text-[var(--foreground)] [&_a]:text-[var(--secondary)] [&_a]:underline overflow-x-hidden">
        <p>
          Jmenuji se Janička, jsou mi 4 roky a všichni mi říkají malá Kanada.
          Ve 3 letech byl Janičce diagnostikován autismus a těžká mentální
          retardace.
        </p>
        <p>
          Janičce je nutné dopomoci při každodenních činnostech. Neukousne tuhou
          stravu, zeleninu není schopná přijímat ani rozkousat, je velmi
          neobratná, nemluví a nosí plenky. Naše hlavní přání je, že bychom
          chtěli absolvovat intenzivní čtyřtýdenní neurosenzorické terapie ve
          Verheul centru v Ostravě. Základem terapie je Snoezelen koncept, který
          je zaměřen na celostní práci s dětmi a má velmi pozitivní reference.
        </p>
      </div>
    </PageContainer>
  );
}
