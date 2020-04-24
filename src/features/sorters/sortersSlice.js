
import { createSlice } from "@reduxjs/toolkit";

export const sortFilters = {
	DATE_ASC: 'TIMESTAMP_ASC',
	DATE_DESC: 'TIMESTAMP_DESC',
	TITLE_ASC: 'TITLE_ASC',
	TITLE_DESC: 'TITLE_DESC',
	SCORE_ASC: 'VOTESCORE_ASC',
	SCORE_DESC: 'VOTESCORE_DESC'
}

const sorterSlice = createSlice({
	name: 'sortFilter',
	initialState: sortFilters.DATE_ASC,
	reducers:{
		setSortFilters(state, action) {
            console.log(action)
			return action.payload
		}
	}
})

export const { setSortFilters } = sorterSlice.actions

export default sorterSlice.reducer
