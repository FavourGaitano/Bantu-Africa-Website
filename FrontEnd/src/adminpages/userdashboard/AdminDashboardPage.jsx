import React from 'react'
import AdminTable from '../../components/AdminTable/AdminTable'

const AdminDashboardPage = () => {
  return (
    <div>
      <h2>This is Admin Dashboard Page</h2>
      <AdminTable
      tableNumber="No."
      thead1="First Name"
      thead2="Last Name"
      thead3="Email"
      thead4="Created At"
      tbody1="1"
      tbody2="First Name"
      tbody3="Last Name"
      tbody4="Email"
      tbody5="Created At"
      />
    </div>
  )
}

export default AdminDashboardPage;
