import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { COUNTRIES } from '../utils/inferProfile'
import { useTheme } from '../context/ThemeContext'
import ReturningUserConfirmation from '../components/ReturningUserConfirmation'

function OTPInput({ value, onChange, inputCls }) {
  const refs = useRef([])
  const digits = value.padEnd(6, '').split('').slice(0, 6)

  function handleChange(i, e) {
    const ch = e.target.value.replace(/\D/g, '').slice(-1)
    const next = [...digits]
    next[i] = ch
    onChange(next.join('').trim())
    if (ch && i < 5) refs.current[i + 1]?.focus()
  }

  function handleKeyDown(i, e) {
    if (e.key === 'Backspace') {
      if (digits[i]) {
        const next = [...digits]
        next[i] = ''
        onChange(next.join('').trim())
      } else if (i > 0) {
        refs.current[i - 1]?.focus()
      }
    }
  }

  function handlePaste(e) {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (pasted) {
      onChange(pasted)
      refs.current[Math.min(pasted.length, 5)]?.focus()
    }
    e.preventDefault()
  }

  return (
    <div className="flex gap-3" onPaste={handlePaste}>
      {Array.from({ length: 6 }).map((_, i) => (
        <input
          key={i}
          ref={el => refs.current[i] = el}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digits[i] || ''}
          onChange={e => handleChange(i, e)}
          onKeyDown={e => handleKeyDown(i, e)}
          className={`w-11 h-12 text-center text-xl font-semibold focus:outline-none transition-colors ${inputCls}`}
        />
      ))}
    </div>
  )
}

export default function ExistingUserLogin() {
  const navigate = useNavigate()
  const { theme } = useTheme()
  const [identifier, setIdentifier] = useState('')
  const [country, setCountry] = useState('US')
  const [countryOpen, setCountryOpen] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState('')
  const [resendTimer, setResendTimer] = useState(0)
  const [confirmStep, setConfirmStep] = useState(false)

  useEffect(() => {
    if (resendTimer <= 0) return
    const t = setTimeout(() => setResendTimer(r => r - 1), 1000)
    return () => clearTimeout(t)
  }, [resendTimer])

  const isEmail = identifier.includes('@')
  const canSend = isEmail ? identifier.includes('.') : identifier.replace(/\D/g, '').length >= 6
  const selectedCountry = COUNTRIES.find(c => c.code === country) || COUNTRIES[0]

  function handleSend() {
    setOtpSent(true)
    setResendTimer(30)
    setOtp('')
  }

  return (
    <div className={`min-h-screen ${theme.pageBg} flex flex-col`}>
      <header className="flex items-center gap-3 px-6 py-5">
        <button
          onClick={() => confirmStep ? setConfirmStep(false) : navigate('/')}
          className="text-gray-400 hover:text-gray-700 transition-colors"
        >
          <ArrowLeft size={18} />
        </button>
        <span className="font-bold text-sm tracking-wide text-gray-900" style={{ fontFamily: theme.fontHeading }}>AOTax</span>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-16">

        {confirmStep ? (
          /* ── Step 3: Profile confirmation ── */
          <div className="w-full max-w-lg">
            <div className="mb-8">
              <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-3">
                CONFIRM YOUR PROFILE · STEP 3 OF 3
              </p>
              <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: theme.fontHeading }}>
                One quick check.
              </h1>
              <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">
                Your profile from last year is on file — confirm it's still accurate before we get started.
              </p>
            </div>
            <ReturningUserConfirmation
              onConfirm={answers => navigate('/dashboard', { state: { returningProfileConfirmed: true, profileAnswers: answers } })}
            />
          </div>
        ) : (
          /* ── Steps 1 & 2: Email / OTP ── */
          <div className="w-full max-w-sm">
            <div className="mb-8">
              <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-3">
                {otpSent ? 'VERIFY · STEP 2 OF 3' : 'SIGN IN · STEP 1 OF 3'}
              </p>
              <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: theme.fontHeading }}>Welcome back.</h1>
              <p className="text-sm text-gray-500 mt-1">Enter your email or mobile to continue.</p>
            </div>

            <div className="space-y-4">
              <div>
                <div className={`relative flex ${theme.inputCls} overflow-visible focus-within:ring-0`} style={{ padding: 0 }}>
                  {!isEmail && (
                    <button
                      type="button"
                      onClick={() => setCountryOpen(o => !o)}
                      className="flex items-center gap-1.5 px-3 py-3 border-r border-gray-200 bg-gray-50 text-sm text-gray-700 whitespace-nowrap flex-shrink-0 hover:bg-gray-100 transition-colors rounded-l-[inherit]"
                    >
                      <span>{selectedCountry.flag}</span>
                      <span className="font-medium">{selectedCountry.dial}</span>
                    </button>
                  )}
                  <input
                    type="text"
                    placeholder="Email or mobile number"
                    value={identifier}
                    onChange={e => { setIdentifier(e.target.value); setOtpSent(false); setOtp('') }}
                    autoFocus
                    className="flex-1 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none bg-transparent"
                  />
                  {countryOpen && !isEmail && (
                    <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl border border-gray-200 shadow-lg z-20 overflow-hidden">
                      {COUNTRIES.map(c => (
                        <button
                          key={c.code}
                          onClick={() => { setCountry(c.code); setCountryOpen(false) }}
                          className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors text-left ${
                            c.code === country ? 'bg-gray-50 font-semibold text-gray-900' : 'text-gray-700'
                          }`}
                        >
                          <span>{c.flag}</span>
                          <span className="flex-1">{c.label}</span>
                          <span className="text-gray-400">{c.dial}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {canSend && !otpSent && (
                  <button
                    onClick={handleSend}
                    className={`mt-2 text-xs font-semibold ${theme.accentText} ${theme.accentTextHover} transition-colors`}
                  >
                    Send verification code →
                  </button>
                )}
              </div>

              {otpSent && (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className={theme.label}>Verification code</label>
                    <div>
                      {resendTimer > 0 ? (
                        <span className="text-[10px] text-gray-400">Resend in {resendTimer}s</span>
                      ) : (
                        <button
                          onClick={handleSend}
                          className={`text-[10px] font-semibold ${theme.accentText} ${theme.accentTextHover} transition-colors`}
                        >
                          Resend code
                        </button>
                      )}
                    </div>
                  </div>
                  <OTPInput value={otp} onChange={setOtp} inputCls={theme.inputCls} />
                  <p className="text-xs text-gray-400 mt-2">
                    Sent to {isEmail ? identifier : `${selectedCountry.dial} ${identifier}`}
                  </p>
                </div>
              )}

              <button
                onClick={() => setConfirmStep(true)}
                disabled={!otpSent || otp.length < 6}
                className={`w-full flex items-center justify-center gap-2 py-3.5 text-sm font-semibold transition-all ${theme.btnRadius} ${
                  otpSent && otp.length === 6
                    ? `${theme.btnPrimary}`
                    : theme.btnDisabled
                }`}
              >
                Sign in <ArrowRight size={15} />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
