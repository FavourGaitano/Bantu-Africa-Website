
import React, { useEffect } from 'react';
import AdminTable from '../../components/AdminTable/AdminTable';
import { useGetActivitiesQuery } from '../../features/activities/activityApi';
import './AdminActivitiesPage.scss'

const AdminActivitiesPage = () => {
  const { data: activities, error, isLoading, refetch } = useGetActivitiesQuery();

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) return <div>Loading...</div>; 
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className='admin-activity-page'>
      <h2 className="admin-activity-page-title">This is admin Activities page</h2>
      <AdminTable
        thead2="Activity Name"
        thead3="Category"
        thead4="Description"
        thead5="Image Url"
      />
    </div>
  );
};

export default AdminActivitiesPage;
