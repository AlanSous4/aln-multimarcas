
import React, { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { useAuth } from './hooks/useAuth'
import Header from './components/Header'
import AuthModal from './components/AuthModal'
import VehicleCarousel from './components/VehicleCarousel'
import VehicleFilters from './components/VehicleFilters'
import VehicleGrid from './components/VehicleGrid'
import PaymentModal from './components/PaymentModal'
import Footer from './components/Footer'

interface Vehicle {
  _id: string
  brand: string
  model: string
  year: number
  price: number
  mileage: number
  color: string
  fuel: string
  transmission: string
  doors: number
  engine: string
  description: string
  features: string[]
  images: string[]
  status: string
  isNational: boolean
}

function App() {
  const { isAuthenticated } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null)

  const handleBuyVehicle = (vehicle: Vehicle) => {
    if (!isAuthenticated) {
      setShowAuthModal(true)
      return
    }
    
    setSelectedVehicle(vehicle)
    setShowPaymentModal(true)
  }

  const handleCloseAuthModal = () => {
    setShowAuthModal(false)
  }

  const handleClosePaymentModal = () => {
    setShowPaymentModal(false)
    setSelectedVehicle(null)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 5000,
          style: { background: '#363636', color: '#fff' },
          success: { style: { background: '#10b981' } },
          error: { style: { background: '#ef4444' } }
        }}
      />

      {/* Header */}
      <Header />

      {/* Conteúdo Principal */}
      <main className="flex-1">
        {!isAuthenticated ? (
          /* Tela de apresentação para usuários não autenticados */
          <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Bem-vindo à ALN MULTIMARCAS
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Para acessar nosso catálogo completo e realizar compras, faça seu cadastro ou login
              </p>
              <button
                onClick={() => setShowAuthModal(true)}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Entrar / Cadastrar
              </button>
            </div>

            {/* Carrossel sempre visível */}
            <div className="mb-12">
              <VehicleCarousel />
            </div>

            <div className="text-center bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Por que escolher a ALN MULTIMARCAS?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🚗</span>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">Veículos de Qualidade</h4>
                  <p className="text-gray-600">Carros nacionais e importados cuidadosamente selecionados</p>
                </div>
                <div className="text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">💳</span>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">Facilidade de Pagamento</h4>
                  <p className="text-gray-600">Parcelamento em até 36x, PIX, débito e dinheiro</p>
                </div>
                <div className="text-center">
                  <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🏆</span>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">Atendimento Premium</h4>
                  <p className="text-gray-600">Suporte especializado do início ao fim da compra</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Catálogo completo para usuários autenticados */
          <div className="container mx-auto px-4 py-8">
            {/* Carrossel */}
            <div className="mb-8">
              <VehicleCarousel />
            </div>

            {/* Filtros */}
            <VehicleFilters />

            {/* Grade de Veículos */}
            <VehicleGrid onBuyVehicle={handleBuyVehicle} />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Modais */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={handleCloseAuthModal} 
      />
      
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={handleClosePaymentModal}
        vehicle={selectedVehicle}
      />
    </div>
  )
}

export default App
