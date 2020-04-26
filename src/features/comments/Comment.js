import React from 'react'
import { useDispatch } from 'react-redux'
import { asyncRemoveComment, voteComment } from './commentsSlice'
import { Link } from 'react-router-dom'

export default function Comment({id, parentId, author, body, voteScore }) {
	const dispatch = useDispatch()
	return (
		<div className="card w-75 mx-auto mb-4">
			<div className="card-body py-2">
					<div className="card-tile text-left">
						<small className="text-secondary"> Added By <em>{author}</em> </small>
						<div className="float-right">
							<Link 
								to={{
									pathname: `/comments/${id}/edit-comment`,
									state: {id, oAuthor:author, body}
								}}
								className="btn btn-outline-info btn-sm mx-2">
								<i className="far fa-edit"></i>
							</Link>
							<button 
								onClick={() => dispatch(asyncRemoveComment(id, parentId))}	
								className="btn btn-outline-danger btn-sm mx-2">
								<i className="far fa-trash-alt"></i>
							</button>
						</div>
					</div>
					<div className="card-text py-3">{body}</div>
			</div>
			<div className="card-footer text-left py-1">
				<span>Vote Score: {voteScore}</span>
				<button className="btn btn-sm ml-3"
					onClick={() => dispatch(voteComment({id, option: "upVote"}))}>
					<span title="Thumbs up">
						<i className="far fa-thumbs-up fa-fw"></i>
					</span>
				</button>
				<button className="btn btn-sm"
					onClick={() => dispatch(voteComment({id, option: "downVote"}))}>
					<span title="Thumbs down">
						<i className="far fa-thumbs-down fa-fw"></i>
					</span>
				</button>
			</div>
		</div>
	)
}