import { RefreshCw, AlertCircle, FileText, BookOpen } from 'lucide-react'

const resources = [
  { icon: RefreshCw, title: 'Check refund status', sub: "IRS Where's My Refund tool" },
  { icon: AlertCircle, title: 'Received an IRS notice?', sub: 'We respond on your behalf' },
  { icon: FileText, title: 'How to read your return', sub: 'A short walkthrough' },
  { icon: BookOpen, title: 'How to file with AOTax', sub: 'Step-by-step guide' },
]

export default function ResourcesSection() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">Resources</h3>
      <div className="grid grid-cols-2 gap-3">
        {resources.map(({ icon: Icon, title, sub }) => (
          <button
            key={title}
            className="text-left p-3 rounded-lg border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center mb-2">
              <Icon size={14} className="text-gray-600" />
            </div>
            <p className="text-xs font-medium text-gray-800 leading-tight">{title}</p>
            <p className="text-[11px] text-gray-400 mt-0.5 leading-tight">{sub}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
