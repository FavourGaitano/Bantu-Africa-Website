import React from 'react'
import AdminTable from '../../components/AdminTable/AdminTable'
const AdminGalleryPage = () => {
  return (
    <div>
      <h2>This is Admin Gallery Page</h2>
      <AdminTable
        tableNumber="No."
        thead1="Name"
        thead2="Category"
        thead3="image"
        thead4="Created At"
        
        tbody1="1"
        tbody2="Deluxe"
        tbody3="Double"
        tbody4="BB"
        tbody5="10,000"
      />
    </div>
  )
}

export default AdminGalleryPage
