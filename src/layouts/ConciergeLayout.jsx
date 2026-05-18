import { useNavigate } from 'react-router-dom'
import {
  ChevronRight, MessageSquare, FileCheck,
  CheckCircle2, ArrowRight,
} from 'lucide-react'
import Navbar from '../components/Navbar'

export default function ConciergeLayout({ scenario = 0, setChatOpen, setDocsOpen }) {
  const navigate = useNavigate()

  return (
    <div className={`min-h-screen transition-colors duration-500 ${scenario === 1 ? 'bg-blue-50' : 'bg-[#f5f4f0]'}`}>
      <Navbar activePage="tickets" dark />

      {/* Header */}
      <div className="px-8 pt-5 pb-2 max-w-[820px] mx-auto">
        <div className="flex items-center gap-1.5 text-[11px] text-gray-400 mb-3">
          <button onClick={() => navigate('/')} className="hover:text-gray-600">Dashboard</button>
          <ChevronRight size={10} />
          <button onClick={() => navigate('/')} className="hover:text-gray-600">My Filings</button>
          <ChevronRight size={10} />
          <span className="text-gray-600 font-medium">#467501</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-blue-100 text-blue-700 text-[11px] font-semibold px-2.5 py-1 rounded-full">#467501</span>
            {scenario === 1 ? (
              <span className="flex items-center gap-1.5 text-[11px] font-bold text-blue-700 bg-blue-200 px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block animate-pulse" />
                Your turn
              </span>
            ) : (
              <span className="text-[11px] text-gray-400">IT Filing Services · Tax Year 2025</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setChatOpen(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <MessageSquare size={14} className="text-gray-500" />
              <span className="text-xs font-medium text-gray-600">Messages</span>
            </button>
            <button
              onClick={() => setDocsOpen(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <FileCheck size={14} className="text-gray-500" />
              <span className="text-xs font-medium text-gray-600">Documents</span>
            </button>
          </div>
        </div>
      </div>

      <div className="px-8 pt-8 pb-32 max-w-[820px] mx-auto">

        {/* ── SCENARIO 0: Advisor at work (Concierge) ── */}
        {scenario === 0 && (
          <div className="space-y-5">
            {/* Priya's note card */}
            <div className="bg-white rounded-3xl border border-gray-200 p-8">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-full bg-purple-600 flex items-center justify-center text-white text-lg font-semibold flex-shrink-0">PN</div>
                <div className="flex-1">
                  <p className="text-base font-semibold text-gray-900">Priya Nair</p>
                  <p className="text-[11px] text-gray-400 mb-5">Senior Tax Advisor · Today at 9:14 AM</p>
                  <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
                    <p>Good morning, Surajit. Here is where things stand with your 2025 filing:</p>
                    <p>
                      I have completed your <span className="font-semibold text-gray-900">Profile</span> section and confirmed your filing status — married filing jointly, 1 qualifying child.
                    </p>
                    <p>
                      I am currently working through your <span className="font-semibold text-gray-900">income section</span>. Your W-2 from TechNova and both broker statements are in hand. Reconciling the Q2 investment figures now.
                    </p>
                    <p className="text-gray-400">I will reach out as soon as I need anything from you.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* What she has handled */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <p className="text-[10px] font-semibold text-gray-400 tracking-widest mb-4">HANDLED BY PRIYA</p>
              <div className="space-y-3">
                {[
                  'Filing status confirmed — Married filing jointly',
                  'Dependent verified — 1 qualifying child',
                  'W-2 from TechNova reviewed — $142,000',
                  'Q1 Broker Statement reconciled',
                  '2024 return reviewed for carry-forwards',
                ].map(item => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 size={14} className="text-blue-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-600">{item}</p>
                  </div>
                ))}
                <div className="flex items-start gap-3 opacity-40">
                  <div className="w-3.5 h-3.5 rounded-full border-2 border-gray-300 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-400 italic">Q2 Broker Statement — In progress</p>
                </div>
              </div>
            </div>

            {/* Status line */}
            <div className="flex items-center justify-center gap-3 py-2">
              <div className="h-px flex-1 bg-gray-200" />
              <div className="flex items-center gap-2 text-xs text-gray-400 font-medium whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                Priya is working · Expected update Thursday, May 22
              </div>
              <div className="h-px flex-1 bg-gray-200" />
            </div>
          </div>
        )}

        {/* ── SCENARIO 1: Your turn (Signal) ── */}
        {scenario === 1 && (
          <div className="space-y-5">
            {/* Attention banner */}
            <div className="bg-blue-600 rounded-2xl px-6 py-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-lg font-black leading-none">!</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-white">Priya needs your approval</p>
                <p className="text-xs text-blue-200 mt-0.5">Your federal return is ready. Takes about 2 minutes to review.</p>
              </div>
            </div>

            {/* Priya's brief */}
            <div className="bg-white rounded-3xl border border-blue-200 p-6">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">PN</div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900 mb-1">Priya Nair</p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {"I've prepared your federal return. Your refund is "}
                    <span className="font-bold text-gray-900">$3,240</span>
                    {" — effective rate 18.2%, taxable income $54,800. I'm confident in these numbers. Please approve to continue."}
                  </p>
                </div>
              </div>
            </div>

            {/* Federal draft card */}
            <div className="bg-white rounded-2xl border border-blue-200 overflow-hidden">
              <div className="px-6 pt-5 pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-base font-semibold text-gray-900">Federal Return</span>
                      <span className="text-[10px] font-medium text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">Form 1040</span>
                    </div>
                    <p className="text-[11px] text-gray-400">Federal · IRS · Prepared May 21, 2025</p>
                  </div>
                </div>
                <div className="flex items-baseline gap-2 mb-1.5">
                  <span className="text-4xl font-bold text-gray-900">$3,240</span>
                  <span className="text-sm text-gray-400">estimated refund</span>
                </div>
                <p className="text-xs text-gray-400">
                  Effective tax rate 18.2% · Taxable income $54,800 · Standard deduction · W-2 + Rental + Capital gains
                </p>
              </div>
              <div className="border-t border-gray-100 px-6 pb-5 pt-4 flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors">
                  Approve this return <ArrowRight size={15} />
                </button>
                <button className="px-5 py-3 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors flex-shrink-0">
                  I have a question
                </button>
              </div>
            </div>

            <p className="text-[11px] text-center text-blue-400 font-medium">
              NY State and Schedule D will follow once this is approved.
            </p>
          </div>
        )}

        {/* ── SCENARIO 2: Handback ── */}
        {scenario === 2 && (
          <div className="space-y-5">
            {/* Confirmation */}
            <div className="bg-white rounded-3xl border border-gray-200 p-8 text-center">
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={26} className="text-green-500" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-1.5">Federal return approved.</h2>
              <p className="text-sm text-gray-400">Handed back to Priya · May 21 at 11:08 AM</p>
            </div>

            {/* Priya's acknowledgment */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">PN</div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2 mb-3">
                    <p className="text-sm font-semibold text-gray-900">Priya Nair</p>
                    <p className="text-[11px] text-gray-400">Just now</p>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Got it, thank you. I will now prepare your NY State return and Schedule D. Expect them by Friday, May 23.
                  </p>
                </div>
              </div>
            </div>

            {/* What is next */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <p className="text-[10px] font-semibold text-gray-400 tracking-widest mb-4">NEXT UP</p>
              <div className="space-y-3.5">
                {[
                  { label: 'NY State Return — Form IT-201',  status: 'Priya preparing · Est. Friday, May 23' },
                  { label: 'Schedule D — Capital Gains',     status: 'Priya preparing · Est. Friday, May 23' },
                  { label: 'Invoice & payment',              status: 'Available after all approvals' },
                ].map(({ label, status }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-gray-200 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">{label}</p>
                      <p className="text-[11px] text-gray-400">{status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Status line */}
            <div className="flex items-center justify-center gap-3 py-2">
              <div className="h-px flex-1 bg-gray-200" />
              <div className="flex items-center gap-2 text-xs text-gray-400 font-medium whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                Back to Priya · No action needed right now
              </div>
              <div className="h-px flex-1 bg-gray-200" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
