import React from 'react'
import './AllActivitiesPage.scss'
import Carousel from '../../../components/shared/Carousel'
import AllActivities from '../../../components/Activities/All/AllActivities'

const AllActivitiesPage = () => {
  return (
    <div>
      <Carousel />
      <AllActivities />
    </div>
  )
}

export default AllActivitiesPage