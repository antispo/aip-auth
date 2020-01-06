const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User.model');

const { sv, lv } = require('../validation');

const { MAuth } = require('./private');

router.post('/register', (req, res) => {
  const isValid = sv.validate(req.body);

  if (isValid.error) {
    res.status(400).json({ errors: isValid.error.details });
  } else {
    User.findOne({ email: req.body.email })
      .then(data => {
        if (data !== null) {
          return res.status(400).json({ email: 'is already taken' });
        } else {
          bcrypt.genSalt().then(salt => {
            bcrypt.hash(req.body.password, salt).then(hashedPassword => {
              const user = new User({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword
              });

              user
                .save()
                .then(data => {
                  const token = jwt.sign(
                    {
                      uid: data._id,
                      username: user.username,
                      email: user.email
                    },
                    process.env.TOKEN_SECRET
                  );
                  return res.status(201).json({ token });
                })
                .catch(err => {
                  console.error(err);
                  return res.status(500).json({ error: err.code });
                });
            });
          });
        }
      })
      .catch(err => {
        console.error('SIGNUP_ERROR:', err);
        return res.status(500).json({ error: err.code });
      });
  }
});

router.post('/login', (req, res) => {
  const isValid = lv.validate(req.body);
  if (isValid.error) {
    res.status(400).json({ errors: isValid.error.details });
  } else {
    User.findOne({ username: req.body.username }).then(userData => {
      if (userData === null)
        res.status(403).json({ error: 'invalid username' });
      bcrypt.compare(req.body.password, userData.password).then(isCorrect => {
        if (!isCorrect) res.status(403).json({ error: 'wrong password' });

        const token = jwt.sign(
          {
            uid: userData._id,
            username: userData.username,
            email: userData.email
          },
          process.env.TOKEN_SECRET
        );

        res.status(200).json({
          uid: userData._id,
          username: userData.username,
          email: userData.email,
          token
        });
      });
    });
  }
});

router.get('/get', MAuth, (req, res) => {
  return res.json(req.user);
});

module.exports = router;
