import { useState } from 'react'
import Dashboard from './components/Dashboard'
import StorageBreakdown from './components/StorageBreakdown'
import Recommendations from './components/Recommendations'
import CleanupTools from './components/CleanupTools'
import Sidebar from './components/Sidebar'

type Tab = 'dashboard' | 'breakdown' | 'recommendations' | 'tools'

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard')

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />
      case 'breakdown':
        return <StorageBreakdown />
      case 'recommendations':
        return <Recommendations />
      case 'tools':
        return <CleanupTools />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 ml-64 p-8 overflow-auto">
        <div className="max-w-6xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <span className="text-4xl">💻</span>
              MacStorage Optimizer
            </h1>
            <p className="text-gray-400 mt-2">
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
