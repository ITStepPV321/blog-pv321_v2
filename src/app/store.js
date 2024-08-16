import { configureStore} from '@reduxjs/toolkit';
import postsReducer from './appSlices/postsSlice';
import usersReducer from './appSlices/usersSlice';
 
export const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer
  },
})