import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    session_id: localStorage.getItem('session_id') ,
    permissions: [],
    token: null,
    user: null,
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
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
    }
    
});

export const { setSession } = authSlice.actions;

export default authSlice.reducer;