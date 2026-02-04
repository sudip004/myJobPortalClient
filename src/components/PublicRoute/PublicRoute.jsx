import { Navigate } from 'react-router-dom'
import ZustandStore from '../../Zustand/ZustandStore'

const PublicRoute = ({ children }) => {
  const user = ZustandStore((state) => state.user)

  // If user is authenticated, redirect to home
  if (user) {
    return <Navigate to="/home" replace />
  }

  return children
}

export default PublicRoute
