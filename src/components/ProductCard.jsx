import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const ProductCard = React.memo(function ProductCard({ product }) {
  const minPrice = Math.min(...Object.values(product.sizes))

  return (
    <Link to={`/product/${product.id}`} className="block h-full">
      <motion.div
        whileHover={{ scale: 1.03, boxShadow: '0 12px 40px rgba(124,58,237,0.12)' }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="bg-white rounded-2xl border border-gray-100 overflow-hidden cursor-pointer group h-full flex flex-col"
      >
        <div className="aspect-[3/4] overflow-hidden bg-gray-50 flex-shrink-0">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <span className="inline-block w-fit px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-full bg-violet-100 text-violet-600 mb-2">
            {product.category === 'boys' ? '👦 Boys' : '👧 Girls'} · {product.subCategory}
          </span>
          <h3 className="text-sm font-semibold text-gray-800 leading-snug mb-1 line-clamp-2 flex-grow">
            {product.name}
          </h3>
          <p className="text-base font-bold text-violet-600 mt-2">
            From ₹{minPrice}
          </p>
        </div>
      </motion.div>
    </Link>
  )
})

export default ProductCard
