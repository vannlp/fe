import React, { useEffect } from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import { BrowserRouter, RouterProvider } from "react-router-dom";
import { router } from './router';
import { useDispatch, useSelector } from 'react-redux';
import Session from './apis/Session';
import { setPermission, setSession, setToken, setUser } from './features/auth/authSlice';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import Auth from './apis/Auth';

import './App.scss';
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

  const handleCheckToken = async () => {
    try {
      if(token) {
        let res = await Auth.checkToken({token: token});
      }
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(setToken(null));
      dispatch(setUser(null));
      window.location.reload();
    }
  }

  useEffect(() => {
    handleSession();
    handleCheckToken();
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
