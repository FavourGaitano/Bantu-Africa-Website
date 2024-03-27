import React from 'react';
import { useGetUsersQuery } from '../../features/users/userApi';
import './AdminDashboardpages.scss';

const AdminDashboardPage = () => {
  const { data: users } = useGetUsersQuery();

  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="admin-table-body">
      <div className="admin-cart">
        <h1>List of Admins</h1>
        <div className="scrollable-table-container">
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users && users.map((user, index) => (
              <tr key={user.UserId}>
                <td>{index + 1}</td>
                <td>{user.FirstName}</td>
                <td>{user.LastName}</td>
                <td>{user.Email}</td>
                <td>{formatDate(user.CreatedAt)}</td>
                <td>
                  
                  <button className="action-btn" style={{ backgroundColor: 'green'}}>Edit</button>
                  &nbsp;
                  <button className="action-btn" >Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
