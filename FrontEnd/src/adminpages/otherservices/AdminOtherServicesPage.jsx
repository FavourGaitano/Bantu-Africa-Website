import React, { useState } from "react";
import "./AdminOtherServicesPage.scss";
import {
  useGetOtherServicesQuery,
  useCreateOtherServiceMutation,
  useDeleteOtherServiceMutation,
  useUpdateOtherServiceMutation,
} from "../../features/otherServices/otherServices.js";

const AdminOtherServicesPage = () => {
  const { data: otherServices, error, isLoading } = useGetOtherServicesQuery();
  const [showModal, setShowModal] = useState(false);
  const [newOtherService, setNewOtherService] = useState({
    OtherServiceName: "",
    Description: "",
    ImageUrl: "",
  });
  const [selectedOtherService, setSelectedOtherService] = useState(null);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOtherService({
      ...newOtherService,
      [name]: value,
    });
  };

  const [addOtherService, { isLoading: isAddingOtherService }] =
    useCreateOtherServiceMutation();
  const [deleteOtherService] = useDeleteOtherServiceMutation();
  const [updateOtherService] = useUpdateOtherServiceMutation();

  const handleDelete = async (otherServiceId) => {
    try {
      await deleteOtherService(otherServiceId);
    } catch (error) {
      console.error("Error deleting other service:", error);
      // Handle error
    }
  };

  const handleUpdate = (otherService) => {
    setSelectedOtherService(otherService);
    setNewOtherService({
      OtherServiceName: otherService.OtherServiceName,
      Description: otherService.Description,
      ImageUrl: otherService.ImageUrl,
    });
    toggleModal();
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    if (selectedOtherService) {
      await updateOtherService({ ...selectedOtherService, ...newOtherService });
    } else {
      await addOtherService(newOtherService);
    }
    setNewOtherService({
      OtherServiceName: "",
      Description: "",
      ImageUrl: "",
    });
    toggleModal();
  } catch (error) {
    console.error("Error:", error);
    // Handle error
  }
};


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="admin-other-services-page">
      <div className="admin-add-other-service-btn-sec">
        <h1>Other Services</h1>
        <button className="admin-other-service-btn" onClick={toggleModal}>
          Add Other Service
        </button>
      </div>
      <div className="admin-table-container">
        <table className="other-service-table">
          <thead>
            <tr>
              <th>Service Name</th>
              <th>Description</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {otherServices.map((otherService) => (
              <tr key={otherService.OtherServiceId}>
                <td>{otherService.OtherServiceName}</td>
                <td>{otherService.Description}</td>
                <td>{<img src= {otherService.ImageUrl} alt= {otherService.OtherServiceName}/>}</td>
                <td>
                  <button
                    className="other-service-delete"
                    onClick={() => handleDelete(otherService.OtherServiceId)}
                  >
                    Delete
                  </button>
                  <button
                    className="other-service-update"
                    onClick={() => handleUpdate(otherService)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <div className="other-service-modal">
          <div className="other-service-modal-content">
            <span className="close" onClick={toggleModal}>
              &times;
            </span>
            <h2>{selectedOtherService ? "Update" : "Add New"} Other Service</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="OtherServiceName">Service Name:</label>
                <input
                  type="text"
                  id="OtherServiceName"
                  name="OtherServiceName"
                  value={newOtherService.OtherServiceName}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="Description">Description:</label>
                <input
                  type="text"
                  id="Description"
                  name="Description"
                  value={newOtherService.Description}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="ImageUrl">Image Url:</label>
                <input
                  type="text"
                  id="ImageUrl"
                  name="ImageUrl"
                  value={newOtherService.ImageUrl}
                  onChange={handleInputChange}
                />
              </div>
              <div className="other-service-btns">
                <button
                  className="other-service-add-button"
                  type="submit"
                  disabled={isAddingOtherService}
                >
                  {isAddingOtherService ? "Adding..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOtherServicesPage;
