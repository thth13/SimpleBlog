import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { createPost } from '../../actions/postActions';

import Header from '../../components/template/Header';
import Footer from '../../components/template/Footer';
import styles from './AddPost.module.css';

function AddPost({ createPost, history, errors }) {
  const [fields, setFields] = useState({
    title: '',
    content: '',
    category: 'select',
    image: null,
  });

  const handleChange = e => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    createPost(fields, history);
  };

  const changeImage = e => {
    setFields({ ...fields, image: e.target.files[0] })
  }

  return (
    <Fragment>
      <Header />
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className={styles.keklol}>New post</h1>
        <input type="file" onChange={changeImage} />
        <input
          value={fields.title}
          onChange={handleChange}
          name="title"
          placeholder="Title"
          className={errors.title && styles.errorInput}
        />
        {errors.title && (
          <span className={styles.errorLabel}>{errors.title}</span>
        )}
        <textarea
          value={fields.content}
          onChange={handleChange}
          name="content"
          placeholder="Content"
          className={
            errors.content
              ? `${styles.errorInput} ${styles.contentField}`
              : styles.contentField
          }
        />
        {errors.content && (
          <span className={styles.errorLabel}>{errors.content}</span>
        )}
        <span>Category</span>
        <select name="category" value={fields.category} onChange={handleChange}>
          <option value="lifestyle">Lifestyle</option>
          <option value="other">Other</option>
          <option value="select">select</option>
        </select>
        <div className={styles.actionButtons}>
          <button type="submit" className={styles.addButton}>
            Add post
          </button>
          <button type="button" className={styles.cancelButton}>
            Cancel
          </button>
        </div>
      </form>
      <Footer />
    </Fragment>
  );
}

const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps, { createPost })(withRouter(AddPost));
