import React from "react";
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

const AdminServicesPage = () => {
  const { data: services, error, isLoading } = useGetServicesQuery();
  const [deleteService, { isLoading: loading, isError }] =
    useDeleteServiceMutation();
  console.log(
    "services: ",
    services,
    "error: ",
    error,
    "isLoading: ",
    isLoading
  );

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
      <div className="admin-table-body">
        <div className="admin-cart">
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Service ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Image URL</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services &&
                [...services]
                  .sort((a, b) => b.CreatedAt - a.CreatedAt)
                  .map((service, index) => (
                    <tr key={index}>
                      <td className="admin-td-custom">{index + 1}</td>
                      <td>{service.ServiceId}</td>
                      <td>{service.ServiceName}</td>
                      <td>{service.Description.slice(0, 16) + "..."}</td>
                      <td>{service.ImageUrl.slice(0, 16) + "..."}</td>

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
                          <button className="action-btn0">Edit</button>
                        </span>
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

export default AdminServicesPage;
