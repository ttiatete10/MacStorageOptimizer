import { useState } from 'react'
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react'

const cleanupActions = [
  { id: 1, name: 'Limpiar Caché', before: 28, after: 4, icon: '🧹' },
  { id: 2, name: 'Eliminar node_modules', before: 15, after: 3, icon: '📦' },
  { id: 3, name: 'Vaciar Papelera', before: 5.2, after: 0, icon: '🗑️' },
  { id: 4, name: 'Limpiar Docker', before: 12, after: 2, icon: '🐳' },
  { id: 5, name: 'Xcode DerivedData', before: 8, after: 0, icon: '⚡' },
  { id: 6, name: 'Logs del Sistema', before: 3.8, after: 0.5, icon: '📄' },
  { id: 7, name: 'Optimizar Fotos', before: 20, after: 8, icon: '📸' },
  { id: 8, name: 'Homebrew Cleanup', before: 4.5, after: 1.2, icon: '🍺' },
]

export default function CleanupComparison() {
  const [selectedActions, setSelectedActions] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8])
  const [showResult, setShowResult] = useState(false)

  const totalBefore = cleanupActions
    .filter((a) => selectedActions.includes(a.id))
    .reduce((acc, a) => acc + a.before, 0)
  const totalAfter = cleanupActions
    .filter((a) => selectedActions.includes(a.id))
    .reduce((acc, a) => acc + a.after, 0)
  const totalSaved = totalBefore - totalAfter

  const currentUsed = 273
  const newUsed = currentUsed - totalSaved
  const currentFree = 512 - currentUsed
  const newFree = 512 - newUsed

  const toggleAction = (id: number) => {
    setSelectedActions((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    )
  }

  const runCleanup = () => {
    setShowResult(true)
  }

  const reset = () => {
    setShowResult(false)
    setSelectedActions([1, 2, 3, 4, 5, 6, 7, 8])
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="text-white font-semibold text-lg flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              Simulador de Limpieza
            </h3>
            <p className="text-gray-400 text-sm mt-1">
              Selecciona las acciones y visualiza el impacto en tu almacenamiento
            </p>
          </div>
          {!showResult ? (
            <button
              onClick={runCleanup}
              disabled={selectedActions.length === 0}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Ejecutar Limpieza
            </button>
          ) : (
            <button
              onClick={reset}
              className="px-6 py-3 bg-gray-700 text-white rounded-xl font-medium hover:bg-gray-600 transition-colors"
            >
              Reiniciar Simulación
            </button>
          )}
        </div>
      </div>

      {/* Actions Grid */}
      {!showResult && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cleanupActions.map((action) => {
            const isSelected = selectedActions.includes(action.id)
            const saved = action.before - action.after
            return (
              <button
                key={action.id}
                onClick={() => toggleAction(action.id)}
                className={`bg-gray-800/50 border rounded-xl p-4 text-left transition-all duration-200 ${
                  isSelected
                    ? 'border-blue-500/50 ring-1 ring-blue-500/20'
                    : 'border-gray-700/50 opacity-60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{action.icon}</span>
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">{action.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-red-400 text-xs">{action.before} GB</span>
                      <ArrowRight className="w-3 h-3 text-gray-500" />
                      <span className="text-green-400 text-xs">{action.after} GB</span>
                      <span className="text-blue-400 text-xs ml-2">(-{saved.toFixed(1)} GB)</span>
                    </div>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
                      isSelected ? 'bg-blue-600 border-blue-600' : 'border-gray-600'
                    }`}
                  >
                    {isSelected && <CheckCircle2 className="w-3 h-3 text-white" />}
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      )}

      {/* Before/After Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Before */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
          <p className="text-gray-400 text-xs uppercase tracking-wider mb-4">Antes</p>
          <p className="text-3xl font-bold text-white">{currentUsed} GB</p>
          <p className="text-gray-500 text-sm mt-1">usados de 512 GB</p>
          <div className="mt-4 w-full bg-gray-700 rounded-full h-3">
            <div
              className="h-3 rounded-full bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-1000"
              style={{ width: `${(currentUsed / 512) * 100}%` }}
            ></div>
          </div>
          <p className="text-gray-500 text-xs mt-2">{currentFree} GB libres</p>
        </div>

        {/* Savings */}
        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-2xl p-6 flex flex-col items-center justify-center">
          <p className="text-blue-400 text-xs uppercase tracking-wider mb-2">Espacio Recuperado</p>
          <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            {totalSaved.toFixed(1)} GB
          </p>
          <p className="text-gray-400 text-sm mt-2">
            {selectedActions.length} acciones seleccionadas
          </p>
        </div>

        {/* After */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
          <p className="text-gray-400 text-xs uppercase tracking-wider mb-4">Después</p>
          <p className="text-3xl font-bold text-white">{showResult ? newUsed.toFixed(1) : currentUsed} GB</p>
          <p className="text-gray-500 text-sm mt-1">usados de 512 GB</p>
          <div className="mt-4 w-full bg-gray-700 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all duration-1000 ${
                showResult ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-red-500 to-orange-500'
              }`}
              style={{ width: `${showResult ? (newUsed / 512) * 100 : (currentUsed / 512) * 100}%` }}
            ></div>
          </div>
          <p className="text-gray-500 text-xs mt-2">
            {showResult ? newFree.toFixed(1) : currentFree} GB libres
          </p>
        </div>
      </div>

      {/* Result Animation */}
      {showResult && (
        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-2xl p-6 animate-in">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h4 className="text-white font-semibold">¡Limpieza Completada!</h4>
              <p className="text-gray-400 text-sm">
                Has recuperado <span className="text-green-400 font-bold">{totalSaved.toFixed(1)} GB</span> de espacio. 
                Tu disco ahora tiene <span className="text-green-400 font-bold">{newFree.toFixed(1)} GB libres</span>.
              </p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
            {cleanupActions
              .filter((a) => selectedActions.includes(a.id))
              .map((action) => (
                <div key={action.id} className="bg-gray-900/50 rounded-lg p-3 border border-gray-700/30">
                  <span className="text-lg">{action.icon}</span>
                  <p className="text-green-400 text-xs font-medium mt-1">
                    -{(action.before - action.after).toFixed(1)} GB
                  </p>
                  <p className="text-gray-500 text-xs">{action.name}</p>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}
