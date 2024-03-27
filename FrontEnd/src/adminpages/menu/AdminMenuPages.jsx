import React from 'react'
import AdminTable from '../../components/AdminTable/AdminTable'
import {useGetRestaurantMenuQuery} from '../../features/restaurant/restaurantApi'

const AdminMenuPages = () => {
    const { data: response} = useGetRestaurantMenuQuery();
    const menuUrl = response?.restaurant;

  return (
    <div>
    {menuUrl && menuUrl.map((menu)=>( 
        <div key={menu.RestaurantId}>
      <AdminTable
      tableNumber="No."
      Img="Menu Image"
      tbody1="1"
      menuImg={menu.MenuUrl}
     
      />
    </div>

    ))}
    </div>
  )
}

export default AdminMenuPages