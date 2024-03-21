import React from 'react'
import Navbar from '../../components/shared/Navbar'
import Carousel from '../../components/shared/Carousel'
import Activities from '../../components/Activities/Activities'

const ActivitiesPage = () => {
  return (
    <div className='activity-page'>
        <Navbar />
        <Carousel />
        <Activities />
    </div>
  )
}

export default ActivitiesPage;