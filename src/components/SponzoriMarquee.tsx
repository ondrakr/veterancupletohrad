'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function SponzoriMarquee({
  items,
}: {
  items: { id: number; nazev: string; odkaz?: string }[];
}) {
  const [logoCacheBust] = useState(() => Date.now());
  if (!items.length) return null;

  const Wrapper = ({ item, children }: { item: { odkaz?: string }; children: React.ReactNode }) =>
    item.odkaz ? (
      <Link
        href={item.odkaz}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-shrink-0 h-20 w-32 flex items-center justify-center relative"
      >
        {children}
      </Link>
    ) : (
      <div className="flex-shrink-0 h-20 w-32 flex items-center justify-center relative">
        {children}
      </div>
    );

  return (
    <div className="overflow-hidden bg-white border border-gray-200 rounded-[var(--radius)] py-4 mb-4">
      <div className="flex animate-marquee gap-8">
        {[...items, ...items].map((item, i) => (
          <Wrapper key={`${item.id}-${i}`} item={item}>
            <Image
              src={`/api/sponzori/${item.id}/logo?t=${logoCacheBust}`}
              alt={item.nazev}
              fill
              className="object-contain"
              sizes="128px"
              unoptimized
            />
          </Wrapper>
        ))}
      </div>
    </div>
  );
}
