export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-6xl mx-auto p-4 sm:p-6 w-full">{children}</main>
    </div>
  );
}
