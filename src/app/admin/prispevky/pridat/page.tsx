import { redirect } from 'next/navigation';
import { getAuth } from '@/lib/auth';
import Link from 'next/link';
import AdminPrispevekForm from './AdminPrispevekForm';

export default async function AdminPrispevekPridatPage() {
  const auth = await getAuth();
  if (!auth) redirect('/admin/login');

  return (
    <div>
      <Link href="/admin" className="text-[#134070] hover:underline mb-4 block">
        ← Zpět
      </Link>
      <h1 className="text-2xl font-bold mb-6">Přidat příspěvek</h1>
      <AdminPrispevekForm />
    </div>
  );
}
