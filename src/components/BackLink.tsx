'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

type BackLinkProps = {
  className?: string;
};

export default function BackLink({ className = '' }: BackLinkProps) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className={`inline-flex items-center gap-1 text-[var(--secondary)] text-sm font-medium hover:underline cursor-pointer bg-transparent border-none p-0 ${className}`}
      type="button"
    >
      <ChevronLeft className="w-4 h-4 shrink-0" strokeWidth={2} />
      Zpět
    </button>
  );
}
