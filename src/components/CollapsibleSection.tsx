'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

type CollapsibleSectionProps = {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

export default function CollapsibleSection({ title, children, defaultOpen = false }: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <section className="border border-gray-200 rounded-[var(--radius-lg)] overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-2 px-4 py-3 sm:px-6 sm:py-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
      >
        <h2 className="text-lg sm:text-xl font-bold text-[var(--secondary)] uppercase m-0">{title}</h2>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 shrink-0 text-[var(--secondary)]" strokeWidth={2} />
        ) : (
          <ChevronDown className="w-5 h-5 shrink-0 text-[var(--secondary)]" strokeWidth={2} />
        )}
      </button>
      {isOpen && <div className="px-4 sm:px-6 pb-4 sm:pb-6">{children}</div>}
    </section>
  );
}
