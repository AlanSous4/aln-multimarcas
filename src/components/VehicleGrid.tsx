
import React from 'react'
import { ChevronLeft, ChevronRight, Car } from 'lucide-react'
import { useVehicles } from '../hooks/useVehicles'
import VehicleCard from './VehicleCard'

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

interface VehicleGridProps {
  onBuyVehicle: (vehicle: Vehicle) => void
}

const VehicleGrid: React.FC<VehicleGridProps> = ({ onBuyVehicle }) => {
  const {
    vehicles,
    loading,
    currentPage,
    totalPages,
    goToPage,
    selectedBrand,
    filteredVehicles
  } = useVehicles()

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-lg text-gray-600">Carregando veículos...</span>
      </div>
    )
  }

  if (filteredVehicles.length === 0) {
    return (
      <div className="text-center py-12">
        <Car className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
          Nenhum veículo encontrado
        </h3>
        <p className="text-gray-500">
          Tente ajustar os filtros ou escolher uma marca diferente
        </p>
      </div>
    )
  }

  const renderPaginationButtons = () => {
    const buttons = []
    const maxButtons = 5
    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2))
    let endPage = Math.min(totalPages, startPage + maxButtons - 1)

    if (endPage - startPage + 1 < maxButtons) {
      startPage = Math.max(1, endPage - maxButtons + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          className={`px-3 py-2 rounded-lg font-medium transition-colors ${
            i === currentPage
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {i}
        </button>
      )
    }

    return buttons
  }

  return (
    <div>
      {/* Título da seção */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {selectedBrand === 'Todas' ? 'Todos os Veículos' : `Veículos ${selectedBrand}`}
        </h2>
        <p className="text-gray-600">
          {filteredVehicles.length} veículo{filteredVehicles.length !== 1 ? 's' : ''} encontrado{filteredVehicles.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Grade de veículos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {vehicles.map((vehicle) => (
          <VehicleCard
            key={vehicle._id}
            vehicle={vehicle}
            onBuy={onBuyVehicle}
          />
        ))}
      </div>

      {/* Paginação */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2">
          {/* Botão anterior */}
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Anterior</span>
          </button>

          {/* Números das páginas */}
          <div className="flex space-x-1">
            {renderPaginationButtons()}
          </div>

          {/* Botão próximo */}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <span className="hidden sm:inline">Próximo</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Informações da paginação */}
      <div className="text-center mt-4 text-sm text-gray-600">
        Página {currentPage} de {totalPages} • 
        Mostrando {vehicles.length} de {filteredVehicles.length} veículos
      </div>
    </div>
  )
}

export default VehicleGrid
