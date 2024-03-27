import React from "react";
import CreateBooking from "../../components/Booking/CreateBooking";
import "./adminCreateBooking.scss";
import { useNavigate } from "react-router-dom";

const AdminCreateBooking = () => {
  const navigate = useNavigate();
  return (
    <div className="admin-booking">
      <button onClick={() => navigate("/admin")}>⬅️</button>
      <CreateBooking />
    </div>
  );
};

export default AdminCreateBooking;
