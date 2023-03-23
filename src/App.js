import React, { useEffect } from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.scss';
import { BrowserRouter, RouterProvider } from "react-router-dom";
import { router } from './router';
import { useDispatch, useSelector } from 'react-redux';
import Session from './apis/Session';
import { setPermission, setSession } from './features/auth/authSlice';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Auth from './apis/Auth';

function App() {
  const session_id = useSelector(state => state.auth.session_id);
  const token = useSelector(state => state.auth.token);
  const permissions = useSelector(state => state.auth.permissions);
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

  const handleGetPermission = async () => {
    try {
      if(token) {
        if(!permissions){
          let res = await Auth.permission({token: token});
          let dataRes = res.data.data;
          dispatch(setPermission(dataRes));
        }
      }
    } catch (error) {
      
    }
  }

  useEffect(() => {
    handleSession();
  }, [])

  useEffect(() => {
    handleGetPermission();
  }, [permissions])

  return (
    <>
      <RouterProvider router={router} />
      
      <ToastContainer />
    </>
  );
}

export default App;
