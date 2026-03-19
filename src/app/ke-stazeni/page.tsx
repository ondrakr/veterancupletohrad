import Image from 'next/image';
import Link from 'next/link';
import { Button, PageContainer, SectionHeader, TextLink } from '@/components/ui';

export const metadata = {
  title: 'Ke stažení',
  description:
    'Tiskové materiály a loga Veterán Cup Letohrad ke stažení. Logo PDF, PNG, SVG pro média a partnery.',
};

export default function KeStazeniPage() {
  return (
    <PageContainer size="lg" className="pt-8 sm:pt-12 pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <SectionHeader className="mb-0">Ke stažení</SectionHeader>
        <p className="text-[var(--foreground)]/80 text-sm m-0">
          Kompletní informace pro média{' '}
          <TextLink href="/pro-media">na stránce Pro média</TextLink>.
        </p>
      </div>
      <div className="flex flex-col items-center">
        <Image
          src="/stazeni/logo_veterancup.png"
          alt="Logo Veterán Cup"
          width={200}
          height={200}
          className="mb-6"
        />
        <div className="flex flex-wrap justify-center gap-3 sm:gap-6">
          <Button
            href="/stazeni/logo_veterancup.pdf"
            variant="primary"
            rounded="full"
            download
          >
            PDF
          </Button>
          <Button
            href="/stazeni/logo_veterancup.png"
            variant="primary"
            rounded="full"
            download
          >
            PNG
          </Button>
          <Button
            href="/stazeni/logo_veterancup.svg"
            variant="primary"
            rounded="full"
            download
          >
            SVG
          </Button>
        </div>
      </div>
    </PageContainer>
  );
}
