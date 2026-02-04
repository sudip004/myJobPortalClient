import { useEffect, useState } from 'react'
import './App.css'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import HomePage from './pages/Home/HomePage'
import CreateJob from './pages/CreateJob/CreateJob'
import ShowJobDesc from './pages/ShowJobDesc/ShowJobDesc'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import RegisterPage from './pages/userCredentials/RegisterPage'
import Login from './pages/userCredentials/Login'
import AppliedPage from './pages/Applied/AppliedPage'
import HiringPeople from './pages/AdminPanel/HiringPeople'
import LandingPage from './pages/Landing/LandingPage'
import Faq from './pages/FAQ/Faq'
import ZustandStore from './Zustand/ZustandStore'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import PublicRoute from './components/PublicRoute/PublicRoute'
import { verifyToken } from './utils/authUtils'

function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const user = ZustandStore((state) => state.user)
  const setUser = ZustandStore((state) => state.setUser)
  const clearUser = ZustandStore((state) => state.clearUser)
  const isAuthenticated = ZustandStore((state) => state.isAuthenticated)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)

  // Verify authentication on mount only
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        // Always check if token is valid via /me endpoint
        const verifiedUser = await verifyToken();
        
        if (verifiedUser) {
          // Token is valid, set user in store
          setUser(verifiedUser);
        } else {
          // Token invalid or expired, clear user
          clearUser();
        }
      } catch (error) {
        console.error('Auth verification failed:', error);
        clearUser();
      } finally {
        setIsCheckingAuth(false);
      }
    }

    verifyAuth()
  }, [setUser, clearUser])

  // Handle protected routes
  useEffect(() => {
    if (isCheckingAuth) return

    const publicRoutes = ['/', '/login', '/register', '/faq']
    const isPublicRoute = publicRoutes.includes(location.pathname)

    if (!user && !isPublicRoute) {
      navigate('/login')
    }
  }, [user, location.pathname, navigate, isCheckingAuth])

  if (isCheckingAuth) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <>
      <div className="appmainConainer">
        <ToastContainer position="top-center" autoClose={3000} />
        <Routes>
          <Route path='/' element={
            <PublicRoute>
              <LandingPage/>
            </PublicRoute>
          } />
          <Route path='/register' element={
            <PublicRoute>
              <RegisterPage/>
            </PublicRoute>
          }/>
          <Route path='/login' element={
            <PublicRoute>
              <Login/>
            </PublicRoute>
          }/>
          <Route path='/faq' element={<Faq/>}/>
          
          {/* Protected Routes */}
          <Route path='/home' element={
            <ProtectedRoute>
              <HomePage/>
            </ProtectedRoute>
          } />
          <Route path='/hiring' element={
            <ProtectedRoute>
              <CreateJob/>
            </ProtectedRoute>
          }/>
          <Route path='/jobdetails/:id' element={
            <ProtectedRoute>
              <ShowJobDesc/>
            </ProtectedRoute>
          }/>
          <Route path='/applied' element={
            <ProtectedRoute>
              <AppliedPage/>
            </ProtectedRoute>
          }/>
          <Route path='/adminpanel' element={
            <ProtectedRoute>
              <HiringPeople/>
            </ProtectedRoute>
          }/>
        </Routes>
      </div>
    </>
  )
}

export default App
