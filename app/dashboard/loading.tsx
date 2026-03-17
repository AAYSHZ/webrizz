export default function DashboardLoading() {
  return (
    <div className="flex h-screen items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-5">
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 rounded-full border-[3px] border-zinc-800" />
          <div className="absolute inset-0 animate-spin rounded-full border-[3px] border-transparent border-t-white" />
        </div>
        <span className="text-sm font-medium text-zinc-500 tracking-wide">Loading feed…</span>
      </div>
    </div>
  )
}
