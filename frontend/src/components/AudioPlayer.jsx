import { useRef, useState, useEffect, useCallback } from 'react'

function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function AudioPlayer({ audioUrl }) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [loading, setLoading] = useState(true)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

  const togglePlay = useCallback(() => {
    if (!audioRef.current || loading) return
    if (playing) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setPlaying(!playing)
  }, [playing, loading])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onLoaded = () => {
      setLoading(false)
      setDuration(audio.duration)
    }
    const onTime = () => setCurrentTime(audio.currentTime)
    const onEnd = () => setPlaying(false)

    audio.addEventListener('loadedmetadata', onLoaded)
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('ended', onEnd)

    return () => {
      audio.removeEventListener('loadedmetadata', onLoaded)
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('ended', onEnd)
    }
  }, [audioUrl])

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div className="mt-3 flex items-center gap-3">
      <audio ref={audioRef} src={audioUrl} preload="metadata" className="hidden" />

      {/* Play/Pause toggle */}
      <button
        onClick={togglePlay}
        disabled={loading}
        className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-hairline transition-colors duration-300 hover:border-aegean disabled:cursor-default"
        aria-label={loading ? 'Loading audio' : playing ? 'Pause' : 'Play'}
      >
        {loading ? (
          <>
            <span className="ripple-loader" />
            <span className="ripple-loader" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-aegean/60" />
          </>
        ) : playing ? (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <rect x="1" y="1" width="3.5" height="10" rx="0.5" fill="currentColor" className="text-aegean" />
            <rect x="7.5" y="1" width="3.5" height="10" rx="0.5" fill="currentColor" className="text-aegean" />
          </svg>
        ) : (
          <svg width="12" height="14" viewBox="0 0 10 12" fill="none" className="ml-0.5">
            <path d="M0 0L10 6L0 12V0Z" fill="currentColor" className="text-aegean" />
          </svg>
        )}
      </button>

      {/* Progress bar + time */}
      <div className="flex flex-1 items-center gap-2">
        <div className="relative h-px flex-1 bg-hairline">
          <div
            className="absolute inset-y-0 left-0 bg-aegean transition-[width] duration-200 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="font-[family-name:var(--font-body)] text-xs font-light tracking-wider text-stone tabular-nums min-w-[32px]">
          {loading ? '--:--' : formatTime(currentTime)}
        </span>
      </div>
    </div>
  )
}
