import React from 'react'
import './AdminForm.scss'

const AdminForm = () => {
  return (
    <div className="AdminForm">
        <form className="form">

            <span className="input-span">
            <label for="FirstName" className="label" placeholder="First Name">First Name</label>
            <input type="text" name="FirstName" id="FirstName"/></span>

            <span className="input-span">
            <label for="LastName" className="label" placeholder="Last Name">Last Name</label>
            <input type="text" name="LastName" id="LastName"/></span>

            <span className="input-span">
            <label for="email" className="label">Email</label>
            <input type="email" name="email" id="email"/></span>

            <span className="input-span">
            <label for="password" className="label">Password</label>
            <input type="password" name="password" id="password"/></span>
            

            <input className="submit" type="submit" value="Create Admin"/>
        
        </form>
    </div>
  )
}

export default AdminForm