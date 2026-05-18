import { useNavigate } from 'react-router-dom'
import {
  ChevronRight, MessageSquare, FileCheck, Upload,
  ChevronDown, Clock,
} from 'lucide-react'
import Navbar from '../components/Navbar'

const PAST_DAYS = [
  { date: 'May 10', event: 'You uploaded Form 1095-A',                  type: 'you'   },
  { date: 'May 11', event: 'You uploaded 2024 Tax Return',               type: 'you'   },
  { date: 'May 12', event: 'Priya confirmed your filing status',         type: 'priya' },
  { date: 'May 13–15', event: 'Priya reviewing income — no action needed', type: 'priya' },
  { date: 'May 16', event: 'You uploaded Q1 & Q2 Broker Statements',    type: 'you'   },
  { date: 'May 17', event: 'Priya reviewing investments — no action needed', type: 'priya' },
]

const DATES = ['Monday, May 18', 'Monday, May 18', 'Wednesday, May 21']

const DRAFTS = [
  { label: 'Federal Return',  form: 'Form 1040',   headline: '$3,240',  headlineLabel: 'Estimated refund', detail: 'Effective tax rate 18.2% · $54,800 taxable income' },
  { label: 'NY State Return', form: 'Form IT-201', headline: '$847',    headlineLabel: 'State tax due',     detail: 'Effective rate 6.1% · Standard deduction applied' },
  { label: 'Schedule D',      form: 'Capital Gains', headline: '$12,500', headlineLabel: 'Net capital gains', detail: 'Long-term $9,200 · Short-term $3,300' },
]

export default function StandupLayout({ scenario = 0, setChatOpen, setDocsOpen }) {
  const navigate = useNavigate()
  const isHighSignal = scenario === 2

  return (
    <div className="min-h-screen bg-[#f5f4f0]">
      <Navbar activePage="tickets" dark />

      <div className="px-8 pt-5 pb-2 max-w-[720px] mx-auto">
        <div className="flex items-center gap-1.5 text-[11px] text-gray-400 mb-3">
          <button onClick={() => navigate('/')} className="hover:text-gray-600">Dashboard</button>
          <ChevronRight size={10} />
          <button onClick={() => navigate('/')} className="hover:text-gray-600">My Filings</button>
          <ChevronRight size={10} />
          <span className="text-gray-600 font-medium">#467501</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-blue-100 text-blue-700 text-[11px] font-semibold px-2.5 py-1 rounded-full">#467501</span>
          <span className="text-[11px] text-gray-400">IT Filing Services · Tax Year 2025</span>
        </div>
      </div>

      <div className="px-8 pt-8 pb-32 max-w-[720px] mx-auto">

        {/* Date hero */}
        <div className="mb-8">
          <p className="text-[10px] font-bold text-gray-400 tracking-widest mb-2 uppercase">Today</p>
          <h1 className={`text-5xl font-black tracking-tight ${isHighSignal ? 'text-blue-600' : 'text-gray-900'}`}>
            {DATES[scenario]}
          </h1>
          <p className={`text-base font-medium mt-2.5 ${
            isHighSignal ? 'text-blue-700' :
            scenario === 1 ? 'text-gray-800' :
            'text-gray-400'
          }`}>
            {scenario === 0 && 'No action needed from you today.'}
            {scenario === 1 && 'You have one thing to do.'}
            {scenario === 2 && 'Your returns are ready to review.'}
          </p>
        </div>

        {/* Priya status */}
        <div className={`rounded-2xl border px-5 py-4 mb-6 flex items-center gap-4 ${
          isHighSignal ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'
        }`}>
          <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">PN</div>
          <div className="flex-1 min-w-0">
            <p className={`text-xs font-semibold ${isHighSignal ? 'text-blue-800' : 'text-gray-800'}`}>
              {scenario === 0 && 'Priya is reviewing your income section.'}
              {scenario === 1 && 'Priya is waiting for your document.'}
              {scenario === 2 && 'Priya has prepared your 3 draft returns.'}
            </p>
            <p className={`text-[11px] mt-0.5 ${isHighSignal ? 'text-blue-500' : 'text-gray-400'}`}>
              {scenario === 0 && 'Working since 9:00 AM · Expected update by Thursday, May 22'}
              {scenario === 1 && "She can't complete Schedule D without this"}
              {scenario === 2 && 'Prepared May 21, 2025 · Waiting for your approval to file'}
            </p>
          </div>
          {scenario !== 0 && (
            <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 animate-pulse ${
              scenario === 1 ? 'bg-amber-400' : 'bg-blue-500'
            }`} />
          )}
        </div>

        {/* Scenario 0: Resting */}
        {scenario === 0 && (
          <div className="text-center py-12">
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-gray-200 text-xs font-medium text-gray-500 mb-5">
              <Clock size={13} className="text-gray-400" />
              Check back tomorrow
            </div>
            <p className="text-sm text-gray-400 max-w-sm mx-auto leading-relaxed">
              Priya has your filing. She'll reach out as soon as something needs your attention.
            </p>
          </div>
        )}

        {/* Scenario 1: Your task */}
        {scenario === 1 && (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-5">
            <div className="px-6 py-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-700">Upload</span>
                <span className="text-[11px] text-gray-400">{"Today's task"}</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Q2 Broker Statement</h2>
              <p className="text-sm text-gray-500 leading-relaxed mb-5">
                Priya needs this to verify your Q2 investment income and prepare Schedule D. Without it, she cannot complete your federal return.
              </p>
              <label className="flex items-center gap-4 border-2 border-dashed border-blue-200 rounded-xl px-5 py-4 bg-blue-50/50 cursor-pointer hover:bg-blue-50 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Upload size={18} className="text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-blue-700">Upload Q2 Broker Statement</p>
                  <p className="text-[11px] text-blue-400 mt-0.5">PDF · Available from your broker's website or app</p>
                </div>
                <input type="file" className="hidden" />
              </label>
            </div>
          </div>
        )}

        {/* Scenario 2: Draft review */}
        {scenario === 2 && (
          <div className="space-y-3 mb-6">
            {DRAFTS.map(d => (
              <div key={d.label} className="bg-white rounded-2xl border border-gray-200 px-5 py-4 flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-gray-900">{d.label}</span>
                    <span className="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">{d.form}</span>
                  </div>
                  <p className="text-[11px] text-gray-400">{d.detail}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-2xl font-bold text-gray-900">{d.headline}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{d.headlineLabel}</p>
                </div>
                <div className="flex flex-col gap-1.5 flex-shrink-0 ml-1">
                  <button className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors whitespace-nowrap">
                    Approve
                  </button>
                  <button className="px-4 py-2 rounded-xl border border-gray-200 text-xs text-gray-500 hover:bg-gray-50 transition-colors whitespace-nowrap">
                    Question
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Past days */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <button className="w-full flex items-center justify-between px-5 py-3.5">
            <div className="flex items-center gap-2.5">
              <p className="text-[10px] font-semibold text-gray-400 tracking-widest">PAST DAYS</p>
              <span className="text-[10px] font-medium text-gray-300">{PAST_DAYS.length} entries</span>
            </div>
            <ChevronDown size={14} className="text-gray-400" />
          </button>
        </div>

        {/* Coming up — only on resting and task states */}
        {scenario !== 2 && (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mt-2">
            <button className="w-full flex items-center justify-between px-5 py-3.5">
              <div className="flex items-center gap-2.5">
                <p className="text-[10px] font-semibold text-gray-400 tracking-widest">COMING UP</p>
                <span className="text-[10px] font-medium text-gray-300">Locked until then</span>
              </div>
              <ChevronDown size={14} className="text-gray-400" />
            </button>
          </div>
        )}

        {/* Footer actions */}
        <div className="flex items-center justify-center gap-3 mt-8">
          <button
            onClick={() => setChatOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <MessageSquare size={14} className="text-gray-500" />
            Message Priya
          </button>
          <button
            onClick={() => setDocsOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <FileCheck size={14} className="text-gray-500" />
            Documents
          </button>
        </div>
      </div>
    </div>
  )
}
