// AdminActivitiesPage.js

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
      <h2 className="admin-activity-page-title">This is admin Activities page</h2> {/* Added class */}
      <AdminTable
        thead1="Activity Name"
        thead2="Category"
        thead3="Description"
        thead4="Image Url"
        // tbody1={activities.map(activity => activity.ActivityName)}
        // tbody2={activities.map(activity => activity.Category)}
        // tbody3={activities.map(activity => activity.Description)}
        // tbody4={activities.map(activity => activity.ImageUrl)}
      />
    </div>
  );
};

export default AdminActivitiesPage;
