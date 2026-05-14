import Link from 'next/link';
import ImageWithFallback from '@/components/ImageWithFallback';
import { normalizeFotoPath } from '@/lib/img';
import { cleanNbsp } from '@/lib/html';
import { Calendar } from 'lucide-react';

type ArticleCardProps = {
  id: number;
  nadpis: string;
  foto?: string | null;
  datum?: string | Date | null;
  /** Text perexu nebo HTML obsah (bude očištěn) */
  perex?: string | null;
  /** HTML obsah – použije se jako perex když perex není zadán */
  obsah?: string | null;
};

function formatRelativeDate(d: string | Date | null | undefined): string {
  if (!d) return '';
  const date = typeof d === 'string' ? new Date(d) : d;
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'dnes';
  if (diffDays === 1) return 'včera';
  if (diffDays >= 2 && diffDays <= 6) return `před ${diffDays} dny`;
  if (diffDays >= 7 && diffDays <= 13) return 'před týdnem';
  if (diffDays >= 14 && diffDays <= 20) return 'před 2 týdny';
  if (diffDays >= 21 && diffDays <= 27) return 'před 3 týdny';
  if (diffDays >= 28 && diffDays <= 59) return 'před měsícem';
  if (diffDays >= 60 && diffDays <= 364) return `před ${Math.floor(diffDays / 30)} měsíci`;
  const years = Math.floor(diffDays / 365);
  return years === 1 ? 'před rokem' : `před ${years} roky`;
}

function stripHtml(html: string, maxLen = 120): string {
  const cleaned = cleanNbsp(html);
  const text = cleaned.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  return text.length > maxLen ? text.slice(0, maxLen) + '…' : text;
}

export default function ArticleCard({ id, nadpis, foto, datum, perex, obsah }: ArticleCardProps) {
  const perexText = perex ?? (obsah ? stripHtml(obsah) : null);

  return (
    <Link
      href={`/clanek/${id}`}
      className="group block bg-white rounded-[var(--radius-lg)] overflow-hidden transition-all duration-200 border border-gray-200 hover:border-[var(--secondary)]/30"
    >
      <div className="relative h-52 overflow-hidden">
        <ImageWithFallback
          src={normalizeFotoPath(foto)}
          alt={nadpis}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          randomFallbackOnError={false}
        />
      </div>
      <div className="p-5">
        {datum && (
          <p className="flex items-center gap-1.5 text-sm text-gray-500 mb-2">
            <Calendar className="w-4 h-4 shrink-0" strokeWidth={1} />
            {formatRelativeDate(datum)}
          </p>
        )}
        <h3 className="text-[var(--secondary)] font-bold text-lg leading-tight mb-2 line-clamp-2 group-hover:text-[var(--secondary-hover)] transition-colors">
          {nadpis}
        </h3>
        {perexText && (
          <p className="text-gray-600 text-sm line-clamp-2">
            {perexText}
          </p>
        )}
      </div>
    </Link>
  );
}
