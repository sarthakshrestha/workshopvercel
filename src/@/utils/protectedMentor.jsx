import React from "react";
import { Navigate, Outlet } from "react-router";
import { isMentor } from "pages/authentication/util";

function ProtectedMentor() {
    if (isMentor()) {
        //
        return <Outlet />;
    } else {
        return <Navigate to="/" replace />;
    }
}

export default ProtectedMentor;
