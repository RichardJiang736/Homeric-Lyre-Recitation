import { useState, useRef, useEffect } from 'react'
import Header from './components/Header'
import ChatMessage from './components/ChatMessage'
import PromptInput from './components/PromptInput'

let messageId = 0

export default function App() {
  const [messages, setMessages] = useState([])
  const [isGenerating, setIsGenerating] = useState(false)
  const chatEndRef = useRef(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSubmit = async (prompt) => {
    const userMsg = { id: ++messageId, role: 'user', text: prompt }
    const aiMsg = { id: ++messageId, role: 'assistant', text: prompt, isLoading: true, statusText: null }

    setMessages((prev) => [...prev, userMsg, aiMsg])
    setIsGenerating(true)

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      })

      if (!res.ok) throw new Error('Generation failed')

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop()

        let eventType = ''
        for (const line of lines) {
          if (line.startsWith('event: ')) {
            eventType = line.slice(7).trim()
          } else if (line.startsWith('data: ')) {
            const data = JSON.parse(line.slice(6))

            if (eventType === 'status') {
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === aiMsg.id ? { ...m, statusText: data.message } : m,
                ),
              )
            } else if (eventType === 'result') {
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === aiMsg.id
                    ? { ...m, isLoading: false, statusText: null, audioUrl: data.audio_url }
                    : m,
                ),
              )
            } else if (eventType === 'error') {
              throw new Error(data.message)
            }
          }
        }
      }
    } catch (err) {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === aiMsg.id
            ? { ...m, isLoading: false, statusText: null, text: `${m.text}\n\nSorry, the lyre strings faltered: ${err.message}` }
            : m,
        ),
      )
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="lyre-strings relative min-h-screen">
      <Header />

      <main className="mx-auto max-w-[640px] px-6 pb-48">
        {messages.length === 0 && (
          <div className="py-32 text-center">
            <p className="font-[family-name:var(--font-display)] text-xl italic font-normal tracking-wide text-stone/40">
              Speak your scene, and the lyre shall answer...
            </p>
          </div>
        )}

        <div className="flex flex-col gap-8">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
        </div>

        <div ref={chatEndRef} />
      </main>

      <PromptInput onSubmit={handleSubmit} disabled={isGenerating} />
    </div>
  )
}
