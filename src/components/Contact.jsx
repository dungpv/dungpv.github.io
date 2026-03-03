import { useRef } from 'react'
import { useInView } from '../hooks/useInView'

const SOCIAL_LINKS = [
  {
    label: 'GitHub',
    href: 'https://github.com/dungpv',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    hoverColor: 'hover:text-slate-100 hover:border-slate-400',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/phungvietdung/',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    hoverColor: 'hover:text-sky-400 hover:border-sky-400/50',
  },
  {
    label: 'Email',
    href: 'mailto:vietdungst@gmail.com', // TODO: replace with your email
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    hoverColor: 'hover:text-accent-400 hover:border-accent-400/50',
  },
]

export default function Contact() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { threshold: 0.15 })

  return (
    <section id="contact" className="py-24 bg-surface-900" ref={sectionRef}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className={`mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="section-subheading">04. Connect</p>
          <h2 className="section-heading text-3xl">Get In Touch</h2>
          <div className="w-12 h-0.5 bg-accent-500 mt-3" />
        </div>

        <div className={`max-w-2xl transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-slate-400 text-base leading-relaxed mb-10">
            I'm currently open to senior technical lead and backend engineering opportunities.
            Whether you're a recruiter, a potential collaborator, or just want to talk tech —
            my inbox is always open.
          </p>

          {/* Primary CTA */}
          <a
            href="mailto:vietdungst@gmail.com" // TODO: replace with your email
            className="btn-primary mb-12 w-fit"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Say Hello
          </a>

          {/* Social links */}
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map(({ label, href, icon, hoverColor }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={label}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg
                            border border-slate-700/60 text-slate-500
                            transition-all duration-200 text-sm
                            ${hoverColor}`}
              >
                {icon}
                <span className="hidden sm:inline font-medium">{label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 pt-8 border-t border-slate-800/60">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted font-mono">
          <span>
            &copy; {new Date().getFullYear()} Phùng Việt Dũng. All rights reserved.
          </span>
          <span className="flex items-center gap-1">
            Built with
            <span className="text-accent-400 mx-1">React</span>+
            <span className="text-accent-400 mx-1">Tailwind CSS</span>+
            <span className="text-accent-400 mx-1">Vite</span>
          </span>
        </div>
      </footer>
    </section>
  )
}
