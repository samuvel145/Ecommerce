import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../context/AppContext'

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, toggleSelect, selectedTotal, cartCount } = useApp()
  const navigate = useNavigate()

  const selectedCount = cartItems.filter(i => i.selected).length

  if (cartItems.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="max-w-[1280px] mx-auto px-4 md:px-8 py-20 text-center"
      >
        <p className="text-6xl mb-4">🛒</p>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Looks like you haven't added anything yet!</p>
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
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Shopping Cart ({cartCount})</h1>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-3 space-y-4">
          <AnimatePresence>
            {cartItems.map(item => (
              <motion.div
                key={`${item.productId}-${item.size}`}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.3 }}
                className="flex gap-4 bg-white rounded-2xl border border-gray-100 p-4 shadow-sm"
              >
                {/* Checkbox */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={item.selected}
                    onChange={() => toggleSelect(item.productId, item.size)}
                    className="w-5 h-5 rounded border-gray-300 text-violet-600 focus:ring-violet-500 cursor-pointer accent-violet-600"
                  />
                </div>

                {/* Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover flex-shrink-0"
                />

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-gray-800 truncate">{item.name}</h3>
                  <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-semibold bg-violet-100 text-violet-600 rounded-full">
                    Size: {item.size}
                  </span>
                  <p className="mt-1 text-base font-bold text-violet-600">₹{item.price}</p>

                  {/* Quantity + Remove */}
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center border border-gray-200 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-50 rounded-l-lg cursor-pointer text-sm font-medium"
                      >
                        −
                      </button>
                      <span className="px-3 py-1 text-sm font-semibold border-x border-gray-200 min-w-[2rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-50 rounded-r-lg cursor-pointer text-sm font-medium"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.productId, item.size)}
                      className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer text-sm"
                      title="Remove"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm lg:sticky lg:top-24">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Selected items</span>
                <span className="font-medium">{selectedCount} items</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-900">₹{selectedTotal}</span>
              </div>
              <hr className="border-gray-100" />
              <div className="flex justify-between text-lg font-bold text-gray-900">
                <span>Total</span>
                <span className="text-violet-600">₹{selectedTotal}</span>
              </div>
            </div>
            <motion.button
              whileHover={selectedCount > 0 ? { scale: 1.02 } : {}}
              whileTap={selectedCount > 0 ? { scale: 0.98 } : {}}
              onClick={() => navigate('/checkout')}
              disabled={selectedCount === 0}
              className={`w-full mt-6 py-3 rounded-xl font-semibold transition-colors cursor-pointer ${
                selectedCount > 0
                  ? 'bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-200'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Proceed to Checkout
            </motion.button>
            {selectedCount === 0 && (
              <p className="text-xs text-gray-400 text-center mt-2">Select items to continue</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
