import React, { useState } from "react";
import { createPortal } from "react-dom";
import {
  useDeleteServiceMutation,
  useGetServicesQuery,
} from "../../features/services/servicesApi";
import {
  ErrorToast,
  LoadingToast,
  SuccessToast,
} from "../../components/shared/Toaster";
import "./adminServices.scss";
import EditServicesForm from "./EditServices";
import CreateServicesForm from "./CreateService";

const AdminServicesPage = () => {
  const { data: services, error, isLoading } = useGetServicesQuery();
  const [deleteService, { isLoading: loading, isError }] =
    useDeleteServiceMutation();
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState({});
  const [showCreateModal, setShowCreateModal] = useState(false);

  // console.log(
  //   "services: ",
  //   services,
  //   "error: ",
  //   error,
  //   "isLoading: ",
  //   isLoading
  // );

  const handleDelete = async (ServiceId) => {
    try {
      const response = await deleteService(ServiceId).unwrap();
      LoadingToast(false);
      SuccessToast(response.message);
    } catch (error) {
      LoadingToast(false);
      console.log(error);
      ErrorToast("Something went wrong. Please try again later.");
    }
  };

  if (error) {
    LoadingToast(false);
    ErrorToast("An error occurred. Please try again later");
    return;
  }

  if (isLoading) {
    LoadingToast();
  }

  return (
    <div>
      {LoadingToast(false)}
      {SuccessToast("Fetch success! Here are your services")}
      <button className="add-service" onClick={() => setShowCreateModal(true)}>
        Add Service
      </button>
      {showCreateModal &&
        createPortal(
          <CreateServicesForm setShowCreateModal={setShowCreateModal} />,
          document.body
        )}
      <div className="admin-table-body">
        <div className="admin-cart">
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Image</th>
                <th>Service ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services &&
                [...services]
                  .sort(
                    (a, b) =>
                      b.CreatedAt.split("T")[0] - a.CreatedAt.split("T")[0]
                  )
                  .map((service, index) => (
                    <tr key={index}>
                      <td className="admin-td-custom">{index + 1}</td>
                      <td>
                        <img src={service.ImageUrl} alt="" />
                      </td>
                      <td>{service.ServiceId}</td>
                      <td>{service.ServiceName}</td>
                      <td>{service.Description.slice(0, 16) + "..."}</td>

                      <td className="action-buttons">
                        <span>
                          <button
                            className="action-btn"
                            onClick={() => handleDelete(service.ServiceId)}
                          >
                            Delete
                          </button>
                        </span>
                        &nbsp;
                        <span>
                          {/* {console.log("Service: ", service)} */}
                          <button
                            className="action-btn0"
                            onClick={() => {
                              setSelectedService(service);
                              setShowModal(true);
                            }}
                          >
                            Edit
                          </button>
                        </span>
                      </td>
                    </tr>
                  ))}
            </tbody>
            {showModal &&
              createPortal(
                <EditServicesForm
                  service={selectedService}
                  setShowModal={setShowModal}
                />,
                document.body
              )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminServicesPage;
