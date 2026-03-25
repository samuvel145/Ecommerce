import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function OrderSuccess() {
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 py-12"
    >
      {/* Animated Checkmark */}
      <div className="relative mb-8">
        <svg width="120" height="120" viewBox="0 0 120 120">
          {/* Circle */}
          <motion.circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="#10B981"
            strokeWidth="4"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          />
          {/* Checkmark */}
          <motion.path
            d="M35 62 L52 78 L85 45"
            fill="none"
            stroke="#10B981"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.4, delay: 0.5, ease: 'easeInOut' }}
          />
        </svg>

        {/* Sparkles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-violet-400"
            style={{
              top: '50%',
              left: '50%',
            }}
            initial={{ scale: 0, x: 0, y: 0 }}
            animate={{
              scale: [0, 1, 0],
              x: Math.cos((i * Math.PI * 2) / 8) * 80,
              y: Math.sin((i * Math.PI * 2) / 8) * 80,
            }}
            transition={{ duration: 0.8, delay: 0.8 + i * 0.05, ease: 'easeOut' }}
          />
        ))}
      </div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.4 }}
        className="text-center"
      >
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-3">
          🎉 Order Successfully Placed!
        </h1>
        <p className="text-gray-500 text-lg mb-8">
          Thank you! Your order is on its way.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="px-8 py-3 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-violet-200 cursor-pointer"
          >
            Back to Home
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/orders')}
            className="px-8 py-3 bg-white border border-gray-200 hover:border-violet-300 text-gray-700 font-semibold rounded-xl transition-colors cursor-pointer"
          >
            View My Orders
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}
