import { useEffect, useState } from 'react'

export default function Hero() {
  const [SplineComp, setSplineComp] = useState(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const mod = await import('@splinetool/react-spline')
        if (!mounted) return
        setSplineComp(() => mod.default)
      } catch (e) {
        console.error('Failed to load Spline component', e)
        if (mounted) setFailed(true)
      }
    })()
    return () => { mounted = false }
  }, [])

  const Spline = SplineComp

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        {!failed && Spline ? (
          <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        ) : (
          <div className="w-full h-full bg-[radial-gradient(60%_60%_at_50%_10%,rgba(168,85,247,.2),transparent_60%),radial-gradient(40%_40%_at_80%_60%,rgba(56,189,248,.2),transparent_60%),radial-gradient(30%_30%_at_20%_70%,rgba(253,186,116,.2),transparent_60%)]" />
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-slate-900/40 to-slate-900 pointer-events-none" />
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white drop-shadow-lg">
          A sleek AI workspace
        </h1>
        <p className="mt-4 text-slate-200/90 text-lg">
          Chat, research, plan and role-play in a single beautiful interface. Smooth, fluid, and fast.
        </p>
        {failed && (
          <p className="mt-4 text-orange-200/90 text-sm">Interactive scene failed to load. Showing a static background instead.</p>
        )}
      </div>
    </section>
  )
}
