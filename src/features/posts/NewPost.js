import React, { useState } from 'react'
import { selectAuthedUser } from '../auth/authedUserSlice'
import { useDispatch, useSelector, connect } from 'react-redux'
import { addAsyncPost, editPost } from './postsSlice'

const NewPost = (props) => {
	
	const {id, title, body, oAuthor, category} = props.location.state || {id:'', title:'', body:'', oAuthor:'', category:''}
	
	const dispatch = useDispatch()
	const authedUser = useSelector(selectAuthedUser)
	const author = authedUser 
		? authedUser.name
		: 'anon'
	const [newPost, setNewPost] = useState({author, title, body, id})
	
	const handleSubmit = (e) => {
		e.preventDefault()
		if(!newPost.title || !newPost.body){
			console.log('empty post', newPost)
			return false 
		} 
		body 
			?	dispatch(editPost(newPost))	
			: dispatch(addAsyncPost(newPost))
		props.history.push('/')
	}

	const handleChange = (e) => {
		newPost[e.target.name] = e.target.value
		setNewPost(newPost)
	}

	return (
		<div className="container">
			<form action="" 
				className="form-group w-50 mx-auto"
				onSubmit={handleSubmit}
			>
			<div className="bg-dark text-white mb-0 px-2 rounded mb-2"> 
				{body 
				 	? <div className="d-flex"><em>Edit Post</em><span className="mr-2 ml-auto">by <em>{oAuthor}</em></span></div>
					: <em> Your Post </em>
				}
			</div>
			<input type="text" className="form-control mb-2" name="title" required placeholder="title"
				defaultValue={title ? title : ''}
				onChange={handleChange}/>
			<input type="text" className="form-control mb-2" name="category" required placeholder="category"
				defaultValue={category ? category : ''}
				onChange={handleChange}/>
			<textarea name="body" id="body" className="form-control" cols="20" rows="4" 
				placeholder="What's on your mind...?"
				onChange={handleChange}
				defaultValue={ body ? body : ''}
			></textarea>
			<button className="btn btn-sm btn-outline-info float-right my-2" type="submit">Submit Post</button>
			</form>
		</div>
	)
}

export default NewPost