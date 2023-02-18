import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.scss';
import { BrowserRouter, RouterProvider } from "react-router-dom";
import { router } from './router';

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
