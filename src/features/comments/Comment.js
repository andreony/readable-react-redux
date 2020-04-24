import React from 'react'
import { useDispatch } from 'react-redux'
import { asyncRemoveComment, voteComment } from './commentsSlice'

export default function Comment({id, parentId, author, body, voteScore }) {
	const dispatch = useDispatch()
	return (
		<div className="card w-75 mx-auto mb-3">
			<div className="card-body">
					<div className="card-tile">
						Added By {author}
						<button 
							onClick={() => dispatch(asyncRemoveComment(id, parentId))}	
							className="btn btn-outline-danger mx-2 float-right">
							<i className="far fa-trash-alt"></i>
						</button>
					</div>
					<div className="card-text">{body}</div>
			</div>
			<div className="card-footer text-left">
				<span>Vote Score: {voteScore}</span>
				<button className="btn"
					onClick={() => dispatch(voteComment({id, option: "upVote"}))}>
					<span title="Thumbs up">
						<i className="far fa-thumbs-up fa-fw mx-2"></i>
					</span>
				</button>
				<button className="btn"
					onClick={() => dispatch(voteComment({id, option: "downVote"}))}>
					<span title="Thumbs down">
						<i className="far fa-thumbs-down fa-fw mx-2"></i>
					</span>
				</button>
			</div>
		</div>
	)
}