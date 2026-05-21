import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ChevronRight, ChevronDown, ChevronUp, ChevronLeft, Lock, CheckCircle2, Check,
  ArrowRight, ExternalLink, Download, FileText, TrendingUp,
  MessageCircle, Phone, MessageSquare, FileCheck, MoreHorizontal,
} from 'lucide-react'
import Navbar from '../components/Navbar'
import CircularProgress from '../components/CircularProgress'
import BottomTabBar from '../components/BottomTabBar'
import BottomSheet from '../components/BottomSheet'
import { STEPS, DRAFTS, SECTION_ROWS } from '../data/ticketData'

export default function DefaultLayout({
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
  isReturningUser,
  profileComplete,
  profileStarted,
  profilePct,
  openProfileFiling,
  handleSubmitProfile,
  handleToggleUserType,
  persistedProfileFieldValues,
  profileNavStyle,
  setProfileNavStyle,
}) {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [titleScrolled, setTitleScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setTitleScrolled(window.scrollY > 70)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="min-h-screen bg-[#f5f4f0]">
      <Navbar activePage="tickets" dark isReturningUser={isReturningUser} onToggleUserType={handleToggleUserType} profileNavStyle={profileNavStyle} onSetProfileNavStyle={setProfileNavStyle} />

      {/* Mobile sticky top bar — back + actions */}
      <div className="sticky top-0 z-30 md:hidden bg-[#f5f4f0] border-b border-gray-200/70 px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ChevronLeft size={18} />
          {titleScrolled && (
            <span className="text-sm font-medium text-gray-700 transition-all duration-150">
              Your 2025 filing
            </span>
          )}
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setChatOpen(true)}
            className="relative p-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <MessageSquare size={16} className="text-gray-500" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center leading-none">1</span>
          </button>
          <button
            onClick={() => setDocsOpen(true)}
            className="relative p-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <FileCheck size={16} className="text-gray-500" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center leading-none">4</span>
          </button>
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <MoreHorizontal size={16} className="text-gray-500" />
          </button>
        </div>
      </div>

      <div className="px-4 sm:px-6 md:px-8 pt-3 md:pt-5 pb-2 max-w-[1280px] mx-auto">
        {/* Back link — desktop only */}
        <button
          onClick={() => navigate('/')}
          className="hidden md:flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors mb-4"
        >
          <ChevronLeft size={13} />
          Back to dashboard
        </button>

        {/* Title row */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight leading-tight mb-1.5">Your 2025 filing</h1>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-medium text-gray-400">#467501</span>
              <span className="text-gray-300 text-[10px]">•</span>
              {paymentComplete ? (
                <span className="flex items-center gap-1 text-xs font-medium text-green-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" /> Filed
                </span>
              ) : (
                <span className="flex items-center gap-1 text-xs font-medium text-red-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" /> Needs your input
                </span>
              )}
              <span className="text-gray-300 text-[10px]">•</span>
              <span className="text-xs text-gray-400">IT Filing Services</span>
              <span className="text-gray-300 text-[10px]">•</span>
              <span className="text-xs text-gray-400">Tax Year 2025</span>
            </div>
          </div>
          {/* Messages + Documents — desktop only, mobile handled by sticky top bar */}
          <div className="hidden md:flex items-center gap-2 flex-shrink-0">
            <button onClick={() => setChatOpen(true)} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-colors">
              <MessageSquare size={14} className="text-gray-500 flex-shrink-0" />
              <span className="text-xs font-medium text-gray-600">Messages</span>
              <span className="w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center flex-shrink-0">1</span>
            </button>
            <button onClick={() => setDocsOpen(true)} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-colors">
              <FileCheck size={14} className="text-gray-500 flex-shrink-0" />
              <span className="text-xs font-medium text-gray-600">Documents</span>
              <span className="w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center flex-shrink-0">4</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main two-column layout */}
      <div className="px-4 sm:px-6 md:px-8 pt-4 pb-24 md:pb-10 max-w-[1280px] mx-auto flex gap-5 items-start">

        {/* Steps column */}
        <div className="flex-1 min-w-0">
          {paymentComplete ? (
            <div className="space-y-3">
              {/* Filed confirmation card */}
              <div className="bg-gradient-to-r from-[#0B2C24] to-[#247A4D] rounded-2xl overflow-hidden">
                <div className="px-6 pt-6 pb-5">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-xs font-bold tracking-widest text-white">AOTax</span>
                        <span className="text-[10px] font-medium text-white/50 tracking-widest">EST. 2003</span>
                      </div>
                      <h2 className="text-xl font-bold text-white mb-1.5">Your return has been filed</h2>
                      <p className="text-xs text-white/60">E-filed with the IRS and NY State DTF</p>
                    </div>
                    <div className="flex-shrink-0 w-14 h-14 rounded-full border-2 border-white/40 flex flex-col items-center justify-center -rotate-12 mt-1">
                      <CheckCircle2 size={13} className="text-white mb-0.5" />
                      <span className="text-[8px] font-black text-white tracking-[0.15em]">FILED</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 py-4">
                    {[
                      { label: 'Confirmation', value: 'EF-2025-8841' },
                      { label: 'Filed by',     value: 'Priya Nair'   },
                      { label: 'Filed on',     value: 'May 20, 2025' },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <p className="text-[10px] font-medium text-white/50 mb-0.5 uppercase tracking-wide">{label}</p>
                        <p className="text-xs font-semibold text-white">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="px-4 pb-4 pt-3">
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { icon: TrendingUp, label: 'Track refund'    },
                      { icon: Download,   label: 'Download return'  },
                      { icon: FileText,   label: 'View invoice'     },
                    ].map(({ icon: Icon, label }) => (
                      <button key={label} className="flex items-center justify-center gap-2 bg-white/20 rounded-xl px-3 py-2.5 hover:bg-white/30 transition-colors">
                        <Icon size={13} className="text-white/80 flex-shrink-0" />
                        <span className="text-xs font-medium text-white truncate">{label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Filing history timeline */}
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setHistoryOpen(o => !o)}
                  className="w-full flex items-center justify-between px-5 py-4"
                >
                  <p className="text-[10px] font-semibold text-gray-400 tracking-widest">FILING HISTORY</p>
                  {historyOpen
                    ? <ChevronUp size={14} className="text-gray-400" />
                    : <ChevronDown size={14} className="text-gray-400" />}
                </button>
                {historyOpen && (
                  <div className="border-t border-gray-100 px-5 pb-2">
                    {[
                      { label: 'Profile',         date: 'May 10, 2025', action: 'View profile',  onAction: () => {}         },
                      { label: 'Provide details', date: 'May 15, 2025', action: 'View filing',   onAction: openFilingReadOnly },
                      { label: 'Expert review',   date: 'May 19, 2025', action: 'View notes',    onAction: () => {}          },
                      { label: 'Review drafts',   date: 'May 19, 2025', action: 'View drafts',   onAction: () => {}          },
                      { label: 'Payment',         date: 'May 20, 2025', action: 'View invoice',  onAction: () => {}          },
                    ].map(({ label, date, action, onAction }, i, arr) => (
                      <div key={label} className={`flex items-center gap-3 py-2.5 ${i < arr.length - 1 ? 'border-b border-gray-50' : ''}`}>
                        <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 size={10} className="text-white" strokeWidth={3} />
                        </div>
                        <div className="flex-1 flex items-center gap-2 min-w-0">
                          <span className="text-xs font-medium text-gray-700">{label}</span>
                          <span className="text-[11px] text-gray-300">·</span>
                          <span className="text-[11px] text-gray-400">{date}</span>
                        </div>
                        <button onClick={onAction} className="text-[11px] font-medium text-blue-500 hover:text-blue-700 transition-colors flex-shrink-0">
                          {action} →
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              <div className="space-y-3">
                {STEPS.map((step, idx, arr) => {
                  const isOpen = openStep === step.num
                  const stepState = getStepState(step.num)
                  const isComplete = stepState === 'complete'
                  const isActive   = stepState === 'active'
                  const isUpcoming = stepState === 'upcoming'
                  const isLast = idx === arr.length - 1
                  const railColor = isComplete ? 'bg-green-200' : isActive ? 'bg-blue-200' : 'bg-gray-200'

                  return (
                    <div key={step.num} className="relative">
                      {!isLast && (
                        <div className={`absolute left-[34px] -bottom-3 w-0.5 h-3 ${railColor} z-10`} />
                      )}

                      <div>
                        {isUpcoming ? (
                          <div className="bg-gray-100 border border-gray-200 rounded-2xl">
                            <div className="flex items-center gap-3 px-5 py-4">
                              <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-400 flex-shrink-0">
                                {step.num}
                              </div>
                              <span className="text-sm font-semibold text-gray-400">{step.label}</span>
                              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-gray-200 text-gray-400">Upcoming</span>
                            </div>
                          </div>
                        ) : (
                          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                          <button
                            onClick={() => setOpenStep(isOpen ? null : step.num)}
                            className="w-full px-5 py-4 text-left"
                          >
                            <div className="flex items-center justify-between gap-3">
                              <div className="flex items-center gap-3 min-w-0 flex-1">
                                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                                  isComplete ? 'bg-green-500 text-white' :
                                  isActive   ? 'bg-blue-600 text-white'  :
                                  'bg-gray-100 text-gray-400'
                                }`}>
                                  {isComplete ? <Check size={13} strokeWidth={3} /> : step.num}
                                </div>
                                <div className="flex items-center gap-2 min-w-0">
                                  <span className="text-sm font-semibold text-gray-900 leading-tight">
                                    {step.label}
                                  </span>
                                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${
                                    isComplete ? 'bg-green-100 text-green-600' :
                                    isActive   ? 'bg-blue-100 text-blue-600'  :
                                    'bg-gray-100 text-gray-400'
                                  }`}>
                                    {isComplete ? 'Complete' : 'In progress'}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-3 flex-shrink-0">
                                {step.num === 1 && !profileComplete && (
                                  <div className="hidden md:block w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                      className="h-full bg-blue-500 rounded-full transition-all duration-500"
                                      style={{ width: `${isReturningUser && !profileStarted ? 100 : profilePct}%` }}
                                    />
                                  </div>
                                )}
                                {isOpen
                                  ? <ChevronUp size={16} className="text-gray-400" />
                                  : <ChevronDown size={16} className="text-gray-400" />}
                              </div>
                            </div>
                            {step.num === 1 && !profileComplete && (
                              <div className="md:hidden mt-2.5 pl-10">
                                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-blue-500 rounded-full transition-all duration-500"
                                    style={{ width: `${isReturningUser && !profileStarted ? 100 : profilePct}%` }}
                                  />
                                </div>
                              </div>
                            )}
                          </button>

                        {/* Step 3 — expert review active */}
                        {isOpen && step.num === 3 && isActive && (
                          <div className="px-5 pb-5 border-t border-gray-100">
                            <div className="flex items-start gap-3 bg-gray-50 rounded-xl px-4 py-4 mt-4 mb-4">
                              <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">PN</div>
                              <div>
                                <p className="text-xs font-semibold text-gray-800 mb-0.5">Priya Nair</p>
                                <p className="text-xs text-gray-500 leading-relaxed">
                                  Your filing has been received. Priya will review all sections and reach out if anything needs clarification before freezing your details.
                                </p>
                              </div>
                            </div>
                            <p className="text-[11px] text-gray-400 text-center">Estimated review time: 2–3 business days</p>
                          </div>
                        )}

                        {/* Step 3 — expert review complete */}
                        {isOpen && step.num === 3 && isComplete && (
                          <div className="px-5 pb-5 border-t border-gray-100">
                            <div className="flex items-center gap-3 bg-green-50 border border-green-100 rounded-xl px-4 py-3.5 mt-4">
                              <CheckCircle2 size={16} className="text-green-500 flex-shrink-0" />
                              <div>
                                <p className="text-xs font-semibold text-gray-800">Reviewed and approved by Priya Nair</p>
                                <p className="text-[11px] text-gray-400 mt-0.5">May 19, 2025 · All sections verified. Drafts have been prepared.</p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Step 4 — review drafts active */}
                        {isOpen && step.num === 4 && isActive && (
                          <div className="px-5 pb-5 border-t border-gray-100">
                            <div className="py-3.5 border-b border-gray-100 mb-4">
                              <p className="text-xs text-gray-400">Priya has prepared <span className="font-medium text-gray-700">{DRAFTS.length} draft returns</span> for your review. Approve all to proceed to payment.</p>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mb-4">
                              {DRAFTS.map(draft => {
                                const state = draftStates[draft.id]
                                const commentOpen = draftCommentOpen[draft.id]

                                return (
                                  <div key={draft.id} className={`rounded-xl border overflow-hidden transition-colors ${
                                    state === 'approved'          ? 'border-green-200 bg-green-50/40' :
                                    state === 'changes_requested' ? 'border-amber-200 bg-amber-50/30' :
                                    'border-gray-200 bg-white'
                                  }`}>
                                    <div className="px-4 pt-4 pb-3">
                                      <div className="flex items-start justify-between gap-3 mb-3">
                                        <div>
                                          <div className="flex items-center gap-2 mb-0.5">
                                            <span className="text-sm font-semibold text-gray-900">{draft.label}</span>
                                            <span className="text-[10px] font-medium text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">{draft.form}</span>
                                          </div>
                                          <p className="text-[11px] text-gray-400">{draft.jurisdiction}</p>
                                        </div>
                                        {state === 'approved' && (
                                          <span className="flex items-center gap-1 text-[11px] font-semibold text-green-600 bg-green-100 px-2 py-0.5 rounded-full flex-shrink-0">
                                            <CheckCircle2 size={10} /> Approved
                                          </span>
                                        )}
                                        {state === 'changes_requested' && (
                                          <span className="text-[11px] font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full flex-shrink-0">
                                            Changes requested
                                          </span>
                                        )}
                                      </div>
                                      <div className="flex items-baseline gap-1.5 mb-1">
                                        <span className={`text-2xl font-bold ${state === 'approved' ? 'text-green-700' : 'text-gray-900'}`}>{draft.headline}</span>
                                        <span className="text-xs text-gray-400">{draft.headlineLabel}</span>
                                      </div>
                                      <p className="text-[11px] text-gray-400">{draft.detail}</p>
                                      <p className="text-[11px] text-gray-300 mt-1.5">Prepared by Priya Nair · {draft.preparedOn}</p>
                                    </div>

                                    {state === 'pending' && (
                                      <div className="px-4 pb-4 space-y-2">
                                        {commentOpen ? (
                                          <div className="space-y-2">
                                            <textarea
                                              rows={2}
                                              placeholder="Describe the changes you'd like Priya to make…"
                                              value={draftComments[draft.id] || ''}
                                              onChange={e => setDraftComments(prev => ({ ...prev, [draft.id]: e.target.value }))}
                                              className="w-full border border-amber-200 rounded-lg px-3 py-2 text-xs text-gray-700 placeholder-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-amber-100"
                                            />
                                            <div className="flex gap-2">
                                              <button onClick={() => requestChanges(draft.id)} className="flex-1 py-2 rounded-lg bg-amber-500 text-white text-xs font-semibold hover:bg-amber-600 transition-colors">
                                                Submit request
                                              </button>
                                              <button onClick={() => toggleCommentBox(draft.id)} className="px-3 py-2 rounded-lg border border-gray-200 text-xs text-gray-500 hover:bg-gray-50 transition-colors">
                                                Cancel
                                              </button>
                                            </div>
                                          </div>
                                        ) : (
                                          <div className="flex gap-2">
                                            <button onClick={() => approveDraft(draft.id)} className="flex-1 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors">
                                              Approve
                                            </button>
                                            <button onClick={() => toggleCommentBox(draft.id)} className="flex-1 py-2 rounded-lg border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                                              Request changes
                                            </button>
                                          </div>
                                        )}
                                      </div>
                                    )}

                                    {state === 'changes_requested' && draftComments[draft.id] && (
                                      <div className="px-4 pb-4">
                                        <div className="bg-amber-50 border border-amber-100 rounded-lg px-3 py-2.5">
                                          <p className="text-[11px] font-semibold text-amber-700 mb-0.5">Your note to Priya</p>
                                          <p className="text-[11px] text-amber-600 leading-relaxed">{draftComments[draft.id]}</p>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                )
                              })}
                            </div>

                            {allDraftsApproved && (
                              <button
                                onClick={() => { setDraftsApproved(true); setOpenStep(5) }}
                                className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
                              >
                                Proceed to payment <ArrowRight size={14} />
                              </button>
                            )}
                          </div>
                        )}

                        {/* Step 4 — review drafts complete */}
                        {isOpen && step.num === 4 && isComplete && (
                          <div className="px-5 pb-5 border-t border-gray-100">
                            <div className="py-3.5 border-b border-gray-100 mb-4">
                              <p className="text-xs text-gray-400">All <span className="font-medium text-gray-700">{DRAFTS.length} drafts</span> approved · May 19, 2025</p>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              {DRAFTS.map(draft => (
                                <div key={draft.id} className="rounded-xl border border-green-200 bg-green-50/40 overflow-hidden">
                                  <div className="px-4 pt-4 pb-4">
                                    <div className="flex items-start justify-between gap-3 mb-3">
                                      <div>
                                        <div className="flex items-center gap-2 mb-0.5">
                                          <span className="text-sm font-semibold text-gray-900">{draft.label}</span>
                                          <span className="text-[10px] font-medium text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">{draft.form}</span>
                                        </div>
                                        <p className="text-[11px] text-gray-400">{draft.jurisdiction}</p>
                                      </div>
                                      <span className="flex items-center gap-1 text-[11px] font-semibold text-green-600 bg-green-100 px-2 py-0.5 rounded-full flex-shrink-0">
                                        <CheckCircle2 size={10} /> Approved
                                      </span>
                                    </div>
                                    <div className="flex items-baseline gap-1.5 mb-1">
                                      <span className="text-2xl font-bold text-green-700">{draft.headline}</span>
                                      <span className="text-xs text-gray-400">{draft.headlineLabel}</span>
                                    </div>
                                    <p className="text-[11px] text-gray-400">{draft.detail}</p>
                                    <p className="text-[11px] text-gray-300 mt-1.5">Prepared by Priya Nair · {draft.preparedOn}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Step 5 — pay invoice active */}
                        {isOpen && step.num === 5 && isActive && (
                          <div className="px-5 pb-5 border-t border-gray-100">
                            <div className="py-3.5 border-b border-gray-100 mb-4">
                              <p className="text-xs text-gray-400">Your invoice is ready. Review the breakdown and complete payment to file your returns.</p>
                            </div>
                            <div className="border border-gray-200 rounded-xl overflow-hidden mb-4">
                              <div className="bg-gray-50 px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                                <div>
                                  <p className="text-xs font-semibold text-gray-800">Invoice #INV-2025-467501</p>
                                  <p className="text-[11px] text-gray-400 mt-0.5">Issued May 19, 2025 · Due May 30, 2025</p>
                                </div>
                                <span className="text-[11px] font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">Unpaid</span>
                              </div>
                              <div className="px-4 py-3 space-y-3">
                                {[
                                  { label: 'Federal filing — Form 1040',    desc: 'IRS · Tax Year 2025',    amount: '$299' },
                                  { label: 'NY State filing — Form IT-201', desc: 'NY DTF · Tax Year 2025', amount: '$149' },
                                  { label: 'Schedule D — Capital Gains',    desc: 'Federal · Attachment',   amount: '$79'  },
                                ].map(item => (
                                  <div key={item.label} className="flex items-start justify-between gap-4">
                                    <div>
                                      <p className="text-xs font-medium text-gray-800">{item.label}</p>
                                      <p className="text-[11px] text-gray-400">{item.desc}</p>
                                    </div>
                                    <span className="text-xs font-semibold text-gray-800 tabular-nums flex-shrink-0">{item.amount}</span>
                                  </div>
                                ))}
                              </div>
                              <div className="border-t border-gray-100 px-4 py-3 flex items-center justify-between bg-gray-50">
                                <span className="text-sm font-semibold text-gray-700">Total due</span>
                                <span className="text-lg font-bold text-gray-900">$527</span>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <button className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                                View invoice <ExternalLink size={13} />
                              </button>
                              <button onClick={handlePayNow} className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors">
                                Pay now <ArrowRight size={14} />
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Step 1 — profile */}
                        {isOpen && step.num === 1 && (
                          <div className="px-5 pb-5 border-t border-gray-100">
                            {profileComplete ? (
                              <div className="pt-5 flex items-center justify-between">
                                <p className="text-sm text-gray-500">
                                  {isReturningUser ? 'Profile confirmed on May 10, 2025' : 'Profile submitted on May 10, 2025'}
                                </p>
                                <button onClick={openProfileFiling} className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors flex-shrink-0">
                                  View submitted profile <ArrowRight size={13} />
                                </button>
                              </div>
                            ) : isReturningUser ? (
                              // Returning user — pre-filled, just confirm
                              <div className="mt-5">
                                <p className="text-sm text-gray-600 leading-relaxed mb-5">
                                  We have your details from last year on file. Take a look and confirm they're still accurate — or open to update anything that's changed.
                                </p>
                                {/* Summary grid */}
                                <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-5">
                                  {[
                                    { label: 'Name', value: 'Surajit Ray' },
                                    { label: 'Visa', value: 'H-1B' },
                                    { label: 'Address', value: '84 Grove St, New York' },
                                    { label: 'Filing status', value: 'Married Filing Jointly' },
                                  ].map(({ label, value }) => (
                                    <div key={label}>
                                      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-0.5">{label}</p>
                                      <p className="text-xs font-medium text-gray-700">{value}</p>
                                    </div>
                                  ))}
                                </div>
                                {/* Actions */}
                                <div className="flex items-center justify-between">
                                  <button onClick={handleSubmitProfile} className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
                                    Looks good, confirm
                                  </button>
                                  <button onClick={openProfileFiling} className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors">
                                    Review &amp; confirm <ArrowRight size={14} />
                                  </button>
                                </div>
                              </div>
                            ) : (
                              // States 1 / 2a / 2b — clean modern: description + thin bar + action
                              <div className="mt-5">
                                <p className="text-sm text-gray-600 leading-relaxed mb-5">
                                  {!profileStarted
                                    ? 'Before Priya can start on your return, she needs a few details about you. Takes minutes and carries over each year.'
                                    : profilePct < 100
                                    ? 'Pick up where you left off. A few more sections and you\'re done.'
                                    : 'All sections filled in. Once submitted, Priya will review everything and get started on your 2025 return.'
                                  }
                                </p>
                                {/* Actions */}
                                <div className="flex items-center justify-between">
                                  {profilePct === 100
                                    ? <button onClick={openProfileFiling} className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors">Review &amp; edit <ArrowRight size={13} /></button>
                                    : <div />
                                  }
                                  <button
                                    onClick={profilePct === 100 ? handleSubmitProfile : openProfileFiling}
                                    className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
                                  >
                                    {!profileStarted ? 'Start profile' : profilePct < 100 ? 'Continue profile' : 'Submit profile'} <ArrowRight size={14} />
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Step 2 — provide details */}
                        {isOpen && step.num === 2 && (
                          <div className="px-5 pb-5 border-t border-gray-100">
                            <div className="flex items-center justify-between pt-4 pb-2">
                              <span className="text-sm text-gray-500">
                                {sectionsStarted === 0 ? 'Click a section to begin' : `${sectionsStarted} of 3 sections started`}
                              </span>
                              {filingSubmitted
                                ? <span className="text-[11px] text-gray-400">Last submitted May 15, 2025</span>
                                : anyStarted && <span className="text-[11px] text-gray-400">Last edited May 15, 2025</span>
                              }
                            </div>

                            <div>
                              {SECTION_ROWS.map(({ label, sectionId, comments, target }) => {
                                const progress = getSectionProgress(sectionId)
                                const ctaLabel = progress === 100 ? 'Review' : progress > 0 ? 'Continue' : 'Start'
                                return (
                                  <button
                                    key={label}
                                    onClick={() => openFiling(target, profileNavStyle, sectionId)}
                                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 text-left group transition-colors"
                                  >
                                    <CircularProgress progress={progress} />
                                    <span className="flex items-center gap-1.5 flex-1 min-w-0">
                                      <span className="text-sm text-gray-800">{label}</span>
                                      <span className="text-gray-300 text-[11px]">·</span>
                                      <span className={`text-[11px] tabular-nums ${progress > 0 ? 'text-gray-400' : 'text-gray-300'}`}>{progress}%</span>
                                    </span>
                                    {comments > 0 && (
                                      <span className="text-[10px] font-semibold text-amber-600 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full tabular-nums flex-shrink-0">
                                        {comments} comment{comments > 1 ? 's' : ''}
                                      </span>
                                    )}
                                    <span className="flex items-center gap-1 text-xs font-semibold text-blue-600 flex-shrink-0">
                                      {ctaLabel} <ArrowRight size={12} />
                                    </span>
                                  </button>
                                )
                              })}
                            </div>

                            {filingSubmitted && (
                              <button onClick={openFilingReadOnly} className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                                View filing
                              </button>
                            )}

                            {!filingSubmitted && allComplete && (
                              <button onClick={handleSubmitFiling} className="w-full flex items-center justify-center gap-1.5 mt-4 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors">
                                Submit filing <ArrowRight size={14} />
                              </button>
                            )}
                          </div>
                        )}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="flex items-center gap-2 justify-center mt-6 text-xs text-gray-400">
                <span className="text-gray-300">⚑</span>
                Once all steps are completed, your return will be filed with the IRS.
              </div>
            </>
          )}
        </div>

        {/* Right sidebar — desktop only */}
        <div className="hidden md:block w-72 flex-shrink-0">
          <div className="space-y-4">
            {paymentComplete ? (
              <div className="bg-white rounded-2xl border border-gray-200 p-5">
                <div className="flex items-center justify-between mb-0.5">
                  <p className="text-[10px] font-semibold text-gray-400 tracking-widest">FEDERAL REFUND</p>
                  <span className="text-base font-bold text-gray-900">$3,240</span>
                </div>
                <p className="text-[11px] text-gray-400 mb-4">Expected by Jun 10, 2025</p>
                <div className="relative flex items-start mb-3">
                  <div className="absolute top-[5px] h-px bg-gray-100" style={{ left: '17%', width: '66%' }} />
                  <div className="absolute top-[5px] h-px bg-blue-300" style={{ left: '17%', width: '33%' }} />
                  {[
                    { label: 'Filed',       done: true,  active: false },
                    { label: 'Processing',  done: false, active: true  },
                    { label: 'Refund sent', done: false, active: false },
                  ].map(({ label, done, active }) => (
                    <div key={label} className="flex-1 flex flex-col items-center relative z-10">
                      <div className={`w-2.5 h-2.5 rounded-full border-2 ${
                        done   ? 'bg-blue-500 border-blue-500' :
                        active ? 'bg-white border-blue-400'   :
                                 'bg-white border-gray-200'
                      }`} />
                      <span className={`text-[9px] mt-1.5 font-medium text-center leading-tight ${
                        done   ? 'text-blue-600' :
                        active ? 'text-gray-500' :
                                 'text-gray-300'
                      }`}>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-200 p-5">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[10px] font-semibold text-gray-400 tracking-widest">OVERALL PROGRESS</p>
                  <span className="text-base font-bold text-gray-900">11%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '11%' }} />
                </div>
                <p className="text-[11px] text-gray-400">Step 1 of 5 · Complete your profile</p>
              </div>
            )}

            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <p className="text-[10px] font-semibold text-gray-400 tracking-widest mb-3">YOUR ADVISOR</p>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">PN</div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Priya Nair</p>
                  <p className="text-xs text-gray-400">Senior Tax Advisor</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => setChatOpen(true)} className="flex items-center justify-center gap-1.5 bg-white text-gray-700 text-xs font-medium py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <MessageCircle size={13} /> Message
                </button>
                <button className="flex items-center justify-center gap-1.5 border border-gray-200 text-gray-700 text-xs font-medium py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <Phone size={13} /> Call
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <p className="text-[10px] font-semibold text-gray-400 tracking-widest mb-3">KEY DATES</p>
              <div className="space-y-3">
                {[
                  { label: 'Submit details by',      date: 'May 30, 2025',  note: '15 days left'  },
                  { label: 'Federal filing deadline', date: 'Apr 15, 2026',  note: '336 days left' },
                ].map(({ label, date, note }) => (
                  <div key={label} className="flex items-start gap-2.5">
                    <div className="w-1 h-9 rounded-full bg-orange-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-medium text-gray-800">{label}</p>
                      <p className="text-[11px] text-gray-400">{date} · {note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <p className="text-[10px] font-semibold text-gray-400 tracking-widest mb-2">NEED HELP?</p>
              <p className="text-xs text-gray-500 mb-3">Visit our help center for guides and answers to common questions.</p>
              <button className="w-full flex items-center justify-between border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                Visit help center
                <ExternalLink size={13} className="text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <BottomTabBar activePage="tickets" />

      <BottomSheet open={sidebarOpen} onClose={() => setSidebarOpen(false)} title="Filing summary">
        {/* Progress */}
        {!paymentComplete && (
          <div className="bg-gray-50 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] font-semibold text-gray-400 tracking-widest">OVERALL PROGRESS</p>
              <span className="text-base font-bold text-gray-900">11%</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-1.5">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: '11%' }} />
            </div>
            <p className="text-[11px] text-gray-400">Step 1 of 5 · Complete your profile</p>
          </div>
        )}
        {/* Advisor */}
        <div className="bg-gray-50 rounded-2xl p-4">
          <p className="text-[10px] font-semibold text-gray-400 tracking-widest mb-3">YOUR ADVISOR</p>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">PN</div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Priya Nair</p>
              <p className="text-xs text-gray-400">Senior Tax Advisor</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => { setChatOpen(true); setSidebarOpen(false) }} className="flex items-center justify-center gap-1.5 bg-white text-gray-700 text-xs font-medium py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <MessageCircle size={13} /> Message
            </button>
            <button className="flex items-center justify-center gap-1.5 border border-gray-200 text-gray-700 text-xs font-medium py-2 rounded-lg bg-white hover:bg-gray-50 transition-colors">
              <Phone size={13} /> Call
            </button>
          </div>
        </div>
        {/* Key dates */}
        <div className="bg-gray-50 rounded-2xl p-4">
          <p className="text-[10px] font-semibold text-gray-400 tracking-widest mb-3">KEY DATES</p>
          <div className="space-y-3">
            {[
              { label: 'Submit details by',       date: 'May 30, 2025',  note: '15 days left'  },
              { label: 'Federal filing deadline',  date: 'Apr 15, 2026',  note: '336 days left' },
            ].map(({ label, date, note }) => (
              <div key={label} className="flex items-start gap-2.5">
                <div className="w-1 h-9 rounded-full bg-orange-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-gray-800">{label}</p>
                  <p className="text-[11px] text-gray-400">{date} · {note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Help */}
        <div className="bg-gray-50 rounded-2xl p-4">
          <p className="text-[10px] font-semibold text-gray-400 tracking-widest mb-2">NEED HELP?</p>
          <p className="text-xs text-gray-500 mb-3">Visit our help center for guides and answers.</p>
          <button className="w-full flex items-center justify-between border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            Visit help center
            <ExternalLink size={13} className="text-gray-400" />
          </button>
        </div>
      </BottomSheet>
    </div>
  )
}
