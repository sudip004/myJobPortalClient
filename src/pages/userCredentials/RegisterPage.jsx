import React, { useState } from 'react'
import styles from './RegisterPage.module.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';

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
      <div className={styles.wrapperContainer}>
        <h1>Register From</h1>
        <p>No, warry this is a demo from fill any thing for Test this site</p>
        <input type="text" placeholder='Enter Your User Name' onChange={(e) => setUserName(e.target.value)} />
        <input type="text" placeholder='Enter Your Email' onChange={(e) => setEmail(e.target.value)} />
        <input type="text" placeholder='Enter your Password' onChange={(e) => setPassword(e.target.value)} />
        <input type="file" name='profilePic' className={styles.myinput}
          onChange={(e) => setFile(e.target.files[0])} accept="image/*" placeholder='Upload your profile picture'

        />
        <p>If you already register then <span><Link to='/login'>Login</Link></span></p>
        <button onClick={handleSubmit}>SIGN UP</button>
      </div>
    </div>
  )
}

export default RegisterPage