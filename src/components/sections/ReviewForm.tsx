'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'

interface ReviewFormProps {
  beanId: string
  beanName: string
}

export function ReviewForm({ beanId, beanName }: ReviewFormProps) {
  const [name, setName] = useState('')
  const [rating, setRating] = useState(0)
  const [text, setText] = useState('')
  const [hoveredStar, setHoveredStar] = useState(0)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || rating === 0 || !text.trim()) return

    setStatus('submitting')
    const supabase = createClient()
    const { error } = await supabase.from('reviews').insert([{
      bean_id: beanId,
      reviewer_name: name.trim(),
      rating,
      review_text: text.trim(),
    }])

    if (!error) {
      setStatus('success')
      setName('')
      setRating(0)
      setText('')
    } else {
      setStatus('error')
      setErrorMsg(error.message ?? 'Failed to submit review. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
        <div className="text-3xl mb-2">✅</div>
        <p className="font-semibold text-green-800">Thanks for your review!</p>
        <p className="text-sm text-green-700 mt-1">
          Your thoughts on {beanName} have been submitted.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-3 text-sm text-green-700 underline hover:text-green-900"
        >
          Write another review
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[var(--color-bg)] rounded-xl border border-[var(--color-border)] p-6">
      <h3 className="font-display font-semibold text-[var(--color-text)] text-lg mb-5">
        Share your thoughts on {beanName}
      </h3>

      {/* Name */}
      <div className="mb-4">
        <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)] mb-1.5">
          Your Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. CoffeeLover42"
          required
          className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2.5 text-sm text-[var(--color-text)] placeholder-[var(--color-muted)] outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-opacity-30 transition-all"
        />
      </div>

      {/* Rating */}
      <div className="mb-4">
        <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)] mb-2">
          Rating <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredStar(star)}
              onMouseLeave={() => setHoveredStar(0)}
              className="text-2xl transition-transform hover:scale-110"
            >
              <span className={star <= (hoveredStar || rating) ? 'text-amber-500' : 'text-gray-300'}>
                ★
              </span>
            </button>
          ))}
          {rating > 0 && (
            <span className="ml-2 text-sm text-[var(--color-muted)] font-mono self-center">
              {['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent'][rating]}
            </span>
          )}
        </div>
      </div>

      {/* Review text */}
      <div className="mb-5">
        <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)] mb-1.5">
          Your Review
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What did you taste? How did you brew it? Would you recommend it?"
          required
          rows={4}
          className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2.5 text-sm text-[var(--color-text)] placeholder-[var(--color-muted)] outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-opacity-30 transition-all resize-none"
        />
      </div>

      {status === 'error' && (
        <p className="text-sm text-red-600 mb-4 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={!name.trim() || rating === 0 || !text.trim() || status === 'submitting'}
        className="w-full py-3 rounded-lg bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'submitting' ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  )
}
