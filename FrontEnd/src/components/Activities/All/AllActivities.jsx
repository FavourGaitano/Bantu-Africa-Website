import React from "react";
import { useGetActivitiesQuery } from "../../../features/activities/activityApi";
import "./AllActivities.scss";

const AllActivities = () => {
  const { data: activities, error, isLoading } = useGetActivitiesQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="all-activites">
      <div className="all-activities-title">
        <h1>ALL ACTIVITIES</h1>
      </div>

      <div className="all-activity-section">
        {activities.map(activity => (
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
                <button>FIND MORE</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllActivities;

