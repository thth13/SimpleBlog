import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import { logoutUser } from '../../actions/authActions';

class Header extends Component {
	handleLogout = () => {
		this.props.logoutUser();
	};

	render() {
		const { isAuthenticated, user } = this.props.auth;
		return (
			<header>
				<h1 className="header-text"><Link to="/">Minimo</Link></h1>
				<ul className="header-links">
					<li><Link to="/">Home</Link></li>
					<li>Categories</li>
					{isAuthenticated ?
						<li onClick={this.handleLogout}>Sign out</li> :
						<li onClick={this.showModal}><Link to="/auth">Sign In</Link></li>
					}
					{user.role === 'admin' && <li><Link to="/addpost">Add post</Link></li>}
				</ul>
			</header>
		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Header);