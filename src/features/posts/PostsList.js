import React from 'react'
import { useSelector} from 'react-redux'

import Post from './Post';

function PostsList({posts, postIds}) {
  const postsLoading = useSelector(state => state.posts.loading);
  
  if(postsLoading)
      return <div className="App-logo">Loading...</div> 

  return (
      <div className="row">
        {posts.map((post, i) => {
          return <div className="col-12 mb-4" key={post.id}>
              <Post id={post.id} index={postIds.indexOf(post.id)} linkToView={true}  />
          </div>
        })}
      </div>
    );
}

export default PostsList