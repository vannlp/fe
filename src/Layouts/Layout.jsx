import { Grid } from "@mui/material";
import { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import SiderBar from "../components/SiderBar/SiderBar";

function Layout() {

    return ( 
        <>
            <Grid container sx={{height: "100vh", overflow: "hidden"}}>
                <Grid item xs={12} sx={{height: "65px"}}>
                    <Header />
                </Grid>
                <Grid item xs={2} sx={{height: "calc(100vh - 65px)", overflow: "auto"}}>
                    <SiderBar />
                </Grid>
                <Grid item xs={10} bgcolor="#eee" sx={{height: "calc(100vh - 65px)", overflow: "auto"}}>
                    <Outlet />
                </Grid>
            </Grid>
        </>
     );
}

export default Layout;