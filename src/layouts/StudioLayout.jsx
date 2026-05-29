import { useNavigate } from 'react-router-dom'
import { ChevronRight, ArrowRight, CheckCircle2 } from 'lucide-react'
import Navbar from '../components/Navbar'

const STAGE_SETS = [
  [
    { label: 'Intake',     status: 'done' },
    { label: 'Income',     status: 'done' },
    { label: 'Deductions', status: 'active' },
    { label: 'Drafts',     status: 'pending' },
    { label: 'Review',     status: 'pending' },
    { label: 'Filed',      status: 'pending' },
  ],
  [
    { label: 'Intake',     status: 'done' },
    { label: 'Income',     status: 'done' },
    { label: 'Deductions', status: 'done' },
    { label: 'Drafts',     status: 'done' },
    { label: 'Review',     status: 'active' },
    { label: 'Filed',      status: 'pending' },
  ],
  [
    { label: 'Intake',     status: 'done' },
    { label: 'Income',     status: 'done' },
    { label: 'Deductions', status: 'done' },
    { label: 'Drafts',     status: 'done' },
    { label: 'Review',     status: 'done' },
    { label: 'Filed',      status: 'done' },
  ],
]

export default function StudioLayout({ scenario = 0, setChatOpen, setDocsOpen }) {
  const navigate = useNavigate()
  const stages = STAGE_SETS[scenario]

  return (
    <div className="min-h-screen bg-white">
      <Navbar activePage="tickets" dark />

      <div className="max-w-[640px] mx-auto px-8 pt-10 pb-32">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-[11px] text-gray-400 mb-10">
          <button onClick={() => navigate('/dashboard')} className="hover:text-gray-600">Dashboard</button>
          <ChevronRight size={10} />
          <button onClick={() => navigate('/dashboard')} className="hover:text-gray-600">My Filings</button>
          <ChevronRight size={10} />
          <span className="text-gray-600 font-medium">#467501</span>
        </div>

        {/* Stage track */}
        <div className="flex items-start mb-14">
          {stages.map((stage, i) => (
            <div key={stage.label} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-2">
                <div className={`w-2 h-2 rounded-full transition-all ${
                  stage.status === 'done'   ? 'bg-gray-800' :
                  stage.status === 'active' ? 'bg-blue-500 ring-[3px] ring-blue-100' :
                  'bg-gray-200'
                }`} />
                <span className={`text-[10px] font-medium whitespace-nowrap ${
                  stage.status === 'done'   ? 'text-gray-400' :
                  stage.status === 'active' ? 'text-blue-600 font-semibold' :
                  'text-gray-300'
                }`}>{stage.label}</span>
              </div>
              {i < stages.length - 1 && (
                <div className={`flex-1 h-px mx-1.5 mb-3 ${stage.status === 'done' ? 'bg-gray-800' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>

        {/* ── SCENARIO 0: In production ── */}
        {scenario === 0 && (
          <div className="space-y-10">
            <div>
              <p className="text-[10px] font-bold tracking-widest text-gray-400 mb-2">NOW IN PROGRESS</p>
              <h2 className="text-2xl font-bold text-gray-900 mb-1.5">Deductions review</h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                Priya is comparing standard vs. itemized deductions and confirming the best approach for your return.
              </p>
            </div>

            <div className="space-y-0">
              {[
                { label: 'Standard deduction',     value: '$29,200',       note: null },
                { label: 'Eligible itemized (est.)', value: 'Calculating…', muted: true },
                { label: 'Recommendation',          value: 'Standard — confirmed', green: true },
              ].map(row => (
                <div key={row.label} className="flex items-center justify-between py-4 border-b border-gray-100">
                  <span className="text-sm text-gray-600">{row.label}</span>
                  <span className={`text-sm font-semibold ${
                    row.green ? 'text-emerald-600' : row.muted ? 'text-gray-400 font-normal' : 'text-gray-900'
                  }`}>{row.value}</span>
                </div>
              ))}
            </div>

            <div>
              <p className="text-[10px] font-bold tracking-widest text-gray-400 mb-3">YOUR ESTIMATED REFUND</p>
              <p className="text-[52px] font-black text-gray-900 leading-none tracking-tight">$3,240</p>
              <p className="text-xs text-gray-400 mt-2">Federal · pending deduction finalization</p>
            </div>

            <p className="text-sm text-gray-400 leading-relaxed">
              Nothing needed from you. Priya will update by Thursday, May 22.
            </p>
          </div>
        )}

        {/* ── SCENARIO 1: Client review ── */}
        {scenario === 1 && (
          <div className="space-y-10">
            <div>
              <p className="text-[10px] font-bold tracking-widest text-gray-400 mb-2">READY FOR YOUR REVIEW</p>
              <h2 className="text-2xl font-bold text-gray-900 mb-1.5">Federal Return — Form 1040</h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                Priya has prepared your federal return. Review the figures below and approve to continue.
              </p>
            </div>

            <div className="space-y-0">
              {[
                { label: 'Filing status',        value: 'Married filing jointly' },
                { label: 'Adjusted gross income', value: '$178,500' },
                { label: 'Standard deduction',    value: '$29,200' },
                { label: 'Taxable income',        value: '$54,800' },
                { label: 'Effective tax rate',    value: '18.2%' },
              ].map(row => (
                <div key={row.label} className="flex items-center justify-between py-4 border-b border-gray-100">
                  <span className="text-sm text-gray-500">{row.label}</span>
                  <span className="text-sm font-semibold text-gray-900">{row.value}</span>
                </div>
              ))}
            </div>

            <div>
              <p className="text-[10px] font-bold tracking-widest text-gray-400 mb-3">YOUR REFUND</p>
              <p className="text-[52px] font-black text-gray-900 leading-none tracking-tight">$3,240</p>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-700 transition-colors">
                Approve return <ArrowRight size={15} />
              </button>
              <button className="px-5 py-3.5 rounded-2xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                Ask Priya
              </button>
            </div>
          </div>
        )}

        {/* ── SCENARIO 2: Wrapping up ── */}
        {scenario === 2 && (
          <div className="space-y-10">
            <div>
              <p className="text-[10px] font-bold tracking-widest text-gray-400 mb-2">COMPLETE</p>
              <h2 className="text-2xl font-bold text-gray-900 mb-1.5">All returns filed</h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                {"Priya has filed all three returns. You're done for 2025."}
              </p>
            </div>

            <div className="space-y-0">
              {[
                { label: 'Federal Return — Form 1040', value: '$3,240 refund', note: 'Filed May 23' },
                { label: 'NY State — Form IT-201',     value: '$847 due',      note: 'Filed May 23' },
                { label: 'Schedule D — Capital Gains', value: '$12,500 net',   note: 'Attached' },
              ].map(row => (
                <div key={row.label} className="flex items-start justify-between py-4 border-b border-gray-100">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{row.label}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{row.note}</p>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 flex-shrink-0 ml-4">{row.value}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" />
              <p className="text-sm text-gray-500">Invoice #INV-2025-467501 · $527 · Due May 30</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
