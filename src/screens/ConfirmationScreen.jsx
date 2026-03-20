import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { OrderContext } from '../App'

function StarRating({ rating, onRate }) {
  return (
    <div className="flex gap-3">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => onRate(star)}
          className={`text-5xl transition-all duration-150 active:scale-95 ${
            star <= rating ? 'opacity-100' : 'opacity-30'
          }`}
        >
          ⭐
        </button>
      ))}
    </div>
  )
}

export default function ConfirmationScreen() {
  const navigate = useNavigate()
  const { order, total } = useContext(OrderContext)
  const [rating, setRating] = useState(0)
  const [rated, setRated] = useState(false)
  const [countdown, setCountdown] = useState(20)
  const orderNumber = Math.floor(Math.random() * 900) + 100

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(timer)
          navigate('/')
          return 0
        }
        return c - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleRate = (star) => {
    setRating(star)
    setRated(true)
    setTimeout(() => navigate('/'), 2500)
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-950 px-12">
      {/* Success icon */}
      <div className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-green-500/40">
        <span className="text-6xl">✓</span>
      </div>

      <h1 className="text-white text-5xl font-black mb-3 text-center">
        Pedido Confirmado!
      </h1>
      <p className="text-green-400 text-2xl font-semibold mb-2">Pagamento realizado com sucesso</p>

      {/* Order number */}
      <div className="bg-gray-800 rounded-2xl px-10 py-5 mt-4 mb-8 text-center border border-gray-700">
        <p className="text-gray-400 text-sm mb-1">Número do seu pedido</p>
        <p className="text-orange-400 text-6xl font-black">#{orderNumber}</p>
        <p className="text-gray-500 text-sm mt-2">
          {order.type === 'aqui' ? '🪑 Consumo no local' : '🛍️ Para viagem'}
        </p>
      </div>

      {/* Items summary */}
      <div className="flex flex-wrap gap-2 justify-center mb-8 max-w-lg">
        {order.items.map((item) => (
          <div key={item.id} className="bg-gray-800 rounded-lg px-3 py-1 text-sm text-gray-300">
            {item.emoji} {item.name} x{item.qty}
          </div>
        ))}
      </div>

      <p className="text-gray-400 text-lg mb-1">
        Total pago: <span className="text-white font-bold">R$ {total.toFixed(2).replace('.', ',')}</span>
      </p>

      {/* Divider */}
      <div className="w-full max-w-sm h-px bg-gray-800 my-8" />

      {/* Rating */}
      {!rated ? (
        <div className="flex flex-col items-center gap-5">
          <p className="text-white text-2xl font-bold">Como foi sua experiência?</p>
          <p className="text-gray-400">Avalie o atendimento</p>
          <StarRating rating={rating} onRate={handleRate} />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3">
          <StarRating rating={rating} onRate={() => {}} />
          <p className="text-green-400 text-xl font-bold">Obrigado pela avaliação! 😊</p>
          <p className="text-gray-400 text-sm">Redirecionando para o início...</p>
        </div>
      )}

      {/* Auto redirect */}
      {!rated && (
        <p className="absolute bottom-8 text-gray-600 text-sm">
          Voltando ao início em {countdown}s
        </p>
      )}
    </div>
  )
}
