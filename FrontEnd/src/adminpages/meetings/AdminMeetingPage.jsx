import React from "react";
import { useGetMeetingsQuery } from "../../features/meetings/meetingsApi";

function AdminMeetingPage() {
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
        <h1>Conference Rooms</h1>
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
                <td className="admin-td-custom">
                  {meeting.ConferenceRoomName}
                </td>

                <td>
                  <img
                    src={meeting.Image}
                    alt={meeting.ConferenceRoomName}
                    style={{ width: "100px", height: "auto" }}
                  />
                </td>
                <td>{meeting.Description}</td>
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
}

export default AdminMeetingPage;
