import { useState } from 'react'
import { Masks, RefreshCw } from 'lucide-react'

const BACKEND = import.meta.env.VITE_BACKEND_URL || ''

export default function RoleplayPage() {
  const [system, setSystem] = useState('You are Socrates. Teach by asking questions.')
  const [history, setHistory] = useState([])
  const [input, setInput] = useState('How do I learn faster?')
  const [loading, setLoading] = useState(false)

  const send = async () => {
    const msgs = [
      { role: 'system', content: system },
      ...history,
      { role: 'user', content: input }
    ]
    setHistory([...history, { role: 'user', content: input }])
    setInput('')
    setLoading(true)
    try {
      const r = await fetch(`${BACKEND}/api/ollama/chat`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'llama3.1', messages: msgs }),
      })
      const d = await r.json()
      if (d?.message) setHistory(h => [...h, d.message])
    } finally { setLoading(false) }
  }

  return (
    <div className="pt-20 max-w-5xl mx-auto px-4">
      <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
        <div className="flex gap-2 items-center">
          <Masks size={18} className="text-white/80"/>
          <input value={system} onChange={e=>setSystem(e.target.value)} className="flex-1 bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/50 outline-none focus:border-white/30" />
          <button onClick={()=>setHistory([])} className="px-3 py-2 rounded-xl bg-white/10 text-white"><RefreshCw size={16}/></button>
        </div>
        <div className="mt-3 space-y-2">
          {history.map((m, i)=> (
            <div key={i} className={`px-4 py-2 rounded-xl ${m.role==='user' ? 'bg-blue-500/20 text-white' : 'bg-white/10 text-slate-100'}`}>{m.content}</div>
          ))}
        </div>
        <div className="mt-3 flex gap-2">
          <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=> e.key==='Enter' && send()} className="flex-1 bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/50 outline-none focus:border-white/30" />
          <button onClick={send} className="px-4 py-3 rounded-xl bg-white/10 text-white">Send</button>
        </div>
        {loading && <div className="text-slate-300 text-sm mt-2">Thinking...</div>}
      </div>
    </div>
  )
}
