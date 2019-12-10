import React, { Component, Fragment } from 'react';

import AuthForm from '../components/auth/AuthForm';

class Auth extends Component {
	render() {
		return (
			<Fragment>
        <AuthForm />
			</Fragment>
		);
	}
}

export default Auth;