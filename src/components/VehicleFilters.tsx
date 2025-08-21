
import React from 'react'
import { Search, X, Filter } from 'lucide-react'
import { useVehicles } from '../hooks/useVehicles'

const VehicleFilters: React.FC = () => {
  const { 
    filters, 
    updateFilters, 
    clearFilters, 
    selectedBrand, 
    selectBrand,
    allVehicles 
  } = useVehicles()

  const brands = ['Todas', 'Volkswagen', 'Chevrolet', 'Hyundai', 'Fiat', 'Honda', 'Citroën', 'Toyota', 'Ford']
  const colors = ['Todas', 'Branco', 'Preto', 'Prata', 'Azul', 'Vermelho', 'Cinza', 'Verde', 'Amarelo', 'Marrom']

  const handleFilterChange = (filterName: string, value: string | number) => {
    if (value === '' || value === 'Todas') {
      const newFilters = { ...filters }
      delete newFilters[filterName as keyof typeof filters]
      updateFilters(newFilters)
    } else {
      updateFilters({ [filterName]: value })
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <Filter className="w-6 h-6 mr-2 text-blue-600" />
          Filtros de Busca
        </h2>
        <button
          onClick={clearFilters}
          className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors"
        >
          <X className="w-4 h-4" />
          <span>Limpar Filtros</span>
        </button>
      </div>

      {/* Filtro por Marca */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Marca</h3>
        <div className="flex flex-wrap gap-2">
          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() => selectBrand(brand)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                selectedBrand === brand
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>

      {/* Filtros Avançados */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Cor */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cor
          </label>
          <select
            value={filters.color || 'Todas'}
            onChange={(e) => handleFilterChange('color', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {colors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>

        {/* Ano Mínimo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ano Mínimo
          </label>
          <input
            type="number"
            min="1990"
            max="2025"
            value={filters.minYear || ''}
            onChange={(e) => handleFilterChange('minYear', parseInt(e.target.value) || '')}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ex: 2015"
          />
        </div>

        {/* Ano Máximo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ano Máximo
          </label>
          <input
            type="number"
            min="1990"
            max="2025"
            value={filters.maxYear || ''}
            onChange={(e) => handleFilterChange('maxYear', parseInt(e.target.value) || '')}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ex: 2023"
          />
        </div>

        {/* Preço Mínimo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preço Mínimo (R$)
          </label>
          <input
            type="number"
            min="0"
            value={filters.minPrice || ''}
            onChange={(e) => handleFilterChange('minPrice', parseFloat(e.target.value) || '')}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ex: 30000"
          />
        </div>

        {/* Preço Máximo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preço Máximo (R$)
          </label>
          <input
            type="number"
            min="0"
            value={filters.maxPrice || ''}
            onChange={(e) => handleFilterChange('maxPrice', parseFloat(e.target.value) || '')}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ex: 150000"
          />
        </div>

        {/* KM Mínima */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            KM Mínima
          </label>
          <input
            type="number"
            min="0"
            value={filters.minMileage || ''}
            onChange={(e) => handleFilterChange('minMileage', parseInt(e.target.value) || '')}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ex: 10000"
          />
        </div>

        {/* KM Máxima */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            KM Máxima
          </label>
          <input
            type="number"
            min="0"
            value={filters.maxMileage || ''}
            onChange={(e) => handleFilterChange('maxMileage', parseInt(e.target.value) || '')}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ex: 100000"
          />
        </div>
      </div>
    </div>
  )
}

export default VehicleFilters
