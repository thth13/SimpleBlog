import React, { Component, Fragment } from 'react';

import PostContent from '../components/post/PostContent';
import Header from '../components/template/Header';
import Footer from '../components/template/Footer';

class Post extends Component {
	render() {
		return (
			<Fragment>
				<Header />
				<PostContent id={this.props.match.params.id} />
				<Footer />
			</Fragment>
		);
	}
}

export default Post;