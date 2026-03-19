import Link from 'next/link';

type TextLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
};

export default function TextLink({
  href,
  children,
  className = '',
  external = false,
}: TextLinkProps) {
  const base = 'text-[var(--secondary)] hover:underline';
  const styles = `${base} ${className}`;

  if (external || href.startsWith('http')) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={styles}
      >
        {children}
      </a>
    );
  }

  return <Link href={href} className={styles}>{children}</Link>;
}
