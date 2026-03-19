import Link from 'next/link';
import Image from 'next/image';

const QUICK_LINKS = [
  { href: '/novinky', label: 'Novinky' },
  { href: '/sbirka', label: 'Sbírka' },
  { href: '/osobnosti', label: 'Osobnosti' },
  { href: '/sponzori', label: 'Sponzoři' },
  { href: '/o-nas', label: 'O nás' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-[var(--secondary)] text-white overflow-x-hidden">
      {/* Horní část – hlavní obsah */}
      <div className="relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--accent)]" />
        <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-[var(--container-px)] pt-12 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
            {/* Logo + tagline */}
            <div className="lg:col-span-1 flex flex-col items-center md:items-start">
              <Link href="/" className="block">
                <Image
                  src="/img/logo_veterancup.png"
                  alt="Veterán Cup Letohrad"
                  width={100}
                  height={100}
                  className="w-20 h-20 md:w-24 md:h-24 object-contain"
                />
              </Link>
              <p className="mt-3 text-white/80 text-sm max-w-[200px] text-center md:text-left">
                Charitativní hokejbalový turnaj
              </p>
            </div>

            {/* Rychlé odkazy */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--accent)] mb-4">
                Rychlé odkazy
              </h3>
              <ul className="space-y-2">
                {QUICK_LINKS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-white/90 hover:text-[var(--accent)] transition-colors text-sm"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Kontakt */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--accent)] mb-4">
                Kontakt
              </h3>
              <div className="space-y-3 text-sm">
                <p className="font-semibold text-white">Martin Motyčka</p>
                <p>
                  <a
                    href="tel:+420777152999"
                    className="text-white/90 hover:text-[var(--accent)] transition-colors"
                  >
                    +420 777 152 999
                  </a>
                </p>
                <p>
                  <a
                    href="mailto:motycka.hokejbal@tiscali.cz"
                    className="text-white/90 hover:text-[var(--accent)] transition-colors break-all"
                  >
                    motycka.hokejbal@tiscali.cz
                  </a>
                </p>
              </div>
            </div>

            {/* Místo konání + sociální sítě */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--accent)] mb-4">
                Místo konání
              </h3>
              <div className="space-y-2 text-sm mb-6">
                <p>
                  <a
                    href="https://www.hokejbal-letohrad.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/90 hover:text-[var(--accent)] transition-colors"
                  >
                    SK Hokejbal Letohrad
                  </a>
                </p>
                <p>
                  <a
                    href="https://maps.app.goo.gl/ppHWPYCNotgcgQBF6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/90 hover:text-[var(--accent)] transition-colors"
                  >
                    Taušlova 867, 561 51 Letohrad
                  </a>
                </p>
              </div>
              <div className="flex gap-3">
                <a
                  href="https://www.facebook.com/profile.php?id=100083317713509"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white hover:bg-[var(--accent)] hover:text-[var(--secondary)] transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 36" fill="currentColor">
                    <path d="M5.72759 35.3775V20.0409H0.108093V13.6374H5.72759V7.81099C5.72759 7.81099 5.32949 -1.90749 19.1351 0.603418V6.05283H15.8493C15.8493 6.05283 12.8694 6.30375 12.7416 9.01608C12.6144 11.7284 12.7416 13.6368 12.7416 13.6368H18.9314L17.9636 20.0404H12.7422V35.3769C12.3091 35.4454 11.7954 35.5127 11.2152 35.5633C10.9011 35.591 10.2789 35.6382 9.48618 35.6468C8.7898 35.6543 8.20199 35.629 7.76595 35.6008C7.31473 35.5714 6.92247 35.5328 6.6061 35.4966" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/veterancupletohrad/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white hover:bg-[var(--accent)] hover:text-[var(--secondary)] transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spodní lišta */}
      <div className="border-t border-white/15 bg-[var(--secondary-dark)]">
        <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-[var(--container-px)] py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white/70">
            <p>© {year} Veterán Cup Letohrad</p>
            <p>
              <Link
                href="/admin"
                target="_blank"
                className="hover:text-[var(--accent)] transition-colors"
              >
                Ondřej Krejčí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
