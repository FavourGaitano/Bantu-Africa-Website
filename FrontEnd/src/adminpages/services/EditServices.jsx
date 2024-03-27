import React from "react";
import "./editServices.scss";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUpdateServiceMutation } from "../../features/services/servicesApi";
import {
  ErrorToast,
  LoadingToast,
  SuccessToast,
} from "../../components/shared/Toaster";
import { string } from "yup";

const EditServicesForm = ({ service, setShowModal }) => {
  console.log("Received service: ", service);
  const [updateService, { isLoading, error }] = useUpdateServiceMutation();

  const schema = yup.object().shape({
    ServiceName: string().required("Required"),
    Description: string().required("Required"),
    ImageUrl: string().required("Required"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ServiceName: service.ServiceName,
      Description: service.Description,
      ImageUrl: service.ImageUrl,
    },
  });

  const handleEdit = async (data) => {
    try {
      LoadingToast();
      const updatedService = { ...service, ...data };
      console.log("Updated service: ", updatedService);
      const response = await updateService(updatedService).unwrap();
      LoadingToast(false);
      SuccessToast(response.message);
    } catch (error) {
      LoadingToast(false);
      ErrorToast("Error updating service.");
    }
    setShowModal(false);
    reset();
  };

  return (
    <div className="AdminForm">
      <button className="close-btn" onClick={() => setShowModal(false)}>
        ❌
      </button>
      <form className="form" onSubmit={handleSubmit(handleEdit)}>
        <span className="input-span">
          <label htmlFor="ServiceName" className="label">
            Service Name
            <input
              type="text"
              name="ServiceName"
              id="ServiceName"
              {...register("ServiceName")}
            />
          </label>
          <p>{errors.ServiceName?.message}</p>
        </span>
        <span className="input-span">
          <label htmlFor="Description" className="label desc">
            Description
            <textarea
              type="text"
              name="Description"
              id="Description"
              {...register("Description")}
            />
            <p>{errors.Description?.message}</p>
          </label>
        </span>
        <span className="input-span">
          <label htmlFor="ImageUrl" className="label">
            ImageUrl
            <input
              type="text"
              name="ImageUrl"
              id="ImageUrl"
              {...register("ImageUrl")}
            />
            <p>{errors.ImageUrl?.message}</p>
          </label>
        </span>

        <button className="submit" type="submit">
          {isLoading ? "Loading" : "Update Service"}
        </button>
      </form>
    </div>
  );
};

export default EditServicesForm;
