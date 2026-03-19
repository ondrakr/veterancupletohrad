import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import { getAuth } from '@/lib/auth';
import db from '@/lib/db';
import AdminOsobnostEditForm from './AdminOsobnostEditForm';

export default async function AdminOsobnostEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const auth = await getAuth();
  if (!auth) redirect('/admin/login');

  const { id } = await params;
  const [rows] = await db.query<any[]>(
    'SELECT id, jmeno, sport, img, img_thumbnail, popis, rok, roky, tym, zverejnit, osobnost FROM osobnosti WHERE id = ?',
    [id]
  );
  const o = rows[0];
  if (!o) notFound();

  const [ortRows] = await db.query<any[]>(
    'SELECT rok, tym FROM osobnost_rok_tym WHERE osobnost_id = ? ORDER BY rok',
    [id]
  );
  const rokyTymy = (ortRows || []).map((r: { rok: number; tym: string }) => ({
    rok: r.rok,
    tym: r.tym,
  }));

  return (
    <div>
      <Link href="/admin/osobnosti" className="text-[#134070] hover:underline mb-4 block">
        ← Zpět na osobnosti
      </Link>
      <h1 className="text-2xl font-bold mb-6">Upravit osobnost</h1>
      <AdminOsobnostEditForm
        id={o.id}
        jmeno={o.jmeno}
        sport={o.sport || ''}
        popis={o.popis || ''}
        roky_tymy={rokyTymy.length ? rokyTymy : [{ rok: 25, tym: 'c' }]}
        img={o.img || ''}
        img_thumbnail={o.img_thumbnail || ''}
        zverejnit={o.zverejnit || 'a'}
        osobnost={o.osobnost || 'n'}
      />
    </div>
  );
}
