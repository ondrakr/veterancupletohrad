'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getRandomFallbackPhoto } from '@/lib/img';

type Props = {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
  /** Při selhání načtení nahradit náhodnou fotkou (osobnosti). U článků vypnout – jinak vypadá jako „špatná“ fotka i při správné DB cestě. */
  randomFallbackOnError?: boolean;
  /** Lokální uploads často spolehlivěji bez optimalizátoru (standalone / různé formáty). */
  unoptimized?: boolean;
};

export default function ImageWithFallback({
  src,
  alt,
  fill = false,
  className = '',
  sizes,
  randomFallbackOnError = true,
  unoptimized,
}: Props) {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  const effectiveUnoptimized =
    unoptimized ?? (imgSrc.startsWith('/uploads/') || /^https?:\/\//i.test(imgSrc));

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill={fill}
      className={className}
      sizes={sizes}
      unoptimized={effectiveUnoptimized}
      onError={() => {
        if (randomFallbackOnError) setImgSrc(getRandomFallbackPhoto());
      }}
    />
  );
}
