import React from 'react'
import { connect } from 'react-redux'
import { votePost, removeAsyncPost } from './postsSlice'
import { Link, Redirect } from 'react-router-dom'


const Post = ({id, title, body, author, category, commentCount, voteScore, dispatch, linkToView, index}) => {
	//console.log(title, body, author, category, commentCount, voteScore)
	return !body 
	? <Redirect to='/' />  
	:(
	<div className="card mb-3">
		<div className="card-body px-0">
			<div className="row">
				<div className="col-sm-1 bg-light-gray text-center">
					<button 
						onClick={() => dispatch(votePost({id, option: "upVote"}))}
						className="btn">
						<i className="fas fa-long-arrow-alt-up fa-2x text-muted"></i>
					</button>
					<div><h5>{voteScore}</h5></div>
					<button 
						onClick={() => dispatch(votePost({id, option: "downVote"}))}
						className="btn">
						<i className="fas fa-long-arrow-alt-down fa-2x text-muted"></i>
					</button>
				</div>
					<div className="col-sm-11 pl-0">
					<div className="card-title d-flex justify-content-between">
						<Link 
							style={ linkToView 
								? {display: 'block'}
								: {
										textDecoration: 'none', 
										color:'black'
									}
							}
							to={ `${category}/${id}`	}
							onClick={ (e) => linkToView ? false : e.preventDefault() }>
							
								<img
									width="48px"
									height="48px" 
									src={`https://source.unsplash.com/user/erondu/${48 + index}x48`}
									alt="..."
									className="rounded-circle mx-2"
								/>
								<b>{title}</b>
								<span className="mx-2">&#8226;</span>
								<span>Posted by <em>{author}</em></span>
							</Link>
							<button 
								className="btn btn-sm btn-outline-danger m-2"
								onClick={() => dispatch(removeAsyncPost(id)) }>
								<span title="Remove Post">
									<i className="far fa-trash-alt"></i>
								</span>
							</button>
						</div>
						<div className="card-text">
							{body}
						</div>
					</div>
			</div>
		</div>
		<div className="card-footer">
			<div className="row">
				<div className="col-sm-12 text-left">
					<i className="far fa-comment-alt fa-fw"></i>
					<span className="px-1">{commentCount}</span>
					<span className="mr-2">Comments</span>
					<Link to={`/${category}/${id}/add-comment`}
						className="py-0">
						<i className="fas fa-plus fa-fw text-info px-1"></i>
						<span>Add Comments</span>
					</Link>
				</div>
			</div>
		</div>
	</div>
)
	}

const mapStateToProps = ({posts}, props) => {
	const {id, index, linkToView} = props
	const post = posts.entities[id]
	return {...post, index, linkToView}
}

export default connect(mapStateToProps)(Post)