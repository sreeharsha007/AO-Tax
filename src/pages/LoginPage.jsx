import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { UserCirclePlus, UserCircle, ArrowCircleRight } from '@phosphor-icons/react'
import { useTheme } from '../context/ThemeContext'

export default function LoginPage() {
  const navigate = useNavigate()
  const { theme } = useTheme()
  const loft = theme.id === 'loft'

  return (
    <div className={`min-h-screen ${theme.pageBg} flex flex-col relative overflow-hidden`}>

      {/* Loft: ambient glow behind content */}
      {loft && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
          <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-200/25 rounded-full blur-3xl" />
          <div className="absolute bottom-[-80px] right-[-100px] w-[400px] h-[400px] bg-indigo-100/30 rounded-full blur-3xl" />
        </div>
      )}

      <header className="relative px-6 py-5 z-10">
        <span
          className="font-bold text-sm tracking-wide text-gray-900"
          style={{ fontFamily: theme.fontHeading }}
        >
          AOTax
        </span>
      </header>

      <div className="relative flex-1 flex flex-col items-center justify-center px-6 pb-16 z-10">
        <div className="w-full max-w-sm">

          {/* Loft: icon badge above heading */}
          {loft && (
            <div className="mb-6">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-[0_4px_16px_rgba(29,78,216,0.35)]">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M9 12h6M9 16h4M7 4H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2h-2" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
                  <path d="M9 4h6a1 1 0 011 1v2H8V5a1 1 0 011-1z" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          )}

          {/* Staggered entrance in Loft */}
          <div
            className={loft ? 'item-enter' : ''}
            style={loft ? { animationDelay: '0ms' } : undefined}
          >
            <div className="mb-10">
              <h1
                className={`${theme.loginHeadingCls} text-gray-900`}
                style={{ fontFamily: theme.fontHeading }}
              >
                Welcome.
              </h1>
              <p className={`${theme.heroTagline} mt-2.5 leading-relaxed`}>
                Tax filing managed by experts,<br className={loft ? '' : 'hidden'} /> built around you.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {/* New user CTA */}
            <div
              className={loft ? 'item-enter' : ''}
              style={loft ? { animationDelay: '80ms' } : undefined}
            >
              <button
                onClick={() => navigate('/signup')}
                className={`w-full flex items-center justify-between ${theme.btnPrimary} ${theme.btnRadius} px-5 py-4 transition-all group ${loft ? 'loft-card-hover' : ''}`}
                style={loft ? { boxShadow: '0 4px 16px rgba(29,78,216,0.30)' } : undefined}
              >
                <div className="flex items-center gap-3">
                  {loft ? (
                    <UserCirclePlus size={22} weight="duotone" className="opacity-80 flex-shrink-0" />
                  ) : null}
                  <div className="text-left">
                    <p className="text-sm font-semibold">New to AOTax</p>
                    <p className="text-xs opacity-60 mt-0.5">Create your account</p>
                  </div>
                </div>
                <ArrowRight size={16} className="opacity-50 group-hover:opacity-80 transition-opacity" />
              </button>
            </div>

            {/* Returning user CTA */}
            <div
              className={loft ? 'item-enter' : ''}
              style={loft ? { animationDelay: '140ms' } : undefined}
            >
              <button
                onClick={() => navigate('/auth')}
                className={`w-full flex items-center justify-between ${theme.btnSecondary} ${theme.btnRadius} px-5 py-4 transition-all group ${loft ? 'loft-card-hover' : ''}`}
                style={loft ? { boxShadow: '0 2px 8px rgba(0,0,0,0.06)' } : undefined}
              >
                <div className="flex items-center gap-3">
                  {loft ? (
                    <UserCircle size={22} weight="duotone" className="text-blue-600 flex-shrink-0" />
                  ) : null}
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-800">Returning customer</p>
                    <p className="text-xs text-gray-400 mt-0.5">Sign in to your account</p>
                  </div>
                </div>
                <ArrowRight size={16} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
              </button>
            </div>
          </div>

          {/* Loft: trust signal */}
          {loft && (
            <p
              className="text-center text-[11px] text-gray-400 mt-10 leading-relaxed item-enter"
              style={{ animationDelay: '200ms' }}
            >
              Trusted by 12,000+ filers · IRS-authorized · Bank-level encryption
            </p>
          )}
        </div>
      </div>

      <footer className="relative pb-8 text-center z-10">
        <p className="text-[11px] text-gray-400">© 2025 AOTax. All rights reserved.</p>
      </footer>
    </div>
  )
}
