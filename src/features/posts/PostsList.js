import React from 'react'
import styles from "./PostsList.module.css";
import { useSelector, useDispatch } from 'react-redux'
import { 
    selectTotalPosts, 
    selectAllPosts, 
    fetchPosts, 
} from './postsSlice'
import { fetchComments } from '../comments/commentsSlice';
import Post from './Post';

export default function PostsList() {
    const count = useSelector(selectTotalPosts);
    const posts = useSelector(selectAllPosts);
    const postsLoading = useSelector(state => state.posts.loading);
    const dispatch = useDispatch()
    
    console.log(posts)

    return (
        <div>
          <div className={styles.row}>
            <button
              className={styles.button}
              aria-label="Fetch Posts"
              onClick={() => dispatch(fetchPosts())}
              disabled={postsLoading}
            >
              Fetch Posts
            </button>
          </div>
          <div className={styles.row}>
            There are <span className={styles.value}>{count}</span> posts.{" "}
            {count === 0 && `Why don't you fetch some more?`}
          </div>
          {posts.map(post => (
            <Post id={post.id} key={post.id} />
          ))}
        </div>
      );
}