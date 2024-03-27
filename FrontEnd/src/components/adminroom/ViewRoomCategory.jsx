import React, { useState } from 'react';
import AdminTable from '../../components/AdminTable/AdminTable';
import Button from '../../components/shared/Button';
import { FaRegSquarePlus } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import AddRoomCategory from '../../components/adminroom/AddRoomCategory';
import EditRoomCategory from '../../components/adminroom/EditRoomCategory'; // Import EditRoomCategory component
import { createPortal } from 'react-dom';
import { useGetRoomCategoriesQuery } from '../../features/roomCategory/roomCategoryApi';

const ViewRoomPage = () => {
  const [isAddRoomModalOpen, setIsAddRoomModalOpen] = useState(false);
  const [editRoomModalOpen, setEditRoomModalOpen] = useState(false);
  const [editRoomCategoryId, setEditRoomCategoryId] = useState(null); // State to hold the ID of the room category to be edited
  const navigate = useNavigate();
  const { data } = useGetRoomCategoriesQuery();
console.log("category data",data);
  // Function to handle edit click
  const handleEditClick = (categoryId) => {
    setEditRoomCategoryId(categoryId); // Set the ID of the room category to be edited
    setEditRoomModalOpen(true); // Open the edit modal
  };

  return (
    <>
      <div>
        <div className="admin-room-top">
          <div className="admin-room-btn-group">
            <Button
              btnIcon={<FaRegSquarePlus />}
              onClick={() => setIsAddRoomModalOpen(true)}
              className="btn-add-room"
              msg="Add Category"
            />
            <Button
              btnIcon={<FaRegSquarePlus />}
              onClick={() => setEditRoomModalOpen(true)}
              className="btn-add-room"
              msg="View Room Category"
            />
          </div>
        </div>
        {data && data.map((roomCategory) => (
          <div key={roomCategory.RoomCategoryId}>
            <AdminTable
              thead1="Room Name"
              thead2="Size"
              thead3="Meal Plan"
              thead4="Price"
              thead5="Actions"
              tbody2={roomCategory.Name}
              tbody3={roomCategory.Size}
              tbody4={roomCategory.MealPlan}
              tbody5={roomCategory.Price}
              onEditClick={() => handleEditClick(roomCategory.RoomCategoryId)} 
            />
            {editRoomModalOpen && createPortal(
              <div className="room-category-modal-container">
                <div className="room-category-modal">
                  <EditRoomCategory
                    categoryId={editRoomCategoryId}
                    roomCategory={roomCategory} // Pass roomCategory as a prop
                    setEditRoomModalOpen={setEditRoomModalOpen}
                  />
                </div>
              </div>,
              document.body
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default ViewRoomPage;
