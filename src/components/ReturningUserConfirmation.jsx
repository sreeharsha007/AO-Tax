import { useState } from 'react'
import {
  Check, ChevronDown,
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
import { useTheme } from '../context/ThemeContext'
import { INCOME_OPTIONS, DEDUCTION_OPTIONS } from '../utils/inferProfile'

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

/* ── Pre-filled answers from the user's previous year on file ────────────── */
export const RETURNING_PROFILE_DEFAULTS = {
  usCitizenOrGC: false,
  livingInUS:    true,
  income:        ['w2', 'investments', 'rental'],
  deductions:    ['mortgage', 'charitable'],
  globalAssets:  false,
}

/* ── Shared: accordion rows (Default direction) ──────────────────────────── */
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
          <ChevronDown
            size={12}
            className={`transition-transform duration-200 ${expanded ? 'rotate-180' : 'rotate-0'}`}
          />
        </button>
      </div>
      {expanded && (
        <div className="px-4 pb-4 accordion-open">
          <div className="bg-white/80 rounded-xl px-4 pt-4 pb-4 border border-blue-100/60">
            {children}
          </div>
        </div>
      )}
    </div>
  )
}

/* ── Shared: Yes / No pills ──────────────────────────────────────────────── */
function YesNoInline({ value, onChange, question }) {
  const { theme } = useTheme()
  const enhanced = theme.animationsEnhanced
  return (
    <div>
      {question && (
        <p className="text-xs text-gray-500 leading-relaxed mb-2.5">{question}</p>
      )}
      <div className="flex gap-2">
        {['yes', 'no'].map(opt => {
          const active = value === (opt === 'yes')
          return (
            <button
              key={opt}
              onClick={() => onChange(opt === 'yes')}
              className={`px-5 py-1.5 border text-sm font-semibold transition-all ${
                enhanced ? theme.pillBtnRadius : 'rounded-full'
              } ${
                active
                  ? theme.id === 'print'
                    ? 'bg-gray-100 border-gray-700 text-gray-900'                 // Print: neutral marked, not activated
                    : `${theme.accentLight} ${theme.accentBorder} ${theme.accentText}`
                  : theme.id === 'grain'
                    ? 'bg-[#faf9f6] border-[#ddd5c5] text-stone-600 hover:bg-amber-50/30'
                    : theme.id === 'print'
                      ? 'bg-white border-gray-300 text-gray-700 hover:border-gray-500'
                      : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              {opt === 'yes' ? 'Yes' : 'No'}
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* ── Shared: chip grid (Default direction) ───────────────────────────────── */
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

/* ── Enhanced: compact chip — direct toggle, always visible ─────────────── */
function LoftChip({ opt, isSelected, onToggle, lucideIcon: LucideIcon, phosphorIcon: PhosphorIcon }) {
  const { theme } = useTheme()
  return (
    <button
      onClick={() => onToggle(opt.id)}
      className={`flex items-center gap-1.5 px-3 py-1.5 ${theme.pillBtnRadius} border text-xs font-medium transition-all ${
        isSelected
          ? theme.id === 'print'
            ? 'bg-gray-100 border-gray-700 text-gray-900'                       // Print: neutral marked chip
            : theme.id === 'grain'
            ? `${theme.accentLight} ${theme.accentBorder} ${theme.accentText}`  // Grain: same blue accent as Yes/No pills
            : 'bg-blue-50 border-blue-200 text-blue-700'        // Loft/Azure: blue fill
          : theme.id === 'grain'
            ? 'bg-[#faf9f6] border-[#ddd5c5] text-stone-500 hover:bg-amber-50/30 hover:border-[#c5b99a]'
            : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50'
      }`}
    >
      {PhosphorIcon && (
        <PhosphorIcon
          size={13}
          weight={theme.iconWeight}
          className={isSelected
            ? theme.id === 'print' ? 'text-gray-700' : theme.accentText
            : theme.id === 'grain'
              ? 'text-stone-400'
              : theme.id === 'print'
                ? 'text-gray-400'
                : theme.wizardIconInline
                  ? 'text-blue-300'
                  : 'text-gray-400'
          }
          aria-hidden
        />
      )}
      {opt.label}
      {isSelected && (
        <Check size={9} className="text-blue-600 flex-shrink-0" strokeWidth={3.5} />
      )}
    </button>
  )
}

/* ── Loft: section divider ───────────────────────────────────────────────── */
function ProfileSection({ label, children }) {
  const { theme } = useTheme()
  return (
    <div className={`px-6 py-5 border-t ${theme.borderMuted || 'border-gray-100'}`}>
      <p className={`${theme.label} mb-3`}>{label}</p>
      {children}
    </div>
  )
}

/* ── Loft layout: hybrid Direction 1 + Direction 3 ──────────────────────── */
function LoftConfirmationLayout({ answers, update, toggleMulti, onConfirm, theme }) {
  return (
    <div className={`${theme.cardBg || 'bg-white'} ${theme.cardRadius} ${theme.cardShadow} overflow-hidden`} style={{ border: `1px solid ${theme.id === 'grain' ? '#ddd5c5' : 'transparent'}` }}>

      {/* Header */}
      <div className={`px-6 pt-6 pb-5 border-b ${theme.id === 'grain' ? 'border-[#ddd5c5]' : 'border-gray-100'}`}>
        <p className={theme.label}>BEFORE YOU BEGIN</p>
        <p className="text-base font-semibold text-gray-900 mt-1.5">Your 2024 profile</p>
        <p className="text-xs text-gray-500 mt-1 leading-relaxed">
          Everything from last year is shown below. Tap anything to change it.
        </p>
      </div>

      {/* Residency */}
      <ProfileSection label="Residency">
        <YesNoInline
          value={answers.usCitizenOrGC}
          onChange={v => update('usCitizenOrGC', v)}
          question="US citizen or green card holder?"
        />
        {answers.usCitizenOrGC === false && (
          <div className="mt-4">
            <YesNoInline
              value={answers.livingInUS}
              onChange={v => update('livingInUS', v)}
              question="Currently living in the US?"
            />
          </div>
        )}
      </ProfileSection>

      {/* Income sources */}
      <ProfileSection label="Income sources">
        <div className="flex flex-wrap gap-2">
          {INCOME_OPTIONS.map(opt => (
            <LoftChip
              key={opt.id}
              opt={opt}
              isSelected={answers.income.includes(opt.id)}
              onToggle={id => toggleMulti('income', id)}
              lucideIcon={INCOME_ICONS[opt.id]}
              phosphorIcon={INCOME_ICONS_PHOSPHOR[opt.id]}
            />
          ))}
        </div>
      </ProfileSection>

      {/* Deductions */}
      <ProfileSection label="Deductions">
        <div className="flex flex-wrap gap-2">
          {DEDUCTION_OPTIONS.map(opt => (
            <LoftChip
              key={opt.id}
              opt={opt}
              isSelected={answers.deductions.includes(opt.id)}
              onToggle={id => toggleMulti('deductions', id)}
              lucideIcon={DEDUCTION_ICONS[opt.id]}
              phosphorIcon={DEDUCTION_ICONS_PHOSPHOR[opt.id]}
            />
          ))}
        </div>
      </ProfileSection>

      {/* Global assets */}
      <ProfileSection label="Global assets">
        <YesNoInline
          value={answers.globalAssets}
          onChange={v => update('globalAssets', v)}
          question="Financial accounts or assets outside the US?"
        />
      </ProfileSection>

      {/* CTA */}
      <div className="px-6 py-5 border-t border-gray-100">
        <button
          onClick={() => onConfirm(answers)}
          className={`w-full flex items-center justify-center gap-2 py-3.5 ${theme.btnPrimary} ${theme.btnRadius} text-sm font-semibold transition-all`}
          style={{ boxShadow: `0 4px 16px ${theme.accentTextColor}3d` }}
        >
          <Check size={14} strokeWidth={3} />
          Confirm — this is still accurate
        </button>
      </div>
    </div>
  )
}

/* ── Main export ─────────────────────────────────────────────────────────── */
export default function ReturningUserConfirmation({ onConfirm }) {
  const { theme } = useTheme()
  const enhanced = theme.animationsEnhanced
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

  /* ── Loft: new open layout ── */
  if (enhanced) {
    return (
      <LoftConfirmationLayout
        answers={answers}
        update={update}
        toggleMulti={toggleMulti}
        onConfirm={onConfirm}
        theme={theme}
      />
    )
  }

  /* ── Default: existing accordion ── */
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
      <div className="px-5 pt-5 pb-4">
        <p className="text-[10px] font-bold tracking-widest text-indigo-400/80 uppercase mb-2">BEFORE YOU BEGIN</p>
        <p className="text-base font-semibold text-gray-900 mb-1">Your profile from last year</p>
        <p className="text-xs text-gray-500 leading-relaxed">Confirm it's still accurate for 2025, or edit anything that's changed.</p>
      </div>

      <ConfirmRow label="Residency" summary={residencySummary}
        expanded={expandedRow === 'residency'} onToggle={() => toggleRow('residency')}>
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

      <ConfirmRow label="Income sources" summary={incomeSummary}
        expanded={expandedRow === 'income'} onToggle={() => toggleRow('income')}>
        <div>
          <p className="text-xs font-semibold text-gray-700">Select all that apply</p>
          <ChipGrid options={INCOME_OPTIONS} selected={answers.income}
            onToggle={id => toggleMulti('income', id)} icons={INCOME_ICONS} />
        </div>
      </ConfirmRow>

      <ConfirmRow label="Deductions" summary={deductionsSummary}
        expanded={expandedRow === 'deductions'} onToggle={() => toggleRow('deductions')}>
        <div>
          <p className="text-xs font-semibold text-gray-700">Select all that apply</p>
          <ChipGrid options={DEDUCTION_OPTIONS} selected={answers.deductions}
            onToggle={id => toggleMulti('deductions', id)} icons={DEDUCTION_ICONS} />
        </div>
      </ConfirmRow>

      <ConfirmRow label="Global assets" summary={globalSummary}
        expanded={expandedRow === 'global'} onToggle={() => toggleRow('global')}>
        <div>
          <p className="text-xs font-semibold text-gray-700">Do you hold financial accounts or assets outside the US?</p>
          <YesNoInline value={answers.globalAssets} onChange={v => update('globalAssets', v)} />
        </div>
      </ConfirmRow>

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
