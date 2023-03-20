import React, { useEffect } from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.scss';
import { BrowserRouter, RouterProvider } from "react-router-dom";
import { router } from './router';
import { useDispatch, useSelector } from 'react-redux';
import Session from './apis/Session';
import { setSession } from './features/auth/authSlice';

function App() {
  const session_id = useSelector(state => state.auth.session_id);
  const dispatch = useDispatch();
  const handleSession = async () => {
    try {
      if(!session_id) {
        let res = await Session.getSessionId();
        let data = res.data.data;
        dispatch(setSession(data.session_id));
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleSession();
  }, [])

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
