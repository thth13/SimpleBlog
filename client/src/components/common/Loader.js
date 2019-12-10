import React from 'react';
import styles from './Loader.module.css';

function Loader() {
  return (
    <div className={styles.loader}>
      <div className={styles.loaderElem}>
        <div></div>
      </div>
    </div>
  );
}

export default Loader;
