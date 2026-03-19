'use client';

import Image from 'next/image';
import { useState } from 'react';
import { getRandomFallbackPhoto } from '@/lib/img';

type Props = {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
};

export default function ImageWithFallback({
  src,
  alt,
  fill = false,
  className = '',
  sizes,
}: Props) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill={fill}
      className={className}
      sizes={sizes}
      onError={() => setImgSrc(getRandomFallbackPhoto())}
    />
  );
}
