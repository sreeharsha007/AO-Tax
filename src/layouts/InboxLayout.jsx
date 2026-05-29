import { useNavigate } from 'react-router-dom'
import {
  ChevronRight, MessageSquare, FileCheck, ArrowRight,
  CheckCircle2, Upload,
} from 'lucide-react'
import Navbar from '../components/Navbar'

const ITEMS = [
  {
    id: 'i1',
    verb: 'Upload',
    verbBg: 'bg-violet-100', verbText: 'text-violet-700',
    title: 'W-2 from TechNova',
    detail: 'Priya needs your W-2 to complete the employment income section.',
    meta: 'Requested by Priya Nair',
    urgency: 'Due this week', urgencyColor: 'text-amber-600',
  },
  {
    id: 'i2',
    verb: 'Answer',
    verbBg: 'bg-blue-100', verbText: 'text-blue-700',
    title: 'Rental property income for 2025',
    detail: '2 quick questions about your rental income and expenses.',
    meta: 'Requested by Priya Nair',
    urgency: '2 questions', urgencyColor: 'text-blue-500',
  },
  {
    id: 'i3',
    verb: 'Review',
    verbBg: 'bg-gray-100', verbText: 'text-gray-600',
    title: 'Federal Return — Form 1040',
    detail: 'Your draft is ready. Estimated read time: 3 minutes.',
    meta: 'Prepared by Priya Nair · May 19, 2025',
    urgency: '3 min read', urgencyColor: 'text-gray-400',
  },
  {
    id: 'i4',
    verb: 'Approve',
    verbBg: 'bg-green-100', verbText: 'text-green-700',
    title: 'NY State Return — Form IT-201',
    detail: "Priya is confident in this filing. Quick to approve.",
    meta: 'Prepared by Priya Nair · May 19, 2025',
    urgency: 'Ready to approve', urgencyColor: 'text-green-600',
  },
  {
    id: 'i5',
    verb: 'Pay',
    verbBg: 'bg-amber-100', verbText: 'text-amber-700',
    title: 'Filing invoice · $527 due',
    detail: 'Invoice due May 30. Your saved card can be used.',
    meta: 'Invoice #INV-2025-467501',
    urgency: 'Due May 30', urgencyColor: 'text-amber-600',
  },
]

export default function InboxLayout({ scenario = 0, setChatOpen, setDocsOpen }) {
  const navigate = useNavigate()
  const expandedId = scenario === 1 ? 'i2' : null

  return (
    <div className="min-h-screen bg-white">
      <Navbar activePage="tickets" dark />

      <div className="px-8 pt-5 pb-2 max-w-[800px] mx-auto">
        <div className="flex items-center gap-1.5 text-[11px] text-gray-400 mb-3">
          <button onClick={() => navigate('/dashboard')} className="hover:text-gray-600">Dashboard</button>
          <ChevronRight size={10} />
          <button onClick={() => navigate('/dashboard')} className="hover:text-gray-600">My Filings</button>
          <ChevronRight size={10} />
          <span className="text-gray-600 font-medium">#467501</span>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className="bg-blue-100 text-blue-700 text-[11px] font-semibold px-2.5 py-1 rounded-full">#467501</span>
          {scenario === 2 ? (
            <span className="flex items-center gap-1 text-[11px] font-medium text-green-600">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
              All caught up
            </span>
          ) : (
            <span className="flex items-center gap-1 text-[11px] font-medium text-red-600">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
              Needs your input
            </span>
          )}
          <span className="text-[11px] text-gray-400">IT Filing Services · Tax Year 2025</span>
        </div>

        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight leading-tight">Your 2025 filing</h1>
            <p className="text-gray-500 text-sm mt-1.5">
              {scenario === 2 ? "You're all caught up. Priya is working." : '5 items need your attention.'}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0 mt-1">
            <button onClick={() => setChatOpen(true)} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-colors">
              <MessageSquare size={14} className="text-gray-500" />
              <span className="text-xs font-medium text-gray-600">Messages</span>
              <span className="w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">1</span>
            </button>
            <button onClick={() => setDocsOpen(true)} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-colors">
              <FileCheck size={14} className="text-gray-500" />
              <span className="text-xs font-medium text-gray-600">Documents</span>
              <span className="w-4 h-4 rounded-full bg-blue-500 text-white text-[9px] font-bold flex items-center justify-center">4</span>
            </button>
          </div>
        </div>
      </div>

      <div className="px-8 pt-5 pb-32 max-w-[800px] mx-auto">

        {/* Progress bar */}
        {scenario !== 2 && (
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: '28%' }} />
            </div>
            <span className="text-[11px] text-gray-400 flex-shrink-0 tabular-nums">7 of 22 complete</span>
          </div>
        )}

        {/* Inbox zero */}
        {scenario === 2 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-5">
              <CheckCircle2 size={28} className="text-green-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">{"You're all caught up"}</h2>
            <p className="text-sm text-gray-500 mb-1">Priya is reviewing your income section.</p>
            <p className="text-sm text-gray-400 mb-8">Expected update by Thursday, May 22.</p>
            <div className="flex items-center gap-3">
              <div className="h-px w-16 bg-gray-200" />
              <span className="text-[11px] text-gray-400 font-medium">13 of 22 items complete</span>
              <div className="h-px w-16 bg-gray-200" />
            </div>
          </div>
        )}

        {/* Active inbox */}
        {scenario !== 2 && (
          <div className="space-y-2">
            {ITEMS.map(item => {
              const isExpanded = item.id === expandedId
              return (
                <div
                  key={item.id}
                  className={`bg-white rounded-2xl border overflow-hidden transition-all ${
                    isExpanded ? 'border-blue-200 shadow-sm' : 'border-gray-200'
                  }`}
                >
                  <div className={`flex items-center gap-4 px-5 py-4 ${isExpanded ? 'border-b border-blue-100' : ''}`}>
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full flex-shrink-0 ${item.verbBg} ${item.verbText}`}>
                      {item.verb}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{item.detail}</p>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className={`text-[11px] font-medium ${item.urgencyColor}`}>{item.urgency}</span>
                      <ChevronRight
                        size={14}
                        className={`text-gray-300 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
                      />
                    </div>
                  </div>

                  {/* Expanded content */}
                  {isExpanded && (
                    <div className="px-5 py-5 bg-blue-50/30">
                      <p className="text-[10px] font-semibold text-gray-400 tracking-widest mb-4">REQUESTED BY PRIYA NAIR</p>
                      <div className="space-y-6">
                        <div>
                          <p className="text-sm font-medium text-gray-800 mb-3">
                            Was your rental property rented out for all of 2025?
                          </p>
                          <div className="flex gap-2">
                            <button className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors">
                              Yes, full year
                            </button>
                            <button className="px-5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                              No, part of the year
                            </button>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800 mb-2">
                            What was your gross rental income in 2025?
                          </p>
                          <div className="flex items-center gap-2 max-w-xs">
                            <div className="relative flex-1">
                              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-400">$</span>
                              <input
                                type="text"
                                defaultValue="24,000"
                                className="w-full border border-gray-200 rounded-xl pl-7 pr-4 py-2.5 text-sm text-gray-800 font-medium bg-white outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-50"
                              />
                            </div>
                            <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition-colors whitespace-nowrap">
                              Submit <ArrowRight size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
