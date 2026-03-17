import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-white font-sans text-slate-900" suppressHydrationWarning>

      {/* Hero Section */}
      <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-6 py-28 text-center sm:py-36">
        {/* Dot pattern background */}
        <div className="dot-pattern absolute inset-0 opacity-30" />

        {/* Glow orbs */}
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full glow-blue animate-pulse-glow" />
        <div className="absolute -bottom-32 -right-32 h-[450px] w-[450px] rounded-full glow-indigo animate-pulse-glow" style={{ animationDelay: '1.5s' }} />

        <div className="animate-page-enter relative z-10 flex flex-col items-center">
          {/* Logo mark */}
          <div className="mb-10 flex h-[72px] w-[72px] items-center justify-center rounded-2xl bg-zinc-900 text-white shadow-xl shadow-zinc-900/15 transition-transform hover:scale-105 hover:shadow-2xl hover:shadow-zinc-900/20">
            <svg className="h-9 w-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
            </svg>
          </div>

          <h1 className="mb-6 max-w-3xl text-[clamp(2.25rem,5vw,3.75rem)] font-extrabold leading-[1.08] tracking-tight text-zinc-900">
            Where developers <br className="hidden sm:block" />show their craft.
          </h1>

          <p className="mb-12 max-w-lg text-lg leading-relaxed text-slate-500">
            Share coding reels, discover talented creators, and climb the scoreboard. A beautiful community built for developers.
          </p>

          {/* CTAs */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/signup"
              className="btn-press group inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-900 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-zinc-900/15 transition-all hover:bg-zinc-800 hover:shadow-xl hover:shadow-zinc-900/20 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2"
            >
              Get Started — It&apos;s Free
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link
              href="/login"
              className="btn-press inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-8 py-3.5 text-sm font-semibold text-zinc-900 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* Features Strip */}
      <div className="border-t border-slate-100 bg-slate-50/60">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-0 sm:grid-cols-3">
          {[
            { icon: 'M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z', title: 'Share Reels', desc: 'Record and share short coding videos with the community.' },
            { icon: 'M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z', title: 'Discover', desc: 'Find talented developers and learn new techniques.' },
            { icon: 'M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.982-3.172', title: 'Scoreboard', desc: 'Compete with others and climb the leaderboard.' },
          ].map((feature, i) => (
            <div
              key={feature.title}
              className={`group flex flex-col items-center px-10 py-12 text-center transition-colors hover:bg-white ${i < 2 ? 'border-b border-slate-100 sm:border-b-0 sm:border-r' : ''}`}
              suppressHydrationWarning
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-900 text-white shadow-md shadow-zinc-900/10 transition-transform group-hover:scale-110" suppressHydrationWarning>
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={feature.icon} />
                </svg>
              </div>
              <h3 className="mb-2 text-[15px] font-bold text-zinc-900">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-slate-500">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-100 bg-white py-10 text-center">
        <p className="text-xs font-medium tracking-wide text-slate-400" suppressHydrationWarning>
          &copy; {new Date().getFullYear()} WebRizz. Built for developers.
        </p>
      </footer>
    </div>
  )
}
