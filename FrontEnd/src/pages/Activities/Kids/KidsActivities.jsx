import React from 'react'
import Carousel from '../../../components/shared/Carousel'
import KidsActivities from '../../../components/Activities/Kids/KidsActivities';

const KidsActivitiesPage = () => {
  return (
    <div className='activity-page'>
      <Carousel />
      <KidsActivities />
    </div>
  )
}

export default KidsActivitiesPage;