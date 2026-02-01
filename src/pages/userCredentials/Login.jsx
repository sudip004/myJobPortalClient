import React, { useState } from 'react'
import styles from './Login.module.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import ZustandStore from '../../Zustand/ZustandStore'
import { FiMail, FiLock, FiArrowRight, FiArrowLeft } from 'react-icons/fi'

const Login = () => {
  const navigate = useNavigate();
  const setUser = ZustandStore((state) => state.setUser);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can add your form submission logic
    console.log("Form submitted with:", { email, password });
    const result = async () => {
      try {
        const data = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, { email, password }, {
          withCredentials: true,
        });
        if (data) {
          console.log("Login successful:", data);
          // Assuming the response contains user data
          setUser(data?.data?.user[0]); // Set the user data in Zustand store
          // You can handle success here, like showing a message or redirecting
          toast.success("Login successful!");
          navigate('/home'); // Redirect to home page after successful login
        }
        
      } catch (error) {
        console.error("Error during form submission:", error);
        toast.error("Login failed. Please check your credentials.");
      }
    }
    result();
  };
  return (
    <div className={styles.mainContainer}>
      <button className={styles.backButton} onClick={() => navigate('/')}>
        <FiArrowLeft /> Back to Home
      </button>

      <div className={styles.wrapperContainer}>
        <div className={styles.header}>
          <h1>Welcome Back</h1>
          <p>Sign in to continue your career journey</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">
              <FiMail className={styles.icon} />
              Email Address
            </label>
            <input 
              id="email"
              type="email" 
              placeholder='Enter your email' 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">
              <FiLock className={styles.icon} />
              Password
            </label>
            <input 
              id="password"
              type="password" 
              placeholder='Enter your password' 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className={styles.options}>
            <label className={styles.rememberMe}>
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <Link to="#" className={styles.forgotPassword}>Forgot password?</Link>
          </div>

          <button type="submit" className={styles.submitButton}>
            Sign In <FiArrowRight className={styles.arrowIcon} />
          </button>
        </form>

        <div className={styles.footer}>
          <p>Don't have an account? <Link to='/register'>Create Account</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Login