import currentStoryLevelReducer from './features/playground/choose_level/CurrentStoryLevelSlice';
import currentChallengeReducer from './features/playground/story/CurrentChallangeSlice';
import currentPracticesListReducer from './features/playground/story/CurrentPracticesListSlice';
import confirmSubmissionDialogReducer from './features/playground/dialog/confirm_submission_dialog/ConfirmSubmissionDialogSlice';
import { combineReducers } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
     current_story_level: currentStoryLevelReducer,
     current_challenge: currentChallengeReducer,
     current_practices_list: currentPracticesListReducer,
     confirm_submission_dialog: confirmSubmissionDialogReducer
});


export default rootReducer