import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import TicketDetailsPage from './pages/TicketDetailsPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/tickets/:id" element={<TicketDetailsPage />} />
    </Routes>
  )
}
