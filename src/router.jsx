import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import AuthLayout from "./Layouts/AuthLayout";
import Layout from "./Layouts/Layout";
import Login from "./pages/Auth/Login";
import Home from "./pages/Home";

export const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<Layout />}>
          <Route element={<Home />} path="/"  />
        </Route>

        <Route element={<AuthLayout />}>
          <Route element={<Login />} path="/login" />
        </Route>
        
      </>
    )
);