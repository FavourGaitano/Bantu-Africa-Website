import React from 'react'
import AdminTable from '../../components/AdminTable/AdminTable';
import { useGetRoomsQuery } from '../../features/rooms/roomApi';
import Button from '../../components/shared/Button';
import { FaRegSquarePlus } from "react-icons/fa6";
import './AdminRoomPage.scss';
import { useNavigate } from 'react-router-dom';

const AdminRoomPage = () => {
const navigate=useNavigate()
  const{data:rooms}=useGetRoomsQuery();
  console.log();
const handleAddForm=()=>{
  navigate('/admin/addroom')
}
  return (
    <div>
      <div className="admin-room-top">
      <h2>This is Admin Room Page</h2>
      <div className="admin-room-btn-group">
      <Button btnIcon={<FaRegSquarePlus/>} className="btn-add-room" msg="Add Category"/>
      <Button btnIcon={<FaRegSquarePlus/>} onClick={handleAddForm} className="btn-add-room" msg="Add Room"/>
      </div>
      </div>
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
