import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { LayoutGrid, FolderOpen, Gift, Bell, ChevronDown, Users } from 'lucide-react'

const navItems = [
  { label: 'Dashboard',      icon: LayoutGrid, key: 'dashboard', path: '/' },
  { label: 'Document Vault', icon: FolderOpen,  key: 'vault',    badge: 12 },
  { label: 'Invite & Earn',  icon: Gift,        key: 'invite' },
]

export default function Navbar({ activePage = 'dashboard', dark = false, isReturningUser = false, onToggleUserType, profileNavStyle, onSetProfileNavStyle }) {
  const navigate = useNavigate()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const hasDropdown = !!(onToggleUserType || onSetProfileNavStyle)

  useEffect(() => {
    if (!dropdownOpen) return
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [dropdownOpen])

  const bg = dark ? 'bg-[#0f1923] border-white/10' : 'bg-white border-gray-200'
  const logoText = dark ? 'text-white' : 'text-gray-900'
  const logoSub = dark ? 'text-gray-500' : 'text-gray-400'
  const nameText = dark ? 'text-white' : 'text-gray-800'
  const idText = dark ? 'text-gray-500' : 'text-gray-400'
  const bellColor = dark ? 'text-gray-400 hover:bg-white/10' : 'text-gray-600 hover:bg-gray-100'

  return (
    <nav className={`${bg} border-b px-6 h-14 hidden md:flex items-center justify-between sticky top-0 z-10`}>
      {/* Logo — left */}
      <button onClick={() => navigate('/')} className="flex items-center gap-1">
        <span className={`font-bold text-sm tracking-wide ${logoText}`}>AOTax</span>
      </button>

      {/* Nav items — absolutely centered, hidden on mobile/tablet */}
      <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-1">
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
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => hasDropdown && setDropdownOpen(o => !o)}
            className={`flex items-center gap-2 ${hasDropdown ? '' : 'cursor-default'}`}
          >
            <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-xs font-semibold">
              SR
            </div>
            <div className="leading-tight hidden sm:block">
              <div className={`text-xs font-semibold ${nameText}`}>Surajit Ray</div>
              <div className={`text-[10px] ${idText}`}>#155593</div>
            </div>
            {hasDropdown && <ChevronDown size={14} className={`text-gray-500 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />}
          </button>

          {dropdownOpen && hasDropdown && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50">
              {onToggleUserType && (
                <div className="px-3 pt-3 pb-2">
                  <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-2">Demo mode</p>
                  <button
                    onClick={() => { onToggleUserType(); setDropdownOpen(false) }}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${isReturningUser ? 'bg-purple-100' : 'bg-blue-100'}`}>
                      <Users size={13} className={isReturningUser ? 'text-purple-600' : 'text-blue-600'} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-800">
                        {isReturningUser ? 'Returning user' : 'New user'}
                      </p>
                      <p className="text-[10px] text-gray-400">
                        Switch to {isReturningUser ? 'new' : 'returning'} user
                      </p>
                    </div>
                  </button>
                </div>
              )}
              {onSetProfileNavStyle && (
                <div className={`px-3 pt-3 pb-3 ${onToggleUserType ? 'border-t border-gray-100' : ''}`}>
                  <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-2">Form navigation</p>
                  <div className="flex flex-col gap-1">
                    {[
                      { value: 'sidebar', label: 'Side panel' },
                      { value: 'header', label: 'Header pill' },
                      { value: 'progress', label: 'Progress bar' },
                    ].map(({ value, label }) => (
                      <button
                        key={value}
                        onClick={() => { onSetProfileNavStyle(value); setDropdownOpen(false) }}
                        className={`w-full text-left px-3 py-1.5 rounded-lg text-[11px] font-medium transition-colors ${
                          profileNavStyle === value ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
