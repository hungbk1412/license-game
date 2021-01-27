import {createSlice} from '@reduxjs/toolkit';

const initial_state = '';
const PracticeOrStorySlice = createSlice({
    name: 'practice_or_story',
    initialState: initial_state,
    reducers: {
        set_practice_or_story: (state, action) => {
            return action.payload;
        }
    }
});

const {actions, reducer} = PracticeOrStorySlice;
export const {set_practice_or_story} = actions;
export {actions};
export default reducer