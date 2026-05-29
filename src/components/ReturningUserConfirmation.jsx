import { useState } from 'react'
import {
  Check, ChevronDown, ChevronUp,
  Briefcase, Laptop2, TrendingUp, Banknote, Home, Globe,
  Landmark, GraduationCap, HeartHandshake, Stethoscope, Receipt, Monitor,
} from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
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

// Pre-filled answers from the user's previous year on file
export const RETURNING_PROFILE_DEFAULTS = {
  usCitizenOrGC: false,
  livingInUS:    true,
  income:        ['w2', 'investments', 'rental'],
  deductions:    ['mortgage', 'charitable'],
  globalAssets:  false,
}

function ConfirmRow({ label, summary, expanded, onToggle, children }) {
  const { theme } = useTheme()
  return (
    <div className="border-t border-blue-100/70">
      <div className="px-5 py-3.5 flex items-center gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold tracking-widest text-indigo-400/80 uppercase mb-0.5">{label}</p>
          <p className="text-sm text-gray-800 leading-snug">{summary}</p>
        </div>
        <button
          onClick={onToggle}
          className={`text-xs font-medium ${theme.accentText} ${theme.accentTextHover} transition-colors flex-shrink-0 flex items-center gap-1`}
        >
          {expanded ? 'Done' : 'Edit'}
          {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        </button>
      </div>
      {expanded && (
        <div className="px-4 pb-4">
          <div className="bg-white/80 rounded-xl px-4 pt-4 pb-4 border border-blue-100/60">
            {children}
          </div>
        </div>
      )}
    </div>
  )
}

function YesNoInline({ value, onChange }) {
  const { theme } = useTheme()
  return (
    <div className="flex gap-2 mt-3">
      {['yes', 'no'].map(opt => (
        <button
          key={opt}
          onClick={() => onChange(opt === 'yes')}
          className={`px-5 py-1.5 rounded-full border text-sm font-semibold transition-all ${
            value === (opt === 'yes')
              ? `${theme.accentLight} ${theme.accentBorder} ${theme.accentText}`
              : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
          }`}
        >
          {opt === 'yes' ? 'Yes' : 'No'}
        </button>
      ))}
    </div>
  )
}

function ChipGrid({ options, selected, onToggle, icons }) {
  const { theme } = useTheme()
  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {options.map(opt => {
        const isSelected = selected.includes(opt.id)
        const Icon = icons?.[opt.id]
        return (
          <button
            key={opt.id}
            onClick={() => onToggle(opt.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
              isSelected
                ? `${theme.accentLight} ${theme.accentBorder} ${theme.accentText}`
                : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
            }`}
          >
            {Icon && <Icon size={11} className={isSelected ? theme.accentText : 'text-gray-400'} aria-hidden />}
            {opt.label}
            {isSelected && <Check size={10} className={`${theme.accentText} flex-shrink-0`} strokeWidth={3} />}
          </button>
        )
      })}
    </div>
  )
}

export default function ReturningUserConfirmation({ onConfirm }) {
  const { theme } = useTheme()
  const [answers, setAnswers] = useState({ ...RETURNING_PROFILE_DEFAULTS })
  const [expandedRow, setExpandedRow] = useState(null)

  function update(key, val) {
    setAnswers(prev => ({ ...prev, [key]: val }))
  }
  function toggleMulti(key, id) {
    setAnswers(prev => {
      const arr = prev[key]
      return { ...prev, [key]: arr.includes(id) ? arr.filter(x => x !== id) : [...arr, id] }
    })
  }
  function toggleRow(key) {
    setExpandedRow(prev => prev === key ? null : key)
  }

  const residencySummary = answers.usCitizenOrGC
    ? 'US Citizen or Green Card Holder'
    : answers.livingInUS
      ? 'Non-resident · Currently living in the US'
      : 'Non-resident · Based outside the US'

  const incomeSummary = answers.income.length === 0
    ? 'None'
    : answers.income.map(id => INCOME_OPTIONS.find(o => o.id === id)?.label).filter(Boolean).join(' · ')

  const deductionsSummary = answers.deductions.length === 0
    ? 'None'
    : answers.deductions.map(id => DEDUCTION_OPTIONS.find(o => o.id === id)?.label).filter(Boolean).join(' · ')

  const globalSummary = answers.globalAssets
    ? 'Has international accounts or assets'
    : 'No international accounts'

  return (
    <div className="rounded-2xl overflow-hidden border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50/60">
      {/* Header */}
      <div className="px-5 pt-5 pb-4">
        <p className="text-[10px] font-bold tracking-widest text-indigo-400/80 uppercase mb-2">BEFORE YOU BEGIN</p>
        <p className="text-base font-semibold text-gray-900 mb-1">Your profile from last year</p>
        <p className="text-xs text-gray-500 leading-relaxed">Confirm it's still accurate for 2025, or edit anything that's changed.</p>
      </div>

      {/* Residency row */}
      <ConfirmRow
        label="Residency"
        summary={residencySummary}
        expanded={expandedRow === 'residency'}
        onToggle={() => toggleRow('residency')}
      >
        <div className="space-y-4">
          <div>
            <p className="text-xs font-semibold text-gray-700">Are you a US citizen or green card holder?</p>
            <YesNoInline value={answers.usCitizenOrGC} onChange={v => update('usCitizenOrGC', v)} />
          </div>
          {answers.usCitizenOrGC === false && (
            <div>
              <p className="text-xs font-semibold text-gray-700">Are you currently living in the US?</p>
              <YesNoInline value={answers.livingInUS} onChange={v => update('livingInUS', v)} />
            </div>
          )}
        </div>
      </ConfirmRow>

      {/* Income row */}
      <ConfirmRow
        label="Income sources"
        summary={incomeSummary}
        expanded={expandedRow === 'income'}
        onToggle={() => toggleRow('income')}
      >
        <div>
          <p className="text-xs font-semibold text-gray-700">Select all that apply</p>
          <ChipGrid
            options={INCOME_OPTIONS}
            selected={answers.income}
            onToggle={id => toggleMulti('income', id)}
            icons={INCOME_ICONS}
          />
        </div>
      </ConfirmRow>

      {/* Deductions row */}
      <ConfirmRow
        label="Deductions"
        summary={deductionsSummary}
        expanded={expandedRow === 'deductions'}
        onToggle={() => toggleRow('deductions')}
      >
        <div>
          <p className="text-xs font-semibold text-gray-700">Select all that apply</p>
          <ChipGrid
            options={DEDUCTION_OPTIONS}
            selected={answers.deductions}
            onToggle={id => toggleMulti('deductions', id)}
            icons={DEDUCTION_ICONS}
          />
        </div>
      </ConfirmRow>

      {/* Global assets row */}
      <ConfirmRow
        label="Global assets"
        summary={globalSummary}
        expanded={expandedRow === 'global'}
        onToggle={() => toggleRow('global')}
      >
        <div>
          <p className="text-xs font-semibold text-gray-700">Do you hold financial accounts or assets outside the US?</p>
          <YesNoInline value={answers.globalAssets} onChange={v => update('globalAssets', v)} />
        </div>
      </ConfirmRow>

      {/* Confirm CTA */}
      <div className="px-5 py-4 border-t border-blue-100/70">
        <button
          onClick={() => onConfirm(answers)}
          className={`w-full flex items-center justify-center gap-2 py-3 ${theme.btnPrimary} ${theme.btnRadius} text-sm font-semibold transition-colors`}
        >
          <Check size={14} strokeWidth={3} />
          Confirm — this is still accurate
        </button>
      </div>
    </div>
  )
}
