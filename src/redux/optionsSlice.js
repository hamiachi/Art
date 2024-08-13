import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    showMoreOptions: false,
};

const optionsSlice = createSlice({
    name: 'options',
    initialState,
    reducers: {
        toggleShowMoreOptions: (state) => {
            state.showMoreOptions = !state.showMoreOptions;
        },
        setShowMoreOptions: (state, action) => {
            state.showMoreOptions = action.payload;
        },

        setSelectedModel: (state, action) => { // Thêm reducer cho mô hình được chọn
            state.selectedModel = action.payload;
            console.log("seccccc", state.selectedModel )
        },

        setStepValue: (state, action) =>{
            state.stepValue = action.payload
        },

        setScale: (state, action) => {
            state.setScale = action.payload
        },

        chooseSampler: (state, action) => {
            state.setSampler = action.payload
        }
    },
});

export const { toggleShowMoreOptions, setShowMoreOptions, setSelectedModel, setStepValue, setScale, chooseSampler} = optionsSlice.actions;
export default optionsSlice.reducer;
