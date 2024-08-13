import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedTool: null,
};

const toolSlice = createSlice({
  name: 'tool',
  initialState,
  reducers: {
    selectTool: (state, action) => {
      state.selectedTool = action.payload;
    },
  },
});

export const { selectTool } = toolSlice.actions;
export default toolSlice.reducer;