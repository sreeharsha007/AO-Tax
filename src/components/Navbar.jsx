import { useNavigate } from 'react-router-dom'
import { LayoutGrid, Ticket, FolderOpen, Calendar, Gift, Bell, ChevronDown } from 'lucide-react'

const navItems = [
  { label: 'Dashboard', icon: LayoutGrid, key: 'dashboard', path: '/' },
  { label: 'My Filings', icon: Ticket, key: 'tickets', badge: 1, path: '/tickets/467501' },
  { label: 'Document Vault', icon: FolderOpen, key: 'vault', badge: 12 },
  { label: 'Important dates', icon: Calendar, key: 'dates' },
  { label: 'Invite & Earn', icon: Gift, key: 'invite' },
]

export default function Navbar({ activePage = 'dashboard', dark = false }) {
  const navigate = useNavigate()

  const bg = dark ? 'bg-[#0f1923] border-white/10' : 'bg-white border-gray-200'
  const logoText = dark ? 'text-white' : 'text-gray-900'
  const logoSub = dark ? 'text-gray-500' : 'text-gray-400'
  const nameText = dark ? 'text-white' : 'text-gray-800'
  const idText = dark ? 'text-gray-500' : 'text-gray-400'
  const bellColor = dark ? 'text-gray-400 hover:bg-white/10' : 'text-gray-600 hover:bg-gray-100'

  return (
    <nav className={`${bg} border-b px-6 h-14 flex items-center justify-between sticky top-0 z-10`}>
      {/* Logo — left */}
      <button onClick={() => navigate('/')} className="flex items-center gap-1">
        <span className={`font-bold text-sm tracking-wide ${logoText}`}>AOTax</span>
      </button>

      {/* Nav items — absolutely centered */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1">
        {navItems.map(({ label, icon: Icon, key, badge, path }) => {
          const isActive = activePage === key
          const activeStyle = dark
            ? 'text-white border-b-2 border-white rounded-none pb-0'
            : 'bg-gray-100 text-gray-900'
          const inactiveStyle = dark
            ? 'text-gray-400 hover:text-white'
            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
          return (
            <button
              key={key}
              onClick={() => path && navigate(path)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                isActive ? activeStyle : inactiveStyle
              }`}
            >
              <Icon size={15} />
              {label}
              {badge != null && (
                <span className={`text-[10px] font-semibold rounded-full px-1.5 py-0.5 leading-none ${
                  dark ? 'bg-white/20 text-white' : 'bg-gray-800 text-white'
                }`}>
                  {badge}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Right — bell + user */}
      <div className="flex items-center gap-3">
        <button className={`relative p-2 rounded-full ${bellColor}`}>
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-yellow-400 rounded-full" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-xs font-semibold">
            SR
          </div>
          <div className="leading-tight">
            <div className={`text-xs font-semibold ${nameText}`}>Surajit Ray</div>
            <div className={`text-[10px] ${idText}`}>#155593</div>
          </div>
          {dark && <ChevronDown size={14} className="text-gray-500" />}
        </div>
      </div>
    </nav>
  )
}
