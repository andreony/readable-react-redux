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
			commentsAddapter.setAll(state, action.payload)
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
