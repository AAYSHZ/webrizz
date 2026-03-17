'use client'

import { useTransition } from 'react'
import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface DeleteButtonProps {
  id: string
  action: (id: string) => Promise<{ success: boolean }>
  type: 'user' | 'reel'
}

export default function DeleteButton({ id, action, type }: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete this ${type}? This action cannot be undone.`)) {
      startTransition(async () => {
        try {
          await action(id)
          router.refresh()
        } catch (error) {
          alert(`Failed to delete ${type}.`)
        }
      })
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className={`rounded-lg p-2 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600 focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ${
        isPending ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      aria-label={`Delete ${type}`}
    >
      <Trash2 className="h-5 w-5" />
    </button>
  )
}
