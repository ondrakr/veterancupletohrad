import Link from 'next/link';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'destructive' | 'ghost';

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--secondary)] !text-white hover:bg-[var(--secondary-hover)] border border-[var(--secondary)] [&_svg]:!text-white',
  secondary:
    'bg-[var(--primary)] !text-white hover:bg-[var(--primary-dark)] border border-[var(--primary)] [&_svg]:!text-white',
  outline:
    'border-2 border-[var(--accent-muted)] bg-white text-[var(--secondary)] hover:border-[var(--accent-muted-hover)]',
  destructive: 'bg-red-600 text-white hover:bg-red-700',
  ghost: 'bg-transparent text-[var(--secondary)] hover:bg-white/10',
};

type ButtonProps = {
  variant?: ButtonVariant;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
  fullWidth?: boolean;
  download?: boolean;
  type?: 'button' | 'submit' | 'reset';
  /** Ikona vlevo nebo vpravo od textu */
  icon?: React.ReactNode;
  /** Pozice ikony */
  iconPosition?: 'left' | 'right';
  /** Barva textu (např. "text-white") – přepíše barvu z varianty */
  textColor?: string;
  /** Barva ikony (např. "text-white") – přepíše barvu z varianty */
  iconColor?: string;
  /** Zaoblení: default = rounded, full = rounded-full */
  rounded?: 'default' | 'full';
} & (
  | { href: string; onClick?: never }
  | { href?: never; onClick?: () => void }
);

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-6 py-3 text-base gap-2',
  lg: 'px-8 py-4 text-lg gap-2',
};

const roundedStyles = {
  default: 'rounded-[var(--radius)]',
  full: 'rounded-[var(--radius)]',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  disabled = false,
  fullWidth = false,
  download = false,
  type = 'button',
  icon,
  iconPosition = 'left',
  textColor,
  iconColor,
  rounded = 'default',
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  const styles = `${base} ${variantStyles[variant]} ${sizeStyles[size]} ${roundedStyles[rounded]} ${fullWidth ? 'w-full' : ''} ${className}`;

  const textClass = textColor ?? '';
  const iconWrapperClass = `shrink-0 inline-flex ${iconColor ?? ''}`;

  const content = (
    <>
      {icon && iconPosition === 'left' && (
        <span className={iconWrapperClass}>{icon}</span>
      )}
      <span className={textClass || undefined}>{children}</span>
      {icon && iconPosition === 'right' && (
        <span className={iconWrapperClass}>{icon}</span>
      )}
    </>
  );

  if ('href' in props && props.href) {
    const isExternal = props.href.startsWith('http');
    const isDownload = download || props.href.match(/\.(pdf|png|svg|jpg|jpeg)$/i);
    if (isExternal) {
      return (
        <a
          href={props.href}
          target="_blank"
          rel="noopener noreferrer"
          className={styles}
        >
          {content}
        </a>
      );
    }
    if (isDownload) {
      const filename = props.href.split('/').pop() || 'download';
      return (
        <a href={props.href} download={filename} className={styles}>
          {content}
        </a>
      );
    }
    return (
      <Link href={props.href} className={styles}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={'onClick' in props ? props.onClick : undefined}
      disabled={disabled}
      className={styles}
    >
      {content}
    </button>
  );
}
