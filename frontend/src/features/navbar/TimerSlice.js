import {createSlice} from '@reduxjs/toolkit';

const initial_state = 0;
const TimerSlice = createSlice({
    name: 'game_progress',
    initialState: initial_state,
    reducers: {
        increase_time: (state, action) => (state + 1),
        reset_time: (state, action) => (0)
    }
});

const {actions, reducer} = TimerSlice;
export const {increase_time, reset_time} = actions;
export default reducer