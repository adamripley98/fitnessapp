const express = require('express');
const passport = require('passport');

const router = express.Router();

// router.get('/protected',
//   passport.authenticate('jwt', { session: false }),
//  (req, res) => {
//    res.json("Success!");
//     // passport.authenticate('jwt', {session: false}),(err, user, info) => {
//     //     console.log('info:', info, 'user', user);
//     //     if (err) {
//     //       // internal server error occurred
//     //         return next(err);
//     //     }
//     //     if (!user) {
//     //       // no JWT or user found
//     //         return res.status(401).json({ error: 'Invalid credentials.' });
//     //     }
//     //     if (user) {
//     // // authentication was successful! send user the secret code.
//     //         return res.status(200).json({ secret: '123' });
//     //     }
//     // })(req, res, next);
// });

// router.get('/protected', passport.authenticate('jwt', { session: false }), function (req, res) {
//   console.log('headers', req.headers);
//   passport.authenticate('jwt', function (err, user, info) {
//     console.log('is there a user', user);
//     if (err) {
//       return next(err);
//     }
//     if (!user) {
//       console.log('wowzzz');
//       return res.status(401).json({ error: 'Invalid credentials.' });
//     }
//     if (user) {
//       return res
//         .status(200)
//         .json({ secret: '123' });
//     }
//   })(req, res, next);
// });


// router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
//     console.log('reqheaders', req.headers);
//     res.status(200).json({ secret: '123' });
// });

router.get('/protected', (req, res, next) => {
    console.log('headers', req.headers);
    passport.authenticate('jwt', (err, user, info) => {
        console.log('info', info);
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }
        if (user) {
            return res.status(200).json({ secret: '123' });
        }
    })(req, res, next);
});

module.exports = router;
