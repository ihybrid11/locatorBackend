const express = require('express');
const debug = require('debug')('app:userRoutes');
const { MongoClient } = require('mongodb');

function mongoController() {
    function getUsers(req, res) {
        const url = process.env.MONGO_URL;
        const dbName = process.env.MONGO_DB_NAME;

        (async function mongo() {
            let client;
            try {
                client = await MongoClient.connect(url);
                debug('Connected correctly to the server');

                const db = client.db(dbName);
                //const response = await db.collection('users').insertMany(users);
                const col = await db.collection('users');
                const response = await col.find().toArray();
                res.json(response);

            } catch (error) {
                debug(error.stack);
            }
        }());
    }

    return { getUsers };
}

module.exports = mongoController;