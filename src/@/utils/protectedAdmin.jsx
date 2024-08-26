import React from "react";
import { Navigate, Outlet } from "react-router";
import { isAdmin } from "pages/authentication/util";

function ProtectedAdmin() {
  if (isAdmin()) {
    //
    return <Outlet />;
  } else {
    return <Navigate to="/" replace />;
  }
}

export default ProtectedAdmin;
