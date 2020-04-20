import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit'
import postsAPI from './postsAPI'

export const fetchPosts = createAsyncThunk("posts/fetchAll", async () => {
	const response = await postsAPI.fetchAll();
	return response;
});

const postsAdapter = createEntityAdapter()
const initialState = postsAdapter.getInitialState({loading: false})

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers:{
			addPost: postsAdapter.addOne,
			removePost: postsAdapter.removeOne,
    },
    extraReducers: builder => {
			builder.addCase(fetchPosts.pending, (state, action) => {
				state.loading = true;
			});
			builder.addCase(fetchPosts.fulfilled, (state, action) => {
				postsAdapter.upsertMany(state, action.payload);
				state.loading = false;
			});
		}    
})

const reducer = postsSlice.reducer;
export default reducer;

export const { addPost, removePost } = postsSlice.actions;

export const {
  selectById: selectPostById,
  selectIds: selectPostIds,
  selectEntities: selectPostEntities,
  selectAll: selectAllPosts,
  selectTotal: selectTotalPosts
} = postsAdapter.getSelectors(state => state.posts);