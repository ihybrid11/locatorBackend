const passport = require('passport');
const { Strategy } = require('passport-local');
const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:local.strategy');


module.exports = function localStrategy() {
    passport.use(new Strategy(
        {
            usernameField: 'username',
            passwordField: 'password'
        }, (username, password, done) => {
            const url = process.env.MONGO_URL;
            const dbName = process.env.MONGO_DB_NAME;

            (async function mongo() {
                let client;
                try {
                    client = await MongoClient.connect(url);
                    debug('Connected to Mongo for User login');

                    const db = client.db(dbName);
                    const col = db.collection('users');
                    const user = await col.findOne({ username });

                    if (user.password === password) {
                        done(null, user);
                    } else {
                        done(null, false);
                    }
                } catch (error) {
                    console.log(error.stack);
                }

                client.close();
            }());
        }
    ));
};