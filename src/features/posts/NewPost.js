import React, { useState } from 'react'
import { selectAuthedUser } from '../auth/authedUserSlice'
import { useDispatch, useSelector, connect } from 'react-redux'
import { addAsyncPost } from './postsSlice'

const NewPost = (props) => {
	const dispatch = useDispatch()
	const authedUser = useSelector(selectAuthedUser)
	const author = authedUser 
		? authedUser.name
		: 'anon'
	const [newPost, setNewPost] = useState({author})
	
	const handleSubmit = (e) => {
		e.preventDefault()
		if(!newPost.title || !newPost.body){
			console.log(newPost)
			return false 
		} 
		console.log('new post before dispatch ',newPost)
		dispatch(addAsyncPost(newPost))
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
			<div className="bg-dark text-white mb-0 px-2 rounded mb-2"> <em>	Your Post </em></div>
			<input type="text" className="form-control mb-2" name="title" required placeholder="title"
				onChange={handleChange}/>
			<input type="text" className="form-control mb-2" name="category" required placeholder="category"
				onChange={handleChange}/>
			<textarea name="body" id="body" className="form-control" cols="20" rows="4" 
				placeholder="What's on your mind...?"
				onChange={handleChange}
			></textarea>
			<button className="btn btn-sm btn-outline-info float-right my-2" type="submit">Submit Post</button>
			</form>
		</div>
	)
}

export default NewPost