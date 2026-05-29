import { useState } from 'react'
import {
  ArrowLeft, ArrowRight, Check,
  Briefcase, Laptop2, TrendingUp, Banknote, Home, Globe,
  Landmark, GraduationCap, HeartHandshake, Stethoscope, Receipt, Monitor,
} from 'lucide-react'
import { INCOME_OPTIONS, DEDUCTION_OPTIONS } from '../utils/inferProfile'

const INCOME_ICONS = {
  w2:          Briefcase,
  freelance:   Laptop2,
  investments: TrendingUp,
  dividends:   Banknote,
  rental:      Home,
  foreign:     Globe,
}

const DEDUCTION_ICONS = {
  mortgage:   Landmark,
  student:    GraduationCap,
  charitable: HeartHandshake,
  medical:    Stethoscope,
  business:   Receipt,
  homeoffice: Monitor,
}

const BASE_STEPS = ['Residency', 'Income', 'Deductions']
const FULL_STEPS = [...BASE_STEPS, 'Global assets']

function getSteps(answers) {
  const isConfirmedNR = answers.usCitizenOrGC === false && answers.livingInUS === false
  return isConfirmedNR ? BASE_STEPS : FULL_STEPS
}

function YesNo({ value, onChange }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {['yes', 'no'].map(opt => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={`py-4 rounded-xl border text-sm font-semibold transition-all capitalize ${
            value === opt
              ? 'bg-blue-50 border-blue-500 text-blue-700'
              : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
          }`}
        >
          {opt === 'yes' ? 'Yes' : 'No'}
        </button>
      ))}
    </div>
  )
}

function OptionPill({ label, sub, selected, onClick, icon: Icon }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-xl border transition-all ${
        selected
          ? 'bg-blue-50 border-blue-500'
          : 'bg-white border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        {Icon && (
          <Icon size={16} className={selected ? 'text-blue-500' : 'text-gray-400'} />
        )}
        {selected && <Check size={13} className="text-blue-500" />}
      </div>
      <p className={`text-sm font-medium leading-tight ${selected ? 'text-blue-700' : 'text-gray-900'}`}>
        {label}
      </p>
      <p className={`text-xs mt-1 ${selected ? 'text-blue-400' : 'text-gray-500'}`}>
        {sub}
      </p>
    </button>
  )
}

function ResidencyStep({ answers, update }) {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 leading-snug">
            Are you a US citizen or green card holder?
          </h2>
          <p className="text-sm text-gray-500 mt-1.5">
            This determines which tax form applies to you.
          </p>
        </div>
        <YesNo
          value={answers.usCitizenOrGC === null ? null : answers.usCitizenOrGC ? 'yes' : 'no'}
          onChange={v => update('usCitizenOrGC', v === 'yes')}
        />
      </div>

      {answers.usCitizenOrGC === false && (
        <div className="space-y-4 pt-2 border-t border-gray-100">
          <div>
            <h3 className="text-base font-semibold text-gray-900">
              Are you currently living in the US?
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Residency affects your filing requirements.
            </p>
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

function SelectStep({ title, sub, options, selected, onToggle, icons }) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 leading-snug">{title}</h2>
        <p className="text-sm text-gray-500 mt-1.5">{sub}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {options.map(opt => (
          <OptionPill
            key={opt.id}
            label={opt.label}
            sub={opt.sub}
            icon={icons?.[opt.id]}
            selected={selected.includes(opt.id)}
            onClick={() => onToggle(opt.id)}
          />
        ))}
      </div>
    </div>
  )
}

function GlobalAssetsStep({ answers, update }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 leading-snug">
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

export default function ProfileWizard({ onComplete, onSkip, initialAnswers = null }) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState(initialAnswers ?? {
    usCitizenOrGC: null,
    livingInUS: null,
    income: [],
    deductions: [],
    globalAssets: null,
  })

  const steps = getSteps(answers)
  const pct = Math.round(((step + 1) / steps.length) * 100)

  function update(key, value) {
    setAnswers(prev => ({ ...prev, [key]: value }))
  }

  function toggleMulti(key, id) {
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
    if (step === 1) return true
    if (step === 2) return true
    if (step === 3) return answers.globalAssets !== null
    return false
  }

  function handleContinue() {
    if (step < steps.length - 1) {
      setStep(s => s + 1)
    } else {
      onComplete(answers)
    }
  }

  const isLast = step === steps.length - 1

  return (
    <div>
      {/* Progress bar */}
      <div className="mb-8">
        <div className="h-0.5 bg-gray-200 rounded-full overflow-hidden mb-2">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
            {steps[step]}
          </p>
          <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
            {pct}%
          </p>
        </div>
      </div>

      {/* Step content */}
      <div>
        {step === 0 && <ResidencyStep answers={answers} update={update} />}
        {step === 1 && (
          <SelectStep
            title="Where does your income come from?"
            sub="Select all that apply."
            options={INCOME_OPTIONS}
            icons={INCOME_ICONS}
            selected={answers.income}
            onToggle={id => toggleMulti('income', id)}
          />
        )}
        {step === 2 && (
          <SelectStep
            title="Any of these apply to you this year?"
            sub="Select all that apply."
            options={DEDUCTION_OPTIONS}
            icons={DEDUCTION_ICONS}
            selected={answers.deductions}
            onToggle={id => toggleMulti('deductions', id)}
          />
        )}
        {step === 3 && <GlobalAssetsStep answers={answers} update={update} />}
      </div>

      {/* Footer actions */}
      <div className="mt-10 flex items-center justify-between">
        <button
          onClick={onSkip}
          className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
        >
          Skip for now
        </button>
        <div className="flex items-center gap-3">
          {step > 0 && (
            <button
              onClick={() => setStep(s => s - 1)}
              className="flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
            >
              <ArrowLeft size={15} />
              Back
            </button>
          )}
          <button
            onClick={handleContinue}
            disabled={!canContinue()}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              canContinue()
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isLast ? 'Finish' : 'Continue'}
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  )
}
