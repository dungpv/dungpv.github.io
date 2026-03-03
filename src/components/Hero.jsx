import { useEffect, useRef } from 'react'

export default function Hero() {
  const canvasRef = useRef(null)

  // Subtle animated particle grid effect
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.25,
      dy: (Math.random() - 0.5) * 0.25,
      alpha: Math.random() * 0.4 + 0.1,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x += p.dx
        p.y += p.dy
        if (p.x < 0 || p.x > canvas.width)  p.dx *= -1
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(56,189,248,${p.alpha})`
        ctx.fill()
      })
      // Draw faint connecting lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(56,189,248,${0.06 * (1 - dist / 120)})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-surface-950"
    >
      {/* Animated canvas background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Radial glow behind content */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                   w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.07) 0%, transparent 70%)' }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Eyebrow label */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                     border border-accent-500/30 bg-accent-500/5 text-accent-400
                     text-xs font-mono tracking-widest mb-8
                     opacity-0 animate-fade-up animate-delay-100"
          style={{ animationFillMode: 'forwards' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent-400 animate-pulse" />
          Available for Senior / Lead Roles
        </div>

        {/* Name */}
        <h1
          className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-4
                     opacity-0 animate-fade-up animate-delay-200"
          style={{ animationFillMode: 'forwards' }}
        >
          {/* Replace with your name */}
          <span className="text-gradient">Phùng Việt Dũng</span>
        </h1>

        {/* Headline */}
        <p
          className="text-lg sm:text-xl md:text-2xl text-slate-400 font-light tracking-wide mb-6
                     opacity-0 animate-fade-up animate-delay-300"
          style={{ animationFillMode: 'forwards' }}
        >
          Technical Lead &nbsp;·&nbsp; Backend &amp; Database Engineer &nbsp;·&nbsp; AI Integrator
        </p>

        {/* Bio */}
        <p
          className="max-w-2xl mx-auto text-slate-400 text-base leading-relaxed mb-10
                     opacity-0 animate-fade-up animate-delay-400"
          style={{ animationFillMode: 'forwards' }}
        >
          Experienced Technical Lead and Database Engineer with a proven track record of managing a{' '}
          <span className="text-slate-200 font-medium">15-member engineering team</span>. Passionate about
          building high-performance architectures, modernizing enterprise systems, and leveraging{' '}
          <span className="text-accent-400 font-medium">Machine Learning &amp; Agentic Workflows</span>{' '}
          to solve complex, large-scale problems.
        </p>

        {/* CTA buttons */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4
                     opacity-0 animate-fade-up animate-delay-500"
          style={{ animationFillMode: 'forwards' }}
        >
          <a href="#projects" className="btn-primary">
            View My Work
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a href="#contact" className="btn-ghost">
            Get in Touch
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted">
          <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
          <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  )
}
