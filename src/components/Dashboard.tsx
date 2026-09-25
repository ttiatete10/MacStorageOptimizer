import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { HardDrive, AlertTriangle, CheckCircle, Zap } from 'lucide-react'

const storageData = [
  { name: 'Sistema', value: 35, color: '#6366f1' },
  { name: 'Aplicaciones', value: 85, color: '#8b5cf6' },
  { name: 'Documentos', value: 45, color: '#06b6d4' },
  { name: 'Fotos/Videos', value: 62, color: '#f59e0b' },
  { name: 'Caché', value: 28, color: '#ef4444' },
  { name: 'Otros', value: 18, color: '#10b981' },
  { name: 'Disponible', value: 239, color: '#374151' },
]

const totalStorage = 512
const usedStorage = 273
const freeStorage = 239
const percentageUsed = Math.round((usedStorage / totalStorage) * 100)

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Storage Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-600/20 rounded-xl flex items-center justify-center">
              <HardDrive className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Almacenamiento Total</p>
              <p className="text-2xl font-bold text-white">{totalStorage} GB</p>
            </div>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${percentageUsed}%` }}
            ></div>
          </div>
          <p className="text-gray-500 text-xs mt-2">{percentageUsed}% utilizado</p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-amber-600/20 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Espacio Usado</p>
              <p className="text-2xl font-bold text-white">{usedStorage} GB</p>
            </div>
          </div>
          <p className="text-gray-500 text-xs">
            {usedStorage - 200} GB más que el mes pasado
          </p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-600/20 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Espacio Libre</p>
              <p className="text-2xl font-bold text-white">{freeStorage} GB</p>
            </div>
          </div>
          <p className="text-green-400 text-xs flex items-center gap-1">
            <Zap className="w-3 h-3" /> Nivel saludable
          </p>
        </div>
      </div>

      {/* Main Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
          <h3 className="text-white font-semibold text-lg mb-4">Distribución del Almacenamiento</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={storageData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {storageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '12px',
                    color: '#fff',
                  }}
                  formatter={(value: number) => [`${value} GB`, '']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
          <h3 className="text-white font-semibold text-lg mb-4">Resumen por Categoría</h3>
          <div className="space-y-4">
            {storageData.slice(0, 6).map((item) => (
              <div key={item.name} className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-gray-300 text-sm flex-1">{item.name}</span>
                <span className="text-white text-sm font-medium">{item.value} GB</span>
                <div className="w-24 bg-gray-700 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-1000"
                    style={{
                      width: `${(item.value / totalStorage) * 100}%`,
                      backgroundColor: item.color,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
        <h3 className="text-white font-semibold text-lg mb-4">Acciones Rápidas</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Limpiar Caché', size: '28 GB', icon: '🧹', color: 'from-red-500/20 to-orange-500/20' },
            { label: 'Archivos Duplicados', size: '12 GB', icon: '📋', color: 'from-blue-500/20 to-cyan-500/20' },
            { label: 'Papelera', size: '5.2 GB', icon: '🗑️', color: 'from-purple-500/20 to-pink-500/20' },
            { label: 'Logs del Sistema', size: '3.8 GB', icon: '📄', color: 'from-green-500/20 to-emerald-500/20' },
          ].map((action) => (
            <button
              key={action.label}
              className={`bg-gradient-to-br ${action.color} border border-gray-700/50 rounded-xl p-4 text-left hover:scale-105 transition-transform duration-200`}
            >
              <span className="text-2xl">{action.icon}</span>
              <p className="text-white text-sm font-medium mt-2">{action.label}</p>
              <p className="text-gray-400 text-xs">{action.size} recuperables</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
