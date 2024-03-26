import React from 'react'
import AdminTable from '../../components/AdminTable/AdminTable';
import { useGetRoomsQuery } from '../../features/rooms/roomApi';

const AdminRoomPage = () => {

  const{data:rooms}=useGetRoomsQuery();
  console.log();

  return (
    <div>
      <h2>This is Admin Room Page</h2>
     {rooms && rooms.map((room)=>(
      <div key={room.RoomId}>
         <AdminTable
       tableNumber="Room No."
       thead1="Room Category"
       thead2="Bed Type"
       thead3="Meal Plan"
       thead4="Price"
       thead5="Actions"
       tbody1={room.RoomNumber}
       tbody2={room.Name}
       tbody3={room.Size}
       tbody4={room.MealPlan}
       tbody5={room.Price}
      />
      </div>
     ))}
    </div>
  )
}

export default AdminRoomPage
