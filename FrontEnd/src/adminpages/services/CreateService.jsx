import React from "react";
import "./editServices.scss";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateServiceMutation } from "../../features/services/servicesApi";
import {
  ErrorToast,
  LoadingToast,
  SuccessToast,
} from "../../components/shared/Toaster";
import { string } from "yup";

const CreateServicesForm = ({ setShowCreateModal }) => {
  const [createService, { isLoading, error }] = useCreateServiceMutation();

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
  });

  const handleCreate = async (data) => {
    try {
      LoadingToast();
      const response = await createService(data).unwrap();
      LoadingToast(false);
      SuccessToast(response.message);
    } catch (error) {
      LoadingToast(false);
      ErrorToast("Error creating service.");
    }
    reset();
    setShowCreateModal(false);
  };

  return (
    <div className="AdminForm">
      <button className="close-btn" onClick={() => setShowCreateModal(false)}>
        ❌
      </button>
      <form className="form" onSubmit={handleSubmit(handleCreate)}>
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
          {isLoading ? "Loading" : "Create Service"}
        </button>
      </form>
    </div>
  );
};

export default CreateServicesForm;
