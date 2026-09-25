import { LayoutDashboard, PieChart, Lightbulb, Wrench, HardDrive, TrendingUp, FlaskConical, Package, FileCode, Bell, Cloud } from 'lucide-react'

export type Tab = 'dashboard' | 'breakdown' | 'recommendations' | 'tools' | 'trends' | 'simulator' | 'apps' | 'scripts' | 'alerts' | 'icloud'

interface SidebarProps {
  activeTab: Tab
  setActiveTab: (tab: Tab) => void
  isOpen: boolean
}

const menuItems = [
  { id: 'dashboard' as Tab, label: 'Dashboard', icon: LayoutDashboard },
  { id: 'breakdown' as Tab, label: 'Análisis', icon: PieChart },
  { id: 'trends' as Tab, label: 'Tendencias', icon: TrendingUp },
  { id: 'apps' as Tab, label: 'Apps', icon: Package },
  { id: 'icloud' as Tab, label: 'iCloud', icon: Cloud },
  { id: 'scripts' as Tab, label: 'Scripts', icon: FileCode },
  { id: 'alerts' as Tab, label: 'Alertas', icon: Bell },
  { id: 'recommendations' as Tab, label: 'Recomendaciones', icon: Lightbulb },
  { id: 'simulator' as Tab, label: 'Simulador', icon: FlaskConical },
  { id: 'tools' as Tab, label: 'Herramientas', icon: Wrench },
]

export default function Sidebar({ activeTab, setActiveTab, isOpen }: SidebarProps) {
  return (
    <aside
      className={`fixed left-0 top-0 h-full w-64 bg-gray-900/95 backdrop-blur-xl border-r border-gray-700/50 p-6 flex flex-col z-40 transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}
    >
      <div className="flex items-center gap-3 mb-10">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
          <HardDrive className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-white font-bold text-sm">MacStorage</h2>
          <p className="text-gray-500 text-xs">Optimizer Pro</p>
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </button>
          )
        })}
      </nav>

      <div className="mt-auto p-4 bg-gray-800/50 rounded-xl border border-gray-700/50">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-400">Sistema Activo</span>
        </div>
        <p className="text-xs text-gray-500">
          Apple M1 • 8GB RAM<br />
          macOS Sonoma
        </p>
        <div className="mt-3 pt-3 border-t border-gray-700/50">
          <div className="flex justify-between text-xs">
            <span className="text-gray-500">Disco</span>
            <span className="text-white">53% usado</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-1.5 mt-1">
            <div className="h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" style={{ width: '53%' }}></div>
          </div>
        </div>
      </div>
    </aside>
  )
}
