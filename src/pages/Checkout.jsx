import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useApp } from '../context/AppContext'

export default function Checkout() {
  const { cartItems, selectedTotal, clearCart, currentUser } = useApp()
  const navigate = useNavigate()
  const selectedItems = cartItems.filter(i => i.selected)

  const [fullName, setFullName] = useState('')
  const [address, setAddress] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [upiId, setUpiId] = useState('')

  useEffect(() => {
    if (selectedItems.length === 0) {
      navigate('/cart', { replace: true })
    }
  }, [])

  const handlePlaceOrder = () => {
    const order = {
      orderId: `ORD-${Date.now()}`,
      date: new Date().toISOString(),
      items: selectedItems.map(item => ({
        productId: item.productId,
        name: item.name,
        image: item.image,
        size: item.size,
        price: item.price,
        quantity: item.quantity,
      })),
      total: selectedTotal,
      paymentMethod: paymentMethod === 'upi' ? 'UPI' : 'Cash on Delivery',
      deliveryName: fullName,
      deliveryAddress: address,
      status: 'Confirmed',
    }

    // Save order
    const ordersKey = `ekids_orders_${currentUser.id}`
    const existingOrders = JSON.parse(localStorage.getItem(ordersKey) || '[]')
    existingOrders.unshift(order)
    localStorage.setItem(ordersKey, JSON.stringify(existingOrders))

    clearCart()
    navigate('/order-success', { replace: true })
  }

  if (selectedItems.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-[1280px] mx-auto px-4 md:px-8 py-8"
    >
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Form */}
        <div className="lg:col-span-3 space-y-6">
          {/* Delivery Details */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm"
          >
            <h2 className="text-lg font-bold text-gray-900 mb-4">Delivery Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
                <textarea
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  placeholder="Enter your delivery address"
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition text-sm resize-none"
                />
              </div>
            </div>
          </motion.div>

          {/* Payment Method */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm"
          >
            <h2 className="text-lg font-bold text-gray-900 mb-4">Payment Method</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => setPaymentMethod('upi')}
                className={`p-4 rounded-xl border-2 text-left transition-colors cursor-pointer ${
                  paymentMethod === 'upi'
                    ? 'border-violet-500 bg-violet-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <p className="font-semibold text-gray-800">💳 UPI</p>
                <p className="text-xs text-gray-500 mt-1">Pay via UPI ID</p>
              </button>
              <button
                onClick={() => setPaymentMethod('cod')}
                className={`p-4 rounded-xl border-2 text-left transition-colors cursor-pointer ${
                  paymentMethod === 'cod'
                    ? 'border-violet-500 bg-violet-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <p className="font-semibold text-gray-800">💵 Cash on Delivery</p>
                <p className="text-xs text-gray-500 mt-1">Pay when you receive</p>
              </button>
            </div>

            {paymentMethod === 'upi' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4"
              >
                <label className="block text-sm font-medium text-gray-700 mb-1">UPI ID</label>
                <input
                  type="text"
                  value={upiId}
                  onChange={e => setUpiId(e.target.value)}
                  placeholder="yourname@upi"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition text-sm"
                />
              </motion.div>
            )}
          </motion.div>

          {/* Place Order Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handlePlaceOrder}
            className="w-full py-4 bg-violet-600 hover:bg-violet-700 text-white text-lg font-semibold rounded-xl transition-colors shadow-lg shadow-violet-200 cursor-pointer"
          >
            Place Order — ₹{selectedTotal}
          </motion.button>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm lg:sticky lg:top-24">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {selectedItems.map(item => (
                <div key={`${item.productId}-${item.size}`} className="flex gap-3 pb-3 border-b border-gray-50 last:border-0">
                  <img src={item.image} alt={item.name} className="w-14 h-14 rounded-lg object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-800 truncate">{item.name}</p>
                    <p className="text-[10px] text-gray-500">Size: {item.size} × {item.quantity}</p>
                    <p className="text-sm font-bold text-violet-600">₹{item.price * item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
            <hr className="my-4 border-gray-100" />
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">{selectedItems.length} items</span>
              <span className="text-lg font-bold text-violet-600">₹{selectedTotal}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
