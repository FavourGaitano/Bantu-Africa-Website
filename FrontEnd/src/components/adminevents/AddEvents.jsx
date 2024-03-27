import React, { useState } from 'react';
import './AddRoom.scss';
import { useGetRoomCategoriesQuery } from '../../features/roomCategory/roomCategoryApi';
import { useAddRoomMutation } from '../../features/rooms/roomApi';
import { LoadingToast, SuccessToast, ToasterContainer } from '../../components/shared/Toaster';
import { useNavigate } from "react-router-dom";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const AddRoom = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const { data } = useGetRoomCategoriesQuery();
  console.log("room categories", data);

  const [rooms] = useAddRoomMutation();

  const schema = yup.object().shape({
    RoomNumber: yup.string().required("Room number is required"),
    Occupants: yup.number().required("Occupants number is required"),
    RoomPhotoUrl: yup.string().required("Image URL is required"),
    Description: yup.string().required("Description is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(schema),
  });

  console.log(errors);

  const handleRoomSubmit = async (formData) => {
    LoadingToast();
    try {
      const response = await rooms({
        ...formData,
        RoomCategoryId: selectedCategory
      });

      if (response.data && response.data.message) {
        SuccessToast(response.data.message);
        reset();
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        console.error('Error during room creation:', error);
      }
    } catch (error) {
      console.error('Error during room creation:', error);
    }
    LoadingToast(false);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div className="admin-add-form">
      <ToasterContainer />
      <form className="contact-form" onSubmit={handleSubmit(handleRoomSubmit)}>
        <h3>Create Room</h3>
        <h4>Add also the categories to create Room!</h4>
        <div className="input-wrapper">
          <select name="roomCategoryId" id="roomCategoryId" tabIndex="1" required autoFocus onChange={handleCategoryChange}>
            <option value="">Select Room Category</option>
            {data && data.map((category) => (
              <option key={category.RoomCategoryId} value={category.RoomCategoryId}>{category.Name}</option>
            ))}
          </select>
          <p className="errors">{errors.RoomNumber?.message}</p>
          <fieldset>
            <input placeholder="Occupants" name='Occupants' id='Occupants' {...register("Occupants")} type="number" tabIndex="5" />
            <p className="errors">{errors.Occupants?.message}</p>
          </fieldset>
          <fieldset>
            <input placeholder="Image of the room" name='RoomPhotoUrl' id='RoomPhotoUrl' {...register("RoomPhotoUrl")} type="text" />
            <p className="errors">{errors.RoomPhotoUrl?.message}</p>
          </fieldset>
          <fieldset>
            <input placeholder="Room No." type="number" name='RoomNumber' id='RoomNumber' {...register("RoomNumber")} />
            <p className="errors">{errors.RoomNumber?.message}</p>
          </fieldset>
          <fieldset>
            <textarea placeholder="Description of the room" name='Description' id='Description' {...register("Description")} tabIndex="8"></textarea>
            <p className="errors">{errors.Description?.message}</p>
          </fieldset>
          <fieldset>
            <button name="submit" type="submit" id="contact-submit" data-submit="...Sending">Submit</button>
          </fieldset>
        </div>
      </form>
    </div>
  );
}

export default AddRoom;
