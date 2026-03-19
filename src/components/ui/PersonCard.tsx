import Link from 'next/link';
import ImageWithFallback from '@/components/ImageWithFallback';
import { User } from 'lucide-react';

type PersonCardProps = {
  id: number;
  jmeno: string;
  img_thumbnail?: string | null;
  img?: string | null;
  link?: boolean;
  popis?: string | null;
  className?: string;
  imageHeight?: 'xs' | 'sm' | 'md';
};

export default function PersonCard({
  id,
  jmeno,
  img_thumbnail,
  img,
  link = true,
  popis,
  className = '',
  imageHeight = 'md',
}: PersonCardProps) {
  const parts = (jmeno || '').trim().split(/\s+/);
  const jmenoPart = parts[0] || '';
  const prijmeni = parts.slice(1).join(' ') || jmenoPart;
  const hasImage = !!(img?.trim() || img_thumbnail?.trim());
  const imgSrc = img || img_thumbnail;
  const displaySrc = imgSrc?.startsWith('/') ? imgSrc : imgSrc ? `/profilovky/${imgSrc}` : '';
  const hasLink = link && !!popis;
  const size =
    imageHeight === 'xs' ? 'w-20 h-20' :
    imageHeight === 'sm' ? 'w-24 h-24' : 'w-28 h-28';
  const iconSize = imageHeight === 'xs' ? 'w-8 h-8' : imageHeight === 'sm' ? 'w-10 h-10' : 'w-12 h-12';

  const overlap = imageHeight === 'xs' ? '-ml-3' : imageHeight === 'sm' ? '-ml-4' : '-ml-5';

  const content = (
    <div className="flex items-center w-fit">
      {/* Kruhová fotka nebo ikona profilu na modrém pozadí */}
      <div
        className={`relative ${size} shrink-0 rounded-full overflow-hidden bg-[var(--secondary)] flex items-center justify-center`}
      >
        {hasImage ? (
          <ImageWithFallback
            src={displaySrc}
            alt={jmeno}
            fill
            className="object-cover object-center"
            sizes={imageHeight === 'xs' ? '80px' : imageHeight === 'sm' ? '96px' : '112px'}
          />
        ) : (
          <User className={`${iconSize} text-white`} strokeWidth={1.5} />
        )}
      </div>
      {/* Jmenovka vpravo od fotky, jen kousíček překrývá */}
      <div
        className={`${overlap} -rotate-[6deg] bg-white rounded-[var(--radius)] shrink-0 ${
          imageHeight === 'xs'
            ? 'px-2.5 py-2 min-w-[4rem]'
            : imageHeight === 'sm'
            ? 'px-3 py-2.5 min-w-[4.5rem]'
            : 'px-4 py-3 min-w-[5rem]'
        }`}
        style={{ boxShadow: '0 4px 14px rgba(0,0,0,0.12)' }}
      >
        <p className={`font-medium text-gray-500 uppercase leading-tight tracking-wide ${imageHeight === 'xs' ? 'text-xs' : 'text-sm'}`}>
          {jmenoPart}
        </p>
        <p className={`font-bold text-[var(--secondary)] uppercase leading-tight mt-0.5 ${imageHeight === 'xs' ? 'text-base' : imageHeight === 'sm' ? 'text-lg' : 'text-xl'}`}>
          {prijmeni}
        </p>
      </div>
    </div>
  );

  const cardClass =
    'block transition-transform duration-200 hover:scale-[1.02]';

  if (hasLink) {
    return (
      <Link
        href={`/profil-osobnosti/${id}`}
        className={`${cardClass} ${className}`}
      >
        {content}
      </Link>
    );
  }

  return <div className={`${cardClass} ${className}`}>{content}</div>;
}
