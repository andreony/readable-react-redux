import React, { useState } from 'react'
import { selectAuthedUser } from '../auth/authedUserSlice'
import { useSelector, useDispatch } from 'react-redux'
import { asyncAddComment, editComment } from './commentsSlice'
import { formatComment } from './commentsAPI'

const NewComment = (props) => {
	const dispatch = useDispatch()
	const { id, body, oAuthor } = props.location.state || {body:'', id:'', oAuthor:''}

	const { post_id } = props.match.params
	const authedUser = useSelector(selectAuthedUser)
	const author = authedUser 
		? authedUser.name
		: 'anon'
	const [commentBody, setCommentBody] = useState(body || '')
	
	const handleSubmit = (e) => {
		e.preventDefault()
		if(!commentBody.trim()){
			return false 
		} 
		body 
			? dispatch(editComment(formatComment(commentBody, author, post_id, id)))
			: dispatch(asyncAddComment(formatComment(commentBody, oAuthor, post_id)))
		props.history.goBack()
	}
	const handleChange = (e) => setCommentBody(e.target.value)

	return (
		<div className="container">
				<legend className="text-left border-bottom">Comment</legend>
				<form action="" 
					className="form-group w-50 mx-auto"
					onSubmit={handleSubmit}
				>
				<div className="bg-dark text-white mb-0 px-2 rounded"> 
					{ body 
						? <div className="d-flex"> <em>Edit Comment</em> <span className="mr-2 ml-auto">by <em>{oAuthor}</em></span></div>
						: <em> New Commemnt </em>	
					}
				</div>
				<textarea name="body" id="body" className="form-control" cols="20" rows="4" 
					placeholder="Write a message..."
					onChange={handleChange}
					defaultValue={body || ''}
				></textarea>
				<button className="btn btn-sm btn-outline-info float-right my-2" type="submit">
					{ body 
						? <span>Edit Comment</span>
						: <span>Add Comment</span>
					}
				</button>
				</form>
			</div>
	)
}

export default NewComment