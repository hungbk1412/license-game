import {createSlice} from '@reduxjs/toolkit';

const initial_state = '';
const CurrentGameModeSlice = createSlice({
    name: 'practice_or_story',
    initialState: initial_state,
    reducers: {
        set_current_game_mode: (state, action) => {
            return action.payload;
        }
    }
});

const {actions, reducer} = CurrentGameModeSlice;
export const {set_current_game_mode} = actions;
export {actions};
export default reducer