const {BasicStrategy} = require('passport-http');
const express = require('express');
const jsonParser = require('body-parser').json;
const passport = require('passport');

const {User} = require('../models');
console.log(User.model);
const router = express.Router();
//router.use(jsonParser);


const basicStrategy = new BasicStrategy((username, password, callback) => {
    let user;
    User
        .findOne({username: username})
        .exec()
        .then(_user => {
            user = _user;
            if (!user) {
                return callback(null, false);
            }
            return user.validatePassword(password);
        })
        .then(isValid => {
            if (!isValid) {
                return callback(null, false);
            }
            else {
                return callback(null, user);
            }
        })
        .catch(err => callback(err));
});

// router.get('/test', function(req, res) {
//     console.log('message');
//     res.send(200);
//
// });

// passport.use(basicStrategy);
// router.use(passport.initialize());

router.post('/', (req, res) => {
   console.log(req.body);
    if (!req.body) {
        return res.status(400).json({message: 'No request body'});
    }

    if (!('username' in req.body)) {
        return res.status(422).json({message: 'Missing field: username'});
    }

    let {username, password, firstName, lastName} = req.body;
    console.log(username, password, firstName, lastName);

    if (typeof username !== 'string') {
        return res.status(422).json({message: 'Incorrect field type: username'});
    }

    username = username.trim();

    if (username === '') {
        return res.status(422).json({message: 'Incorrect field length: username'});
    }

    if (!(password)) {
        return res.status(422).json({message: 'Missing field: password'});
    }

    if (typeof password !== 'string') {
        return res.status(422).json({message: 'Incorrect field type: password'});
    }

    password = password.trim();

    if (password === '') {
        return res.status(422).json({message: 'Incorrect field length: password'});
    }
    console.log('here were are');
    // check for existing user
        User
        .find({username}, function(a,b) {
            console.log(a,b)
        })
        .count()
        .exec()
        .then(count => {
            console.log(count);

            if (count > 0) {
                return res.status(422).json({message: 'username already taken'});
            }
            // if no existing user, hash password
            return User.hashPassword(password)
        })
        .then(hash => {
            console.log("iwashere");
            return User
                .create({
                    username: username,
                    password: hash,
                    firstName: firstName,
                    lastName: lastName
                },function(a,b) {
                    console.log(a,b);
                })
        })
        .then(user => {
            return res.status(201).json(user.apiRepr());
        })
        .catch(err => {
            res.status(500).json({message: 'Internal server error'})
        });
});



//
// router.get('/me', passport.authenticate('basic', {session: false}),
//     (req, res) => res.json({user: req.user.apiRepr()})
// );


module.exports = router;
//app.use('/', router);

