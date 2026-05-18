import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Navbar from '../components/Navbar'

export default function QuietRoomLayout({ scenario = 0, setChatOpen, setDocsOpen }) {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex flex-col">
      <Navbar activePage="tickets" dark />

      <div className="flex-1 flex flex-col items-center justify-center px-8 pb-24 text-center">

        {/* ── SCENARIO 0: Priya working — almost nothing on screen ── */}
        {scenario === 0 && (
          <>
            <p className="text-[11px] font-medium text-gray-300 tracking-widest mb-8">2025 FILING · #467501</p>
            <p className="text-[64px] font-black text-gray-900 leading-none tracking-tight mb-3">$3,240</p>
            <p className="text-sm text-gray-400 mb-14">Estimated federal refund</p>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse flex-shrink-0" />
              Priya is working on your return
            </div>
            <p className="text-xs text-gray-300 mt-2">Nothing needed from you · Est. Thursday, May 22</p>
          </>
        )}

        {/* ── SCENARIO 1: One task for you ── */}
        {scenario === 1 && (
          <>
            <p className="text-[11px] font-medium text-gray-300 tracking-widest mb-12">ONE THING FROM YOU</p>
            <p className="text-2xl font-bold text-gray-900 mb-2">Q2 Broker Statement</p>
            <p className="text-sm text-gray-500 max-w-[280px] mb-12 leading-relaxed">
              Priya needs this to finalize your investment income. Everything else is done.
            </p>
            <label className="inline-flex items-center gap-3 border border-gray-200 bg-white rounded-2xl px-7 py-4 cursor-pointer hover:border-gray-300 hover:shadow-sm transition-all">
              <ArrowRight size={14} className="text-gray-400 -rotate-90 flex-shrink-0" />
              <span className="text-sm font-medium text-gray-700">Upload document</span>
              <input type="file" className="hidden" />
            </label>
            <p className="text-[11px] text-gray-300 mt-4">PDF · About 1 minute</p>
          </>
        )}

        {/* ── SCENARIO 2: Filed ── */}
        {scenario === 2 && (
          <>
            <p className="text-[11px] font-medium text-gray-300 tracking-widest mb-8">2025 FILING · #467501</p>
            <p className="text-[64px] font-black text-gray-900 leading-none tracking-tight mb-3">Filed.</p>
            <p className="text-sm text-gray-400 mb-10">May 23, 2025 · Prepared by Priya Nair</p>
            <div className="space-y-2 text-sm text-gray-400">
              <p>Federal refund of <span className="text-gray-700 font-semibold">$3,240</span> · Expected within 21 days</p>
              <p>NY State payment of <span className="text-gray-700 font-semibold">$847</span> · Submitted</p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
