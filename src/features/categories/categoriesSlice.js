import { createSlice, createEntityAdapter, createAsyncThunk } from "@reduxjs/toolkit";
import { categoriesAPI } from "./categoriesAPI";

const categoriesAdapter = createEntityAdapter({
    loading: false,
    selectId: category => category.name
})
const initialState = categoriesAdapter.getInitialState()


export const fetchCategories = createAsyncThunk(
    'categories/fetchAll',
    async  () => {
        const result = await categoriesAPI.fetchAll()
        /* Note: Must return an array here to allow slectId implementation  */
        return result.categories
    }
)

const categoriesSlice = createSlice({
    name: 'categories',
    initialState: initialState,
    reducers:{
        // for later user
        addCategory: categoriesAdapter.addOne,
        removeCategory: categoriesAdapter.removeOne
    },
    extraReducers: builder => {
        builder.addCase(fetchCategories.pending,  (state, action) => {
            state.loading = true
        });
        builder.addCase(fetchCategories.fulfilled,  (state, action) => {
            categoriesAdapter.upsertMany(state, action.payload)
            state.loading = false
        });        
    }
})

export default categoriesSlice.reducer
export const {addCategory, removeCategory} = categoriesSlice.actions
export const {
    selectAll: selectAllCategories
} = categoriesAdapter.getSelectors(state => state.categories)