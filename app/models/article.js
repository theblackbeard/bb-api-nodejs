'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const _validate = (v) => v.length >= 3;
const _set = (v) => v.toLowerCase();
const _setName = (v) => v.toLowerCase().split(" ").join("-");
const _getTags = tags => tags.join(',');
const _setTags = tags => tags.toLowerCase().split(',');

const ArticleSchema = new Schema({
    title : {
        type: String,
        require: true,
        validate: [_validate, 'Title must be have less 3 chars'],
        set: _set
    },
    name: {
        type: String,
        require: true,
        set: _setName,
        index: true
    },

    body: {
        type: String,
        require: true,
        validate: [_validate, 'Body must be have less 3 chars'],
        set: _set
    },

    cover:{
        type: Schema.Types.Mixed,
        require: true
    },

    gallery : Schema.Types.Mixed,
    tags: {
        type: [],
        get: _getTags,
        set: _setTags,
        trim: true
    },
    views: {
        type: Number,
        default: 0
    },
    active: {
        type: Boolean,
        default: false
    },

    author: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    links: [],
    comments: [{
        name: {type: String, default: ''},
        body: {type: String, default: ''},
        email:{type: String, default: ''},
    }],
    created_at: {
        type: Date,
        default: Date.now
    }
});

ArticleSchema.statics = {
    changeCS: function(name, option, cb){
        return this.update({name: name},{$set: {active: JSON.parse(option)}}, cb);
    },
    plusView: function(name, cb){
        return this.update({name: name}, {$inc : {views: 1}}, cb);
    }
}



module.exports = mongoose.model('Article', ArticleSchema);