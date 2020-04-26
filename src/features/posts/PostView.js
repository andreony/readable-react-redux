import React, { useEffect } from 'react'
import { connect, useSelector } from "react-redux"
import { fetchComments, selectAllComments } from '../comments/commentsSlice'
import Post from './Post'
import Comment from '../comments/Comment'

const PostView = ({dispatch, post_id, loading}) => {

	const comments = useSelector(selectAllComments)

	useEffect( () => {
		// conditional dispatch due to limitted backend not updating in place 
		if(!comments.length) 
			dispatch(fetchComments(post_id))
	},[dispatch])

	return (
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