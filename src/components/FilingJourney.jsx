const steps = [
  { num: '01', label: 'Intake', sub: 'Profile & prior return', state: 'complete' },
  { num: '02', label: 'Documents', sub: 'W-2, 1099, receipts', state: 'complete' },
  { num: '03', label: 'Advisor Review', sub: 'In progress', state: 'active' },
  { num: '04', label: 'Tax Draft', sub: 'Free draft sent for review', state: 'upcoming' },
  { num: '05', label: 'Your Approval', sub: 'Sign & confirm', state: 'upcoming' },
  { num: '06', label: 'Filed', sub: 'IRS confirmation', state: 'upcoming' },
]

export default function FilingJourney() {
  const completeCount = steps.filter((s) => s.state === 'complete').length
  const activeIdx = steps.findIndex((s) => s.state === 'active')
  const progressPct = ((completeCount + 0.5) / steps.length) * 100

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-900 text-sm">Filing journey</h3>
          <p className="text-xs text-gray-500">Where your 2025 return stands</p>
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-gray-800 inline-block" /> Complete
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" /> In progress
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full border border-gray-300 inline-block" /> Upcoming
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative h-1.5 bg-gray-100 rounded-full mb-5">
        <div
          className="absolute h-full bg-blue-500 rounded-full transition-all"
          style={{ width: `${progressPct}%` }}
        />
        {steps.map((_, i) => (
          <div
            key={i}
            className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 ${
              i < completeCount
                ? 'bg-gray-800 border-gray-800'
                : i === activeIdx
                ? 'bg-blue-500 border-blue-500'
                : 'bg-white border-gray-300'
            }`}
            style={{ left: `calc(${(i / (steps.length - 1)) * 100}% - 6px)` }}
          />
        ))}
      </div>

      {/* Step labels */}
      <div className="grid grid-cols-6 gap-1">
        {steps.map((s) => (
          <div key={s.num} className="text-center">
            <p className={`text-[10px] font-semibold ${s.state === 'upcoming' ? 'text-gray-400' : 'text-gray-600'}`}>
              {s.num}
            </p>
            <p className={`text-xs font-medium leading-tight ${s.state === 'upcoming' ? 'text-gray-400' : 'text-gray-800'}`}>
              {s.label}
            </p>
            <p className={`text-[10px] leading-tight mt-0.5 ${s.state === 'upcoming' ? 'text-gray-300' : 'text-gray-400'}`}>
              {s.sub}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
