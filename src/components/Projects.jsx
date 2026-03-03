import { useRef, useState } from 'react'
import PRDModal from './PRDModal'
import { useInView } from '../hooks/useInView'

const PROJECTS = [
  {
    id: 'edu-db',
    badge: 'Enterprise · Ministry Level',
    badgeColor: 'bg-violet-500/10 text-violet-300 border-violet-500/20',
    title: 'National Education Sector Database',
    subtitle: 'CSDL Ngành GD&ĐT — Ministry of Education & Training',
    techStack: ['SQL Server', 'ASP.NET WebForms', 'Telerik UI'],
    stackColor: 'text-violet-400',
    description:
      'Played a key role in developing and maintaining the centralized educational database for the Ministry and Department of Education and Training. Handled complex enterprise data requirements and large-scale deployments serving thousands of institutions nationwide.',
    highlights: [
      'Managed and coordinated a 15-member technical team ensuring system stability and continuous feature delivery.',
      'Designed high-availability database schemas to handle ministry-scale concurrent load.',
      'Led integration with national educational reporting pipelines.',
    ],
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    iconBg: 'bg-violet-500/10 text-violet-400',
    borderHover: 'hover:border-violet-500/40',
    glowColor: 'rgba(139,92,246,0.08)',
    hasPRD: false,
    hasMetrics: false,
  },
  {
    id: 'timetable',
    badge: 'Engineering Project',
    badgeColor: 'bg-sky-500/10 text-sky-300 border-sky-500/20',
    title: 'Smart School Timetabling System',
    subtitle: 'Constraint-Based Scheduling Engine',
    techStack: ['.NET 8', 'SQL Server', 'Google OR-Tools'],
    stackColor: 'text-sky-400',
    description:
      'Engineered a backend system to automate and optimize complex school scheduling algorithms. Eliminates manual scheduling errors and reduces planning time by ~85% using constraint-based combinatorial optimization.',
    highlights: [
      'Integrated Google OR-Tools CP-SAT solver for hard and soft constraint satisfaction.',
      'Built async RESTful API layer in .NET 8 supporting multi-campus deployments.',
      'Optimized SQL Server schema with covering indexes for high-frequency scheduler queries.',
    ],
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    iconBg: 'bg-sky-500/10 text-sky-400',
    borderHover: 'hover:border-sky-500/40',
    glowColor: 'rgba(14,165,233,0.08)',
    hasPRD: true,
    hasMetrics: false,
    metrics: [
      { label: 'Generation Time', value: '< 30s', sub: 'per 40-class school' },
      { label: 'Hard Constraint', value: '99.5%', sub: 'satisfaction rate' },
      { label: 'Manual Effort Saved', value: '~85%', sub: 'reduction' },
    ],
  },
  {
    id: 'prediction',
    badge: 'ML / AI Project',
    badgeColor: 'bg-accent-500/10 text-accent-300 border-accent-500/20',
    title: 'Student Score Prediction Engine',
    subtitle: 'Predictive Analytics with Agentic AI',
    techStack: ['ML.NET', 'SQL Server', 'Agentic AI'],
    stackColor: 'text-accent-400',
    description:
      'Developed a predictive model using historical student data to forecast academic performance. Achieved industry-grade reliability metrics. Orchestrated the entire development workflow using AI agents (Claude Code & Gemini).',
    highlights: [
      'Feature engineering pipeline extracting meaningful signals from historical grade and attendance data.',
      'Model trained and evaluated with R² > 0.8 and MAE ≈ 0.45 — production-ready accuracy.',
      'Agentic workflow: used Claude Code to scaffold, review, and iterate model code autonomously.',
    ],
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    iconBg: 'bg-accent-500/10 text-accent-400',
    borderHover: 'hover:border-accent-500/40',
    glowColor: 'rgba(14,165,233,0.1)',
    hasPRD: false,
    hasMetrics: true,
    metrics: [
      { label: 'R² Score', value: '> 0.80', sub: 'model accuracy' },
      { label: 'MAE', value: '≈ 0.45', sub: 'mean abs. error' },
      { label: 'Workflow', value: 'Agentic', sub: 'AI-orchestrated' },
    ],
  },
]

function MetricBadge({ label, value, sub }) {
  return (
    <div className="flex flex-col items-center text-center px-4 py-3 rounded-lg bg-surface-900/60 border border-slate-700/40">
      <span className="text-lg font-bold text-slate-100 font-mono">{value}</span>
      <span className="text-[10px] text-muted mt-0.5 uppercase tracking-wider">{label}</span>
      {sub && <span className="text-[10px] text-slate-500 mt-0.5">{sub}</span>}
    </div>
  )
}

function ProjectCard({ project, index, onOpenPRD }) {
  const cardRef = useRef(null)
  const inView = useInView(cardRef, { threshold: 0.1 })

  return (
    <article
      ref={cardRef}
      className={`relative group card ${project.borderHover}
                  transition-all duration-500
                  ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      style={{
        transitionDelay: `${index * 100}ms`,
        '--glow': project.glowColor,
      }}
    >
      {/* Hover glow overlay */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at top left, var(--glow), transparent 60%)` }}
      />

      <div className="relative z-10">
        {/* Card top row */}
        <div className="flex items-start justify-between mb-5">
          <div className={`flex-shrink-0 p-3 rounded-lg ${project.iconBg}`}>
            {project.icon}
          </div>
          <span className={`text-[11px] font-mono px-2.5 py-1 rounded-full border ${project.badgeColor}`}>
            {project.badge}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-slate-100 mb-1 leading-snug">
          {project.title}
        </h3>
        <p className="text-xs text-muted font-mono mb-4">{project.subtitle}</p>

        {/* Description */}
        <p className="text-sm text-slate-400 leading-relaxed mb-5">
          {project.description}
        </p>

        {/* Highlights */}
        <ul className="space-y-2 mb-5">
          {project.highlights.map((h, i) => (
            <li key={i} className="flex items-start gap-2.5 text-xs text-slate-400">
              <span className={`flex-shrink-0 mt-1.5 w-1 h-1 rounded-full ${project.stackColor.replace('text-', 'bg-')}`} />
              <span className="leading-relaxed">{h}</span>
            </li>
          ))}
        </ul>

        {/* Metrics */}
        {(project.hasPRD || project.hasMetrics) && project.metrics && (
          <div className="grid grid-cols-3 gap-2 mb-5">
            {project.metrics.map(m => (
              <MetricBadge key={m.label} {...m} />
            ))}
          </div>
        )}

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.techStack.map(t => (
            <span
              key={t}
              className={`text-[11px] font-mono px-2 py-0.5 rounded bg-surface-900/60 border border-slate-700/50 ${project.stackColor}`}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Actions */}
        {project.hasPRD && (
          <button
            onClick={onOpenPRD}
            className="btn-primary w-full justify-center text-xs py-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            View PRD
          </button>
        )}
      </div>
    </article>
  )
}

export default function Projects() {
  const [prdOpen, setPrdOpen] = useState(false)
  const sectionRef = useRef(null)
  const headerInView = useInView(sectionRef, { threshold: 0.05 })

  return (
    <section id="projects" className="py-24 bg-surface-950 relative" ref={sectionRef}>
      {/* Subtle grid bg */}
      <div className="absolute inset-0 bg-grid-dark opacity-50 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className={`mb-14 transition-all duration-700 ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="section-subheading">03. Work</p>
          <h2 className="section-heading text-3xl">Featured Projects & Experience</h2>
          <div className="w-12 h-0.5 bg-accent-500 mt-3" />
        </div>

        {/* Project cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onOpenPRD={() => setPrdOpen(true)}
            />
          ))}
        </div>
      </div>

      {/* PRD Modal */}
      {prdOpen && <PRDModal onClose={() => setPrdOpen(false)} />}
    </section>
  )
}
