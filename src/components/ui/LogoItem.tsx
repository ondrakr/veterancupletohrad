import Link from 'next/link';
import Image from 'next/image';

type LogoItemProps = {
  src?: string;
  alt: string;
  href?: string;
  apiLogo?: { id: number };
  logoCacheBust?: number;
};

export default function LogoItem({ src = '', alt, href, apiLogo, logoCacheBust }: LogoItemProps) {
  const imgClass = 'object-contain';
  const logoUrl = apiLogo
    ? `/api/sponzori/${apiLogo.id}/logo${logoCacheBust != null ? `?t=${logoCacheBust}` : ''}`
    : src;
  const imgContent = apiLogo ? (
    <div className="relative w-[112px] h-[80px] shrink-0 flex items-center justify-center">
      <Image
        src={logoUrl}
        alt={alt}
        fill
        className={imgClass}
        sizes="112px"
        unoptimized
      />
    </div>
  ) : (
    <div className="relative w-[112px] h-[80px] shrink-0 flex items-center justify-center">
      <Image
        src={logoUrl}
        alt={alt}
        fill
        className={imgClass}
        sizes="112px"
      />
    </div>
  );

  const baseClass =
    'flex items-center justify-center p-3 bg-white rounded-[var(--radius-lg)] border border-gray-200 w-full h-fit transition-colors duration-200';

  if (href) {
    return (
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseClass} hover:border-gray-300`}
      >
        {imgContent}
      </Link>
    );
  }

  return <div className={baseClass}>{imgContent}</div>;
}
