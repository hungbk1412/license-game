import currentStoryLevelReducer from './features/playground/choose_level/CurrentStoryLevelSlice';
import currentChallengeReducer from './features/playground/story/CurrentChallangeSlice';
import { combineReducers } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
     current_story_level: currentStoryLevelReducer,
     current_challenge: currentChallengeReducer
});


export default rootReducer