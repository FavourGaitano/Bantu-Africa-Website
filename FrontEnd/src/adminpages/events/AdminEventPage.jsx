import React, { useState } from "react";
import { useGetEventsQuery, useAddEventMutation } from "../../features/events/eventApi";
import "./AdminEventPage.scss";

const AdminEventPage = () => {
  const { data: events, error, isLoading } = useGetEventsQuery();
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    Name: "",
    Description: "",
    PosterUrl: "",
    Date: "",
  });

  // Mutation hook for adding an event
  const [addEvent, { isLoading: isAddingEvent }] = useAddEventMutation();

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the addEvent mutation with the new event data
      await addEvent(newEvent);
      // Reset the form state
      setNewEvent({
        Name: "",
        Description: "",
        PosterUrl: "",
        Date: "",
      });
      // Close the modal after successful addition
      closeModal();
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  if (!events || !Array.isArray(events)) {
    console.error("Events data is missing or not an array:", events);
    return <div>Error: Events data is missing or not an array</div>;
  }

  return (
    <div className="admin-event-page">
      <div className="admin-add-event-btn-sec">
        <h2>Admin Events Page</h2>
        <button className="admin-add-event-buton" onClick={openModal}>
          Add Event
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.upcommingEventId}>
              <td>{event.Name}</td>
              <td>{event.Description}</td>
              <td>{event.Date}</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>Add New Event</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="Name"
                value={newEvent.Name}
                onChange={handleInputChange}
                placeholder="Event Name"
                required
              />
              <input
                type="text"
                name="Description"
                value={newEvent.Description}
                onChange={handleInputChange}
                placeholder="Event Description"
                required
              />
              <input
                type="text"
                name="PosterUrl"
                value={newEvent.PosterUrl}
                onChange={handleInputChange}
                placeholder="Event Poster URL"
                required
              />
              <input
                type="date"
                name="Date"
                value={newEvent.Date}
                onChange={handleInputChange}
                required
              />
              <div className="event-sub-btn">
                <button className="submit-ebent" type="submit" disabled={isAddingEvent}>
                  {isAddingEvent ? "Adding..." : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEventPage;
