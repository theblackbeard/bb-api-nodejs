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

var whitelist = ['http://devroad.tmdev.com.br', '*'];
var corsOptions = {
    origin: function(origin, callback){
        let originIsWhitelisted = whitelist.indexOf(origin) !== -1;
        callback(null, originIsWhitelisted);
    }
};
app.use(helmet());
app.use(cors(corsOptions));
app.use(security.policy);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/api', router);
app.use(passport.initialize());
app.listen(config.PORTSERVER, config.IPSERVER, () => {
    console.log('Server Running on ' , config.IPSERVER + ': ' + config.PORTSERVER);
});






