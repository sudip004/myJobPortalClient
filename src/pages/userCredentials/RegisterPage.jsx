import React, { useState } from 'react'
import styles from './RegisterPage.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FiUser, FiMail, FiLock, FiUpload, FiArrowRight, FiArrowLeft } from 'react-icons/fi'
import { registerUser, loginUser } from '../../utils/authUtils'
import ZustandStore from '../../Zustand/ZustandStore'

const RegisterPage = () => {
  const navigate = useNavigate();
  const setUser = ZustandStore((state) => state.setUser);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (loading) return; // Prevent multiple submissions
    
    if (!userName || !email || !password) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    
    // Show info toast if user uploaded a file
    if (file) {
      toast.info("⏳ Uploading image... This may take a moment. Please wait!", {
        autoClose: 5000,
        position: "top-center"
      });
    }
    
    try {
      const formData = new FormData();
      formData.append('name', userName);
      formData.append('email', email);
      formData.append('password', password);
      if (file) {
        formData.append('profilePic', file);
      }
      
      const result = await registerUser(formData);
      
      if (result.success) {
        toast.success("Registration successful! Logging you in...");
        
        // Auto-login after registration
        const loginResult = await loginUser(email, password);
        
        if (loginResult.success) {
          setUser(loginResult.user);
          toast.success("Welcome to Job Portal!");
          navigate('/home');
        } else {
          // Registration succeeded but auto-login failed, redirect to login
          toast.info("Please log in with your credentials");
          navigate('/login');
        }
      } else {
        toast.error(result.message);
      }
      
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("An unexpected error occurred. Please try again.");
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
          <h1>Create Account</h1>
          <p>Join Job Planet and start your career journey</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="username">
              <FiUser className={styles.icon} />
              Username
            </label>
            <input 
              id="username"
              type="text" 
              placeholder='Enter your username' 
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>

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
              placeholder='Create a password' 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="profilePic">
              <FiUpload className={styles.icon} />
              Profile Picture (Optional)
            </label>
            <div className={styles.fileInputWrapper}>
              <input 
                id="profilePic"
                type="file" 
                name='profilePic'
                onChange={(e) => setFile(e.target.files[0])} 
                accept="image/*"
                className={styles.fileInput}
              />
              <label htmlFor="profilePic" className={styles.fileLabel}>
                <FiUpload />
                {file ? file.name : 'Choose file'}
              </label>
            </div>
          </div>

          <button type="submit" className={styles.submitButton} disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'} <FiArrowRight className={styles.arrowIcon} />
          </button>
        </form>

        <div className={styles.footer}>
          <p>Already have an account? <Link to='/login'>Sign In</Link></p>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage