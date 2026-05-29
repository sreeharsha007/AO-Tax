import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

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

export default function DemoHub() {
  const navigate = useNavigate()

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
        <div className="w-full max-w-md">

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
  )
}
