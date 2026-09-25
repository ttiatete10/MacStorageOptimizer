import { AlertCircle, CheckCircle2, Info, ArrowRight, Star } from 'lucide-react'

const recommendations = [
  {
    id: 1,
    title: 'Limpiar Caché del Sistema',
    description: 'macOS acumula archivos temporales que pueden eliminarse de forma segura. Esto incluye caché de apps, fuentes y logs del sistema.',
    impact: 'Alto',
    space: '28 GB',
    difficulty: 'Fácil',
    priority: 'high',
    steps: [
      'Abre Terminal (Cmd + Espacio → Terminal)',
      'Ejecuta: sudo rm -rf /Library/Caches/*',
      'Reinicia el Mac',
      'Verifica el espacio recuperado en →  > Acerca de este Mac > Almacenamiento',
    ],
    command: 'sudo rm -rf ~/Library/Caches/* && sudo rm -rf /Library/Caches/*',
  },
  {
    id: 2,
    title: 'Eliminar node_modules innecesarios',
    description: 'Los proyectos de desarrollo acumulan carpetas node_modules que pueden pesar varios GB. Se pueden regenerar con npm install.',
    impact: 'Alto',
    space: '15 GB',
    difficulty: 'Fácil',
    priority: 'high',
    steps: [
      'Identifica proyectos antiguos que no uses frecuentemente',
      'Elimina sus carpetas node_modules',
      'Se regeneran al ejecutar npm install cuando los necesites',
    ],
    command: 'find ~/Projects -name "node_modules" -type d -prune -exec du -sh {} \\;',
  },
  {
    id: 3,
    title: 'Optimizar Fotos de Apple',
    description: 'Activa "Optimizar Almacenamiento" en Fotos para mantener versiones reducidas en el Mac y las originales en iCloud.',
    impact: 'Medio',
    space: '20 GB',
    difficulty: 'Fácil',
    priority: 'medium',
    steps: [
      'Abre la app Fotos',
      'Ve a Fotos > Preferencias > iCloud',
      'Selecciona "Optimizar Almacenamiento del Mac"',
      'Espera a que se sincronice',
    ],
    command: null,
  },
  {
    id: 4,
    title: 'Limpiar Xcode DerivedData',
    description: 'Xcode genera datos compilados que pueden acumularse rápidamente. Son seguros de eliminar ya que se regeneran.',
    impact: 'Alto',
    space: '8 GB',
    difficulty: 'Fácil',
    priority: 'high',
    steps: [
      'Cierra Xcode',
      'Elimina la carpeta DerivedData',
      'Se regenera al abrir tu próximo proyecto',
    ],
    command: 'rm -rf ~/Library/Developer/Xcode/DerivedData/*',
  },
  {
    id: 5,
    title: 'Gestionar Docker Images',
    description: 'Las imágenes de Docker no utilizadas ocupan espacio significativo. Limpia las que no uses.',
    impact: 'Medio',
    space: '12 GB',
    difficulty: 'Medio',
    priority: 'medium',
    steps: [
      'Lista todas las imágenes: docker images',
      'Elimina imágenes no utilizadas',
      'Prune completo para limpieza profunda',
    ],
    command: 'docker system prune -a --volumes',
  },
  {
    id: 6,
    title: 'Vaciar Papelera y Archivos Recientes',
    description: 'Archivos eliminados permanecen en la papelera ocupando espacio hasta que se vacía.',
    impact: 'Bajo',
    space: '5.2 GB',
    difficulty: 'Muy Fácil',
    priority: 'low',
    steps: [
      'Haz clic derecho en el icono de la Papelera en el Dock',
      'Selecciona "Vaciar Papelera"',
      'Confirma la acción',
    ],
    command: null,
  },
  {
    id: 7,
    title: 'Desinstalar Apps no utilizadas',
    description: 'macOS puede detectar apps que no has abierto en mucho tiempo. Considera desinstalarlas.',
    impact: 'Medio',
    space: '18 GB',
    difficulty: 'Fácil',
    priority: 'medium',
    steps: [
      'Ve a Ajustes del Sistema > General > Almacenamiento',
      'Revisa las apps listadas como "No utilizadas"',
      'Haz clic en la "i" junto a cada app para ver opciones',
      'Selecciona "Eliminar App" para las que no necesites',
    ],
    command: null,
  },
  {
    id: 8,
    title: 'Comprimir Archivos Grandes',
    description: 'Archivos como máquinas virtuales, DMGs o archivos de backup pueden comprimirse para ahorrar espacio.',
    impact: 'Medio',
    space: '10 GB',
    difficulty: 'Medio',
    priority: 'medium',
    steps: [
      'Identifica archivos DMG, ISO o VMs que ya no necesites instalar',
      'Comprime con formato .zip o muévelos a un disco externo',
      'Considera usar APFS con compresión para carpetas',
    ],
    command: 'find ~ -size +1G -type f \\( -name "*.dmg" -o -name "*.iso" -o -name "*.vmwarevm" \\)',
  },
]

const priorityColors = {
  high: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400', badge: 'bg-red-500/20 text-red-300' },
  medium: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', badge: 'bg-amber-500/20 text-amber-300' },
  low: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400', badge: 'bg-green-500/20 text-green-300' },
}

export default function Recommendations() {
  const totalRecoverable = recommendations.reduce((acc, r) => acc + parseInt(r.space), 0)

  return (
    <div className="space-y-8">
      {/* Summary Banner */}
      <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl p-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="text-white font-semibold text-lg flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" />
              Espacio Potencialmente Recuperable
            </h3>
            <p className="text-gray-400 text-sm mt-1">
              Aplicando todas las recomendaciones podrías liberar hasta {totalRecoverable} GB
            </p>
          </div>
          <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            {totalRecoverable} GB
          </div>
        </div>
      </div>

      {/* Recommendations List */}
      <div className="space-y-4">
        {recommendations.map((rec) => {
          const colors = priorityColors[rec.priority as keyof typeof priorityColors]
          return (
            <div
              key={rec.id}
              className={`${colors.bg} border ${colors.border} rounded-2xl p-6 transition-all duration-200 hover:scale-[1.01]`}
            >
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-white font-semibold">{rec.title}</h4>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${colors.badge}`}>
                      Prioridad {rec.priority === 'high' ? 'Alta' : rec.priority === 'medium' ? 'Media' : 'Baja'}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">{rec.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-white">{rec.space}</p>
                  <p className="text-gray-500 text-xs">recuperables</p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1 text-gray-400">
                  <AlertCircle className="w-3 h-3" /> Impacto: {rec.impact}
                </span>
                <span className="flex items-center gap-1 text-gray-400">
                  <CheckCircle2 className="w-3 h-3" /> Dificultad: {rec.difficulty}
                </span>
              </div>

              <div className="mt-4">
                <details className="group">
                  <summary className="text-blue-400 text-sm cursor-pointer hover:text-blue-300 flex items-center gap-1">
                    <ArrowRight className="w-3 h-3 transition-transform group-open:rotate-90" />
                    Ver pasos detallados
                  </summary>
                  <div className="mt-3 pl-4 border-l-2 border-gray-700 space-y-2">
                    {rec.steps.map((step, i) => (
                      <p key={i} className="text-gray-300 text-sm flex items-start gap-2">
                        <span className="text-blue-400 font-mono text-xs mt-0.5">{i + 1}.</span>
                        {step}
                      </p>
                    ))}
                    {rec.command && (
                      <div className="mt-3 bg-gray-900/80 rounded-lg p-3 border border-gray-700">
                        <p className="text-gray-500 text-xs mb-1 flex items-center gap-1">
                          <Info className="w-3 h-3" /> Comando Terminal:
                        </p>
                        <code className="text-green-400 text-xs font-mono break-all">{rec.command}</code>
                      </div>
                    )}
                  </div>
                </details>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
