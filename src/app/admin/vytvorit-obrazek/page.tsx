import { redirect } from 'next/navigation';
import { getAuth } from '@/lib/auth';
import VytvoritObrazekForm from './VytvoritObrazekForm';

export default async function VytvoritObrazekPage() {
  const auth = await getAuth();
  if (!auth) {
    redirect('/admin/login');
  }

  return (
    <div className="min-w-0">
      <h1 className="text-lg sm:text-xl md:text-2xl font-bold mb-6 sm:mb-8">Vytvořit obrázek pro sociální sítě</h1>
      <VytvoritObrazekForm />
    </div>
  );
}
