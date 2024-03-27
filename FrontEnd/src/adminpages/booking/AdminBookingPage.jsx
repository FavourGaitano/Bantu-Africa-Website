import React from "react";
import {
  useDeleteBookingMutation,
  useGetBookingsQuery,
} from "../../features/bookings/bookingsApi";
import {
  ErrorToast,
  LoadingToast,
  SuccessToast,
} from "../../components/shared/Toaster";
import "./adminBookingPage.scss";

const AdminBookingPage = () => {
  const { data: Bookings, error, isLoading } = useGetBookingsQuery();
  const [deleteBooking, { isLoading: loading, isError }] =
    useDeleteBookingMutation();

  const handleDelete = async (BookingId) => {
    // console.log("BookingId: ", BookingId);
    try {
      const response = await deleteBooking(BookingId).unwrap();
      LoadingToast(false);
      SuccessToast(response.message);
    } catch (error) {
      ErrorToast("An error occurred. Please try again later.");
    }
  };

  if (loading) {
    LoadingToast();
  }
  if (isError) {
    LoadingToast(false);
    ErrorToast("An error occurred. Please try again later.");
    return;
  }
  // /console.log(
  //   "Bookings: ",
  //   Bookings,
  //   "Error: ",
  //   error,
  //   "isLoading: ",
  //   isLoading
  // );

  if (error) {
    ErrorToast("Error loading bookings");
    return;
  }

  if (isLoading) {
    LoadingToast();
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* {console.log("Response admin: ", response)} */}

      <div className="the-table-body">
        <div className="admin-cart">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Stay</th>
                <th>Guests No.</th>
                <th>RoomNo</th>
                <th>isPaid</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {LoadingToast(false)}
              {SuccessToast("Bookings fetched successfully")}
              {Bookings &&
                [...Bookings]
                  .sort((a, b) => b.CreatedAt - a.CreatedAt)
                  .map((item, index) => (
                    <tr key={index}>
                      <td>{`${item.FirstName} ${item.LastName}`}</td>
                      <td>{item.Email}</td>
                      <td>{`From ${item.StartDate.split("T")[0]} to ${
                        item.EndDate.split("T")[0]
                      }`}</td>
                      <td>{`${item.AdultsNo + item.KidsNo}`}</td>
                      <td>{item.RoomNumber}</td>
                      <td>{item.isPaid ? "✔️" : "❌"}</td>
                      <td className="action-buttons">
                        <span>
                          <button
                            className="action-btn"
                            onClick={() => handleDelete(item.BookingId)}
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

export default AdminBookingPage;
