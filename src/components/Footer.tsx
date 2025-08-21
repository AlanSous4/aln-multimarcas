
import React from 'react'
import { MapPin, Instagram, Facebook, MessageCircle, Phone, Mail } from 'lucide-react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Informações da Loja */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-blue-400">ALN MULTIMARCAS</h3>
            <p className="text-gray-300 mb-4">
              Sua concessionária de confiança para carros nacionais e importados.
            </p>
            <div className="flex items-start space-x-2 text-gray-300">
              <MapPin className="w-5 h-5 mt-1 text-blue-400" />
              <div>
                <p>Rua Treze de Maio, 01</p>
                <p>Cantinho do Céu</p>
                <p>São Paulo - SP</p>
              </div>
            </div>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-blue-400">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-gray-300">
                <Phone className="w-5 h-5 text-blue-400" />
                <span>(11) 99999-9999</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Mail className="w-5 h-5 text-blue-400" />
                <span>contato@alnmultimarcas.com</span>
              </div>
            </div>
          </div>

          {/* Redes Sociais */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-blue-400">Redes Sociais</h3>
            <div className="space-y-3">
              <a
                href="https://instagram.com/alan.1675"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors"
              >
                <Instagram className="w-5 h-5" />
                <span>@alan.1675</span>
              </a>
              <a
                href="https://facebook.com/alan.1675"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors"
              >
                <Facebook className="w-5 h-5" />
                <span>alan.1675</span>
              </a>
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-300 hover:text-green-400 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span>(11) 99999-9999</span>
              </a>
            </div>
          </div>

          {/* Localização */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-blue-400">Localização</h3>
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3654.1234567890!2d-46.123456!3d-23.123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDA3JzI0LjQiUyA0NsKwMDcnMjQuNCJX!5e0!3m2!1spt-BR!2sbr!4v1234567890123"
                width="100%"
                height="150"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização ALN Multimarcas"
                className="grayscale hover:grayscale-0 transition-all duration-300"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Linha divisória */}
        <div className="border-t border-gray-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 ALN MULTIMARCAS. Todos os direitos reservados.
            </p>
            <p className="text-gray-400 text-sm mt-2 md:mt-0">
              Desenvolvido com ❤️ para oferecer a melhor experiência
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
