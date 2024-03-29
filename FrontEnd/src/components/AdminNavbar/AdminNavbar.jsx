import React, { useState } from 'react'
import './AdminNavbar.scss'
import image from '../../assets/logo.png'
import { useNavigate } from 'react-router-dom';


const AdminNavbar = () => {
    const navigate = useNavigate();

    const [isLoggedOut,setIsLoggedOut]=useState(false)
  
    const handledLoggedOut=()=>{
      setIsLoggedOut(true)
      localStorage.removeItem('loggedInUser')
      navigate('/admin')
    }
  return (
    <div className="admin-header">
        <div className="admin-header-logo">
        <img
                src={image}

                alt="ola" 
            />
        </div>
        <div className="admin-container">
            <div className="Adminsearch-container">
                <input type="text" className="Adminsearch-bar" placeholder="Search..."/>
            </div>
        </div>
        <div className="admin-header-list">

            <nav className="admin-header-list-nav">
                <ul>

                    <li><a className="active">Home</a></li>
              
                    <li><a onClick={handledLoggedOut}>Logout</a></li>
                   
                </ul>
            </nav>
            <div className="header-list-icon">
                <a><i className="fa-solid fa-bell"></i></a>
                <a><i className="fa-regular fa-user"></i></a>
                

            </div>

        </div>
    </div>
  )
}

export default AdminNavbar