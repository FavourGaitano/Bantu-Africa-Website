import React from 'react'
import { Route, Routes } from "react-router-dom";
import AdminDashboardRoutes from './AdminDashboardRoutes';
import AdminLogin from '../components/AdminLogin/AdminLogin'
// import AdminSidebar from '../components/AdminSidebar/AdminSidebar'

const AdminRoute = () => {
  return (
    <div>
      <Routes>
      <Route path='/' element={<AdminLogin/>} />
      {/* <Route path='/' element={<AdminSidebar/>} /> */}
      

      <Route path='/*' element={<AdminDashboardRoutes/>} />
      </Routes>
    </div>
  )
}

export default AdminRoute
