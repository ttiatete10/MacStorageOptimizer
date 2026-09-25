import { useState } from 'react'
import Dashboard from './components/Dashboard'
import StorageBreakdown from './components/StorageBreakdown'
import Recommendations from './components/Recommendations'
import CleanupTools from './components/CleanupTools'
import TrendChart from './components/TrendChart'
import CleanupComparison from './components/CleanupComparison'
import AppManager from './components/AppManager'
import AutoScripts from './components/AutoScripts'
import SystemAlerts from './components/SystemAlerts'
import ICloudManager from './components/ICloudManager'
import Sidebar from './components/Sidebar'
import type { Tab } from './components/Sidebar'

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />
      case 'breakdown':
        return <StorageBreakdown />
      case 'trends':
        return <TrendChart />
      case 'recommendations':
        return <Recommendations />
      case 'simulator':
        return <CleanupComparison />
      case 'apps':
        return <AppManager />
      case 'scripts':
        return <AutoScripts />
      case 'alerts':
        return <SystemAlerts />
      case 'icloud':
        return <ICloudManager />
      case 'tools':
        return <CleanupTools />
      default:
        return <Dashboard />
    }
  }

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab)
    setSidebarOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 bg-gray-800 border border-gray-700 rounded-xl flex items-center justify-center text-white"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {sidebarOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <Sidebar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        isOpen={sidebarOpen}
      />

      <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8 overflow-auto">
        <div className="max-w-6xl mx-auto">
          <header className="mb-8 pl-12 lg:pl-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
              <span className="text-3xl sm:text-4xl">💻</span>
              MacStorage Optimizer
            </h1>
            <p className="text-gray-400 mt-2 text-sm sm:text-base">
              MacBook Air M1 • 512GB SSD • macOS 2020
            </p>
          </header>
          {renderContent()}
        </div>
      </main>
    </div>
  )
}

export default App
