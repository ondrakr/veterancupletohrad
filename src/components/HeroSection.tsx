'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  FileText,
  Calendar,
  ImageIcon,
  Handshake,
  Video,
  Info,
  Heart,
  Menu,
  X,
  ChevronDown,
  Star,
} from 'lucide-react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import LogoMarquee from '@/components/LogoMarquee';

const iconProps = { className: 'w-5 h-5 shrink-0', strokeWidth: 1 };
const iconPropsActive = { className: 'w-6 h-6 shrink-0', strokeWidth: 1.25 };

const NAV_ITEMS = [
  { href: '/sbirka', label: 'SBÍRKA', icon: 'heart' },
  { href: '/novinky', label: 'NOVINKY', icon: 'document' },
  { href: '/#program', label: 'PROGRAM', icon: 'calendar' },
  { href: '/osobnosti', label: 'OSOBNOSTI', icon: 'star' },
  { href: '/galerie', label: 'GALERIE', icon: 'image' },
  { href: '/sponzori', label: 'SPONZOŘI', icon: 'handshake' },
  { href: '/pro-media', label: 'PRO MÉDIA', icon: 'media' },
  { href: '/o-nas', label: 'O NÁS', icon: 'info' },
];

function getIcon(icon: string, active: boolean) {
  const props = active ? iconPropsActive : iconProps;
  const map: Record<string, React.ReactNode> = {
    document: <FileText {...props} />,
    heart: <Heart {...props} />,
    calendar: <Calendar {...props} />,
    image: <ImageIcon {...props} />,
    handshake: <Handshake {...props} />,
    media: <Video {...props} />,
    info: <Info {...props} />,
    star: <Star {...props} />,
  };
  return map[icon];
}

function isActive(pathname: string, href: string, isProgramInView?: boolean): boolean {
  if (href === '/#program') return pathname === '/' && !!isProgramInView;
  const path = href.split('#')[0];
  return pathname === path || pathname.startsWith(path + '/');
}

type HeroSectionProps = {
  sponzori?: { id: number; nazev: string; odkaz?: string }[];
  banner?: { popis: string; odkaz: string } | null;
  logoCacheBust?: number;
};

const MENU_ANIM_DURATION = 300;

const HERO_IMAGES = [
  '/hero/hero.jpg',
  '/hero/IMG_9169_DxO.jpg',
  '/hero/Letohrad105of164.jpg',
  '/hero/Letohrad140of164.jpg',
];

export default function HeroSection({ sponzori = [], banner = null, logoCacheBust }: HeroSectionProps) {
  const pathname = usePathname();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [menuExpanded, setMenuExpanded] = useState(false);
  const [isProgramInView, setIsProgramInView] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isHomepage = pathname === '/';

  const closeMenu = () => {
    if (!menuOpen) return;
    setIsClosing(true);
    setMenuExpanded(false);
    closeTimeoutRef.current = setTimeout(() => {
      setMenuOpen(false);
      setIsClosing(false);
      closeTimeoutRef.current = null;
    }, MENU_ANIM_DURATION);
  };

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (menuOpen && !isClosing) {
      const t = requestAnimationFrame(() => requestAnimationFrame(() => setMenuExpanded(true)));
      return () => cancelAnimationFrame(t);
    } else {
      setMenuExpanded(false);
    }
  }, [menuOpen, isClosing]);

  useEffect(() => {
    if (pathname !== '/') return;
    const el = document.getElementById('program');
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => setIsProgramInView(e.isIntersecting),
      { threshold: 0.2, rootMargin: '-80px 0px 0px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [pathname]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col">
      {/* Horní oznámení – bílá lišta, zobrazí se jen pokud je vyplněn popis */}
      {banner && (
        <div className="bg-white py-2 flex-shrink-0 w-full">
          <div className="max-w-[var(--container-max)] mx-auto w-full px-4 sm:px-6 lg:px-[var(--container-px)] flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-center">
            <p className="text-xs sm:text-sm m-0 font-medium text-[#E30522]">
              <span className="font-bold">AKTUÁLNĚ</span>
              <span className="ml-2">{banner.popis}</span>
            </p>
            {banner.odkaz ? (
              <a
                href={banner.odkaz}
                target="_blank"
                rel="noopener noreferrer"
                className="banner-top-btn border border-[#E30522] bg-white px-3 py-1.5 rounded-full text-xs font-medium hover:bg-[#E30522] hover:text-white transition-colors shrink-0"
              >
                NAVŠTÍVIT
              </a>
            ) : null}
          </div>
        </div>
      )}

      {/* Hlavní header + hero – výška tak, aby byla sekce Sponzoři vidět bez scrollování */}
      <div className="relative flex-1 min-h-0 max-h-[calc(100vh-14rem)] flex flex-col overflow-hidden">
        {/* Rotující pozadí – 4 obrázky s plynulým přechodem */}
        <div className="absolute inset-0">
          {HERO_IMAGES.map((src, i) => (
            <div
              key={src}
              className="absolute inset-0 bg-cover bg-[center_top] bg-no-repeat transition-opacity duration-[2000ms] ease-in-out"
              style={{
                backgroundImage: `url(${src})`,
                opacity: currentImageIndex === i ? 1 : 0,
              }}
              aria-hidden
            />
          ))}
        </div>
        {/* Gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(4, 22, 42, 0.65) 100%),
              radial-gradient(50% 50% at 50% 50%, rgba(12, 38, 66, 0.49) 0%, rgba(9, 37, 67, 0.81) 100%)
            `,
          }}
        />
        {/* Navigační lišta – logo vlevo (jako v bílém headeru), menu, sociální sítě vpravo */}
        <div className="relative z-10 flex items-center justify-between py-3 flex-shrink-0">
          <div className="max-w-[var(--container-max)] mx-auto w-full px-4 sm:px-6 lg:px-[var(--container-px)] flex items-center justify-between gap-2 sm:gap-4">
            <Link href="/" className="flex-shrink-0 relative block -mb-8 sm:-mb-12 w-16 h-16 sm:w-20 sm:h-20 md:w-[100px] md:h-[100px]">
              <Image
                src="/img/logo_veterancup.png"
                alt="Veterán Cup Letohrad"
                width={100}
                height={100}
                className="object-contain"
              />
            </Link>
            <nav className="hidden lg:flex items-center gap-4 xl:gap-4 flex-1 ml-6">
              {NAV_ITEMS.map((item) => {
                const active = isActive(pathname, item.href, isProgramInView);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      if (item.href === '/#program' && isHomepage) {
                        e.preventDefault();
                        document.getElementById('program')?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className={`flex items-center gap-2 text-white [&_svg]:stroke-white rounded-full px-3 py-2 hover:bg-white/10 transition-colors ${active ? 'font-bold' : ''}`}
                  >
                    <span className="text-white [&_svg]:stroke-white">{getIcon(item.icon, active)}</span>
                    <span className={`text-sm text-white ${active ? 'font-bold' : 'font-medium'}`}>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Sociální sítě vpravo – bílé kolečko, modré ikonky */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="https://www.facebook.com/profile.php?id=100083317713509"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex items-center justify-center w-7 h-7 rounded-full bg-white border border-gray-200 text-[var(--secondary)] hover:opacity-80 transition-opacity"
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
                className="flex items-center justify-center w-7 h-7 rounded-full bg-white border border-gray-200 text-[var(--secondary)] hover:opacity-80 transition-opacity"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>

            <div className="lg:hidden relative flex items-center gap-2 ml-auto">
              <button
                onClick={() => (menuOpen ? closeMenu() : setMenuOpen(true))}
                className="flex items-center gap-2 text-white p-2"
                aria-label={menuOpen ? 'Zavřít' : 'Menu'}
              >
                {menuOpen ? (
                  <X className="w-6 h-6 text-white" strokeWidth={1} />
                ) : (
                  <Menu className="w-6 h-6 text-white" strokeWidth={1} />
                )}
                <span className="text-sm font-medium text-white">{menuOpen ? 'zavřít' : 'menu'}</span>
              </button>
              {(menuOpen || isClosing) &&
                typeof document !== 'undefined' &&
                createPortal(
                  <>
                    <div
                      onClick={closeMenu}
                      className={`fixed inset-0 z-[9998] bg-black/90 backdrop-blur-md transition-opacity duration-300 ${
                        isClosing ? 'opacity-0' : 'opacity-100'
                      }`}
                      aria-hidden
                    />
                    <div
                      className={`fixed left-0 right-0 top-0 z-[9999] bg-white shadow-lg overflow-hidden origin-top transition-all duration-300 ${
                        isClosing ? 'scale-y-0 opacity-0' : menuExpanded ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'
                      }`}
                    >
                      <div className="flex items-center justify-end px-4 py-3 border-b border-gray-200">
                        <button
                          onClick={closeMenu}
                          className="p-2 text-[var(--secondary)] hover:bg-gray-100 rounded-[var(--radius)]"
                          aria-label="Zavřít"
                        >
                          <X className="w-6 h-6" strokeWidth={1} />
                        </button>
                      </div>
                      <div className="max-w-[var(--container-max)] mx-auto px-[var(--container-px)] py-4 max-h-[calc(100vh-60px)] overflow-y-auto">
                    {NAV_ITEMS.map((item) => {
                      const active = isActive(pathname, item.href, isProgramInView);
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={(e) => {
                            if (item.href === '/#program' && isHomepage) {
                              e.preventDefault();
                              closeMenu();
                              setTimeout(() => document.getElementById('program')?.scrollIntoView({ behavior: 'smooth' }), 50);
                            } else {
                              setMenuOpen(false);
                            }
                          }}
                          className={`block px-4 py-3 text-[var(--secondary)] hover:bg-gray-100 rounded-[var(--radius)] ${active ? 'font-bold' : 'font-medium'}`}
                        >
                          {item.label}
                        </Link>
                      );
                    })}
                    <Link
                      href="/sbirka"
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-3 text-[var(--primary)] font-bold hover:bg-gray-100 rounded-[var(--radius)]"
                    >
                      CHCI PŘISPĚT
                    </Link>
                    <div className="flex gap-3 mt-4 pt-4 border-t border-gray-200">
                    <a
                      href="https://www.facebook.com/profile.php?id=100083317713509"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                      className="flex items-center justify-center w-7 h-7 rounded-full bg-white border border-gray-200 text-[var(--secondary)] hover:opacity-80 transition-opacity"
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
                      className="flex items-center justify-center w-7 h-7 rounded-full bg-white border border-gray-200 text-[var(--secondary)] hover:opacity-80 transition-opacity"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                    </div>
                      </div>
                    </div>
                  </>,
                  document.body
                )}
            </div>
          </div>
        </div>

        {/* Centrální obsah – nadpis a tlačítko */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-end text-center px-4 sm:px-6 pt-16 sm:pt-24 pb-12 sm:pb-16">
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white m-0 mb-2 sm:mb-3">
            VETERÁN CUP LETOHRAD 2026
          </h1>
          <p className="text-base sm:text-xl md:text-2xl text-white/95 m-0 mb-4 sm:mb-6">
            12. ročník hokejbalového charitativního turnaje
          </p>

          <Button
            href="/sbirka"
            variant="secondary"
            rounded="full"
            size="md"
            icon={<Heart className="w-5 h-5" strokeWidth={1} />}
            textColor="text-white"
            iconColor="text-white"
            className="mb-8"
          >
            CHCI PŘISPĚT
          </Button>

          {/* Scroll indikátor – animovaná šipka #9DC31A */}
          <a
            href="#obsah"
            className="transition-opacity hover:opacity-90 animate-bounce"
            aria-label="Posunout dolů"
          >
            <ChevronDown className="w-8 h-8 text-[#9DC31A]" strokeWidth={1} />
          </a>
        </div>
      </div>

      {/* Sekce sponzorů – jen z databáze */}
      {sponzori.length > 0 && (
        <div className="bg-white py-8 sm:py-10 flex-shrink-0">
          <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-[var(--container-px)]">
            <Link
              href="/sponzori"
              className="block mb-8 text-center font-bold text-[22px] leading-normal hover:underline cursor-pointer"
              style={{ color: '#134070' }}
            >
              SPONZOŘI
            </Link>
            <LogoMarquee items={sponzori} type="api" logoCacheBust={logoCacheBust} />
          </div>
        </div>
      )}
    </section>
  );
}
