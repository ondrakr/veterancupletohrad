import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import { getAuth } from '@/lib/auth';
import db from '@/lib/db';
import { parsePositiveIntId } from '@/lib/parse-id';
import { normalizeSponsorTyp } from '@/lib/sponzoriTyp';
import AdminSponzorEditForm from './AdminSponzorEditForm';

export default async function AdminSponzorEditPage({
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
    'SELECT id, CAST(typ AS CHAR) AS typ, nazev, odkaz FROM sponzori WHERE id = ?',
    [idNum]
  );
  const s = rows[0];
  if (!s) notFound();

  return (
    <div>
      <Link href="/admin/sponzori" className="text-[#134070] hover:underline mb-4 block">
        ← Zpět na sponzory
      </Link>
      <h1 className="text-2xl font-bold mb-6">Upravit sponzora/partnera</h1>
      <AdminSponzorEditForm
        id={s.id}
        typ={normalizeSponsorTyp(s.typ)}
        nazev={s.nazev}
        odkaz={s.odkaz || ''}
      />
    </div>
  );
}
