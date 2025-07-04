import React from 'react'
import backArrow from '../../assets/Back_Arrow.svg.png'
const BackArraowBTN = ({width,height}) => {
  return (
    <>
     <img src={backArrow} alt="Back Arrow" 
     style={{width: width || '3.5rem', height: height || '3.5rem', cursor: 'pointer'}}
     />
     </>
  )
}

export default BackArraowBTN