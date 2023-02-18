import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Layout from "./Layouts/Layout";
import Home from "./pages/Home";

export const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<Layout />}>
            <Route element={<Home />} path="/" />
        </Route>
      </>
    )
);