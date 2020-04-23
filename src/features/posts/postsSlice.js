import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit'
import postsAPI from './postsAPI'

export const fetchPosts = createAsyncThunk("posts/fetchAll", async () => {
	const response = await postsAPI.fetchAll();
	return response;
});

export const votePost = createAsyncThunk(
	"posts/vote",
	async (payload, thunkAPI) => {
		//console.log(payload);
		const response = await postsAPI.vote(payload)
		return response
	}
)

/* export const asyncAddPost = createAsyncThunk(
	"posts/asyncAddPost", 
	async (post, thunkAPI) => {
		const response = await postsAPI.addOne(post);
		return post;
});

export const asyncRemPost = createAsyncThunk(
	"posts/asyncRemPost", 
	async (postId, thunkAPI) => {
		const response = await postsAPI.removeOne(postId);
		console.log('response --->>>> ', response)
		return response;
}); */

const postsAdapter = createEntityAdapter()
const initialState = postsAdapter.getInitialState({loading: false})

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers:{
			addPost: postsAdapter.addOne,
			removePost: postsAdapter.removeOne,
			stepUpCommentsCounter(state, action){
				state.entities[action.payload.id].commentCount += 1
			},
			stepDownCommentsCounter(state,action){
				state.entities[action.payload.id].commentCount -= 1
			}
    },
    extraReducers: builder => {
			// -- add many
			builder.addCase(fetchPosts.pending, (state, action) => {
				state.loading = true;
			});
			builder.addCase(fetchPosts.fulfilled, (state, action) => {
				postsAdapter.upsertMany(state, action.payload);
				state.loading = false;
			});
			builder.addCase(votePost.fulfilled, (state, action) => {
				const vote = action.payload.option
				switch(vote){
					case "upVote":
						state.entities[action.payload.id].voteScore += 1
						break
					case "downVote":
						state.entities[action.payload.id].voteScore -= 1
						break
					default:
						return state
				}
			})
			/* // -- add one
			builder.addCase(asyncAddPost.pending, (state, action) => state.loading = true)
			builder.addCase(asyncAddPost.fulfilled, (state, action) => {
				postsAdapter.addOne(action.payload)
				state.loading = false
			})
			// -- remove one
			builder.addCase(asyncRemPost.pending, (state, action) => state.loading = true)
			builder.addCase(asyncRemPost.fulfilled, (state, action) => {
				postsAdapter.removeOne(action.payload)
				state.loading = false
			}) */
		}    
})

const reducer = postsSlice.reducer;
export default reducer;

export const { addPost, removePost, voteUp, voteDown, stepUpCommentsCounter, stepDownCommentsCounter } = postsSlice.actions;

// async action creators
export const removeAsyncPost = (id) => {
	return dispatch => {
		postsAPI.removeOne(id)
			.then( (result) => console.log(result) )
			.then( () => dispatch(removePost(id)))
	}
}


export const {
  selectById: selectPostById,
  selectIds: selectPostIds,
  selectEntities: selectPostEntities,
  selectAll: selectAllPosts,
  selectTotal: selectTotalPosts
} = postsAdapter.getSelectors(state => state.posts);