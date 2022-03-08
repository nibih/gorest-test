import { createSlice } from "@reduxjs/toolkit";

export const sortSlice = createSlice({
  name: "sort",
  initialState: {
    sortBy: "name",
  },
  reducers: {
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSortBy } = sortSlice.actions;

export default sortSlice.reducer;
