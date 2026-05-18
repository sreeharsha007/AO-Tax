import { Upload, ArrowRight } from 'lucide-react'

export default function NextStep() {
  return (
    <div className="bg-[#1a2332] rounded-xl px-6 py-5 flex items-center gap-5">
      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
        <Upload size={18} className="text-white" />
      </div>
      <div className="flex-1">
        <p className="text-[10px] font-semibold text-gray-400 tracking-widest mb-0.5">NEXT STEP</p>
        <p className="text-white font-semibold text-base">Upload last two pay stubs</p>
        <p className="text-gray-400 text-sm">Priya needs them to finalize your draft.</p>
      </div>
      <button className="flex items-center gap-2 border border-white/30 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-white/10 transition-colors flex-shrink-0">
        Upload documents
        <ArrowRight size={15} />
      </button>
    </div>
  )
}
