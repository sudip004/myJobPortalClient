import React, { useState } from 'react'
import styles from './RegisterPage.module.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { FiUser, FiMail, FiLock, FiUpload, FiArrowRight, FiArrowLeft } from 'react-icons/fi'

const RegisterPage = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [file, setFile] = useState(null);


  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can add your form submission logic
    console.log("Form submitted with:", { userName, email, password, file });
    const result = async () => {
      try {
        // ✅ Use FormData for multipart upload
        const formData = new FormData();
        formData.append('name', userName);
        formData.append('email', email);
        formData.append('password', password);
        if (file) {
          formData.append('profilePic', file); // Must match field name expected in backend: upload.single('profilePic')
        }
        const data = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/register`, formData, {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data', // ✅ Important!
          },
        });
        if (data) {
          console.log("Registration successful:", data);
          // You can handle success here, like showing a message or redirecting
          toast.success("Registration successful!");
          navigate('/login'); // Redirect to login page after successful registration
        }

      } catch (error) {
        console.error("Error during form submission:", error);
      }
    }
    result();
    // After submission, you can navigate to another page if needed
    
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

          <button type="submit" className={styles.submitButton}>
            Create Account <FiArrowRight className={styles.arrowIcon} />
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