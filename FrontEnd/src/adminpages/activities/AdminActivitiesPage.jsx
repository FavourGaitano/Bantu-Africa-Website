import React from 'react'
import AdminTable from '../../components/AdminTable/AdminTable';

const AdminActivitiesPage = () => {
  return (
    <div>
      <h2>This is admin Activities page</h2>
      <AdminTable
       thead1="Activity Name"
       thead2="category"
       thead3="Description"
       tbody2="Swimming"
       tbody3="Adults"
       tbody4="This swimming will happen soon"
      />
    </div>
  )
}

export default AdminActivitiesPage;
