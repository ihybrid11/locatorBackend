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
            res.json(req.user.interests);
        });

    userRouter.route('/login')
        .post(passport.authenticate('local', {
            successRedirect: '/user/profile',
            failureRedirect: '/user/signup',
            failureMessage: 'User does not exist.'
        }));

    userRouter.route('/signup')
        .post((req, res) => {
            //const { username, password } = req.body;
            console.log(req.body);
            
            const url = process.env.MONGO_URL;
            const dbName = process.env.MONGO_DB_NAME;

            (async function mongo() {
                let client;
                client = await MongoClient.connect(url);
                const db = client.db(dbName);
                const col = await db.collection('users');

                //const user = { username, password };

                const result = await col.insertOne(req.body);
                res.send(result.ops[0]);
            }());
        });
    return userRouter;
};

module.exports = router;