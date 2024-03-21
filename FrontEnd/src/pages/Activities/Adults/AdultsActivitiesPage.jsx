import React from 'react'
import Navbar from '../../../components/shared/Navbar';
import Carousel from '../../../components/shared/Carousel'
import AdultsActivities from '../../../components/Activities/Adults/AdultsActivities';

const AdultsActivitiesPage = () => {
  return (
    <div className='activity-page'>
      <Navbar />
      <Carousel />
      <AdultsActivities />
    </div>
  )
}

export default AdultsActivitiesPage;