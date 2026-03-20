import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { OrderContext } from '../App'

export default function OrderTypeScreen() {
  const navigate = useNavigate()
  const { setOrder, order } = useContext(OrderContext)

  const choose = (type) => {
    setOrder((prev) => ({ ...prev, type }))
    navigate('/produtos')
  }

  return (
    <div className="w-full h-full flex flex-col bg-gray-950">
      {/* Header */}
      <div className="bg-orange-600 px-8 py-6 flex items-center gap-4">
        <span className="text-4xl">🍔</span>
        <div>
          <h1 className="text-white text-3xl font-black">SelfBite</h1>
          <p className="text-orange-200 text-sm">Self-Service Restaurante</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center gap-10 px-12">
        <div className="text-center mb-6">
          <h2 className="text-white text-4xl font-bold mb-2">Como será seu pedido?</h2>
          <p className="text-gray-400 text-xl">Selecione uma opção abaixo</p>
        </div>

        <div className="flex gap-10 w-full max-w-3xl">
          {/* Comer Aqui */}
          <button
            className="flex-1 flex flex-col items-center justify-center gap-6 bg-gray-800 hover:bg-orange-600 active:scale-95 transition-all duration-200 rounded-3xl py-16 border-2 border-gray-700 hover:border-orange-500 shadow-xl"
            onClick={() => choose('aqui')}
          >
            <span className="text-8xl">🪑</span>
            <div className="text-center">
              <p className="text-white text-3xl font-bold">Comer Aqui</p>
              <p className="text-gray-400 text-lg mt-2">Vou consumir no local</p>
            </div>
          </button>

          {/* Para Viagem */}
          <button
            className="flex-1 flex flex-col items-center justify-center gap-6 bg-gray-800 hover:bg-orange-600 active:scale-95 transition-all duration-200 rounded-3xl py-16 border-2 border-gray-700 hover:border-orange-500 shadow-xl"
            onClick={() => choose('viagem')}
          >
            <span className="text-8xl">🛍️</span>
            <div className="text-center">
              <p className="text-white text-3xl font-bold">Para Viagem</p>
              <p className="text-gray-400 text-lg mt-2">Vou levar para fora</p>
            </div>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="py-4 text-center">
        <button
          onClick={() => navigate('/')}
          className="text-gray-600 hover:text-gray-400 text-sm transition-colors"
        >
          ← Voltar ao início
        </button>
      </div>
    </div>
  )
}
