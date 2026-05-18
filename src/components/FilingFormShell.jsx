import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import {
  ArrowLeft, ArrowRight, CheckCircle2, Circle,
  ChevronRight, ChevronDown, ChevronLeft, Upload, X, Plus, Trash2
} from 'lucide-react'
import { NAV_SECTIONS } from '../data/filingFormData'

const TICKET = {
  id: '#467501',
  service: 'IT Filing Services',
  year: 'Tax Year 2025',
}

function StepIcon({ state, size = 16 }) {
  if (state === 'complete')
    return <CheckCircle2 size={size} className="text-blue-500 flex-shrink-0" />
  if (state === 'in_progress' || state === 'active')
    return (
      <div
        className="rounded-full border-2 border-blue-500 bg-blue-50 flex-shrink-0"
        style={{ width: size, height: size }}
      />
    )
  // not_started
  return <Circle size={size} className="text-gray-300 flex-shrink-0" />
}

const INCOME_SECTION_ID = 'income'

function SidebarToggle({ enabled, onToggle }) {
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onToggle() }}
      aria-label={enabled ? 'Disable section' : 'Enable section'}
      className={`relative inline-flex h-3.5 w-6 rounded-full flex-shrink-0 transition-colors duration-200 ${
        enabled ? 'bg-blue-500' : 'bg-gray-300'
      }`}
    >
      <span className={`absolute top-0.5 h-2.5 w-2.5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
        enabled ? 'translate-x-2.5' : 'translate-x-0.5'
      }`} />
    </button>
  )
}

function SidebarNav({ activeSubId, onSelect, enabledSubs, onToggleSub, subStates, unresolvedBySubId = {} }) {
  const [expanded, setExpanded] = useState(() =>
    NAV_SECTIONS
      .filter(s => s.sub.some(sub => sub.id === activeSubId) || s.state === 'active')
      .map(s => s.id)
  )

  function getSectionState(section) {
    const ids = section.sub.length ? section.sub.map(s => s.id) : [section.id]
    const states = ids.map(id => subStates[id] || 'not_started')
    if (states.every(s => s === 'complete')) return 'complete'
    if (states.some(s => s !== 'not_started')) return 'in_progress'
    return 'not_started'
  }

  function getProgress(section) {
    if (!section.sub.length) return null
    const completed = section.sub.filter(s => (subStates[s.id] || 'not_started') === 'complete').length
    return { completed, total: section.sub.length }
  }

  return (
    <nav className="w-60 flex-shrink-0 py-5 px-3 overflow-y-auto">
      {NAV_SECTIONS.map((section) => {
        const isExpanded = expanded.includes(section.id)
        const isIncome   = section.id === INCOME_SECTION_ID
        const hasSubs    = section.sub.length > 0
        const sectionState = getSectionState(section)
        const progress     = getProgress(section)
        const isSectionActive = !hasSubs && activeSubId === section.id

        return (
          <div key={section.id} className="mb-0.5">
            <button
              onClick={() => {
                if (!hasSubs) {
                  onSelect(section.id)
                } else {
                  setExpanded(prev =>
                    prev.includes(section.id)
                      ? prev.filter(i => i !== section.id)
                      : [...prev, section.id]
                  )
                }
              }}
              className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-left rounded-lg transition-colors ${
                isSectionActive ? 'bg-blue-50 text-blue-700' : 'text-gray-900 hover:bg-gray-100'
              }`}
            >
              <StepIcon state={sectionState} />
              <span className="flex-1 text-xs font-semibold">{section.label}</span>
              {/* Collapsed progress counter */}
              {!isExpanded && progress && (
                <span className={`text-[10px] font-semibold mr-1 ${progress.completed > 0 ? 'text-blue-500' : 'text-gray-400'}`}>
                  {progress.completed}/{progress.total}
                </span>
              )}
              {hasSubs && (
                isExpanded
                  ? <ChevronDown size={12} className="text-gray-400" />
                  : <ChevronRight size={12} className="text-gray-400" />
              )}
            </button>

            {isExpanded && hasSubs && (
              <div className="ml-[34px] border-l border-gray-100 pl-3 mb-1">
                {section.sub.map((sub) => {
                  const isEnabled = !isIncome || enabledSubs.has(sub.id)
                  const isActive  = activeSubId === sub.id
                  const subState  = subStates[sub.id] || 'not_started'

                  return (
                    <button
                      key={sub.id}
                      onClick={() => onSelect(sub.id)}
                      className={`w-full flex items-center gap-2 py-1.5 px-2 rounded-lg text-left transition-colors ${
                        isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <StepIcon state={subState} size={12} />
                      <span className={`text-[11px] font-medium flex-1 ${!isEnabled && isIncome ? 'text-gray-400' : ''}`}>
                        {sub.label}
                      </span>
                      {unresolvedBySubId[sub.id] > 0 && (
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" title={`${unresolvedBySubId[sub.id]} pending comment${unresolvedBySubId[sub.id] > 1 ? 's' : ''}`} />
                      )}
                      {isIncome && (
                        <SidebarToggle
                          enabled={isEnabled}
                          onToggle={() => onToggleSub(sub.id)}
                        />
                      )}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </nav>
  )
}

function FormField({ field, value, onChange, hasComment }) {
  const base = `w-full border rounded-lg px-3 py-2.5 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 placeholder-gray-300 ${
    hasComment
      ? 'border-amber-300 focus:border-amber-400 focus:ring-amber-100'
      : 'border-gray-200 focus:border-blue-400 focus:ring-blue-100'
  }`

  if (field.type === 'select') {
    return (
      <select className={base} value={value || ''} onChange={e => onChange?.(e.target.value)}>
        <option value="" disabled>Select…</option>
        {(field.options || []).map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    )
  }

  if (field.type === 'radio') {
    return (
      <div className="flex flex-wrap gap-3 pt-0.5">
        {(field.options || []).map(o => (
          <label key={o} className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name={field.id} value={o}
              checked={value === o} onChange={() => onChange?.(o)}
              className="accent-blue-500" />
            <span className="text-sm text-gray-700">{o}</span>
          </label>
        ))}
      </div>
    )
  }

  if (field.type === 'yesno') {
    return (
      <div className="flex gap-3 pt-0.5">
        {['Yes', 'No'].map(o => (
          <label key={o} className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name={field.id} value={o}
              checked={value === o} onChange={() => onChange?.(o)}
              className="accent-blue-500" />
            <span className="text-sm text-gray-700">{o}</span>
          </label>
        ))}
      </div>
    )
  }

  if (field.type === 'textarea') {
    return (
      <textarea
        rows={3}
        placeholder={field.placeholder}
        value={value || ''}
        onChange={e => onChange?.(e.target.value)}
        className={`${base} resize-none`}
      />
    )
  }

  if (field.type === 'note') {
    return (
      <div className="col-span-2 flex items-start gap-2.5 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-xs text-blue-700">
        {field.text}
      </div>
    )
  }

  if (field.type === 'upload') {
    return value ? (
      <div className="flex items-center gap-3 px-4 py-2.5 bg-green-50 border border-green-200 rounded-lg">
        <CheckCircle2 size={14} className="text-green-500 flex-shrink-0" />
        <span className="text-xs text-green-700 flex-1 truncate font-medium">{value.name}</span>
        <button onClick={() => onChange?.(null)}
          className="text-green-400 hover:text-red-500 transition-colors" aria-label="Remove file">
          <X size={12} />
        </button>
      </div>
    ) : (
      <label className="flex flex-col items-center justify-center gap-2 w-full border-2 border-dashed border-gray-200 rounded-lg px-4 py-6 cursor-pointer hover:border-blue-300 hover:bg-blue-50/30 transition-colors">
        <Upload size={20} className="text-gray-300" />
        <span className="text-xs text-gray-400">Click to upload or drag and drop</span>
        <input type="file" className="hidden" onChange={e => onChange?.(e.target.files?.[0] ?? null)} />
      </label>
    )
  }

  return (
    <input
      type={field.type === 'date' ? 'date' : field.type === 'number' ? 'number' : 'text'}
      placeholder={field.placeholder}
      value={value || ''}
      onChange={e => onChange?.(e.target.value)}
      className={base}
    />
  )
}

function FieldGrid({ fields, fieldValues = {}, onFieldChange, commentsByFieldId = {}, onFieldRef }) {
  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-5">
      {fields.map(field => {
        const colSpan =
          field.width === 'full' ? 'col-span-2' :
          field.width === 'quarter' ? 'col-span-1' :
          'col-span-1'
        const fieldComment = commentsByFieldId[field.id]
        const hasComment = !!fieldComment
        const hasUnresolvedComment = hasComment && !fieldComment.resolved

        return (
          <div key={field.id} className={colSpan} ref={el => onFieldRef?.(field.id, el)}>
            {field.type !== 'note' && (
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                {field.label}
                {field.required && <span className="text-red-400 ml-0.5">*</span>}
                {hasUnresolvedComment && (
                  <span className="ml-1.5 inline-block w-1.5 h-1.5 rounded-full bg-amber-400 align-middle" />
                )}
              </label>
            )}
            <FormField
              field={field}
              value={fieldValues[field.id]}
              onChange={val => onFieldChange?.(field.id, val)}
              hasComment={hasUnresolvedComment}
            />
          </div>
        )
      })}
    </div>
  )
}

function AccordionGroup({ group, isOpen, onToggle, fieldValues, onFieldChange, commentsByFieldId, onFieldRef }) {
  const hasGroupComment = group.fields?.some(f => commentsByFieldId?.[f.id] && !commentsByFieldId[f.id].resolved)
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-4 bg-white hover:bg-gray-50 transition-colors text-left"
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-800">{group.label}</span>
          {hasGroupComment && (
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
          )}
        </div>
        {isOpen
          ? <ChevronDown size={15} className="text-gray-400 flex-shrink-0" />
          : <ChevronRight size={15} className="text-gray-400 flex-shrink-0" />}
      </button>
      {isOpen && (
        <div className="px-5 pb-6 pt-1 border-t border-gray-100 bg-white">
          <FieldGrid
            fields={group.fields}
            fieldValues={fieldValues}
            onFieldChange={onFieldChange}
            commentsByFieldId={commentsByFieldId}
            onFieldRef={onFieldRef}
          />
        </div>
      )}
    </div>
  )
}

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']
const YEARS = Array.from({ length: 12 }, (_, i) => String(2014 + i))
const STATES = ['Alabama','Alaska','Arizona','California','Colorado','Florida','Georgia','Illinois','Massachusetts','New Jersey','New York','Ohio','Pennsylvania','Texas','Virginia','Washington','Other']

function EmployerEntry({ entry, index, onUpdate, onRemove }) {
  const sel = "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
  const inp = "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 bg-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 placeholder-gray-300"

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      {/* Entry header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white">
        <button
          onClick={() => onUpdate(entry.id, 'expanded', !entry.expanded)}
          className="flex items-center gap-2.5 flex-1 text-left"
        >
          {entry.expanded
            ? <ChevronDown size={14} className="text-gray-400 flex-shrink-0" />
            : <ChevronRight size={14} className="text-gray-400 flex-shrink-0" />}
          <span className="text-sm font-semibold text-gray-800">
            {entry.employer_name || `Employer ${index + 1}`}
          </span>
        </button>
        <button
          onClick={() => onRemove(entry.id)}
          className="p-1.5 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
          aria-label="Remove employer"
        >
          <Trash2 size={13} />
        </button>
      </div>

      {/* Entry fields */}
      {entry.expanded && (
        <div className="px-5 pb-5 pt-1 border-t border-gray-100 bg-white">
          <div className="grid grid-cols-2 gap-x-5 gap-y-4 mt-4">
            {/* Employer name — full width */}
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Employer name <span className="text-red-400">*</span></label>
              <input type="text" placeholder="e.g. TechNova Inc." className={inp}
                value={entry.employer_name || ''}
                onChange={e => onUpdate(entry.id, 'employer_name', e.target.value)} />
            </div>

            {/* Address */}
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Street address <span className="text-red-400">*</span></label>
              <input type="text" placeholder="123 Main St" className={inp}
                onChange={e => onUpdate(entry.id, 'street_address', e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Apartment number</label>
              <input type="text" placeholder="Apt 4B" className={inp}
                onChange={e => onUpdate(entry.id, 'apt_number', e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">ZIP code <span className="text-red-400">*</span></label>
              <input type="text" placeholder="10001" className={inp}
                onChange={e => onUpdate(entry.id, 'zip', e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">City <span className="text-red-400">*</span></label>
              <input type="text" placeholder="New York" className={inp}
                onChange={e => onUpdate(entry.id, 'city', e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">County <span className="text-red-400">*</span></label>
              <input type="text" placeholder="Manhattan" className={inp}
                onChange={e => onUpdate(entry.id, 'county', e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">State <span className="text-red-400">*</span></label>
              <select className={sel} defaultValue="">
                <option value="" disabled>Select…</option>
                {STATES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>

            {/* Currently working */}
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-gray-600 mb-2">Currently working here</label>
              <div className="flex gap-4">
                {['Yes','No'].map(o => (
                  <label key={o} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name={`working-${entry.id}`} value={o} className="accent-blue-500" />
                    <span className="text-sm text-gray-700">{o}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* From / To */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">From</label>
              <div className="grid grid-cols-2 gap-2">
                <select className={sel} defaultValue=""><option value="" disabled>Month</option>{MONTHS.map(m=><option key={m}>{m}</option>)}</select>
                <select className={sel} defaultValue=""><option value="" disabled>Year</option>{YEARS.map(y=><option key={y}>{y}</option>)}</select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">To</label>
              <div className="grid grid-cols-2 gap-2">
                <select className={sel} defaultValue=""><option value="" disabled>Month</option>{MONTHS.map(m=><option key={m}>{m}</option>)}</select>
                <select className={sel} defaultValue=""><option value="" disabled>Year</option>{YEARS.map(y=><option key={y}>{y}</option>)}</select>
              </div>
            </div>

            {/* Client location */}
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-gray-600 mb-2">Did you work at client location during your projects/assignments? <span className="text-gray-400 font-normal">(optional)</span></label>
              <div className="flex gap-4">
                {['Yes','No'].map(o => (
                  <label key={o} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name={`client-${entry.id}`} value={o} className="accent-blue-500" />
                    <span className="text-sm text-gray-700">{o}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function EmploymentSection({ onCompletionChange }) {
  const [entries, setEntries] = useState([{ id: Date.now(), expanded: true, employer_name: '' }])

  useEffect(() => {
    const complete = entries.length > 0 && entries.every(e => (e.employer_name || '').trim() !== '')
    onCompletionChange?.(complete)
  }, [entries])

  function addEntry() {
    setEntries(prev => [...prev, { id: Date.now(), expanded: true, employer_name: '' }])
  }

  function updateEntry(id, field, value) {
    setEntries(prev => prev.map(e => e.id === id ? { ...e, [field]: value } : e))
  }

  function removeEntry(id) {
    setEntries(prev => prev.filter(e => e.id !== id))
  }

  return (
    <div className="space-y-3">
      <button
        onClick={addEntry}
        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-dashed border-gray-300 text-sm font-medium text-gray-500 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50/30 transition-colors"
      >
        <Plus size={14} /> Add employer
      </button>
      {entries.map((entry, i) => (
        <EmployerEntry
          key={entry.id}
          entry={entry}
          index={i}
          onUpdate={updateEntry}
          onRemove={removeEntry}
        />
      ))}
    </div>
  )
}

function InstitutionRow({ entry, index, entryType, docType, onUpdate, onRemove }) {
  const [open, setOpen] = useState(true)
  const inp = "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 bg-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 placeholder-gray-300"
  const sel = "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"

  return (
    <div className="space-y-4">
      {/* Row label + toggle + delete */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setOpen(o => !o)}
          className="flex items-center gap-1.5 text-left group"
        >
          {open
            ? <ChevronDown size={13} className="text-gray-400 flex-shrink-0" />
            : <ChevronRight size={13} className="text-gray-400 flex-shrink-0" />}
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Institution {index + 1}
          </span>
          {!open && entry.institution && (
            <span className="text-xs font-medium text-gray-600 normal-case">· {entry.institution}</span>
          )}
          {!open && entry.file && (
            <span className="flex items-center gap-1 text-[10px] font-medium text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full normal-case">
              <CheckCircle2 size={9} /> {docType}
            </span>
          )}
        </button>
        <button
          onClick={() => onRemove(entry.id)}
          className="flex items-center gap-1 text-[11px] text-gray-400 hover:text-red-500 transition-colors"
          aria-label="Remove institution"
        >
          <Trash2 size={12} /> Remove
        </button>
      </div>

      {/* Collapsible body */}
      {open && (
        <div className="space-y-4">
          {/* Upload */}
          {entry.file ? (
            <div className="flex items-center gap-3 px-4 py-2.5 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle2 size={14} className="text-green-500 flex-shrink-0" />
              <span className="text-xs text-green-700 flex-1 truncate font-medium">{entry.file.name}</span>
              <button
                onClick={() => onUpdate(entry.id, 'file', null)}
                className="text-green-400 hover:text-red-500 transition-colors"
                aria-label="Remove file"
              >
                <X size={12} />
              </button>
            </div>
          ) : (
            <label className="flex items-center gap-3 px-4 py-3 border border-dashed border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 hover:bg-blue-50/30 transition-colors">
              <Upload size={14} className="text-gray-300 flex-shrink-0" />
              <span className="text-xs text-gray-400">Upload {docType}</span>
              <input
                type="file"
                className="hidden"
                onChange={e => onUpdate(entry.id, 'file', e.target.files?.[0] ?? null)}
              />
            </label>
          )}

          {/* Fields */}
          <div className="grid grid-cols-2 gap-x-5 gap-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Taxpayer / Spouse / Joint</label>
              <select className={sel} defaultValue="" onChange={e => onUpdate(entry.id, 'owner', e.target.value)}>
                <option value="" disabled>Select…</option>
                {['Taxpayer', 'Spouse', 'Joint'].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                Institution name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Chase Bank"
                className={inp}
                value={entry.institution || ''}
                onChange={e => onUpdate(entry.id, 'institution', e.target.value)}
              />
            </div>

            {entryType === 'interest' ? (
              <div className="col-span-2">
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Interest income received (USD)</label>
                <input type="text" placeholder="$0.00" className={inp}
                  onChange={e => onUpdate(entry.id, 'interest_income', e.target.value)} />
              </div>
            ) : entryType === 'stocks' ? (
              <>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Proceeds (USD)</label>
                  <input type="text" placeholder="$0.00" className={inp}
                    onChange={e => onUpdate(entry.id, 'proceeds', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Cost basis (USD)</label>
                  <input type="text" placeholder="$0.00" className={inp}
                    onChange={e => onUpdate(entry.id, 'cost_basis', e.target.value)} />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Ordinary dividends (USD)</label>
                  <input type="text" placeholder="$0.00" className={inp}
                    onChange={e => onUpdate(entry.id, 'ordinary', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Qualified dividends (USD)</label>
                  <input type="text" placeholder="$0.00" className={inp}
                    onChange={e => onUpdate(entry.id, 'qualified', e.target.value)} />
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function IntDivQuestionRow({ label, qid, answer, onChange }) {
  return (
    <div className="flex items-center justify-between gap-6 px-5 py-4">
      <span className="text-sm text-gray-700 flex-1">{label}</span>
      <div className="flex gap-5 flex-shrink-0">
        {['Yes', 'No'].map(o => (
          <label key={o} className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name={qid} value={o} checked={answer === o}
              onChange={() => onChange(o)} className="accent-blue-500" />
            <span className="text-sm text-gray-700">{o}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

function InstitutionList({ entries, entryType, docType, onAdd, onUpdate, onRemove }) {
  return (
    <div className="px-5 pb-6 pt-4 space-y-6">
      {/* Section header */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-700">Institutions</span>
        <button
          onClick={onAdd}
          className="flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors"
        >
          <Plus size={12} /> Add institution
        </button>
      </div>
      {entries.map((entry, i) => (
        <div key={entry.id}>
          {i > 0 && <div className="border-t border-gray-100 mb-6" />}
          <InstitutionRow
            entry={entry}
            index={i}
            entryType={entryType}
            docType={docType}
            onUpdate={onUpdate}
            onRemove={onRemove}
          />
        </div>
      ))}
    </div>
  )
}

function InterestDividendsSection({ onCompletionChange }) {
  const [answers, setAnswers] = useState({ interest: null, spouse_interest: null, dividends: null })

  const blankInterest  = () => ({ id: Date.now(), file: null, institution: '', owner: '', interest_income: '' })
  const blankDividends = () => ({ id: Date.now(), file: null, institution: '', owner: '', ordinary: '', qualified: '' })

  const [interestEntries,  setInterestEntries]  = useState([blankInterest()])
  const [dividendEntries,  setDividendEntries]  = useState([blankDividends()])

  const showInterest  = answers.interest === 'Yes' || answers.spouse_interest === 'Yes'
  const showDividends = answers.dividends === 'Yes'

  useEffect(() => {
    const allAnswered = answers.interest !== null && answers.spouse_interest !== null && answers.dividends !== null
    const interestOk = !showInterest || interestEntries.some(e => (e.institution || '').trim() !== '')
    const dividendsOk = !showDividends || dividendEntries.some(e => (e.institution || '').trim() !== '')
    onCompletionChange?.(allAnswered && interestOk && dividendsOk)
  }, [answers, interestEntries, dividendEntries])

  function makeUpdater(setter) {
    return (id, field, value) => setter(prev => prev.map(e => e.id === id ? { ...e, [field]: value } : e))
  }
  function makeRemover(setter) {
    return id => setter(prev => prev.filter(e => e.id !== id))
  }

  return (
    <div className="space-y-4">

      {/* Interest block — two questions, one shared institution list */}
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <IntDivQuestionRow
          label="Interest income received from US financial/non-financial institutions?"
          qid="interest"
          answer={answers.interest}
          onChange={v => setAnswers(prev => ({ ...prev, interest: v }))}
        />
        <div className="border-t border-gray-100" />
        <IntDivQuestionRow
          label="Spouse interest income received from US financial/non-financial institutions?"
          qid="spouse_interest"
          answer={answers.spouse_interest}
          onChange={v => setAnswers(prev => ({ ...prev, spouse_interest: v }))}
        />
        {showInterest && (
          <div className="border-t border-gray-200">
            <InstitutionList
              entries={interestEntries}
              entryType="interest"
              docType="1099-INT"
              onAdd={() => setInterestEntries(prev => [...prev, blankInterest()])}
              onUpdate={makeUpdater(setInterestEntries)}
              onRemove={makeRemover(setInterestEntries)}
            />
          </div>
        )}
      </div>

      {/* Dividends block */}
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <IntDivQuestionRow
          label="Dividends received from US financial/non-financial institutions?"
          qid="dividends"
          answer={answers.dividends}
          onChange={v => setAnswers(prev => ({ ...prev, dividends: v }))}
        />
        {showDividends && (
          <div className="border-t border-gray-200">
            <InstitutionList
              entries={dividendEntries}
              entryType="dividends"
              docType="1099-DIV"
              onAdd={() => setDividendEntries(prev => [...prev, blankDividends()])}
              onUpdate={makeUpdater(setDividendEntries)}
              onRemove={makeRemover(setDividendEntries)}
            />
          </div>
        )}
      </div>

    </div>
  )
}

const SALE_ASSET_GROUPS = [
  {
    id: 'stocks', label: 'Sale of Stocks',
    docType: '1099-B',
    questions: [
      { id: 'has_stocks',       label: 'At any time during 2025 did you or your spouse receive, sell, send, exchange or otherwise acquire any financial interest in Stocks?', showInstitutions: true },
      { id: 'has_stock_option', label: 'Did you or your spouse participate in a Stock option plan from your employer?',                                                       showInstitutions: false },
    ],
  },
  {
    id: 'crypto', label: 'Crypto Currencies',
    docType: 'Crypto Report',
    note: 'Download the Crypto Instructions by clicking',
    questions: [
      { id: 'has_crypto', label: 'At any time during 2025, did you/your spouse receive, sell, send, exchange or otherwise acquire any financial interest in any virtual currency?', showInstitutions: true },
    ],
  },
  {
    id: 'property', label: 'Sale of Property',
    docType: 'Settlement Statement',
    note: 'Download the Instructions by clicking',
    questions: [
      { id: 'has_property', label: 'At any time during 2025, did you or your spouse sell any property?', showInstitutions: true },
    ],
  },
  {
    id: 'options', label: 'Options & Currencies',
    docType: '1099-B',
    questions: [
      { id: 'has_options', label: 'At any time during 2025, did you or your spouse trade in currencies?', showInstitutions: true },
    ],
  },
]

function SaleOfAssetsSection({ onCompletionChange }) {
  const [openGroups, setOpenGroups] = useState(['stocks'])
  const [answers, setAnswers] = useState({})

  const blankEntry = () => ({ id: Date.now() + Math.random(), file: null, institution: '', owner: '', proceeds: '', cost_basis: '' })
  const [groupEntries, setGroupEntries] = useState({
    stocks: [blankEntry()], crypto: [blankEntry()], property: [blankEntry()], options: [blankEntry()],
  })

  useEffect(() => {
    const complete = SALE_ASSET_GROUPS.every(group =>
      group.questions.every(q => {
        if (!answers[q.id]) return false
        if (q.showInstitutions && answers[q.id] === 'Yes') {
          return groupEntries[group.id].some(e => (e.institution || '').trim() !== '')
        }
        return true
      })
    )
    onCompletionChange?.(complete)
  }, [answers, groupEntries])

  function toggleGroup(id) {
    setOpenGroups(prev => prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id])
  }
  function setAnswer(key, val) { setAnswers(prev => ({ ...prev, [key]: val })) }
  function addEntry(gid)       { setGroupEntries(prev => ({ ...prev, [gid]: [...prev[gid], blankEntry()] })) }
  function updateEntry(gid, id, field, val) {
    setGroupEntries(prev => ({ ...prev, [gid]: prev[gid].map(e => e.id === id ? { ...e, [field]: val } : e) }))
  }
  function removeEntry(gid, id) {
    setGroupEntries(prev => ({ ...prev, [gid]: prev[gid].filter(e => e.id !== id) }))
  }

  return (
    <div className="space-y-3">
      {SALE_ASSET_GROUPS.map(group => {
        const isOpen = openGroups.includes(group.id)

        return (
          <div key={group.id} className="border border-gray-200 rounded-xl overflow-hidden">
            <button
              onClick={() => toggleGroup(group.id)}
              className="w-full flex items-center justify-between px-5 py-4 bg-white hover:bg-gray-50 transition-colors text-left"
            >
              <span className="text-sm font-semibold text-gray-800">{group.label}</span>
              {isOpen
                ? <ChevronDown size={15} className="text-gray-400 flex-shrink-0" />
                : <ChevronRight size={15} className="text-gray-400 flex-shrink-0" />}
            </button>

            {isOpen && (
              <div className="border-t border-gray-100 px-5 py-5">
                {/* All questions as plain rows — Option C for every group */}
                {group.questions.map((q, qi) => (
                  <div key={q.id}>
                    {qi > 0 && <div className="border-t border-gray-100" />}

                    <div className="flex items-start justify-between gap-6 py-3">
                      <span className="text-sm text-gray-700 flex-1 leading-relaxed">{q.label}</span>
                      <div className="flex gap-5 flex-shrink-0 pt-0.5">
                        {['Yes', 'No'].map(o => (
                          <label key={o} className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name={q.id} value={o}
                              checked={answers[q.id] === o}
                              onChange={() => setAnswer(q.id, o)}
                              className="accent-blue-500" />
                            <span className="text-sm text-gray-700">{o}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Institution list with left accent — only for questions flagged showInstitutions */}
                    {q.showInstitutions && answers[q.id] === 'Yes' && (
                      <div className="ml-1 pl-4 border-l-2 border-blue-200 mb-2">
                        <InstitutionList
                          entries={groupEntries[group.id]}
                          entryType="stocks"
                          docType={group.docType}
                          onAdd={() => addEntry(group.id)}
                          onUpdate={(id, field, val) => updateEntry(group.id, id, field, val)}
                          onRemove={id => removeEntry(group.id, id)}
                        />
                      </div>
                    )}
                  </div>
                ))}

                {/* Optional instruction note */}
                {group.note && (
                  <p className="text-xs text-gray-500 pt-2">
                    {group.note}{' '}
                    <button className="text-blue-500 underline hover:text-blue-600">here</button>.
                  </p>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

function ContentToggle({ enabled, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={`relative inline-flex h-6 w-11 rounded-full flex-shrink-0 transition-colors duration-200 ${
        enabled ? 'bg-blue-500' : 'bg-gray-200'
      }`}
    >
      <span className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-transform duration-200 ${
        enabled ? 'translate-x-6' : 'translate-x-1'
      }`} />
    </button>
  )
}

function FormSection({ sub, isEnabled = true, onToggle, onCompletionChange, fieldValues = {}, onFieldChange, comments = [], onResolveComment, readOnly = false }) {
  if (!sub) return null

  const [openGroups, setOpenGroups] = useState(() =>
    sub.groups ? [sub.groups[0]?.id] : []
  )
  const [openCardId, setOpenCardId] = useState(null)
  const [indicatorPositions, setIndicatorPositions] = useState([])

  const formRef = useRef(null)
  const fieldRefs = useRef({})
  const prevPositionsRef = useRef([])

  // All comments for this section (resolved + unresolved)
  const sectionComments = comments.filter(c => c.subId === sub.id)
  const commentsByFieldId = Object.fromEntries(sectionComments.map(c => [c.fieldId, c]))

  // Carousel: which comment is currently shown in the open card
  const openIndex = sectionComments.findIndex(c => c.id === openCardId)

  function goToComment(idx) {
    const wrapped = ((idx % sectionComments.length) + sectionComments.length) % sectionComments.length
    setOpenCardId(sectionComments[wrapped].id)
  }

  function setFieldRef(fieldId, el) {
    if (el) fieldRefs.current[fieldId] = el
  }

  function toggleGroup(id) {
    setOpenGroups(prev =>
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    )
  }

  // Recompute indicator positions — uses offsetTop for scroll-stable alignment
  useLayoutEffect(() => {
    if (!formRef.current) {
      if (indicatorPositions.length) setIndicatorPositions([])
      return
    }
    const formEl = formRef.current

    // Determine whether card fits to the right of the indicator
    const formRect = formEl.getBoundingClientRect()
    const indicatorRight = formRect.left + formEl.offsetWidth + 16 + 28 // gap + chip width
    const cardSide = (window.innerWidth - indicatorRight) >= 250 ? 'right' : 'left'

    const newPos = sectionComments
      .map(c => {
        const el = fieldRefs.current[c.fieldId]
        if (!el) return null
        // offsetTop is relative to offsetParent (formEl, since it's position:relative)
        const top = el.offsetTop + el.offsetHeight / 2
        // Store only id/top/cardSide — comment data is looked up live at render time
        return { id: c.id, top, cardSide }
      })
      .filter(Boolean)

    const changed =
      newPos.length !== prevPositionsRef.current.length ||
      newPos.some((p, i) => Math.abs(p.top - (prevPositionsRef.current[i]?.top ?? -9999)) > 1) ||
      (newPos[0]?.cardSide !== prevPositionsRef.current[0]?.cardSide)

    if (changed) {
      prevPositionsRef.current = newPos
      setIndicatorPositions(newPos)
    }
  })

  // Close open card when clicking outside
  useEffect(() => {
    if (!openCardId) return
    function handleClick(e) {
      if (!e.target.closest('[data-comment-ui]')) setOpenCardId(null)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [openCardId])

  return (
    <div ref={formRef} className="relative max-w-2xl mx-auto px-8 py-8">
      {/* Form content — disabled in read-only mode */}
      <div className={readOnly ? 'pointer-events-none select-none' : ''}>
      {/* Title row — toggle always here */}
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-xl font-bold text-gray-900">{sub.label}</h2>
        {onToggle && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">{isEnabled ? 'Included' : 'Not included'}</span>
            <ContentToggle enabled={isEnabled} onToggle={onToggle} />
          </div>
        )}
      </div>

      {isEnabled ? (
        <>
          <p className="text-sm text-gray-400 mb-7">Fill in the details below. Required fields are marked with an asterisk.</p>
          {sub.id === 'employment' ? (
            <EmploymentSection onCompletionChange={onCompletionChange} />
          ) : sub.id === 'interest_dividends' ? (
            <InterestDividendsSection onCompletionChange={onCompletionChange} />
          ) : sub.id === 'sale_assets' ? (
            <SaleOfAssetsSection onCompletionChange={onCompletionChange} />
          ) : sub.groups ? (
            <div className="space-y-3">
              {sub.groups.map(group => (
                <AccordionGroup
                  key={group.id}
                  group={group}
                  isOpen={openGroups.includes(group.id)}
                  onToggle={() => toggleGroup(group.id)}
                  fieldValues={fieldValues}
                  onFieldChange={onFieldChange}
                  commentsByFieldId={commentsByFieldId}
                  onFieldRef={setFieldRef}
                />
              ))}
            </div>
          ) : (
            <FieldGrid
              fields={sub.fields || []}
              fieldValues={fieldValues}
              onFieldChange={onFieldChange}
              commentsByFieldId={commentsByFieldId}
              onFieldRef={setFieldRef}
            />
          )}
        </>
      ) : (
        <>
          <p className="text-sm text-gray-400 mb-6">This income type is not included in your filing.</p>
          <div className="flex items-start gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-4">
            <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Circle size={14} className="text-gray-300" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-0.5">Not part of your filing</p>
              <p className="text-xs text-gray-400 leading-relaxed">
                If you had {sub.label.toLowerCase()} in 2025, toggle it on above to include it and fill in the details. Your advisor will review it before submission.
              </p>
            </div>
          </div>
        </>
      )}

      </div>{/* end pointer-events-none wrapper */}

      {/* ── Comment indicators layer — always interactive ── */}
      {indicatorPositions.map(({ id, top, cardSide }) => {
        const comment = sectionComments.find(c => c.id === id)
        if (!comment) return null
        const isOpen = openCardId === id || (openCardId && openIndex >= 0 && sectionComments[openIndex]?.id === id)
        const showCard = openCardId === id

        return (
          <div
            key={id}
            data-comment-ui
            style={{ position: 'absolute', top: `${top}px`, left: 'calc(100% + 16px)', transform: 'translateY(-50%)', zIndex: 20 }}
          >
            <CommentIndicator
              comment={comment}
              isOpen={isOpen}
              onClick={() => setOpenCardId(prev => prev === id ? null : id)}
            />

            {showCard && (
              <div
                data-comment-ui
                className="absolute"
                style={
                  cardSide === 'right'
                    ? { left: 'calc(100% + 8px)', top: 0 }
                    : { right: 'calc(100% + 8px)', top: 0 }
                }
              >
                <CommentCard
                  comment={comment}
                  currentIndex={openIndex + 1}
                  total={sectionComments.length}
                  onPrev={() => goToComment(openIndex - 1)}
                  onNext={() => goToComment(openIndex + 1)}
                  onResolve={() => { onResolveComment?.(comment.id) }}
                  readOnly={readOnly}
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

// ─── Expert comment data ────────────────────────────────────────────────────

const MOCK_COMMENTS = [
  // contact sub-section
  {
    id: 'c1', subId: 'contact', fieldId: 'email',
    expert: { name: 'Priya Nair', initials: 'PN' },
    text: "Use the email linked to your IRS account — this is where we'll send filing confirmations.",
    timestamp: '3h ago', resolved: false,
  },
  {
    id: 'c2', subId: 'contact', fieldId: 'phone',
    expert: { name: 'Priya Nair', initials: 'PN' },
    text: 'Please include the country code for international numbers (e.g. +1 for US).',
    timestamp: '2h ago', resolved: false,
  },
  // general — personal info (text, date, yesno fields)
  {
    id: 'c3', subId: 'general', fieldId: 'first_name',
    expert: { name: 'Priya Nair', initials: 'PN' },
    text: 'Enter your name exactly as it appears on your passport or government-issued ID.',
    timestamp: '2h ago', resolved: false,
  },
  {
    id: 'c4', subId: 'general', fieldId: 'dob',
    expert: { name: 'Priya Nair', initials: 'PN' },
    text: 'Double-check the year — the date must match your SSN records exactly.',
    timestamp: '1h ago', resolved: false,
  },
  {
    id: 'c5', subId: 'general', fieldId: 'us_citizen',
    expert: { name: 'Priya Nair', initials: 'PN' },
    text: 'Answer based on your status as of Dec 31, 2025 — not your current status.',
    timestamp: '55m ago', resolved: false,
  },
  {
    id: 'c6', subId: 'general', fieldId: 'ssn_itin',
    expert: { name: 'Priya Nair', initials: 'PN' },
    text: 'The number you provided earlier had a digit mismatch. Please re-enter carefully.',
    timestamp: '45m ago', resolved: true,
  },
  // general — visa & occupation (select, yesno fields)
  {
    id: 'c7', subId: 'general', fieldId: 'visa_type',
    expert: { name: 'Priya Nair', initials: 'PN' },
    text: 'Select the visa type that was on your passport on December 31, 2025.',
    timestamp: '40m ago', resolved: false,
  },
  {
    id: 'c8', subId: 'general', fieldId: 'has_ead',
    expert: { name: 'Priya Nair', initials: 'PN' },
    text: 'If your EAD expired before Dec 31, select No even if you have a pending renewal.',
    timestamp: '30m ago', resolved: false,
  },
  // general — residential (select, text fields)
  {
    id: 'c9', subId: 'general', fieldId: 'current_country',
    expert: { name: 'Priya Nair', initials: 'PN' },
    text: 'Select the country you were physically located in on Dec 31, 2025.',
    timestamp: '20m ago', resolved: false,
  },
  {
    id: 'c10', subId: 'general', fieldId: 'mailing_same',
    expert: { name: 'Priya Nair', initials: 'PN' },
    text: 'If you use a PO Box or different mailing address, select No and fill in the details.',
    timestamp: '15m ago', resolved: false,
  },
  // household sub-section (radio, date fields)
  {
    id: 'c11', subId: 'household', fieldId: 'marital_status',
    expert: { name: 'Priya Nair', initials: 'PN' },
    text: 'Select based on your legal status on Dec 31, 2025 — not the start of the year.',
    timestamp: '10m ago', resolved: false,
  },
  {
    id: 'c12', subId: 'household', fieldId: 'spouse_dob',
    expert: { name: 'Priya Nair', initials: 'PN' },
    text: 'Spouse date of birth is required for joint filing — check their passport if unsure.',
    timestamp: '5m ago', resolved: false,
  },
]

// ─── CommentIndicator ────────────────────────────────────────────────────────

function CommentIndicator({ comment, isOpen, onClick }) {
  return (
    <button
      onClick={onClick}
      title={comment.resolved ? `${comment.expert.name} · Resolved` : comment.expert.name}
      className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0 transition-all duration-150 ${
        comment.resolved
          ? 'bg-gray-300 opacity-50 hover:opacity-75'
          : isOpen
            ? 'bg-amber-500 ring-2 ring-amber-300 ring-offset-1 scale-110'
            : 'bg-amber-400 hover:bg-amber-500 hover:scale-105'
      }`}
    >
      {comment.expert.initials}
    </button>
  )
}

// ─── CommentCard ─────────────────────────────────────────────────────────────

function CommentCard({ comment, currentIndex, total, onPrev, onNext, onResolve, readOnly = false }) {
  return (
    <div className="w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className={`flex items-center gap-2 px-3 py-2.5 border-b ${comment.resolved ? 'bg-gray-50 border-gray-100' : 'bg-amber-50 border-amber-100'}`}>
        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0 ${comment.resolved ? 'bg-gray-400' : 'bg-amber-400'}`}>
          {comment.expert.initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-gray-800 truncate">{comment.expert.name}</p>
          <p className="text-[10px] text-gray-400">{comment.timestamp}</p>
        </div>
        {/* Carousel navigation */}
        {total > 1 && (
          <div className="flex items-center gap-0.5 flex-shrink-0">
            <button
              onClick={onPrev}
              className="w-5 h-5 flex items-center justify-center rounded hover:bg-black/5 transition-colors"
            >
              <ChevronLeft size={11} className="text-gray-500" />
            </button>
            <span className="text-[10px] font-semibold text-gray-500 tabular-nums">{currentIndex}/{total}</span>
            <button
              onClick={onNext}
              className="w-5 h-5 flex items-center justify-center rounded hover:bg-black/5 transition-colors"
            >
              <ChevronRight size={11} className="text-gray-500" />
            </button>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="px-3 py-2.5">
        <p className={`text-xs leading-relaxed ${comment.resolved ? 'text-gray-400' : 'text-gray-700'}`}>
          {comment.text}
        </p>
      </div>

      {/* Action — resolve CTA hidden in read-only; resolved state always shown */}
      {(comment.resolved || !readOnly) && (
        <div className="px-3 pb-3">
          {comment.resolved ? (
            <div className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-gray-50 text-gray-400 text-xs font-medium border border-gray-200">
              <CheckCircle2 size={11} /> Resolved
            </div>
          ) : (
            <button
              onClick={onResolve}
              className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-amber-50 text-amber-700 text-xs font-semibold hover:bg-amber-100 transition-colors border border-amber-200"
            >
              <CheckCircle2 size={11} /> Mark as resolved
            </button>
          )}
        </div>
      )}
    </div>
  )
}

// ─── DiscardModal ─────────────────────────────────────────────────────────────

function DiscardModal({ onSaveAndExit, onExitWithoutSaving, onCancel }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden">
        <div className="px-6 pt-6 pb-5">
          <h3 className="text-base font-semibold text-gray-900 mb-1">Discard changes?</h3>
          <p className="text-sm text-gray-500 leading-relaxed">
            You have unsaved changes. If you leave now they will be permanently lost.
          </p>
        </div>
        <div className="flex flex-col gap-2 px-6 pb-6">
          <button
            onClick={onSaveAndExit}
            className="w-full px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            Save and exit
          </button>
          <button
            onClick={onExitWithoutSaving}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            Exit without saving
          </button>
          <button
            onClick={onCancel}
            className="w-full px-4 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-100 transition-colors"
          >
            Continue editing
          </button>
        </div>
      </div>
    </div>
  )
}

export default function FilingFormShell({ onClose, initialSubId, initialSubStates = {}, initialFieldValues = {}, onSave, readOnly = false }) {
  const allSubs = NAV_SECTIONS.flatMap(s =>
    s.sub.length ? s.sub : [{ id: s.id, label: s.label, state: s.state, fields: [] }]
  )

  const [activeSubId, setActiveSubId] = useState(() => {
    if (initialSubId && allSubs.find(s => s.id === initialSubId)) return initialSubId
    const firstActive = allSubs.find(s => s.state === 'active')
    return firstActive?.id ?? allSubs[0]?.id
  })
  const [showDiscard, setShowDiscard] = useState(false)
  const [enabledSubs, setEnabledSubs] = useState(new Set())
  const [comments, setComments] = useState(MOCK_COMMENTS)

  function resolveComment(id) {
    setComments(prev => prev.map(c => c.id === id ? { ...c, resolved: true } : c))
  }

  const unresolvedBySubId = comments.reduce((acc, c) => {
    if (!c.resolved) acc[c.subId] = (acc[c.subId] || 0) + 1
    return acc
  }, {})

  const [subStates, setSubStates] = useState(() => {
    const initial = initialSubId && allSubs.find(s => s.id === initialSubId)
      ? initialSubId
      : (allSubs.find(s => s.state === 'active')?.id ?? allSubs[0]?.id)
    const base = { ...initialSubStates }
    if (!base[initial] || base[initial] === 'not_started') base[initial] = 'in_progress'
    return base
  })

  // Tracks whether the currently-active section's fields satisfy completion criteria
  const [sectionComplete, setSectionComplete] = useState({})

  // Field values for generic (FieldGrid / AccordionGroup) sections, keyed by subId
  // so values persist when navigating between sections
  const [allFieldValues, setAllFieldValues] = useState(initialFieldValues)

  function handleFieldChange(fieldId, value) {
    setAllFieldValues(prev => ({
      ...prev,
      [activeSubId]: { ...(prev[activeSubId] || {}), [fieldId]: value },
    }))
  }

  // Compute the subStates that would result after marking the current section complete,
  // then fire onSave and close. Used for intentional saves — NOT for "exit without saving".
  function saveAndExit() {
    const finalSubStates = isCurrentSectionComplete()
      ? { ...subStates, [activeSubId]: 'complete' }
      : subStates
    onSave?.(finalSubStates, allFieldValues)
    onClose()
  }

  function navigateTo(subId) {
    if (subId === activeSubId) return
    markCurrentComplete()
    setActiveSubId(subId)
    setSubStates(prev => ({
      ...prev,
      [subId]: prev[subId] === 'complete' ? 'complete' : 'in_progress',
    }))
  }

  // Called by custom section components whenever their internal state changes
  function handleCompletionChange(isComplete) {
    setSectionComplete(prev => {
      if (prev[activeSubId] === isComplete) return prev
      return { ...prev, [activeSubId]: isComplete }
    })
    // If a completed section becomes incomplete again, revert its badge immediately
    if (!isComplete) {
      setSubStates(prev =>
        prev[activeSubId] === 'complete' ? { ...prev, [activeSubId]: 'in_progress' } : prev
      )
    }
  }

  // Generic (FieldGrid / AccordionGroup) sections have uncontrolled inputs so we
  // can't introspect their values; treat them as always complete on Continue/Save.
  function isCurrentSectionComplete() {
    const id = activeSubId
    if (id in sectionComplete) return sectionComplete[id]
    return true // generic sections
  }

  function markCurrentComplete() {
    if (isCurrentSectionComplete()) {
      setSubStates(prev => ({ ...prev, [activeSubId]: 'complete' }))
    }
  }

  // Derive completion for generic (FieldGrid / AccordionGroup) sections from field values
  useEffect(() => {
    const CUSTOM = ['employment', 'interest_dividends', 'sale_assets']
    if (!activeSub || CUSTOM.includes(activeSubId)) return

    const allFields = activeSub.groups
      ? activeSub.groups.flatMap(g => g.fields || [])
      : (activeSub.fields || [])
    const required = allFields.filter(f => f.required && f.type !== 'note')

    const values = allFieldValues[activeSubId] || {}
    const complete = required.length === 0 ||
      required.every(f => { const v = values[f.id]; return v !== undefined && v !== '' && v !== null })

    setSectionComplete(prev => prev[activeSubId] === complete ? prev : { ...prev, [activeSubId]: complete })
    if (!complete) {
      setSubStates(prev =>
        prev[activeSubId] === 'complete' ? { ...prev, [activeSubId]: 'in_progress' } : prev
      )
    }
  }, [allFieldValues[activeSubId], activeSubId])

  const incomeSubIds = new Set(
    NAV_SECTIONS.find(s => s.id === INCOME_SECTION_ID)?.sub.map(s => s.id) ?? []
  )

  function toggleSub(subId) {
    setEnabledSubs(prev => {
      const next = new Set(prev)
      if (next.has(subId)) next.delete(subId)
      else next.add(subId)
      return next
    })
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const currentIdx = allSubs.findIndex(s => s.id === activeSubId)
  const activeSub = allSubs[currentIdx]
  const hasPrev = currentIdx > 0
  const hasNext = currentIdx < allSubs.length - 1

  return (
    <>
    <div className="fixed inset-0 z-50 bg-white flex flex-col">

      {/* Header */}
      <div className="flex items-center justify-between px-6 h-14 border-b border-gray-200 bg-white flex-shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-900">{TICKET.service}</span>
            {readOnly ? (
              <span className="text-[11px] text-gray-500 font-medium bg-gray-100 px-2 py-0.5 rounded-full">
                Submitted · View only
              </span>
            ) : (
              <span className="flex items-center gap-1 text-[11px] text-green-600 font-medium">
                <CheckCircle2 size={11} /> All changes saved
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-[11px] text-gray-400 font-medium">{TICKET.id}</span>
            <span className="text-gray-300 text-[11px]">·</span>
            <span className="text-[11px] text-gray-400">{TICKET.year}</span>
          </div>
        </div>
        <button
          onClick={() => readOnly ? onClose() : setShowDiscard(true)}
          className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <X size={16} />
        </button>
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className={`border-r border-gray-100 overflow-y-auto scrollbar-hide bg-gray-50/50 ${readOnly ? 'pointer-events-none' : ''}`}>
          <SidebarNav
            activeSubId={activeSubId}
            onSelect={navigateTo}
            enabledSubs={enabledSubs}
            onToggleSub={toggleSub}
            subStates={subStates}
            unresolvedBySubId={unresolvedBySubId}
          />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto scrollbar-hide bg-[#fafafa]">
          <FormSection
            sub={activeSub}
            isEnabled={!incomeSubIds.has(activeSubId) || enabledSubs.has(activeSubId)}
            onToggle={incomeSubIds.has(activeSubId) ? () => toggleSub(activeSubId) : null}
            onCompletionChange={handleCompletionChange}
            fieldValues={allFieldValues[activeSubId] || {}}
            onFieldChange={handleFieldChange}
            comments={comments}
            onResolveComment={resolveComment}
            readOnly={readOnly}
          />
        </div>
      </div>

      {/* Footer */}
      <div className={`flex items-center px-6 py-4 border-t border-gray-200 bg-white flex-shrink-0 ${readOnly ? 'justify-end' : 'justify-between'}`}>
        {readOnly ? (
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
          >
            Close
          </button>
        ) : (
          <>
            <button
              onClick={saveAndExit}
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
            >
              Save and exit
            </button>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => hasPrev && navigateTo(allSubs[currentIdx - 1].id)}
                disabled={!hasPrev}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                  hasPrev
                    ? 'border-gray-200 text-gray-700 hover:bg-gray-50'
                    : 'border-gray-100 text-gray-300 cursor-not-allowed'
                }`}
              >
                <ArrowLeft size={14} /> Back
              </button>
              <button
                onClick={() => { if (hasNext) { markCurrentComplete(); navigateTo(allSubs[currentIdx + 1].id) } }}
                disabled={!hasNext}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  hasNext
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                Save and continue <ArrowRight size={14} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>

    {showDiscard && (
      <DiscardModal
        onSaveAndExit={saveAndExit}
        onExitWithoutSaving={onClose}
        onCancel={() => setShowDiscard(false)}
      />
    )}
    </>
  )
}
