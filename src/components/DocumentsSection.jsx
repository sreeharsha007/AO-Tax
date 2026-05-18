import { Upload } from 'lucide-react'

const docs = [
  { label: 'Government ID', done: true },
  { label: 'Last year\'s tax return', done: true },
  { label: 'W-2 · Primary employer', done: true },
  { label: '1099-INT · Chase', done: true },
  { label: 'Pay stubs (last 2)', done: false },
  { label: 'Mortgage interest 1098', done: false },
]

export default function DocumentsSection() {
  const pending = docs.filter((d) => !d.done).length

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-900">Documents</h3>
        {pending > 0 && (
          <span className="text-xs font-semibold text-orange-500">{pending} pending</span>
        )}
      </div>
      <div className="space-y-2.5">
        {docs.map((d) => (
          <div key={d.label} className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 ${
                d.done ? 'bg-gray-800' : 'border border-gray-300'
              }`}>
                {d.done && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span className={`text-xs ${d.done ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                {d.label}
              </span>
            </div>
            {!d.done && (
              <button className="flex items-center gap-1 text-xs text-blue-600 font-medium hover:underline">
                <Upload size={11} /> Upload
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
