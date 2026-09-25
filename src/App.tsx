import { useState } from 'react'
import Dashboard from './components/Dashboard'
import StorageBreakdown from './components/StorageBreakdown'
import TrendChart from './components/TrendChart'
import AppManager from './components/AppManager'
import ICloudManager from './components/ICloudManager'
import AutoScripts from './components/AutoScripts'
import SystemAlerts from './components/SystemAlerts'
import Recommendations from './components/Recommendations'
import CleanupComparison from './components/CleanupComparison'
import CleanupTools from './components/CleanupTools'
import Sidebar from './components/Sidebar'
import type { Tab } from './types'

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />
      case 'analysis':
        return <StorageBreakdown />
      case 'trends':
        return <TrendChart />
      case 'apps':
        return <AppManager />
      case 'icloud':
        return <ICloudManager />
      case 'scripts':
        return <AutoScripts />
      case 'alerts':
        return <SystemAlerts />
      case 'recommendations':
        return <Recommendations />
      case 'simulator':
        return <CleanupComparison />
      case 'tools':
        return <CleanupTools />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 rounded-lg"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab)
          setSidebarOpen(false)
        }}
        isOpen={sidebarOpen}
      />

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="flex-1 lg:ml-64 p-4 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-2">💻 MacStorage Optimizer</h1>
            <p className="text-gray-400">MacBook Air M1 • 512GB SSD • macOS 2020</p>
          </header>
          {renderContent()}
        </div>
      </main>
    </div>
  )
}
