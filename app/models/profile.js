'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const _validate = (v) => v.length >= 3;

const ProfileSchema = new Schema({
        body: {
            type: String,
            require: true,
            validate: [_validate, 'Body must be have less 3 chars!']
        },
        created_at: {
            type: Date,
            default: Date.now
        }
});

ProfileSchema.statics = {
    isOne: function(cb){
        return this.count().exec(cb);
    }
}


module.exports = mongoose.model('Profile', ProfileSchema);