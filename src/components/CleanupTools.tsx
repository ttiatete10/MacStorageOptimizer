import { useState } from 'react'
import { Terminal, Copy, Check, Calculator, FolderSearch, Trash2, RefreshCw } from 'lucide-react'

const tools = [
  {
    id: 'scanner',
    name: 'Escáner de Archivos Grandes',
    description: 'Encuentra archivos que ocupan más de 1GB en tu sistema',
    icon: FolderSearch,
    color: 'from-cyan-500/20 to-blue-500/20',
    borderColor: 'border-cyan-500/30',
  },
  {
    id: 'calculator',
    name: 'Calculadora de Espacio',
    description: 'Calcula cuánto espacio puedes recuperar',
    icon: Calculator,
    color: 'from-purple-500/20 to-pink-500/20',
    borderColor: 'border-purple-500/30',
  },
  {
    id: 'commands',
    name: 'Comandos Útiles',
    description: 'Comandos de Terminal para optimizar almacenamiento',
    icon: Terminal,
    color: 'from-green-500/20 to-emerald-500/20',
    borderColor: 'border-green-500/30',
  },
  {
    id: 'maintenance',
    name: 'Plan de Mantenimiento',
    description: 'Programa de limpieza periódica recomendado',
    icon: RefreshCw,
    color: 'from-amber-500/20 to-orange-500/20',
    borderColor: 'border-amber-500/30',
  },
]

const commands = [
  {
    category: 'Análisis de Espacio',
    items: [
      {
        name: 'Ver uso del disco',
        command: 'df -h /',
        description: 'Muestra el espacio total, usado y disponible',
      },
      {
        name: 'Top 20 carpetas más grandes',
        command: 'du -sh ~/*/ 2>/dev/null | sort -rh | head -20',
        description: 'Lista las carpetas del home ordenadas por tamaño',
      },
      {
        name: 'Archivos mayores a 500MB',
        command: 'find / -size +500M -type f 2>/dev/null | head -20',
        description: 'Busca archivos grandes en todo el sistema',
      },
    ],
  },
  {
    category: 'Limpieza',
    items: [
      {
        name: 'Limpiar caché del usuario',
        command: 'rm -rf ~/Library/Caches/*',
        description: 'Elimina archivos temporales de aplicaciones',
      },
      {
        name: 'Limpiar logs del sistema',
        command: 'sudo rm -rf /var/log/asl/*.asl',
        description: 'Elimina logs antiguos del sistema',
      },
      {
        name: 'Limpiar Xcode DerivedData',
        command: 'rm -rf ~/Library/Developer/Xcode/DerivedData/*',
        description: 'Limpia datos compilados de Xcode',
      },
      {
        name: 'Limpiar Homebrew',
        command: 'brew cleanup --prune=all',
        description: 'Elimina versiones antiguas de paquetes',
      },
      {
        name: 'Limpiar npm cache',
        command: 'npm cache clean --force',
        description: 'Limpia la caché de npm',
      },
      {
        name: 'Limpiar pip cache',
        command: 'pip cache purge',
        description: 'Limpia la caché de pip de Python',
      },
    ],
  },
  {
    category: 'Docker',
    items: [
      {
        name: 'Limpiar imágenes no usadas',
        command: 'docker image prune -a',
        description: 'Elimina imágenes que no están en uso',
      },
      {
        name: 'Limpieza total de Docker',
        command: 'docker system prune -a --volumes',
        description: 'Elimina todo lo no utilizado (contenedores, imágenes, volúmenes)',
      },
    ],
  },
  {
    category: 'Desarrollo',
    items: [
      {
        name: 'Buscar node_modules',
        command: 'find ~/Projects -name "node_modules" -type d -prune | xargs du -sh',
        description: 'Lista todos los node_modules con su tamaño',
      },
      {
        name: 'Eliminar node_modules antiguos',
        command: 'find ~/Projects -name "node_modules" -type d -mtime +90 -prune -exec rm -rf {} \\;',
        description: 'Elimina node_modules de proyectos sin modificar en 90+ días',
      },
      {
        name: 'Limpiar git repos sin uso',
        command: 'find ~/Projects -name ".git" -type d -mtime +180',
        description: 'Encuentra repos git sin actividad en 180+ días',
      },
    ],
  },
]

const maintenanceSchedule = [
  {
    frequency: 'Diario',
    tasks: ['Vaciar papelera', 'Cerrar apps no utilizadas', 'Revisar descargas completadas'],
    icon: '📅',
    color: 'text-blue-400',
  },
  {
    frequency: 'Semanal',
    tasks: ['Limpiar caché de navegadores', 'Revisar carpeta Descargas', 'Eliminar screenshots innecesarios'],
    icon: '📆',
    color: 'text-green-400',
  },
  {
    frequency: 'Mensual',
    tasks: ['Limpiar caché del sistema', 'Revisar apps no utilizadas', 'Optimizar biblioteca de Fotos', 'Limpiar Docker si aplica'],
    icon: '🗓️',
    color: 'text-amber-400',
  },
  {
    frequency: 'Trimestral',
    tasks: ['Análisis profundo con herramientas', 'Desinstalar apps obsoletas', 'Backup y limpieza de archivos grandes', 'Revisar suscripción iCloud'],
    icon: '📊',
    color: 'text-purple-400',
  },
]

export default function CleanupTools() {
  const [activeTool, setActiveTool] = useState<string>('commands')
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null)
  const [calcValues, setCalcValues] = useState({
    nodeModules: 15,
    docker: 12,
    cache: 28,
    photos: 20,
    trash: 5,
    apps: 18,
  })

  const copyToClipboard = (command: string) => {
    navigator.clipboard.writeText(command)
    setCopiedCommand(command)
    setTimeout(() => setCopiedCommand(null), 2000)
  }

  const totalRecoverable = Object.values(calcValues).reduce((a, b) => a + b, 0)

  return (
    <div className="space-y-8">
      {/* Tool Selector */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {tools.map((tool) => {
          const Icon = tool.icon
          const isActive = activeTool === tool.id
          return (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id)}
              className={`bg-gradient-to-br ${tool.color} border ${tool.borderColor} rounded-2xl p-5 text-left transition-all duration-200 hover:scale-[1.03] ${
                isActive ? 'ring-2 ring-blue-500/50 scale-[1.02]' : ''
              }`}
            >
              <Icon className="w-8 h-8 text-white mb-3" />
              <h4 className="text-white font-medium text-sm">{tool.name}</h4>
              <p className="text-gray-400 text-xs mt-1">{tool.description}</p>
            </button>
          )
        })}
      </div>

      {/* Tool Content */}
      {activeTool === 'commands' && (
        <div className="space-y-6">
          {commands.map((section) => (
            <div
              key={section.category}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6"
            >
              <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
                <Terminal className="w-5 h-5 text-green-400" />
                {section.category}
              </h3>
              <div className="space-y-3">
                {section.items.map((item) => (
                  <div
                    key={item.name}
                    className="bg-gray-900/50 rounded-xl p-4 border border-gray-700/30"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <p className="text-white text-sm font-medium">{item.name}</p>
                        <p className="text-gray-500 text-xs mt-1">{item.description}</p>
                        <div className="mt-2 flex items-center gap-2 bg-gray-900 rounded-lg p-2 border border-gray-700/50">
                          <code className="text-green-400 text-xs font-mono flex-1 break-all">
                            $ {item.command}
                          </code>
                          <button
                            onClick={() => copyToClipboard(item.command)}
                            className="p-1.5 hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0"
                            title="Copiar comando"
                          >
                            {copiedCommand === item.command ? (
                              <Check className="w-4 h-4 text-green-400" />
                            ) : (
                              <Copy className="w-4 h-4 text-gray-400" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTool === 'calculator' && (
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
          <h3 className="text-white font-semibold text-lg mb-6 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-purple-400" />
            Calculadora de Espacio Recuperable
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {[
                { key: 'nodeModules', label: 'node_modules (GB)', max: 50 },
                { key: 'docker', label: 'Docker (GB)', max: 50 },
                { key: 'cache', label: 'Caché del sistema (GB)', max: 50 },
                { key: 'photos', label: 'Fotos optimizables (GB)', max: 100 },
                { key: 'trash', label: 'Papelera (GB)', max: 30 },
                { key: 'apps', label: 'Apps desinstalables (GB)', max: 50 },
              ].map((item) => (
                <div key={item.key}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">{item.label}</span>
                    <span className="text-white font-medium">
                      {calcValues[item.key as keyof typeof calcValues]} GB
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={item.max}
                    value={calcValues[item.key as keyof typeof calcValues]}
                    onChange={(e) =>
                      setCalcValues({
                        ...calcValues,
                        [item.key]: parseInt(e.target.value),
                      })
                    }
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col items-center justify-center bg-gray-900/50 rounded-xl p-6 border border-gray-700/30">
              <p className="text-gray-400 text-sm mb-2">Espacio Total Recuperable</p>
              <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                {totalRecoverable} GB
              </p>
              <p className="text-gray-500 text-xs mt-2">
                {Math.round((totalRecoverable / 512) * 100)}% del almacenamiento total
              </p>
              <div className="mt-4 w-full bg-gray-700 rounded-full h-3">
                <div
                  className="h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                  style={{ width: `${Math.min((totalRecoverable / 512) * 100, 100)}%` }}
                ></div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
                <Trash2 className="w-3 h-3" />
                <span>
                  Tu Mac quedaría con {(512 - 273 + totalRecoverable)} GB libres de 512 GB
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTool === 'scanner' && (
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
          <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
            <FolderSearch className="w-5 h-5 text-cyan-400" />
            Escáner de Archivos Grandes
          </h3>
          <p className="text-gray-400 text-sm mb-6">
            Simulación de los archivos más grandes encontrados en tu sistema. En un escenario real, ejecutarías los comandos de Terminal listados abajo.
          </p>
          <div className="space-y-3">
            {[
              { path: '~/Movies/Proyectos Video/', size: '18.2 GB', type: 'Carpeta' },
              { path: '~/Library/Developer/Xcode/', size: '14.8 GB', type: 'Carpeta' },
              { path: '~/Docker/volumes/', size: '12.1 GB', type: 'Carpeta' },
              { path: '~/Pictures/Fotos 2023/', size: '8.5 GB', type: 'Carpeta' },
              { path: '~/Downloads/', size: '7.2 GB', type: 'Carpeta' },
              { path: '~/.Trash/', size: '5.2 GB', type: 'Carpeta' },
              { path: '~/Library/Caches/', size: '4.8 GB', type: 'Carpeta' },
              { path: '/Applications/Adobe/', size: '4.2 GB', type: 'Carpeta' },
              { path: '~/node_modules (varios)', size: '15.3 GB', type: 'Múltiple' },
              { path: '~/Library/Containers/', size: '3.1 GB', type: 'Carpeta' },
            ].map((file, i) => (
              <div
                key={i}
                className="flex items-center justify-between bg-gray-900/50 rounded-xl p-4 border border-gray-700/30 hover:border-cyan-500/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-cyan-400 text-xs font-mono bg-cyan-500/10 px-2 py-1 rounded">
                    {file.type}
                  </span>
                  <span className="text-gray-300 text-sm font-mono">{file.path}</span>
                </div>
                <span className="text-white font-medium text-sm">{file.size}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-gray-900/80 rounded-xl border border-gray-700/50">
            <p className="text-gray-400 text-xs mb-2">💡 Comando para encontrar archivos grandes:</p>
            <code className="text-green-400 text-xs font-mono">
              find ~ -size +1G -type d 2&gt;/dev/null | xargs du -sh | sort -rh | head -20
            </code>
          </div>
        </div>
      )}

      {activeTool === 'maintenance' && (
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
          <h3 className="text-white font-semibold text-lg mb-6 flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-amber-400" />
            Plan de Mantenimiento para MacBook Air M1
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {maintenanceSchedule.map((schedule) => (
              <div
                key={schedule.frequency}
                className="bg-gray-900/50 rounded-xl p-5 border border-gray-700/30"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{schedule.icon}</span>
                  <h4 className={`font-semibold ${schedule.color}`}>{schedule.frequency}</h4>
                </div>
                <ul className="space-y-2">
                  {schedule.tasks.map((task, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                      <span className="text-gray-600 mt-1">•</span>
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl">
            <p className="text-amber-300 text-sm font-medium mb-2">💡 Tip para M1</p>
            <p className="text-gray-400 text-xs">
              El SSD del MacBook Air M1 tiene una vida útil limitada por ciclos de escritura. 
              Evita limpiezas excesivamente agresivas. Es mejor mantener un 20-30% de espacio libre para que el sistema gestione el wear leveling de forma eficiente.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
