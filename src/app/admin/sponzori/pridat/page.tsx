import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getAuth } from '@/lib/auth';
import AdminSponzorForm from './AdminSponzorForm';

export default async function AdminSponzorPridatPage() {
  const auth = await getAuth();
  if (!auth) redirect('/admin/login');

  return (
    <div>
      <Link href="/admin/sponzori" className="text-[#134070] hover:underline mb-4 block">
        ← Zpět na sponzory
      </Link>
      <h1 className="text-2xl font-bold mb-6">Přidat sponzora/partnera</h1>
      <AdminSponzorForm />
    </div>
  );
}
