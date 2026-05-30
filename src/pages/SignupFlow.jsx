import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { FilePlus, ArrowCircleRight } from '@phosphor-icons/react'
import ProfileWizard from '../components/ProfileWizard'
import { COUNTRIES, buildSectionList } from '../utils/inferProfile'
import { useTheme } from '../context/ThemeContext'

/* ── OTP digit box — handles its own bounce without remounting ───────────── */
function DigitBox({ digit, inputRef, onChange, onKeyDown, inputCls, enhanced }) {
  const { theme } = useTheme()
  const [bouncing, setBouncing] = useState(false)
  const prev = useRef('')
  useEffect(() => {
    if (!prev.current && digit) setBouncing(true)
    prev.current = digit
  }, [digit])
  return (
    <div
      className={`flex-1 min-w-0 ${bouncing && enhanced && theme.springAnimations ? 'digit-bounce' : ''}`}
      onAnimationEnd={() => setBouncing(false)}
    >
      <input
        ref={inputRef}
        type="text" inputMode="numeric" maxLength={1}
        value={digit}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className={`w-full text-center text-lg font-semibold focus:outline-none transition-all ${inputCls} ${theme.inputStyle === 'underline' ? 'h-10 pb-1' : 'h-11'}`}
      />
    </div>
  )
}

/* ── OTP input ───────────────────────────────────────────────────────────── */
function OTPInput({ value, onChange, inputCls, enhanced }) {
  const refs = useRef([])
  const digits = value.padEnd(6, '').split('').slice(0, 6)

  function handleChange(i, e) {
    const ch = e.target.value.replace(/\D/g, '').slice(-1)
    const next = [...digits]; next[i] = ch
    onChange(next.join('').trim())
    if (ch && i < 5) refs.current[i + 1]?.focus()
  }
  function handleKeyDown(i, e) {
    if (e.key === 'Backspace') {
      if (digits[i]) {
        const next = [...digits]; next[i] = ''
        onChange(next.join('').trim())
      } else if (i > 0) refs.current[i - 1]?.focus()
    }
  }
  function handlePaste(e) {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (pasted) { onChange(pasted); refs.current[Math.min(pasted.length, 5)]?.focus() }
    e.preventDefault()
  }

  return (
    <div className="flex gap-3" onPaste={handlePaste}>
      {Array.from({ length: 6 }).map((_, i) => (
        <DigitBox
          key={i}
          digit={digits[i] || ''}
          inputRef={el => refs.current[i] = el}
          onChange={e => handleChange(i, e)}
          onKeyDown={e => handleKeyDown(i, e)}
          inputCls={inputCls}
          enhanced={enhanced}
        />
      ))}
    </div>
  )
}

/* ── Mobile input with country selector ─────────────────────────────────── */
function MobileInput({ country, setCountry, mobile, setMobile, theme }) {
  const [open, setOpen] = useState(false)
  const selected = COUNTRIES.find(c => c.code === country) || COUNTRIES[0]
  const underline = theme.inputStyle === 'underline'

  return (
    <div
      className={`relative flex ${underline ? '' : theme.inputCls} overflow-visible`}
      style={underline ? { borderBottom: '2px solid #c4b8a8', padding: 0 } : { padding: 0 }}
    >
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className={`flex items-center gap-1.5 whitespace-nowrap flex-shrink-0 transition-colors ${
          underline
            ? 'px-0 pr-2 py-2.5 text-sm text-stone-500 hover:text-stone-700 bg-transparent'
            : 'px-3 py-3 border-r border-gray-200 bg-gray-50 text-sm text-gray-700 hover:bg-gray-100 rounded-l-[inherit]'
        }`}
      >
        <span>{selected.flag}</span>
        <span className="font-medium">{selected.dial}</span>
      </button>
      <input
        type="tel" placeholder="Mobile number"
        value={mobile}
        onChange={e => setMobile(e.target.value.replace(/\D/g, ''))}
        className={`flex-1 text-sm text-gray-900 focus:outline-none bg-transparent ${underline ? 'px-1 py-2.5 placeholder-stone-400/60' : 'px-3 py-3 placeholder-gray-400'}`}
      />
      {open && (
        <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl border border-gray-200 shadow-lg z-20 overflow-hidden">
          {COUNTRIES.map(c => (
            <button
              key={c.code}
              onClick={() => { setCountry(c.code); setOpen(false) }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors text-left ${c.code === country ? 'bg-gray-50 font-semibold text-gray-900' : 'text-gray-700'}`}
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
  return <label className={`block mb-1.5 ${theme.label}`}>{children}</label>
}

function TextInput({ placeholder, value, onChange, type = 'text', autoFocus, inputCls }) {
  return (
    <input
      type={type} placeholder={placeholder} value={value}
      onChange={e => onChange(e.target.value)} autoFocus={autoFocus}
      className={`w-full px-4 py-3 text-sm focus:outline-none transition-all ${inputCls}`}
    />
  )
}

/* ── Monogram — style driven by theme.monogramStyle ─────────────────────── */
function WelcomeMonogram({ initial }) {
  const { theme } = useTheme()

  if (theme.monogramStyle === 'rings') {
    // Loft: thin SVG rings — delicate, warm, personal
    return (
      <div className="relative w-14 h-14 mx-auto mb-5">
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden className="absolute inset-0">
          <circle cx="28" cy="28" r="26" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
          <circle cx="28" cy="28" r="20" stroke="rgba(255,255,255,0.10)" strokeWidth="0.75" strokeDasharray="2 3" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white text-2xl font-light tracking-widest select-none" aria-hidden>
            {initial}
          </span>
        </div>
      </div>
    )
  }

  if (theme.monogramStyle === 'square') {
    // Azure: solid rounded square — confident, branded
    return (
      <div
        className="w-14 h-14 rounded-2xl mx-auto mb-5 flex items-center justify-center"
        style={{ backgroundColor: 'rgba(255,255,255,0.20)', boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}
      >
        <span className="text-white text-2xl font-semibold select-none" aria-hidden>
          {initial}
        </span>
      </div>
    )
  }

  if (theme.monogramStyle === 'stamp') {
    // Grain: ink stamp — solid, pressed, engraved quality
    // Larger initial + visible inner ring = letterpress/seal character
    return (
      <div
        className="mx-auto mb-5 flex items-center justify-center"
        style={{
          width: 58, height: 58,
          backgroundColor: '#1e3a8a',
          borderRadius: 8,
          boxShadow: 'inset 0 0 0 2.5px rgba(255,255,255,0.22), inset 0 0 0 4px rgba(255,255,255,0.08), 0 3px 10px rgba(0,0,0,0.30)',
        }}
      >
        <span
          className="text-white text-3xl font-bold select-none"
          style={{ fontFamily: theme.fontHeading, letterSpacing: '-0.02em' }}
          aria-hidden
        >
          {initial}
        </span>
      </div>
    )
  }

  return null
}

/* ── Document illustration — palette driven by theme.revealIllustrationPalette */
function DocumentIllustration({ sectionCount }) {
  const { theme } = useTheme()
  const cool = theme.revealIllustrationPalette === 'cool'
  const ink  = theme.revealIllustrationPalette === 'ink'
  // Palette: warm (Loft slate) | cool (Azure blue) | ink (Grain warm-navy)
  const bodyStroke  = ink ? '#1e3a5f' : cool ? '#60a5fa' : '#94a3b8'
  const linesStroke = ink ? '#c7bba0' : cool ? '#93c5fd' : '#cbd5e1'  // parchment lines for Grain
  const checkStroke  = theme.accentTextColor           // always the direction's accent

  return (
    <div className="relative mx-auto mb-2" style={{ width: 72, height: 72 }}>
      <svg width="72" height="72" viewBox="0 0 72 72" fill="none" aria-hidden>
        <path d="M12 8h32l14 14v46H12z" stroke={bodyStroke} strokeWidth={ink ? '1' : '1.5'} strokeLinejoin="round" />
        <path d="M44 8v14h14" stroke={bodyStroke} strokeWidth={ink ? '1' : '1.5'} strokeLinejoin="round" />
        <path d="M20 32h32M20 39h32M20 46h22" stroke={linesStroke} strokeWidth={ink ? '1' : '1.25'} strokeLinecap="round" />
        {/* Check mark — drawn via stroke-dashoffset animation */}
        <path
          d="M20 56l9 9 19-21"
          stroke={checkStroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          className="draw-check"
        />
      </svg>
      {sectionCount > 0 && (
        <div
          className="absolute -top-1 -right-2 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center badge-pop"
          style={{ backgroundColor: theme.accentTextColor }}
        >
          <span className="text-white text-[9px] font-bold leading-none">{sectionCount}</span>
        </div>
      )}
    </div>
  )
}

const STEP_KEYS = ['account', 'profile']

export default function SignupFlow({ initialData = {} }) {
  const navigate = useNavigate()
  const { theme } = useTheme()
  const enhanced = theme.animationsEnhanced
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
  const [otpSent, setOtpSent]     = useState(false)
  const [otp, setOtp]             = useState('')
  const [resendTimer, setResendTimer] = useState(0)

  useEffect(() => {
    if (resendTimer <= 0) return
    const t = setTimeout(() => setResendTimer(r => r - 1), 1000)
    return () => clearTimeout(t)
  }, [resendTimer])

  const stepIndex = STEP_KEYS.indexOf(step)

  function set(key, val) { setForm(prev => ({ ...prev, [key]: val })) }

  const fieldsValid  = form.firstName.trim() && form.lastName.trim() && form.email.trim() && form.mobile.length >= 6
  const canSendOtp   = form.mobile.length >= 6
  const canContinue  = fieldsValid && otpSent && otp.length === 6

  function handleSendOtp() { setOtpSent(true); setResendTimer(30); setOtp('') }

  function handleProfileComplete(answers) { setProfileAnswers(answers); setStep('reveal') }
  function handleProfileSkip() {
    navigate('/dashboard', { state: { isNewUser: true, assessmentSkipped: true, firstName: form.firstName } })
  }
  function handleStartFiling() {
    const sections = profileAnswers ? buildSectionList(profileAnswers) : []
    navigate('/tickets/467501', {
      state: { assessmentComplete: true, assessmentSectionCount: sections.length, assessmentAnswers: profileAnswers ?? null },
    })
  }

  const selectedCountry = COUNTRIES.find(c => c.code === form.country) || COUNTRIES[0]
  const sections = profileAnswers ? buildSectionList(profileAnswers) : []

  return (
    <div className={`min-h-screen ${theme.pageBg} flex flex-col relative overflow-hidden`}>

      {/* Ambient glow */}
      {theme.ambientGlow && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
          <div className={`absolute top-[-100px] left-1/2 -translate-x-1/2 w-[500px] h-[350px] ${theme.ambientGlowPrimary} rounded-full blur-3xl`} />
        </div>
      )}

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-5 flex-shrink-0">
        <span className="font-bold text-sm tracking-wide text-gray-900" style={{ fontFamily: theme.fontHeading }}>
          AOTax
        </span>
        {(step === 'account' || step === 'profile') && (
          <div className="flex gap-1.5">
            {STEP_KEYS.map((s, i) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all duration-300 ${stepIndex >= i ? `${theme.accentBg} w-4` : 'bg-gray-200 w-1.5'}`}
              />
            ))}
          </div>
        )}
      </header>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pb-12">
        <div className={`w-full ${step === 'profile' ? 'max-w-lg' : 'max-w-sm'}`}>
          {/* Keyed wrapper drives step entrance animation */}
          <div key={step} className={theme.stepEnterClass}>

          {/* ── Step: Account creation ─────────────────────────────────── */}
          {step === 'account' && (
            <div>
              <div className="mb-8">
                <h1 className={`${theme.sectionHeadingCls} text-gray-900`} style={{ fontFamily: theme.fontHeading }}>
                  Create your account
                </h1>
                <p className="text-sm text-gray-500 mt-1">Just the basics to get started.</p>
              </div>

              <div className={theme.formCardWrapped ? `${theme.formFieldSpacing} ${theme.cardBg} ${theme.cardRadius} px-6 py-7 ${theme.cardShadow}` : theme.formFieldSpacing}>
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
                  <MobileInput country={form.country} setCountry={v => set('country', v)} mobile={form.mobile} setMobile={v => set('mobile', v)} theme={theme} />
                  {canSendOtp && !otpSent && (
                    <button
                      onClick={handleSendOtp}
                      className={`mt-2 text-xs font-semibold ${theme.accentText} ${theme.accentTextHover} transition-colors ${enhanced ? 'fade-in' : ''}`}
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
                        {resendTimer > 0
                          ? <span className="text-[10px] text-gray-400">Resend in {resendTimer}s</span>
                          : <button onClick={handleSendOtp} className={`text-[10px] font-semibold ${theme.accentText} ${theme.accentTextHover} transition-colors`}>Resend code</button>
                        }
                      </div>
                    </div>
                    <OTPInput value={otp} onChange={setOtp} inputCls={theme.inputCls} enhanced={enhanced} />
                    <p className="text-xs text-gray-400 mt-2">Sent to {selectedCountry.dial} {form.mobile}</p>
                  </div>
                )}
              </div>

              <button
                key={canContinue ? 'active' : 'disabled'}
                onClick={() => setStep('welcome')}
                disabled={!canContinue}
                className={`mt-6 w-full flex items-center justify-center gap-2 py-3.5 text-sm font-semibold transition-all ${theme.btnRadius} ${canContinue ? `${theme.btnPrimary} ${enhanced && theme.springAnimations ? 'btn-unlock' : ''}` : theme.btnDisabled}`}
                style={enhanced && canContinue ? { boxShadow: `0 4px 16px ${theme.accentTextColor}47` } : undefined}
              >
                Continue <ArrowRight size={15} />
              </button>
            </div>
          )}

          {/* ── Step: Welcome (KEY MOMENT) ────────────────────────────── */}
          {step === 'welcome' && (
            <div className="text-center">
              {theme.welcomeCardStyle === 'editorial' ? (
                /* Print: editorial welcome — no gradient, pure typography + bold rule */
                <div className="border border-gray-200 overflow-hidden mb-2">
                  {/* Bold top rule — the editorial masthead mark */}
                  <div className="border-t-4 border-gray-900 px-6 pt-6 pb-5">
                    <p className={`${theme.label} mb-3`}>WELCOME</p>
                    <h1
                      className="text-5xl font-black text-gray-900 leading-none"
                      style={{ fontFamily: theme.fontHeading }}
                    >
                      {form.firstName}.
                    </h1>
                    <p className="text-sm text-gray-500 mt-2">Your account is ready.</p>
                  </div>
                  {/* Thin rule + body */}
                  <div className="border-t border-gray-100 px-6 py-5">
                    <p
                      className={`text-sm text-gray-600 leading-relaxed ${theme.itemEnterClass}`}
                      style={{ animationDelay: '80ms' }}
                    >
                      A few questions help us tailor your 2025 return. Takes about a minute.
                    </p>
                    <div
                      className={`mt-5 space-y-3 ${theme.itemEnterClass}`}
                      style={{ animationDelay: '140ms' }}
                    >
                      <button
                        onClick={() => setStep('profile')}
                        className={`w-full flex items-center justify-center gap-2 ${theme.btnPrimary} ${theme.btnRadius} py-3.5 text-sm font-semibold transition-all`}
                      >
                        Set up my 2025 filing
                      </button>
                      <button
                        onClick={() => navigate('/dashboard', { state: { isNewUser: true, assessmentSkipped: true, firstName: form.firstName } })}
                        className={`w-full text-sm font-medium ${theme.accentText} ${theme.accentTextHover} transition-colors py-2`}
                      >
                        I'll fill this during my first filing
                      </button>
                    </div>
                  </div>
                </div>
              ) : theme.welcomeCardStyle !== 'minimal' ? (
                /* Enhanced welcome card — gradient header driven by theme.advisorCardHeaderBg */
                <div className={`${theme.cardRadius} ${theme.cardShadow} overflow-hidden mb-2`} style={theme.id === 'grain' ? { border: '1px solid #ddd5c5' } : undefined}>
                  {/* Gradient header — color from token */}
                  <div className={`${theme.advisorCardHeaderBg} px-6 pt-8 pb-10 relative overflow-hidden`}>
                    {/* Ambient glow within header — suppressed for Grain (physical materials don't glow) */}
                    {theme.id !== 'grain' && <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" aria-hidden />}

                    {/* Direction monogram — rings, square, or none */}
                    <WelcomeMonogram initial={(form.firstName[0] || 'A').toUpperCase()} />

                    <h1 className="text-3xl font-bold text-white relative z-10 mt-1">
                      Welcome, {form.firstName}.
                    </h1>
                    <p className="text-white/60 text-sm mt-1.5 relative z-10 font-light">Your account is ready.</p>
                  </div>

                  {/* Card body — warm paper for Grain, white for others */}
                  <div className={`${theme.id === 'grain' ? 'bg-[#faf9f6]' : 'bg-white'} px-6 py-6`}>
                    <p
                      className={`text-sm text-gray-600 leading-relaxed ${theme.itemEnterClass}`}
                      style={enhanced ? { animationDelay: '100ms' } : undefined}
                    >
                      A few questions help us understand your tax situation and tailor your 2025 return. Takes about a minute.
                    </p>
                    <div
                      className={`mt-5 space-y-3 ${theme.itemEnterClass}`}
                      style={enhanced ? { animationDelay: '160ms' } : undefined}
                    >
                      <button
                        onClick={() => setStep('profile')}
                        className={`w-full flex items-center justify-center gap-2.5 ${theme.btnPrimary} ${theme.btnRadius} py-3.5 text-sm font-semibold transition-all`}
                        style={{ boxShadow: `0 4px 16px ${theme.accentTextColor}47` }}
                      >
                        <FilePlus size={18} weight={theme.iconWeight} />
                        Set up my 2025 filing
                      </button>
                      <button
                        onClick={() => navigate('/dashboard', { state: { isNewUser: true, assessmentSkipped: true, firstName: form.firstName } })}
                        className={`w-full text-sm font-medium ${theme.accentText} ${theme.accentTextHover} transition-colors py-2`}
                      >
                        I'll fill this during my first filing
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Default welcome */
                <>
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
                </>
              )}
            </div>
          )}

          {/* ── Step: Profile wizard ───────────────────────────────────── */}
          {step === 'profile' && (
            <div>
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-1">
                  <h1 className={`${theme.sectionHeadingCls} text-gray-900`} style={{ fontFamily: theme.fontHeading }}>
                    Set up your 2025 filing
                  </h1>
                  <span className={`text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 ${theme.btnRadius} ${theme.accentLight} ${theme.accentText} border ${theme.accentBorder}`}>
                    Tax Year 2025
                  </span>
                </div>
                <p className="text-sm text-gray-500">Helps us tailor your filing. Takes about a minute.</p>
              </div>
              <ProfileWizard onComplete={handleProfileComplete} onSkip={handleProfileSkip} />
            </div>
          )}

          {/* ── Step: Reveal (KEY MOMENT) ──────────────────────────────── */}
          {step === 'reveal' && (
            <div className="text-center">
              {theme.revealStyle === 'number-hero' ? (
                /* Print: number as typographic hero — no illustration */
                <div className="bg-white border border-gray-200 overflow-hidden text-center">
                  {/* Bold top rule */}
                  <div className="border-t-4 border-gray-900" />
                  <div className="px-8 pt-10 pb-2">
                    <p className={`${theme.label} mb-4`}>FILING SETUP COMPLETE</p>
                    <p className={`${theme.heroNumberSize} ${theme.heroNumberColor} font-black leading-none`}>
                      {sections.length || 0}
                    </p>
                    <div className="border-t border-gray-100 mt-6 pt-4">
                      <p className="text-sm text-gray-400 tracking-widest uppercase">sections ready</p>
                    </div>
                  </div>
                  <div className="px-6 pb-6 pt-4 space-y-3">
                    <button
                      onClick={handleStartFiling}
                      className={`w-full flex items-center justify-center gap-2 ${theme.btnPrimary} ${theme.btnRadius} py-3.5 text-sm font-semibold transition-all`}
                    >
                      Start my 2025 filing <ArrowRight size={15} />
                    </button>
                    <button
                      onClick={() => navigate('/dashboard', {
                        state: { isNewUser: true, firstName: form.firstName, assessmentComplete: true, assessmentAnswers: profileAnswers ?? null },
                      })}
                      className={`w-full text-sm font-medium ${theme.accentText} ${theme.accentTextHover} transition-colors py-2`}
                    >
                      I'll do this later
                    </button>
                  </div>
                </div>
              ) : theme.revealStyle === 'illustration' ? (
                /* Enhanced reveal card — tokens drive background, border, illustration */
                <div className={`${theme.successBg} ${theme.cardRadius} border border-blue-100 ${theme.cardShadow} overflow-hidden`}>
                  {/* Illustration area */}
                  <div className="px-8 pt-10 pb-6">
                    <DocumentIllustration sectionCount={sections.length} />
                    <h1 className="text-3xl font-bold text-gray-900 mt-6 leading-tight" style={{ fontFamily: theme.fontHeading }}>Your filing is set up.</h1>
                    <p className="text-sm text-gray-500 mt-2.5 leading-relaxed max-w-[240px] mx-auto">
                      {sections.length > 0
                        ? `We've tailored your 2025 return — ${sections.length} section${sections.length === 1 ? '' : 's'} ready for you to complete.`
                        : "We've tailored your 2025 return based on your answers."}
                    </p>
                  </div>

                  {/* CTA area */}
                  <div className="px-6 pb-6 space-y-3">
                    <button
                      onClick={handleStartFiling}
                      className={`w-full flex items-center justify-center gap-2.5 ${theme.btnPrimary} ${theme.btnRadius} py-3.5 text-sm font-semibold transition-all`}
                      style={{ boxShadow: `0 4px 16px ${theme.accentTextColor}47` }}
                    >
                      <ArrowCircleRight size={18} weight={theme.iconWeight} />
                      Start my 2025 filing
                    </button>
                    <button
                      onClick={() => navigate('/dashboard', {
                        state: { isNewUser: true, firstName: form.firstName, assessmentComplete: true, assessmentAnswers: profileAnswers ?? null },
                      })}
                      className={`w-full text-sm font-medium ${theme.accentText} ${theme.accentTextHover} transition-colors py-2`}
                    >
                      I'll do this later
                    </button>
                  </div>
                </div>
              ) : (
                /* Default reveal */
                <>
                  <div className={`w-11 h-11 rounded-full ${theme.accentLight} border ${theme.accentBorder} flex items-center justify-center mx-auto mb-6`}>
                    <Check size={16} className={theme.accentText} />
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: theme.fontHeading }}>
                    Your filing is set up.
                  </h1>
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
                        state: { isNewUser: true, firstName: form.firstName, assessmentComplete: true, assessmentAnswers: profileAnswers ?? null },
                      })}
                      className={`w-full text-sm font-medium ${theme.accentText} ${theme.accentTextHover} transition-colors py-2`}
                    >
                      I'll do this later
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          </div>{/* end step animation wrapper */}
        </div>
      </div>
    </div>
  )
}
