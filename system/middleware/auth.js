'use strict';
const jwt = require('jwt-simple');
const config = require('../config');
const User = require('../../app/models/user');

exports.requireLogin = (req, res, next)=> {
    let token = _getToken(req.headers);
    if(token){
        let decoded = _decodedThis(token);
        User.findOne({
            _id: decoded._id
        }, {password: 0}, (err, user) => {
            if(err) console.log(err);
            if(!user){
                return res.status(403).send({success: false, msg: 'Authentication failed. User not found'});
            }else{
                return next();
            }
        })
    }else{
        console.log("nao")
        return res.status(403).send({success: false, msg: 'Authentication failed. No Token Provided'})
    }
};


let _getToken = function(headers){
    if(headers && headers.authorization){
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};

let _decodedThis = function(_token){
    let _userInfo = jwt.decode(_token, config.SECRET);
    let _user = ({_id: _userInfo._id, name: _userInfo.name, email: _userInfo.email});
    return _user;
}

