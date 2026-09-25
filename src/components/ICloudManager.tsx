import { useState } from 'react'
import { Cloud, CloudOff, ArrowRight, HardDrive, Wifi, CheckCircle2, Info } from 'lucide-react'

interface FileCategory {
  id: string
  name: string
  icon: string
  size: number
  frequency: 'daily' | 'weekly' | 'monthly' | 'rarely'
  recommended: 'local' | 'icloud' | 'external'
  description: string
  reason: string
}

const fileCategories: FileCategory[] = [
  {
    id: 'desktop',
    name: 'Escritorio',
    icon: '🖥️',
    size: 5.2,
    frequency: 'daily',
    recommended: 'local',
    description: 'Archivos de acceso frecuente y trabajo activo',
    reason: 'Acceso diario - mantener local para velocidad',
  },
  {
    id: 'documents',
    name: 'Documentos de Trabajo',
    icon: '📄',
    size: 12.4,
    frequency: 'daily',
    recommended: 'local',
    description: 'Documentos activos, proyectos en curso',
    reason: 'Alta frecuencia de uso - mantener local',
  },
  {
    id: 'photos-recent',
    name: 'Fotos Recientes (último año)',
    icon: '📸',
    size: 28.0,
    frequency: 'weekly',
    recommended: 'icloud',
    description: 'Fotos del último año con optimización activada',
    reason: 'Optimizar almacenamiento mantiene miniaturas localmente',
  },
  {
    id: 'photos-old',
    name: 'Fotos Antiguas (+1 año)',
    icon: '🎞️',
    size: 34.0,
    frequency: 'rarely',
    recommended: 'icloud',
    description: 'Archivo fotográfico histórico',
    reason: 'Baja frecuencia - mover a iCloud completamente',
  },
  {
    id: 'videos',
    name: 'Videos Personales',
    icon: '🎬',
    size: 22.0,
    frequency: 'rarely',
    recommended: 'external',
    description: 'Videos de gran tamaño que raramente se ven',
    reason: 'Muy grandes - disco externo o NAS recomendado',
  },
  {
    id: 'music',
    name: 'Biblioteca de Música',
    icon: '🎵',
    size: 12.0,
    frequency: 'daily',
    recommended: 'icloud',
    description: 'Apple Music con streaming + offline selectivo',
    reason: 'Usar streaming y descargar solo playlists favoritas',
  },
  {
    id: 'dev-projects',
    name: 'Proyectos de Desarrollo',
    icon: '💻',
    size: 18.5,
    frequency: 'daily',
    recommended: 'local',
    description: 'Repositorios git y código fuente activos',
    reason: 'Esenciales para el trabajo - mantener local',
  },
  {
    id: 'downloads',
    name: 'Descargas',
    icon: '📥',
    size: 7.2,
    frequency: 'weekly',
    recommended: 'local',
    description: 'Archivos descargados recientemente',
    reason: 'Limpiar mensualmente - mantener solo lo necesario',
  },
  {
    id: 'backups',
    name: 'Backups de iPhone/iPad',
    icon: '📱',
    size: 15.0,
    frequency: 'monthly',
    recommended: 'icloud',
    description: 'Backups locales de dispositivos iOS',
    reason: 'Usar iCloud Backup en su lugar - libera mucho espacio',
  },
  {
    id: 'vm-images',
    name: 'Máquinas Virtuales',
    icon: '🖥️',
    size: 12.0,
    frequency: 'rarely',
    recommended: 'external',
    description: 'Imágenes de VMs para testing',
    reason: 'Muy grandes y poco usadas - disco externo',
  },
]

export default function ICloudManager() {
  const [assignments, setAssignments] = useState<Record<string, 'local' | 'icloud' | 'external'>>(
    Object.fromEntries(fileCategories.map((f) => [f.id, f.recommended]))
  )

  const updateAssignment = (id: string, location: 'local' | 'icloud' | 'external') => {
    setAssignments((prev) => ({ ...prev, [id]: location }))
  }

  const localSize = fileCategories
    .filter((f) => assignments[f.id] === 'local')
    .reduce((acc, f) => acc + f.size, 0)
  const icloudSize = fileCategories
    .filter((f) => assignments[f.id] === 'icloud')
    .reduce((acc, f) => acc + f.size, 0)
  const externalSize = fileCategories
    .filter((f) => assignments[f.id] === 'external')
    .reduce((acc, f) => acc + f.size, 0)

  const locationConfig = {
    local: {
      label: 'En el Mac',
      icon: HardDrive,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/30',
      activeBg: 'bg-blue-600/20',
    },
    icloud: {
      label: 'iCloud',
      icon: Cloud,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/30',
      activeBg: 'bg-cyan-600/20',
    },
    external: {
      label: 'Externo',
      icon: CloudOff,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/30',
      activeBg: 'bg-purple-600/20',
    },
  }

  const frequencyLabels = {
    daily: { label: 'Diario', color: 'text-green-400' },
    weekly: { label: 'Semanal', color: 'text-blue-400' },
    monthly: { label: 'Mensual', color: 'text-amber-400' },
    rarely: { label: 'Raramente', color: 'text-gray-400' },
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-600/10 to-blue-600/10 border border-cyan-500/30 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-cyan-600/20 rounded-xl flex items-center justify-center">
            <Cloud className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg">Gestor iCloud vs Local</h3>
            <p className="text-gray-400 text-sm">
              Decide qué mantener en tu Mac y qué mover a la nube
            </p>
          </div>
        </div>
        <div className="mt-4 p-3 bg-gray-900/50 rounded-lg border border-gray-700/50">
          <p className="text-gray-400 text-xs flex items-start gap-2">
            <Info className="w-4 h-4 flex-shrink-0 mt-0.5 text-cyan-400" />
            <span>
              Con 512GB de SSD, la clave es mantener <strong className="text-white">solo lo esencial</strong> en el Mac. 
              Usa iCloud para fotos y documentos, y un disco externo para archivos grandes poco usados.
            </span>
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <HardDrive className="w-8 h-8 text-blue-400" />
            <div>
              <p className="text-gray-400 text-xs">En el Mac</p>
              <p className="text-2xl font-bold text-white">{localSize.toFixed(1)} GB</p>
              <p className="text-blue-400 text-xs">{Math.round((localSize / 512) * 100)}% del disco</p>
            </div>
          </div>
        </div>
        <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <Cloud className="w-8 h-8 text-cyan-400" />
            <div>
              <p className="text-gray-400 text-xs">En iCloud</p>
              <p className="text-2xl font-bold text-white">{icloudSize.toFixed(1)} GB</p>
              <p className="text-cyan-400 text-xs">Plan 200GB recomendado</p>
            </div>
          </div>
        </div>
        <div className="bg-purple-500/10 border border-purple-500/30 rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <Wifi className="w-8 h-8 text-purple-400" />
            <div>
              <p className="text-gray-400 text-xs">Disco Externo</p>
              <p className="text-2xl font-bold text-white">{externalSize.toFixed(1)} GB</p>
              <p className="text-purple-400 text-xs">SSD USB-C recomendado</p>
            </div>
          </div>
        </div>
      </div>

      {/* File Categories */}
      <div className="space-y-3">
        {fileCategories.map((category) => {
          const currentAssignment = assignments[category.id]
          const freq = frequencyLabels[category.frequency]
          return (
            <div
              key={category.id}
              className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-5"
            >
              <div className="flex items-start gap-4 flex-wrap">
                <span className="text-3xl">{category.icon}</span>
                <div className="flex-1 min-w-[200px]">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-white font-medium">{category.name}</h4>
                    <span className="text-white font-bold text-sm">{category.size} GB</span>
                    <span className={`text-xs ${freq.color}`}>• {freq.label}</span>
                  </div>
                  <p className="text-gray-400 text-sm mt-1">{category.description}</p>
                  <p className="text-gray-500 text-xs mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-green-400" />
                    Recomendado: {category.reason}
                  </p>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {(['local', 'icloud', 'external'] as const).map((location) => {
                    const config = locationConfig[location]
                    const Icon = config.icon
                    const isActive = currentAssignment === location
                    return (
                      <button
                        key={location}
                        onClick={() => updateAssignment(category.id, location)}
                        className={`px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
                          isActive
                            ? `${config.activeBg} ${config.color} border ${config.border}`
                            : 'bg-gray-700/30 text-gray-500 border border-gray-700/50 hover:text-gray-300'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        {config.label}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Tips */}
      <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6">
        <h3 className="text-white font-semibold text-lg mb-4">💡 Tips para MacBook Air M1</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: 'iCloud Photos con Optimización',
              text: 'Activa "Optimizar Almacenamiento" en Fotos. Las originales van a iCloud y en el Mac quedan versiones reducidas.',
              savings: '~30 GB',
            },
            {
              title: 'iCloud Drive para Documentos',
              text: 'Mueve la carpeta Documentos a iCloud Drive. Los archivos se descargan bajo demanda.',
              savings: '~12 GB',
            },
            {
              title: 'Streaming de Música',
              text: 'En Apple Music, desactiva "Descargar música nueva" y usa solo streaming. Descarga solo playlists favoritas.',
              savings: '~8 GB',
            },
            {
              title: 'Disco Externo USB-C',
              text: 'Un SSD Samsung T7 de 1TB cuesta ~$100 y es perfecto para videos, VMs y backups.',
              savings: '~25 GB',
            },
          ].map((tip) => (
            <div key={tip.title} className="bg-gray-900/50 rounded-xl p-4 border border-gray-700/30">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white text-sm font-medium">{tip.title}</h4>
                <span className="text-green-400 text-xs font-bold">-{tip.savings}</span>
              </div>
              <p className="text-gray-400 text-xs">{tip.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Visual Distribution */}
      <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6">
        <h3 className="text-white font-semibold text-lg mb-4">Distribución Visual</h3>
        <div className="flex h-8 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center transition-all duration-500"
            style={{ width: `${(localSize / (localSize + icloudSize + externalSize)) * 100}%` }}
          >
            {localSize > 10 && <span className="text-white text-xs font-bold">{localSize.toFixed(0)}GB</span>}
          </div>
          <div
            className="bg-gradient-to-r from-cyan-500 to-cyan-600 flex items-center justify-center transition-all duration-500"
            style={{ width: `${(icloudSize / (localSize + icloudSize + externalSize)) * 100}%` }}
          >
            {icloudSize > 10 && <span className="text-white text-xs font-bold">{icloudSize.toFixed(0)}GB</span>}
          </div>
          <div
            className="bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center transition-all duration-500"
            style={{ width: `${(externalSize / (localSize + icloudSize + externalSize)) * 100}%` }}
          >
            {externalSize > 10 && <span className="text-white text-xs font-bold">{externalSize.toFixed(0)}GB</span>}
          </div>
        </div>
        <div className="flex items-center gap-6 mt-4 justify-center flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-gray-400 text-xs">Mac ({localSize.toFixed(1)} GB)</span>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-600" />
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
            <span className="text-gray-400 text-xs">iCloud ({icloudSize.toFixed(1)} GB)</span>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-600" />
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span className="text-gray-400 text-xs">Externo ({externalSize.toFixed(1)} GB)</span>
          </div>
        </div>
      </div>
    </div>
  )
}
