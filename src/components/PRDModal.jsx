import { useEffect } from 'react'

const PRD_SECTIONS = [
  {
    title: 'Overview',
    content:
      'The Smart School Timetabling System automates the generation of conflict-free, optimized school schedules using constraint-based algorithms. It replaces the manual, error-prone scheduling process at scale across multiple schools and academic years.',
  },
  {
    title: 'Core Engine: Constraint-Based Scheduling',
    items: [
      'Hard constraints: Teacher availability, room capacity, subject-hour quotas, no consecutive clashes.',
      'Soft constraints: Teacher preference windows, balanced daily workload, room utilization efficiency.',
      'Solver: Google OR-Tools (CP-SAT) integrated via .NET 8 for high-performance combinatorial optimization.',
      'Conflict resolution engine detects and auto-resolves scheduling violations before output is committed.',
    ],
  },
  {
    title: 'Backend Architecture (.NET 8)',
    items: [
      'RESTful API layer exposing endpoints for schedule generation, management, and export.',
      'Async job queue for long-running solver tasks — prevents request timeouts on large datasets.',
      'Modular service pattern: SchedulerService, ConflictResolverService, ExportService.',
      'JWT-based authentication; role-based access for Admin, School Manager, Teacher.',
    ],
  },
  {
    title: 'Data Layer (SQL Server)',
    items: [
      'Optimized schema: normalized tables for Teachers, Subjects, Rooms, TimeSlots, and Constraints.',
      'Indexed foreign keys and covering indexes for high-frequency scheduler queries.',
      'Stored procedures for bulk schedule insertion with transaction safety.',
      'Audit trail table capturing every schedule mutation with timestamp and user context.',
    ],
  },
  {
    title: 'Key Metrics & Outcomes',
    items: [
      'Schedule generation time: < 30 seconds for a 40-class school.',
      'Constraint satisfaction rate: > 99.5% hard constraint compliance.',
      'Reduced manual scheduling effort by ~85% compared to previous approach.',
      'Supports multi-campus deployments with isolated data tenants.',
    ],
  },
]

export default function PRDModal({ onClose }) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="PRD: Smart School Timetabling System"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal panel */}
      <div
        className="relative z-10 w-full max-w-3xl max-h-[85vh] flex flex-col
                   bg-surface-850 border border-slate-700/60 rounded-2xl shadow-2xl
                   overflow-hidden animate-fade-up"
        style={{ animationDuration: '0.3s', animationFillMode: 'forwards' }}
      >
        {/* Header */}
        <div className="flex items-start justify-between px-8 py-6 border-b border-slate-700/50">
          <div>
            <span className="text-xs font-mono text-accent-400 tracking-widest uppercase">
              Product Requirements Document
            </span>
            <h2 className="text-xl font-semibold text-slate-100 mt-1">
              Smart School Timetabling System
            </h2>
            <div className="flex flex-wrap gap-2 mt-3">
              {['.NET 8', 'SQL Server', 'Google OR-Tools', 'RESTful API'].map(t => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 ml-4 p-2 rounded-lg text-slate-400
                       hover:text-slate-100 hover:bg-slate-700/50 transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto px-8 py-6 space-y-8 flex-1">
          {PRD_SECTIONS.map(({ title, content, items }) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-accent-400 uppercase tracking-widest mb-3 font-mono">
                {title}
              </h3>
              {content && (
                <p className="text-slate-300 text-sm leading-relaxed">{content}</p>
              )}
              {items && (
                <ul className="space-y-2.5">
                  {items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                      <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-accent-500" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-8 py-4 border-t border-slate-700/50 bg-surface-900/40 flex items-center justify-between">
          <span className="text-xs text-muted font-mono">PRD v1.0 · Confidential</span>
          <button onClick={onClose} className="btn-ghost text-xs py-1.5 px-4">
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
