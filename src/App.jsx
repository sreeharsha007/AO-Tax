import { Routes, Route } from 'react-router-dom'
import DemoHub from './pages/DemoHub'
import Dashboard from './pages/Dashboard'
import TicketDetailsPage from './pages/TicketDetailsPage'
import LoginPage from './pages/LoginPage'
import SignupFlow from './pages/SignupFlow'
import ExistingUserLogin from './pages/ExistingUserLogin'
import InvitePage from './pages/InvitePage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<DemoHub />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/tickets/:id" element={<TicketDetailsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/auth" element={<ExistingUserLogin />} />
      <Route path="/signup" element={<SignupFlow />} />
      <Route path="/invite" element={<InvitePage />} />
    </Routes>
  )
}
