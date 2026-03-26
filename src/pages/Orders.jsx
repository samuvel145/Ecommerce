import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useApp } from '../context/AppContext'

export default function Orders() {
  const { currentUser } = useApp()
  const navigate = useNavigate()

  const ordersKey = `etrends_orders_${currentUser?.id}`
  const orders = JSON.parse(localStorage.getItem(ordersKey) || '[]')

  const formatDate = (dateStr) => {
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })
  }

  if (orders.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="max-w-[1280px] mx-auto px-4 md:px-8 py-20 text-center"
      >
        <p className="text-6xl mb-4">📦</p>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">No orders yet</h2>
        <p className="text-gray-500 mb-6">Start shopping and your orders will appear here!</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="px-8 py-3 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-xl transition-colors cursor-pointer"
        >
          Start Shopping
        </motion.button>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-[1280px] mx-auto px-4 md:px-8 py-8"
    >
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">My Orders</h1>

      <div className="space-y-6">
        {orders.map((order, idx) => (
          <motion.div
            key={order.orderId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
          >
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 px-6 py-4 bg-gray-50 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono text-gray-500">{order.orderId}</span>
                <span className="text-xs text-gray-400">{formatDate(order.date)}</span>
              </div>
              <span className="inline-block px-3 py-1 text-[10px] font-semibold uppercase tracking-wider bg-green-100 text-green-600 rounded-full">
                {order.status}
              </span>
            </div>

            {/* Items */}
            <div className="px-6 py-4 space-y-3">
              {order.items.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{item.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] px-2 py-0.5 bg-violet-100 text-violet-600 rounded-full font-semibold">
                        {item.size}
                      </span>
                      <span className="text-xs text-gray-400">× {item.quantity}</span>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-gray-700">₹{item.price * item.quantity}</p>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-t border-gray-100">
              <span className="text-xs text-gray-500">
                {order.paymentMethod}
              </span>
              <span className="text-base font-bold text-violet-600">
                Total: ₹{order.total}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
