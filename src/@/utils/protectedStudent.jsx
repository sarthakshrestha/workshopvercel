import React from "react";
import { Navigate, Outlet } from "react-router";
import { isStudent } from "pages/authentication/util";

function ProtectedStudent() {
  if (isStudent()) {
    console.log("CHECK ", isStudent());
    return <Outlet />;
  } else {
    return <Navigate to="/" replace />;
  }
}

export default ProtectedStudent;
