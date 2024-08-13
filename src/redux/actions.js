// src/redux/actions.js
export const SET_SHOW_MORE_OPTIONS = 'SET_SHOW_MORE_OPTIONS';

export const setShowMoreOptions = (show) => ({
    type: SET_SHOW_MORE_OPTIONS,
    payload: show
});
