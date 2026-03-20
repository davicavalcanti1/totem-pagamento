import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react'
import { OrderContext } from '../App'

function generateFakePix(amount) {
  const random = Math.random().toString(36).substring(2, 12).toUpperCase()
  return `00020126580014BR.GOV.BCB.PIX0136selfbite@pix.com.br5204000053039865406${amount.toFixed(2)}5802BR5909SELFBITE6009SAO PAULO62070503${random}6304ABCD`
}

function CardMachine({ onApprove }) {
  const [pressed, setPressed] = useState(false)

  const handleGreen = () => {
    setPressed(true)
    setTimeout(() => {
      onApprove()
    }, 1200)
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <p className="text-gray-300 text-xl text-center">
        Insira, aproxime ou passe seu cartão na maquineta abaixo e pressione o botão verde para confirmar.
      </p>

      {/* Maquineta */}
      <div className="flex flex-col items-center">
        <div className="w-56 bg-gray-700 rounded-t-3xl rounded-b-lg shadow-2xl border border-gray-600 overflow-hidden">
          {/* Display */}
          <div className="bg-gray-900 mx-4 mt-4 rounded-xl p-3 border border-gray-700">
            {pressed ? (
              <div className="text-center">
                <p className="text-green-400 text-sm font-bold">APROVADO ✓</p>
                <p className="text-green-300 text-xs">Processando...</p>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-green-400 text-xs">INSIRA O CARTÃO</p>
                <p className="text-white text-lg font-bold mt-1">Aguardando...</p>
              </div>
            )}
          </div>

          {/* Card slot */}
          <div className="mx-6 my-3 h-2 bg-gray-900 rounded-full border border-gray-600" />

          {/* Keypad */}
          <div className="px-5 pb-2">
            <div className="grid grid-cols-3 gap-2 mb-2">
              {[1,2,3,4,5,6,7,8,9].map(n => (
                <div key={n} className="h-8 bg-gray-600 rounded-lg flex items-center justify-center text-gray-300 text-sm font-medium">
                  {n}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="h-8 bg-red-700 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                C
              </div>
              <div className="h-8 bg-gray-600 rounded-lg flex items-center justify-center text-gray-300 text-sm font-medium">
                0
              </div>
              <div className="h-8 bg-yellow-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                ⌫
              </div>
            </div>
          </div>

          {/* Green confirm button */}
          <div className="px-5 pb-5">
            <button
              onClick={handleGreen}
              disabled={pressed}
              className={`w-full h-14 rounded-2xl text-white font-black text-xl shadow-lg transition-all duration-150 ${
                pressed
                  ? 'bg-green-800 scale-95'
                  : 'bg-green-500 hover:bg-green-400 active:scale-95 shadow-green-500/50'
              }`}
            >
              {pressed ? '✓' : '✓ CONFIRMAR'}
            </button>
          </div>

          {/* Chip reader */}
          <div className="bg-gray-800 mx-4 mb-4 h-3 rounded-sm border border-gray-600" />
        </div>
        <div className="w-40 h-3 bg-gray-800 rounded-b-xl" />
      </div>
    </div>
  )
}

export default function PaymentScreen() {
  const navigate = useNavigate()
  const { total, order } = useContext(OrderContext)
  const [method, setMethod] = useState(null)

  const pixCode = generateFakePix(total)

  return (
    <div className="w-full h-full flex flex-col bg-gray-950">
      {/* Header */}
      <div className="bg-orange-600 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🍔</span>
          <div>
            <h1 className="text-white text-2xl font-black">SelfBite</h1>
            <p className="text-orange-200 text-xs">Pagamento</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/produtos')}
          className="text-orange-200 hover:text-white text-sm transition-colors"
        >
          ← Voltar
        </button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Order Summary */}
        <div className="w-80 bg-gray-900 border-r border-gray-800 flex flex-col">
          <div className="px-5 py-4 border-b border-gray-800">
            <h2 className="text-white text-lg font-bold">Resumo do Pedido</h2>
            <p className="text-gray-400 text-sm">
              {order.type === 'aqui' ? '🪑 Comer Aqui' : '🛍️ Para Viagem'}
            </p>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-2">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-800">
                <div>
                  <p className="text-white text-sm font-medium">{item.emoji} {item.name}</p>
                  <p className="text-gray-500 text-xs">{item.qty}x R$ {item.price.toFixed(2).replace('.', ',')}</p>
                </div>
                <p className="text-orange-400 text-sm font-bold">
                  R$ {(item.qty * item.price).toFixed(2).replace('.', ',')}
                </p>
              </div>
            ))}
          </div>
          <div className="px-5 py-4 border-t border-gray-800">
            <div className="flex justify-between">
              <span className="text-gray-400 text-lg">Total</span>
              <span className="text-orange-400 text-2xl font-black">
                R$ {total.toFixed(2).replace('.', ',')}
              </span>
            </div>
          </div>
        </div>

        {/* Payment Area */}
        <div className="flex-1 flex flex-col items-center justify-center px-12 py-8 overflow-y-auto">
          {!method ? (
            <div className="w-full max-w-xl flex flex-col items-center gap-8">
              <div className="text-center">
                <h2 className="text-white text-3xl font-bold mb-2">Como deseja pagar?</h2>
                <p className="text-gray-400">Selecione a forma de pagamento</p>
              </div>
              <div className="flex gap-6 w-full">
                <button
                  onClick={() => setMethod('pix')}
                  className="flex-1 flex flex-col items-center gap-4 bg-gray-800 hover:bg-green-700 active:scale-95 transition-all rounded-2xl py-10 border-2 border-gray-700 hover:border-green-500"
                >
                  <span className="text-6xl">📱</span>
                  <div className="text-center">
                    <p className="text-white text-2xl font-bold">PIX</p>
                    <p className="text-gray-400 text-sm mt-1">Aprovação instantânea</p>
                  </div>
                </button>
                <button
                  onClick={() => setMethod('card')}
                  className="flex-1 flex flex-col items-center gap-4 bg-gray-800 hover:bg-blue-700 active:scale-95 transition-all rounded-2xl py-10 border-2 border-gray-700 hover:border-blue-500"
                >
                  <span className="text-6xl">💳</span>
                  <div className="text-center">
                    <p className="text-white text-2xl font-bold">Cartão</p>
                    <p className="text-gray-400 text-sm mt-1">Débito ou crédito</p>
                  </div>
                </button>
              </div>
            </div>
          ) : method === 'pix' ? (
            <div className="flex flex-col items-center gap-6 w-full max-w-md">
              <div className="text-center">
                <h2 className="text-white text-2xl font-bold">Pague com PIX</h2>
                <p className="text-gray-400 text-sm mt-1">Escaneie o QR Code com seu app bancário</p>
              </div>
              <div className="bg-white p-5 rounded-2xl shadow-2xl">
                <QRCodeSVG value={pixCode} size={220} />
              </div>
              <div className="bg-gray-800 rounded-xl px-5 py-3 w-full text-center">
                <p className="text-gray-400 text-xs mb-1">Valor a pagar</p>
                <p className="text-green-400 text-3xl font-black">
                  R$ {total.toFixed(2).replace('.', ',')}
                </p>
              </div>
              <div className="flex items-center gap-2 text-yellow-400 text-sm animate-pulse">
                <span>⏳</span>
                <span>Aguardando pagamento...</span>
              </div>
              <button
                onClick={() => navigate('/confirmacao')}
                className="w-full py-4 bg-green-600 hover:bg-green-500 active:scale-95 text-white font-bold text-xl rounded-2xl transition-all"
              >
                ✓ Simular Pagamento PIX
              </button>
              <button
                onClick={() => setMethod(null)}
                className="text-gray-500 hover:text-gray-300 text-sm transition-colors"
              >
                ← Escolher outro método
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-6 w-full max-w-md">
              <div className="text-center">
                <h2 className="text-white text-2xl font-bold">Pague com Cartão</h2>
                <div className="bg-gray-800 rounded-xl px-5 py-2 mt-2">
                  <p className="text-orange-400 text-2xl font-black">
                    R$ {total.toFixed(2).replace('.', ',')}
                  </p>
                </div>
              </div>
              <CardMachine onApprove={() => navigate('/confirmacao')} />
              <button
                onClick={() => setMethod(null)}
                className="text-gray-500 hover:text-gray-300 text-sm transition-colors"
              >
                ← Escolher outro método
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
