import HeaderDefault from "./_components/headers/HeaderDefault";




export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`antialiased w-full flex flex-col min-h-screen`}>
      <HeaderDefault />
      <main className='flex-1'>
        {children}
      </main>

    </div>
  );
}