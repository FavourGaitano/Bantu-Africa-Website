import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar/AdminSidebar";
import AdminTable from '../components/AdminTable/AdminTable'
const AdminDashboardRoutes = () => {
  return (
    <div>

      <AdminSidebar />

      <Routes>
        <Route path="/dash" element={<AdminTable />} />
      </Routes>
    </div>
  );
};

export default AdminDashboardRoutes;
