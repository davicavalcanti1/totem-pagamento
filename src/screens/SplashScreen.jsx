import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { OrderContext } from '../App'

export default function SplashScreen() {
  const navigate = useNavigate()
  const { clearOrder } = useContext(OrderContext)

  useEffect(() => {
    clearOrder()
  }, [])

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-orange-500 to-orange-700 cursor-pointer"
      onClick={() => navigate('/tipo')}
    >
      {/* Logo */}
      <div className="mb-8 flex items-center gap-4">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl">
          <span className="text-5xl">🍔</span>
        </div>
      </div>

      <h1 className="text-8xl font-black text-white tracking-tight mb-2">
        SelfBite
      </h1>
      <p className="text-2xl text-orange-100 font-medium tracking-widest uppercase mb-2">
        Self-Service Restaurante
      </p>

      <div className="mt-20 flex flex-col items-center gap-3">
        <div className="w-16 h-1 bg-white/40 rounded-full animate-pulse" />
        <p className="text-orange-100 text-2xl font-light tracking-widest animate-pulse">
          TOQUE PARA COMEÇAR
        </p>
        <div className="w-16 h-1 bg-white/40 rounded-full animate-pulse" />
      </div>

      <p className="absolute bottom-8 text-orange-200 text-sm">
        Faça seu pedido de forma rápida e prática
      </p>
    </div>
  )
}
