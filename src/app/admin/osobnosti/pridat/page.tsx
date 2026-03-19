import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getAuth } from '@/lib/auth';
import AdminOsobnostForm from './AdminOsobnostForm';

export default async function AdminOsobnostPridatPage() {
  const auth = await getAuth();
  if (!auth) redirect('/admin/login');

  return (
    <div>
      <Link href="/admin/osobnosti" className="text-[#134070] hover:underline mb-4 block">
        ← Zpět na osobnosti
      </Link>
      <h1 className="text-2xl font-bold mb-6">Přidat osobnost</h1>
      <AdminOsobnostForm />
    </div>
  );
}
