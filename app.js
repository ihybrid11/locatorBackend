const express = require('express');
const debug = require('debug')('app');
const chalk = require('chalk');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();

const port = process.env.PORT || 4000;


app.get('/', (req, res) => {
    res.send('Welcome!');
});

app.listen(port, () =>{
    debug(`listening on port ${chalk.green(port)}`);
});