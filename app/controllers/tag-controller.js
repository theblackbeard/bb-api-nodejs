'use strict';
const Tag = require('../models/tag');
const Article = require('../models/article');

exports.load = (req, res, next, nameTag) => {
    Tag.findOne({title: req.params.nameTag}, function(err, tag){
        if(err) return next(res.json({'success': 'false' , 'message': 'Tag not found!'}));
        req.tag = tag;
        next();
    })
};

exports.index = (req, res) => {
   Tag.find({}, (err, tags) => {
        if(err) console.log(err);
        if(tags.length == 0) tags = 'No Tag Found!';
        return res.json({'success': 'true', 'tags': (tags || 'No Tags Found!')});
   })
};

exports.indexSync = (req, res) => {
    Tag.find({}, (err, tags) => {
        if(err) return console.log(err);
        return res.json(tags)
    })
};

exports.show = (req, res) => {
    const query =  {tags: req.params.name};
    Article.find(query, (err, articles) => {
        if(err) return res.json({success:'false', msg: err});
        return res.json({success:'true', articles: articles})
    })
};

exports.store = (req, res) => {
    let tags = _thisTags(req.body.title);
    Tag.create(tags, (err, result) => {
        if(err) return res.json({'success': 'false', 'msg': (err.errors || err.errmsg) });
        return res.json({'success': 'true', 'msg': 'Tag Created Successfuly!', 'data': result});
    })

};
exports.delete = (req, res) => {
    const tag = req.tag;
    if(tag){
        tag.remove((err) => {
            if(err) return res.json({'success': 'false', 'msg': err});
            return res.json({'success': 'true', 'msg': 'Tag deleted successfuly!'});
        })
    }else{
        return res.json({'success': 'false', 'msg': 'This Tag    does not exists anymore!'})
    }
}

let _thisTags = function (string) {
    let newTags = [];
    let tags = string.split(',');
    tags.forEach(function(tag){
        newTags.push({'title': tag});
    })
    return newTags;
}
