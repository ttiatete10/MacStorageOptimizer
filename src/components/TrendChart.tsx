import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'

const monthlyData = [
  { month: 'Jul', used: 195, free: 317 },
  { month: 'Ago', used: 210, free: 302 },
  { month: 'Sep', used: 225, free: 287 },
  { month: 'Oct', used: 238, free: 274 },
  { month: 'Nov', used: 252, free: 260 },
  { month: 'Dic', used: 260, free: 252 },
  { month: 'Ene', used: 268, free: 244 },
  { month: 'Feb', used: 273, free: 239 },
]

const weeklyData = [
  { day: 'Lun', cache: 22, apps: 85, docs: 40 },
  { day: 'Mar', cache: 24, apps: 85, docs: 41 },
  { day: 'Mié', cache: 25, apps: 85, docs: 42 },
  { day: 'Jue', cache: 26, apps: 86, docs: 43 },
  { day: 'Vie', cache: 28, apps: 86, docs: 44 },
  { day: 'Sáb', cache: 27, apps: 85, docs: 45 },
  { day: 'Dom', cache: 28, apps: 85, docs: 45 },
]

export default function TrendChart() {
  const avgGrowthPerMonth = 11.3
  const monthsUntilFull = Math.round((512 - 273) / avgGrowthPerMonth)

  return (
    <div className="space-y-6">
      {/* Monthly Trend */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-white font-semibold text-lg">Tendencia Mensual</h3>
            <p className="text-gray-400 text-sm mt-1">Evolución del uso de almacenamiento</p>
          </div>
          <div className="text-right">
            <p className="text-amber-400 text-sm font-medium">+{avgGrowthPerMonth} GB/mes</p>
            <p className="text-gray-500 text-xs">crecimiento promedio</p>
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id="colorUsed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorFree" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '12px',
                  color: '#fff',
                }}
                formatter={(value: number, name: string) => [
                  `${value} GB`,
                  name === 'used' ? 'Usado' : 'Libre',
                ]}
              />
              <Area
                type="monotone"
                dataKey="used"
                stroke="#6366f1"
                strokeWidth={2}
                fill="url(#colorUsed)"
              />
              <Area
                type="monotone"
                dataKey="free"
                stroke="#10b981"
                strokeWidth={2}
                fill="url(#colorFree)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Prediction Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-2xl p-5">
          <p className="text-amber-400 text-xs font-medium uppercase tracking-wider">Proyección</p>
          <p className="text-3xl font-bold text-white mt-2">{monthsUntilFull}</p>
          <p className="text-gray-400 text-sm mt-1">meses hasta llenar el disco</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-2xl p-5">
          <p className="text-blue-400 text-xs font-medium uppercase tracking-wider">Crecimiento Semanal</p>
          <p className="text-3xl font-bold text-white mt-2">+2.8 GB</p>
          <p className="text-gray-400 text-sm mt-1">promedio por semana</p>
        </div>
        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-2xl p-5">
          <p className="text-green-400 text-xs font-medium uppercase tracking-wider">Con Limpieza</p>
          <p className="text-3xl font-bold text-white mt-2">+8 meses</p>
          <p className="text-gray-400 text-sm mt-1">de vida útil extra</p>
        </div>
      </div>

      {/* Weekly Breakdown */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-white font-semibold text-lg">Actividad Semanal</h3>
            <p className="text-gray-400 text-sm mt-1">Categorías que más crecieron esta semana</p>
          </div>
        </div>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weeklyData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="day" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '12px',
                  color: '#fff',
                }}
              />
              <Line type="monotone" dataKey="cache" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} name="Caché" />
              <Line type="monotone" dataKey="apps" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4 }} name="Apps" />
              <Line type="monotone" dataKey="docs" stroke="#06b6d4" strokeWidth={2} dot={{ r: 4 }} name="Documentos" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center gap-6 mt-4 justify-center">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-gray-400 text-xs">Caché</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span className="text-gray-400 text-xs">Apps</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
            <span className="text-gray-400 text-xs">Documentos</span>
          </div>
        </div>
      </div>
    </div>
  )
}
