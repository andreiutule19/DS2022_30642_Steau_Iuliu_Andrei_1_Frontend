import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

 const PrivateRouteAdmin = () => {
    if (sessionStorage.getItem("ROLE") === "ADMIN") {
        return <Outlet />;
    }
    if (sessionStorage.getItem("ROLE") === "USER") {
        return <Navigate to="/homeUser" />;
    }
    else {
        return <Navigate to="/" />;
    }
   
}
export default PrivateRouteAdmin;


