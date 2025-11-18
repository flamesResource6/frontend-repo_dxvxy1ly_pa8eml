import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ChatPage from './components/ChatPage'
import ResearchPage from './components/ResearchPage'
import PlannerPage from './components/PlannerPage'
import RoleplayPage from './components/RoleplayPage'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_10%,rgba(168,85,247,.12),transparent_60%),radial-gradient(40%_40%_at_80%_60%,rgba(56,189,248,.12),transparent_60%),radial-gradient(30%_30%_at_20%_70%,rgba(253,186,116,.12),transparent_60%)]" />
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
            </>
          }
        />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/research" element={<ResearchPage />} />
        <Route path="/planner" element={<PlannerPage />} />
        <Route path="/roleplay" element={<RoleplayPage />} />
      </Routes>
      <footer className="mt-16 py-10 text-center text-white/60">
        Built for smooth, fluid workflows.
      </footer>
    </div>
  )
}

export default App
