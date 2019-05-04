const express = require('express');
const debug = require('debug')('app:userRoutes');
const { MongoClient } = require('mongodb');
const userRouter = express.Router();
const passport = require('passport');

//const routes = require('./adminRoutes');

function router() {
    userRouter.route('/')
        .get((req, res) => {
            res.redirect('/user/signup');
        });

    userRouter.route('/profile')
        .all((req, res, next) => {
            if (req.user) {
                next();
            } else {
                res.redirect('/user/signup');
            }
        })
        .get((req, res) => {
            res.json(req.user);
        });

    userRouter.route('/login')
        .post(passport.authenticate('local', {
            successRedirect: '/user/profile',
            failureRedirect: '/user/signup',
            failureMessage: 'User does not exist.'
        }));

    userRouter.route('/signup')
        .get((req, res) => {
            res.send('This is a dummy Sign up page');
        });
    return userRouter;
};

module.exports = router;