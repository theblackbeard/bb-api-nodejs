'use strict';

exports.requireLogin = (req, res, next)=> {
    console.log("mid");
    next();
}