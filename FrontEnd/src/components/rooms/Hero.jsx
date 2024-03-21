import React from 'react'
import './Hero.scss'
const Hero = ({heroImgUrl,msg}) => {
  return (
    <div className="hero-image-content">
     
     <div className='hero-img' style={{ backgroundImage: `url(${heroImgUrl})` }}>
      </div>    

    <div className="hero-banner">
      <h2>{msg}</h2>
      
    </div>
    </div>
  )
}

export default Hero;
