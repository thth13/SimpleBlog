import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { addComment } from '../../actions/postActions';

import styles from './Comments.module.css';
import avatar2 from '../../img/avatar2.png';

function AddCommentForm({ postId, addComment, isAuthenticated }) {
  const [value, setValue] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    addComment(postId, value);
    setValue('');
  };

  const handleChange = e => {
    setValue(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.addCommentForm}>
      {isAuthenticated ? (
        <Fragment>
          <img src={avatar2} alt="Avatar" />
          <input
            onChange={handleChange}
            value={value}
            placeholder="Join the discussion"
          />
        </Fragment>
      ) : (
        <p>To write comments you need to log in</p>
      )}
    </form>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStateToProps, { addComment })(AddCommentForm);
