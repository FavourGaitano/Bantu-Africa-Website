import React from "react";
import {
  useGetMeetingsQuery,
  useAddMeetingMutation,
  useDeleteMeetingMutation,
  useUpdateMeetingMutation,
} from "../../features/meetings/meetingsApi";

const AdminMeetingPage = () => {
  // const [showModal, setShowModal] = useState(false);

  const {
    data: allMeetings,
    error: allMeetingsError,
    isLoading: allMeetingsLoading,
  } = useGetMeetingsQuery();
  console.log(allMeetings);

  const isLoading = allMeetingsLoading;
  const error = allMeetingsError;
  const Meetings = allMeetings;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading Meetings.</div>;
  }

  return (
    <div className="admin-table-body">
      <div className="admin-cart">
        <div className="tableheaders">
          <h1>Conference Rooms</h1>

          <button className="admin-other-service-btn">
            Add - Conference Room
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Image</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Meetings.map((meeting, index) => (
              <tr key={meeting.ConferenceId}>
                <td className="admin-td-custom">{index + 1}</td>
                <td className="admin-td-custom" style={{ width: "25%" }}>
                  {meeting.ConferenceRoomName}
                </td>

                <td>
                  <img
                    src={meeting.Image}
                    alt={meeting.ConferenceRoomName}
                    style={{ width: "150%", height: "auto" }}
                  />
                </td>
                <td style={{ width: "35%" }}>{meeting.Description}</td>
                <td>{meeting.Quantity}</td>

                <td>
                  <button className="action-btn">Delete</button>
                  &nbsp;
                  <button className="action-btn0">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminMeetingPage;
