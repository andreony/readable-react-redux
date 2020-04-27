import React, { useEffect } from 'react'
import { connect, useSelector } from "react-redux"
import { fetchComments, selectAllComments } from '../comments/commentsSlice'
import Post from './Post'
import Comment from '../comments/Comment'
import { selectPostIds } from './postsSlice'
import { Redirect } from 'react-router-dom'

const PostView = ({dispatch, post_id, loading}) => {

	const comments = useSelector(selectAllComments)
	const postsIds = useSelector(selectPostIds)
	
	useEffect( () => {
		dispatch(fetchComments(post_id))
	},[dispatch, comments.length, post_id])

	if(postsIds.length === 0)
		return <div className="App-logo">Loading...</div>

  return !postsIds.includes(post_id) 
		? <Redirect to='/not-found' />  
		:  (
		<div className="container">
			<div className="row py-3">
				<div className="col-sm-10 offset-1 mb-3">
					<Post id={post_id}/>
					{	loading 
						? <div className="text-center App-logo">Loading...</div>
						: comments
							.filter( comment => comment.parentId === post_id)
							.sort( (a,b) => b.timestamp - a.timestamp)
							.map( (comment) => (
								<Comment key={comment.id} {...comment}/>
							))}
				</div>
			</div>
		</div>
		)
}

const mapStateToProps = (state, props) => {
	const { post_id } = props.match.params
	return {
		post_id,
		loading: state.comments.loading
	}
}


export default connect(mapStateToProps)(PostView)