import currentStoryLevelReducer from './features/playground/choose_level/CurrentStoryLevelSlice';
import { combineReducers } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
     current_story_level: currentStoryLevelReducer
});


export default rootReducer