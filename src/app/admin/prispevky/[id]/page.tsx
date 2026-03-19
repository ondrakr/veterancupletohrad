import { redirect, notFound } from 'next/navigation';
import { getAuth } from '@/lib/auth';
import db from '@/lib/db';
import Link from 'next/link';
import AdminPrispevekEditForm from './AdminPrispevekEditForm';

export default async function AdminPrispevekEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const auth = await getAuth();
  if (!auth) redirect('/admin/login');

  const { id } = await params;
  const [rows] = await db.query<any[]>(
    'SELECT id, datum, jmeno, castka FROM seznam_prispeli WHERE id = ?',
    [id]
  );
  const row = rows[0];
  if (!row) notFound();

  return (
    <div>
      <Link href="/admin" className="text-[#134070] hover:underline mb-4 block">
        ← Zpět
      </Link>
      <h1 className="text-2xl font-bold mb-6">Upravit příspěvek</h1>
      <AdminPrispevekEditForm
        id={row.id}
        datum={row.datum}
        jmeno={row.jmeno}
        castka={row.castka}
      />
    </div>
  );
}
