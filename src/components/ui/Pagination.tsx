import Link from 'next/link';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  basePath?: string;
};

export default function Pagination({
  currentPage,
  totalPages,
  basePath = '/novinky',
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const items: (number | 'ellipsis')[] = [];
  const add = (p: number | 'ellipsis') => {
    if (items[items.length - 1] !== p) items.push(p);
  };

  if (totalPages <= 9) {
    for (let i = 1; i <= totalPages; i++) add(i);
  } else {
    add(1);
    if (currentPage > 3) add('ellipsis');
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      add(i);
    }
    if (currentPage < totalPages - 2) add('ellipsis');
    if (totalPages > 1) add(totalPages);
  }

  return (
    <nav className="flex justify-center items-center gap-2 mt-8" aria-label="Stránkování">
      {items.map((p, i) =>
        p === 'ellipsis' ? (
          <span key={`ell-${i}`} className="px-2 text-gray-400">
            …
          </span>
        ) : (
          <Link
            key={p}
            href={p === 1 ? basePath : `${basePath}?page=${p}`}
            className={`min-w-[2rem] sm:min-w-[2.5rem] h-9 sm:h-10 flex items-center justify-center rounded-[var(--radius)] font-medium text-sm sm:text-base transition-colors ${
              p === currentPage
                ? 'bg-[var(--secondary)] !text-white'
                : 'border border-gray-200 text-[var(--secondary)] hover:border-[var(--secondary)] hover:bg-[var(--secondary)]/5'
            }`}
          >
            {p}
          </Link>
        )
      )}
    </nav>
  );
}
