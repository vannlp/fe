import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import AuthLayout from "./Layouts/AuthLayout";
import Layout from "./Layouts/Layout";
import Login from "./pages/Auth/Login";
import Home from "./pages/Home";
import Role from "./pages/Role/Role";
import PermissionPage from "./pages/Role/PermissionPage";


export const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<Layout />} path="/">
          <Route element={<Home />} index />
          <Route path="/phan-quyen">
            <Route path="role" element={<Role />} />
            <Route path="permission" element={<PermissionPage />} />
          </Route>
        </Route>

        <Route element={<AuthLayout />}>
          <Route element={<Login />} path="/login" />
        </Route>
        
      </>
    )
);