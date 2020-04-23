import React, { useEffect } from 'react';
/* import logo from './logo.svg'; */
import "./App.css";
import PostsList from './features/posts/PostsList'
import 'bootstrap/dist/css/bootstrap.min.css' 
import Navbar from './app/components/Nav';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Dashboard from './app/components/Dashboard';
import { useDispatch } from 'react-redux';
import { authenticateUser } from './features/auth/authedUserSlice';
import { anonymousUser } from './features/auth/anonymousUser';
import { fetchPosts } from './features/posts/postsSlice';
import '@fortawesome/fontawesome-free/css/all.css'

function App() {
  const dispatch = useDispatch()
  
  useEffect( () => {
    dispatch(authenticateUser(anonymousUser))
    dispatch(fetchPosts())
  }, [dispatch]);

  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route path="/" exact component={Dashboard}/>
          <Route path="/:category" exact component={PostsList}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
