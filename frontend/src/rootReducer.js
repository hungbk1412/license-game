import currentChallengeReducer from './pages/playground/story/CurrentChallangeSlice';
import currentPracticesListReducer from './pages/playground/story/CurrentPracticesListSlice';
import confirmSubmissionDialogReducer from './pages/playground/dialog/confirm_submission_dialog/ConfirmSubmissionDialogSlice';
import chooseLicenseDialogReducer from './pages/playground/dialog/choose_license_dialog/ChooseLicenseDialogSlice';
import gameProgressReducer from './pages/playground/story/GameProgressSlice';
import scoreReducer from './ScoreSlice';
import elapsedTimeReducer from './pages/navbar/TimerSlice';
import highScoreReducer from './pages/high_score/HighScoreBoardSlice';
import { combineReducers } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
     current_challenge: currentChallengeReducer,
     current_practices_list: currentPracticesListReducer,
     confirm_submission_dialog: confirmSubmissionDialogReducer,
     choose_license_dialog: chooseLicenseDialogReducer,
     game_progress: gameProgressReducer,
     score: scoreReducer,
     elapsed_time: elapsedTimeReducer,
     high_score_board: highScoreReducer
});


export default rootReducer