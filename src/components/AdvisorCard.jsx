import { MessageCircle, Phone } from 'lucide-react'

export default function AdvisorCard() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <p className="text-[10px] font-semibold text-gray-400 tracking-widest mb-3">YOUR ADVISOR</p>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
          PN
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900">Priya Nair</p>
          <p className="text-xs text-gray-500">Senior Tax Advisor</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-3">
        <button className="flex items-center justify-center gap-1.5 bg-white text-gray-700 text-xs font-medium py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
          <MessageCircle size={13} /> Message
        </button>
        <button className="flex items-center justify-center gap-1.5 border border-gray-200 text-gray-700 text-xs font-medium py-2 rounded-lg hover:bg-gray-50 transition-colors">
          <Phone size={13} /> Call
        </button>
      </div>
      <p className="text-[11px] text-gray-400 text-center">Mon–Fri · 9am–7pm ET</p>
    </div>
  )
}
