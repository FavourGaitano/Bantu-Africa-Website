// Modal.jsx
import React from "react";
import './ActivityModal.scss'
const ActivityModal = ({ isOpen, onClose, activity }) => {
  if (!isOpen) return null;

  return (
    <div className="activity-modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <div className="modal-body">
          <img src={activity.ImageUrl} alt="Activity" />
          <div>
            <h3>{activity.ActivityName}</h3>
            <p>{activity.Description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityModal;
