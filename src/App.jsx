import React, { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import SplashScreen from './screens/SplashScreen'
import OrderTypeScreen from './screens/OrderTypeScreen'
import ProductsScreen from './screens/ProductsScreen'
import PaymentScreen from './screens/PaymentScreen'
import ConfirmationScreen from './screens/ConfirmationScreen'

export const OrderContext = React.createContext(null)

export default function App() {
  const [order, setOrder] = useState({
    type: null,
    items: [],
  })

  const addItem = (product) => {
    setOrder((prev) => {
      const existing = prev.items.find((i) => i.id === product.id)
      if (existing) {
        return {
          ...prev,
          items: prev.items.map((i) =>
            i.id === product.id ? { ...i, qty: i.qty + 1 } : i
          ),
        }
      }
      return { ...prev, items: [...prev.items, { ...product, qty: 1 }] }
    })
  }

  const removeItem = (id) => {
    setOrder((prev) => ({
      ...prev,
      items: prev.items
        .map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0),
    }))
  }

  const clearOrder = () => setOrder({ type: null, items: [] })

  const total = order.items.reduce((sum, i) => sum + i.price * i.qty, 0)

  return (
    <OrderContext.Provider value={{ order, setOrder, addItem, removeItem, clearOrder, total }}>
      <div className="w-screen h-screen">
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/tipo" element={<OrderTypeScreen />} />
          <Route path="/produtos" element={<ProductsScreen />} />
          <Route path="/pagamento" element={<PaymentScreen />} />
          <Route path="/confirmacao" element={<ConfirmationScreen />} />
        </Routes>
      </div>
    </OrderContext.Provider>
  )
}
