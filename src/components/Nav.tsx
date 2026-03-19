'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { href: '/novinky', label: 'Novinky' },
    { href: '/sbirka', label: 'Sbírka' },
    { href: '/sbirka', label: 'Chci přispět' },
    { href: '/osobnosti', label: 'Osobnosti' },
    { href: '/galerie#videa', label: 'Videa' },
    { href: '/galerie#fotogalerie', label: 'Fotogalerie' },
    { href: '/o-nas', label: 'O nás' },
    { href: '/sponzori', label: 'Sponzoři' },
    { href: '/pro-media', label: 'Pro média' },
  ];

  return (
    <nav
      id="navbar"
      className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-[var(--primary)] to-[var(--primary-dark)] border-b border-white/20 px-4 py-3 overflow-visible"
    >
      <div className="max-w-[var(--container-max)] mx-auto w-full px-4 sm:px-6 lg:px-[var(--container-px)] flex items-center justify-between gap-2 min-w-0">
        <Link href="/" className="flex items-center gap-2 sm:gap-4 shrink-0 min-w-0">
          <div className="relative flex-shrink-0">
            <Image
              src="/img/logo_veterancup.png"
              alt="Veterán Cup logo"
              width={scrolled ? 60 : 80}
              height={scrolled ? 60 : 80}
              className="block transition-all duration-300 w-12 h-12 sm:w-14 sm:h-14 md:w-[60px] md:h-[60px] lg:w-[80px] lg:h-[80px] object-contain"
            />
          </div>
          {!scrolled && (
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-wrap min-w-0">
              <h1 className="text-white text-lg sm:text-2xl md:text-4xl font-extrabold m-0 truncate">
                VETERÁN CUP LETOHRAD
              </h1>
              <p className="text-white text-sm sm:text-lg md:text-xl font-bold m-0 hidden sm:block">
                charitativní hokejbalový turnaj
              </p>
            </div>
          )}
        </Link>

        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 text-white cursor-pointer bg-transparent border-none py-2"
            aria-label="Menu"
          >
            <span className="text-xl font-medium">menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="28"
              viewBox="0 0 40 28"
              fill="none"
            >
              <path
                d="M3 25H37M3 14H37M3 3H37"
                stroke="white"
                strokeWidth="5"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <div
            className={`absolute right-0 mt-2 w-48 max-w-[calc(100vw-2rem)] bg-white rounded-[var(--radius)] border border-gray-200 overflow-hidden transition-all duration-300 ${
              menuOpen ? 'max-h-[min(24rem,70vh)] overflow-y-auto' : 'max-h-0'
            }`}
          >
            <div className="py-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block px-5 py-2 text-[#134070] font-semibold border-b border-[#134070] hover:bg-gray-100"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="flex justify-center gap-4 py-3 border-t">
              <a
                href="https://www.facebook.com/profile.php?id=100083317713509"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="36"
                  viewBox="0 0 20 36"
                  fill="#3A82C3"
                >
                  <path d="M5.72759 35.3775V20.0409H0.108093V13.6374H5.72759V7.81099C5.72759 7.81099 5.32949 -1.90749 19.1351 0.603418V6.05283H15.8493C15.8493 6.05283 12.8694 6.30375 12.7416 9.01608C12.6144 11.7284 12.7416 13.6368 12.7416 13.6368H18.9314L17.9636 20.0404H12.7422V35.3769C12.3091 35.4454 11.7954 35.5127 11.2152 35.5633C10.9011 35.591 10.2789 35.6382 9.48618 35.6468C8.7898 35.6543 8.20199 35.629 7.76595 35.6008C7.31473 35.5714 6.92247 35.5328 6.6061 35.4966" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/veterancupletohrad/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#D12055"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
