'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const _validate = (v) => v.length >= 3;
const _set = (v) => v.toLowerCase().split(',');


const TagSchema = new Schema({
   title: {
        type: String,
        require: true,
        validate: [_validate, 'Title Must be have 3 chars'],
        set: _set,
        unique: true
    }

});

module.exports = mongoose.model('Tag', TagSchema);