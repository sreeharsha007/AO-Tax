import { useState } from 'react'
import { MessageCircle, Plus } from 'lucide-react'
import Navbar from '../components/Navbar'
import MyTickets from '../components/MyTickets'
import ReferralSection from '../components/ReferralSection'
import AdvisorCard from '../components/AdvisorCard'
import UpcomingSection from '../components/UpcomingSection'
import ResourcesSection from '../components/ResourcesSection'
import NewTicketModal from '../components/NewTicketModal'
import BottomTabBar from '../components/BottomTabBar'
import BottomSheet from '../components/BottomSheet'

export default function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#f5f4f0]">
      <Navbar activePage="dashboard" dark />

      <div className="bg-[#f5f4f0] px-4 sm:px-6 md:px-8 pt-6 pb-5">
        <div className="max-w-[1280px] mx-auto">
          <p className="hidden md:block text-[10px] font-semibold text-gray-400 tracking-widest mb-3">
            DASHBOARD · TAX YEAR 2025
          </p>
          <div className="flex items-start justify-between mb-1 gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                Welcome back, Surajit.
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                Priya is two days into your return. There are two pending items from you.
              </p>
            </div>
            {/* Desktop: action buttons */}
            <div className="hidden md:flex items-center gap-2 flex-shrink-0">
              <button className="flex items-center gap-1.5 border border-gray-300 bg-white text-gray-700 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                <MessageCircle size={14} /> Message Priya
              </button>
              <button
                onClick={() => setModalOpen(true)}
                className="flex items-center gap-1.5 bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <Plus size={14} /> New filing
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 md:px-8 pb-24 md:pb-10">
        <div className="max-w-[1280px] mx-auto space-y-4">
          <div className="flex gap-4 items-start">
            <div className="flex-1 min-w-0 space-y-4">
              <MyTickets />
              <ReferralSection />
              {/* Mobile-only: resources + dates surface here instead of the sidebar */}
              <div className="md:hidden"><ResourcesSection /></div>
              <div className="md:hidden"><UpcomingSection /></div>
            </div>
            <div className="hidden md:block w-72 flex-shrink-0 space-y-4">
              <AdvisorCard />
              <UpcomingSection />
              <ResourcesSection />
            </div>
          </div>
        </div>
      </div>

      <BottomTabBar activePage="dashboard" onNewFiling={() => setModalOpen(true)} />

      {/* Floating Priya avatar — above bottom tab bar, mobile only */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed bottom-24 right-4 z-50 md:hidden w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm font-semibold shadow-xl hover:bg-purple-700 transition-colors"
      >
        PN
      </button>

      <BottomSheet open={sidebarOpen} onClose={() => setSidebarOpen(false)} title="Your advisor">
        <AdvisorCard />
      </BottomSheet>

      {modalOpen && <NewTicketModal onClose={() => setModalOpen(false)} />}
    </div>
  )
}
