import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import { getAuth } from '@/lib/auth';
import db from '@/lib/db';
import AdminClanekEditForm from './AdminClanekEditForm';

export default async function AdminClanekEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const auth = await getAuth();
  if (!auth) redirect('/admin/login');

  const { id } = await params;
  const [rows] = await db.query<any[]>(
    'SELECT id, nadpis, foto, obsah, kategorie FROM clanky WHERE id = ?',
    [id]
  );
  const clanek = rows[0];
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
