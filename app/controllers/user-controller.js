'use strict'
const User = require('../models/user');
const assign = require('object-assign');
const jwt = require('jwt-simple');
const config = require('../../system/config');

exports.load = (req, res, next, idUser) => {
    User.findOne({_id: req.params.idUser}, {password: 0}, function(err, user){
        if(err) return next(res.json({'success': false , 'msg': 'User not found!'}));
        req.user = user;
        next();

    })
}

exports.index = (req, res) =>{
    User.find({}, {password: 0}, (err, users) => {
        if(err) console.log(err);
        if(users.length == 0) users = 'No Users Found!';
        return res.json({'success': true, 'users': (users) || 'No Users Found!'});
    });
};

exports.show = (req, res) => {
    const user = req.user || 'User not found!';
    return res.json({'success': true, 'user': user});
}

exports.store = (req, res) => {
    User.create(req.body, (err,result) => {
        if(err) return res.json({'success': false, 'msg': (err.errors || err.errmsg) });
        return res.json({'success': true, 'msg': 'User Created Successfuly!', 'data': result});
    });
};

exports.update = (req, res) => {
    const oldUserData = req.user;
    assign(oldUserData, req.body);
    oldUserData.save((err, result)=>{
        if(err) return res.json({'success': 'false',  'msg': err});
        return res.json({'success': true, 'msg': 'User Updated Successfuly', 'data': result })
    });
};

exports.delete = (req, res) => {
    const user = req.user;
    if(user){
        user.remove((err) => {
            if(err) return res.json({'success': 'false', 'msg': err});
            return res.json({'success': true, 'msg': 'User deleted successfuly!'})
        })
    }else{
        return res.json({'success': false, 'msg': 'This user does not exists anymore!!'})
    }
};

exports.auth  = (req, res) => {
    User.findOne({
        email: req.body.email
    }, function(err, user){
        if(err) return console.log(err);
        if(!user){
            return res.json({success: false, 'msg': 'Auth failed, User not found'});
        }else{
            user.comparePassword(req.body.password, (err, isMatch) => {
                if(isMatch && !err){
                    let token = jwt.encode(user, config.SECRET);
                    return res.json({'success': true, token: 'JWT ' + token});

                }else{
                    return res.json({'success': false, msg: 'Auth failed, Wrong password'});
                }
            })
        }
    })
};

