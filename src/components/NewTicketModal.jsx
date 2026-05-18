import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { X, User, Building2, Check } from 'lucide-react'

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-base font-semibold text-gray-900">New filing</h2>
            <p className="text-xs text-gray-400 mt-0.5">
              {step === 1 && 'Who is this filing for?'}
              {step === 2 && 'Select a service'}
              {step === 3 && 'Filing details'}
            </p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400">
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          {/* Step 1: Type */}
          <div>
            <p className="text-xs font-semibold text-gray-500 mb-2">Filing type</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'individual', icon: User, label: 'Individual', sub: 'Personal tax return (1040)' },
                { id: 'business', icon: Building2, label: 'Business', sub: 'Corporate or business return' },
              ].map(({ id, icon: Icon, label, sub }) => (
                <button
                  key={id}
                  onClick={() => { setType(id); setService(null) }}
                  className={`flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                    type === id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    type === id ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-500'
                  }`}>
                    <Icon size={16} />
                  </div>
                  <div>
                    <p className={`text-sm font-semibold ${type === id ? 'text-blue-700' : 'text-gray-800'}`}>{label}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{sub}</p>
                  </div>
                  {type === id && (
                    <div className="ml-auto w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
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
              <p className="text-xs font-semibold text-gray-500 mb-2">Service</p>
              <div className="grid grid-cols-3 gap-3">
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
                      <p className={`text-sm font-medium ${service === id ? 'text-blue-700' : 'text-gray-800'}`}>{label}</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">{sub}</p>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 mt-0.5 transition-all ${
                      service === id ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                    }`}>
                      {service === id && <Check size={10} className="text-white m-auto" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Details */}
          {type && service && (
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-gray-500 block mb-1.5">
                  Filing year <span className="text-red-400">*</span>
                </label>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 bg-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
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
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 resize-none focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 placeholder-gray-300"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50">
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
