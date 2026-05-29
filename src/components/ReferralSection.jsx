import { UserPlus, Copy, Link2, MessageCircle, Share2 } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const friends = [
  { initials: 'F1', name: 'Friend One', date: 'Jan 01, 2020', amount: '$10.00' },
  { initials: 'F2', name: 'Friend Two', date: 'Jan 01, 2020', amount: '$10.00' },
]

export default function ReferralSection() {
  const { theme } = useTheme()

  return (
    <div className={`${theme.card} ${theme.cardRadius} p-5`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-full ${theme.iconDefault} flex items-center justify-center`}>
            <UserPlus size={16} />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">Refer a friend, earn $25</p>
            <p className="text-xs text-gray-500">Use credits to pay invoices · Entry to $100k giveaway</p>
          </div>
        </div>
        <div className="text-right">
          <p className={theme.label}>BALANCE</p>
          <p className="text-xl font-bold text-gray-900">$0.00</p>
        </div>
      </div>

      <button className={`w-full flex items-center justify-center gap-2 ${theme.btnSecondary} ${theme.btnRadius} text-sm font-medium py-2 transition-colors mb-4`}>
        <Share2 size={15} />
        Invite friends
      </button>

      <div className="flex items-center gap-2 mb-3">
        <div className="flex-1 flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-600">
          <Share2 size={12} className="text-gray-400 flex-shrink-0" />
          my.aotax.com/login?refid=155593
        </div>
        <button className="text-xs font-medium text-gray-600 border border-gray-200 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1">
          <Copy size={12} /> Copy
        </button>
      </div>

      <div className="flex gap-2 mb-4">
        {[Share2, Link2, MessageCircle, Copy].map((Icon, i) => (
          <button
            key={i}
            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <Icon size={14} className="text-gray-500" />
          </button>
        ))}
      </div>

      <div className="hidden md:block space-y-2">
        {friends.map((f) => (
          <div key={f.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-semibold text-gray-600">
                {f.initials}
              </div>
              <span className="text-sm text-gray-700">{f.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400">{f.date}</span>
              <span className={`bg-gray-100 text-gray-500 text-[10px] font-semibold px-2 py-0.5 ${theme.badgeRadius}`}>Sample</span>
              <span className="text-sm font-medium text-gray-700">{f.amount}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
