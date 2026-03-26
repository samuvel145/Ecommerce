import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  // ──── AUTH STATE ────
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const session = localStorage.getItem('etrends_session')
      return session ? JSON.parse(session) : null
    } catch { return null }
  })

  // ──── CART STATE ────
  const [cartItems, setCartItems] = useState([])

  // Load cart when user changes
  useEffect(() => {
    if (currentUser) {
      try {
        const saved = localStorage.getItem(`etrends_cart_${currentUser.id}`)
        setCartItems(saved ? JSON.parse(saved) : [])
      } catch { setCartItems([]) }
    } else {
      setCartItems([])
    }
  }, [currentUser])

  // Persist cart on change
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`etrends_cart_${currentUser.id}`, JSON.stringify(cartItems))
    }
  }, [cartItems, currentUser])

  // ──── AUTH FUNCTIONS ────
  const login = useCallback((email, password) => {
    const users = JSON.parse(localStorage.getItem('etrends_users') || '[]')
    const user = users.find(u => u.email === email && u.password === password)
    if (!user) return { success: false, error: 'Invalid email or password' }
    const session = { id: user.id, email: user.email, name: user.name }
    localStorage.setItem('etrends_session', JSON.stringify(session))
    setCurrentUser(session)
    return { success: true }
  }, [])

  const register = useCallback((name, email, password) => {
    const users = JSON.parse(localStorage.getItem('etrends_users') || '[]')
    if (users.find(u => u.email === email)) {
      return { success: false, error: 'Email already registered' }
    }
    const newUser = { id: `u_${Date.now()}`, name, email, password }
    users.push(newUser)
    localStorage.setItem('etrends_users', JSON.stringify(users))
    const session = { id: newUser.id, email: newUser.email, name: newUser.name }
    localStorage.setItem('etrends_session', JSON.stringify(session))
    setCurrentUser(session)
    return { success: true }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('etrends_session')
    setCurrentUser(null)
    setCartItems([])
  }, [])

  // ──── CART FUNCTIONS ────
  const addToCart = useCallback(({ productId, name, image, size, price }) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.productId === productId && item.size === size)
      if (existing) {
        return prev.map(item =>
          item.productId === productId && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { productId, name, image, size, price, quantity: 1, selected: true }]
    })
  }, [])

  const removeFromCart = useCallback((productId, size) => {
    setCartItems(prev => prev.filter(item => !(item.productId === productId && item.size === size)))
  }, [])

  const updateQuantity = useCallback((productId, size, newQty) => {
    if (newQty <= 0) {
      setCartItems(prev => prev.filter(item => !(item.productId === productId && item.size === size)))
      return
    }
    setCartItems(prev => prev.map(item =>
      item.productId === productId && item.size === size
        ? { ...item, quantity: newQty }
        : item
    ))
  }, [])

  const toggleSelect = useCallback((productId, size) => {
    setCartItems(prev => prev.map(item =>
      item.productId === productId && item.size === size
        ? { ...item, selected: !item.selected }
        : item
    ))
  }, [])

  const clearCart = useCallback(() => {
    setCartItems([])
    if (currentUser) {
      localStorage.removeItem(`etrends_cart_${currentUser.id}`)
    }
  }, [currentUser])

  // ──── COMPUTED VALUES ────
  const cartCount = useMemo(() => cartItems.reduce((sum, item) => sum + item.quantity, 0), [cartItems])

  const selectedTotal = useMemo(() =>
    cartItems
      .filter(item => item.selected)
      .reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  )

  const selectedItems = useMemo(() => cartItems.filter(item => item.selected), [cartItems])

  const value = useMemo(() => ({
    currentUser, login, register, logout,
    cartItems, addToCart, removeFromCart, updateQuantity, toggleSelect, clearCart,
    cartCount, selectedTotal, selectedItems,
  }), [currentUser, login, register, logout, cartItems, addToCart, removeFromCart, updateQuantity, toggleSelect, clearCart, cartCount, selectedTotal, selectedItems])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) throw new Error('useApp must be used within AppProvider')
  return context
}
