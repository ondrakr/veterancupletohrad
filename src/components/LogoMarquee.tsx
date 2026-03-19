'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type LogoItem = { id: number; nazev: string; odkaz?: string };
type StaticLogo = { name: string };

type LogoMarqueeProps =
  | { items: LogoItem[]; type: 'api'; logoCacheBust?: number }
  | { items: StaticLogo[]; type: 'static'; basePath: string };

export default function LogoMarquee(props: LogoMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [needsMarquee, setNeedsMarquee] = useState(true);
  const logoCacheBust = props.type === 'api' ? (props.logoCacheBust ?? 0) : 0;

  useEffect(() => {
    const checkOverflow = () => {
      const container = containerRef.current;
      const measure = measureRef.current;
      if (!container || !measure || container.clientWidth === 0) return;
      setNeedsMarquee(measure.scrollWidth > container.clientWidth);
    };

    checkOverflow();
    const resizeObserver = new ResizeObserver(checkOverflow);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    window.addEventListener('resize', checkOverflow);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', checkOverflow);
    };
  }, [props.items]);

  const itemSize = 'h-20 w-28';
  const gap = 'gap-10';

  const renderApiLogo = (item: LogoItem, copy?: number) => {
    const key = copy !== undefined ? `${item.id}-${copy}` : item.id;
    const content = (
      <Image
        src={`/api/sponzori/${item.id}/logo${logoCacheBust ? `?t=${logoCacheBust}` : ''}`}
        alt={item.nazev}
        fill
        className="object-contain"
        sizes="112px"
        unoptimized
      />
    );
    if (item.odkaz) {
      return (
        <Link
          key={key}
          href={item.odkaz}
          target="_blank"
          rel="noopener noreferrer"
          className={`${itemSize} flex-shrink-0 flex items-center justify-center hover:opacity-90 transition-opacity relative`}
        >
          {content}
        </Link>
      );
    }
    return (
      <div key={key} className={`${itemSize} flex-shrink-0 flex items-center justify-center relative`}>
        {content}
      </div>
    );
  };

  if (props.type === 'api') {
    const items = props.items as LogoItem[];
    if (!items.length) return null;

    return (
      <div ref={containerRef} className="overflow-hidden relative">
        <div ref={measureRef} className={`flex ${gap} items-center shrink-0 absolute top-0 left-0 invisible pointer-events-none w-max`} aria-hidden>
          {items.map((item) => renderApiLogo(item))}
        </div>
        {needsMarquee ? (
          <div className={`flex animate-marquee ${gap} items-center w-max`}>
            {[1, 2].map((copy) => (
              <div key={copy} className={`flex ${gap} items-center shrink-0`}>
                {items.map((item) => renderApiLogo(item, copy))}
              </div>
            ))}
          </div>
        ) : (
          <div className={`flex ${gap} items-center justify-center flex-wrap`}>
            {items.map((item) => renderApiLogo(item))}
          </div>
        )}
      </div>
    );
  }

  const items = props.items as StaticLogo[];
  const basePath = props.basePath;

  return (
    <div ref={containerRef} className="overflow-hidden relative">
      <div ref={measureRef} className={`flex ${gap} items-center shrink-0 absolute top-0 left-0 invisible pointer-events-none w-max`} aria-hidden>
        {items.map((item) => (
          <div key={item.name} className={`${itemSize} flex-shrink-0 flex items-center justify-center relative`}>
            <Image src={`${basePath}/${item.name}.png`} alt="" fill className="object-contain" sizes="112px" />
          </div>
        ))}
      </div>
      {needsMarquee ? (
        <div className={`flex animate-marquee ${gap} items-center w-max`}>
          {[1, 2].map((copy) => (
            <div key={copy} className={`flex ${gap} items-center shrink-0`}>
              {items.map((item) => (
                <div key={`${item.name}-${copy}`} className={`${itemSize} flex-shrink-0 flex items-center justify-center relative`}>
                  <Image
                    src={`${basePath}/${item.name}.png`}
                    alt=""
                    fill
                    className="object-contain"
                    sizes="112px"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className={`flex ${gap} items-center justify-center flex-wrap`}>
          {items.map((item) => (
            <div key={item.name} className={`${itemSize} flex-shrink-0 flex items-center justify-center relative`}>
              <Image
                src={`${basePath}/${item.name}.png`}
                alt=""
                fill
                className="object-contain"
                sizes="112px"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
