import React, { useState } from 'react';
import AdminTable from '../../components/AdminTable/AdminTable';
import { useGetRoomsQuery } from '../../features/rooms/roomApi';
import Button from '../../components/shared/Button';
import { FaRegSquarePlus } from "react-icons/fa6";
import './AdminRoomPage.scss';
import { useNavigate } from 'react-router-dom';
import AddRoomCategory from '../../components/adminroom/AddRoomCategory';
import { createPortal } from 'react-dom';

const AdminRoomPage = () => {
  const [isAddRoomModalOpen, setIsAddRoomModalOpen] = useState(false);
  const [editRoomModalOpen, setEditRoomModalOpen] = useState(false);
  const navigate = useNavigate();
  const { data: rooms } = useGetRoomsQuery();

  const handleAddRoomForm = () => {
    navigate('/admin/addroom');
  };
  const handleViewRoomForm = () => {
    navigate('/admin/viewroom');
  };
  return (
<>
<div>
      <div className="admin-room-top">
        <h2>This is Admin Room Page</h2>
        <div className="admin-room-btn-group">
          {/* <Button
            btnIcon={<FaRegSquarePlus />}
            onClick={() => setIsAddRoomModalOpen(true)}
            className="btn-add-room"
            msg="Add Category"
          /> */}
            <Button
            btnIcon={<FaRegSquarePlus />}
            onClick={handleViewRoomForm}
            className="btn-add-room"
            msg="View Room Category"
          />
          {/* updateRoomsCategory */}
          <Button
            btnIcon={<FaRegSquarePlus />}
            onClick={handleAddRoomForm}
            className="btn-add-room"
            msg="Add Room"
          />
        </div>
      </div>
      {rooms && rooms.map((room) => (
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
      {/* {isAddRoomModalOpen && createPortal(
        <div className="room-category-modal-container">
          <div className="room-category-modal">
            <AddRoomCategory setIsAddRoomModalOpen={setIsAddRoomModalOpen} />
          </div>
        </div>,
        document.body
      )} */}
    </div>
    {/* {isAddRoomModalOpen && createPortal(
      <div className="room-category-modal-container">
        <div className="room-category-modal">
          <updateRoomsCategory setEditRoomModalOpen={setEditRoomModalOpen} />
        </div>
      </div>,
      document.body
    )} */}
</>
  );
}

export default AdminRoomPage;
