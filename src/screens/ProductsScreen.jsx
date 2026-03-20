import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { OrderContext } from '../App'
import { categories, products } from '../data/products'

export default function ProductsScreen() {
  const navigate = useNavigate()
  const { order, addItem, removeItem, total } = useContext(OrderContext)
  const [activeCategory, setActiveCategory] = useState('Pratos')

  const filtered = products.filter((p) => p.category === activeCategory)

  const getQty = (id) => {
    const item = order.items.find((i) => i.id === id)
    return item ? item.qty : 0
  }

  const totalItems = order.items.reduce((s, i) => s + i.qty, 0)

  return (
    <div className="w-full h-full flex flex-col bg-gray-950">
      {/* Header */}
      <div className="bg-orange-600 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🍔</span>
          <div>
            <h1 className="text-white text-2xl font-black">SelfBite</h1>
            <p className="text-orange-200 text-xs">
              {order.type === 'aqui' ? '🪑 Comer Aqui' : '🛍️ Para Viagem'}
            </p>
          </div>
        </div>
        <button
          onClick={() => navigate('/tipo')}
          className="text-orange-200 hover:text-white text-sm transition-colors"
        >
          ← Voltar
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex bg-gray-900 border-b border-gray-800">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`flex-1 py-4 text-lg font-semibold transition-all duration-200 ${
              activeCategory === cat
                ? 'text-orange-400 border-b-4 border-orange-400 bg-gray-800'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Product Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-2 gap-4">
            {filtered.map((product) => {
              const qty = getQty(product.id)
              return (
                <div
                  key={product.id}
                  className="bg-gray-800 rounded-2xl p-5 flex flex-col gap-3 border border-gray-700 hover:border-orange-500/50 transition-colors"
                >
                  <div className="text-5xl text-center">{product.emoji}</div>
                  <div>
                    <h3 className="text-white font-bold text-lg">{product.name}</h3>
                    <p className="text-gray-400 text-sm mt-1 leading-tight">{product.description}</p>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-orange-400 text-xl font-bold">
                      R$ {product.price.toFixed(2).replace('.', ',')}
                    </span>
                    {qty === 0 ? (
                      <button
                        onClick={() => addItem(product)}
                        className="bg-orange-500 hover:bg-orange-400 active:scale-95 text-white font-bold px-5 py-2 rounded-xl transition-all text-lg"
                      >
                        + Adicionar
                      </button>
                    ) : (
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => removeItem(product.id)}
                          className="w-10 h-10 rounded-xl bg-gray-700 hover:bg-gray-600 active:scale-95 text-white text-xl font-bold flex items-center justify-center transition-all"
                        >
                          −
                        </button>
                        <span className="text-white text-xl font-bold w-6 text-center">{qty}</span>
                        <button
                          onClick={() => addItem(product)}
                          className="w-10 h-10 rounded-xl bg-orange-500 hover:bg-orange-400 active:scale-95 text-white text-xl font-bold flex items-center justify-center transition-all"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Cart Panel */}
        <div className="w-72 bg-gray-900 border-l border-gray-800 flex flex-col">
          <div className="px-5 py-4 border-b border-gray-800">
            <h2 className="text-white text-xl font-bold flex items-center gap-2">
              🛒 Meu Pedido
              {totalItems > 0 && (
                <span className="bg-orange-500 text-white text-sm rounded-full w-6 h-6 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-3">
            {order.items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <span className="text-5xl mb-3">🛒</span>
                <p className="text-gray-500 text-sm">Seu carrinho está vazio</p>
                <p className="text-gray-600 text-xs mt-1">Adicione itens ao lado</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 bg-gray-800 rounded-xl p-3">
                    <span className="text-2xl">{item.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">{item.name}</p>
                      <p className="text-orange-400 text-xs">
                        {item.qty}x R$ {item.price.toFixed(2).replace('.', ',')}
                      </p>
                    </div>
                    <span className="text-white text-sm font-bold">
                      R$ {(item.qty * item.price).toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Total + CTA */}
          <div className="px-4 py-4 border-t border-gray-800">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-400 text-lg">Total</span>
              <span className="text-orange-400 text-2xl font-black">
                R$ {total.toFixed(2).replace('.', ',')}
              </span>
            </div>
            <button
              disabled={order.items.length === 0}
              onClick={() => navigate('/pagamento')}
              className={`w-full py-4 rounded-2xl text-white font-bold text-xl transition-all duration-200 ${
                order.items.length === 0
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-orange-500 hover:bg-orange-400 active:scale-95 shadow-lg shadow-orange-500/30'
              }`}
            >
              Pagar Pedido →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
