import React from 'react'

const Button = ({onClick,msg,imgUrl}) => {
  return (
    <div className="shared-button">
      <button onClick={onClick} > <img src={imgUrl} alt="" /> {msg}</button>
    </div>
  )
}

export default Button;
