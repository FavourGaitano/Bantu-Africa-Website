import React, { useState } from 'react';
import './AddRoom.scss';
import {  useUpdateRoomCategoryMutation } from '../../features/roomCategory/roomCategoryApi';
import { LoadingToast, SuccessToast, ToasterContainer } from '../shared/Toaster';
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const EditRoomCategory = ({ setEditRoomModalOpen,roomCategory}) => {
  const navigate = useNavigate();

  const [updateRoomCategory, { isLoading }] = useUpdateRoomCategoryMutation();
  const schema = yup.object().shape({
    Name: yup.string().required("Room name is required"),
    Price: yup.number().required("Price is required"),
    MealPlan: yup.string().required("Meal plan is required"),
    Size: yup.string().required("Size is required"),
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      Name: roomCategory.Name,
      Size: roomCategory.Size,
      MealPlan: roomCategory.MealPlan,
      Price: roomCategory.Price
    }
  });

  const updateRoomsCategory = async (data) => {
    LoadingToast();
    try {
      const response = await updateRoomCategory({RoomCategoryId:roomCategory.RooomCategoryId,...data});

      if (response.data && response.data.message) {
        SuccessToast(response.data.message);
        reset();
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        console.error('Error during room category creation');
      }
    } catch (error) {
      console.error('Error during room category creation:', error);
    }
    LoadingToast(false);
  };

  const handleCloseModal = () => {
    setEditRoomModalOpen(false);
  };

  return (
    <div className="modal-overlay">
      <div className="room-category-modal">
        <div className="room-category-modal-content">
          <span className="category-close" onClick={handleCloseModal}>
            &times;
          </span>
          <ToasterContainer />
          <h2> Room Category</h2>
          <form onSubmit={handleSubmit(updateRoomsCategory)}>
            <div>
              <label htmlFor="roomCategoryName">Room Name:</label>
              <input
                type="text"
                id="roomCategoryName"
                name="Name"
                {...register("Name")}
              />
              {errors.Name && <p>{errors.Name.message}</p>}
            </div>
            <div>
              <label htmlFor="roomCategorySize">Room Size</label>
              <input
                type="text"
                id="roomCategorySize"
                name="Size"
                {...register("Size")}
              />
              {errors.Size && <p>{errors.Size.message}</p>}
            </div>
            <div>
              <label htmlFor="roomCategoryMealPlan">Mean Plan</label>
              <input
                type="text"
                id="roomCategoryMealPlan"
                name="MealPlan"
                {...register("MealPlan")}
              />
              {errors.MealPlan && <p>{errors.MealPlan.message}</p>}
            </div>
            <div>
              <label htmlFor="roomCategoryPrice">Price</label>
              <input
                type="number"
                id="roomCategoryPrice"
                name="Price"
                {...register("Price")}
              />
              {errors.Price && <p>{errors.Price.message}</p>}
            </div>
            <div className="act-btn">
              <button
                className="room-category-add-button"
                type="submit"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditRoomCategory;
