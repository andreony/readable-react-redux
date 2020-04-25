import React, { useState } from 'react'
import { selectAuthedUser } from '../auth/authedUserSlice'
import { useDispatch, useSelector, connect } from 'react-redux'
import { asyncAddComment } from './commentsSlice'
import { formatComment } from './commentsAPI'

const NewComment = (props) => {
	const { post_id } = props.match.params
	const { dispatch } = props
	const authedUser = useSelector(selectAuthedUser)
	const author = authedUser 
		? authedUser.name
		: 'anon'
	const [commentBody, setCommentBody] = useState('')
	
	const handleSubmit = (e) => {
		e.preventDefault()
		if(!commentBody.trim()){
			return false 
		} 
		dispatch(asyncAddComment(formatComment(commentBody, author, post_id)))
		props.history.goBack()
	}
	const handleChange = (e) => setCommentBody(e.target.value)

	return (
		<div className="container">
				<legend className="text-left border-bottom">Add Comment</legend>
				<form action="" 
					className="form-group w-50 mx-auto"
					onSubmit={handleSubmit}
				>
				<div className="bg-dark text-white mb-0 px-2 rounded"> <em>	New Comment </em></div>
				<textarea name="body" id="body" className="form-control" cols="20" rows="4" 
					placeholder="Write a message..."
					onChange={handleChange}
				></textarea>
				<button className="btn btn-sm btn-outline-info float-right my-2" type="submit">Add Comment</button>
				</form>
			</div>
	)
}

export default connect()(NewComment)