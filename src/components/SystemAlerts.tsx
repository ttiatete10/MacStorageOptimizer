import { useState } from 'react'
import { Bell, BellOff, AlertTriangle, CheckCircle2, Info, TrendingDown, Clock, Settings } from 'lucide-react'

interface Alert {
  id: number
  type: 'warning' | 'info' | 'success' | 'critical'
  title: string
  message: string
  time: string
  action?: string
  dismissed: boolean
}

interface Threshold {
  id: string
  name: string
  value: number
  enabled: boolean
  unit: string
}

const initialAlerts: Alert[] = [
  {
    id: 1,
    type: 'warning',
    title: 'Caché del sistema elevado',
    message: 'Se han detectado 28 GB de archivos de caché que pueden eliminarse de forma segura.',
    time: 'Hace 2 horas',
    action: 'Limpiar ahora',
    dismissed: false,
  },
  {
    id: 2,
    type: 'info',
    title: 'Crecimiento acelerado detectado',
    message: 'Tu almacenamiento creció 15 GB en los últimos 7 días, un 40% más que el promedio.',
    time: 'Hace 5 horas',
    dismissed: false,
  },
  {
    id: 3,
    type: 'success',
    title: 'Limpieza automática completada',
    message: 'Se eliminaron 3.2 GB de logs antiguos del sistema.',
    time: 'Ayer',
    dismissed: false,
  },
  {
    id: 4,
    type: 'warning',
    title: 'Xcode DerivedData grande',
    message: 'La carpeta DerivedData de Xcode ocupa 8.5 GB. Considera limpiarla.',
    time: 'Hace 1 día',
    action: 'Ver detalles',
    dismissed: false,
  },
  {
    id: 5,
    type: 'info',
    title: 'Apps sin uso detectadas',
    message: '3 aplicaciones no se han abierto en los últimos 90 días: Final Cut Pro, Parallels, Logic Pro.',
    time: 'Hace 2 días',
    action: 'Revisar apps',
    dismissed: false,
  },
  {
    id: 6,
    type: 'critical',
    title: 'Papelera con archivos grandes',
    message: 'La papelera contiene 5.2 GB de archivos. Algunos llevan más de 30 días ahí.',
    time: 'Hace 3 días',
    action: 'Vaciar papelera',
    dismissed: false,
  },
  {
    id: 7,
    type: 'info',
    title: 'Actualización de macOS disponible',
    message: 'macOS 14.3 está disponible. Las actualizaciones pueden incluir optimizaciones de almacenamiento.',
    time: 'Hace 4 días',
    dismissed: true,
  },
]

const defaultThresholds: Threshold[] = [
  { id: 'free-space', name: 'Espacio libre mínimo', value: 50, enabled: true, unit: 'GB' },
  { id: 'cache-size', name: 'Caché máximo', value: 20, enabled: true, unit: 'GB' },
  { id: 'trash-age', name: 'Archivos en papelera (días)', value: 30, enabled: true, unit: 'días' },
  { id: 'growth-weekly', name: 'Crecimiento semanal máximo', value: 10, enabled: false, unit: 'GB' },
  { id: 'unused-apps', name: 'Apps sin uso (días)', value: 90, enabled: true, unit: 'días' },
]

const typeStyles = {
  warning: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    icon: AlertTriangle,
    iconColor: 'text-amber-400',
    badge: 'bg-amber-500/20 text-amber-300',
  },
  info: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    icon: Info,
    iconColor: 'text-blue-400',
    badge: 'bg-blue-500/20 text-blue-300',
  },
  success: {
    bg: 'bg-green-500/10',
    border: 'border-green-500/30',
    icon: CheckCircle2,
    iconColor: 'text-green-400',
    badge: 'bg-green-500/20 text-green-300',
  },
  critical: {
    bg: 'bg-red-500/10',
    border: 'border-red-500/30',
    icon: AlertTriangle,
    iconColor: 'text-red-400',
    badge: 'bg-red-500/20 text-red-300',
  },
}

export default function SystemAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts)
  const [thresholds, setThresholds] = useState<Threshold[]>(defaultThresholds)
  const [showDismissed, setShowDismissed] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  const activeAlerts = alerts.filter((a) => !a.dismissed)
  const dismissedAlerts = alerts.filter((a) => a.dismissed)
  const displayedAlerts = showDismissed ? dismissedAlerts : activeAlerts

  const dismissAlert = (id: number) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, dismissed: !a.dismissed } : a))
    )
  }

  const toggleThreshold = (id: string) => {
    setThresholds((prev) =>
      prev.map((t) => (t.id === id ? { ...t, enabled: !t.enabled } : t))
    )
  }

  const updateThresholdValue = (id: string, value: number) => {
    setThresholds((prev) =>
      prev.map((t) => (t.id === id ? { ...t, value } : t))
    )
  }

  const criticalCount = activeAlerts.filter((a) => a.type === 'critical').length
  const warningCount = activeAlerts.filter((a) => a.type === 'warning').length

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600/20 rounded-xl flex items-center justify-center">
              <Bell className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-gray-400 text-xs">Alertas Activas</p>
              <p className="text-2xl font-bold text-white">{activeAlerts.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-red-500/10 to-rose-500/10 border border-red-500/30 rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-600/20 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <p className="text-gray-400 text-xs">Críticas</p>
              <p className="text-2xl font-bold text-white">{criticalCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-600/20 rounded-xl flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <p className="text-gray-400 text-xs">Advertencias</p>
              <p className="text-2xl font-bold text-white">{warningCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-600/20 rounded-xl flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-gray-400 text-xs">Resueltas</p>
              <p className="text-2xl font-bold text-white">{dismissedAlerts.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={() => { setShowDismissed(false); setShowSettings(false) }}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
            !showDismissed && !showSettings
              ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
              : 'bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:text-white'
          }`}
        >
          <span className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Activas ({activeAlerts.length})
          </span>
        </button>
        <button
          onClick={() => { setShowDismissed(true); setShowSettings(false) }}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
            showDismissed
              ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
              : 'bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:text-white'
          }`}
        >
          <span className="flex items-center gap-2">
            <BellOff className="w-4 h-4" />
            Descartadas ({dismissedAlerts.length})
          </span>
        </button>
        <button
          onClick={() => { setShowSettings(true); setShowDismissed(false) }}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
            showSettings
              ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
              : 'bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:text-white'
          }`}
        >
          <span className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Umbrales
          </span>
        </button>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6">
          <h3 className="text-white font-semibold text-lg mb-2">Configuración de Umbrales</h3>
          <p className="text-gray-400 text-sm mb-6">
            Define los límites que activarán alertas automáticas
          </p>
          <div className="space-y-4">
            {thresholds.map((threshold) => (
              <div
                key={threshold.id}
                className="flex items-center gap-4 flex-wrap bg-gray-900/50 rounded-xl p-4 border border-gray-700/30"
              >
                <button
                  onClick={() => toggleThreshold(threshold.id)}
                  className={`w-10 h-6 rounded-full transition-colors relative ${
                    threshold.enabled ? 'bg-blue-600' : 'bg-gray-700'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                      threshold.enabled ? 'translate-x-5' : 'translate-x-1'
                    }`}
                  ></div>
                </button>
                <div className="flex-1 min-w-[200px]">
                  <p className={`text-sm font-medium ${threshold.enabled ? 'text-white' : 'text-gray-500'}`}>
                    {threshold.name}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={threshold.value}
                    onChange={(e) => updateThresholdValue(threshold.id, parseInt(e.target.value) || 0)}
                    disabled={!threshold.enabled}
                    className="w-20 bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-white text-sm disabled:opacity-50 focus:outline-none focus:border-blue-500/50"
                  />
                  <span className="text-gray-500 text-sm">{threshold.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Alerts List */}
      {!showSettings && (
        <div className="space-y-3">
          {displayedAlerts.length === 0 ? (
            <div className="text-center py-12 bg-gray-800/30 rounded-2xl border border-gray-700/30">
              <CheckCircle2 className="w-12 h-12 mx-auto mb-3 text-green-400 opacity-50" />
              <p className="text-gray-400">
                {showDismissed ? 'No hay alertas descartadas' : '¡Todo en orden! No hay alertas activas.'}
              </p>
            </div>
          ) : (
            displayedAlerts.map((alert) => {
              const style = typeStyles[alert.type]
              const Icon = style.icon
              return (
                <div
                  key={alert.id}
                  className={`${style.bg} border ${style.border} rounded-2xl p-5 transition-all duration-200 hover:scale-[1.005]`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${style.bg}`}>
                      <Icon className={`w-5 h-5 ${style.iconColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 flex-wrap">
                        <div>
                          <h4 className="text-white font-medium">{alert.title}</h4>
                          <p className="text-gray-400 text-sm mt-1">{alert.message}</p>
                        </div>
                        <span className="text-gray-500 text-xs flex items-center gap-1 flex-shrink-0">
                          <Clock className="w-3 h-3" />
                          {alert.time}
                        </span>
                      </div>
                      {alert.action && !showDismissed && (
                        <div className="mt-3 flex items-center gap-2">
                          <button className="px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-lg text-xs font-medium transition-colors border border-blue-500/30">
                            {alert.action}
                          </button>
                          <button
                            onClick={() => dismissAlert(alert.id)}
                            className="px-3 py-1.5 bg-gray-700/50 hover:bg-gray-700 text-gray-400 rounded-lg text-xs font-medium transition-colors"
                          >
                            Descartar
                          </button>
                        </div>
                      )}
                      {showDismissed && (
                        <button
                          onClick={() => dismissAlert(alert.id)}
                          className="mt-3 text-xs text-blue-400 hover:text-blue-300"
                        >
                          Restaurar alerta
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      )}
    </div>
  )
}
