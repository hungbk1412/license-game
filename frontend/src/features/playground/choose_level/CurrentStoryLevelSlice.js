import {createSlice} from '@reduxjs/toolkit';

const initialState = -1;

const CurrentStoryLevelSlice = createSlice({
    name: 'current_story_level',
    initialState,
    reducers: {
        set_level: (state, action) => (action.payload)
    }
});

const { actions, reducer } = CurrentStoryLevelSlice;
export const {set_level} = actions;

export default reducer