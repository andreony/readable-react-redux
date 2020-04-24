import { createSelector } from "@reduxjs/toolkit";
import { selectAllPosts, makeGetAllPosts } from "./postsSlice";
import { sortFilters } from "../sorters/sortersSlice";
import { connect } from "react-redux";
import PostsList from "./PostsList";

const selectSortBy = state => state.sortBy

const selectSortedPosts = createSelector(
	[selectAllPosts, selectSortBy],
	(posts, sortBy) => {
		switch(sortBy){
			// note to always return a copy of the memoized json using .slice()
			case sortFilters.DATE_ASC:
				return posts.slice().sort( (a, b) => a.timestamp - b.timestamp )
			case sortFilters.DATE_DESC:
				return posts.slice().sort( (a, b) => b.timestamp - a.timestamp )
			case sortFilters.SCORE_ASC:
				return posts.slice().sort( (a,b) => a.voteScore - b.voteScore )
			case sortFilters.SCORE_DESC:
				return posts.slice().sort( (a,b) => b.voteScore - a.voteScore )
			case sortFilters.TITLE_ASC:
				return posts.slice().sort( (a,b) => a.title.localeCompare(b.title) )
			case sortFilters.TITLE_DESC:
				return posts.slice().sort( (a,b) => b.title.localeCompare(a.title) )
			default:
				throw new Error('Unknown sort by filter: ' + sortBy)
		}
	}

)

const mapStateToProps = (state) => ({
    posts: selectSortedPosts(state)
})

export default connect(mapStateToProps)(PostsList)