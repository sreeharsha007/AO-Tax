import { useNavigate } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { THEMES, THEME_LIST } from '../themes'

const FLOWS = [
  {
    label: 'Login page',
    sub: 'Entry point — new vs returning selector',
    path: '/login',
  },
  {
    label: 'Self sign-up',
    sub: 'New user — account creation, OTP inline, profile wizard',
    path: '/signup',
  },
  {
    label: 'Invite link',
    sub: 'New user — name & email pre-filled from URL',
    path: '/invite?firstName=Arjun&lastName=Mehta&email=arjun.mehta%40gmail.com',
  },
]

function DirectionCard({ themeId, isActive, onSelect }) {
  const t = THEMES[themeId]

  return (
    <button
      onClick={() => onSelect(themeId)}
      className={`relative w-full text-left rounded-2xl border-2 overflow-hidden transition-all duration-200 ${
        isActive
          ? 'border-gray-900 shadow-lg scale-[1.02]'
          : 'border-gray-200 hover:border-gray-400 hover:shadow-md'
      }`}
    >
      {/* Mini app preview */}
      <div
        className="p-3 pb-2"
        style={{ background: t.previewPageBg }}
      >
        {/* Mini navbar */}
        <div className="h-3 rounded-md bg-[#0f1923] mb-2 w-full" />

        {/* Mini card — shadow and border from direction tokens */}
        <div
          className="bg-white p-2 mb-2"
          style={{
            borderRadius: t.previewCardRadius,
            boxShadow: t.cardShadow ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
            border: themeId === 'default' ? '1px solid #e5e7eb' : '1px solid #f3f4f6',
          }}
        >
          <div className="flex items-center gap-1.5 mb-1.5">
            {/* Icon badge preview — tinted with accent color */}
            <div
              className="w-3 h-3 rounded flex-shrink-0"
              style={{
                background: t.iconBadge ? `${t.previewAccent}1a` : '#f3f4f6',
                borderRadius: t.previewCardRadius === '6px' ? '3px' : '4px',
              }}
            />
            <div className="h-1.5 rounded-full bg-gray-200 flex-1" />
          </div>
          <div className="h-1 bg-gray-100 rounded-full w-3/4" />
        </div>

        {/* Mini button */}
        <div
          className="h-3.5 w-full"
          style={{
            background: t.previewAccent,
            borderRadius: t.previewBtnRadius,
          }}
        />
      </div>

      {/* Label row */}
      <div
        className="px-3 py-2 flex items-center justify-between"
        style={{ background: isActive ? '#f9fafb' : '#ffffff' }}
      >
        <div>
          <p className="text-xs font-semibold text-gray-900">{t.name}</p>
          <p className="text-[10px] text-gray-400 leading-tight">{t.description}</p>
        </div>
        {isActive && (
          <div className="w-4 h-4 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0">
            <Check size={9} className="text-white" strokeWidth={3} />
          </div>
        )}
      </div>
    </button>
  )
}

export default function DemoHub() {
  const navigate = useNavigate()
  const { themeId, setTheme } = useTheme()

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="px-8 py-6 flex items-center justify-between border-b border-gray-200/60">
        <div className="flex items-center gap-3">
          <span className="font-bold text-sm tracking-wide text-gray-900">AOTax</span>
          <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Prototype</span>
        </div>
        <p className="text-xs text-gray-400">Design exploration hub</p>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-8 py-12">
        <div className="w-full max-w-lg space-y-10">

          {/* Direction selector */}
          <div>
            <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-4">
              Visual direction
            </p>
            <div className={`grid gap-3 ${THEME_LIST.length <= 2 ? 'grid-cols-2' : THEME_LIST.length <= 3 ? 'grid-cols-3' : 'grid-cols-4'}`}>
              {THEME_LIST.map(id => (
                <DirectionCard
                  key={id}
                  themeId={id}
                  isActive={themeId === id}
                  onSelect={setTheme}
                />
              ))}
            </div>
            {themeId !== 'default' && (
              <p className="text-xs text-gray-500 mt-3 leading-relaxed">
                <span className="font-semibold text-gray-700">{THEMES[themeId].name}</span>
                {' '}— {THEMES[themeId].description}. All flows below reflect this direction.
              </p>
            )}
          </div>

          {/* Flow selector */}
          <div>
            <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-4">
              Flows
            </p>
            <div className="space-y-2">
              {FLOWS.map(({ label, sub, path }) => (
                <button
                  key={path}
                  onClick={() => navigate(path)}
                  className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-xl px-5 py-4 hover:border-gray-400 hover:shadow-sm transition-all group text-left"
                >
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{label}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{sub}</p>
                  </div>
                  <ArrowRight size={15} className="text-gray-300 group-hover:text-gray-500 transition-colors flex-shrink-0 ml-4" />
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
