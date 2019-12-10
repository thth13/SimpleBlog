const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const keys = require('../config/keys');
const User = require('../models/user');

const validateLoginInput = require('../validation/login');
const validateRegisterInput = require('../validation/register');


router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ login: req.body.login }).then(user => {
    if (user) {
      errors.login = 'User already exist';
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        login: req.body.login,
        password: req.body.password,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

router.post('/login', (req, res) => {
  const { login, password } = req.body;
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid)  {
    return res.status(400).json(errors);
  }

  User.findOne({ login }).then(user => {
    if (!user) {
      errors.login = 'User not found';
      return res.status(400).json(errors);
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = { id: user.id, login: user.login, role: user.role };

        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: '1 day' },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token,
            });
          }
        );
      } else {
        errors.password = 'Password incorrect';
        return res.status(400).json(errors);
      }
    });
  });
});

module.exports = router;
