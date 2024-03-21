import React from 'react'
import Navbar from '../../../components/shared/Navbar';
import Carousel from '../../../components/shared/Carousel'
import KidsActivities from '../../../components/Activities/Kids/KidsActivities';

const KidsActivitiesPage = () => {
  return (
    <div className='activity-page'>
      <Navbar />
      <Carousel />
      <KidsActivities />
    </div>
  )
}

export default KidsActivitiesPage;