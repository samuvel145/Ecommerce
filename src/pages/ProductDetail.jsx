import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import products from '../data/products'
import { useApp } from '../context/AppContext'

const sizeList = ['S', 'M', 'L', 'XL']

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart, currentUser } = useApp()
  const product = products.find(p => p.id === id)

  const [selectedSize, setSelectedSize] = useState(null)
  const [added, setAdded] = useState(false)
  const [shake, setShake] = useState(false)

  if (!product) {
    return (
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-20 text-center">
        <p className="text-4xl mb-3">😕</p>
        <p className="text-lg font-medium text-gray-600">Product not found</p>
        <button onClick={() => navigate('/')} className="mt-4 px-6 py-2 bg-violet-600 text-white rounded-xl cursor-pointer">Back to Home</button>
      </div>
    )
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      setShake(true)
      setTimeout(() => setShake(false), 500)
      return
    }
    if (!currentUser) {
      navigate(`/login?redirect=/product/${product.id}`)
      return
    }
    addToCart({
      productId: product.id,
      name: product.name,
      image: product.image,
      size: selectedSize,
      price: product.sizes[selectedSize],
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-[1280px] mx-auto px-4 md:px-8 py-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="aspect-[3/4] rounded-2xl overflow-hidden bg-gray-50"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Details */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="flex flex-col justify-center"
        >
          <span className="inline-block w-fit px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-violet-100 text-violet-600 mb-4">
            {product.category === 'boys' ? '👦 Boys' : '👧 Girls'} · {product.subCategory}
          </span>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            {product.name}
          </h1>

          <p className="text-gray-600 mb-6 leading-relaxed">
            {product.description}
          </p>

          {/* Price */}
          <div className="mb-6">
            <AnimatePresence mode="wait">
              {selectedSize ? (
                <motion.p
                  key={selectedSize}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-3xl font-bold text-violet-600"
                >
                  ₹{product.sizes[selectedSize]}
                </motion.p>
              ) : (
                <motion.p
                  key="no-size"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-lg text-gray-400"
                >
                  Select a size to see price
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Size Selector */}
          <div className="mb-8">
            <p className="text-sm font-medium text-gray-700 mb-3">Choose Size</p>
            <div className="flex gap-3">
              {sizeList.map(size => (
                <motion.button
                  key={size}
                  whileTap={{ scale: 0.9 }}
                  animate={selectedSize === size ? { scale: 1.1 } : { scale: 1 }}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                    selectedSize === size
                      ? 'bg-violet-600 text-white shadow-lg shadow-violet-200'
                      : 'bg-white text-gray-700 border border-gray-200 hover:border-violet-300'
                  }`}
                >
                  {size}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <motion.button
            animate={shake ? { x: [0, -10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.4 }}
            whileHover={selectedSize ? { scale: 1.03 } : {}}
            whileTap={selectedSize ? { scale: 0.97 } : {}}
            onClick={handleAddToCart}
            disabled={added}
            className={`w-full py-4 rounded-xl text-base font-semibold transition-colors cursor-pointer ${
              added
                ? 'bg-green-500 text-white'
                : selectedSize
                  ? 'bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-200'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {added ? '✓ Added to Cart!' : selectedSize ? 'Add to Cart' : 'Select a size first'}
          </motion.button>

          {!selectedSize && (
            <p className="mt-2 text-xs text-gray-400 text-center">Please select a size to continue</p>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}
