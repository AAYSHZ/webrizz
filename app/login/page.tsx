import { login } from './actions'
import Link from 'next/link'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const params = await searchParams
  const error = params?.error

  return (
    <div className="flex min-h-screen w-full bg-white font-sans text-slate-900">
      
      {/* LEFT PANEL */}
      <div className="relative hidden w-1/2 flex-col justify-center overflow-hidden bg-slate-50 border-r border-slate-100 lg:flex">
        <div className="dot-pattern absolute inset-0 opacity-25" />
        <div className="absolute -left-24 -top-24 h-[420px] w-[420px] rounded-full glow-blue animate-pulse-glow" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full glow-indigo animate-pulse-glow" style={{ animationDelay: '1.5s' }} />

        <div className="animate-page-enter relative z-10 flex flex-col items-center justify-center px-16 text-center xl:px-24">
          <div className="mb-10 flex h-[72px] w-[72px] items-center justify-center rounded-2xl bg-zinc-900 text-white shadow-xl shadow-zinc-900/15 transition-transform hover:scale-105">
            <svg className="h-9 w-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
            </svg>
          </div>
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-zinc-900 xl:text-5xl">
            Welcome back.
          </h1>
          <p className="max-w-md text-lg leading-relaxed text-slate-500">
            Sign in to your account and continue building the future alongside thousands of creators.
          </p>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex w-full items-center justify-center p-6 sm:p-12 lg:w-1/2">
        <div className="animate-page-enter w-full max-w-[420px]">
          {/* Mobile logo */}
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 text-white">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
              </svg>
            </div>
            <span className="text-lg font-bold text-zinc-900">WebRizz</span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">Sign in</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">Enter your details below to access your account.</p>
          </div>

          {error && (
            <div className="animate-fade-in mb-6 flex items-center gap-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
              <svg className="h-5 w-5 shrink-0 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <form className="space-y-5">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-zinc-900 placeholder-slate-400 transition-all focus:border-zinc-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-slate-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-zinc-900 placeholder-slate-400 transition-all focus:border-zinc-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
              />
            </div>

            <div className="pt-1">
              <button
                formAction={login}
                className="btn-press flex w-full items-center justify-center rounded-xl bg-zinc-900 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-zinc-900/10 transition-all hover:bg-zinc-800 hover:shadow-xl hover:shadow-zinc-900/15 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2"
              >
                Sign In
              </button>
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="font-semibold text-zinc-900 transition-colors hover:text-zinc-700 hover:underline underline-offset-4">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
