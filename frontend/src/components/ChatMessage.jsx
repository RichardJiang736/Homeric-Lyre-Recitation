import AudioPlayer from './AudioPlayer'

const userBubble = 'ml-auto rounded-[16px_16px_4px_16px]'
const aiBubble = 'mr-auto rounded-[16px_16px_16px_4px]'

export default function ChatMessage({ message }) {
  const { role, text, audioUrl, isLoading, statusText } = message
  const isUser = role === 'user'

  return (
    <div className={`max-w-[75%] ${isUser ? 'ml-auto' : 'mr-auto'}`}>
      <div
        className={`px-5 py-3.5 bg-warm-surface/80 ${isUser ? userBubble : aiBubble}`}
      >
        <p
          className="font-[family-name:var(--font-body)] text-[15px] font-light leading-relaxed tracking-[0.04em] text-walnut/90"
        >
          {text}
        </p>

        {!isUser && isLoading && (
          <div className="mt-3 flex items-center gap-2">
            <span className="font-[family-name:var(--font-body)] text-xs font-light tracking-wider text-stone">
              {statusText || 'Weaving the melody'}
            </span>
            <span className="flex gap-1">
              <span className="h-0.5 w-0.5 animate-pulse rounded-full bg-aegean/60 [animation-delay:0ms]" />
              <span className="h-0.5 w-0.5 animate-pulse rounded-full bg-aegean/60 [animation-delay:200ms]" />
              <span className="h-0.5 w-0.5 animate-pulse rounded-full bg-aegean/60 [animation-delay:400ms]" />
            </span>
          </div>
        )}

        {!isUser && audioUrl && !isLoading && (
          <AudioPlayer audioUrl={audioUrl} />
        )}
      </div>

      {/* Subtle role label */}
      <span className="mt-1.5 block font-[family-name:var(--font-body)] text-[11px] font-light tracking-[0.06em] text-stone/50">
        {isUser ? 'you' : 'the lyre'}
      </span>
    </div>
  )
}
