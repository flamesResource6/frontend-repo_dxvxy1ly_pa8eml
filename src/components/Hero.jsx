import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-slate-900/40 to-slate-900 pointer-events-none" />
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white drop-shadow-lg">
          A sleek AI workspace
        </h1>
        <p className="mt-4 text-slate-200/90 text-lg">
          Chat, research, plan and role-play in a single beautiful interface. Smooth, fluid, and fast.
        </p>
      </div>
    </section>
  )
}
