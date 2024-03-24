import React from 'react'
import { Route, Routes } from "react-router-dom";
import AdminLogin from '../components/AdminLogin/AdminLogin'
// import AdminDashboard from './AdminDashboard'
const AdminRoute = () => {
  return (
    <div>
      <Routes>
      <Route path='/' element={<AdminLogin/>} />

      {/* <Route path='/dashboard/*' element={<AdminDashboard/>} /> */}
      </Routes>
    </div>
  )
}

export default AdminRoute
