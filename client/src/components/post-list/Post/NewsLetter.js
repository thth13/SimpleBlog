import React from 'react';
import styles from './Post.module.css';
import send_icon from '../../../img/send_icon.svg';

function NewsLetter() {
  return (
    <section className={styles.news}>
      <h2>Sign up for our newsletter!</h2>
      <form>
        <input placeholder="Enter a valid email address" />
        <button>
          <img src={send_icon} alt="send button" />
        </button>
      </form>
    </section>
  );
}

export default NewsLetter;
