import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import { getAuth } from '@/lib/auth';
import db from '@/lib/db';
import { parsePositiveIntId } from '@/lib/parse-id';
import AdminClanekEditForm from './AdminClanekEditForm';
import { mapArticleRow } from '@/lib/article-photo';

export default async function AdminClanekEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const auth = await getAuth();
  if (!auth) redirect('/admin/login');

  const { id } = await params;
  const idNum = parsePositiveIntId(id);
  if (idNum == null) notFound();
  const [rows] = await db.query<any[]>(
    'SELECT id, nadpis, foto, foto_blob, foto_mime_type, obsah, kategorie FROM clanky WHERE id = ?',
    [idNum]
  );
  const clanek = rows[0] ? mapArticleRow(rows[0]) : null;
  if (!clanek) notFound();

  return (
    <div>
      <Link href="/admin/clanky" className="text-[#134070] hover:underline mb-4 block">
        ← Zpět na články
      </Link>
      <h1 className="text-2xl font-bold mb-6">Upravit článek</h1>
      <AdminClanekEditForm
        id={clanek.id}
        nadpis={clanek.nadpis}
        obsah={clanek.obsah || ''}
        foto={clanek.foto || ''}
        kategorie={clanek.kategorie || ''}
      />
    </div>
  );
}
