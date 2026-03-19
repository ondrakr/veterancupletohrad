'use client';

import { usePathname } from 'next/navigation';

export default function MainWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHomepage = pathname === '/';
  const isAdmin = pathname?.startsWith('/admin');
  return (
    <main className={`flex-1 pb-8 overflow-x-hidden ${!isHomepage && !isAdmin ? 'pt-20 sm:pt-24' : ''}`}>
      {children}
    </main>
  );
}
