import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getAuth } from '@/lib/auth';
import AdminClanekForm from './AdminClanekForm';

export default async function AdminClanekPridatPage() {
  const auth = await getAuth();
  if (!auth) redirect('/admin/login');

  return (
    <div>
      <Link href="/admin/clanky" className="text-[#134070] hover:underline mb-4 block">
        ← Zpět na články
      </Link>
      <h1 className="text-2xl font-bold mb-6">Přidat článek</h1>
      <AdminClanekForm />
    </div>
  );
}
