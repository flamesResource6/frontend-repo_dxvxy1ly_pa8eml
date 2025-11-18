import { Link, NavLink } from 'react-router-dom'
import { Bot, MessageSquare, CalendarDays, BookOpen, Sparkles, UserRound } from 'lucide-react'

export default function Navbar() {
  const navItem = ({ to, label, icon: Icon }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `inline-flex items-center gap-2 px-3 py-2 rounded-xl transition-colors ${
          isActive ? 'bg-white/10 text-white' : 'text-white/80 hover:text-white hover:bg-white/5'
        }`}
    >
      <Icon size={18} />
      <span className="hidden sm:inline">{label}</span>
    </NavLink>
  )

  return (
    <header className="fixed top-0 left-0 right-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-slate-900/50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="inline-flex items-center gap-2 text-white">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 via-blue-400 to-orange-300 grid place-items-center">
            <Sparkles size={16} className="text-white" />
          </div>
          <span className="font-semibold tracking-tight">Aether UI</span>
        </Link>
        <nav className="flex items-center gap-2">
          {navItem({ to: '/chat', label: 'Chat', icon: MessageSquare })}
          {navItem({ to: '/research', label: 'Deep Research', icon: BookOpen })}
          {navItem({ to: '/planner', label: 'Weekly Planner', icon: CalendarDays })}
          {navItem({ to: '/roleplay', label: 'Role-play', icon: UserRound })}
        </nav>
      </div>
    </header>
  )
}
