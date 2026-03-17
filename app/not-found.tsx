import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="animate-page-enter text-center px-6">
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl border border-slate-100 bg-slate-50">
          <span className="text-3xl font-bold text-zinc-900">404</span>
        </div>
        <h1 className="mb-3 text-2xl font-bold tracking-tight text-zinc-900">Page not found</h1>
        <p className="mb-8 max-w-sm mx-auto text-sm leading-relaxed text-slate-500">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/dashboard"
          className="btn-press inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-zinc-900/10 transition-all hover:bg-zinc-800 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Back to Dashboard
        </Link>
      </div>
    </div>
  )
}
