import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getAuth } from '@/lib/auth';
import AdminRokTymyList from './AdminRokTymyList';

export default async function AdminRokTymyPage() {
  const auth = await getAuth();
  if (!auth) redirect('/admin/login');

  return (
    <div>
      <Link href="/admin" className="text-[#134070] hover:underline mb-4 block">
        ← Zpět
      </Link>
      <h1 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">Týmy podle ročníku</h1>
      <p className="text-sm text-gray-600 mb-6">
        Definice týmů (barev) pro každý ročník. Osobnosti pak přiřazujete do týmů zvlášť pro každý rok.
      </p>
      <AdminRokTymyList />
    </div>
  );
}
