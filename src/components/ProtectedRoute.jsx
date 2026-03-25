import { Navigate, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function ProtectedRoute({ children }) {
  const { currentUser } = useApp()
  const location = useLocation()

  if (!currentUser) {
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />
  }

  return children
}
