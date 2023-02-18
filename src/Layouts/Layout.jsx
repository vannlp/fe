import { Outlet } from "react-router-dom";

function Layout() {
    return ( 
        <>
            <h2>Hello</h2>
            <Outlet />
            <h3>Footer</h3>
        </>
     );
}

export default Layout;