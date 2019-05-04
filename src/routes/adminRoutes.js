const express = require('express');
const debug = require('debug')('app:adminRoutes');
const { MongoClient } = require('mongodb');
const adminRouter = express.Router();
const mongoController = require('../controllers/mongoController');

const users = [
    {
        name: "admin",
        password: "root",
        accessLevel: "root"
    }
];

function router() {
    const { getUsers } = mongoController();

    adminRouter.route('/')
        .get(getUsers);
    return adminRouter;

}

module.exports = router;