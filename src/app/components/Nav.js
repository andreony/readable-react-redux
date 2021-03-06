import React, { useEffect } from 'react'
import logo from '../../logo.svg'
import { NavLink } from 'react-router-dom'
import { setSearchFilter } from '../../features/search/searchSlice'
import { useInput } from '../hooks/useInput'

export default function Navbar() {

	const { searchText, setSearchText, dispatch, bind } = useInput('')

	useEffect( () => {
		// dispatch when searchText is updated
		dispatch(setSearchFilter(searchText))
	}, [dispatch, searchText])

	const handleSubmit = (e) => {
		e.preventDefault()
		setSearchText(searchText)
	}

	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light mb-5">
			<NavLink 
				to='/'
				className="navbar-brand" href="#">
				<img src={logo} height="50px" width="50px" alt="Redux"/>
			</NavLink>
			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>

			<div className="collapse navbar-collapse" id="navbarSupportedContent">
				<ul className="navbar-nav mr-auto">
					<li className="nav-item">
						<NavLink activeClassName='activeNav' className="nav-link" to="/react">React</NavLink>
					</li>
					<li className="nav-item">
						<NavLink activeClassName='activeNav' className="nav-link" to="/redux">Redux</NavLink>
					</li>
					<li className="nav-item">	
						<NavLink activeClassName='activeNav' className="nav-link" to="/udacity">Udacity</NavLink>
					</li>
				</ul>
				<ul className="navbar-nav ml-auto mr-2">
					<li className="nav-item">
						<NavLink activeClassName='activeNav' className="nav-link" to="/new-post">New Post</NavLink>
					</li>
				</ul>
				<form className="form-inline my-2 my-lg-0">
					<input
						className="form-control mr-sm-2"
						placeholder="Search by title"
						type="search"
						{...bind}/>
					<button 
						className="btn btn-outline-success my-2 my-sm-0" 
						type="submit"
						onClick={handleSubmit}>Search</button>
				</form>
			</div>
		</nav>
	)
}