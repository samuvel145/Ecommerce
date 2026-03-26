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
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = products.filter(p => {
    const q = searchQuery.toLowerCase().trim()
    if (!q) return true
    
    return (
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.subCategory.toLowerCase().includes(q)
    )
  })

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-violet-600 via-purple-600 to-violet-800 text-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-16 md:py-24 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight"
          >
            eTrends
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-4 text-lg md:text-2xl text-violet-100 font-medium max-w-2xl mx-auto italic"
          >
            "Timeless Dresses, Rooted in Tradition." 🌸
          </motion.p>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-12">
        {/* Search & Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-6 border-b border-gray-100">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
              {searchQuery ? 'Search Results' : 'All Products'}
              <span className="text-sm font-medium px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full">
                {filtered.length} items
              </span>
            </h2>
            {searchQuery && (
              <p className="text-sm text-gray-500 mt-1">Showing matches for "{searchQuery}"</p>
            )}
          </div>

          <div className="relative w-full md:w-80 group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <span className="text-gray-400 group-focus-within:text-violet-500 transition-colors text-sm">🔍</span>
            </div>
            <input
              type="text"
              placeholder="Search (e.g. boys shirt, pants...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-violet-50 rounded-xl text-gray-900 border-2 border-violet-100 focus:border-violet-300 focus:bg-white focus:outline-none transition-all placeholder:text-gray-400 text-sm font-medium shadow-sm"
            />
          </div>
        </div>

        {/* Product Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <p className="text-5xl mb-4">🛒</p>
            <p className="text-xl font-bold text-gray-900">No matching products found</p>
            <p className="text-gray-500 mt-2">Try searching for "boys", "girls", or "chudithar"</p>
            <button 
              onClick={() => setSearchQuery('')}
              className="mt-6 text-violet-600 font-semibold hover:underline"
            >
              Clear search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            {filtered.map(product => (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}
