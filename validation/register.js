const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data)  {
  let errors = {};

  data.login = !isEmpty(data.login) ? data.login : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : '';

  if (!Validator.isLength(data.login, { min: 2, max: 30 })) {
    errors.login = 'Login must be between 2 and 30 characters';
  }

  if (Validator.isEmpty(data.login)) {
    errors.login = 'Login field is required';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  if (!Validator.isLength(data.password, { min: 4, max: 30 })) {
    errors.password = 'Password must be at least 4 characters';
  }

  if (Validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = 'Confirm password field is required';
  } else {
    if (!Validator.equals(data.password, data.confirmPassword)) {
      errors.confirmPassword = 'Passwords must match';
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};