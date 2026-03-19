import Link from 'next/link';

type SectionHeaderProps = {
  children: React.ReactNode;
  href?: string;
  className?: string;
};

export default function SectionHeader({
  children,
  href,
  className = '',
}: SectionHeaderProps) {
  const base = 'text-2xl font-bold mb-6 text-[var(--secondary)] uppercase';
  const content = href ? (
    <Link href={href} className="hover:underline">
      {children}
    </Link>
  ) : (
    children
  );

  return <h2 className={`${base} ${className}`}>{content}</h2>;
}
