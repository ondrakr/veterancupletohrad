import { Globe } from 'lucide-react';

type LinkItem = {
  type: 'instagram' | 'facebook' | 'web';
  href: string;
  label: string;
};

const iconProps = { className: 'w-5 h-5 shrink-0', strokeWidth: 1.5 };

function FacebookIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 shrink-0" viewBox="0 0 20 36" fill="currentColor">
      <path d="M5.72759 35.3775V20.0409H0.108093V13.6374H5.72759V7.81099C5.72759 7.81099 5.32949 -1.90749 19.1351 0.603418V6.05283H15.8493C15.8493 6.05283 12.8694 6.30375 12.7416 9.01608C12.6144 11.7284 12.7416 13.6368 12.7416 13.6368H18.9314L17.9636 20.0404H12.7422V35.3769C12.3091 35.4454 11.7954 35.5127 11.2152 35.5633C10.9011 35.591 10.2789 35.6382 9.48618 35.6468C8.7898 35.6543 8.20199 35.629 7.76595 35.6008C7.31473 35.5714 6.92247 35.5328 6.6061 35.4966" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function getIcon(type: LinkItem['type']) {
  switch (type) {
    case 'instagram':
      return <InstagramIcon />;
    case 'facebook':
      return <FacebookIcon />;
    case 'web':
      return (
        <span className="[&_svg]:!fill-none [&_svg]:stroke-[var(--secondary)]">
          <Globe {...iconProps} strokeWidth={1.5} />
        </span>
      );
  }
}

export default function ExternalLinks({ links }: { links: LinkItem[] }) {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      {links.map((item) => (
        <a
          key={item.href}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[var(--radius)] border border-gray-200 text-[var(--secondary)] [&_svg]:fill-[var(--secondary)] hover:border-[var(--secondary)] hover:bg-[var(--secondary)]/5 transition-colors"
        >
          {getIcon(item.type)}
          <span className="font-medium">{item.label}</span>
        </a>
      ))}
    </div>
  );
}
