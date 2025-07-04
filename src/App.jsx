import react from 'react'
import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom'
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

function App() {

  return (
    <>
      <div className="appmainConainer">
        <ToastContainer position="top-center" autoClose={3000} />
        <Routes>
          <Route path='/' element={<LandingPage/>} />
          <Route path='/home' element={<HomePage/>} />
          <Route path='/hiring' element={<CreateJob/>}/>
          <Route path='/jobdetails/:id' element={<ShowJobDesc/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/applied' element={<AppliedPage/>}/>
          <Route path='/adminpanel' element={<HiringPeople/>}/>
          <Route path='/faq' element={<Faq/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
