import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    session_id: localStorage.getItem('session_id') ,
    permissions: null,
    token: localStorage.getItem('token'),
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setSession: (state, action) => {
            localStorage.setItem('session_id', state.session_id)
            state.session_id = action.payload;
        },
        setPermission: (state, action) => {
            state.permissions = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
            if(!state.token) {
                localStorage.removeItem('token')
                return;
            }
            localStorage.setItem('token', state.token)
        },
        setUser: (state, action) => {
            state.user = action.payload;

            if(!state.user) {
                localStorage.removeItem('user')
                return;
            }
            localStorage.setItem('user', JSON.stringify(state.user));
        },
    }
    
});

export const { setSession, setPermission, setToken, setUser } = authSlice.actions;

export default authSlice.reducer;