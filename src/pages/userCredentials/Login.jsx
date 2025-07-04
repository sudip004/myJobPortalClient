import React,{useState} from 'react'
import styles from './RegisterPage.module.css'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';
import ZustandStore from '../../Zustand/ZustandStore';

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
        <div className={styles.wrapperContainer}>
            <h1>Login From</h1>
            <p>No, warry this is a demo from fill any thing for Test this site</p>
            <input type="text" placeholder='Enter Your Email' onChange={(e)=>setEmail(e.target.value)}/>
            <input type="text" placeholder='Enter your Password' onChange={(e)=>setPassword(e.target.value)}/>
            <p>If you are new so, register first <span><Link to='/register'>Register</Link></span></p>
            <button onClick={handleSubmit}>SIGN UP</button>
        </div>
    </div>
  )
}

export default Login