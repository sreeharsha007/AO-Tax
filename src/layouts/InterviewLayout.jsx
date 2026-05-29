import { useNavigate } from 'react-router-dom'
import { ChevronRight, FileCheck, CheckCircle2, Upload, ArrowRight } from 'lucide-react'
import Navbar from '../components/Navbar'

const DRAFT_CARDS = [
  { label: 'Federal Return',  form: 'Form 1040',   headline: '$3,240',  headlineLabel: 'Estimated refund',  detail: 'Effective rate 18.2% · $54,800 taxable income' },
  { label: 'NY State Return', form: 'Form IT-201', headline: '$847',    headlineLabel: 'State tax due',      detail: 'Effective rate 6.1% · Standard deduction' },
  { label: 'Schedule D',      form: 'Capital Gains', headline: '$12,500', headlineLabel: 'Net capital gains', detail: 'Long-term $9,200 · Short-term $3,300' },
]

const SCENARIOS = {
  0: {
    messages: [
      { id: 1, from: 'advisor', text: "Hi Surajit! I'm Priya, your tax advisor for the 2025 filing. Let's start. What's your current filing status?", time: '10:02 AM' },
      { type: 'answered-options', options: ['Single', 'Married filing jointly', 'Married filing separately', 'Head of household'], selected: 'Married filing jointly' },
      { id: 3, from: 'you', text: 'Married filing jointly.', time: '10:04 AM' },
      { id: 4, from: 'advisor', text: "Got it. Any dependents — children or other qualifying dependents you're claiming in 2025?", time: '10:04 AM' },
      { type: 'answered-options', options: ['No dependents', 'Yes, 1 child', 'Yes, 2+ children', 'Yes, other dependent'], selected: 'Yes, 1 child' },
      { id: 6, from: 'you', text: 'Yes, 1 child.', time: '10:05 AM' },
      { id: 7, from: 'advisor', text: 'Great. For income — what was your primary source of employment income in 2025?', time: '10:05 AM' },
      { type: 'active-options', options: ['W-2 from an employer', '1099 (self-employed)', 'Multiple sources', 'No employment income'] },
    ],
    preview: [
      { label: 'Filing Status',      value: 'Married Filing Jointly', state: 'done' },
      { label: 'Dependents',         value: '1 qualifying child',     state: 'done' },
      { label: 'Employment Income',  value: 'In progress…',           state: 'pending' },
      { label: 'Investment Income',  value: '—',                      state: 'empty' },
      { label: 'Rental Income',      value: '—',                      state: 'empty' },
      { label: 'Deductions',         value: '—',                      state: 'empty' },
    ],
  },
  1: {
    messages: [
      { id: 1, from: 'advisor', text: 'Married filing jointly, 1 child. Now — what was your primary employment income source in 2025?', time: '10:04 AM' },
      { type: 'answered-options', options: ['W-2 from an employer', '1099 (self-employed)', 'Multiple sources', 'No employment income'], selected: 'W-2 from an employer' },
      { id: 3, from: 'you', text: 'W-2 from TechNova.', time: '10:05 AM' },
      { id: 4, from: 'advisor', text: "I'll need your W-2 from TechNova to verify the exact figures. Can you upload it here?", time: '10:05 AM' },
      { type: 'upload', label: 'W-2 from TechNova', sublabel: "PDF · Usually from your employer's HR portal" },
    ],
    preview: [
      { label: 'Filing Status',      value: 'Married Filing Jointly',  state: 'done' },
      { label: 'Dependents',         value: '1 qualifying child',      state: 'done' },
      { label: 'Employment Income',  value: 'Awaiting W-2…',           state: 'waiting' },
      { label: 'Investment Income',  value: '—',                       state: 'empty' },
      { label: 'Rental Income',      value: '—',                       state: 'empty' },
      { label: 'Deductions',         value: '—',                       state: 'empty' },
    ],
  },
  2: {
    messages: [
      { id: 1, from: 'advisor', text: "Thank you for the W-2. I've also verified your rental income ($24,000) and broker statements. Everything checks out.", time: '10:14 AM' },
      { id: 2, from: 'you', text: 'Great, looking forward to seeing the drafts.', time: '10:15 AM' },
      { id: 3, from: 'advisor', text: "I've prepared all three returns for your review. Here's what they show:", time: '10:22 AM' },
      { type: 'drafts' },
    ],
    preview: [
      { label: 'Filing Status',      value: 'Married Filing Jointly',       state: 'done' },
      { label: 'Dependents',         value: '1 qualifying child',           state: 'done' },
      { label: 'Employment Income',  value: '$142,000 — TechNova W-2',      state: 'done' },
      { label: 'Investment Income',  value: '$12,500 net capital gains',    state: 'done' },
      { label: 'Rental Income',      value: '$24,000 gross — 84 Grove St.', state: 'done' },
      { label: 'Deductions',         value: 'Standard · $29,200',           state: 'done' },
    ],
  },
}

export default function InterviewLayout({ scenario = 0, setDocsOpen }) {
  const navigate = useNavigate()
  const { messages, preview } = SCENARIOS[scenario] ?? SCENARIOS[0]

  return (
    <div className="min-h-screen bg-white">
      <Navbar activePage="tickets" dark />

      <div className="px-8 pt-5 pb-2 max-w-[1280px] mx-auto">
        <div className="flex items-center gap-1.5 text-[11px] text-gray-400 mb-3">
          <button onClick={() => navigate('/dashboard')} className="hover:text-gray-600">Dashboard</button>
          <ChevronRight size={10} />
          <button onClick={() => navigate('/dashboard')} className="hover:text-gray-600">My Filings</button>
          <ChevronRight size={10} />
          <span className="text-gray-600 font-medium">#467501</span>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className="bg-blue-100 text-blue-700 text-[11px] font-semibold px-2.5 py-1 rounded-full">#467501</span>
          <span className="flex items-center gap-1 text-[11px] font-medium text-blue-600">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block animate-pulse" />
            Interview in progress
          </span>
          <span className="text-[11px] text-gray-400">IT Filing Services · Tax Year 2025</span>
        </div>

        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight leading-tight">Your 2025 filing</h1>
            <p className="text-gray-500 text-sm mt-1.5">
              Priya is gathering your details through conversation. Just answer her questions.
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0 mt-1">
            <button onClick={() => setDocsOpen(true)} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-colors">
              <FileCheck size={14} className="text-gray-500" />
              <span className="text-xs font-medium text-gray-600">Filing Vault</span>
              <span className="w-4 h-4 rounded-full bg-blue-500 text-white text-[9px] font-bold flex items-center justify-center">4</span>
            </button>
          </div>
        </div>
      </div>

      {/* Split layout */}
      <div className="px-8 pt-4 pb-32 max-w-[1280px] mx-auto flex gap-5 items-start">

        {/* Left: Conversation */}
        <div className="flex-1 min-w-0 bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col" style={{ minHeight: 560 }}>
          {/* Advisor header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 flex-shrink-0">
            <div className="w-9 h-9 rounded-full bg-purple-600 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">PN</div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">Priya Nair</p>
              <p className="text-[11px] text-gray-400">Senior Tax Advisor · 2025 Filing Interview</p>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-[11px] text-gray-400">Active</span>
            </div>
          </div>

          {/* Progress rail */}
          <div className="flex items-center gap-2 px-5 py-2.5 border-b border-gray-50 bg-gray-50/60 flex-shrink-0">
            <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-500"
                style={{ width: scenario === 0 ? '28%' : scenario === 1 ? '45%' : '100%' }}
              />
            </div>
            <span className="text-[10px] text-gray-400 flex-shrink-0">
              {scenario === 0 ? '3 of 11 questions' : scenario === 1 ? '5 of 11 questions' : 'Complete'}
            </span>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-5 py-5 space-y-3">
            {messages.map((msg, i) => {
              if (msg.type === 'answered-options') {
                return (
                  <div key={i} className="flex flex-wrap gap-2 pl-1">
                    {msg.options.map(opt => (
                      <span
                        key={opt}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border cursor-default ${
                          opt === msg.selected
                            ? 'border-blue-300 bg-blue-50 text-blue-700'
                            : 'border-gray-100 bg-gray-50 text-gray-300'
                        }`}
                      >
                        {opt === msg.selected && <CheckCircle2 size={10} className="inline mr-1 -mt-0.5" />}
                        {opt}
                      </span>
                    ))}
                  </div>
                )
              }
              if (msg.type === 'active-options') {
                return (
                  <div key={i} className="flex flex-wrap gap-2 pl-1">
                    {msg.options.map(opt => (
                      <button
                        key={opt}
                        className="px-3 py-1.5 rounded-full text-xs font-medium border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )
              }
              if (msg.type === 'upload') {
                return (
                  <div key={i}>
                    <label className="inline-flex items-center gap-3 border-2 border-dashed border-blue-200 rounded-2xl px-5 py-4 bg-blue-50/50 cursor-pointer hover:bg-blue-50 transition-colors">
                      <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <Upload size={16} className="text-blue-500" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-blue-700">{msg.label}</p>
                        <p className="text-[11px] text-blue-400 mt-0.5">{msg.sublabel}</p>
                      </div>
                      <input type="file" className="hidden" />
                    </label>
                  </div>
                )
              }
              if (msg.type === 'drafts') {
                return (
                  <div key={i} className="space-y-2">
                    {DRAFT_CARDS.map(d => (
                      <div key={d.label} className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-sm font-semibold text-gray-900">{d.label}</span>
                            <span className="text-[10px] text-gray-400 bg-gray-200 px-1.5 py-0.5 rounded">{d.form}</span>
                          </div>
                          <p className="text-[11px] text-gray-400">{d.detail}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-lg font-bold text-gray-900">{d.headline}</p>
                          <p className="text-[10px] text-gray-400">{d.headlineLabel}</p>
                        </div>
                        <div className="flex flex-col gap-1.5 flex-shrink-0 ml-1">
                          <button className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-[11px] font-semibold hover:bg-blue-700 transition-colors">
                            Approve
                          </button>
                          <button className="px-3 py-1.5 rounded-lg border border-gray-200 text-[11px] text-gray-500 hover:bg-gray-50 transition-colors">
                            Question
                          </button>
                        </div>
                      </div>
                    ))}
                    <p className="text-[11px] text-gray-400 text-center pt-1">Approve all three to proceed to payment.</p>
                  </div>
                )
              }

              return (
                <div key={msg.id} className={`flex flex-col ${msg.from === 'you' ? 'items-end' : 'items-start'}`}>
                  <div className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.from === 'you'
                      ? 'bg-blue-600 text-white rounded-br-sm'
                      : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                  }`}>
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-gray-400 mt-1 px-1">{msg.time}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right: Live return preview */}
        <div className="w-[260px] flex-shrink-0 space-y-3">
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-[10px] font-semibold text-gray-400 tracking-widest">LIVE RETURN</p>
              <p className="text-[11px] text-gray-400 mt-0.5">Populating as you answer</p>
            </div>
            <div className="divide-y divide-gray-50">
              {preview.map(({ label, value, state }) => (
                <div key={label} className="flex items-start gap-3 px-4 py-3">
                  <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    state === 'done'    ? 'bg-blue-500' :
                    state === 'waiting' ? 'border-2 border-amber-300 bg-amber-50' :
                    'bg-gray-100'
                  }`}>
                    {state === 'done' && <CheckCircle2 size={8} className="text-white" strokeWidth={3} />}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wide">{label}</p>
                    <p className={`text-xs font-medium mt-0.5 ${
                      state === 'done'    ? 'text-gray-800' :
                      state === 'waiting' ? 'text-amber-600' :
                      state === 'pending' ? 'text-blue-400' :
                      'text-gray-200'
                    }`}>{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {scenario === 2 && (
            <div className="bg-white rounded-2xl border border-gray-200 p-4">
              <p className="text-[10px] font-semibold text-gray-400 tracking-widest mb-3">NET SUMMARY</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Federal refund</span>
                  <span className="text-sm font-bold text-green-600">+$3,240</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">NY State due</span>
                  <span className="text-sm font-bold text-gray-700">−$847</span>
                </div>
                <div className="border-t border-gray-100 pt-2 flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-600">Net refund</span>
                  <span className="text-base font-bold text-green-700">+$2,393</span>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl border border-gray-200 p-4">
            <p className="text-[10px] font-semibold text-gray-400 tracking-widest mb-3">FILING VAULT</p>
            {[
              { label: '2024 Tax Return', done: true },
              { label: 'Form 1095-A · Health', done: true },
              { label: 'Q1 Broker Statement', done: true },
              { label: 'Q2 Broker Statement', done: true },
              { label: 'W-2 · TechNova', done: scenario === 2 },
            ].map(({ label, done }) => (
              <div key={label} className="flex items-center gap-2 py-1.5">
                <div className={`w-3.5 h-3.5 rounded flex items-center justify-center flex-shrink-0 ${done ? 'bg-blue-100' : 'bg-gray-100'}`}>
                  <CheckCircle2 size={9} className={done ? 'text-blue-500' : 'text-gray-200'} strokeWidth={3} />
                </div>
                <span className={`text-xs ${done ? 'text-gray-600' : 'text-gray-300'}`}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
