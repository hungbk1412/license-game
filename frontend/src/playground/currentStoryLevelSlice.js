import {createSlice} from '@reduxjs/toolkit';

const initialState = -1;

const currentStoryLevelSlice = createSlice({
    name: 'current_story_level',
    initialState,
    reducers: {
        set_level: (state, action) => (action.payload)
    }
});

const { actions, reducer } = currentStoryLevelSlice;
export const {set_level} = actions;

export default reducer