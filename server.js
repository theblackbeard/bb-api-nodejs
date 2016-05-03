'use strict';
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const security = require('./system/middleware/security');
const app = express();
const config = require('./system/config.js');
const morgan = require('morgan');
const router = require('./system/router.js');
const bodyParser = require('body-parser');
const passport = require('passport');
require('./system/database')(config);
require('./system/passport')(passport, config);

app.use(helmet());
app.use(security.policy);
app.use(cors({origin: 'http://seu-site.com.br'}));
//app.use(cors({origin: '*'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/api', router);
app.use(passport.initialize());
app.listen(config.PORTSERVER, config.IPSERVER, () => {
    console.log('Server Running on ' , config.IPSERVER + ': ' + config.PORTSERVER);
});




