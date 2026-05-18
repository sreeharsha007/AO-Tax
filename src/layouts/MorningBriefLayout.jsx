import { useNavigate } from 'react-router-dom'
import { ChevronRight, ArrowRight } from 'lucide-react'
import Navbar from '../components/Navbar'

const DONE_ITEMS = [
  { text: 'Filing status confirmed', detail: 'Married filing jointly · 1 qualifying child' },
  { text: 'W-2 from TechNova verified', detail: '$142,000 in employment income' },
  { text: 'Q1 & Q2 broker statements reconciled', detail: '$12,500 net capital gains' },
  { text: 'Rental income confirmed', detail: '$24,000 gross — 84 Grove Street' },
  { text: '2024 return reviewed', detail: 'No carry-forwards needed' },
]

export default function MorningBriefLayout({ scenario = 0, setChatOpen, setDocsOpen }) {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <Navbar activePage="tickets" dark />

      <div className="max-w-[580px] mx-auto px-8 pt-10 pb-32">

        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-[11px] text-gray-400 mb-10">
          <button onClick={() => navigate('/')} className="hover:text-gray-600">Dashboard</button>
          <ChevronRight size={10} />
          <button onClick={() => navigate('/')} className="hover:text-gray-600">My Filings</button>
          <ChevronRight size={10} />
          <span className="text-gray-600 font-medium">#467501</span>
        </div>

        {/* Advisor header — always present */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-9 h-9 rounded-full bg-purple-600 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">PN</div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900">Priya Nair</p>
            <p className="text-[11px] text-gray-400">
              {scenario === 0 && 'Senior Tax Advisor · Working on your return'}
              {scenario === 1 && 'Senior Tax Advisor · One thing from you'}
              {scenario === 2 && "Senior Tax Advisor · Drafts ready for you"}
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <div className={`w-1.5 h-1.5 rounded-full ${scenario === 1 ? 'bg-amber-400' : 'bg-emerald-400'} ${scenario === 0 ? 'animate-pulse' : ''}`} />
          </div>
        </div>

        <div className="border-t border-gray-200" />

        {/* ── SCENARIO 0: Priya working ── */}
        {scenario === 0 && (
          <>
            <div className="py-9">
              <p className="text-[10px] font-bold tracking-widest text-gray-400 mb-5">HANDLED SO FAR</p>
              <div className="space-y-4">
                {DONE_ITEMS.map(item => (
                  <div key={item.text} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0 mt-1.5" />
                    <div>
                      <p className="text-sm text-gray-800">{item.text}</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200" />

            <div className="py-9">
              <p className="text-[10px] font-bold tracking-widest text-gray-400 mb-3">CURRENTLY</p>
              <p className="text-sm text-gray-700 leading-relaxed">
                Reviewing your expense section. Standard deduction applies at $29,200 — no itemization needed. On track for drafts by Thursday.
              </p>
            </div>

            <div className="border-t border-gray-200" />

            <div className="py-9">
              <p className="text-[10px] font-bold tracking-widest text-gray-400 mb-3">YOUR ESTIMATED REFUND</p>
              <p className="text-[56px] font-black text-gray-900 leading-none tracking-tight mb-2">$3,240</p>
              <p className="text-sm text-gray-400">Federal · pending final verification</p>
            </div>

            <div className="border-t border-gray-200" />

            <div className="py-9">
              <p className="text-sm text-gray-400 leading-relaxed">
                Nothing needed from you today. Priya will be in touch by Thursday, May 22.
              </p>
              <button
                onClick={() => setChatOpen(true)}
                className="mt-5 text-sm text-gray-500 hover:text-gray-900 transition-colors underline underline-offset-4 decoration-gray-300"
              >
                Message Priya
              </button>
            </div>
          </>
        )}

        {/* ── SCENARIO 1: One ask from you ── */}
        {scenario === 1 && (
          <>
            <div className="py-9">
              <p className="text-[10px] font-bold tracking-widest text-gray-400 mb-3">HANDLED SO FAR</p>
              <p className="text-sm text-gray-400 leading-relaxed">
                Filing status, W-2, broker statements, rental income, prior-year carry-forwards — all verified and confirmed.
              </p>
            </div>

            <div className="border-t border-gray-200" />

            <div className="py-9">
              <p className="text-[10px] font-bold tracking-widest text-gray-400 mb-5">ONE THING FROM YOU</p>
              <p className="text-xl font-bold text-gray-900 mb-2">Q2 Broker Statement</p>
              <p className="text-sm text-gray-500 leading-relaxed mb-7">
                Priya needs this to reconcile your Q2 investment income and finalize Schedule D.
                {"Everything else is complete — this is the last piece before she can prepare your drafts."}
              </p>
              <label className="flex items-center gap-4 border border-gray-200 bg-white rounded-2xl px-5 py-4 cursor-pointer hover:border-gray-300 hover:shadow-sm transition-all group">
                <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0 group-hover:bg-gray-200 transition-colors">
                  <ArrowRight size={15} className="text-gray-500 -rotate-90" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800">Upload Q2 Broker Statement</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">PDF · Available from your broker's website or app</p>
                </div>
                <input type="file" className="hidden" />
              </label>
              <p className="text-[11px] text-gray-400 mt-3 ml-1">Takes about 1 minute</p>
            </div>

            <div className="border-t border-gray-200" />

            <div className="py-9">
              <p className="text-[10px] font-bold tracking-widest text-gray-400 mb-3">YOUR ESTIMATED REFUND</p>
              <p className="text-5xl font-black text-gray-900 leading-none tracking-tight mb-2">$3,240</p>
              <p className="text-sm text-gray-400">Building · subject to Q2 reconciliation</p>
            </div>
          </>
        )}

        {/* ── SCENARIO 2: Ready to review ── */}
        {scenario === 2 && (
          <>
            <div className="py-9">
              <p className="text-[10px] font-bold tracking-widest text-gray-400 mb-4">FROM PRIYA · MAY 19</p>
              <p className="text-sm text-gray-700 leading-relaxed">
                {"Everything is in order. I've prepared all three returns — federal, state, and Schedule D. They're ready when you are. No rush."}
              </p>
            </div>

            <div className="border-t border-gray-200" />

            <div className="py-9">
              <p className="text-[10px] font-bold tracking-widest text-gray-400 mb-7">DRAFT RETURNS</p>
              <div className="space-y-0">
                {[
                  { label: 'Federal Return', form: 'Form 1040', headline: '$3,240', note: 'Estimated refund · Rate 18.2%' },
                  { label: 'NY State Return', form: 'Form IT-201', headline: '$847', note: 'State tax due · Rate 6.1%' },
                  { label: 'Schedule D', form: 'Capital Gains', headline: '$12,500', note: 'Net gains · Long $9,200 + Short $3,300' },
                ].map(d => (
                  <div key={d.label} className="flex items-center gap-4 py-5 border-b border-gray-100">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2">
                        <p className="text-sm font-semibold text-gray-900">{d.label}</p>
                        <span className="text-[10px] text-gray-400">{d.form}</span>
                      </div>
                      <p className="text-[11px] text-gray-400 mt-0.5">{d.note}</p>
                    </div>
                    <p className="text-xl font-bold text-gray-900 flex-shrink-0">{d.headline}</p>
                    <button className="flex-shrink-0 text-xs font-semibold text-gray-900 border border-gray-300 rounded-xl px-4 py-2 hover:bg-gray-50 transition-colors">
                      Approve
                    </button>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-gray-400 mt-5">Approve all three to proceed to payment</p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
