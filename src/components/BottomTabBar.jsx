import { useNavigate } from 'react-router-dom'
import { LayoutGrid, FolderOpen, Plus, Bell, User } from 'lucide-react'

const leftTabs  = [
  { label: 'Home',  icon: LayoutGrid, key: 'dashboard', path: '/' },
  { label: 'Vault', icon: FolderOpen,  key: 'vault',    badge: 12 },
]
const rightTabs = [
  { label: 'Alerts',   icon: Bell, key: 'notifications', dot: true },
  { label: 'Profile',  icon: User, key: 'profile' },
]

function Tab({ label, icon: Icon, tabKey, badge, dot, path, activePage, navigate }) {
  const isActive = activePage === tabKey
  return (
    <button
      onClick={() => path && navigate(path)}
      className={`relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all ${
        isActive ? 'text-white' : 'text-gray-500 hover:text-gray-300'
      }`}
    >
      <div className="relative">
        <Icon size={20} />
        {badge != null && (
          <span className="absolute -top-1 -right-2 text-[9px] font-bold bg-amber-400 text-gray-900 rounded-full w-3.5 h-3.5 flex items-center justify-center leading-none">
            {badge}
          </span>
        )}
        {dot && (
          <span className="absolute top-0 right-0 w-2 h-2 bg-yellow-400 rounded-full" />
        )}
      </div>
      <span className={`text-[10px] font-medium leading-none ${isActive ? 'text-white' : 'text-gray-500'}`}>
        {label}
      </span>
    </button>
  )
}

export default function BottomTabBar({ activePage = 'dashboard', onNewFiling }) {
  const navigate = useNavigate()
  const tabProps  = { activePage, navigate }

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 md:hidden w-full max-w-sm px-4">
      <div className="flex items-center justify-around bg-[#0f1923] rounded-2xl px-2 py-2 shadow-2xl shadow-black/40">
        {leftTabs.map(t => <Tab key={t.key} {...t} tabKey={t.key} {...tabProps} />)}

        {/* Centre — New Filing */}
        <button
          onClick={onNewFiling}
          className="flex items-center justify-center w-11 h-11 rounded-full bg-white shadow-md"
        >
          <Plus size={22} className="text-gray-900" strokeWidth={2.5} />
        </button>

        {rightTabs.map(t => <Tab key={t.key} {...t} tabKey={t.key} {...tabProps} />)}
      </div>
    </div>
  )
}
