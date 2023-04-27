import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loadingGlobal: false,
};

export const interfaceSlice = createSlice({
    name: 'interface',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setLoading: (state, action) => {
            let is_loading = action.payload;
            state.loadingGlobal = is_loading
        }
    }
    
});

export const { setLoading } = interfaceSlice.actions;

export default interfaceSlice.reducer;