import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import c from 'classnames'

import { loginUser, registerUser } from '../../actions/authActions';
import { clearErrors } from '../../actions/errors';

import './AuthPage.css';

function AuthPage({ registerUser, loginUser, errors, clearErrors, auth, history }) {
  const [isRegister, setIsRegister] = useState(false);
  const [fields, setFields] = useState({
    login: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    auth.isAuthenticated && history.push('/');
  });

  const handleChange = e => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    isRegister ? registerUser(fields, history) : loginUser(fields, history)
    clearErrors();
  };

  const changeAuth = () => {
    setIsRegister(!isRegister);
    setFields({
      login: '',
      password: '',
      confirmPassword: '',
    });
    clearErrors();
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <button type="button" onClick={changeAuth} className="small-button" id="register">
        or {isRegister ? 'login' : 'register'}
      </button>
  
      <h2 className="enter-text">
        {isRegister ? 'Create your account' : 'Sign In'}
      </h2>
      <input
        placeholder="Логин"
        type="text"
        name="login"
        className={c("auth-field", { "error-input": errors.login })}
        value={fields.login}
        onChange={handleChange}
      />
      {errors.login && <span className="error-label">{errors.login}</span>}
      <input
        placeholder="Пароль"
        type="password"
        name="password"
        className={c("auth-field", { "error-input": errors.password })}
        value={fields.password}
        onChange={handleChange}
      />
      {errors.password && <span className="error-label">{errors.password}</span>}
      {isRegister && (
        <input
          placeholder="Пароль"
          type="password"
          name="confirmPassword"
          className={c("auth-field", { "error-input": errors.confirmPassword })}
          value={fields.confirmPassword}
          onChange={handleChange}
        />
      )}
      {errors.confirmPassword && <span className="error-label">{errors.confirmPassword}</span>}
      <button type="submit" className="button">
        {isRegister ? 'Register' : 'Sign In'}
      </button>
    </form>
  );
}

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth,
});

export default connect(mapStateToProps, { loginUser, registerUser, clearErrors })(withRouter(AuthPage));
