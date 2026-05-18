import { useState } from 'react'
import { MessageCircle, Plus } from 'lucide-react'
import Navbar from '../components/Navbar'
import MyTickets from '../components/MyTickets'
import ReferralSection from '../components/ReferralSection'
import AdvisorCard from '../components/AdvisorCard'
import UpcomingSection from '../components/UpcomingSection'
import ResourcesSection from '../components/ResourcesSection'
import NewTicketModal from '../components/NewTicketModal'

export default function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#f5f4f0]">
      <Navbar activePage="dashboard" dark />

      <div className="bg-[#f5f4f0] px-8 pt-6 pb-5">
        <div className="max-w-[1280px] mx-auto">
          <p className="text-[10px] font-semibold text-gray-400 tracking-widest mb-3">
            DASHBOARD · TAX YEAR 2025
          </p>
          <div className="flex items-start justify-between mb-1">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                Welcome back, Surajit.
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                Priya is two days into your return. There are two pending items from you.
              </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
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

      <div className="px-8 pb-10">
        <div className="max-w-[1280px] mx-auto space-y-4">
          <div className="flex gap-4 items-start">
            <div className="flex-1 min-w-0 space-y-4">
              <MyTickets />
              <ReferralSection />
            </div>
            <div className="w-72 flex-shrink-0 space-y-4">
              <AdvisorCard />
              <UpcomingSection />
              <ResourcesSection />
            </div>
          </div>
        </div>
      </div>

      {modalOpen && <NewTicketModal onClose={() => setModalOpen(false)} />}
    </div>
  )
}
