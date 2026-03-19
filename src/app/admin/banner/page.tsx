import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getAuth } from '@/lib/auth';
import AdminBannerForm from '../AdminBannerForm';

export default async function AdminBannerPage() {
  const auth = await getAuth();
  if (!auth) redirect('/admin/login');

  return (
    <div>
      <Link href="/admin" className="text-[#134070] hover:underline mb-4 block">
        ← Zpět
      </Link>
      <h1 className="text-lg sm:text-xl md:text-2xl font-bold mb-6">Horní banner oznámení</h1>
      <p className="text-sm text-gray-600 mb-6">
        Bílá lišta nad hero sekcí. Pokud je popis prázdný, lišta se nezobrazí.
      </p>
      <div className="bg-white rounded-[var(--radius)] shadow p-4 sm:p-6 max-w-xl">
        <AdminBannerForm />
      </div>
    </div>
  );
}
