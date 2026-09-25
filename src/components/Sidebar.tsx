import { LayoutDashboard, PieChart, Lightbulb, Wrench, HardDrive } from 'lucide-react'

type Tab = 'dashboard' | 'breakdown' | 'recommendations' | 'tools'

interface SidebarProps {
  activeTab: Tab
  setActiveTab: (tab: Tab) => void
}

const menuItems = [
  { id: 'dashboard' as Tab, label: 'Dashboard', icon: LayoutDashboard },
  { id: 'breakdown' as Tab, label: 'Análisis', icon: PieChart },
  { id: 'recommendations' as Tab, label: 'Recomendaciones', icon: Lightbulb },
  { id: 'tools' as Tab, label: 'Herramientas', icon: Wrench },
]

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-gray-900/80 backdrop-blur-xl border-r border-gray-700/50 p-6 flex flex-col">
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
      </div>
    </aside>
  )
}
