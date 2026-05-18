import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function FloatingConceptPanel({
  layouts,
  activeLayout,
  onSwitchLayout,
  activeScenario,
  onSwitchScenario,
}) {
  const current = layouts.find(l => l.key === activeLayout)
  const scenarios = current?.scenarios ?? []
  const isConceptLayout = !!current?.scenarios

  const liveLayouts    = layouts.filter(l => !l.scenarios)
  const conceptLayouts = layouts.filter(l =>  l.scenarios)

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">

        {/* Layout row */}
        <div className="flex items-center px-2 py-2 gap-0.5">
          {liveLayouts.map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              onClick={() => onSwitchLayout(key)}
              aria-label={`Switch to ${label} layout`}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeLayout === key
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-400 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon size={13} />
              {label}
            </button>
          ))}

          <div className="w-px h-4 bg-gray-200 mx-1.5 flex-shrink-0" />

          <div className="flex items-center gap-0.5">
            <span className="text-[9px] font-bold text-gray-300 tracking-widest uppercase px-1.5 flex-shrink-0">
              Concepts
            </span>
            {conceptLayouts.map(({ key, icon: Icon, label }) => (
              <button
                key={key}
                onClick={() => onSwitchLayout(key)}
                aria-label={`Switch to ${label} concept`}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activeLayout === key
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon size={13} />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Scenario row — only for concept layouts */}
        {isConceptLayout && scenarios.length > 0 && (
          <div className="border-t border-gray-100 flex items-center gap-3 px-3 py-2">
            <span className="text-[9px] font-bold text-blue-400 tracking-widest uppercase flex-shrink-0 w-14">
              State
            </span>
            <div className="flex items-center gap-1.5 flex-1 justify-center">
              <button
                onClick={() => onSwitchScenario(Math.max(0, activeScenario - 1))}
                disabled={activeScenario === 0}
                className="p-0.5 text-gray-300 hover:text-gray-600 disabled:opacity-20 transition-colors flex-shrink-0"
              >
                <ChevronLeft size={14} />
              </button>
              <span className="text-xs font-medium text-gray-700 min-w-[180px] text-center">
                {scenarios[activeScenario]}
              </span>
              <button
                onClick={() => onSwitchScenario(Math.min(scenarios.length - 1, activeScenario + 1))}
                disabled={activeScenario === scenarios.length - 1}
                className="p-0.5 text-gray-300 hover:text-gray-600 disabled:opacity-20 transition-colors flex-shrink-0"
              >
                <ChevronRight size={14} />
              </button>
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0 w-14 justify-end">
              {scenarios.map((_, i) => (
                <button
                  key={i}
                  onClick={() => onSwitchScenario(i)}
                  className={`rounded-full transition-all duration-200 ${
                    i === activeScenario
                      ? 'w-4 h-1.5 bg-blue-500'
                      : 'w-1.5 h-1.5 bg-gray-200 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
