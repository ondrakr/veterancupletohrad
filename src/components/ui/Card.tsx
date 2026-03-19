import Link from 'next/link';

type CardProps = {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
} & (
  | { href?: string; as?: 'div' }
  | { href: string; as: 'link' }
);

const paddingStyles = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export default function Card({
  children,
  className = '',
  hover = true,
  padding = 'md',
  ...props
}: CardProps) {
  const base =
    'bg-white rounded-[var(--radius-lg)] border border-gray-200 transition-all duration-200';
  const hoverStyle = hover ? 'hover:border-gray-300' : '';
  const styles = `${base} ${hoverStyle} ${paddingStyles[padding]} ${className}`;

  if ('href' in props && props.href) {
    return (
      <Link href={props.href} className={`block ${styles}`}>
        {children}
      </Link>
    );
  }

  return <div className={styles}>{children}</div>;
}
