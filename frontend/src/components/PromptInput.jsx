import { useState, useRef, useEffect } from 'react'

export default function PromptInput({ onSubmit, disabled }) {
  const [value, setValue] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.focus()
    }
  }, [disabled])

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = value.trim()
    if (!trimmed || disabled) return
    onSubmit(trimmed)
    setValue('')
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-10">
      <div className="h-32 bg-gradient-to-t from-ivory via-ivory/95 to-transparent" />

      <div className="bg-ivory/90 backdrop-blur-xl pb-12 pt-2">
        <form onSubmit={handleSubmit} className="mx-auto max-w-[640px] px-6">
          <div
            className="flex items-center gap-3 rounded-2xl border border-hairline bg-warm-surface/60 px-5 py-3.5 shadow-sm transition-shadow duration-300 focus-within:border-aegean/40 focus-within:shadow-md focus-within:bg-warm-surface/90"
          >
            <input
              ref={inputRef}
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              disabled={disabled}
              placeholder="Describe a scene, a mood, a mode..."
              className="flex-1 border-none bg-transparent font-[family-name:var(--font-body)] text-[15px] font-light tracking-[0.04em] text-walnut placeholder:text-stone/50 focus:outline-none disabled:opacity-40"
            />
            <button
              type="submit"
              disabled={disabled || !value.trim()}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-hairline bg-warm-surface text-aegean/70 transition-all duration-300 hover:border-aegean hover:bg-aegean/10 hover:text-aegean disabled:opacity-30 disabled:cursor-default"
              aria-label="Send"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
