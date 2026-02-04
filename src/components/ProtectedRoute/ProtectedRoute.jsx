import { Navigate, useLocation } from 'react-router-dom'
import ZustandStore from '../../Zustand/ZustandStore'

const ProtectedRoute = ({ children }) => {
  const user = ZustandStore((state) => state.user)
  const location = useLocation()

  if (!user) {
    // Redirect to login but save the attempted location
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export default ProtectedRoute
