// src/redux/reducer.js
import { SET_SHOW_MORE_OPTIONS } from './actions';

const initialState = {
    showMoreOptions: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SHOW_MORE_OPTIONS:
            return {
                ...state,
                showMoreOptions: action.payload
            };
        default:
            return state;
    }
};

export default reducer;
