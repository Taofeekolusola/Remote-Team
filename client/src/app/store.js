import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import teamReducer from '../features/team/teamSlice';
// import projectReducer from '../features/project/projectSlice';
// import boardReducer from '../features/board/boardSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    team: teamReducer,
    // project: projectReducer,
    // board: boardReducer,
  },
});