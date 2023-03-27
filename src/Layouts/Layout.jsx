import { Grid } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import SiderBar from "../components/SiderBar/SiderBar";

function Layout() {
    return ( 
        <>
            <Header />
            <Grid spacing={2} container className="main">
                <Grid item xs={2}>
                    <SiderBar />
                </Grid>
                <Grid item xs={10}>
                    <Outlet />
                </Grid>
            </Grid>
        </>
     );
}

export default Layout;