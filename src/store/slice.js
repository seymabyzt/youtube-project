
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  query: '', 
};

const slice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.query = action.payload;
    }
  }
  
});

export const { setSearchQuery } = slice.actions;
export default slice.reducer;