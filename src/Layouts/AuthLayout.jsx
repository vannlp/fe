import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./AuthLayout.scss";

function AuthLayout() {
    return ( 
        <div className="auth">
            <Outlet />
        </div>
     );
}

export default AuthLayout;