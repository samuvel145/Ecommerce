import { useState } from 'react'
import { motion } from 'framer-motion'
import products from '../data/products'
import ProductCard from '../components/ProductCard'

const categories = [
  { key: 'all', label: 'All' },
  { key: 'boys', label: '👦 Boys' },
  { key: 'girls', label: '👧 Girls' },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filtered = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-violet-600 via-purple-600 to-violet-800 text-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-14 md:py-20">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-3xl md:text-5xl font-extrabold leading-tight"
          >
            eTrends,<br />South Indian Style.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="mt-4 text-lg md:text-xl text-violet-100 max-w-xl"
          >
            Shop the finest clothing for your little ones — shirts, pants, and traditional chudithars.
          </motion.p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-8">
        {/* Filter Tabs */}
        <div className="flex gap-2 mb-8">
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`relative px-5 py-2 rounded-full text-sm font-semibold transition-colors cursor-pointer ${
                activeCategory === cat.key
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {activeCategory === cat.key && (
                <motion.span
                  layoutId="activeTab"
                  className="absolute inset-0 bg-violet-600 rounded-full -z-10"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-lg font-medium">No products found in this category</p>
          </div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            key={activeCategory}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
          >
            {filtered.map(product => (
              <motion.div key={product.id} variants={item}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
