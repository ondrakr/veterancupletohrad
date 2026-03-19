type PageContainerProps = {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const sizeStyles = {
  sm: 'max-w-4xl',
  md: 'max-w-5xl',
  lg: 'max-w-[var(--container-max)]',
};

export default function PageContainer({
  children,
  size = 'md',
  className = '',
}: PageContainerProps) {
  return (
    <div className={`${sizeStyles[size]} mx-auto w-full px-4 sm:px-6 lg:px-[var(--container-px)] ${className}`}>
      {children}
    </div>
  );
}
