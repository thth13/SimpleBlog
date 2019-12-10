import React from 'react';

import Comment from './Comment';
import AddCommentForm from './AddCommentForm';

import fb from '../../img/fb.png';
import tw from '../../img/tw.png';

import styles from './Comments.module.css';

function Comments({ comments, postId }) {
  return (
    <section className={styles.commentsList}>
      <span className={styles.commentsCount}>{comments.length} comments</span>
			{comments.map(item => (
				<Comment key={item._id} comment={item} />
			))}
      <AddCommentForm postId={postId} />
      <ul className={styles.connectButtons}>
        <span>Connected with</span>
        <li>
          <img src={fb} alt="fb" />
        </li>
        <li>
          <img src={tw} alt="tw" />
        </li>
      </ul>
    </section>
  );
}

export default Comments;
