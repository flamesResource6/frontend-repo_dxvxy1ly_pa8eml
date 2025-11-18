import { useEffect, useState } from 'react'
import { Search, Save } from 'lucide-react'

const BACKEND = import.meta.env.VITE_BACKEND_URL || ''

export default function ResearchPage() {
  const [topic, setTopic] = useState('AI agents for productivity')
  const [summary, setSummary] = useState('')
  const [items, setItems] = useState([])

  const run = async () => {
    if (!topic.trim()) return
    setSummary('Generating...')
    try {
      const r = await fetch(`${BACKEND}/api/ollama/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'llama3.1', prompt: `Give a concise brief about: ${topic}` }),
      })
      const data = await r.json()
      setSummary(data.text || 'No response')
    } catch (e) {
      setSummary('Backend not reachable')
    }
  }

  const save = async () => {
    if (!summary) return
    const r = await fetch(`${BACKEND}/api/research`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, summary })
    })
    const d = await r.json()
    load()
  }

  const load = async () => {
    const r = await fetch(`${BACKEND}/api/research`)
    const d = await r.json()
    setItems(d.items || [])
  }

  useEffect(() => { load() }, [])

  return (
    <div className="pt-20 max-w-5xl mx-auto px-4">
      <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
        <div className="flex gap-2">
          <input value={topic} onChange={e=>setTopic(e.target.value)} className="flex-1 bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/50 outline-none focus:border-white/30" />
          <button onClick={run} className="px-4 py-3 rounded-xl bg-white/10 text-white inline-flex items-center gap-2"><Search size={16}/> Research</button>
          <button onClick={save} className="px-4 py-3 rounded-xl bg-white/10 text-white inline-flex items-center gap-2"><Save size={16}/> Save</button>
        </div>
        <p className="mt-3 text-slate-200 whitespace-pre-wrap">{summary}</p>
      </div>

      <h3 className="mt-8 mb-3 text-slate-200 font-semibold">Saved briefs</h3>
      <div className="grid sm:grid-cols-2 gap-3">
        {items.map((it) => (
          <div key={it._id} className="rounded-xl bg-white/5 border border-white/10 p-4">
            <div className="text-white font-medium">{it.topic}</div>
            <div className="text-slate-300 text-sm whitespace-pre-wrap mt-2">{it.summary}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
