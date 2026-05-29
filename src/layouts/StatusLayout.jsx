import { useNavigate } from 'react-router-dom'
import { ChevronRight, ArrowRight } from 'lucide-react'
import Navbar from '../components/Navbar'

const ROWS_S0 = [
  { label: 'Filing status',            status: 'ok',      detail: 'Married filing jointly · 1 qualifying child' },
  { label: 'Employment income',        status: 'ok',      detail: 'W-2 from TechNova · $142,000' },
  { label: 'Investment income',        status: 'ok',      detail: 'Q1 & Q2 reconciled · $12,500 net gains' },
  { label: 'Rental income',            status: 'ok',      detail: '84 Grove Street · $24,000 gross' },
  { label: 'Deductions',               status: 'ok',      detail: 'Standard · $29,200 confirmed' },
  { label: 'Prior year carry-forwards', status: 'ok',     detail: '2024 return reviewed · None applicable' },
  { label: 'Draft returns',            status: 'working', detail: 'Priya preparing · Est. Thursday, May 22' },
]

const ROWS_S1 = [
  { label: 'Filing status',            status: 'ok',        detail: 'Married filing jointly · 1 qualifying child' },
  { label: 'Employment income',        status: 'ok',        detail: 'W-2 from TechNova · $142,000' },
  { label: 'Investment income',        status: 'attention', detail: 'Q2 broker statement missing', action: 'Upload' },
  { label: 'Rental income',            status: 'ok',        detail: '84 Grove Street · $24,000 gross' },
  { label: 'Deductions',               status: 'ok',        detail: 'Standard · $29,200 confirmed' },
  { label: 'Prior year carry-forwards', status: 'ok',       detail: '2024 return reviewed · None applicable' },
  { label: 'Draft returns',            status: 'blocked',   detail: 'Waiting on investment income' },
]

const ROWS_S2 = [
  { label: 'Federal Return',  status: 'filed',   detail: 'Form 1040 · $3,240 refund · Filed May 23' },
  { label: 'NY State Return', status: 'filed',   detail: 'Form IT-201 · $847 due · Filed May 23' },
  { label: 'Schedule D',      status: 'filed',   detail: 'Capital Gains · $12,500 net · Attached' },
  { label: 'Invoice',         status: 'pending', detail: '#INV-2025-467501 · $527 · Due May 30' },
]

const STATUS_CFG = {
  ok:        { dot: 'bg-emerald-400', badge: 'text-emerald-600 bg-emerald-50',  label: 'OK' },
  working:   { dot: 'bg-blue-400 animate-pulse', badge: 'text-blue-500 bg-blue-50', label: 'In progress' },
  attention: { dot: 'bg-amber-400',   badge: 'text-amber-600 bg-amber-50',     label: 'Needs input' },
  blocked:   { dot: 'bg-gray-300',    badge: 'text-gray-400 bg-gray-100',      label: 'Blocked' },
  filed:     { dot: 'bg-emerald-400', badge: 'text-emerald-600 bg-emerald-50', label: 'Filed' },
  pending:   { dot: 'bg-amber-400',   badge: 'text-amber-600 bg-amber-50',     label: 'Pending' },
}

export default function StatusLayout({ scenario = 0, setChatOpen, setDocsOpen }) {
  const navigate = useNavigate()
  const rows = scenario === 0 ? ROWS_S0 : scenario === 1 ? ROWS_S1 : ROWS_S2

  const overallLabel = scenario === 0 ? 'All systems operational'
    : scenario === 1 ? 'Input required'
    : 'Filed'
  const overallDot = scenario === 1 ? 'bg-amber-400' : 'bg-emerald-400'
  const overallText = scenario === 1 ? 'text-amber-600' : 'text-emerald-600'

  return (
    <div className="min-h-screen bg-[#f7f7f5]">
      <Navbar activePage="tickets" dark />

      <div className="max-w-[620px] mx-auto px-8 pt-10 pb-32">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-[11px] text-gray-400 mb-10">
          <button onClick={() => navigate('/dashboard')} className="hover:text-gray-600">Dashboard</button>
          <ChevronRight size={10} />
          <button onClick={() => navigate('/dashboard')} className="hover:text-gray-600">My Filings</button>
          <ChevronRight size={10} />
          <span className="text-gray-600 font-medium">#467501</span>
        </div>

        {/* System header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${overallDot}`} />
            <span className={`text-xs font-semibold ${overallText}`}>{overallLabel}</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Filing #467501</h1>
          <p className="text-sm text-gray-400 mt-1">Tax Year 2025 · IT Filing Services · Priya Nair</p>
        </div>

        {/* Status rows */}
        <div className="space-y-0 bg-white rounded-2xl overflow-hidden border border-gray-100">
          {rows.map((row, i) => {
            const cfg = STATUS_CFG[row.status]
            return (
              <div key={row.label} className={`flex items-center gap-4 px-5 py-4 ${i < rows.length - 1 ? 'border-b border-gray-100' : ''}`}>
                <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cfg.dot}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{row.label}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">{row.detail}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {row.action && (
                    <label className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-blue-600 border border-blue-200 bg-blue-50 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors cursor-pointer">
                      {row.action}
                      <input type="file" className="hidden" />
                    </label>
                  )}
                  <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${cfg.badge}`}>{cfg.label}</span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Refund / summary footer */}
        {scenario !== 2 && (
          <div className="mt-10 pt-8 border-t border-gray-200">
            <p className="text-[10px] font-bold tracking-widest text-gray-400 mb-3">ESTIMATED REFUND</p>
            <p className="text-[52px] font-black text-gray-900 leading-none tracking-tight">$3,240</p>
            <p className="text-xs text-gray-400 mt-2">
              Federal · {scenario === 1 ? 'subject to Q2 reconciliation' : 'pending final verification'}
            </p>
          </div>
        )}

        {scenario === 2 && (
          <div className="mt-10 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-400 leading-relaxed">
              All returns prepared by Priya Nair on May 23, 2025.{' '}
              Refund of <span className="font-semibold text-gray-700">$3,240</span> expected within 21 days.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
