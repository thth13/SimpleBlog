import React from 'react';

import avatar from '../../img/avatar.png';
import styles from './Comments.module.css';

function Comment({ comment }) {
  return (
    <div className={styles.comment}>
      <img src={avatar} alt="Avatar" />
      <div className={styles.commentContent}>
        <h4>{comment.author}</h4>
        <p>{comment.content}</p>
        <span>Reply</span>
      </div>
    </div>
  );
}

export default Comment;
