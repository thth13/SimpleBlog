import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import styles from './Post.module.css';
import image from '../../../img/postimg.png';
import NewsLetter from './NewsLetter';

function Post({ post, index }) {
  // showPost = (content) => {
  //   if (content > 190) {
  //     return ()
  //   }
  // }

  return (
    <Fragment key={post._id}>
      <div className={styles.post}>
        {post.image && (
          <img className={styles.image} src={`http://localhost:4000/${post.image}`} alt="Post mainimage" />
        )}
        <span className={styles.category}>{post.category}</span>
        <h2 className={styles.name}>
          <Link to={`/post/${post._id}`}>{post.title}</Link>
        </h2>
        <p className={styles.content}>
          {post.content.length > 190 ? (
            <Fragment>
              {post.content.slice(0, 190)}...
              <Link to={`/post/${post._id}`} className={styles.more}>read more</Link>
            </Fragment>
          ) : post.content}      
        </p>
      </div>
      {index === 3 && <NewsLetter />}
    </Fragment>
  );
}

export default Post;
