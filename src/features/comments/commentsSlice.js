import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { commentsAPI } from './commentsAPI'
import { stepUpCommentsCounter } from '../posts/postsSlice'

export const fetchComments = createAsyncThunk('comments/fetchAll', 
    async (postId, thunkAPI) => {
        const result = await commentsAPI.fetchAll(postId)
        return result
})



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
        }
    }
})

export const { addComment, removeComment } = commentsSlice.actions
export default commentsSlice.reducer


// async action creators 
export const asyncAddComment = (comment) => {
    return dispatch => {
        commentsAPI.addOne(comment)
            .then( () => dispatch(addComment(comment)))
            .then( () => dispatch(stepUpCommentsCounter({id:comment.parentId})) )
    }
}