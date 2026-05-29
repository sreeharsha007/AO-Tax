import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import {
  X, User, Building2, Check, ArrowRight,
  FileText, Lightbulb, RotateCcw, MapPin, CreditCard, Shield,
  Briefcase, Users, ShoppingCart, TrendingUp, BookOpen, ShieldCheck,
} from 'lucide-react'

const SERVICES = {
  individual: [
    { id: 'it-filing',    icon: FileText,   label: 'IT Filing Services',  sub: 'Federal & state income tax filing' },
    { id: 'tax-advisory', icon: Lightbulb,  label: 'Tax Advisory',        sub: 'Personalized tax planning guidance' },
    { id: 'amended',      icon: RotateCcw,  label: 'Amended Return',      sub: 'Correct a previously filed return' },
    { id: 'state-filing', icon: MapPin,     label: 'State Filing Only',   sub: 'State-level tax return filing' },
    { id: 'itin',         icon: CreditCard, label: 'ITIN Application',    sub: 'Apply for an individual tax ID' },
    { id: 'audit',        icon: Shield,     label: 'Audit Support',       sub: 'Representation during IRS audit' },
  ],
  business: [
    { id: 'biz-filing',    icon: Briefcase,    label: 'Business Tax Filing', sub: 'Corporate or LLC tax return' },
    { id: 'payroll',       icon: Users,        label: 'Payroll Tax',         sub: 'Payroll tax compliance & filings' },
    { id: 'sales-tax',     icon: ShoppingCart, label: 'Sales Tax',           sub: 'Sales tax registration & returns' },
    { id: 'corp-advisory', icon: TrendingUp,   label: 'Corporate Advisory',  sub: 'Strategic business tax planning' },
    { id: 'bookkeeping',   icon: BookOpen,     label: 'Bookkeeping',         sub: 'Monthly financial record keeping' },
    { id: 'biz-audit',     icon: ShieldCheck,  label: 'Audit Support',       sub: 'Business IRS audit representation' },
  ],
}

const YEARS = ['2025', '2024', '2023', '2022', '2021']

const STEP_LABEL = { 1: 'FILING TYPE', 2: 'SERVICE', 3: 'DETAILS' }

export default function NewTicketModal({ onClose, isReturningUser = false }) {
  const navigate = useNavigate()
  const { theme } = useTheme()
  const [type, setType]               = useState(null)
  const [service, setService]         = useState(null)
  const [year, setYear]               = useState('')
  const [description, setDescription] = useState('')

  const step      = !type ? 1 : !service ? 2 : 3
  const canSubmit = type && service && year

  function handleCreate() {
    if (!canSubmit) return
    onClose()
    navigate(
      '/tickets/467501',
      isReturningUser ? { state: { isReturningUser: true } } : undefined,
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center md:p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className={`relative w-full flex flex-col bg-white rounded-t-2xl md:${theme.cardRadius} md:max-w-2xl md:shadow-2xl max-h-[92vh] overflow-hidden`}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 flex-shrink-0">
          <div>
            <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-0.5">
              {STEP_LABEL[step]}
            </p>
            <h2 className="text-base font-semibold text-gray-900">New filing</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Progress bar */}
        <div className="h-0.5 bg-gray-100 flex-shrink-0">
          <div
            className={`h-full ${theme.progressFill} rounded-full transition-all duration-500`}
            style={{ width: `${Math.round((step / 3) * 100)}%` }}
          />
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">

          {/* Step 1 — Filing type */}
          <div>
            <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-3">
              Who is this filing for?
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'individual', icon: User,      label: 'Individual', sub: 'Personal tax return (1040)' },
                { id: 'business',   icon: Building2, label: 'Business',   sub: 'Corporate or business return' },
              ].map(({ id, icon: Icon, label, sub }) => (
                <button
                  key={id}
                  onClick={() => { setType(id); setService(null) }}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    type === id
                      ? `${theme.accentLight} ${theme.accentBorder}`
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <Icon size={16} className={type === id ? theme.accentText : 'text-gray-400'} aria-hidden />
                    {type === id && <Check size={13} className={theme.accentText} strokeWidth={3} />}
                  </div>
                  <p className={`text-sm font-semibold leading-tight ${type === id ? theme.accentText : 'text-gray-900'}`}>
                    {label}
                  </p>
                  <p className={`text-xs mt-1 leading-snug ${type === id ? 'text-gray-500 opacity-70' : 'text-gray-500'}`}>
                    {sub}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2 — Service */}
          {type && (
            <div>
              <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-3">
                Select a service
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {SERVICES[type].map(({ id, icon: Icon, label, sub }) => (
                  <button
                    key={id}
                    onClick={() => setService(id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      service === id
                        ? `${theme.accentLight} ${theme.accentBorder}`
                        : 'bg-white border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <Icon size={16} className={service === id ? theme.accentText : 'text-gray-400'} aria-hidden />
                      {service === id && <Check size={13} className={theme.accentText} strokeWidth={3} />}
                    </div>
                    <p className={`text-sm font-semibold leading-tight ${service === id ? theme.accentText : 'text-gray-900'}`}>
                      {label}
                    </p>
                    <p className={`text-xs mt-1 leading-snug ${service === id ? 'text-gray-500 opacity-70' : 'text-gray-500'}`}>
                      {sub}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3 — Details */}
          {type && service && (
            <div className="space-y-4">
              <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                Filing details
              </p>
              <div>
                <label className="text-xs font-semibold text-gray-500 block mb-1.5">
                  Tax year <span className="text-red-400">*</span>
                </label>
                <select
                  value={year}
                  onChange={e => setYear(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm text-gray-800 bg-white focus:outline-none focus:border-blue-400 transition-colors"
                >
                  <option value="">Select year</option>
                  {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 block mb-1.5">
                  Notes <span className="text-gray-300 font-normal">(optional)</span>
                </label>
                <textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Add any context for your advisor…"
                  rows={3}
                  className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm text-gray-800 resize-none focus:outline-none focus:border-blue-400 transition-colors placeholder-gray-300"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 flex-shrink-0">
          <button
            onClick={onClose}
            className="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={!canSubmit}
            className={`flex items-center gap-2 px-5 py-2.5 ${theme.btnRadius} text-sm font-semibold transition-all ${
              canSubmit
                ? theme.btnPrimary
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            Create filing <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}
