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
  const [editRoomCategoryId, setEditRoomCategoryId] = useState(null); 
  const navigate = useNavigate();
  const { data } = useGetRoomCategoriesQuery();

  const handleEditClick = (categoryId) => {
    setEditRoomCategoryId(categoryId); 
    setEditRoomModalOpen(true); 
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
          </div>
        </div>
        <div className="admin-table-body">
          <div className="admin-cart">
            <table>
              <thead>
                <tr>
                  <th>Room Name</th>
                  <th>Size</th>
                  <th>Meal Plan</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              {data && data.map((roomCategory) => (
                <tbody key={roomCategory.RoomCategoryId}>
                  <tr>
                    <td className="admin-td-custom">{roomCategory.Name}</td>
                    <td>{roomCategory.Size}</td>
                    <td>{roomCategory.MealPlan}</td>
                    <td>{roomCategory.Price}</td>
                    <td>
                      <span>
                        <button className="action-btn">Delete</button>
                      </span>
                      &nbsp;
                      <span>
                        <button className="action-btn0" onClick={() => handleEditClick(roomCategory.RoomCategoryId)}>Edit</button>
                      </span>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>
        {isAddRoomModalOpen && createPortal(
          <div className="room-category-modal-container">
            <div className="room-category-modal">
              <AddRoomCategory setIsAddRoomModalOpen={setIsAddRoomModalOpen} />
            </div>
          </div>,
          document.body
        )}
        {editRoomModalOpen && createPortal(
          <div className="room-category-modal-container">
            <div className="room-category-modal">
              <EditRoomCategory
                categoryId={editRoomCategoryId}
                roomCategory={data.find(category => category.RoomCategoryId === editRoomCategoryId)} 
                setEditRoomModalOpen={setEditRoomModalOpen}
              />
            </div>
          </div>,
          document.body
        )}
      </div>
    </>
  );
}

export default ViewRoomPage;
