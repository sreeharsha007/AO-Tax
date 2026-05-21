import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'

const STATUS_STYLES = {
  'Needs approval':  'bg-amber-100 text-amber-700',
  'Ready to submit': 'bg-purple-100 text-purple-700',
  'In review':       'bg-blue-100 text-blue-600',
  'In progress':     'bg-blue-50 text-blue-500',
  'Not started':     'bg-gray-100 text-gray-500',
  'Walkout':         'bg-orange-100 text-orange-600',
  'Filed':           'bg-emerald-100 text-emerald-700',
}

// Priority order for the mobile hero card (most actionable first)
const PRIORITY = {
  'Needs approval': 1, 'Ready to submit': 2, 'In progress': 3,
  'Not started': 4, 'Walkout': 5, 'Filed': 6,
}

const heroLabel = (status) => {
  if (status === 'Needs approval') return 'ACTION NEEDED'
  if (status === 'Ready to submit') return 'READY TO FILE'
  if (status === 'Not started')     return 'START FILING'
  return 'ACTIVE FILING'
}

const ctaLabel = (status) => {
  if (status === 'Needs approval')  return 'Review now'
  if (status === 'Ready to submit') return 'Submit filing'
  if (status === 'In progress')     return 'Continue filing'
  if (status === 'Not started')     return 'Start filing'
  return null
}

const TICKETS = [
  {
    id: '#467503',
    service: 'IT Filing Services',
    type: 'IT Filing',
    year: '2025',
    status: 'Not started',
    completed: false,
    updated: 'May 21, 2025 · 10:30 AM',
    updatedTs: 20250521,
    progress: 0,
    total: 5,
    href: '/tickets/467501',
  },
  {
    id: '#467504',
    service: 'IT Filing Services',
    type: 'IT Filing',
    year: '2025',
    status: 'In progress',
    completed: false,
    updated: 'May 22, 2025 · 2:45 PM',
    updatedTs: 20250522,
    progress: 1,
    total: 5,
    href: '/tickets/467501?demo=profile',
  },
  {
    id: '#467502',
    service: 'IT Filing Services',
    type: 'IT Filing',
    year: '2025',
    status: 'Needs approval',
    completed: false,
    updated: 'May 20, 2025 · 9:15 AM',
    updatedTs: 20250520,
    progress: 3,
    total: 5,
    href: '/tickets/467501?demo=step3',
  },
  {
    id: '#467501',
    service: 'IT Filing Services',
    type: 'IT Filing',
    year: '2025',
    status: 'Ready to submit',
    completed: false,
    updated: 'May 15, 2025 · 11:42 AM',
    updatedTs: 20250515,
    progress: 2,
    total: 5,
    href: '/tickets/467501?demo=complete',
  },
  {
    id: '#467400',
    service: 'IT Filing Services',
    type: 'IT Filing',
    year: '2024',
    status: 'Filed',
    completed: true,
    updated: 'Apr 22, 2024 · 3:10 PM',
    updatedTs: 20240422,
    progress: 6,
    total: 6,
    href: null,
  },
]

const YEARS = ['All years', '2025', '2024']
const TYPES = ['All types', 'IT Filing']

export default function MyTickets() {
  const [year, setYear]                   = useState('All years')
  const [type, setType]                   = useState('All types')
  const [showCompleted, setShowCompleted] = useState(false)
  const navigate = useNavigate()

  const visible = TICKETS
    .filter(t => {
      if (!showCompleted && t.completed) return false
      if (year !== 'All years' && t.year !== year) return false
      if (type !== 'All types' && t.type !== type) return false
      return true
    })
    .sort((a, b) => b.updatedTs - a.updatedTs)

  // Mobile: sort by priority (most actionable = hero)
  const mobileCards = [...visible].sort((a, b) => (PRIORITY[a.status] ?? 9) - (PRIORITY[b.status] ?? 9))
  const heroCard  = mobileCards[0]
  const restCards = mobileCards.slice(1)

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-900 text-sm">My filings</h3>
          <p className="text-xs text-gray-400 mt-0.5">Service requests with AOTax</p>
        </div>
      </div>

      {/* Filters row */}
      <div className="flex items-center gap-2 mb-4">
        <div className="relative">
          <select
            value={year}
            onChange={e => setYear(e.target.value)}
            className="appearance-none text-[11px] font-medium pl-2.5 pr-6 py-1 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors cursor-pointer outline-none"
          >
            {YEARS.map(y => <option key={y}>{y}</option>)}
          </select>
          <ChevronDown size={10} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>

        <div className="relative">
          <select
            value={type}
            onChange={e => setType(e.target.value)}
            className="appearance-none text-[11px] font-medium pl-2.5 pr-6 py-1 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors cursor-pointer outline-none"
          >
            {TYPES.map(t => <option key={t}>{t}</option>)}
          </select>
          <ChevronDown size={10} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>

        {/* Mobile: pill toggle */}
        <button
          onClick={() => setShowCompleted(v => !v)}
          className={`md:hidden text-[11px] font-medium px-2.5 py-1 rounded-full transition-colors ${
            showCompleted ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Show completed
        </button>
        {/* Desktop: switch toggle */}
        <label className="hidden md:flex items-center gap-2 cursor-pointer select-none ml-auto">
          <span className="text-[11px] font-medium text-gray-500">Show completed</span>
          <div
            onClick={() => setShowCompleted(v => !v)}
            className={`w-7 h-4 rounded-full transition-colors relative flex-shrink-0 ${
              showCompleted ? 'bg-gray-900' : 'bg-gray-200'
            }`}
          >
            <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow-sm transition-all ${
              showCompleted ? 'left-3.5' : 'left-0.5'
            }`} />
          </div>
        </label>
      </div>

      {/* ── Mobile card view ── */}
      <div className="md:hidden space-y-2.5">
        {visible.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-8">No filings found.</p>
        ) : (
          <>
            {/* Hero card — most actionable filing */}
            {heroCard && (
              <div className="rounded-2xl border border-gray-200 p-4 bg-white">
                <div className="flex items-start justify-between mb-3 gap-3">
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold text-gray-400 tracking-widest mb-1">
                      {heroLabel(heroCard.status)}
                    </p>
                    {heroCard.href ? (
                      <button
                        onClick={() => navigate(heroCard.href)}
                        className="text-base font-bold text-gray-900 hover:text-blue-600 transition-colors text-left leading-tight"
                      >
                        {heroCard.id}
                      </button>
                    ) : (
                      <p className="text-base font-bold text-gray-900 leading-tight">{heroCard.id}</p>
                    )}
                    <p className="text-xs text-gray-400 mt-0.5">{heroCard.service} · {heroCard.year}</p>
                  </div>
                  <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full flex-shrink-0 mt-0.5 ${STATUS_STYLES[heroCard.status] ?? 'bg-gray-100 text-gray-500'}`}>
                    {heroCard.status}
                  </span>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] text-gray-400">Filing progress</span>
                    <span className="text-[11px] font-semibold text-gray-600">{heroCard.progress} of {heroCard.total} steps</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${heroCard.completed ? 'bg-emerald-400' : 'bg-blue-500'}`}
                      style={{ width: `${(heroCard.progress / heroCard.total) * 100}%` }}
                    />
                  </div>
                </div>

                {heroCard.href && ctaLabel(heroCard.status) && (
                  <button
                    onClick={() => navigate(heroCard.href)}
                    className="w-full py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-800 transition-colors"
                  >
                    {ctaLabel(heroCard.status)}
                  </button>
                )}
              </div>
            )}

            {/* Subtle stacked cards — remaining filings */}
            {restCards.map(t => (
              <div key={t.id} className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center">
                    {t.href ? (
                      <button
                        onClick={() => navigate(t.href)}
                        className="text-sm font-semibold text-blue-600 hover:underline"
                      >
                        {t.id}
                      </button>
                    ) : (
                      <span className="text-sm font-semibold text-gray-400">{t.id}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2.5 flex-shrink-0">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${STATUS_STYLES[t.status] ?? 'bg-gray-100 text-gray-500'}`}>
                      {t.status}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <div className="w-12 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${t.completed ? 'bg-emerald-400' : 'bg-blue-500'}`}
                          style={{ width: `${(t.progress / t.total) * 100}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-gray-400">{t.progress}/{t.total}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* ── Desktop table view ── */}
      <div className="hidden md:block">
        {visible.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-8">No filings found.</p>
        ) : (
          <table className="w-full text-xs">
            <thead>
              <tr className="text-gray-400 font-medium border-b border-gray-100">
                <th className="text-left pb-2 font-medium">TICKET ID</th>
                <th className="text-left pb-2 font-medium">SERVICE</th>
                <th className="text-left pb-2 font-medium">STATUS</th>
                <th className="text-left pb-2 font-medium">UPDATED</th>
                <th className="text-left pb-2 font-medium">PROGRESS</th>
              </tr>
            </thead>
            <tbody>
              {visible.map(t => (
                <tr key={t.id} className="border-b border-gray-50 last:border-0">
                  <td className="py-3">
                    {t.href ? (
                      <button
                        onClick={() => navigate(t.href)}
                        className="text-blue-600 font-medium hover:underline"
                      >
                        {t.id}
                      </button>
                    ) : (
                      <span className="text-blue-600 font-medium">{t.id}</span>
                    )}
                  </td>
                  <td className="py-3 text-gray-700">{t.service} — {t.year}</td>
                  <td className="py-3">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${STATUS_STYLES[t.status] ?? 'bg-gray-100 text-gray-500'}`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="py-3 text-gray-500">{t.updated}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${t.completed ? 'bg-emerald-400' : 'bg-blue-500'}`}
                          style={{ width: `${(t.progress / t.total) * 100}%` }}
                        />
                      </div>
                      <span className="text-gray-400">{t.progress}/{t.total}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
