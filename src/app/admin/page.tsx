import { redirect } from 'next/navigation';
import { getAuth } from '@/lib/auth';
import Link from 'next/link';
import AdminCastkaForm from './AdminCastkaForm';
import AdminPrispevkyList from './AdminPrispevkyList';

export default async function AdminPage() {
  const auth = await getAuth();
  if (!auth) {
    redirect('/admin/login');
  }

  return (
    <div className="min-w-0">
      <Link href="/" className="inline-block text-[#134070] hover:underline mb-4 text-sm sm:text-base">
        ← Zpět na web
      </Link>
      <h1 className="text-lg sm:text-xl md:text-2xl font-bold mb-6 sm:mb-8 break-words">
        ÚPRAVA OBSAHU WEBOVÝCH STRÁNEK VETERÁN CUP LETOHRAD
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
        <Link
          href="/admin/osobnosti"
          className="p-4 sm:p-5 bg-white rounded-[var(--radius)] shadow hover:shadow-lg text-sm sm:text-base"
        >
          Osobnosti
        </Link>
        <Link
          href="/admin/clanky"
          className="p-4 sm:p-5 bg-white rounded-[var(--radius)] shadow hover:shadow-lg text-sm sm:text-base"
        >
          Články
        </Link>
        <Link
          href="/admin/sponzori"
          className="p-4 sm:p-5 bg-white rounded-[var(--radius)] shadow hover:shadow-lg text-sm sm:text-base"
        >
          Sponzoři a partneři
        </Link>
        <Link
          href="/admin/vytvorit-obrazek"
          className="p-4 sm:p-5 bg-white rounded-[var(--radius)] shadow hover:shadow-lg text-sm sm:text-base"
        >
          Vytvořit obrázek (sbírka)
        </Link>
        <Link
          href="/admin/banner"
          className="p-4 sm:p-5 bg-white rounded-[var(--radius)] shadow hover:shadow-lg text-sm sm:text-base"
        >
          Horní banner oznámení
        </Link>
      </div>

      <section className="bg-white rounded-[var(--radius)] shadow p-4 sm:p-6 mb-6 sm:mb-8 overflow-hidden">
        <h2 className="text-lg sm:text-xl font-bold mb-4">Celková částka sbírky</h2>
        <AdminCastkaForm />
      </section>

      <section className="bg-white rounded-[var(--radius)] shadow p-4 sm:p-6 overflow-hidden">
        <h2 className="text-lg sm:text-xl font-bold mb-4">Seznam lidí co přispěli</h2>
        <Link
          href="/admin/prispevky/pridat"
          className="inline-block mb-4 px-4 py-2 bg-green-600 text-white rounded-[var(--radius)] hover:bg-green-700 text-sm sm:text-base"
        >
          Přidat
        </Link>
        <AdminPrispevkyList />
      </section>
    </div>
  );
}
