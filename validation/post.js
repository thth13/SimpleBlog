const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.content = !isEmpty(data.content) ? data.content : '';

  if (!Validator.isLength(data.title, { min: 4, max: 100 })) {
    errors.title = 'Title must be between 4 and 100 characters'
  }

  if (!Validator.isLength(data.content, { min: 10, max: 5000 })) {
    errors.content = 'Content must be between 10 and 5000 characters'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};