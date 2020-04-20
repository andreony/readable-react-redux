import React from 'react'
import styles from "./PostsList.module.css";
import { useSelector, useDispatch } from 'react-redux'
import { selectTotalPosts, selectAllPosts, fetchPosts, removePost } from './postsSlice'

export default function PostsList() {
    const count = useSelector(selectTotalPosts);
    const posts = useSelector(selectAllPosts);
    const postsLoading = useSelector(state => state.posts.loading);
    const dispatch = useDispatch()
   
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
            <div className={styles.row} key={post.id}>
              <div style={{ width: "80%" }}>{`${post.author} ${
                post.body
              }`}</div>
              <div style={{ width: "20%" }}>
                <button onClick={() => dispatch(removePost(post.id))}>
                  remove
                </button>
              </div>
            </div>
          ))}
        </div>
      );
}