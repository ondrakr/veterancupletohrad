import type { Metadata, Viewport } from 'next';
import './globals.css';
import ConditionalHeader from '@/components/ConditionalHeader';
import Footer from '@/components/Footer';
import MainWrapper from '@/components/MainWrapper';
import { config } from '@/lib/config';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#134070',
};

const siteUrl = config.site.url;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Veterán Cup Letohrad',
    template: '%s | Veterán Cup Letohrad',
  },
  description:
    'Veterán Cup Letohrad je charitativní hokejbalový turnaj. 20. června 2026 v Letohradě. Pomáháme ZSŠ Neratov, Janičce, Viktorce a Klubu nemocných cystickou fibrózou. Přispějte na dobrou věc.',
  keywords: [
    'Veterán Cup',
    'Letohrad',
    'hokejbal',
    'charitativní turnaj',
    'cystická fibróza',
    'ZSŠ Neratov',
    'sbírka',
    'Pardubický kraj',
  ],
  authors: [{ name: 'Veterán Cup Letohrad', url: siteUrl }],
  creator: 'Veterán Cup Letohrad',
  openGraph: {
    type: 'website',
    locale: 'cs_CZ',
    url: siteUrl,
    siteName: 'Veterán Cup Letohrad',
    title: 'Veterán Cup Letohrad | Charitativní hokejbalový turnaj',
    description:
      'Charitativní hokejbalový turnaj 20. června 2026 v Letohradě. Pomáháme nemocným dětem – ZSŠ Neratov, Janička, Viktorka, Klub CF.',
    images: ['/img/logo_veterancup.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Veterán Cup Letohrad | Charitativní hokejbalový turnaj',
    description: 'Charitativní hokejbalový turnaj 20. června 2026 v Letohradě.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  verification: {
    google: 'usO1AeB36bt7E7qAMCIKzCKXa0kxoQYs7DfhPvdm1QU',
  },
  /** Ikony z public/favicon/ (soubory musí sedět s názvy níže). */
  icons: {
    icon: [
      { url: '/favicon/favicon.ico', sizes: '48x48' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: '/favicon/site.webmanifest',
  alternates: {
    canonical: siteUrl,
  },
  category: 'sports',
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Veterán Cup Letohrad',
  url: siteUrl,
  logo: `${siteUrl}/img/logo_veterancup.png`,
  description: 'Charitativní hokejbalový turnaj v Letohradě. Pomáháme ZSŠ Neratov, Janičce, Viktorce a Klubu nemocných cystickou fibrózou.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Taušlova 867',
    addressLocality: 'Letohrad',
    postalCode: '561 51',
    addressCountry: 'CZ',
  },
  sameAs: ['https://www.instagram.com/veterancupletohrad/'],
};

const eventJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'Veterán Cup Letohrad 2026',
  description: 'Charitativní hokejbalový turnaj – turnaj veteránů, utkání osobností, beseda Davida Nyče, předání šeku. Veřejná sbírka pro nemocné děti.',
  startDate: '2026-06-20T09:30:00+02:00',
  endDate: '2026-06-20T19:00:00+02:00',
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  location: {
    '@type': 'Place',
    name: 'SK Hokejbal Letohrad',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Taušlova 867',
      addressLocality: 'Letohrad',
      postalCode: '561 51',
      addressCountry: 'CZ',
    },
  },
  organizer: {
    '@type': 'Organization',
    name: 'Veterán Cup Letohrad',
    url: siteUrl,
  },
  image: `${siteUrl}/img/logo_veterancup.png`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs" className="overflow-x-hidden">
      <body className="antialiased overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(eventJsonLd),
          }}
        />
        <ConditionalHeader />
        <MainWrapper>{children}</MainWrapper>
        <Footer />
      </body>
    </html>
  );
}
