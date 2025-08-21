
import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { LogOut, User, Car } from 'lucide-react'

const Header: React.FC = () => {
  const { user, isAuthenticated, signOut } = useAuth()

  return (
    <header className="relative">
      {/* Imagem de fundo com opacidade */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg)',
          height: '300px'
        }}
      />
      
      {/* Overlay escuro para melhor legibilidade */}
      <div className="absolute inset-0 bg-black bg-opacity-50" style={{ height: '300px' }} />
      
      {/* Conteúdo do header */}
      <div className="relative z-10 px-4 py-6" style={{ height: '300px' }}>
        {/* Barra de navegação superior */}
        <nav className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-2">
            <Car className="text-blue-500 w-8 h-8" />
            <span className="text-white font-semibold text-lg">ALN MULTIMARCAS</span>
          </div>
          
          {isAuthenticated && user && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-white">
                <User className="w-5 h-5" />
                <span className="hidden sm:inline">Olá, {user.userName}</span>
              </div>
              <button
                onClick={signOut}
                className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Sair</span>
              </button>
            </div>
          )}
        </nav>
        
        {/* Logo principal centralizado */}
        <div className="flex flex-col items-center justify-center text-center h-full">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 drop-shadow-2xl">
            ALN MULTIMARCAS
          </h1>
          <p className="text-xl md:text-2xl text-white font-light drop-shadow-lg">
            Carros Nacionais e Importados
          </p>
          <p className="text-lg text-blue-200 mt-2 drop-shadow-lg">
            Os melhores veículos com as melhores condições
          </p>
        </div>
      </div>
    </header>
  )
}

export default Header
