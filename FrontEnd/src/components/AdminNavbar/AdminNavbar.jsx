import React from 'react'
import './AdminNavbar.scss'
import image from '../../assets/logo.png'


const AdminNavbar = () => {
  return (
    <div className="header">
        <div className="header-logo">
        <img
                src={image}

                alt="ola" 
            />
        </div>
        <div className="container">
            <div className="search-container">
                <input type="text" className="search-bar" placeholder="Search..."/>
            </div>
        </div>
        <div className="header-list">

            <nav className="header-list-nav">
                <ul>

                    <li><a className="active">Home</a></li>
                    

                    {/* <li ><a>Login</a></li> */}
                    {/* <li><a>Register</a></li> */}
                    <li><a>Logout</a></li>
                    {/* <li><a>Orders</a></li> */}



                </ul>
            </nav>
            <div className="header-list-icon">
                <a><i className="fa-solid fa-bell"></i></a>
                <a><i class="fa-regular fa-user"></i></a>
                

            </div>

        </div>
    </div>
  )
}

export default AdminNavbar