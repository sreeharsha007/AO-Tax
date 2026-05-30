import { useState, useEffect, useRef } from 'react'
import {
  ArrowLeft, ArrowRight, Check,
  Briefcase, Laptop2, TrendingUp, Banknote, Home, Globe,
  Landmark, GraduationCap, HeartHandshake, Stethoscope, Receipt, Monitor,
} from 'lucide-react'
import {
  Briefcase   as PhBriefcase,
  Laptop      as PhLaptop,
  TrendUp     as PhTrendUp,
  Money       as PhMoney,
  House       as PhHouse,
  Globe       as PhGlobe,
  Bank        as PhBank,
  GraduationCap as PhGraduationCap,
  HandHeart   as PhHandHeart,
  Stethoscope as PhStethoscope,
  Receipt     as PhReceipt,
  Monitor     as PhMonitor,
} from '@phosphor-icons/react'
import { INCOME_OPTIONS, DEDUCTION_OPTIONS } from '../utils/inferProfile'
import { useTheme } from '../context/ThemeContext'

/* ── Icon maps ───────────────────────────────────────────────────────────── */
const INCOME_ICONS = {
  w2: Briefcase, freelance: Laptop2, investments: TrendingUp,
  dividends: Banknote, rental: Home, foreign: Globe,
}
const DEDUCTION_ICONS = {
  mortgage: Landmark, student: GraduationCap, charitable: HeartHandshake,
  medical: Stethoscope, business: Receipt, homeoffice: Monitor,
}
const INCOME_ICONS_PHOSPHOR = {
  w2: PhBriefcase, freelance: PhLaptop, investments: PhTrendUp,
  dividends: PhMoney, rental: PhHouse, foreign: PhGlobe,
}
const DEDUCTION_ICONS_PHOSPHOR = {
  mortgage: PhBank, student: PhGraduationCap, charitable: PhHandHeart,
  medical: PhStethoscope, business: PhReceipt, homeoffice: PhMonitor,
}

/* ── Yes / No buttons ────────────────────────────────────────────────────── */
function YesNo({ value, onChange }) {
  const { theme } = useTheme()
  return (
    <div className="grid grid-cols-2 gap-3">
      {['yes', 'no'].map(opt => {
        const active = value === opt
        return (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`py-4 ${theme.btnRadius} border text-sm font-semibold transition-all capitalize ${
              active
                ? theme.wizardSelectionStyle === 'checkbox'
                  ? 'bg-gray-100 border-gray-700 text-gray-900'  // Print: neutral marked, not activated
                  : `${theme.accentLight} ${theme.accentBorder} ${theme.accentText}`
                : `bg-white ${theme.borderMuted} text-gray-700 hover:border-gray-300 ${theme.animationsEnhanced ? 'hover:shadow-sm' : ''}`
            }`}
          >
            {opt === 'yes' ? 'Yes' : 'No'}
          </button>
        )
      })}
    </div>
  )
}

/* ── Option pill — Default grid card ─────────────────────────────────────── */
function OptionPill({ label, sub, selected, onClick, lucideIcon: LucideIcon, phosphorIcon: PhosphorIcon, badgeCls }) {
  const { theme } = useTheme()
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 ${theme.cardRadius} border transition-all ${
        selected
          ? `${theme.accentLight} ${theme.accentBorder}`
          : 'bg-white border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        {LucideIcon && (
          <LucideIcon size={16} className={selected ? theme.accentText : 'text-gray-400'} />
        )}
        {selected && <Check size={13} className={theme.accentText} strokeWidth={3} />}
      </div>
      <p className={`text-sm font-medium leading-tight ${selected ? theme.accentText : 'text-gray-900'}`}>{label}</p>
      <p className={`text-xs mt-1 ${selected ? 'text-gray-400' : 'text-gray-500'}`}>{sub}</p>
    </button>
  )
}

/* ── Option row — stacked list, adapts per direction via tokens ───────────── */
function OptionRow({ label, sub, selected, onClick, lucideIcon: LucideIcon, phosphorIcon: PhosphorIcon, badgeCls, index }) {
  const { theme } = useTheme()
  const isRing     = theme.wizardSelectionStyle === 'ring'
  const isCheckbox = theme.wizardSelectionStyle === 'checkbox'
  const isInline = theme.wizardIconInline

  const [bouncing, setBouncing] = useState(false)
  const prev = useRef(selected)
  useEffect(() => {
    // Only bounce on selection when using fill style (Loft) — ring style is instant
    if (!prev.current && selected && !isRing) setBouncing(true)
    prev.current = selected
  }, [selected])

  return (
    /* Outer div: stagger entrance */
    <div
      className={theme.itemEnterClass}
      style={{ animationDelay: `${index * 35}ms` }}
    >
      <button
        onClick={onClick}
        onAnimationEnd={() => setBouncing(false)}
        className={`w-full flex items-center gap-3 px-4 ${theme.wizardRowPy} ${theme.cardRadius || 'rounded-xl'} transition-all text-left ${
          bouncing && !isRing && !isCheckbox && theme.springAnimations ? 'select-bounce' : ''
        } ${
          selected
            ? isRing      ? 'ring-1 ring-blue-600 border border-transparent bg-blue-50/60'
            : isCheckbox  ? 'bg-gray-50 border border-gray-700'  // Print: light neutral fill + strong border
            :                `${theme.accentLight} border ${theme.accentBorder}`
            : `${theme.cardBg || 'bg-white'} border ${theme.borderMuted} ${theme.borderMutedHover} hover:shadow-sm`
        }`}
      >
        {/* Icon — inline (Azure) or badge background (Loft) */}
        {(LucideIcon || PhosphorIcon) && (
          isInline ? (
            /* Enhanced inline: icon without badge — direction controls style and weight */
            <div className="flex-shrink-0 w-5 flex items-center justify-center">
              {theme.iconStyle === 'phosphor' && PhosphorIcon
                ? <PhosphorIcon size={15} weight={theme.iconWeight}
                    className={selected
                      ? theme.id === 'grain' ? theme.accentText : theme.accentText
                      : theme.id === 'grain' ? 'text-stone-400' : 'text-blue-300'
                    }
                  />
                : LucideIcon && <LucideIcon size={14}
                    className={selected
                      ? isCheckbox ? 'text-gray-900' : theme.accentText
                      : 'text-gray-400'
                    }
                  />
              }
            </div>
          ) : (
            /* Loft/Default: icon in coloured badge */
            <div className={`w-8 h-8 ${theme.iconBadgeRadius} flex items-center justify-center flex-shrink-0 ${badgeCls || 'bg-gray-100 text-gray-500'}`}>
              {PhosphorIcon
                ? <PhosphorIcon size={16} weight="duotone" />
                : LucideIcon && <LucideIcon size={14} />}
            </div>
          )
        )}

        {/* Label + sub */}
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-medium leading-tight ${selected ? theme.accentText : 'text-gray-900'}`}>{label}</p>
          <p className={`text-xs mt-0.5 ${selected ? 'text-gray-400' : 'text-gray-500'}`}>{sub}</p>
        </div>

        {/* Selection indicator — circle for fill, square for checkbox, none for ring */}
        {!isRing && (
          isCheckbox ? (
            /* Print: square checkbox — journalistic, no rounding */
            <div className={`w-4 h-4 border flex items-center justify-center flex-shrink-0 transition-all ${
              selected ? 'bg-gray-900 border-gray-900' : 'bg-white border-gray-400'
            }`}>
              {selected && <Check size={8} className="text-white" strokeWidth={3} />}
            </div>
          ) : (
            /* Fill style: circle indicator */
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${!selected ? 'bg-white border-gray-300' : ''}`}
              style={selected ? { backgroundColor: theme.accentTextColor, borderColor: theme.accentTextColor } : undefined}
            >
              {selected && <Check size={9} className="text-white" strokeWidth={3.5} />}
            </div>
          )
        )}
      </button>
    </div>
  )
}

/* ── Residency step ──────────────────────────────────────────────────────── */
function ResidencyStep({ answers, update, enhanced }) {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div>
          <h2 className={`${enhanced ? 'text-2xl' : 'text-xl'} font-semibold text-gray-900 leading-snug`}>
            Are you a US citizen or green card holder?
          </h2>
          <p className="text-sm text-gray-500 mt-1.5">This determines which tax form applies to you.</p>
        </div>
        <YesNo
          value={answers.usCitizenOrGC === null ? null : answers.usCitizenOrGC ? 'yes' : 'no'}
          onChange={v => update('usCitizenOrGC', v === 'yes')}
        />
      </div>
      {answers.usCitizenOrGC === false && (
        <div className="space-y-4 pt-2 border-t border-gray-100">
          <div>
            <h3 className={`${enhanced ? 'text-lg' : 'text-base'} font-semibold text-gray-900`}>
              Are you currently living in the US?
            </h3>
            <p className="text-xs text-gray-500 mt-1">Residency affects your filing requirements.</p>
          </div>
          <YesNo
            value={answers.livingInUS === null ? null : answers.livingInUS ? 'yes' : 'no'}
            onChange={v => update('livingInUS', v === 'yes')}
          />
        </div>
      )}
    </div>
  )
}

/* ── Select step (income / deductions) ───────────────────────────────────── */
function SelectStep({ title, sub, options, selected, onToggle, lucideIcons, phosphorIcons, badgeCls, enhanced }) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className={`${enhanced ? 'text-2xl' : 'text-xl'} font-semibold text-gray-900 leading-snug`}>{title}</h2>
        <p className="text-sm text-gray-500 mt-1.5">{sub}</p>
      </div>
      {enhanced ? (
        /* Loft: stacked list with stagger + selection bounce */
        <div className="space-y-2">
          {options.map((opt, i) => (
            <OptionRow
              key={opt.id}
              index={i}
              label={opt.label}
              sub={opt.sub}
              lucideIcon={lucideIcons?.[opt.id]}
              phosphorIcon={phosphorIcons?.[opt.id]}
              badgeCls={badgeCls}
              selected={selected.includes(opt.id)}
              onClick={() => onToggle(opt.id)}
            />
          ))}
        </div>
      ) : (
        /* Default: 2-column card grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {options.map(opt => (
            <OptionPill
              key={opt.id}
              label={opt.label}
              sub={opt.sub}
              lucideIcon={lucideIcons?.[opt.id]}
              phosphorIcon={phosphorIcons?.[opt.id]}
              badgeCls={badgeCls}
              selected={selected.includes(opt.id)}
              onClick={() => onToggle(opt.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

/* ── Global assets step ──────────────────────────────────────────────────── */
function GlobalAssetsStep({ answers, update, enhanced }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className={`${enhanced ? 'text-2xl' : 'text-xl'} font-semibold text-gray-900 leading-snug`}>
          Do you hold financial accounts or assets outside the US?
        </h2>
        <p className="text-sm text-gray-500 mt-1.5">
          Includes bank accounts, investments, or property abroad.
        </p>
      </div>
      <YesNo
        value={answers.globalAssets === null ? null : answers.globalAssets ? 'yes' : 'no'}
        onChange={v => update('globalAssets', v === 'yes')}
      />
    </div>
  )
}

/* ── Main wizard ─────────────────────────────────────────────────────────── */
const BASE_STEPS = ['Residency', 'Income', 'Deductions']
const FULL_STEPS = [...BASE_STEPS, 'Global assets']

function getSteps(answers) {
  return answers.usCitizenOrGC === false && answers.livingInUS === false
    ? BASE_STEPS : FULL_STEPS
}

export default function ProfileWizard({ onComplete, onSkip, initialAnswers = null }) {
  const { theme } = useTheme()
  const enhanced = theme.animationsEnhanced

  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState(initialAnswers ?? {
    usCitizenOrGC: null, livingInUS: null,
    income: [], deductions: [], globalAssets: null,
  })

  const steps = getSteps(answers)
  const pct   = Math.round(((step + 1) / steps.length) * 100)

  function update(key, value)    { setAnswers(prev => ({ ...prev, [key]: value })) }
  function toggleMulti(key, id)  {
    setAnswers(prev => {
      const arr = prev[key]
      return { ...prev, [key]: arr.includes(id) ? arr.filter(x => x !== id) : [...arr, id] }
    })
  }

  function canContinue() {
    if (step === 0) {
      if (answers.usCitizenOrGC === null) return false
      if (answers.usCitizenOrGC === false && answers.livingInUS === null) return false
      return true
    }
    if (step === 1 || step === 2) return true
    if (step === 3) return answers.globalAssets !== null
    return false
  }

  function handleContinue() {
    if (step < steps.length - 1) setStep(s => s + 1)
    else onComplete(answers)
  }

  const isLast = step === steps.length - 1

  const inner = (
    <>
      {/* Progress indicator — dots (Azure) or bar (Loft/Default) */}
      <div className="mb-8">
        {theme.wizardProgressStyle === 'dots' ? (
          /* Azure: step dots — completed filled, current outlined, upcoming neutral */
          <div className="flex items-center gap-2.5 mb-3">
            {steps.map((s, i) => {
              const done = i < step
              const current = i === step
              return (
                <div
                  key={s}
                  className={`rounded-full transition-all duration-200 flex-shrink-0 ${
                    done    ? 'w-2 h-2 bg-blue-600'
                    : current ? 'w-2.5 h-2.5 border-[1.5px] border-blue-600 bg-transparent'
                    : 'w-1.5 h-1.5 bg-gray-200'
                  }`}
                />
              )
            })}
            <p className={`${theme.label} ml-1`}>{steps[step]}</p>
          </div>
        ) : (
          /* Loft/Default: animated progress bar */
          <>
            <div className={`${theme.progressBarHeight || 'h-0.5'} ${theme.progressTrack} rounded-full overflow-hidden mb-2`}>
              <div
                className={`h-full ${theme.progressFill} rounded-full progress-fill-animated`}
                style={{ width: `${pct}%` }}
              />
            </div>
            <div className="flex items-center justify-between">
              <p className={theme.label}>{steps[step]}</p>
              {theme.showProgressPercent && <p className={theme.label}>{pct}%</p>}
            </div>
          </>
        )}
      </div>

      {/* Step content with direction-specific entrance animation */}
      <div key={step} className={theme.stepEnterClass}>
        {step === 0 && <ResidencyStep answers={answers} update={update} enhanced={enhanced} />}
        {step === 1 && (
          <SelectStep
            title="Where does your income come from?"
            sub="Select all that apply."
            options={INCOME_OPTIONS}
            lucideIcons={INCOME_ICONS}
            phosphorIcons={INCOME_ICONS_PHOSPHOR}
            badgeCls={theme.iconIncome}
            selected={answers.income}
            onToggle={id => toggleMulti('income', id)}
            enhanced={enhanced}
          />
        )}
        {step === 2 && (
          <SelectStep
            title="Any of these apply to you this year?"
            sub="Select all that apply."
            options={DEDUCTION_OPTIONS}
            lucideIcons={DEDUCTION_ICONS}
            phosphorIcons={DEDUCTION_ICONS_PHOSPHOR}
            badgeCls={theme.iconDeductions}
            selected={answers.deductions}
            onToggle={id => toggleMulti('deductions', id)}
            enhanced={enhanced}
          />
        )}
        {step === 3 && <GlobalAssetsStep answers={answers} update={update} enhanced={enhanced} />}
      </div>

      {/* Footer actions */}
      <div className="mt-10 flex items-center justify-between">
        <button
          onClick={onSkip}
          className={`text-sm font-medium ${theme.accentText} ${theme.accentTextHover} transition-colors`}
        >
          {enhanced ? "I'll do this later" : 'Skip for now'}
        </button>
        <div className="flex items-center gap-3">
          {step > 0 && (
            <button
              onClick={() => setStep(s => s - 1)}
              className={`flex items-center gap-1.5 text-sm font-medium ${theme.accentText} ${theme.accentTextHover} transition-colors`}
            >
              <ArrowLeft size={15} /> Back
            </button>
          )}
          <button
            key={canContinue() ? 'active' : 'disabled'}
            onClick={handleContinue}
            disabled={!canContinue()}
            className={`flex items-center gap-2 px-5 py-2.5 text-sm font-semibold transition-all ${theme.btnRadius} ${
              canContinue() ? `${theme.btnPrimary} ${enhanced && theme.springAnimations ? 'btn-unlock' : ''}` : theme.btnDisabled
            }`}
            style={enhanced && canContinue() ? { boxShadow: `0 4px 12px ${theme.accentTextColor}3d` } : undefined}
          >
            {isLast ? 'Finish' : 'Continue'} <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </>
  )

  /* Enhanced directions: wrap in card using theme tokens */
  if (enhanced) {
    return (
      <div className={`${theme.card} ${theme.cardRadius} ${theme.cardShadow} p-6`}>
        {inner}
      </div>
    )
  }

  return <div>{inner}</div>
}
