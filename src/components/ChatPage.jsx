import { useEffect, useRef, useState } from 'react'
import { Send, Circle } from 'lucide-react'

const BACKEND = import.meta.env.VITE_BACKEND_URL || ''

export default function ChatPage() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([{ role: 'assistant', content: 'Hello! Ask me anything.' }])
  const [loading, setLoading] = useState(false)
  const listRef = useRef(null)

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  const send = async () => {
    if (!input.trim()) return
    const newMsgs = [...messages, { role: 'user', content: input }]
    setMessages(newMsgs)
    setInput('')
    setLoading(true)
    try {
      const r = await fetch(`${BACKEND}/api/ollama/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'llama3.1', messages: newMsgs }),
      })
      const data = await r.json()
      if (data?.message?.content) setMessages([...newMsgs, data.message])
      else setMessages([...newMsgs, { role: 'assistant', content: 'Model unavailable or error.' }])
    } catch (e) {
      setMessages([...newMsgs, { role: 'assistant', content: 'Failed to reach backend.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-20 max-w-4xl mx-auto px-4">
      <div ref={listRef} className="h-[60vh] overflow-y-auto rounded-2xl bg-white/5 border border-white/10 p-4 space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={`max-w-[85%] rounded-2xl px-4 py-2 ${m.role==='user' ? 'ml-auto bg-blue-500/20 text-white' : 'bg-white/10 text-slate-100'}`}>
            {m.content}
          </div>
        ))}
        {loading && (
          <div className="inline-flex items-center gap-2 text-slate-300">
            <Circle className="animate-pulse" size={10} />
            <Circle className="animate-pulse delay-150" size={10} />
            <Circle className="animate-pulse delay-300" size={10} />
          </div>
        )}
      </div>
      <div className="mt-4 flex gap-2">
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=> e.key==='Enter' && send()} placeholder="Type your message..." className="flex-1 bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/50 outline-none focus:border-white/30" />
        <button onClick={send} className="px-4 py-3 rounded-xl bg-gradient-to-r from-purple-500 via-blue-500 to-orange-400 text-white font-medium inline-flex items-center gap-2">
          <Send size={16}/> Send
        </button>
      </div>
    </div>
  )
}
