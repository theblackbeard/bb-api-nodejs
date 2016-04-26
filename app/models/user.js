'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const _set = (v) => v.toLowerCase();
const _validateEmail = (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
const _validatePassword = (v) => v.length >= 3 && v.length <= 15;

const UserSchema = new Schema({
    name: {
        type: String,
        require: true,
        set: _set
    },
    email: {
        type: String,
        require: true,
        unique: true,
        set: _set,
        validate: [_validateEmail, 'Email not valid!']
    },
    password: {
        type: String,
        require: true,
        validate: [_validatePassword, 'Password must be have between 3 and 15 chars!']
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

UserSchema.pre('save', function(next) {
    var user = this;
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};
module.exports = mongoose.model('User', UserSchema);