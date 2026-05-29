import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export default function LoginPage() {
  const navigate = useNavigate()
  const { theme } = useTheme()

  return (
    <div className={`min-h-screen ${theme.pageBg} flex flex-col`}>
      <header className="px-6 py-5">
        <span className="font-bold text-sm tracking-wide text-gray-900" style={{ fontFamily: theme.fontHeading }}>AOTax</span>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-16">
        <div className="w-full max-w-sm">
          <div className="mb-10">
            <h1
              className="text-4xl font-bold text-gray-900 tracking-tight leading-tight"
              style={{ fontFamily: theme.fontHeading }}
            >
              Welcome.
            </h1>
            <p className="text-gray-500 text-sm mt-2">
              Tax filing managed by experts, built around you.
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => navigate('/signup')}
              className={`w-full flex items-center justify-between ${theme.btnPrimary} ${theme.btnRadius} px-5 py-4 transition-colors group`}
            >
              <div className="text-left">
                <p className="text-sm font-semibold">New to AOTax</p>
                <p className="text-xs opacity-60 mt-0.5">Create your account</p>
              </div>
              <ArrowRight size={16} className="opacity-50 group-hover:opacity-80 transition-opacity" />
            </button>

            <button
              onClick={() => navigate('/auth')}
              className={`w-full flex items-center justify-between ${theme.btnSecondary} ${theme.btnRadius} px-5 py-4 transition-colors group`}
            >
              <div className="text-left">
                <p className="text-sm font-semibold">Returning customer</p>
                <p className="text-xs text-gray-400 mt-0.5">Sign in to your account</p>
              </div>
              <ArrowRight size={16} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
            </button>
          </div>
        </div>
      </div>

      <footer className="pb-8 text-center">
        <p className="text-[11px] text-gray-400">© 2025 AOTax. All rights reserved.</p>
      </footer>
    </div>
  )
}
