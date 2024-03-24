
import React from 'react';
import { useGetOtherServicesQuery } from '../../features/otherServices/otherServices';
const OtherServices = () => {
  const { data, error, isLoading } = useGetOtherServicesQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Other Services</h1>
      <div className="services-container">
        {data.map((activity, index) => (
          <div key={index} className="service">
            <h2>{activity.ActivityName}</h2>
            <p>{activity.Description}</p>
            <img src={activity.ImageUrl} alt={activity.ActivityName} />
            <button>FIND OUT MORE</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OtherServices;

