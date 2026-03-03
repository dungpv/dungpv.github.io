import { useEffect, useRef, useState } from 'react'

const SKILL_DOMAINS = [
  {
    domain: 'Leadership & Management',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    color: 'from-violet-500/20 to-violet-500/5',
    borderColor: 'border-violet-500/30',
    tagColor: 'bg-violet-500/10 text-violet-300 border-violet-500/20',
    iconColor: 'text-violet-400',
    skills: [
      'Technical Team Management (15+ personnel)',
      'Project Delivery',
      'Mentoring & Coaching',
      'Cross-functional Coordination',
    ],
  },
  {
    domain: 'Database & Architecture',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
    color: 'from-emerald-500/20 to-emerald-500/5',
    borderColor: 'border-emerald-500/30',
    tagColor: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
    iconColor: 'text-emerald-400',
    skills: [
      'SQL Server (Always On AG)',
      'Performance Tuning',
      'DBA & Administration',
      'High Availability Design',
    ],
  },
  {
    domain: 'Backend Engineering',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    color: 'from-sky-500/20 to-sky-500/5',
    borderColor: 'border-sky-500/30',
    tagColor: 'bg-sky-500/10 text-sky-300 border-sky-500/20',
    iconColor: 'text-sky-400',
    skills: [
      '.NET 8',
      'C#',
      'RESTful API Design',
      'Microservices Patterns',
    ],
  },
  {
    domain: 'Frontend & Enterprise UI',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    color: 'from-orange-500/20 to-orange-500/5',
    borderColor: 'border-orange-500/30',
    tagColor: 'bg-orange-500/10 text-orange-300 border-orange-500/20',
    iconColor: 'text-orange-400',
    skills: [
      'ASP.NET WebForms',
      'Telerik UI Suite',
      'Enterprise Dashboard Design',
    ],
  },
  {
    domain: 'AI & Optimization',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    color: 'from-accent-500/20 to-accent-500/5',
    borderColor: 'border-accent-500/30',
    tagColor: 'bg-accent-500/10 text-accent-400 border-accent-500/20',
    iconColor: 'text-accent-400',
    skills: [
      'ML.NET',
      'Google OR-Tools',
      'Agentic Workflows',
      'Claude Code · Gemini',
      'Predictive Modeling',
    ],
  },
]

function useInView(ref, options = {}) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true)
        observer.disconnect()
      }
    }, { threshold: 0.1, ...options })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref])
  return inView
}

export default function Skills() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef)

  return (
    <section id="skills" className="py-24 bg-surface-900" ref={sectionRef}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className={`mb-14 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="section-subheading">02. Expertise</p>
          <h2 className="section-heading text-3xl">Technical Skills</h2>
          <div className="w-12 h-0.5 bg-accent-500 mt-3" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILL_DOMAINS.map(({ domain, icon, color, borderColor, tagColor, iconColor, skills }, i) => (
            <div
              key={domain}
              className={`relative overflow-hidden rounded-xl border ${borderColor}
                          bg-gradient-to-br ${color} p-6 group
                          transition-all duration-500 hover:scale-[1.02]
                          hover:shadow-[0_8px_40px_rgba(0,0,0,0.4)]
                          ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Domain header */}
              <div className="flex items-center gap-3 mb-5">
                <span className={`${iconColor} flex-shrink-0`}>{icon}</span>
                <h3 className="text-sm font-semibold text-slate-200 tracking-wide">{domain}</h3>
              </div>

              {/* Skill tags */}
              <div className="flex flex-wrap gap-2">
                {skills.map(skill => (
                  <span
                    key={skill}
                    className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono
                                border ${tagColor} transition-all duration-200
                                group-hover:scale-100`}
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Decorative corner glow */}
              <div className={`absolute -bottom-8 -right-8 w-24 h-24 rounded-full
                               opacity-20 blur-xl ${iconColor.replace('text-', 'bg-')}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
