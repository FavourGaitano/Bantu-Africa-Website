import React from 'react'
import Carousel from '../../../components/shared/Carousel'
import AdultsActivities from '../../../components/Activities/Adults/AdultsActivities';

const AdultsActivitiesPage = () => {
  return (
    <div className='activity-page'>
      
      <Carousel />
      <AdultsActivities />
    </div>
  )
}

export default AdultsActivitiesPage;