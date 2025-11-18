import { useEffect, useState } from 'react'
import { CalendarPlus } from 'lucide-react'

const BACKEND = import.meta.env.VITE_BACKEND_URL || ''

export default function PlannerPage() {
  const [title, setTitle] = useState('My Weekly Plan')
  const [weekStart, setWeekStart] = useState(new Date().toISOString().slice(0,10))
  const [items, setItems] = useState([
    { day: 'Monday', tasks: ['Focus work block', 'Workout'] },
    { day: 'Tuesday', tasks: [] },
    { day: 'Wednesday', tasks: [] },
    { day: 'Thursday', tasks: [] },
    { day: 'Friday', tasks: [] },
    { day: 'Saturday', tasks: [] },
    { day: 'Sunday', tasks: [] },
  ])
  const [saved, setSaved] = useState([])

  const addTask = (i) => {
    const t = prompt('New task')
    if (!t) return
    const next = [...items]
    next[i].tasks.push(t)
    setItems(next)
  }

  const save = async () => {
    const r = await fetch(`${BACKEND}/api/plans`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, week_start: weekStart, items })
    })
    await r.json()
    load()
  }

  const load = async () => {
    const r = await fetch(`${BACKEND}/api/plans`)
    const d = await r.json()
    setSaved(d.items || [])
  }

  useEffect(() => { load() }, [])

  return (
    <div className="pt-20 max-w-6xl mx-auto px-4">
      <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
        <div className="grid sm:grid-cols-3 gap-3">
          <input value={title} onChange={e=>setTitle(e.target.value)} className="bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/50 outline-none focus:border-white/30" />
          <input type="date" value={weekStart} onChange={e=>setWeekStart(e.target.value)} className="bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-white/30" />
          <button onClick={save} className="px-4 py-3 rounded-xl bg-white/10 text-white inline-flex items-center gap-2 justify-center"><CalendarPlus size={16}/> Save plan</button>
        </div>
        <div className="mt-4 grid md:grid-cols-2 gap-3">
          {items.map((d, i) => (
            <div key={i} className="rounded-xl bg-white/5 border border-white/10 p-4">
              <div className="flex items-center justify-between">
                <div className="text-white font-medium">{d.day}</div>
                <button onClick={()=>addTask(i)} className="text-xs text-white/70 underline">Add task</button>
              </div>
              <ul className="mt-2 list-disc list-inside text-slate-200">
                {d.tasks.map((t, idx) => (<li key={idx}>{t}</li>))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <h3 className="mt-8 mb-3 text-slate-200 font-semibold">Saved plans</h3>
      <div className="grid sm:grid-cols-2 gap-3">
        {saved.map((it) => (
          <div key={it._id} className="rounded-xl bg-white/5 border border-white/10 p-4">
            <div className="text-white font-medium">{it.title}</div>
            <div className="text-slate-300 text-sm">Week of {it.week_start}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
