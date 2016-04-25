'use strict';
const Profile = require('../models/profile');
const assign = require('object-assign');

exports.load = (req, res, next, idProfile) => {
    Profile.findOne({_id: req.params.idProfile}, function(err, profile){
        if(err) return next(res.json({'success': 'false' , 'message': 'Profile not found!'}));
        req.profile = profile;
        next();
    })
};

exports.index = (req, res) => {
    Profile.findOne({}, (err, profile) =>{
        if(err) console.log(err);
        return res.json({'success': 'true', 'profile': (profile || 'No Profile Found!')});
    })
};


exports.show = (req, res) => {
    const profile = req.profile || 'Profile not found!';
    return res.json({'success': 'true', 'profile': profile});
};

exports.store = (req, res) => {
    Profile.isOne((err, value) => {
        if(err) return console.log(err);
        if(value < 1){
            Profile.create(req.body, (err, result) => {
                if(err) return res.json({'success': 'false', 'msg': (err.errors || err.errmsg) });
                return res.json({'success': 'true', 'msg': 'Profile Created Successfuly!', 'data': result});
            })
        }else{
            return res.json({'success': 'false', 'msg': 'A profile already exists' });
        }
    })
};

exports.update = (req, res) => {
    const oldProfileData = req.profile;
    assign(oldProfileData, req.body);
    oldProfileData.save((err, result)=>{
        if(err) return res.json({'success': 'false',  'msg': err});
        return res.json({'success': 'true', 'msg': 'Profile Updated Successfuly', 'data': result })
    })
};

exports.delete = (req, res) => {
    const profile = req.profile;
    if(profile){
        profile.remove((err) => {
            if(err) return res.json({'success': 'false', 'msg': err});
            return res.json({'success': 'true', 'msg': 'Profile deleted successfuly!'})
        })
    }else{
        return res.json({'success': 'false', 'msg': 'This profile does not exists anymore!'})
    }
};
