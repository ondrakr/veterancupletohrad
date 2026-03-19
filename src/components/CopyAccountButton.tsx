'use client';

import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

const ACCOUNT = '131-1671740207/0100';

export default function CopyAccountButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(ACCOUNT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-2 text-2xl md:text-3xl font-bold text-[var(--secondary)] hover:text-[var(--secondary-hover)] transition-colors"
      title="Zkopírovat číslo účtu"
      aria-label="Zkopírovat číslo účtu"
    >
      {ACCOUNT}
      <span className="inline-flex p-1.5 rounded-[var(--radius)] hover:bg-gray-100 transition-colors">
        {copied ? (
          <Check className="w-5 h-5 text-green-600" strokeWidth={2} />
        ) : (
          <Copy className="w-5 h-5 text-[var(--secondary)]" strokeWidth={1.5} />
        )}
      </span>
    </button>
  );
}
