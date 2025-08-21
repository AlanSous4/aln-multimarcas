
import React, { useState } from 'react'
import { X, CreditCard, DollarSign, Smartphone, Car, Calendar, Gauge } from 'lucide-react'
import toast from 'react-hot-toast'

interface Vehicle {
  _id: string
  brand: string
  model: string
  year: number
  price: number
  mileage: number
  color: string
  images: string[]
}

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  vehicle: Vehicle | null
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, vehicle }) => {
  const [paymentMethod, setPaymentMethod] = useState<string>('credit_card')
  const [installments, setInstallments] = useState<number>(1)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    cpf: '',
    phone: ''
  })

  if (!isOpen || !vehicle) return null

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat('pt-BR').format(mileage)
  }

  const calculateInstallmentValue = () => {
    return vehicle.price / installments
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    // Formatação específica para campos
    if (name === 'cardNumber') {
      const formatted = value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ').trim()
      setFormData({ ...formData, [name]: formatted })
    } else if (name === 'expiryDate') {
      const formatted = value.replace(/\D/g, '').replace(/(\d{2})(\d{2})/, '$1/$2')
      setFormData({ ...formData, [name]: formatted })
    } else if (name === 'cvv') {
      const formatted = value.replace(/\D/g, '').slice(0, 3)
      setFormData({ ...formData, [name]: formatted })
    } else if (name === 'cpf') {
      const formatted = value.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
      setFormData({ ...formData, [name]: formatted })
    } else if (name === 'phone') {
      const formatted = value.replace(/\D/g, '').replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
      setFormData({ ...formData, [name]: formatted })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulação de processamento de pagamento
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast.success('Pagamento processado com sucesso! Entraremos em contato em breve.')
      onClose()
      
      // Reset form
      setFormData({
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: '',
        cpf: '',
        phone: ''
      })
      setPaymentMethod('credit_card')
      setInstallments(1)
    } catch (error) {
      toast.error('Erro ao processar pagamento. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const paymentMethods = [
    { id: 'credit_card', name: 'Cartão de Crédito à Vista', icon: CreditCard },
    { id: 'credit_installments', name: 'Cartão de Crédito Parcelado', icon: CreditCard },
    { id: 'debit_card', name: 'Cartão de Débito', icon: CreditCard },
    { id: 'cash', name: 'Dinheiro', icon: DollarSign },
    { id: 'pix', name: 'PIX', icon: Smartphone }
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Finalizar Compra</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
          {/* Resumo do Veículo */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <Car className="w-6 h-6 mr-2 text-blue-600" />
              Veículo Selecionado
            </h3>
            
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <img
                src={vehicle.images[0] || 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg'}
                alt={`${vehicle.brand} ${vehicle.model}`}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              
              <h4 className="text-lg font-bold text-gray-800 mb-2">
                {vehicle.brand} {vehicle.model} {vehicle.year}
              </h4>
              
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center justify-between">
                  <span>Cor:</span>
                  <span className="font-medium">{vehicle.color}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Ano:
                  </span>
                  <span className="font-medium">{vehicle.year}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Gauge className="w-4 h-4 mr-1" />
                    Quilometragem:
                  </span>
                  <span className="font-medium">{formatMileage(vehicle.mileage)} km</span>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex items-center justify-between text-lg font-bold">
                  <span>Valor Total:</span>
                  <span className="text-blue-600">{formatPrice(vehicle.price)}</span>
                </div>
                
                {paymentMethod === 'credit_installments' && installments > 1 && (
                  <div className="text-sm text-gray-600 mt-2">
                    {installments}x de {formatPrice(calculateInstallmentValue())}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Formulário de Pagamento */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Dados de Pagamento</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Método de Pagamento */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Forma de Pagamento
                </label>
                <div className="space-y-2">
                  {paymentMethods.map((method) => {
                    const IconComponent = method.icon
                    return (
                      <label key={method.id} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.id}
                          checked={paymentMethod === method.id}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <IconComponent className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-700">{method.name}</span>
                      </label>
                    )
                  })}
                </div>
              </div>

              {/* Parcelamento */}
              {paymentMethod === 'credit_installments' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Número de Parcelas
                  </label>
                  <select
                    value={installments}
                    onChange={(e) => setInstallments(parseInt(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {Array.from({ length: 36 }, (_, i) => i + 1).map((num) => (
                      <option key={num} value={num}>
                        {num}x de {formatPrice(vehicle.price / num)}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Campos do Cartão */}
              {(paymentMethod === 'credit_card' || paymentMethod === 'credit_installments' || paymentMethod === 'debit_card') && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Número do Cartão
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      maxLength={19}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0000 0000 0000 0000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome no Cartão
                    </label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Nome como está no cartão"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Validade
                      </label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        maxLength={5}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="MM/AA"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        maxLength={3}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="123"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Dados Pessoais */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CPF
                </label>
                <input
                  type="text"
                  name="cpf"
                  value={formData.cpf}
                  onChange={handleInputChange}
                  maxLength={14}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="000.000.000-00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefone
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  maxLength={15}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="(11) 99999-9999"
                />
              </div>

              {/* Informação PIX */}
              {paymentMethod === 'pix' && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Pagamento via PIX</h4>
                  <p className="text-blue-700 text-sm">
                    Após confirmar, você receberá um código PIX para pagamento.
                    O pagamento deve ser realizado em até 30 minutos.
                  </p>
                </div>
              )}

              {/* Informação Dinheiro */}
              {paymentMethod === 'cash' && (
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Pagamento em Dinheiro</h4>
                  <p className="text-green-700 text-sm">
                    O pagamento em dinheiro deve ser realizado na loja física.
                    Entraremos em contato para agendar.
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Processando...' : 'Finalizar Compra'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentModal
