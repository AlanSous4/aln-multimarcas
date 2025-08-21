
import { useState, useEffect } from 'react'
import { lumi } from '../lib/lumi'
import toast from 'react-hot-toast'

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

interface VehicleFilters {
  brand?: string
  color?: string
  minYear?: number
  maxYear?: number
  minPrice?: number
  maxPrice?: number
  minMileage?: number
  maxMileage?: number
}

export const useVehicles = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState<VehicleFilters>({})
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedBrand, setSelectedBrand] = useState<string>('Todas')
  const vehiclesPerPage = 10

  const fetchVehicles = async () => {
    setLoading(true)
    try {
      const { list } = await lumi.entities.vehicles.list()
      const availableVehicles = list.filter((vehicle: Vehicle) => vehicle.status === 'available')
      setVehicles(availableVehicles)
      setFilteredVehicles(availableVehicles)
    } catch (error) {
      console.error('Erro ao buscar veículos:', error)
      toast.error('Erro ao carregar veículos')
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = vehicles

    // Filtro por marca
    if (selectedBrand !== 'Todas') {
      filtered = filtered.filter(vehicle => vehicle.brand === selectedBrand)
    }

    // Filtros adicionais
    if (filters.color) {
      filtered = filtered.filter(vehicle => vehicle.color === filters.color)
    }

    if (filters.minYear) {
      filtered = filtered.filter(vehicle => vehicle.year >= filters.minYear!)
    }

    if (filters.maxYear) {
      filtered = filtered.filter(vehicle => vehicle.year <= filters.maxYear!)
    }

    if (filters.minPrice) {
      filtered = filtered.filter(vehicle => vehicle.price >= filters.minPrice!)
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(vehicle => vehicle.price <= filters.maxPrice!)
    }

    if (filters.minMileage) {
      filtered = filtered.filter(vehicle => vehicle.mileage >= filters.minMileage!)
    }

    if (filters.maxMileage) {
      filtered = filtered.filter(vehicle => vehicle.mileage <= filters.maxMileage!)
    }

    setFilteredVehicles(filtered)
    setCurrentPage(1) // Reset para primeira página
  }

  const updateFilters = (newFilters: Partial<VehicleFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  const clearFilters = () => {
    setFilters({})
    setSelectedBrand('Todas')
    setFilteredVehicles(vehicles)
    setCurrentPage(1)
  }

  const selectBrand = (brand: string) => {
    setSelectedBrand(brand)
    setCurrentPage(1)
  }

  // Paginação
  const totalPages = Math.ceil(filteredVehicles.length / vehiclesPerPage)
  const startIndex = (currentPage - 1) * vehiclesPerPage
  const endIndex = startIndex + vehiclesPerPage
  const currentVehicles = filteredVehicles.slice(startIndex, endIndex)

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const getUniqueValues = (key: keyof Vehicle) => {
    const values = vehicles.map(vehicle => vehicle[key])
    return [...new Set(values)].sort()
  }

  useEffect(() => {
    fetchVehicles()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [filters, selectedBrand, vehicles])

  return {
    vehicles: currentVehicles,
    allVehicles: vehicles,
    filteredVehicles,
    loading,
    filters,
    selectedBrand,
    currentPage,
    totalPages,
    vehiclesPerPage,
    updateFilters,
    clearFilters,
    selectBrand,
    goToPage,
    getUniqueValues,
    fetchVehicles
  }
}
