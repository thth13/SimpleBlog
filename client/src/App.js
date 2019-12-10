import React, { Component, Fragment } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import store from './store/configureStore';
import { setCurrentUser, logoutUser } from './actions/authActions';
import setAuthToken from './utils/setAuthToken';

import Main from './pages/Main';
import Post from './pages/Post';
import Auth from './pages/Auth';
import AddPost from './pages/AddPost/AddPost';


if (localStorage.jwtToken) {
	setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
  
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
  }
}

class App extends Component {
  render() {
    return (
	    <Provider store={store}>
				<Router>
          <Fragment>
            <Route exact path='/' component={Main} />
            <Route exact path='/post/:id' component={Post} />
            <Route exact path='/auth' component={Auth} />
            <Route exact path='/addpost' component={AddPost} />
          </Fragment>
        </Router>
			</Provider>
    );
  }
}

export default App;