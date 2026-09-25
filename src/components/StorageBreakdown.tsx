import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { FolderOpen, FileText, Image, Film, Music, Archive, Code, Database } from 'lucide-react'

const categories = [
  {
    name: 'Aplicaciones',
    size: 85,
    icon: FolderOpen,
    color: '#8b5cf6',
    items: [
      { name: 'Xcode', size: 32 },
      { name: 'Adobe Creative Suite', size: 18 },
      { name: 'Microsoft Office', size: 8 },
      { name: 'Docker', size: 12 },
      { name: 'Otras Apps', size: 15 },
    ],
  },
  {
    name: 'Documentos',
    size: 45,
    icon: FileText,
    color: '#06b6d4',
    items: [
      { name: 'PDFs', size: 12 },
      { name: 'Proyectos', size: 18 },
      { name: 'Descargas', size: 10 },
      { name: 'Escritorio', size: 5 },
    ],
  },
  {
    name: 'Fotos y Videos',
    size: 62,
    icon: Image,
    color: '#f59e0b',
    items: [
      { name: 'Fotos (HEIC/JPG)', size: 28 },
      { name: 'Videos', size: 22 },
      { name: 'Screenshots', size: 8 },
      { name: 'Live Photos', size: 4 },
    ],
  },
  {
    name: 'Música',
    size: 18,
    icon: Music,
    color: '#ec4899',
    items: [
      { name: 'Apple Music Offline', size: 12 },
      { name: 'Archivos FLAC/MP3', size: 6 },
    ],
  },
  {
    name: 'Desarrollo',
    size: 42,
    icon: Code,
    color: '#10b981',
    items: [
      { name: 'node_modules', size: 15 },
      { name: 'Git Repos', size: 12 },
      { name: 'Xcode DerivedData', size: 8 },
      { name: 'Simulators', size: 7 },
    ],
  },
  {
    name: 'Caché y Temporal',
    size: 28,
    icon: Database,
    color: '#ef4444',
    items: [
      { name: 'Navegadores', size: 8 },
      { name: 'Sistema', size: 10 },
      { name: 'Apps', size: 6 },
      { name: 'Logs', size: 4 },
    ],
  },
  {
    name: 'Archivos Grandes',
    size: 22,
    icon: Archive,
    color: '#f97316',
    items: [
      { name: 'Máquinas Virtuales', size: 12 },
      { name: 'DMG/ISO', size: 6 },
      { name: 'Backups', size: 4 },
    ],
  },
]

const chartData = categories.map((cat) => ({
  name: cat.name,
  size: cat.size,
  fill: cat.color,
}))

export default function StorageBreakdown() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const selectedCat = categories.find((c) => c.name === selectedCategory)

  return (
    <div className="space-y-8">
      {/* Chart */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
        <h3 className="text-white font-semibold text-lg mb-6">Uso por Categoría (GB)</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '12px',
                  color: '#fff',
                }}
                formatter={(value: number) => [`${value} GB`, 'Tamaño']}
              />
              <Bar dataKey="size" radius={[8, 8, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => {
          const Icon = category.icon
          return (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(
                selectedCategory === category.name ? null : category.name
              )}
              className={`bg-gray-800/50 backdrop-blur-sm border rounded-2xl p-5 text-left transition-all duration-200 hover:scale-[1.02] ${
                selectedCategory === category.name
                  ? 'border-blue-500/50 ring-1 ring-blue-500/30'
                  : 'border-gray-700/50'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${category.color}20` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: category.color }} />
                  </div>
                  <span className="text-white font-medium">{category.name}</span>
                </div>
                <span className="text-white font-bold">{category.size} GB</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${(category.size / 512) * 100}%`,
                    backgroundColor: category.color,
                  }}
                ></div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Detail Panel */}
      {selectedCat && (
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 animate-in">
          <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: selectedCat.color }}
            ></span>
            Detalle: {selectedCat.name}
          </h3>
          <div className="space-y-3">
            {selectedCat.items.map((item) => (
              <div key={item.name} className="flex items-center justify-between py-2 border-b border-gray-700/30 last:border-0">
                <span className="text-gray-300">{item.name}</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 bg-gray-700 rounded-full h-1.5">
                    <div
                      className="h-1.5 rounded-full"
                      style={{
                        width: `${(item.size / selectedCat.size) * 100}%`,
                        backgroundColor: selectedCat.color,
                      }}
                    ></div>
                  </div>
                  <span className="text-white text-sm font-medium w-12 text-right">
                    {item.size} GB
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}


