import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

import { loadOnePost, clearPost } from '../../actions/postActions';

import Featured from '../featured/Featured';
import Comments from '../comments/Comments';
import SocialButtons from './SocialButtons';
import styles from './Post.module.css';
// import mainimg from '../../img/mainimg.png';
// import posti from '../../img/posti.png';

function PostContent({ id, post, comments, clearPost, loadOnePost }) {
  useEffect(() => {
    loadOnePost(id);
    window.scrollTo(0, 0);

    return () => {
      clearPost();
    };
  }, []);

  return (
    <Fragment>
      <section className={styles.body}>
     
        <div className={styles.content}>
          <span className={styles.category}>{post.category}</span>
          <h2 className={styles.name}>{post.title}</h2>   
          {post.image && (
            <img className={styles.image} src={`http://localhost:4000/${post.image}`} alt="Post image" />
          )}
          <p className={styles.content}>{post.content}</p>
          {/* <img className="post-image" src={posti} alt="Postimg" /> */}
          <SocialButtons />
        </div>
      </section>
      <Featured />
      <Comments comments={comments} postId={post._id} />
    </Fragment>
  );
}

const mapStateToProps = state => ({
  post: state.post.singlePost.post,
  comments: state.post.singlePost.comments
})

export default connect(mapStateToProps, { loadOnePost, clearPost })(PostContent);
