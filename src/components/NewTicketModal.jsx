import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { X, User, Building2, Check, ChevronLeft } from 'lucide-react'

const SERVICES = {
  individual: [
    { id: 'it-filing', label: 'IT Filing Services', sub: 'Federal & state income tax filing' },
    { id: 'tax-advisory', label: 'Tax Advisory', sub: 'Personalized tax planning guidance' },
    { id: 'amended', label: 'Amended Return', sub: 'Correct a previously filed return' },
    { id: 'state-filing', label: 'State Filing Only', sub: 'State-level tax return filing' },
    { id: 'itin', label: 'ITIN Application', sub: 'Apply for an individual tax ID' },
    { id: 'audit', label: 'Audit Support', sub: 'Representation during IRS audit' },
  ],
  business: [
    { id: 'biz-filing', label: 'Business Tax Filing', sub: 'Corporate or LLC tax return' },
    { id: 'payroll', label: 'Payroll Tax', sub: 'Payroll tax compliance & filings' },
    { id: 'sales-tax', label: 'Sales Tax', sub: 'Sales tax registration & returns' },
    { id: 'corp-advisory', label: 'Corporate Advisory', sub: 'Strategic business tax planning' },
    { id: 'bookkeeping', label: 'Bookkeeping', sub: 'Monthly financial record keeping' },
    { id: 'biz-audit', label: 'Audit Support', sub: 'Business IRS audit representation' },
  ],
}

const YEARS = ['2025', '2024', '2023', '2022', '2021']

const STEP_SUBTITLE = {
  1: 'Who is this filing for?',
  2: 'Select a service',
  3: 'Filing details',
}

export default function NewTicketModal({ onClose }) {
  const navigate = useNavigate()
  const [type, setType] = useState(null)
  const [service, setService] = useState(null)
  const [year, setYear] = useState('')
  const [description, setDescription] = useState('')

  const step = !type ? 1 : !service ? 2 : 3
  const canSubmit = type && service && year

  function handleCreate() {
    if (!canSubmit) return
    onClose()
    navigate('/tickets/467501')
  }

  return (
    <div className="fixed inset-0 z-50 md:flex md:items-center md:justify-center md:p-4">
      {/* Desktop backdrop */}
      <div className="hidden md:block absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      <div className="relative h-full w-full flex flex-col bg-white md:rounded-2xl md:h-auto md:max-w-2xl md:overflow-hidden md:shadow-2xl">

        {/* ── Mobile top bar ── */}
        <div className="md:hidden flex items-center justify-between px-4 h-14 border-b border-gray-100 flex-shrink-0">
          <button
            onClick={onClose}
            className="flex items-center gap-1 text-sm font-medium text-gray-500 min-w-[56px]"
          >
            <ChevronLeft size={16} />
            Cancel
          </button>
          <div className="text-center">
            <p className="text-sm font-semibold text-gray-900">New filing</p>
            <p className="text-[11px] text-gray-400">{STEP_SUBTITLE[step]}</p>
          </div>
          <div className="min-w-[56px]" />
        </div>

        {/* Mobile step progress bar */}
        <div className="md:hidden h-[3px] bg-gray-100 flex-shrink-0">
          <div
            className="h-full bg-blue-500 transition-all duration-500"
            style={{ width: `${Math.round((step / 3) * 100)}%` }}
          />
        </div>

        {/* ── Desktop header ── */}
        <div className="hidden md:flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
          <div>
            <h2 className="text-base font-semibold text-gray-900">New filing</h2>
            <p className="text-xs text-gray-400 mt-0.5">{STEP_SUBTITLE[step]}</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400">
            <X size={16} />
          </button>
        </div>

        {/* Body — scrollable on mobile */}
        <div className="flex-1 overflow-y-auto px-4 md:px-6 py-5 space-y-5">

          {/* Step 1: Filing type */}
          <div>
            <p className="text-xs font-semibold text-gray-500 mb-2.5">Filing type</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'individual', icon: User, label: 'Individual', sub: 'Personal tax return (1040)' },
                { id: 'business', icon: Building2, label: 'Business', sub: 'Corporate or business return' },
              ].map(({ id, icon: Icon, label, sub }) => (
                <button
                  key={id}
                  onClick={() => { setType(id); setService(null) }}
                  className={`relative flex flex-col md:flex-row items-center md:items-start gap-3 p-4 rounded-xl border-2 text-center md:text-left transition-all ${
                    type === id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {/* Check badge — mobile, absolute top-right */}
                  {type === id && (
                    <div className="md:hidden absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                      <Check size={10} className="text-white" />
                    </div>
                  )}
                  <div className={`w-12 h-12 md:w-8 md:h-8 rounded-2xl md:rounded-lg flex items-center justify-center flex-shrink-0 ${
                    type === id ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-500'
                  }`}>
                    <Icon size={22} className="md:hidden" aria-hidden />
                    <Icon size={16} className="hidden md:block" aria-hidden />
                  </div>
                  <div className="min-w-0">
                    <p className={`text-sm font-semibold ${type === id ? 'text-blue-700' : 'text-gray-800'}`}>{label}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5 leading-snug">{sub}</p>
                  </div>
                  {/* Check badge — desktop, inline */}
                  {type === id && (
                    <div className="hidden md:flex ml-auto w-4 h-4 rounded-full bg-blue-500 items-center justify-center flex-shrink-0">
                      <Check size={10} className="text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Service */}
          {type && (
            <div>
              <p className="text-xs font-semibold text-gray-500 mb-2.5">Service</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3">
                {SERVICES[type].map(({ id, label, sub }) => (
                  <button
                    key={id}
                    onClick={() => setService(id)}
                    className={`flex items-start gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all ${
                      service === id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium leading-snug ${service === id ? 'text-blue-700' : 'text-gray-800'}`}>{label}</p>
                      <p className="text-[11px] text-gray-400 mt-0.5 leading-snug">{sub}</p>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 mt-0.5 transition-all flex items-center justify-center ${
                      service === id ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                    }`}>
                      {service === id && <Check size={10} className="text-white" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Details */}
          {type && service && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 block mb-1.5">
                  Filing year <span className="text-red-400">*</span>
                </label>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm text-gray-800 bg-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Select year</option>
                  {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 block mb-1.5">
                  Description <span className="text-gray-300 font-normal">(optional)</span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add any notes or context for your advisor…"
                  rows={3}
                  className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm text-gray-800 resize-none focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 placeholder-gray-300"
                />
              </div>
            </div>
          )}
        </div>

        {/* ── Mobile footer ── */}
        <div className="md:hidden flex-shrink-0 px-4 pt-3 pb-8 border-t border-gray-100 bg-white">
          <button
            onClick={handleCreate}
            disabled={!canSubmit}
            className={`w-full py-3.5 rounded-xl text-sm font-semibold transition-all ${
              canSubmit
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            Create filing
          </button>
        </div>

        {/* ── Desktop footer ── */}
        <div className="hidden md:flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50 flex-shrink-0">
          <button onClick={onClose} className="text-sm text-gray-500 hover:text-gray-700 font-medium">
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={!canSubmit}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
              canSubmit
                ? 'bg-gray-900 text-white hover:bg-gray-800'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            Create ticket
          </button>
        </div>
      </div>
    </div>
  )
}
