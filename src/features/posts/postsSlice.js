import { createSlice, createEntityAdapter, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import postsAPI from './postsAPI'

export const fetchPosts = createAsyncThunk("posts/fetchAll", async () => {
	const response = await postsAPI.fetchAll();
	return response;
});

export const votePost = createAsyncThunk(
	"posts/vote",
	async (payload, thunkAPI) => {
		const response = await postsAPI.vote(payload)
		return response
	}
)

export const editPost = createAsyncThunk(
	"posts/edit",
	async (payload, thunkAPI) => {
		const response = await postsAPI.edit(payload)
		return response
	}
)

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
		});
		builder.addCase(editPost.fulfilled, (state,action) => {
			const { id, ...changes } = action.payload
			postsAdapter.updateOne(state, {id, changes}) 
		});
	}    
})

const reducer = postsSlice.reducer;
export default reducer;

export const { addPost, removePost, voteUp, voteDown, stepUpCommentsCounter, stepDownCommentsCounter } = postsSlice.actions;

// async action creators
export const removeAsyncPost = (id) => {
	return dispatch => {
		postsAPI.removeOne(id)
			.then( () => dispatch(removePost(id)))
	}
}

export const addAsyncPost = (post) => {
	return dispatch => {
		postsAPI.addOne({...post})
			.then( (newPost) => dispatch(addPost(newPost)))
	}
}



export const {
  selectById: selectPostById,
  selectIds: selectPostIds,
  selectEntities: selectPostEntities,
  selectAll: selectAllPosts,
  selectTotal: selectTotalPosts
} = postsAdapter.getSelectors(state => state.posts);

export const makeGetAllPosts = () => createSelector(
	[selectAllPosts],
	(posts) => posts
)