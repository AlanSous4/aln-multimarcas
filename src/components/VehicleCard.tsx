
import React from 'react'
import { Calendar, Gauge, Fuel, Settings, Eye, ShoppingCart } from 'lucide-react'

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

interface VehicleCardProps {
  vehicle: Vehicle
  onBuy: (vehicle: Vehicle) => void
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, onBuy }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat('pt-BR').format(mileage)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Imagem do veículo */}
      <div className="relative h-48 md:h-56 overflow-hidden">
        <img
          src={vehicle.images[0] || 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg'}
          alt={`${vehicle.brand} ${vehicle.model}`}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {/* Badge Nacional/Importado */}
        <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${
          vehicle.isNational 
            ? 'bg-green-500 text-white' 
            : 'bg-blue-500 text-white'
        }`}>
          {vehicle.isNational ? 'Nacional' : 'Importado'}
        </div>
        {/* Preço em destaque */}
        <div className="absolute bottom-3 right-3 bg-black bg-opacity-75 text-white px-3 py-1 rounded-lg">
          <span className="text-lg font-bold">{formatPrice(vehicle.price)}</span>
        </div>
      </div>

      {/* Informações do veículo */}
      <div className="p-4">
        {/* Título */}
        <div className="mb-3">
          <h3 className="text-xl font-bold text-gray-800">
            {vehicle.brand} {vehicle.model}
          </h3>
          <p className="text-gray-600 text-sm mt-1 line-clamp-2">{vehicle.description}</p>
        </div>

        {/* Especificações principais */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4 text-blue-500" />
            <span>{vehicle.year}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Gauge className="w-4 h-4 text-blue-500" />
            <span>{formatMileage(vehicle.mileage)} km</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Fuel className="w-4 h-4 text-blue-500" />
            <span>{vehicle.fuel}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Settings className="w-4 h-4 text-blue-500" />
            <span>{vehicle.transmission}</span>
          </div>
        </div>

        {/* Características adicionais */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Cor:</span>
            <span className="font-medium text-gray-800">{vehicle.color}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Motor:</span>
            <span className="font-medium text-gray-800">{vehicle.engine}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Portas:</span>
            <span className="font-medium text-gray-800">{vehicle.doors}</span>
          </div>
        </div>

        {/* Botões de ação */}
        <div className="flex space-x-2">
          <button className="flex-1 flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
            <Eye className="w-4 h-4" />
            <span>Ver Mais</span>
          </button>
          <button
            onClick={() => onBuy(vehicle)}
            className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Comprar</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default VehicleCard
