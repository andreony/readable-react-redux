import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import postsReducer from '../features/posts/postsSlice'
import logger from './middleware/logger';
import commentsReducer from '../features/comments/commentsSlice'
import authedUserReducer from '../features/auth/authedUserSlice'
import filterSortReducer from '../features/sorters/sortersSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    posts: postsReducer,
    comments: commentsReducer,
    authedUser: authedUserReducer,
    sortBy: filterSortReducer,
  },
  middleware: [...getDefaultMiddleware(), logger]
});
