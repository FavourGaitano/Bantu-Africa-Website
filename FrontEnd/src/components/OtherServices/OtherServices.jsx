
import React from 'react';
import { useGetOtherServicesQuery } from '../../features/otherServices/otherServices';
import './OtherServices.scss'

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
    <div className='other-services'>
      <h1>Other Services</h1>
      <div className="other-services-container">
        {data.map((activity, index) => (
          <div key={index} className="service">
            <h2>{activity.ActivityName}</h2>
            <p>{activity.Description}</p>
            <img src={activity.ImageUrl} alt={activity.ActivityName} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OtherServices;

