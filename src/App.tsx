import { useState } from 'react'

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard')

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
      color: 'white',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
          💻 MacStorage Optimizer
        </h1>
        <p style={{ color: '#9ca3af', marginBottom: '2rem' }}>
          MacBook Air M1 • 512GB SSD • macOS 2020
        </p>

        <div style={{
          background: 'rgba(31, 41, 55, 0.5)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(75, 85, 99, 0.5)',
          borderRadius: '1rem',
          padding: '2rem',
          marginBottom: '2rem'
        }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
            📊 Dashboard
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            <div style={{
              background: 'rgba(17, 24, 39, 0.5)',
              padding: '1.5rem',
              borderRadius: '0.75rem',
              border: '1px solid rgba(75, 85, 99, 0.3)'
            }}>
              <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Almacenamiento Total</p>
              <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>512 GB</p>
              <div style={{
                width: '100%',
                height: '8px',
                background: '#374151',
                borderRadius: '4px',
                marginTop: '0.5rem',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: '53%',
                  height: '100%',
                  background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
                  borderRadius: '4px'
                }}></div>
              </div>
              <p style={{ color: '#6b7280', fontSize: '0.75rem', marginTop: '0.5rem' }}>
                53% utilizado
              </p>
            </div>

            <div style={{
              background: 'rgba(17, 24, 39, 0.5)',
              padding: '1.5rem',
              borderRadius: '0.75rem',
              border: '1px solid rgba(75, 85, 99, 0.3)'
            }}>
              <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Espacio Libre</p>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>239 GB</p>
              <p style={{ color: '#10b981', fontSize: '0.75rem', marginTop: '0.5rem' }}>
                ✓ Nivel saludable
              </p>
            </div>

            <div style={{
              background: 'rgba(17, 24, 39, 0.5)',
              padding: '1.5rem',
              borderRadius: '0.75rem',
              border: '1px solid rgba(75, 85, 99, 0.3)'
            }}>
              <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Recuperable</p>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f59e0b' }}>49.5 GB</p>
              <p style={{ color: '#f59e0b', fontSize: '0.75rem', marginTop: '0.5rem' }}>
                ⚡ 8 acciones disponibles
              </p>
            </div>
          </div>

          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>
            🧹 Acciones Rápidas
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem'
          }}>
            {[
              { icon: '🧹', label: 'Limpiar Caché', size: '28 GB' },
              { icon: '📋', label: 'Duplicados', size: '12 GB' },
              { icon: '🗑️', label: 'Papelera', size: '5.2 GB' },
              { icon: '📄', label: 'Logs', size: '3.8 GB' }
            ].map((action, i) => (
              <button
                key={i}
                style={{
                  background: 'rgba(17, 24, 39, 0.5)',
                  border: '1px solid rgba(75, 85, 99, 0.3)',
                  borderRadius: '0.75rem',
                  padding: '1rem',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  color: 'white'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <span style={{ fontSize: '1.5rem' }}>{action.icon}</span>
                <p style={{ marginTop: '0.5rem', fontWeight: '500' }}>{action.label}</p>
                <p style={{ color: '#9ca3af', fontSize: '0.75rem' }}>{action.size} recuperables</p>
              </button>
            ))}
          </div>
        </div>

        <div style={{
          background: 'rgba(31, 41, 55, 0.5)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(75, 85, 99, 0.5)',
          borderRadius: '1rem',
          padding: '2rem'
        }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
            💡 Recomendaciones
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { title: 'Limpiar Caché del Sistema', size: '28 GB', priority: 'Alta' },
              { title: 'Eliminar node_modules', size: '15 GB', priority: 'Alta' },
              { title: 'Optimizar Fotos', size: '20 GB', priority: 'Media' },
              { title: 'Limpiar Xcode', size: '8 GB', priority: 'Alta' }
            ].map((rec, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(17, 24, 39, 0.5)',
                  border: '1px solid rgba(75, 85, 99, 0.3)',
                  borderRadius: '0.75rem',
                  padding: '1rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <p style={{ fontWeight: '500' }}>{rec.title}</p>
                  <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
                    Prioridad: {rec.priority}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{rec.size}</p>
                  <p style={{ color: '#9ca3af', fontSize: '0.75rem' }}>recuperables</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
