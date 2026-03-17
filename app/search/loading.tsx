export default function SearchLoading() {
  return (
    <div className="min-h-screen bg-white pb-20 sm:ml-64 sm:pb-0">
      <header className="sticky top-0 z-30 border-b border-slate-100 glass px-5 py-4 sm:px-6">
        <h1 className="text-center text-base font-bold tracking-tight text-zinc-900 sm:text-left sm:text-lg">Search</h1>
      </header>
      <div className="mx-auto max-w-2xl px-5 py-5">
        <div className="skeleton h-12 w-full rounded-xl" />
        <div className="mt-8 grid grid-cols-3 gap-1.5">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="skeleton aspect-[9/16] rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  )
}
