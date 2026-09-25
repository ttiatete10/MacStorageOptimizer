import { useState } from 'react'
import { Terminal, Copy, Check, Play, AlertCircle, Download, FileCode, Zap } from 'lucide-react'

interface Script {
  id: string
  name: string
  description: string
  impact: string
  risk: 'low' | 'medium' | 'high'
  category: string
  script: string
  preview: string
}

const scripts: Script[] = [
  {
    id: 'clean-all-cache',
    name: 'Limpieza Total de Caché',
    description: 'Elimina todos los archivos de caché del sistema y del usuario de forma segura',
    impact: 'Alto (20-30 GB)',
    risk: 'low',
    category: 'Limpieza',
    script: `#!/bin/bash
# Limpieza total de caché para macOS
echo "🧹 Iniciando limpieza de caché..."

# Caché del usuario
rm -rf ~/Library/Caches/*
echo "✓ Caché de usuario limpiada"

# Caché del sistema (requiere sudo)
sudo rm -rf /Library/Caches/*
echo "✓ Caché del sistema limpiada"

# Logs antiguos
sudo rm -rf /var/log/asl/*.asl
echo "✓ Logs ASL eliminados"

# Caché de Spotlight
sudo mdutil -E /
echo "✓ Índice de Spotlight reconstruido"

echo "✅ Limpieza completada. Reinicia para aplicar cambios."`,
    preview: 'rm -rf ~/Library/Caches/*',
  },
  {
    id: 'clean-xcode',
    name: 'Limpieza Xcode Completa',
    description: 'Elimina DerivedData, archives, iOS DeviceSupport y simulators no utilizados',
    impact: 'Alto (15-40 GB)',
    risk: 'low',
    category: 'Desarrollo',
    script: `#!/bin/bash
# Limpieza completa de Xcode
echo "🔨 Limpiando Xcode..."

# DerivedData (se regenera al compilar)
rm -rf ~/Library/Developer/Xcode/DerivedData/*
echo "✓ DerivedData eliminado"

# Archives antiguos (más de 30 días)
find ~/Library/Developer/Xcode/Archives -mtime +30 -delete
echo "✓ Archives antiguos eliminados"

# iOS DeviceSupport obsoletos
rm -rf ~/Library/Developer/Xcode/iOS\\ DeviceSupport/*/Symbols/System/Library/Caches/*
echo "✓ DeviceSupport limpiado"

# Simulators no utilizados
xcrun simctl delete unavailable
echo "✓ Simulators no disponibles eliminados"

echo "✅ Xcode limpio. Primer build será más lento."`,
    preview: 'rm -rf ~/Library/Developer/Xcode/DerivedData/*',
  },
  {
    id: 'clean-node-modules',
    name: 'Limpieza de node_modules',
    description: 'Encuentra y elimina node_modules de proyectos sin actividad reciente',
    impact: 'Alto (10-25 GB)',
    risk: 'low',
    category: 'Desarrollo',
    script: `#!/bin/bash
# Limpieza de node_modules antiguos
echo "📦 Buscando node_modules..."

# Listar todos con su tamaño
echo "\\n📊 node_modules encontrados:"
find ~ -name "node_modules" -type d -prune 2>/dev/null | while read dir; do
  size=$(du -sh "$dir" 2>/dev/null | cut -f1)
  echo "  $size  $dir"
done

# Eliminar los de proyectos sin modificar en 90+ días
echo "\\n🗑️  Eliminando node_modules de proyectos antiguos..."
find ~/Projects -name "node_modules" -type d -mtime +90 -prune -exec rm -rf {} \\; 2>/dev/null
echo "✓ node_modules antiguos eliminados"

echo "\\n💡 Tip: Se regeneran con 'npm install' cuando los necesites"`,
    preview: 'find ~/Projects -name "node_modules" -type d -mtime +90',
  },
  {
    id: 'clean-docker',
    name: 'Limpieza Docker Profunda',
    description: 'Elimina imágenes, contenedores, volúmenes y redes no utilizados',
    impact: 'Medio (5-20 GB)',
    risk: 'medium',
    category: 'Desarrollo',
    script: `#!/bin/bash
# Limpieza profunda de Docker
echo "🐳 Limpiando Docker..."

# Mostrar uso actual
echo "\\n📊 Uso actual:"
docker system df

# Eliminar contenedores detenidos
docker container prune -f
echo "✓ Contenedores detenidos eliminados"

# Eliminar imágenes dangling
docker image prune -f
echo "✓ Imágenes dangling eliminadas"

# Eliminar volúmenes no utilizados
docker volume prune -f
echo "✓ Volúmenes no utilizados eliminados"

# Limpieza total (¡cuidado!)
# docker system prune -a --volumes -f

echo "\\n✅ Docker limpio"`,
    preview: 'docker system prune -a',
  },
  {
    id: 'clean-homebrew',
    name: 'Limpieza Homebrew',
    description: 'Elimina versiones antiguas de paquetes, caché y dependencias obsoletas',
    impact: 'Medio (2-8 GB)',
    risk: 'low',
    category: 'Desarrollo',
    script: `#!/bin/bash
# Limpieza de Homebrew
echo "🍺 Limpiando Homebrew..."

# Actualizar primero
brew update
echo "✓ Homebrew actualizado"

# Limpiar versiones antiguas
brew cleanup --prune=all
echo "✓ Versiones antiguas eliminadas"

# Limpiar caché de descargas
rm -rf "$(brew --cache)"
echo "✓ Caché de descargas eliminada"

# Eliminar dependencias no necesarias
brew autoremove
echo "✓ Dependencias obsoletas eliminadas"

# Mostrar espacio recuperado
echo "\\n✅ Homebrew limpio"`,
    preview: 'brew cleanup --prune=all',
  },
  {
    id: 'find-large-files',
    name: 'Buscar Archivos Grandes',
    description: 'Encuentra los 20 archivos y carpetas más grandes del sistema',
    impact: 'Análisis',
    risk: 'low',
    category: 'Análisis',
    script: `#!/bin/bash
# Búsqueda de archivos grandes
echo "🔍 Buscando archivos grandes..."

echo "\\n📁 Top 20 carpetas más grandes en ~:"
du -sh ~/*/ 2>/dev/null | sort -rh | head -20

echo "\\n📄 Archivos mayores a 1GB:"
find ~ -size +1G -type f 2>/dev/null | while read file; do
  size=$(du -sh "$file" 2>/dev/null | cut -f1)
  echo "  $size  $file"
done

echo "\\n🗂️  Carpetas con más de 5GB:"
find ~ -size +5G -type d 2>/dev/null | while read dir; do
  size=$(du -sh "$dir" 2>/dev/null | cut -f1)
  echo "  $size  $dir"
done`,
    preview: 'du -sh ~/*/ 2>/dev/null | sort -rh | head -20',
  },
  {
    id: 'optimize-photos',
    name: 'Optimizar Biblioteca de Fotos',
    description: 'Comprime fotos antiguas y elimina duplicados usando scripts nativos',
    impact: 'Medio (10-30 GB)',
    risk: 'medium',
    category: 'Multimedia',
    script: `#!/bin/bash
# Optimización de Fotos
echo "📸 Optimizando biblioteca de Fotos..."

# Buscar duplicados por tamaño
echo "\\n🔍 Buscando posibles duplicados..."
find ~/Pictures -type f \\( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.heic" \\) -exec md5 -r {} \\; 2>/dev/null | sort | uniq -w32 -d

# Buscar videos grandes
echo "\\n🎥 Videos grandes en Pictures:"
find ~/Pictures -size +500M -type f \\( -iname "*.mov" -o -iname "*.mp4" \\) -exec du -sh {} \\;

# Screenshots antiguos
echo "\\n📱 Screenshots de más de 1 año:"
find ~/Desktop ~/Pictures -name "Screen Shot*" -mtime +365 -exec du -sh {} \\;

echo "\\n💡 Recomendación: Activa 'Optimizar Almacenamiento' en Fotos > Preferencias > iCloud"`,
    preview: 'find ~/Pictures -type f -iname "*.heic"',
  },
  {
    id: 'system-report',
    name: 'Reporte Completo del Sistema',
    description: 'Genera un informe detallado del uso de almacenamiento',
    impact: 'Análisis',
    risk: 'low',
    category: 'Análisis',
    script: `#!/bin/bash
# Reporte completo del sistema
echo "📊 GENERANDO REPORTE DE ALMACENAMIENTO"
echo "======================================="
echo "Fecha: $(date)"
echo "Host: $(hostname)"
echo ""

echo "💾 USO DEL DISCO:"
df -h /
echo ""

echo "📁 TOP 15 CARPETAS:"
du -sh ~/*/ 2>/dev/null | sort -rh | head -15
echo ""

echo "🔧 LIBRARY BREAKDOWN:"
du -sh ~/Library/*/ 2>/dev/null | sort -rh | head -10
echo ""

echo "📦 APLICACIONES:"
du -sh /Applications/*/ 2>/dev/null | sort -rh | head -10
echo ""

echo "🗑️  PAPELERA:"
du -sh ~/.Trash 2>/dev/null
echo ""

echo "✅ Reporte completado"`,
    preview: 'df -h / && du -sh ~/*/ 2>/dev/null | sort -rh | head -15',
  },
]

const riskColors = {
  low: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400', label: 'Riesgo Bajo' },
  medium: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', label: 'Riesgo Medio' },
  high: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400', label: 'Riesgo Alto' },
}

export default function AutoScripts() {
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [filter, setFilter] = useState<string>('Todas')

  const categories = ['Todas', ...Array.from(new Set(scripts.map((s) => s.category)))]

  const filteredScripts = filter === 'Todas' ? scripts : scripts.filter((s) => s.category === filter)

  const copyScript = (id: string, script: string) => {
    navigator.clipboard.writeText(script)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const downloadScript = (script: Script) => {
    const blob = new Blob([script.script], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${script.id}.sh`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600/10 to-emerald-600/10 border border-green-500/30 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-green-600/20 rounded-xl flex items-center justify-center">
            <FileCode className="w-5 h-5 text-green-400" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg">Scripts Automáticos</h3>
            <p className="text-gray-400 text-sm">Scripts bash listos para ejecutar en Terminal</p>
          </div>
        </div>
        <div className="mt-4 p-3 bg-gray-900/50 rounded-lg border border-gray-700/50">
          <p className="text-amber-400 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>
              <strong>Instrucciones:</strong> Copia el script, abre Terminal (Cmd + Espacio → "Terminal"), 
              pega con Cmd+V y presiona Enter. Algunos scripts requieren contraseña de administrador.
            </span>
          </p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              filter === cat
                ? 'bg-green-600/20 text-green-400 border border-green-500/30'
                : 'bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Scripts List */}
      <div className="space-y-4">
        {filteredScripts.map((script) => {
          const risk = riskColors[script.risk]
          const isExpanded = expandedId === script.id
          return (
            <div
              key={script.id}
              className={`${risk.bg} border ${risk.border} rounded-2xl overflow-hidden transition-all duration-200`}
            >
              <div className="p-5">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <h4 className="text-white font-semibold">{script.name}</h4>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${risk.bg} ${risk.text} border ${risk.border}`}>
                        {risk.label}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-xs bg-gray-700/50 text-gray-300">
                        {script.category}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm">{script.description}</p>
                    <p className="text-green-400 text-xs mt-2 flex items-center gap-1">
                      <Zap className="w-3 h-3" /> Impacto: {script.impact}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => copyScript(script.id, script.script)}
                      className="p-2 bg-gray-900/50 hover:bg-gray-900 rounded-lg transition-colors border border-gray-700/50"
                      title="Copiar script"
                    >
                      {copiedId === script.id ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                    <button
                      onClick={() => downloadScript(script)}
                      className="p-2 bg-gray-900/50 hover:bg-gray-900 rounded-lg transition-colors border border-gray-700/50"
                      title="Descargar .sh"
                    >
                      <Download className="w-4 h-4 text-gray-400" />
                    </button>
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : script.id)}
                      className="p-2 bg-green-600/20 hover:bg-green-600/30 rounded-lg transition-colors border border-green-500/30"
                      title="Ver script completo"
                    >
                      <Terminal className="w-4 h-4 text-green-400" />
                    </button>
                  </div>
                </div>
              </div>

              {isExpanded && (
                <div className="border-t border-gray-700/30 bg-gray-900/80">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-500 text-xs flex items-center gap-1">
                        <Play className="w-3 h-3" /> Script completo
                      </span>
                      <button
                        onClick={() => copyScript(script.id, script.script)}
                        className="text-xs text-green-400 hover:text-green-300 flex items-center gap-1"
                      >
                        {copiedId === script.id ? (
                          <>
                            <Check className="w-3 h-3" /> Copiado
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" /> Copiar todo
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="bg-black/50 rounded-lg p-4 overflow-x-auto border border-gray-700/50">
                      <code className="text-green-400 text-xs font-mono whitespace-pre">
                        {script.script}
                      </code>
                    </pre>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
