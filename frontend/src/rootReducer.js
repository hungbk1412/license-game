import currentStoryLevelReducer from './playground/currentStoryLevelSlice';
import { combineReducers } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
     current_story_level: currentStoryLevelReducer
});


export default rootReducer