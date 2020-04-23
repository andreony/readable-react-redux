import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userId: '',
    name:'',
    avatarURL:''
}
export const authedUserSlice = createSlice({
    name:'autherdUser',
    initialState: initialState,
    reducers:{
        authenticateUser(state, action){
            const { id, name, avatarURL } = action.payload
            return {userId:id, name, avatarURL}
        },
        logoutUser(state,action){
            return initialState
        }
    }
})

export const selectAuthedUser = state => state.autherdUser

export const { authenticateUser,  logoutUser} = authedUserSlice.actions
export default authedUserSlice.reducer
