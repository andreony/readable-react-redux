import React from 'react'
import { ReactComponent as Logo } from "../../logo.svg"
import PostsList from '../../features/posts/PostsList';
import SortedPosts from '../../features/posts/SortedPosts';
import { useDispatch, connect } from 'react-redux';
import { setSortFilters } from '../../features/sorters/sortersSlice';
import Clock from './Clock'

const Dashboard = ({dispatch}) => (
	<div className="container">
		<div className="row">
			<div className="col-sm-12">
				<nav className="navbar navbar-expand-lg navbar-light bg-light rounded-pill mb-3">
					<span className="navbar-brand badge badge-info text-white">
						Posts
					</span>
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarNav">
						<ul className="navbar-nav">
							<li className="nav-item pr-0 mr-0">
								<a className="nav-link" href="#">Sort By: </a>
							</li>
							<li className="nav-item">
								<select name="sortBy" id="sortBy" className="form-control"
									onChange={ (e) => dispatch(setSortFilters(e.target.value)) }>
									<option value="TIMESTAMP_ASC"> &uarr; Date	</option>
									<option value="TIMESTAMP_DESC">	&darr; Date </option>
									<option value="TITLE_ASC"> &uarr; Title</option>
									<option value="TITLE_DESC"> &darr; Title</option>
									<option value="VOTESCORE_ASC">&uarr; Votes</option>
									<option value="VOTESCORE_DESC">&darr; Votes</option>
								</select>
							</li>
						</ul>
						<div className="navbar-text ml-auto mr-2">
							<Clock />
						</div>
					</div>
				</nav>
			</div>
		</div>
		<SortedPosts />
	</div>
)

export default connect()(Dashboard)