import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Kontakty',
  description:
    'Kontakt na organizátory Veterán Cup Letohrad – Martin Motyčka, SK Hokejbal Letohrad, Taušlova 867. Místo konání turnaje.',
};

export default function KontaktyPage() {
  redirect('/o-nas#kontakt');
}
