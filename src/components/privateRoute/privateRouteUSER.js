import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

 const PrivateRouteUser = () => {
    if (sessionStorage.getItem("ROLE") === "USER") {
        return <Outlet />;
    }
    else {
        return <Outlet />;;
    }
   
}
export default PrivateRouteUser;


