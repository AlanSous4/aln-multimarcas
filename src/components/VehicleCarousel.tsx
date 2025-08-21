
import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const VehicleCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const carouselImages = [
    {
      url: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg',
      title: 'Volkswagen Golf',
      description: 'Elegância e performance'
    },
    {
      url: 'https://images.pexels.com/photos/1429775/pexels-photo-1429775.jpeg',
      title: 'Chevrolet Onix',
      description: 'Economia e confiabilidade'
    },
    {
      url: 'https://images.pexels.com/photos/2920064/pexels-photo-2920064.jpeg',
      title: 'Hyundai HB20',
      description: 'Tecnologia e conforto'
    },
    {
      url: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg',
      title: 'Honda Civic',
      description: 'Luxo e sofisticação'
    },
    {
      url: 'https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg',
      title: 'Fiat Argo',
      description: 'Praticidade urbana'
    },
    {
      url: 'https://images.pexels.com/photos/1035108/pexels-photo-1035108.jpeg',
      title: 'Toyota Corolla',
      description: 'Híbrido e sustentável'
    },
    {
      url: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg',
      title: 'Ford Ka',
      description: 'Compacto e ágil'
    },
    {
      url: 'https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg',
      title: 'Citroën C3',
      description: 'Design diferenciado'
    },
    {
      url: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg',
      title: 'BMW Série 3',
      description: 'Luxo alemão'
    },
    {
      url: 'https://images.pexels.com/photos/2127733/pexels-photo-2127733.jpeg',
      title: 'Mercedes-Benz',
      description: 'Prestígio e elegância'
    }
  ]

  // Auto-play com 4 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [carouselImages.length])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
  }

  return (
    <section className="relative w-full h-96 md:h-[500px] overflow-hidden bg-gray-900 rounded-lg shadow-2xl">
      {/* Imagens do carrossel */}
      <div 
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {carouselImages.map((image, index) => (
          <div key={index} className="w-full h-full flex-shrink-0 relative">
            <img
              src={image.url}
              alt={image.title}
              className="w-full h-full object-cover"
            />
            {/* Overlay com informações */}
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
              <div className="p-6 text-white">
                <h3 className="text-2xl md:text-3xl font-bold mb-2">{image.title}</h3>
                <p className="text-lg opacity-90">{image.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controles de navegação */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-300"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-300"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Indicadores */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white scale-110' 
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
          />
        ))}
      </div>

      {/* Título da seção */}
      <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg">
        <h2 className="text-xl font-bold">Nossos Veículos em Destaque</h2>
      </div>
    </section>
  )
}

export default VehicleCarousel
