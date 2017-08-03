const express = require('express');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const secret = '7x0jhxt"9(thpX6';
const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
    res.send('respond with a resource');
});

router.post('/register', (req, res) => {
    User.register(new User({ email: req.body.email }), req.body.password, (err, user) => {
        if (err) {
            return res.status(400).send({ error: 'Email address in use.' });
        }
        res.status(200).send({ user: user.id });
    });
});

router.post('/login', (req, res, next) => {
    console.log('entered login');
    passport.authenticate('local', (err, user) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }
        if (user) {
            const token = jwt.sign({ id: user._id, email: user.email }, secret);
            return res.status(200).json({ token });
        }
    })(req, res, next);
});

module.exports = router;
