import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getAuth } from '@/lib/auth';
import AdminSponzoriList from './AdminSponzoriList';

export default async function AdminSponzoriPage() {
  const auth = await getAuth();
  if (!auth) redirect('/admin/login');

  return (
    <div>
      <Link href="/admin" className="text-[#134070] hover:underline mb-4 block">
        ← Zpět
      </Link>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold m-0">Správa sponzorů a partnerů</h1>
        <Link
          href="/admin/sponzori/pridat"
          className="inline-block px-4 py-2 bg-green-600 text-white rounded-[var(--radius)] hover:bg-green-700 font-medium"
        >
          + Přidat sponzora/partnera
        </Link>
      </div>
      <AdminSponzoriList />
    </div>
  );
}
