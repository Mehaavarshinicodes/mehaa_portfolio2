

/**
 * Sits behind all page content (position: fixed, z-0) and gives the
 * otherwise-flat slate-950 background some slow-drifting life:
 * a few soft blurred color blobs, a faint dot-grid, and a subtle
 * grain/noise layer. Everything is pure CSS animation so it's cheap
 * to run continuously.
 */
export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-slate-950 pointer-events-none">
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            'radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Drifting blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[45vw] h-[45vw] max-w-[600px] max-h-[600px] bg-blue-600/20 rounded-full blur-[110px] animate-drift-slow" />
      <div className="absolute top-[30%] right-[-15%] w-[40vw] h-[40vw] max-w-[550px] max-h-[550px] bg-purple-600/15 rounded-full blur-[120px] animate-drift-medium" />
      <div className="absolute bottom-[-15%] left-[20%] w-[50vw] h-[50vw] max-w-[650px] max-h-[650px] bg-sky-500/15 rounded-full blur-[130px] animate-drift-slow" style={{ animationDelay: '-8s' }} />
      <div className="absolute bottom-[10%] right-[10%] w-[25vw] h-[25vw] max-w-[350px] max-h-[350px] bg-cyan-400/10 rounded-full blur-[90px] animate-drift-fast" />

      {/* Vignette to keep edges dark and text readable */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(2,6,23,0.6)_100%)]" />
    </div>
  );
}
