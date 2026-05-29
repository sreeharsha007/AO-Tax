import { useState, useEffect } from 'react'
import { Check, ArrowRight } from 'lucide-react'
import ProfileWizard from './ProfileWizard'
import { buildSectionList } from '../utils/inferProfile'
import { useTheme } from '../context/ThemeContext'

export default function AssessmentWizardModal({ open, onClose, onComplete, initialAnswers = null }) {
  const { theme } = useTheme()
  const [revealAnswers, setRevealAnswers] = useState(null)

  // Reset reveal screen each time the modal is opened so re-opening always starts at the wizard
  useEffect(() => {
    if (open) setRevealAnswers(null)
  }, [open])

  if (!open) return null

  function handleClose() {
    setRevealAnswers(null)
    onClose()
  }

  function handleContinue() {
    // Don't reset revealAnswers here — let the parent close the modal via onComplete's callback.
    // Resetting before the parent acts would briefly flash the wizard screen back.
    onComplete(revealAnswers)
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-[95vw] h-[95vh] flex flex-col overflow-hidden">

        {/* Top bar — mirrors onboarding header */}
        <div className="px-8 pt-6 pb-5 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
          <span className="font-bold text-sm tracking-wide text-gray-900">AOTax</span>
          <button
            onClick={handleClose}
            className="text-xs font-medium text-gray-400 hover:text-gray-600 transition-colors"
          >
            Close
          </button>
        </div>

        {/* Scrollable body */}
        {revealAnswers ? (
          /* ── Reveal screen — vertically centered ── */
          <div className="flex-1 overflow-y-auto flex items-center justify-center px-6 py-10">
            <div className="w-full max-w-lg mx-auto text-center">
              <div className={`w-11 h-11 rounded-full ${theme.accentLight} border border-blue-100 flex items-center justify-center mx-auto mb-6`}>
                <Check size={16} className={theme.accentText} />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Your filing is set up.</h1>
              <p className="text-sm text-gray-500 mt-2 mb-10 max-w-[260px] mx-auto leading-relaxed">
                {(() => {
                  const sections = buildSectionList(revealAnswers)
                  return sections.length > 0
                    ? `We've tailored your 2025 return based on your answers — ${sections.length} section${sections.length === 1 ? '' : 's'} to complete.`
                    : "We've tailored your 2025 return based on your answers."
                })()}
              </p>
              <button
                onClick={handleContinue}
                className={`w-full flex items-center justify-center gap-2 py-3.5 ${theme.btnRadius} text-sm font-semibold ${theme.btnPrimary}`}
              >
                Continue with filing <ArrowRight size={15} />
              </button>
            </div>
          </div>
        ) : (
          /* ── Wizard screen — vertically centred, scrollable when tall ── */
          <div className="flex-1 overflow-y-auto px-6 py-10 flex flex-col">
            <div className="w-full max-w-lg mx-auto my-auto">
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-3xl font-bold text-gray-900">Set up your 2025 filing</h1>
                  <span className={`text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full ${theme.accentLight} ${theme.accentText} border ${theme.accentBorder}`}>
                    Tax Year 2025
                  </span>
                </div>
                <p className="text-sm text-gray-500">Helps us tailor your filing. Takes about a minute.</p>
              </div>
              <ProfileWizard
                initialAnswers={initialAnswers}
                onComplete={answers => setRevealAnswers(answers)}
                onSkip={handleClose}
              />
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
