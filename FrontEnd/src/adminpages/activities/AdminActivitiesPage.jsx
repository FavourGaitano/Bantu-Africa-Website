import React, { useState } from "react";
import "./AdminActivitiesPage.scss";
import {
  useGetActivitiesQuery,
  useAddActivityMutation,
} from "../../features/activities/activityApi";

const AdminActivitiesPage = () => {
  const { data: activities, error, isLoading } = useGetActivitiesQuery();
  const [showModal, setShowModal] = useState(false);
  const [newActivity, setNewActivity] = useState({
    ActivityName: "",
    Description: "",
    Category: "",
    ImageUrl: "",
  });

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewActivity({
      ...newActivity,
      [name]: value,
    });
  };

  const [addActivity] = useAddActivityMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("New activity:", newActivity);
    try {
      const { data, error } = await addActivity(newActivity);
      if (error) {
        console.error("Error adding activity:", error);
        // Handle error
      } else {
        console.log("Activity added successfully:", data);
        setNewActivity({
          ActivityName: "",
          Description: "",
          Category: "",
          ImageUrl: "",
        });
        toggleModal();
      }
    } catch (error) {
      console.error("Error adding activity:", error);
      // Handle error
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="admin-activity-page">
      <div className="admin-add-activity-btn-sec">
        <h1>Activities</h1>
        <button className="admin-activity-btn" onClick={toggleModal}>
          Add Activity
        </button>
      </div>
      <div className="admin-table-container">
        <table className="activity-table">
          <thead>
            <tr>
              <th>Activity Name</th>
              <th>Description</th>
              <th>Category</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity.ActivityId}>
                <td>{activity.ActivityName}</td>
                <td>{activity.Description}</td>
                <td>{activity.Category}</td>
                <td>{activity.ImageUrl}</td>
                <td>
                  <button className="act-delete">Delete</button>
                  <button className="act-update">Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <div className="activity-modal">
          <div className="activity-modal-content">
            <span className="close" onClick={toggleModal}>
              &times;
            </span>
            <h2>Add New Activity</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="ActivityName">Activity Name:</label>
                <input
                  type="text"
                  id="ActivityName"
                  name="ActivityName"
                  value={newActivity.ActivityName}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="Description">Description:</label>
                <input
                  type="text"
                  id="Description"
                  name="Description"
                  value={newActivity.Description}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="Category">Category:</label>
                <input
                  type="text"
                  id="Category"
                  name="Category"
                  value={newActivity.Category}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="Category">Image Url:</label>
                <input
                  type="text"
                  id="Category"
                  name="Category"
                  value={newActivity.Category}
                  onChange={handleInputChange}
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminActivitiesPage;
