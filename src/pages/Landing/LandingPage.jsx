import React from 'react'
import styles from './LandingPage.module.css'
import img1 from '../../assets/Screenshot (44).png'
import img2 from '../../assets/Screenshot (45).png'
import img3 from '../../assets/Screenshot (46).png'
import img4 from '../../assets/Screenshot (47).png'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
    const navigate = useNavigate()
  return (
    <div className={styles.mainConatiner}>
       <div className={styles.landingNav}>
        <h1>J0B-PlanET</h1>
        <div>
            <button onClick={()=> navigate('/register')}>Register</button>
            <button onClick={()=> navigate('/login')}>Login</button>
        </div>
       </div>

        {/* big Heading */}
       <div className={styles.headingContainer}>
        <h1 className={styles.heading}>One Step Closer To Your Dream J0B</h1>
       </div>
        {/* Explore */}
        <div className={styles.exploreCon}>
            <p>let us help you find a job that suits you the best!</p>
            <button onClick={()=> navigate('/login')}>Get Started</button>
        </div>
        <img src={img1} alt=""  className={styles.img1}/>
        <img src={img1} alt=""  className={styles.imgup}/>
        <img src={img2} alt=""  className={styles.img2}/>
        {/* user use con */}
        <div className={styles.countuser}>
            <div>
                <h1>2.5M</h1>
                <p>Users</p>
            </div>
            <div>
                <h1>8000+</h1>
                <p>jobs</p>
            </div>
            <div>
                <h1>1000+</h1>
                <p>Partners</p>
            </div>
        </div>
        {/* second container */}
        <div className={styles.SecondContainer}>
            <img src={img3} alt=""  className={styles.leftSide}/>
            <div className={styles.RightSide}>
                <h1>Working With Exciting Companies</h1>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro, laborum.</p>
                <button onClick={()=> navigate('/login')}>Get Started</button>
            </div>
        </div>
        <img src={img4} alt=""  className={styles.lastImg}/>
        <div className={styles.backbox}></div>
    </div>
  )
}

export default LandingPage