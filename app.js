const express = require('express');
const debug = require('debug')('app');
const chalk = require('chalk');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
const adminRouter = require('./src/routes/adminRoutes')();
const userRouter = require('./src/routes/userRoutes')();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'locator' }));
require('./src/config/passport')(app);

app.use('/admin', adminRouter);
app.use('/user', userRouter);

app.get('/', (req, res) => {
    res.send('Welcome!');
});

app.listen(port, () =>{
    debug(`listening on port ${chalk.green(port)}`);
});