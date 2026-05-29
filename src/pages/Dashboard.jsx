import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Plus, ArrowRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import { useTheme } from '../context/ThemeContext'
import MyTickets from '../components/MyTickets'
import ReferralSection from '../components/ReferralSection'
import UpcomingSection from '../components/UpcomingSection'
import ResourcesSection from '../components/ResourcesSection'
import NewTicketModal from '../components/NewTicketModal'
import AssessmentWizardModal from '../components/AssessmentWizardModal'
import BottomTabBar from '../components/BottomTabBar'
import { buildSectionList } from '../utils/inferProfile'

export default function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false)
  const [assessmentWizardOpen, setAssessmentWizardOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { theme } = useTheme()

  function handleAssessmentComplete(answers) {
    setAssessmentWizardOpen(false)
    const sections = buildSectionList(answers)
    navigate('/tickets/467501', {
      state: { assessmentComplete: true, assessmentSectionCount: sections.length }
    })
  }

  const isNewUser         = location.state?.isNewUser         ?? false
  const assessmentSkipped = location.state?.assessmentSkipped ?? false
  const firstName         = location.state?.firstName         ?? null
  const assessmentDone    = location.state?.assessmentComplete ?? false
  const assessmentAnswers = location.state?.assessmentAnswers  ?? null
  const justFiled         = location.state?.justFiled          ?? false

  const greeting = justFiled
    ? 'All done, Surajit.'
    : isNewUser && firstName
      ? `Welcome, ${firstName}.`
      : 'Welcome back, Surajit.'

  const subtitle = justFiled
    ? 'Your 2025 return has been e-filed. Priya will be in touch if anything comes up.'
    : isNewUser
      ? 'Your account is all set. Start your 2025 filing when you\'re ready.'
      : 'Priya is two days into your return. There are two pending items from you.'

  return (
    <div className={`min-h-screen ${theme.pageBg}`}>
      <Navbar activePage="dashboard" dark />

      <div className={`${theme.pageBg} px-4 sm:px-6 md:px-8 pt-6 pb-5`}>
        <div className="max-w-[1280px] mx-auto">
<div className="flex items-start justify-between mb-1 gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight" style={{ fontFamily: theme.fontHeading }}>
                {greeting}
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                {subtitle}
              </p>
            </div>
            {/* Desktop: action buttons — always visible */}
            <div className="hidden md:flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => setModalOpen(true)}
                className={`flex items-center gap-1.5 ${theme.btnPrimary} ${theme.btnRadius} text-sm font-medium px-4 py-2 transition-colors`}
              >
                <Plus size={14} /> New filing
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 md:px-8 pt-4 pb-24 md:pb-10">
        <div className="max-w-[1280px] mx-auto space-y-4">
          {/* Mobile-only assessment strip — sits above the two-column layout so it doesn't push the left column down on desktop */}
          {assessmentSkipped && (
            <div className="md:hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50/60 p-5">
              <p className="text-[10px] font-bold tracking-widest text-indigo-400/80 mb-2">BEFORE YOU BEGIN</p>
              <p className="text-sm font-semibold text-gray-900 mb-1">Complete your filing setup</p>
              <p className="text-xs text-gray-500 leading-relaxed mb-4">A few quick questions to tailor your filing. Takes about a minute.</p>
              <button
                onClick={() => setAssessmentWizardOpen(true)}
                className={`flex items-center justify-center gap-1.5 w-full py-2.5 ${theme.btnPrimary} ${theme.btnRadius} text-xs font-semibold transition-colors`}
              >
                Start setup <ArrowRight size={13} />
              </button>
            </div>
          )}
          <div className="flex gap-4 items-start">
            <div className="flex-1 min-w-0 space-y-4">
              <MyTickets isNewUser={isNewUser} assessmentDone={assessmentDone} assessmentAnswers={assessmentAnswers} filedTicketId={justFiled ? '#467501' : null} />
              <ReferralSection />
              {/* Mobile-only: resources + dates surface here instead of the sidebar */}
              <div className="md:hidden"><ResourcesSection /></div>
              <div className="md:hidden"><UpcomingSection /></div>
            </div>
            <div className="hidden md:block w-72 flex-shrink-0 space-y-4">
              {assessmentSkipped && (
                <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50/60 p-5">
                  <p className="text-[10px] font-bold tracking-widest text-indigo-400/80 mb-2">BEFORE YOU BEGIN</p>
                  <p className="text-sm font-semibold text-gray-900 mb-1">Complete your filing setup</p>
                  <p className="text-xs text-gray-500 leading-relaxed mb-4">A few quick questions to tailor your filing. Takes about a minute.</p>
                  <button
                    onClick={() => setAssessmentWizardOpen(true)}
                    className={`flex items-center justify-center gap-1.5 w-full py-2.5 ${theme.btnPrimary} ${theme.btnRadius} text-xs font-semibold transition-colors`}
                  >
                    Start setup <ArrowRight size={13} />
                  </button>
                </div>
              )}
              <UpcomingSection />
              <ResourcesSection />
            </div>
          </div>
        </div>
      </div>

      <BottomTabBar activePage="dashboard" onNewFiling={() => setModalOpen(true)} />

      {modalOpen && <NewTicketModal onClose={() => setModalOpen(false)} isReturningUser={!isNewUser} />}

      <AssessmentWizardModal
        open={assessmentWizardOpen}
        onClose={() => setAssessmentWizardOpen(false)}
        onComplete={handleAssessmentComplete}
      />
    </div>
  )
}
