import React, { useEffect } from 'react';
import "./App.css";
import '@fortawesome/fontawesome-free/css/all.css'
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
import NewPost from './features/posts/NewPost';
import { fetchCategories } from './features/categories/categoriesSlice';
import NotFound from './app/NotFound';

function App() {
  const dispatch = useDispatch()
  
  useEffect( () => {
    dispatch(authenticateUser(anonymousUser))
    dispatch(fetchPosts())
    dispatch(fetchCategories())
  }, [dispatch]);

  return (
    <Router>
      <Navbar />
      <div className="container-fluid">
        <Switch>
          <Route path="/" exact component={Dashboard}/>
          <Route path="/not-found" exact component={NotFound}/>
          <Route path="/new-post" exact component={NewPost} />
          <Route path="/posts/:id/edit-post" exact component={NewPost} />
          <Route path="/:category" exact component={Dashboard}/>
          <Route path="/:category/:post_id" exact component={PostView}/>
          <Route path="/:category/:post_id/add-comment" exact component={NewComment}/>
          <Route path="/comments/:id/edit-comment" exact component={NewComment}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
