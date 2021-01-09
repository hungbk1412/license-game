import {createSlice} from '@reduxjs/toolkit';

const initial_state = [];
const CurrentPracticesListSlice = createSlice({
    name: 'current_practices_list',
    initialState: initial_state,
    reducers: {
        set_practices_list: (current_practices_list, action) => (action.payload),
        finish_a_practice: (current_practices_list, action) => {
            let finishedPracticeIndex = current_practices_list.findIndex(practice => practice.id === action.payload);
            current_practices_list[finishedPracticeIndex]['finished'] = true;
        }
    }
});

const { actions, reducer } = CurrentPracticesListSlice;
export const {set_practices_list, finish_a_practice} = actions;

export default reducer