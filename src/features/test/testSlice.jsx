import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: "test redux"
};

export const testSlice = createSlice({
    name: 'test',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
      changeValue: (state, action) =>{
        state.value = action.payload;
      }
    },
    
});

export const { changeValue } = testSlice.actions;

export default testSlice.reducer;