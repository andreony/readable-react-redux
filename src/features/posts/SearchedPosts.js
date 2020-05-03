import { selectAllPosts } from "./postsSlice";
import { createSelector } from "@reduxjs/toolkit";

const selectSearchText = state => state.searchBy;

const selectSearchedPosts = createSelector(
    [selectAllPosts, selectSearchText],
    (posts, searchText) => {
        if(searchText === '' || typeof searchText === 'undefined')
            return posts
        return posts.filter( post => post.title.toLowerCase().includes(searchText.toLowerCase()))
    }
)

export default selectSearchedPosts