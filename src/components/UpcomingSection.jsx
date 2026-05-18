const events = [
  { title: 'Estimated payment due', sub: 'IRS deadline', month: 'May', day: '28', year: '2026', accent: 'bg-orange-400' },
  { title: 'Q2 estimate · self-employed', sub: 'IRS deadline', month: 'Jun', day: '15', year: '2026', accent: 'bg-orange-400' },
  { title: 'Quarterly check-in with Priya', sub: 'Internal', month: 'Jul', day: '10', year: '2026', accent: 'bg-blue-400' },
]

export default function UpcomingSection() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-900">Upcoming</h3>
        <button className="text-xs text-blue-600 font-medium hover:underline">View all</button>
      </div>
      <div className="space-y-3">
        {events.map((e) => (
          <div key={e.title} className="flex items-center gap-3">
            <div className={`w-1 h-9 rounded-full ${e.accent} flex-shrink-0`} />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-gray-800 truncate">{e.title}</p>
              <p className="text-[11px] text-gray-400">{e.sub}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-xs font-semibold text-gray-700">{e.month} {e.day}</p>
              <p className="text-[11px] text-gray-400">{e.year}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
