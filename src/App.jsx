import react, { useEffect } from 'react'
import './App.css'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import HomePage from './pages/Home/HomePage'
import CreateJob from './pages/CreateJob/CreateJob'
import ShowJobDesc from './pages/ShowJobDesc/ShowJobDesc'
import { ToastContainer } from 'react-toastify'
import RegisterPage from './pages/userCredentials/RegisterPage'
import Login from './pages/userCredentials/Login'
import AppliedPage from './pages/Applied/AppliedPage'
import HiringPeople from './pages/AdminPanel/HiringPeople'
import LandingPage from './pages/Landing/LandingPage'
import Faq from './pages/FAQ/Faq'
import ZustandStore from './Zustand/ZustandStore'
import axios from 'axios'

function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const user = ZustandStore((state) => state.user)
  const setUser = ZustandStore((state) => state.setUser)
  const clearUser = ZustandStore((state) => state.clearUser)

  // Initialize app on mount - restore user session and handle navigation
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // If user exists in store, user is already logged in - no need to redirect
        if (user) {
          return
        }

        // If on login or register pages, allow access
        if (location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/') {
          return
        }

        // If user not in store and trying to access protected route, redirect to landing
        if (!user && location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/register') {
          navigate('/')
        }
      } catch (error) {
        console.error('Error initializing app:', error)
      }
    }

    initializeApp()
  }, [user, navigate, location.pathname])

  return (
    <>
      <div className="appmainConainer">
        <ToastContainer position="top-center" autoClose={3000} />
        <Routes>
          <Route path='/' element={<LandingPage/>} />
          <Route path='/home' element={user ? <HomePage/> : <LandingPage/>} />
          <Route path='/hiring' element={user ? <CreateJob/> : <LandingPage/>}/>
          <Route path='/jobdetails/:id' element={user ? <ShowJobDesc/> : <LandingPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/applied' element={user ? <AppliedPage/> : <LandingPage/>}/>
          <Route path='/adminpanel' element={user ? <HiringPeople/> : <LandingPage/>}/>
          <Route path='/faq' element={<Faq/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
