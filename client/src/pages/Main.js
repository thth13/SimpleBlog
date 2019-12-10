import React, { Fragment } from 'react';

import MainPost from '../components/post-list/MainPost';
import PostList from '../components/post-list/PostList';
import Header from '../components/template/Header';
import Footer from '../components/template/Footer';

const Main = () => (
  <Fragment>
    <Header />
    <MainPost />
    <PostList />
    <Footer />
  </Fragment>
);

export default Main;