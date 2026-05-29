import { useState, useMemo } from 'react'
import { useSearchParams, useLocation } from 'react-router-dom'
import { X, Send, Download, FileCheck, LayoutList, ListChecks, MessageCircle, Calendar, Sparkles, ClipboardList, AlignLeft, Layers, Activity, Moon } from 'lucide-react'
import FilingFormShell from '../components/FilingFormShell'
import FloatingConceptPanel from '../components/FloatingConceptPanel'
import DefaultLayout from '../layouts/DefaultLayout'
import ChecklistLayout from '../layouts/ChecklistLayout'
import InterviewLayout from '../layouts/InterviewLayout'
import StandupLayout from '../layouts/StandupLayout'
import ConciergeLayout from '../layouts/ConciergeLayout'
import InboxLayout from '../layouts/InboxLayout'
import MorningBriefLayout from '../layouts/MorningBriefLayout'
import StudioLayout from '../layouts/StudioLayout'
import StatusLayout from '../layouts/StatusLayout'
import QuietRoomLayout from '../layouts/QuietRoomLayout'
import { SECTION_SUB_IDS, PROFILE_SUB_IDS, SECTION_ROWS, CHAT_MESSAGES, DRAFTS } from '../data/ticketData'
import { buildSectionList } from '../utils/inferProfile'

const RETURNING_USER_PROFILE_VALUES = {
  contact: { email: 'surajit.ray@technovausa.com', phone: '+1 (917) 555-0142', phone_day: '+1 (917) 555-0142' },
  general: {
    first_name: 'Surajit', last_name: 'Ray', dob: '1987-03-14',
    us_citizen: 'No', itin_apply: 'No', ssn_itin: '***-**-7291',
    citizenship: 'India', visa_type: 'H-1B', occupation: 'Software Engineer',
    has_ead: 'No', visa_status_change: 'No',
    current_country: 'United States', street_address: '84 Grove Street',
    city: 'New York', state: 'New York', zip: '10014',
    mailing_same: 'Yes', us_183_days: 'Yes',
  },
  household: { marital_status: 'Married', filing_status: 'Married Filing Jointly', spouse_first_name: 'Ananya', spouse_last_name: 'Ray', spouse_dob: '1989-07-22' },
}

const LAYOUTS = [
  { key: 'default',   icon: LayoutList,    label: 'Steps',     component: DefaultLayout   },
  { key: 'checklist', icon: ListChecks,    label: 'Checklist', component: ChecklistLayout },
  { key: 'interview', icon: MessageCircle, label: 'Interview', component: InterviewLayout, scenarios: [
    'Mid-conversation',
    'Document requested',
    'Draft reveal',
  ]},
  { key: 'standup',   icon: Calendar,      label: 'Standup',   component: StandupLayout, scenarios: [
    'Advisor working',
    'Your task',
    'Draft review day',
  ]},
  { key: 'concierge', icon: Sparkles,      label: 'Concierge', component: ConciergeLayout, scenarios: [
    'Advisor at work',
    'Your turn',
    'Handback',
  ]},
  { key: 'inbox',     icon: ClipboardList, label: 'Inbox',     component: InboxLayout, scenarios: [
    'Active inbox',
    'Item expanded',
    'Inbox zero',
  ]},
  { key: 'brief',  icon: AlignLeft, label: 'Brief',  component: MorningBriefLayout, scenarios: [
    'Priya working',
    'One thing from you',
    'Ready to review',
  ]},
  { key: 'studio', icon: Layers,   label: 'Studio', component: StudioLayout, scenarios: [
    'In production',
    'Client review',
    'Wrapping up',
  ]},
  { key: 'status', icon: Activity, label: 'Status', component: StatusLayout, scenarios: [
    'All operational',
    'Your attention',
    'Filed',
  ]},
  { key: 'quiet',  icon: Moon,     label: 'Quiet',  component: QuietRoomLayout, scenarios: [
    'Priya working',
    'One task for you',
    'Filed',
  ]},
]

export default function TicketDetailsPage() {
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const isDemoComplete  = searchParams.get('demo') === 'complete'
  const isDemoStep3    = searchParams.get('demo') === 'step3'
  const isDemoProfile  = searchParams.get('demo') === 'profile'
  const isDemoReturning = searchParams.get('demo') === 'returning'

  // Assessment state passed via router state from onboarding / dashboard flows
  const navAssessmentComplete     = location.state?.assessmentComplete     ?? false
  const navAssessmentSectionCount = location.state?.assessmentSectionCount ?? 0
  const navAssessmentAnswers      = location.state?.assessmentAnswers      ?? null
  const navIsReturningUser        = location.state?.isReturningUser        ?? false

  // Layout + scenario switcher state
  const [activeLayout, setActiveLayout] = useState(() => {
    const urlLayout = searchParams.get('layout')
    if (urlLayout && LAYOUTS.find(l => l.key === urlLayout)) return urlLayout
    return 'default'
  })
  const [activeScenario, setActiveScenario] = useState(0)

  function switchLayout(key) {
    setActiveLayout(key)
    setActiveScenario(0)
    localStorage.setItem('ao-tax-layout', key)
  }

  // User type toggle (new vs returning) — seeded from URL param or router state
  const [isReturningUser, setIsReturningUser] = useState(isDemoReturning || navIsReturningUser)

  // Assessment state (profile wizard — prerequisite to filing steps)
  const [assessmentComplete, setAssessmentComplete] = useState(isDemoComplete || isDemoStep3 || navAssessmentComplete)
  const [assessmentSectionCount, setAssessmentSectionCount] = useState(
    (isDemoComplete || isDemoStep3) ? 4 : navAssessmentComplete ? navAssessmentSectionCount : 0
  )

  // Profile state
  const [profileComplete, setProfileComplete] = useState(isDemoComplete || isDemoStep3)
  const [profileNavStyle, setProfileNavStyle] = useState('sidebar')
  const [profileOpen, setProfileOpen] = useState(false)
  const [persistedProfileSubStates, setPersistedProfileSubStates] = useState(
    (isDemoComplete || isDemoStep3 || isDemoProfile)
      ? PROFILE_SUB_IDS.reduce((a, id) => ({ ...a, [id]: 'complete' }), {})
      : {}
  )
  const [persistedProfileFieldValues, setPersistedProfileFieldValues] = useState(
    (isDemoComplete || isDemoStep3 || isDemoProfile) ? RETURNING_USER_PROFILE_VALUES : {}
  )

  // Filing step state
  const [openStep, setOpenStep] = useState(isDemoStep3 ? 4 : isDemoComplete ? 2 : 1)
  const [filingOpen, setFilingOpen] = useState(false)
  const [filingTarget, setFilingTarget] = useState(null)
  const [filingNavStyle, setFilingNavStyle] = useState('sidebar')
  const [filingSectionId, setFilingSectionId] = useState(null)
  const [filingSubmitted, setFilingSubmitted] = useState(false)
  const [filingReadOnly, setFilingReadOnly] = useState(false)
  const [historyOpen, setHistoryOpen] = useState(false)

  // Chat state
  const [chatOpen, setChatOpen] = useState(false)
  const [chatInput, setChatInput] = useState('')
  const [chatMessages, setChatMessages] = useState(CHAT_MESSAGES)

  // Docs state
  const [docsOpen, setDocsOpen] = useState(false)
  const [docsTab, setDocsTab] = useState(0)
  const [docsUploadedByMe, setDocsUploadedByMe] = useState([
    { id: 1, type: 'Health Coverage Document - Market Place - Form 1095-A', file: '478032_Form1095A_2025.pdf',      date: 'Mar 6, 2025'  },
    { id: 2, type: 'Last Year Federal and State Tax Return',                 file: '478032_TaxReturn_2024.pdf',     date: 'Mar 6, 2025'  },
    { id: 3, type: "Broker's Consolidated Statement",                        file: '478032_BrokerStatement_Q1.pdf', date: 'May 16, 2026' },
    { id: 4, type: "Broker's Consolidated Statement",                        file: '478032_BrokerStatement_Q2.pdf', date: 'May 16, 2026' },
  ])
  const [uploadType, setUploadType] = useState('')
  const [uploadPassword, setUploadPassword] = useState('')
  const [uploadFile, setUploadFile] = useState(null)

  // Draft review state
  const [draftStates, setDraftStates] = useState(
    Object.fromEntries(DRAFTS.map(d => [d.id, 'pending']))
  )
  const [draftComments, setDraftComments] = useState({})
  const [draftCommentOpen, setDraftCommentOpen] = useState({})
  const [draftsApproved, setDraftsApproved] = useState(false)
  const [paymentComplete, setPaymentComplete] = useState(false)

  // Filing form persisted state
  const allCompleteSubStates = useMemo(() =>
    Object.values(SECTION_SUB_IDS).flat().reduce((acc, id) => ({ ...acc, [id]: 'complete' }), {})
  , [])

  const [persistedSubStates, setPersistedSubStates] = useState(
    (isDemoComplete || isDemoStep3) ? allCompleteSubStates : {}
  )
  const [persistedFieldValues, setPersistedFieldValues] = useState({})

  // Handlers
  function handleAddDocument() {
    if (!uploadType || !uploadFile) return
    const now = new Date()
    const date = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    setDocsUploadedByMe(prev => [...prev, { id: prev.length + 1, type: uploadType, file: uploadFile.name, date }])
    setUploadType('')
    setUploadPassword('')
    setUploadFile(null)
  }

  function handleSendMessage() {
    const text = chatInput.trim()
    if (!text) return
    setChatMessages(prev => [...prev, { id: prev.length + 1, from: 'you', text, time: 'Just now' }])
    setChatInput('')
  }

  function handlePayNow() {
    setPaymentComplete(true)
  }

  const allDraftsApproved = DRAFTS.every(d => draftStates[d.id] === 'approved')

  function approveDraft(id) {
    setDraftStates(prev => ({ ...prev, [id]: 'approved' }))
    setDraftCommentOpen(prev => ({ ...prev, [id]: false }))
  }
  function requestChanges(id) {
    setDraftStates(prev => ({ ...prev, [id]: 'changes_requested' }))
    setDraftCommentOpen(prev => ({ ...prev, [id]: false }))
  }
  function toggleCommentBox(id) {
    setDraftCommentOpen(prev => ({ ...prev, [id]: !prev[id] }))
  }

  function openFilingReadOnly() {
    setFilingReadOnly(true)
    setFilingTarget(null)
    setFilingOpen(true)
  }

  function getStepState(stepNum) {
    if (draftsApproved) {
      if (stepNum <= 4) return 'complete'
      if (stepNum === 5) return 'active'
      return 'upcoming'
    }
    if (isDemoStep3) {
      if (stepNum <= 3) return 'complete'
      if (stepNum === 4) return 'active'
      return 'upcoming'
    }
    if (filingSubmitted) {
      if (stepNum <= 2) return 'complete'
      if (stepNum === 3) return 'active'
      return 'upcoming'
    }
    if (profileComplete) {
      if (stepNum === 1) return 'complete'
      if (stepNum === 2) return 'active'
      return 'upcoming'
    }
    return stepNum === 1 ? 'active' : 'upcoming'
  }

  function handleSubmitFiling() {
    setFilingSubmitted(true)
    setOpenStep(3)
  }

  function handleProfileSave(subStates, fieldValues) {
    setPersistedProfileSubStates(subStates)
    setPersistedProfileFieldValues(fieldValues)
    const allDone = PROFILE_SUB_IDS.every(id => subStates[id] === 'complete')
    setProfileComplete(allDone)
    if (allDone && openStep === 1) setOpenStep(2)
  }

  function openProfileFiling() {
    setProfileOpen(true)
  }

  function handleSubmitProfile() {
    setProfileComplete(true)
    if (openStep === 1) setOpenStep(2)
  }

  function handleCompleteAssessment(answers) {
    const sections = buildSectionList(answers)
    setAssessmentComplete(true)
    setAssessmentSectionCount(sections.length)
  }

  function handleToggleUserType() {
    const next = !isReturningUser
    setIsReturningUser(next)
    // Reset all assessment + profile state when switching user type
    setAssessmentComplete(false)
    setAssessmentSectionCount(0)
    setProfileComplete(false)
    setPersistedProfileSubStates({})
    setPersistedProfileFieldValues(next ? RETURNING_USER_PROFILE_VALUES : {})
    setOpenStep(1)
  }

  function handleFormSave(subStates, fieldValues) {
    setPersistedSubStates(subStates)
    setPersistedFieldValues(fieldValues)
  }

  function getSectionProgress(sectionId) {
    const subIds = SECTION_SUB_IDS[sectionId] || []
    if (!subIds.length) return 0
    const completed = subIds.filter(id => persistedSubStates[id] === 'complete').length
    return Math.round((completed / subIds.length) * 100)
  }

  function openFiling(subId = null, navStyle = 'sidebar', sectionId = null) {
    setFilingTarget(subId)
    setFilingNavStyle(navStyle)
    setFilingSectionId(sectionId)
    setFilingOpen(true)
  }

  const allSubIds = Object.values(SECTION_SUB_IDS).flat()
  const anyStarted = allSubIds.some(id => persistedSubStates[id])
  const allComplete = allSubIds.length > 0 && allSubIds.every(id => persistedSubStates[id] === 'complete')
  const sectionsStarted = SECTION_ROWS.filter(({ sectionId }) =>
    (SECTION_SUB_IDS[sectionId] || []).some(id => persistedSubStates[id])
  ).length

  const profileStarted = Object.keys(persistedProfileSubStates).length > 0
  const profilePct = Math.round(
    (Object.values(persistedProfileSubStates).filter(s => s === 'complete').length / PROFILE_SUB_IDS.length) * 100
  )

  // Shared layout props
  const layoutProps = {
    paymentComplete,
    historyOpen, setHistoryOpen,
    openFilingReadOnly,
    openStep, setOpenStep,
    getStepState,
    draftStates, draftCommentOpen, draftComments, setDraftComments,
    allDraftsApproved,
    approveDraft, requestChanges, toggleCommentBox,
    setDraftsApproved,
    filingSubmitted,
    sectionsStarted, anyStarted, allComplete,
    getSectionProgress,
    openFiling,
    handleSubmitFiling,
    handlePayNow,
    setChatOpen,
    setDocsOpen,
    // Profile / user-type props
    isReturningUser,
    profileComplete,
    profileStarted,
    profilePct,
    openProfileFiling,
    handleSubmitProfile,
    handleToggleUserType,
    persistedProfileFieldValues,
    assessmentComplete,
    assessmentSectionCount,
    initialAssessmentAnswers: navAssessmentAnswers,
    onCompleteAssessment: handleCompleteAssessment,
    profileNavStyle,
    setProfileNavStyle,
  }

  const activeLayoutDef = LAYOUTS.find(l => l.key === activeLayout) ?? LAYOUTS[0]
  const ActiveLayout = activeLayoutDef.component

  return (
    <>
      <ActiveLayout {...layoutProps} scenario={activeScenario} />

      {/* ── Floating concept panel ── (hidden for now)
      <FloatingConceptPanel
        layouts={LAYOUTS}
        activeLayout={activeLayout}
        onSwitchLayout={switchLayout}
        activeScenario={activeScenario}
        onSwitchScenario={setActiveScenario}
      /> */}

      {/* ── Floating chat panel ── */}
      {chatOpen && (
        <>
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm md:hidden z-40" onClick={() => setChatOpen(false)} />
        <div className="fixed inset-x-0 bottom-0 h-[95vh] md:inset-x-auto md:right-6 md:top-20 md:bottom-6 md:h-auto md:w-[460px] bg-white rounded-t-2xl md:rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50 overflow-hidden">
          {/* Drag handle — mobile only */}
          <div className="md:hidden flex justify-center pt-3 pb-1 flex-shrink-0">
            <div className="w-10 h-1 rounded-full bg-gray-200" />
          </div>
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-100 flex-shrink-0">
            <div className="w-9 h-9 rounded-full bg-purple-600 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">PN</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900">Priya Nair</p>
              <p className="text-[11px] text-gray-400">Senior Tax Advisor · Replies within a few hours</p>
            </div>
            <button onClick={() => setChatOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0">
              <X size={16} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {chatMessages.map(msg => (
              <div key={msg.id} className={`flex flex-col ${msg.from === 'you' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${
                  msg.from === 'you'
                    ? 'bg-blue-600 text-white rounded-br-sm'
                    : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                }`}>
                  {msg.text}
                </div>
                <span className="text-[10px] text-gray-400 mt-1 px-1">{msg.time}</span>
              </div>
            ))}
            {paymentComplete && (
              <div className="flex items-center gap-3 pt-1">
                <div className="flex-1 h-px bg-gray-100" />
                <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap">Ticket closed · May 20, 2025</span>
                <div className="flex-1 h-px bg-gray-100" />
              </div>
            )}
          </div>

          {paymentComplete ? (
            <div className="border-t border-gray-100 px-4 py-3.5 flex-shrink-0 text-center">
              <p className="text-[11px] text-gray-400">This ticket is closed. Message history is read-only.</p>
            </div>
          ) : (
            <div className="border-t border-gray-100 px-4 py-3 flex-shrink-0">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Message Priya…"
                  className="flex-1 text-xs bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-50 placeholder-gray-400"
                />
                <button
                  onClick={handleSendMessage}
                  className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center hover:bg-blue-700 transition-colors flex-shrink-0"
                >
                  <Send size={13} className="text-white" />
                </button>
              </div>
            </div>
          )}
        </div>
        </>
      )}

      {/* ── Floating documents panel ── */}
      {docsOpen && (
        <>
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm md:hidden z-40" onClick={() => setDocsOpen(false)} />
        <div className="fixed inset-x-0 bottom-0 h-[95vh] md:inset-x-auto md:right-6 md:top-20 md:bottom-6 md:h-auto md:w-[460px] bg-white rounded-t-2xl md:rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50 overflow-hidden">
          {/* Drag handle — mobile only */}
          <div className="md:hidden flex justify-center pt-3 pb-1 flex-shrink-0">
            <div className="w-10 h-1 rounded-full bg-gray-200" />
          </div>
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0">
            <div>
              <p className="text-sm font-semibold text-gray-900">Document Vault</p>
              <p className="text-[11px] text-gray-400 mt-0.5">Tax Year 2025 · #467501</p>
            </div>
            <button onClick={() => setDocsOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
              <X size={16} />
            </button>
          </div>

          <div className="flex border-b border-gray-100 flex-shrink-0">
            {[
              { label: 'Uploaded by me',    count: docsUploadedByMe.length },
              { label: 'Uploaded by AOTax', count: null },
              { label: '8879 Signed',       count: null },
            ].map(({ label, count }, i) => (
              <button
                key={label}
                onClick={() => setDocsTab(i)}
                className={`flex items-center gap-1.5 px-4 py-3 text-xs font-medium border-b-2 transition-colors ${
                  docsTab === i
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-400 hover:text-gray-600'
                }`}
              >
                {label}
                {count != null && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${docsTab === i ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                    {count}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto">
            {docsTab === 0 && (
              <div className="flex flex-col h-full">
                <div className="flex-1">
                  {docsUploadedByMe.length === 0 ? (
                    <p className="text-xs text-gray-400 text-center py-10">No documents uploaded yet.</p>
                  ) : (
                    <div className="grid grid-cols-2 gap-3 p-4">
                      {docsUploadedByMe.map(doc => (
                        <div key={doc.id} className="flex flex-col rounded-xl border border-gray-100 overflow-hidden hover:border-blue-200 hover:shadow-sm transition-all group cursor-pointer">
                          <div className="relative bg-gray-50 px-5 pt-5 pb-3 flex items-center justify-center" style={{ height: 110 }}>
                            <div className="w-14 bg-white rounded shadow-md border border-gray-100 px-1.5 pt-1.5 pb-2 flex flex-col gap-1">
                              <div className="h-px bg-gray-200 rounded w-full" />
                              <div className="h-px bg-gray-200 rounded w-4/5" />
                              <div className="h-px bg-gray-100 rounded w-full mt-0.5" />
                              <div className="h-px bg-gray-100 rounded w-3/4" />
                              <div className="h-px bg-gray-100 rounded w-full" />
                              <div className="h-px bg-gray-100 rounded w-2/3" />
                              <div className="h-px bg-gray-100 rounded w-full mt-0.5" />
                              <div className="h-px bg-gray-100 rounded w-4/5" />
                            </div>
                            <button className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-blue-500 hover:text-blue-700 shadow-sm transition-colors">
                              <Download size={11} />
                            </button>
                          </div>
                          <div className="px-3 py-2.5 border-t border-gray-100 bg-white">
                            <p className="text-[11px] font-medium text-gray-700 truncate">{doc.type}</p>
                            <p className="text-[10px] text-gray-400 mt-0.5 truncate">{doc.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {paymentComplete ? (
                  <div className="border-t border-gray-100 px-4 py-3.5 flex-shrink-0 text-center">
                    <p className="text-[11px] text-gray-400">This ticket is closed. Document uploads are disabled.</p>
                  </div>
                ) : (
                  <div className="border-t border-gray-100 px-5 py-4 bg-gray-50/50 flex-shrink-0">
                    <p className="text-[10px] font-semibold text-gray-400 tracking-widest mb-3">UPLOAD DOCUMENT</p>
                    <div className="space-y-2.5">
                      <select
                        value={uploadType}
                        onChange={e => setUploadType(e.target.value)}
                        className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-600 outline-none focus:border-blue-300"
                      >
                        <option value="">Choose document type…</option>
                        <option>W-2</option>
                        <option>Form 1099</option>
                        <option>Form 1095-A</option>
                        <option>Broker's Consolidated Statement</option>
                        <option>Last Year Tax Return</option>
                        <option>Other</option>
                      </select>
                      <input
                        type="text"
                        value={uploadPassword}
                        onChange={e => setUploadPassword(e.target.value)}
                        placeholder="Document password (if protected)"
                        className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 bg-white outline-none focus:border-blue-300 placeholder-gray-300"
                      />
                      <label className={`flex items-center justify-center gap-2 w-full py-2.5 border rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                        uploadFile
                          ? 'border-blue-300 bg-blue-50 text-blue-600'
                          : 'border-dashed border-gray-300 text-gray-400 hover:border-blue-400 hover:text-blue-500'
                      }`}>
                        <Download size={12} className="rotate-180 flex-shrink-0" />
                        <span className="truncate max-w-[280px]">{uploadFile ? uploadFile.name : 'Choose file to upload'}</span>
                        <input type="file" className="hidden" onChange={e => setUploadFile(e.target.files[0] || null)} />
                      </label>
                      <button
                        onClick={handleAddDocument}
                        disabled={!uploadType || !uploadFile}
                        className="w-full py-2.5 rounded-lg text-xs font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed bg-blue-600 text-white hover:bg-blue-700 disabled:hover:bg-blue-600"
                      >
                        Add document
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {docsTab === 1 && (
              <div className="flex flex-col items-center justify-center h-full py-16 px-8 text-center">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                  <FileCheck size={18} className="text-gray-300" />
                </div>
                <p className="text-sm font-medium text-gray-500 mb-1">No documents yet</p>
                <p className="text-xs text-gray-400">AOTax will upload documents here once they're ready for your review.</p>
              </div>
            )}

            {docsTab === 2 && (
              <div className="flex flex-col items-center justify-center h-full py-16 px-8 text-center">
                <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center mb-3">
                  <FileCheck size={18} className="text-amber-400" />
                </div>
                <p className="text-sm font-medium text-gray-700 mb-1">Payment required</p>
                <p className="text-xs text-gray-400 leading-relaxed">Once your invoice is paid, you can upload your 8879 signed documents here.</p>
              </div>
            )}
          </div>
        </div>
        </>
      )}

      {profileOpen && (
        <FilingFormShell
          onClose={() => setProfileOpen(false)}
          initialSubId="contact"
          initialSubStates={persistedProfileSubStates}
          initialFieldValues={persistedProfileFieldValues}
          onSave={handleProfileSave}
          sectionFilter="profile"
          profileNavStyle={profileNavStyle}
        />
      )}

      {filingOpen && (
        <FilingFormShell
          onClose={() => { setFilingOpen(false); setFilingReadOnly(false) }}
          initialSubId={filingTarget}
          initialSubStates={persistedSubStates}
          initialFieldValues={persistedFieldValues}
          onSave={handleFormSave}
          readOnly={filingReadOnly}
          sectionFilter={filingReadOnly ? undefined : (filingSectionId ?? 'filing')}
          profileNavStyle={filingNavStyle}
        />
      )}
    </>
  )
}
