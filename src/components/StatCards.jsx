export default function StatCards() {
  const cards = [
    {
      label: 'FILING STATUS',
      value: 'In review',
      badge: { text: 'Active', color: 'bg-green-100 text-green-700' },
      sub: 'Stage 3 of 6 · Advisor working',
    },
    {
      label: 'OPEN TICKETS',
      value: '1',
      badge: { text: '1 update', color: 'bg-blue-100 text-blue-700' },
      sub: 'IT Filing Services · 2025',
    },
    {
      label: 'DOCS UPLOADED',
      value: '4 / 6',
      badge: { text: 'Action', color: 'bg-orange-100 text-orange-700' },
      sub: '2 items pending from you',
    },
    {
      label: 'REFERRAL BALANCE',
      value: '$0.00',
      badge: null,
      sub: '$25 per paid referral',
    },
  ]

  return (
    <div className="grid grid-cols-4 gap-4">
      {cards.map((c) => (
        <div key={c.label} className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-[10px] font-semibold text-gray-400 tracking-widest mb-2">{c.label}</p>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl font-bold text-gray-900">{c.value}</span>
            {c.badge && (
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${c.badge.color}`}>
                {c.badge.text}
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500">{c.sub}</p>
        </div>
      ))}
    </div>
  )
}
