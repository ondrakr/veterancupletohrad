import Link from 'next/link';
import Image from 'next/image';

type BeneficiaryCardProps = {
  href: string;
  img: string;
  label: string;
  /** Pozice výřezu fotky, např. "50% 15%" = trochu níže, "50% 30%" = více níže */
  objectPosition?: string;
};

export default function BeneficiaryCard({ href, img, label, objectPosition }: BeneficiaryCardProps) {
  return (
    <Link
      href={href}
      className="relative h-48 rounded-[var(--radius-lg)] overflow-hidden group block"
    >
      <Image
        src={img}
        alt={label}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-300"
        style={objectPosition ? { objectPosition } : undefined}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      <p className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 text-white text-base sm:text-xl font-medium text-center w-full px-3 sm:px-4">
        {label}
      </p>
    </Link>
  );
}
