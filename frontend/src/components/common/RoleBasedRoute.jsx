import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Loader from "./Loader";

const RoleBasedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ✅ FIX: use `role` (backend + AuthContext compatible)
  if (!allowedRoles.includes(user.role)) {
    if (user.role === "jobseeker") {
      return <Navigate to="/jobseeker/dashboard" replace />;
    }
    if (user.role === "employer") {
      return <Navigate to="/employer/dashboard" replace />;
    }
  }

  return children;
};

export default RoleBasedRoute;
