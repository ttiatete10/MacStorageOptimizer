import { useState } from 'react'
import { Search, ArrowDown, ArrowUp, Trash2, ExternalLink, Zap, Package, Star } from 'lucide-react'

type SortKey = 'name' | 'size' | 'lastUsed'

interface App {
  name: string
  size: number
  lastUsed: string
  category: string
  icon: string
  alternative?: { name: string; size: number; icon: string }
  canDelete: boolean
}

const apps: App[] = [
  { name: 'Xcode', size: 32.4, lastUsed: 'Hace 2 días', category: 'Desarrollo', icon: '🔨', alternative: { name: 'VS Code + Extensiones', size: 1.2, icon: '💻' }, canDelete: true },
  { name: 'Adobe Photoshop', size: 8.2, lastUsed: 'Hace 1 semana', category: 'Diseño', icon: '🎨', alternative: { name: 'Pixelmator Pro', size: 0.8, icon: '🖼️' }, canDelete: true },
  { name: 'Adobe Illustrator', size: 6.8, lastUsed: 'Hace 3 semanas', category: 'Diseño', icon: '✏️', alternative: { name: 'Affinity Designer', size: 0.6, icon: '🎯' }, canDelete: true },
  { name: 'Adobe Premiere', size: 4.5, lastUsed: 'Hace 2 meses', category: 'Video', icon: '🎬', alternative: { name: 'DaVinci Resolve', size: 2.1, icon: '🎥' }, canDelete: true },
  { name: 'Docker Desktop', size: 6.2, lastUsed: 'Hace 1 día', category: 'Desarrollo', icon: '🐳', alternative: { name: 'Colima (CLI)', size: 0.3, icon: '⚙️' }, canDelete: true },
  { name: 'Microsoft Office', size: 8.1, lastUsed: 'Hace 3 días', category: 'Oficina', icon: '📊', alternative: { name: 'iWork Suite', size: 1.5, icon: '📈' }, canDelete: true },
  { name: 'Visual Studio Code', size: 1.2, lastUsed: 'Hace 1 hora', category: 'Desarrollo', icon: '💻', canDelete: true },
  { name: 'Google Chrome', size: 2.8, lastUsed: 'Hace 5 min', category: 'Navegador', icon: '🌐', alternative: { name: 'Safari', size: 0.4, icon: '🧭' }, canDelete: true },
  { name: 'Spotify', size: 0.9, lastUsed: 'Hace 2 horas', category: 'Música', icon: '🎵', canDelete: true },
  { name: 'Slack', size: 1.4, lastUsed: 'Hace 30 min', category: 'Comunicación', icon: '💬', alternative: { name: 'Web version', size: 0, icon: '🌍' }, canDelete: true },
  { name: 'Figma', size: 0.6, lastUsed: 'Hace 4 horas', category: 'Diseño', icon: '🎨', canDelete: true },
  { name: 'Notion', size: 0.8, lastUsed: 'Hace 1 hora', category: 'Productividad', icon: '📝', canDelete: true },
  { name: 'Final Cut Pro', size: 5.2, lastUsed: 'Hace 3 meses', category: 'Video', icon: '🎞️', alternative: { name: 'iMovie', size: 1.8, icon: '🎬' }, canDelete: true },
  { name: 'Logic Pro', size: 3.4, lastUsed: 'Hace 1 mes', category: 'Audio', icon: '🎹', alternative: { name: 'GarageBand', size: 1.2, icon: '🎸' }, canDelete: true },
  { name: 'Parallels Desktop', size: 4.8, lastUsed: 'Hace 2 meses', category: 'Virtualización', icon: '🪟', alternative: { name: 'UTM (gratis)', size: 0.5, icon: '🖥️' }, canDelete: true },
  { name: 'Zoom', size: 0.7, lastUsed: 'Hace 1 día', category: 'Comunicación', icon: '📹', canDelete: true },
]

const categories = ['Todas', 'Desarrollo', 'Diseño', 'Video', 'Oficina', 'Navegador', 'Música', 'Comunicación', 'Productividad', 'Audio', 'Virtualización']

export default function AppManager() {
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('size')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
  const [category, setCategory] = useState('Todas')
  const [markedForDelete, setMarkedForDelete] = useState<string[]>([])
  const [showAlternatives, setShowAlternatives] = useState(false)

  const toggleDelete = (name: string) => {
    setMarkedForDelete((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    )
  }

  const filteredApps = apps
    .filter((app) => {
      const matchesSearch = app.name.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = category === 'Todas' || app.category === category
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      const modifier = sortDir === 'asc' ? 1 : -1
      if (sortKey === 'size') return (a.size - b.size) * modifier
      return a.name.localeCompare(b.name) * modifier
    })

  const totalMarkedSize = apps
    .filter((a) => markedForDelete.includes(a.name))
    .reduce((acc, a) => acc + a.size, 0)

  const potentialSavings = apps
    .filter((a) => a.alternative)
    .reduce((acc, a) => acc + (a.size - a.alternative!.size), 0)

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDir('desc')
    }
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-600/20 rounded-xl flex items-center justify-center">
              <Package className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-gray-400 text-xs">Apps Instaladas</p>
              <p className="text-2xl font-bold text-white">{apps.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-600/20 rounded-xl flex items-center justify-center">
              <Trash2 className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <p className="text-gray-400 text-xs">Marcadas para eliminar</p>
              <p className="text-2xl font-bold text-white">{totalMarkedSize.toFixed(1)} GB</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-600/20 rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-gray-400 text-xs">Ahorro con alternativas</p>
              <p className="text-2xl font-bold text-white">{potentialSavings.toFixed(1)} GB</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Buscar app..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gray-900/50 border border-gray-700 rounded-xl pl-10 pr-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500/50"
            />
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500/50"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <button
            onClick={() => setShowAlternatives(!showAlternatives)}
            className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              showAlternatives
                ? 'bg-green-600/20 text-green-400 border border-green-500/30'
                : 'bg-gray-900/50 text-gray-400 border border-gray-700 hover:text-white'
            }`}
          >
            <span className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              Ver alternativas
            </span>
          </button>
        </div>
      </div>

      {/* Table Header */}
      <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-2 text-xs text-gray-500 uppercase tracking-wider">
        <div className="col-span-1"></div>
        <button
          onClick={() => toggleSort('name')}
          className="col-span-4 text-left flex items-center gap-1 hover:text-white transition-colors"
        >
          App {sortKey === 'name' && (sortDir === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />)}
        </button>
        <div className="col-span-2">Categoría</div>
        <button
          onClick={() => toggleSort('size')}
          className="col-span-2 text-left flex items-center gap-1 hover:text-white transition-colors"
        >
          Tamaño {sortKey === 'size' && (sortDir === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />)}
        </button>
        <div className="col-span-2">Último uso</div>
        <div className="col-span-1"></div>
      </div>

      {/* App List */}
      <div className="space-y-2">
        {filteredApps.map((app) => {
          const isMarked = markedForDelete.includes(app.name)
          return (
            <div
              key={app.name}
              className={`bg-gray-800/50 border rounded-xl p-4 transition-all duration-200 ${
                isMarked
                  ? 'border-red-500/50 bg-red-500/5'
                  : 'border-gray-700/50 hover:border-gray-600/50'
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                <div className="md:col-span-1 flex items-center justify-center">
                  <span className="text-3xl">{app.icon}</span>
                </div>
                <div className="md:col-span-4">
                  <p className="text-white font-medium">{app.name}</p>
                  {showAlternatives && app.alternative && (
                    <div className="mt-2 flex items-center gap-2 text-xs">
                      <span className="text-green-400 flex items-center gap-1">
                        <Zap className="w-3 h-3" />
                        Alternativa: {app.alternative.icon} {app.alternative.name}
                      </span>
                      <span className="text-gray-500">
                        ({app.alternative.size} GB vs {app.size} GB)
                      </span>
                    </div>
                  )}
                </div>
                <div className="md:col-span-2">
                  <span className="text-xs text-gray-400 bg-gray-700/50 px-2 py-1 rounded-md">
                    {app.category}
                  </span>
                </div>
                <div className="md:col-span-2">
                  <p className="text-white font-medium">{app.size} GB</p>
                  <div className="w-full bg-gray-700 rounded-full h-1 mt-1">
                    <div
                      className="h-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                      style={{ width: `${Math.min((app.size / 35) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <p className="text-gray-400 text-sm">{app.lastUsed}</p>
                </div>
                <div className="md:col-span-1 flex justify-end gap-2">
                  <button
                    onClick={() => toggleDelete(app.name)}
                    className={`p-2 rounded-lg transition-colors ${
                      isMarked
                        ? 'bg-red-600/20 text-red-400'
                        : 'bg-gray-700/50 text-gray-400 hover:text-red-400'
                    }`}
                    title={isMarked ? 'Quitar de la lista' : 'Marcar para eliminar'}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {filteredApps.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No se encontraron apps</p>
        </div>
      )}

      {/* Action Bar */}
      {markedForDelete.length > 0 && (
        <div className="sticky bottom-4 bg-gray-900/95 backdrop-blur-xl border border-red-500/30 rounded-2xl p-4 flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-white font-medium">
              {markedForDelete.length} app{markedForDelete.length > 1 ? 's' : ''} marcada{markedForDelete.length > 1 ? 's' : ''}
            </p>
            <p className="text-gray-400 text-sm">
              Espacio a liberar: <span className="text-red-400 font-bold">{totalMarkedSize.toFixed(1)} GB</span>
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setMarkedForDelete([])}
              className="px-4 py-2 bg-gray-700 text-white rounded-xl text-sm hover:bg-gray-600 transition-colors"
            >
              Cancelar
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              Desinstalar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
