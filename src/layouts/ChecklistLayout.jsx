import { useNavigate } from 'react-router-dom'
import {
  ChevronRight, CheckCircle2, ArrowRight, ExternalLink,
  MessageCircle, Phone, MessageSquare, FileCheck, Lock,
  Download, FileText, TrendingUp,
} from 'lucide-react'
import Navbar from '../components/Navbar'
import CircularProgress from '../components/CircularProgress'
import { STEPS, DRAFTS, SECTION_ROWS } from '../data/ticketData'

export default function ChecklistLayout({
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
}) {
  const navigate = useNavigate()

  const activeStepNum = STEPS.find(s => getStepState(s.num) === 'active')?.num ?? 1

  return (
    <div className="min-h-screen bg-white">
      <Navbar activePage="tickets" dark />

      <div className="px-8 pt-5 pb-2 max-w-[1280px] mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-[11px] text-gray-400 mb-3">
          <button onClick={() => navigate('/dashboard')} className="hover:text-gray-600">Dashboard</button>
          <ChevronRight size={10} />
          <button onClick={() => navigate('/dashboard')} className="hover:text-gray-600">My Filings</button>
          <ChevronRight size={10} />
          <span className="text-gray-600 font-medium">#467501</span>
        </div>

        {/* Tags */}
        <div className="flex items-center gap-2 flex-wrap mb-3">
          <span className="bg-blue-100 text-blue-700 text-[11px] font-semibold px-2.5 py-1 rounded-full">#467501</span>
          {paymentComplete ? (
            <span className="flex items-center gap-1 text-[11px] font-medium text-green-600">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" /> Filed
            </span>
          ) : (
            <span className="flex items-center gap-1 text-[11px] font-medium text-red-600">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" /> Needs your input
            </span>
          )}
          <span className="text-[11px] text-gray-400">IT Filing Services · Tax Year 2025</span>
        </div>

        {/* Title + actions */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight leading-tight">Your 2025 filing</h1>
            <p className="text-gray-500 text-sm mt-1.5 max-w-xl">
              {paymentComplete
                ? 'Successfully e-filed with the IRS and NY State DTF on May 20, 2025.'
                : "Complete the steps below to finish your filing."}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0 mt-1">
            <button onClick={() => setChatOpen(true)} className="relative flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-colors">
              <MessageSquare size={14} className="text-gray-500 flex-shrink-0" />
              <span className="text-xs font-medium text-gray-600">Messages</span>
              <span className="w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center flex-shrink-0">1</span>
            </button>
            <button onClick={() => setDocsOpen(true)} className="relative flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-colors">
              <FileCheck size={14} className="text-gray-500 flex-shrink-0" />
              <span className="text-xs font-medium text-gray-600">Documents</span>
              <span className="w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center flex-shrink-0">4</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main layout */}
      <div className="px-8 pt-4 pb-10 max-w-[1280px] mx-auto flex gap-5 items-start">

        {/* ── Main content: current step ── */}
        <div className="flex-1 min-w-0">

          {paymentComplete ? (
            <div className="space-y-3">
              {/* Filed confirmation */}
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
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">

              {/* Step 1 — Provide details */}
              {activeStepNum === 1 && (
                <div className="p-5">
                  <div className="mb-4 pb-4 border-b border-gray-100">
                    <h2 className="text-base font-semibold text-gray-900 mb-0.5">Provide your details</h2>
                    <p className="text-xs text-gray-400">
                      {sectionsStarted === 0
                        ? 'No sections started yet. Fill in all four sections to submit.'
                        : `${sectionsStarted} of 4 sections started`}
                    </p>
                  </div>

                  <div className="space-y-1 mb-5">
                    {SECTION_ROWS.map(({ label, sectionId, comments, target }) => {
                      const progress = getSectionProgress(sectionId)
                      return (
                        <button
                          key={label}
                          onClick={() => openFiling(target)}
                          disabled={filingSubmitted}
                          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-gray-50 text-left group transition-colors disabled:cursor-default disabled:hover:bg-transparent"
                        >
                          <CircularProgress progress={progress} />
                          <span className="flex-1 text-sm text-gray-800">{label}</span>
                          {comments > 0 && (
                            <span className="text-[10px] font-semibold text-amber-600 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full tabular-nums">
                              {comments} comment{comments > 1 ? 's' : ''}
                            </span>
                          )}
                          <span className={`text-[11px] tabular-nums ${progress > 0 ? 'text-gray-400' : 'text-gray-300'}`}>{progress}%</span>
                          <ChevronRight size={13} className="text-gray-300 group-hover:text-gray-500 transition-colors" />
                        </button>
                      )
                    })}
                  </div>

                  {filingSubmitted ? (
                    <button onClick={openFilingReadOnly} className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                      View filing
                    </button>
                  ) : allComplete ? (
                    <div className="flex gap-2">
                      <button onClick={() => openFiling()} className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                        Edit filing
                      </button>
                      <button onClick={handleSubmitFiling} className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors">
                        Submit filing <ArrowRight size={14} />
                      </button>
                    </div>
                  ) : (
                    <button onClick={() => openFiling()} className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors">
                      {anyStarted ? 'Continue filing' : 'Start filing'} <ArrowRight size={14} />
                    </button>
                  )}
                </div>
              )}

              {/* Step 2 — Expert review */}
              {activeStepNum === 2 && (
                <div className="p-5">
                  <div className="mb-4 pb-4 border-b border-gray-100">
                    <h2 className="text-base font-semibold text-gray-900 mb-0.5">Expert review</h2>
                    <p className="text-xs text-gray-400">Priya is reviewing your filing. No action needed right now.</p>
                  </div>
                  <div className="flex items-start gap-3 bg-gray-50 rounded-xl px-4 py-4 mb-4">
                    <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">PN</div>
                    <div>
                      <p className="text-xs font-semibold text-gray-800 mb-0.5">Priya Nair</p>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        Your filing has been received. I'll review all sections and reach out if anything needs clarification before freezing your details.
                      </p>
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-400 text-center">Estimated review time: 2–3 business days</p>
                </div>
              )}

              {/* Step 3 — Review drafts */}
              {activeStepNum === 3 && (
                <div className="p-5">
                  <div className="mb-4 pb-4 border-b border-gray-100">
                    <h2 className="text-base font-semibold text-gray-900 mb-0.5">Review your drafts</h2>
                    <p className="text-xs text-gray-400">
                      Priya has prepared <span className="font-medium text-gray-700">{DRAFTS.length} draft returns</span>. Approve all to proceed to payment.
                    </p>
                  </div>

                  <div className="space-y-3 mb-4">
                    {DRAFTS.map(draft => {
                      const state = draftStates[draft.id]
                      const commentOpen = draftCommentOpen[draft.id]
                      return (
                        <div key={draft.id} className={`rounded-xl border overflow-hidden ${
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
                      onClick={() => { setDraftsApproved(true); setOpenStep(4) }}
                      className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
                    >
                      Proceed to payment <ArrowRight size={14} />
                    </button>
                  )}
                </div>
              )}

              {/* Step 4 — Pay invoice */}
              {activeStepNum === 4 && (
                <div className="p-5">
                  <div className="mb-4 pb-4 border-b border-gray-100">
                    <h2 className="text-base font-semibold text-gray-900 mb-0.5">Pay your invoice</h2>
                    <p className="text-xs text-gray-400">Review the breakdown and complete payment to file your returns.</p>
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
            </div>
          )}
        </div>

        {/* ── Right sidebar ── */}
        <div className="w-72 flex-shrink-0 space-y-4">

          {/* Minimal overall progress */}
          {paymentComplete ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-1">
                <p className="text-[10px] font-semibold text-gray-400 tracking-widest">FEDERAL REFUND</p>
                <span className="text-sm font-bold text-gray-900">$3,240</span>
              </div>
              <p className="text-[11px] text-gray-400">Expected by Jun 10, 2025</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-semibold text-gray-400 tracking-widest">PROGRESS</p>
                <span className="text-xs font-semibold text-gray-600">Step {activeStepNum} of 4</span>
              </div>
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${((activeStepNum - 1) / 4) * 100 + 11}%` }} />
              </div>
            </div>
          )}

          {/* Process checklist */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-[10px] font-semibold text-gray-400 tracking-widest">PROCESS</p>
            </div>
            <div className="divide-y divide-gray-50">
              {STEPS.map(step => {
                const state = paymentComplete ? 'complete' : getStepState(step.num)
                const isComplete = state === 'complete'
                const isActive   = state === 'active'
                const isUpcoming = state === 'upcoming'
                return (
                  <div key={step.num} className={`flex items-center gap-3 px-4 py-3 ${isActive ? 'bg-blue-50/50' : ''}`}>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isComplete ? 'bg-blue-500' :
                      isActive   ? 'bg-blue-500' :
                      'bg-gray-100'
                    }`}>
                      {isComplete ? (
                        <CheckCircle2 size={11} className="text-white" strokeWidth={2.5} />
                      ) : isActive ? (
                        <span className="text-[10px] font-bold text-white">{step.num}</span>
                      ) : (
                        <Lock size={9} className="text-gray-300" />
                      )}
                    </div>
                    <span className={`text-xs font-medium flex-1 ${isUpcoming ? 'text-gray-400' : isActive ? 'text-blue-700' : 'text-gray-500'}`}>
                      {step.label}
                    </span>
                    {isComplete && <span className="text-[10px] text-green-500 font-medium flex-shrink-0">Done</span>}
                    {isActive  && <span className="text-[10px] text-blue-500 font-medium flex-shrink-0">Active</span>}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Advisor */}
          <div className="bg-white rounded-2xl border border-gray-200 p-4">
            <p className="text-[10px] font-semibold text-gray-400 tracking-widest mb-3">YOUR ADVISOR</p>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-full bg-purple-600 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">PN</div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Priya Nair</p>
                <p className="text-xs text-gray-400">Senior Tax Advisor</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setChatOpen(true)} className="flex items-center justify-center gap-1.5 bg-gray-900 text-white text-xs font-medium py-2 rounded-lg hover:bg-gray-700 transition-colors">
                <MessageCircle size={12} /> Message
              </button>
              <button className="flex items-center justify-center gap-1.5 border border-gray-200 text-gray-700 text-xs font-medium py-2 rounded-lg hover:bg-gray-50 transition-colors">
                <Phone size={12} /> Call
              </button>
            </div>
          </div>

          {/* Key dates */}
          <div className="bg-white rounded-2xl border border-gray-200 p-4">
            <p className="text-[10px] font-semibold text-gray-400 tracking-widest mb-3">KEY DATES</p>
            <div className="space-y-3">
              {[
                { label: 'Submit details by',      date: 'May 30, 2025', note: '15 days left'  },
                { label: 'Federal filing deadline', date: 'Apr 15, 2026', note: '336 days left' },
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

          {/* Need help */}
          <div className="bg-white rounded-2xl border border-gray-200 p-4">
            <p className="text-[10px] font-semibold text-gray-400 tracking-widest mb-2">NEED HELP?</p>
            <p className="text-xs text-gray-500 mb-3">Visit our help center for guides and answers.</p>
            <button className="w-full flex items-center justify-between border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              Visit help center <ExternalLink size={13} className="text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
