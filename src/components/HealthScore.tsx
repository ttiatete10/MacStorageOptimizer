import { useEffect, useState } from 'react'

interface HealthScoreProps {
  score: number
  size?: number
}

export default function HealthScore({ score, size = 180 }: HealthScoreProps) {
  const [animatedScore, setAnimatedScore] = useState(0)
  const radius = (size - 20) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(score)
    }, 300)
    return () => clearTimeout(timer)
  }, [score])

  const getColor = () => {
    if (score >= 80) return { stroke: '#10b981', text: 'text-green-400', label: 'Excelente', bg: 'from-green-500/20 to-emerald-500/20' }
    if (score >= 60) return { stroke: '#f59e0b', text: 'text-amber-400', label: 'Bueno', bg: 'from-amber-500/20 to-yellow-500/20' }
    if (score >= 40) return { stroke: '#f97316', text: 'text-orange-400', label: 'Regular', bg: 'from-orange-500/20 to-red-500/20' }
    return { stroke: '#ef4444', text: 'text-red-400', label: 'Crítico', bg: 'from-red-500/20 to-rose-500/20' }
  }

  const color = getColor()

  return (
    <div className="relative flex flex-col items-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#374151"
          strokeWidth="10"
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color.stroke}
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000 ease-out"
          style={{
            filter: `drop-shadow(0 0 6px ${color.stroke}40)`,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-4xl font-bold ${color.text}`}>
          {animatedScore}
        </span>
        <span className="text-gray-400 text-xs mt-1">/ 100</span>
      </div>
      <div className={`mt-3 px-3 py-1 rounded-full bg-gradient-to-r ${color.bg} border border-gray-700/50`}>
        <span className={`text-xs font-medium ${color.text}`}>{color.label}</span>
      </div>
    </div>
  )
}
