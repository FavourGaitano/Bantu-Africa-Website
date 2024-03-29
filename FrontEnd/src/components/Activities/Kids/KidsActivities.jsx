import React, { useState } from "react";
import { useGetKidsActivitiesQuery } from "../../../features/activities/activityApi";
import "./KidsActivities.scss";
import Modal from "../ActivityModal/ActivityModal";

const KidsActivities = () => {
  const {
    data: kidsActivities,
    error,
    isLoading,
  } = useGetKidsActivitiesQuery();
  const [selectedActivity, setSelectedActivity] = useState(null);

  const handleOpenModal = (activity) => {
    setSelectedActivity(activity);
  };

  const handleCloseModal = () => {
    setSelectedActivity(null);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="activities">
      <div className="activity-title">
        <h1>KIDS ACTIVITIES</h1>
      </div>
      <div className="activity-section">
        {kidsActivities.map((activity) => (
          <div key={activity.ActivityId} className="activity">
            <div className="activity-image">
              <img src={activity.ImageUrl} alt="No image found" />
            </div>
            <div className="activity-description">
              <div className="description-name">
                <h3>{activity.ActivityName}</h3>
              </div>
              <div className="description-text">
                <p>{activity.Description}</p>
              </div>
              <div className="desc-btn">
                <button onClick={() => handleOpenModal(activity)}>
                  FIND MORE
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={selectedActivity !== null}
        onClose={handleCloseModal}
        activity={selectedActivity}
      />
    </div>
  );
};

export default KidsActivities;
