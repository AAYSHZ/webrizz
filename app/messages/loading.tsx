export default function MessagesLoading() {
  return (
    <div className="min-h-screen bg-white pb-20 sm:ml-64 sm:pb-0">
      <header className="sticky top-0 z-30 border-b border-slate-100 glass px-5 py-4 sm:px-6">
        <h1 className="text-center text-base font-bold tracking-tight text-zinc-900 sm:text-left sm:text-lg">Messages</h1>
      </header>
      <div className="mx-auto max-w-2xl">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex items-center gap-4 px-5 py-4 border-b border-slate-50">
            <div className="skeleton h-12 w-12 shrink-0 rounded-full" />
            <div className="flex-1 space-y-2.5">
              <div className="skeleton h-4 w-28 rounded-md" />
              <div className="skeleton h-3.5 w-48 rounded-md" />
            </div>
            <div className="skeleton h-3 w-8 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  )
}
