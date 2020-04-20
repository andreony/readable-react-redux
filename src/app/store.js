import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import postsReducer from '../features/posts/postsSlice'
import logger from './middleware/logger';

export default configureStore({
  reducer: {
    counter: counterReducer,
    posts: postsReducer
  },
  middleware: [...getDefaultMiddleware(), logger]
});
