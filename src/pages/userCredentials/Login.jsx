import React, { useState } from 'react'
import styles from './Login.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import ZustandStore from '../../Zustand/ZustandStore'
import { FiMail, FiLock, FiArrowRight, FiArrowLeft } from 'react-icons/fi'
import { loginUser } from '../../utils/authUtils'

const Login = () => {
  const navigate = useNavigate();
  const setUser = ZustandStore((state) => state.setUser);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const result = await loginUser(email, password);
      
      if (result.success) {
        // Set user in store
        setUser(result.user);
        toast.success("Login successful!");
        
        // Add delay for state to update before navigating
        setTimeout(() => {
          navigate("/home", { replace: true });
        }, 500);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
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

          <button type="submit" className={styles.submitButton} disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'} <FiArrowRight className={styles.arrowIcon} />
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