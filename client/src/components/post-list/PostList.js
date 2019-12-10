import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';

import { loadPosts, loadMore } from '../../actions/postActions';

import Loader from '../common/Loader';
import Post from './Post/Post';
// import image from '../../img/postimg.png';
// import image2 from '../../img/postimg2.png';
// import image3 from '../../img/postimg3.png';
// import image4 from '../../img/postimg4.png';
// import image5 from '../../img/postimg5.png';
// import image6 from '../../img/postimg6.png';
// import send_icon from '../../img/send_icon.svg';
import styles from './PostList.module.css';

function MainPost({ posts, postCount, isLoading, loadPosts, loadMore }) {
	useEffect(() => {
		loadPosts();
		window.scrollTo(0, 0);
	}, []);

	const loadMoreClick = () => {
		loadMore(posts.length);
	};

	return (
		<Fragment>
			<section className={styles.postList}>
				{posts.map((post, index) => (
					<Post key={post._id} post={post} index={index} />
				))}
			</section>
			{postCount > posts.length && (
				<div className={styles.loadMore}>
					{!isLoading ? (
						<button onClick={loadMoreClick} className={styles.loadMoreButton}>
							Load more
						</button>
					) : (<Loader />)}
				</div>
			)}			
		</Fragment>
	)
}

const mapsStateToProps = state => ({
	posts: state.post.posts,
	postCount: state.post.postCount,
	isLoading: state.post.isLoading
});

export default connect(mapsStateToProps, { loadPosts, loadMore })(MainPost);