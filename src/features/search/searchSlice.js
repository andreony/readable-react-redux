import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: 'searchFilter',
    initialState: '',
    reducers:{
        setSearchFilter(state, action){
            return action.payload
                ? action.payload
                : ''
        }
    }
})

export const { setSearchFilter } = searchSlice.actions
export default searchSlice.reducer