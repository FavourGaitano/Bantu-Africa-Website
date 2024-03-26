import React from 'react';
import './AdminActivitiesPage.scss';
import { useGetActivitiesQuery } from '../../features/activities/activityApi';

const AdminActivitiesPage = () => {
  const { data: activities, error, isLoading } = useGetActivitiesQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  console.log('Activities:', activities); 

  return (
    <div className='admin-activity-page'>
      <div className="admin-add-activity-btn-sec">
        <h1>Activities</h1>
        <button className='admin-activity-btn'>Add Activity</button>
      </div>
      <div className="admin-table-container">
        <table>
          <thead>
            <tr>
              <th>Activity Name</th>
              <th>Description</th>
              <th>Category</th>
              <th>Image</th>
              <th>Actions</th> {/* New column for Actions */}
            </tr>
          </thead>
          <tbody>
            {activities.map(activity => {
              if (!activity.ActivityId) {
                console.error('Activity missing ID:', activity);
                return null;
              }
              return (
                <tr key={activity.ActivityId}>
                  <td>{activity.ActivityName}</td>
                  <td>{activity.Description}</td>
                  <td>{activity.Category}</td>
                  <td>{activity.ImageUrl}</td>
                  <td>
                    <button className='act-delete'>Delete</button>
                    <button className='act-update'>Update</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminActivitiesPage;
