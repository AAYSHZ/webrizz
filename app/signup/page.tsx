'use client'

import { Suspense, useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { ALLOWED_IMAGE_TYPES, MAX_AVATAR_SIZE_BYTES, USERNAME_MIN_LENGTH } from '@/lib/constants'
import { sanitizeUsername } from '@/lib/utils'

function SignupForm() {
  const supabase = createClient()
  const router = useRouter()
  const searchParams = useSearchParams()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [fullName, setFullName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(searchParams.get('error'))
  const [success, setSuccess] = useState<string | null>(searchParams.get('success'))

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
        setError('Please select a valid image file (JPEG, PNG, GIF, or WebP).')
        return
      }
      if (file.size > MAX_AVATAR_SIZE_BYTES) {
        setError(`Image must be under ${MAX_AVATAR_SIZE_BYTES / 1024 / 1024}MB.`)
        return
      }
      setAvatarFile(file)
      if (avatarPreview) URL.revokeObjectURL(avatarPreview)
      const url = URL.createObjectURL(file)
      setAvatarPreview(url)
      setError(null)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      let avatarUrl = null
      
      if (avatarFile) {
        const tempId = crypto.randomUUID()
        const fileExt = avatarFile.name.split('.').pop()
        const filePath = `${tempId}-${Date.now()}.${fileExt}`

        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(filePath, avatarFile)

        if (!uploadError) {
          const { data: urlData } = supabase.storage
            .from('avatars')
            .getPublicUrl(filePath)
          avatarUrl = urlData.publicUrl
        } else {
          setError('Failed to upload avatar image. ' + uploadError.message)
          setLoading(false)
          return
        }
      }

      const signUpData = {
        full_name: fullName,
        username: username,
        ...(avatarUrl && { avatar_url: avatarUrl })
      }

      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: { data: signUpData },
      })

      if (signUpError) {
        setError(signUpError.message)
        setLoading(false)
        return
      }

      if (data.session) {
        router.push('/dashboard')
      } else {
        setSuccess('Check your email to confirm your account!')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {success && (
        <div className="animate-fade-in mb-6 flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          <svg className="h-5 w-5 shrink-0 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          <span>{success}</span>
        </div>
      )}

      {error && (
        <div className="animate-fade-in mb-6 flex items-center gap-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
          <svg className="h-5 w-5 shrink-0 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Avatar upload */}
        <div className="flex flex-col items-start">
          <label className="mb-2.5 block text-sm font-medium text-slate-700">Profile Photo</label>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="group relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-slate-200 bg-slate-50 transition-all hover:border-slate-300 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2"
            >
              {avatarPreview ? (
                <img src={avatarPreview} alt="Avatar preview" className="h-full w-full object-cover" />
              ) : (
                <svg className="h-5 w-5 text-slate-400 transition-colors group-hover:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )}
            </button>
            <div className="flex flex-col">
              <button 
                type="button" 
                onClick={() => fileInputRef.current?.click()}
                className="text-sm font-medium text-zinc-900 hover:text-zinc-700 hover:underline underline-offset-4"
              >
                Upload an image
              </button>
              <span className="text-xs text-slate-400">JPG, PNG, GIF or WebP. Max {MAX_AVATAR_SIZE_BYTES / 1024 / 1024}MB.</span>
            </div>
          </div>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
        </div>

        {/* Grid for Name & Username */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="fullName" className="mb-1.5 block text-sm font-medium text-slate-700">Full Name</label>
            <input
              id="fullName"
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="John Doe"
              className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-zinc-900 placeholder-slate-400 transition-all focus:border-zinc-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
            />
          </div>

          <div>
            <label htmlFor="username" className="mb-1.5 block text-sm font-medium text-slate-700">Username</label>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 text-sm">@</span>
              <input
                id="username"
                type="text"
                required
                minLength={3}
                value={username}
                onChange={(e) => setUsername(sanitizeUsername(e.target.value))}
                placeholder="johndoe"
                className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 py-3 pl-9 pr-4 text-sm text-zinc-900 placeholder-slate-400 transition-all focus:border-zinc-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
              />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">Email address</label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-zinc-900 placeholder-slate-400 transition-all focus:border-zinc-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-slate-700">Password</label>
          <input
            id="password"
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-zinc-900 placeholder-slate-400 transition-all focus:border-zinc-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
          />
        </div>

        <div className="pt-1">
          <button
            type="submit"
            disabled={loading}
            className="btn-press flex w-full items-center justify-center rounded-xl bg-zinc-900 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-zinc-900/10 transition-all hover:bg-zinc-800 hover:shadow-xl hover:shadow-zinc-900/15 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none"
          >
            {loading ? (
              <>
                <svg className="mr-2 h-4 w-4 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Creating account...
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </div>
      </form>
    </>
  )
}

export default function SignupPage() {
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
            Build your next great idea.
          </h1>
          <p className="max-w-md text-lg leading-relaxed text-slate-500">
            Join thousands of developers and creators. Experience a beautiful, frictionless workflow designed for scale.
          </p>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex w-full items-center justify-center p-6 sm:p-12 lg:w-1/2">
        <div className="animate-page-enter w-full max-w-[440px]">
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
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">Create an account</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">Enter your details below to get started.</p>
          </div>

          <Suspense fallback={
            <div className="space-y-5 animate-pulse">
              <div className="h-16 w-16 rounded-full bg-slate-100" />
              <div className="h-12 rounded-xl bg-slate-100" />
              <div className="h-12 rounded-xl bg-slate-100" />
              <div className="h-12 rounded-xl bg-slate-100" />
              <div className="h-12 rounded-xl bg-slate-100" />
            </div>
          }>
            <SignupForm />
          </Suspense>

          <p className="mt-8 text-center text-sm text-slate-500">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-zinc-900 transition-colors hover:text-zinc-700 hover:underline underline-offset-4">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}