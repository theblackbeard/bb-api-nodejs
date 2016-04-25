const User = require('../models/user');
const assign = require('object-assign');

exports.load = (req, res, next, idUser) => {
    User.findOne({_id: req.params.idUser}, function(err, user){
        if(err) return next(res.json({'success': 'false' , 'message': 'User not found!'}));
        req.user = user;
        next();

    })
}

exports.index = (req, res) =>{
    User.find({}, (err, users) => {
        if(err) console.log(err);
        if(users.length == 0) users = 'No Users Found!';
        return res.json({'success': 'true', 'users': (users || 'No Users Found!')});
    });
};

exports.show = (req, res) => {
    const user = req.user || 'User not found!';
    return res.json({'success': 'true', 'user': user});
}

exports.store = (req, res) => {
    User.create(req.body, (err,result) => {
        if(err) return res.json({'success': false, 'msg': (err.errors || err.errmsg) });
        return res.json({'success': 'true', 'msg': 'User Created Successfuly!', 'data': result});
    });
};

exports.update = (req, res) => {
    const oldUserData = req.user;
    assign(oldUserData, req.body);
    oldUserData.save((err, result)=>{
        if(err) return res.json({'success': 'false',  'msg': err});
        return res.json({'success': 'true', 'msg': 'User Updated Successfuly', 'data': result })
    });
};

exports.delete = (req, res) => {
    const user = req.user;
    if(user){
        user.remove((err) => {
            if(err) return res.json({'success': 'false', 'msg': err});
            return res.json({'success': 'true', 'msg': 'User deleted successfuly!'})
        })
    }else{
        return res.json({'success': 'false', 'msg': 'This user does not exists anymore!!'})
    }
};