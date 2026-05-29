import { RefreshCw, AlertCircle, FileText, BookOpen } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const resources = [
  { icon: RefreshCw,   title: 'Check refund status',    sub: "IRS Where's My Refund tool" },
  { icon: AlertCircle, title: 'Received an IRS notice?', sub: 'We respond on your behalf' },
  { icon: FileText,    title: 'How to read your return', sub: 'A short walkthrough' },
  { icon: BookOpen,    title: 'How to file with AOTax',  sub: 'Step-by-step guide' },
]

export default function ResourcesSection() {
  const { theme } = useTheme()

  return (
    <div className={`${theme.card} ${theme.cardRadius} p-5`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-900">Resources</h3>
        <button className={`md:hidden text-xs font-medium ${theme.accentText} ${theme.accentTextHover} transition-colors`}>
          View all
        </button>
      </div>

      {/* Mobile: 4 in a single row */}
      <div className="md:hidden grid grid-cols-4 gap-1">
        {resources.map(({ icon: Icon, title }) => (
          <button
            key={title}
            className="flex flex-col items-center gap-2 p-2 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <div className={`w-11 h-11 rounded-full ${theme.iconDefault} flex items-center justify-center flex-shrink-0`}>
              <Icon size={17} />
            </div>
            <p className="text-[10px] font-medium text-gray-600 text-center leading-tight">{title}</p>
          </button>
        ))}
      </div>

      {/* Desktop: 2-col card grid */}
      <div className="hidden md:grid grid-cols-2 gap-3">
        {resources.map(({ icon: Icon, title, sub }) => (
          <button
            key={title}
            className={`text-left p-3 ${theme.cardRadius} border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-colors`}
          >
            <div className={`w-7 h-7 rounded-lg ${theme.iconDefault} flex items-center justify-center mb-2`}>
              <Icon size={14} />
            </div>
            <p className="text-xs font-medium text-gray-800 leading-tight">{title}</p>
            <p className="text-[11px] text-gray-400 mt-0.5 leading-tight">{sub}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
