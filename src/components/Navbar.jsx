import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../context/AppContext'

export default function Navbar() {
  const { currentUser, logout, cartCount } = useApp()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
    setMobileOpen(false)
  }

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/cart', label: 'Cart', badge: cartCount },
    { to: '/orders', label: 'Orders' },
  ]

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      className="sticky top-0 z-50 backdrop-blur-sm bg-white/80 border-b border-gray-100 shadow-sm"
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-xl font-extrabold text-violet-600 tracking-tight">
          eTrends
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="relative text-sm font-medium text-gray-600 hover:text-violet-600 transition-colors"
            >
              {link.label}
              {link.badge > 0 && (
                <motion.span
                  key={link.badge}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-4 bg-violet-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center"
                >
                  {link.badge}
                </motion.span>
              )}
            </Link>
          ))}

          {currentUser ? (
            <div className="flex items-center gap-3 ml-2">
              <span className="text-sm font-medium text-gray-700">
                Hi, {currentUser.name}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors cursor-pointer"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="ml-2 px-4 py-2 bg-violet-600 text-white text-sm font-medium rounded-xl hover:bg-violet-700 transition-colors"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden flex items-center gap-4">
          <Link to="/cart" className="relative text-gray-600 hover:text-violet-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-violet-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex flex-col gap-1.5 py-2 cursor-pointer"
            aria-label="Toggle menu"
          >
            <motion.span animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 8 : 0 }} className="block w-6 h-0.5 bg-gray-700" />
            <motion.span animate={{ opacity: mobileOpen ? 0 : 1 }} className="block w-6 h-0.5 bg-gray-700" />
            <motion.span animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -8 : 0 }} className="block w-6 h-0.5 bg-gray-700" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden bg-white border-t border-gray-100"
          >
            <div className="flex flex-col px-4 py-3 gap-2">
              {navLinks.filter(link => link.to !== '/cart').map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between py-2 text-sm font-medium text-gray-700 hover:text-violet-600"
                >
                  {link.label}
                </Link>
              ))}
              {currentUser ? (
                <>
                  <span className="py-2 text-sm text-gray-500">Hi, {currentUser.name}</span>
                  <button onClick={handleLogout} className="py-2 text-sm font-medium text-red-500 text-left cursor-pointer">Logout</button>
                </>
              ) : (
                <Link to="/login" onClick={() => setMobileOpen(false)} className="py-2 text-sm font-medium text-violet-600">Login</Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
