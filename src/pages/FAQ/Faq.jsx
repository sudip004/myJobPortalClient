import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Faq = () => {
    const navigate = useNavigate()

    useEffect(()=>{
      setTimeout(() => {
        navigate('/home')
      }, 2000);
    },[])

  return (
    <div style={{width:'100%',height:'100vh',display:"flex",alignItems:'center',justifyContent:'center'}}>
        <h1>Page under working</h1>
    </div>
  )
}

export default Faq