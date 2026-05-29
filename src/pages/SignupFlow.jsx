import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import ProfileWizard from '../components/ProfileWizard'
import { COUNTRIES, buildSectionList } from '../utils/inferProfile'
import { useTheme } from '../context/ThemeContext'

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

function MobileInput({ country, setCountry, mobile, setMobile, theme }) {
  const [open, setOpen] = useState(false)
  const selected = COUNTRIES.find(c => c.code === country) || COUNTRIES[0]

  return (
    <div className={`relative flex ${theme.inputCls} overflow-visible`} style={{ padding: 0 }}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1.5 px-3 py-3 border-r border-gray-200 bg-gray-50 text-sm text-gray-700 whitespace-nowrap flex-shrink-0 hover:bg-gray-100 transition-colors rounded-l-[inherit]"
      >
        <span>{selected.flag}</span>
        <span className="font-medium">{selected.dial}</span>
      </button>
      <input
        type="tel"
        placeholder="Mobile number"
        value={mobile}
        onChange={e => setMobile(e.target.value.replace(/\D/g, ''))}
        className="flex-1 px-3 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none bg-transparent"
      />
      {open && (
        <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl border border-gray-200 shadow-lg z-20 overflow-hidden">
          {COUNTRIES.map(c => (
            <button
              key={c.code}
              onClick={() => { setCountry(c.code); setOpen(false) }}
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
  )
}

function FieldLabel({ children, theme }) {
  return (
    <label className={`block mb-1.5 ${theme.label}`}>
      {children}
    </label>
  )
}

function TextInput({ placeholder, value, onChange, type = 'text', autoFocus, inputCls }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      autoFocus={autoFocus}
      className={`w-full px-4 py-3 text-sm focus:outline-none transition-colors ${inputCls}`}
    />
  )
}

const STEP_KEYS = ['account', 'profile']

export default function SignupFlow({ initialData = {} }) {
  const navigate = useNavigate()
  const { theme } = useTheme()
  const [step, setStep] = useState('account')
  const [profileAnswers, setProfileAnswers] = useState(null)

  const [form, setForm] = useState({
    firstName:  initialData.firstName  || '',
    lastName:   initialData.lastName   || '',
    middleName: initialData.middleName || '',
    email:      initialData.email      || '',
    country:    'US',
    mobile:     '',
  })
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState('')
  const [resendTimer, setResendTimer] = useState(0)

  useEffect(() => {
    if (resendTimer <= 0) return
    const t = setTimeout(() => setResendTimer(r => r - 1), 1000)
    return () => clearTimeout(t)
  }, [resendTimer])

  const stepIndex = STEP_KEYS.indexOf(step)

  function set(key, val) {
    setForm(prev => ({ ...prev, [key]: val }))
  }

  const fieldsValid = form.firstName.trim() && form.lastName.trim() && form.email.trim() && form.mobile.length >= 6
  const canSendOtp  = form.mobile.length >= 6
  const canContinue = fieldsValid && otpSent && otp.length === 6

  function handleSendOtp() {
    setOtpSent(true)
    setResendTimer(30)
    setOtp('')
  }

  function handleContinue() {
    setStep('welcome')
  }

  function handleProfileComplete(answers) {
    setProfileAnswers(answers)
    setStep('reveal')
  }

  function handleProfileSkip() {
    navigate('/dashboard', { state: { isNewUser: true, assessmentSkipped: true, firstName: form.firstName } })
  }

  function handleStartFiling() {
    const sections = profileAnswers ? buildSectionList(profileAnswers) : []
    navigate('/tickets/467501', {
      state: {
        assessmentComplete: true,
        assessmentSectionCount: sections.length,
        assessmentAnswers: profileAnswers ?? null,
      },
    })
  }

  const selectedCountry = COUNTRIES.find(c => c.code === form.country) || COUNTRIES[0]
  const sections = profileAnswers ? buildSectionList(profileAnswers) : []

  return (
    <div className={`min-h-screen ${theme.pageBg} flex flex-col`}>
      <header className="flex items-center justify-between px-6 py-5 flex-shrink-0">
        <span className="font-bold text-sm tracking-wide text-gray-900" style={{ fontFamily: theme.fontHeading }}>AOTax</span>
        {(step === 'account' || step === 'profile') && (
          <div className="flex gap-1.5">
            {STEP_KEYS.map((s, i) => (
              <div
                key={s}
                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                  stepIndex >= i ? theme.accentBg : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        )}
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-12">
        <div className={`w-full ${step === 'profile' ? 'max-w-lg' : 'max-w-sm'}`}>

          {/* Step: Account */}
          {step === 'account' && (
            <div>
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: theme.fontHeading }}>Create your account</h1>
                <p className="text-sm text-gray-500 mt-1">Just the basics to get started.</p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <FieldLabel theme={theme}>First name</FieldLabel>
                    <TextInput placeholder="First" value={form.firstName} onChange={v => set('firstName', v)} autoFocus inputCls={theme.inputCls} />
                  </div>
                  <div>
                    <FieldLabel theme={theme}>Last name</FieldLabel>
                    <TextInput placeholder="Last" value={form.lastName} onChange={v => set('lastName', v)} inputCls={theme.inputCls} />
                  </div>
                </div>

                <div>
                  <FieldLabel theme={theme}>Middle name <span className="normal-case font-normal tracking-normal text-[10px]">optional</span></FieldLabel>
                  <TextInput placeholder="Middle" value={form.middleName} onChange={v => set('middleName', v)} inputCls={theme.inputCls} />
                </div>

                <div>
                  <FieldLabel theme={theme}>Email address</FieldLabel>
                  <TextInput type="email" placeholder="you@example.com" value={form.email} onChange={v => set('email', v)} inputCls={theme.inputCls} />
                </div>

                <div>
                  <FieldLabel theme={theme}>Mobile number</FieldLabel>
                  <MobileInput
                    country={form.country}
                    setCountry={v => set('country', v)}
                    mobile={form.mobile}
                    setMobile={v => set('mobile', v)}
                    theme={theme}
                  />
                  {canSendOtp && !otpSent && (
                    <button
                      onClick={handleSendOtp}
                      className={`mt-2 text-xs font-semibold ${theme.accentText} ${theme.accentTextHover} transition-colors`}
                    >
                      Send verification code →
                    </button>
                  )}
                </div>

                {otpSent && (
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <FieldLabel theme={theme}>Verification code</FieldLabel>
                      <div className="pb-1.5">
                        {resendTimer > 0 ? (
                          <span className="text-[10px] text-gray-400">Resend in {resendTimer}s</span>
                        ) : (
                          <button
                            onClick={handleSendOtp}
                            className={`text-[10px] font-semibold ${theme.accentText} ${theme.accentTextHover} transition-colors`}
                          >
                            Resend code
                          </button>
                        )}
                      </div>
                    </div>
                    <OTPInput value={otp} onChange={setOtp} inputCls={theme.inputCls} />
                    <p className="text-xs text-gray-400 mt-2">
                      Sent to {selectedCountry.dial} {form.mobile}
                    </p>
                  </div>
                )}
              </div>

              <button
                onClick={handleContinue}
                disabled={!canContinue}
                className={`mt-8 w-full flex items-center justify-center gap-2 py-3.5 text-sm font-semibold transition-all ${theme.btnRadius} ${
                  canContinue ? `${theme.btnPrimary}` : theme.btnDisabled
                }`}
              >
                Continue <ArrowRight size={15} />
              </button>
            </div>
          )}

          {/* Step: Welcome */}
          {step === 'welcome' && (
            <div className="text-center">
              <div className={`w-16 h-16 rounded-full ${theme.accentBg} flex items-center justify-center mx-auto mb-5`}>
                <span className="text-white text-lg font-semibold tracking-wide">
                  {(form.firstName[0] || '').toUpperCase()}{(form.lastName[0] || '').toUpperCase()}
                </span>
              </div>

              <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: theme.fontHeading }}>
                Welcome, {form.firstName}.
              </h1>
              <p className="text-sm text-gray-500 mt-1.5">Your account is ready.</p>

              <p className="text-sm text-gray-600 leading-relaxed mt-8 max-w-xs mx-auto">
                A few questions help us understand your tax situation and tailor your 2025 return. Takes about a minute.
              </p>

              <div className="mt-8 space-y-3">
                <button
                  onClick={() => setStep('profile')}
                  className={`w-full flex items-center justify-center gap-2 ${theme.btnPrimary} ${theme.btnRadius} py-3.5 text-sm font-semibold transition-colors`}
                >
                  Set up my 2025 filing <ArrowRight size={15} />
                </button>
                <button
                  onClick={() => navigate('/dashboard', { state: { isNewUser: true, assessmentSkipped: true, firstName: form.firstName } })}
                  className={`w-full text-sm font-medium ${theme.accentText} ${theme.accentTextHover} transition-colors py-2`}
                >
                  I'll fill this during my first filing
                </button>
              </div>
            </div>
          )}

          {/* Step: Profile wizard */}
          {step === 'profile' && (
            <div>
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-3xl font-bold text-gray-900" style={{ fontFamily: theme.fontHeading }}>Set up your 2025 filing</h1>
                  <span className={`text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 ${theme.btnRadius} ${theme.accentLight} ${theme.accentText} border ${theme.accentBorder}`}>
                    Tax Year 2025
                  </span>
                </div>
                <p className="text-sm text-gray-500">Helps us tailor your filing. Takes about a minute.</p>
              </div>
              <ProfileWizard onComplete={handleProfileComplete} onSkip={handleProfileSkip} />
            </div>
          )}

          {/* Step: Reveal */}
          {step === 'reveal' && (
            <div className="text-center">
              <div className={`w-11 h-11 rounded-full ${theme.accentLight} border ${theme.accentBorder} flex items-center justify-center mx-auto mb-6`}>
                <Check size={16} className={theme.accentText} />
              </div>

              <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: theme.fontHeading }}>Your filing is set up.</h1>
              <p className="text-sm text-gray-500 mt-2 mb-10 max-w-[260px] mx-auto leading-relaxed">
                {sections.length > 0
                  ? `We've tailored your 2025 return based on your answers — ${sections.length} section${sections.length === 1 ? '' : 's'} to complete.`
                  : "We've tailored your 2025 return based on your answers."}
              </p>

              <div className="space-y-3">
                <button
                  onClick={handleStartFiling}
                  className={`w-full flex items-center justify-center gap-2 ${theme.btnPrimary} ${theme.btnRadius} py-3.5 text-sm font-semibold transition-colors`}
                >
                  Start my 2025 filing <ArrowRight size={15} />
                </button>
                <button
                  onClick={() => navigate('/dashboard', {
                    state: {
                      isNewUser: true,
                      firstName: form.firstName,
                      assessmentComplete: true,
                      assessmentAnswers: profileAnswers ?? null,
                    },
                  })}
                  className={`w-full text-sm font-medium ${theme.accentText} ${theme.accentTextHover} transition-colors py-2`}
                >
                  I'll do this later
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
