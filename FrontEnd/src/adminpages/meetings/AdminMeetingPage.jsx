import React, { useState } from "react";
import "./AdminMeetingPage.scss"; // Adjust the path as necessary
import {
  useGetMeetingsQuery,
  useAddMeetingMutation,
  useDeleteMeetingMutation,
  useUpdateMeetingMutation,
} from "../../features/meetings/meetingsApi";

const AdminMeetingPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentMeeting, setCurrentMeeting] = useState(null);
  // Form fields state
  const [meetingName, setMeetingName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");

  // Mutation hooks
  const [addMeeting] = useAddMeetingMutation();
  const [deleteMeeting] = useDeleteMeetingMutation();
  const [updateMeeting] = useUpdateMeetingMutation();

  // Fetching meetings
  const {
    data: allMeetings,
    error: allMeetingsError,
    isLoading: allMeetingsLoading,
  } = useGetMeetingsQuery();

  // Add button click handler
  const handleAddClick = () => {
    setShowModal(true);
    setCurrentMeeting(null); // No current meeting for adding
    // Clear form for new entry
    setMeetingName("");
    setImage("");
    setDescription("");
    setQuantity("");
  };

  // Edit button click handler
  const handleEditClick = (meeting) => {
    setCurrentMeeting(meeting); // Set current meeting for editing
    // Pre-fill form with meeting details
    setMeetingName(meeting.ConferenceRoomName);
    setImage(meeting.Image);
    setDescription(meeting.Description);
    setQuantity(meeting.Quantity);
    setShowModal(true);
  };

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const meetingData = {
      ConferenceRoomName: meetingName,
      Image: image,
      Description: description,
      Quantity: quantity,
    };

    try {
      if (currentMeeting) {
        // Update meeting
        await updateMeeting({
          ...meetingData,
          ConferenceId: currentMeeting.ConferenceId,
        }).unwrap();
      } else {
        // Add new meeting
        await addMeeting(meetingData).unwrap();
      }
      setShowModal(false); // Close modal on success
      // Clear form fields
      setMeetingName("");
      setImage("");
      setDescription("");
      setQuantity("");
      setCurrentMeeting(null); // Clear current meeting
    } catch (error) {
      console.error("Failed to process the meeting:", error);
    }
  };

  // Delete button click handler
  const handleDeleteClick = async (ConferenceId) => {
    try {
      await deleteMeeting(ConferenceId).unwrap();
    } catch (error) {
      console.error("Failed to delete the meeting:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading meetings.</div>;
  }

  return (
    <div className="admin-table-body">
      <div className="admin-cart">
        <div className="tableheaders">
          <h1>Conference Rooms</h1>
          <button onClick={handleAddClick} className="admin-other-service-btn">
            Add Conference Room
          </button>
        </div>

        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setShowModal(false)}>
                &times;
              </span>
              <h3>{currentMeeting ? "Edit" : "Add"} Conference Room</h3>
              <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input
                  type="text"
                  value={meetingName}
                  onChange={(e) => setMeetingName(e.target.value)}
                  required
                />
                <label>Image URL</label>
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  required
                />
                <label>Description</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
                <label>Quantity</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                />
                <button type="submit">Save</button>
              </form>
            </div>
          </div>
        )}

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
            {allMeetings.map((meeting, index) => (
              <tr key={meeting.ConferenceId}>
                <td>{index + 1}</td>
                <td>{meeting.ConferenceRoomName}</td>
                <td>
                  <img
                    src={meeting.Image}
                    alt="Conference Room"
                    style={{ width: "100px", height: "auto" }}
                  />
                </td>
                <td>{meeting.Description}</td>
                <td>{meeting.Quantity}</td>
                <td>
                  <button
                    className="action-btn"
                    onClick={() => handleEditClick(meeting)}
                    style={{ marginRight: "10px" }}
                  >
                    Edit
                  </button>
                  <button
                    className="action-btn"
                    onClick={() => handleDeleteClick(meeting.ConferenceId)}
                  >
                    Delete
                  </button>
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
