import React from 'react'
import { useSelector} from 'react-redux'

import Post from './Post';
import { selectAllPosts } from './postsSlice';

function PostsList({posts}) {
    const postsLoading = useSelector(state => state.posts.loading);

    if(postsLoading)
        return <div className="App-logo">Loading...</div> 
    
    return (
        <div className="row">
          {posts.map((post, i) => (
            <div className="col-12 mb-4" key={post.id}>
                <Post id={post.id} index={i} linkToView={true}/>
            </div>
          ))}
        </div>
      );
}

/* const makeMapStateToProps = () => {
    const mapStateToProps = (state, props) => {
      return {
        posts: selectAllPosts(state, props)
      }
     }
    return mapStateToProps
   }
 */
export default PostsList