export default function CircularProgress({ progress }) {
  const size = 18
  const strokeWidth = 2
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - progress / 100)
  const isComplete = progress === 100
  const cx = size / 2
  const cy = size / 2

  return (
    <svg width={size} height={size} className="flex-shrink-0 -rotate-90" aria-hidden="true">
      <circle cx={cx} cy={cy} r={radius} fill="none" stroke="#e5e7eb" strokeWidth={strokeWidth} />
      {progress > 0 && (
        <circle
          cx={cx} cy={cy} r={radius}
          fill="none" stroke="#3b82f6" strokeWidth={strokeWidth}
          strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round"
        />
      )}
      {isComplete && (
        <g transform={`rotate(90 ${cx} ${cy})`}>
          <polyline
            points="5.5,9.5 7.5,11.5 12.5,6.5"
            fill="none" stroke="#3b82f6" strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round"
          />
        </g>
      )}
    </svg>
  )
}
