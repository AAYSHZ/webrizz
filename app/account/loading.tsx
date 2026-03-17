export default function AccountLoading() {
  return (
    <div className="min-h-screen bg-white pb-20 sm:ml-64 sm:pb-0">
      <div className="mx-auto max-w-2xl">
        {/* Profile skeleton */}
        <div className="flex flex-col items-center px-6 pt-12 pb-8">
          <div className="skeleton h-24 w-24 rounded-full" />
          <div className="skeleton mt-5 h-5 w-36 rounded-lg" />
          <div className="skeleton mt-2.5 h-4 w-24 rounded-lg" />
          <div className="mt-8 flex gap-12">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <div className="skeleton h-5 w-10 rounded-md" />
                <div className="skeleton h-3 w-16 rounded-md" />
              </div>
            ))}
          </div>
        </div>
        {/* Grid skeleton */}
        <div className="grid grid-cols-3 gap-1.5 px-1.5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="skeleton aspect-[9/16] rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  )
}
