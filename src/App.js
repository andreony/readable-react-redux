import React, { useEffect } from 'react';
/* import logo from './logo.svg'; */
import "./App.css";
import '@fortawesome/fontawesome-free/css/all.css'
import PostsList from './features/posts/PostsList'
import PostView from './features/posts/PostView'
import 'bootstrap/dist/css/bootstrap.min.css' 
import Navbar from './app/components/Nav';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Dashboard from './app/components/Dashboard';
import { useDispatch } from 'react-redux';
import { authenticateUser } from './features/auth/authedUserSlice';
import { anonymousUser } from './features/auth/anonymousUser';
import { fetchPosts } from './features/posts/postsSlice';
import NewComment from './features/comments/NewComment';

function App() {
  const dispatch = useDispatch()
  
  useEffect( () => {
    dispatch(authenticateUser(anonymousUser))
    dispatch(fetchPosts())
  }, [dispatch]);

  return (
    <Router>
      <Navbar />
      <div className="container-fluid">
        <Switch>
          <Route path="/" exact component={Dashboard}/>
          <Route path="/:category" exact component={PostsList}/>
          <Route path="/:category/:post_id" exact component={PostView}/>
          <Route path="/:category/:post_id/add-comment" exact component={NewComment}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
