import React from 'react'
import './AdminSidebar.scss'

import AdminNavbar from '../AdminNavbar/AdminNavbar'


const AdminSidebar = () => {
  return (
    <div className="main">
        <AdminNavbar />
        <div className="sidebar">
        
            <div className="sidebar-content">
                {/* <a href="#profile"><i className="fas fa-user"></i>Profile</a> */}
                <p>Management</p>
                <a><i className="fas fa-users"></i>Admins</a>
                <a><i class="fa-solid fa-bed"></i>Rooms & Suites</a>
                <a><i class="fa-solid fa-hotel"></i>Bookings</a>
                <a><i className="fas fa-calendar-alt"></i>Meetings & Events</a>
                <a><i class="fa-solid fa-bell-concierge"></i>Restaurant</a>
                <a><i class="fa-regular fa-image"></i>Gallery</a>
                <a><i class="fa-solid fa-hand-holding-heart"></i>Services</a>
                <a><i class="fa-solid fa-hand-holding-heart"></i>Other Services</a>
                <a><i class="fa-solid fa-circle-question"></i>Inquiries</a>
                <a><i class="fa-solid fa-person-swimming"></i>Activities</a>
                <a><i class="fa-solid fa-money-check"></i>Offers</a>
            </div>
            <div className="sidebar-footer">
                <a  href="#logout" className="logout-btn">Logout</a>
                {/* <a   style ="color: #cd7f32;" className="logout-btn" routerLink="/logout"</a> */}
            </div>
        </div>
 
        
    </div>
  )
}

export default AdminSidebar