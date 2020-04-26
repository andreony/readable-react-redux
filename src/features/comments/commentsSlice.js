import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { commentsAPI } from './commentsAPI'
import { stepUpCommentsCounter, stepDownCommentsCounter } from '../posts/postsSlice'

export const fetchComments = createAsyncThunk('comments/fetchAll', 
    async (postId, thunkAPI) => {
        const result = await commentsAPI.fetchAll(postId)
        return result
})

export const voteComment = createAsyncThunk(
	"comments/vote",
	async (payload, thunkAPI) => {
		//console.log(payload);
		const response = await commentsAPI.vote(payload)
		return response
	}
)
export const editComment = createAsyncThunk(
	"comments/edit",
	async (payload, thunkAPI) => {
		const { id, timestamp, body } = payload
		const result = await commentsAPI.edit({ id, timestamp, body })
		console.log(result)
		return result
	}
)

const commentsAddapter = createEntityAdapter();
const initialState = commentsAddapter.getInitialState()

const commentsSlice = createSlice({
	name: 'comments',
	initialState,
	reducers:{
			addComment: commentsAddapter.addOne,
			removeComment: commentsAddapter.removeOne
	},
	extraReducers:{
		[fetchComments.pending]: (state, action) => {
			state.loading = true
		},
		[fetchComments.fulfilled]: (state, action) => {
			commentsAddapter.upsertMany(state, action.payload)
			state.loading = false
		},
		[voteComment.fulfilled]: (state, action) => {
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
		},
		[editComment.fulfilled]: (state, action) => {
			//commentsAddapter.updateOne(state, action.payload)
			state.entities[action.payload.id].body = action.payload.body
			state.entities[action.payload.id].timestamp = action.payload.timestamp
		}
	}
})

export const { addComment, removeComment } = commentsSlice.actions
export default commentsSlice.reducer

export const {
	selectById: selectCommentById,
	selectIds: selectCommentIds,
	selectEntities: selectCommentEntities,
	selectAll: selectAllComments,
	selectTotal: selectTotalComments
} = commentsAddapter.getSelectors(state => state.comments);

// async action creators 
export const asyncAddComment = (comment) => {
	console.log('comment from async action creator: ', comment)
	return dispatch => {
		commentsAPI.addOne(comment)
			.then( () => dispatch(addComment(comment)))
			.then( () => dispatch(stepUpCommentsCounter({id:comment.parentId})) )
	}
}

export const asyncRemoveComment = (id, parentId) => {
	return dispatch => {
		commentsAPI.removeOne(id, parentId)
			.then( () => dispatch(removeComment(id)))
			.then( () => dispatch(stepDownCommentsCounter({id:parentId})) )
	}
}
