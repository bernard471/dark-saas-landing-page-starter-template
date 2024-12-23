
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-zinc-950">
      
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  )
}
