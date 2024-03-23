import React from "react";
import "./ContactUsForm.scss";
import { useAddInquiryMutation } from "../../features/inquiries/inquiryApi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  ErrorToast,
  LoadingToast,
  SuccessToast,
} from "../../components/shared/Toaster";

const ContactUsForm = () => {
  const [addInquiry, { isLoading }] = useAddInquiryMutation();
  const schema = yup.object().shape({
    Name: yup.string().required("Please provide your name"),
    Email: yup.string().required("Please provide your Email"),
    Description: yup.string().required("Please describe your request"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      LoadingToast(true);
      const response = await addInquiry(data).unwrap();
      console.log("Inquiry res:", response);
      if (!response.error) {
        LoadingToast(false);
        SuccessToast("Inquiry sent successfully");
        reset();
      } else {
        ErrorToast("Error sending inquiry. Please try again later.");
        reset();
      }
    } catch (error) {
      LoadingToast(false);
      ErrorToast("An error occurred. Please try again later.");
    }
  };

  if (isLoading) {
    return <div>{LoadingToast(true)}</div>;
  }

  return (
    <div className="main">
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <span className="heading">Get in touch</span>
          <input
            placeholder="Name"
            type="text"
            className="input"
            name="Name"
            id="Name"
            {...register("Name")}
          />
          <p>{errors.Name?.message}</p>
          <input
            placeholder="Email"
            id="Email"
            type="email"
            className="input"
            {...register("Email")}
          />
          <p>{errors.Email?.message}</p>
          <textarea
            placeholder="Say Hello"
            rows="10"
            cols="30"
            id="Description"
            name="Description"
            className="textarea"
            {...register("Description")}
          ></textarea>
          <div className="button-container">
            <input className="send-button" value="Send" type="submit" />
            {/* <div className="reset-button-container">
                    <div id="reset-btn" className="reset-button">Reset</div>
                </div> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUsForm;
