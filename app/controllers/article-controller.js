'use strict'
const Article = require('../models/article');
const assign = require('object-assign');

exports.load = (req, res, next, name) => {
    Article.findOne({name: req.params.name}, function(err, article){
        if(err) return next(res.json({'success': 'false' , 'message': 'Article not found!'}));
        req.article = article;
        next();
    })
};

exports.index = (req, res) => {
    req.query.q = req.query.q ? {active: req.query.q} : {};
    Article.find(req.query.q,(err, articles) =>{
        if(err) console.log(err);
        if(articles.length == 0) articles = 'No Articles Found!';
        return res.json({'success': 'true', 'articles': (articles || 'No Articles Found!')});
    })
}

exports.show = (req, res) => {
    const article = req.article || 'Article not found!!';
    return res.json({'success': 'true', 'article': article});
};

exports.name = (req, res) => {
    const article = {name: req.params.name};
    res.json(article);
};

exports.store = (req, res) => {
    const article = req.body;
    article.name = article.title;
    article.tags = article.tags || 'uncategorized';
    if(Object.keys(article.tags).length==0) article.tags = 'uncategorized';
    article.author = req.user
    Article.create(article, (err, result) => {
    if(err) return res.json({'success': 'false', 'msg': (err.errors || err.errmsg) });
       return res.json({'success': 'true', 'msg': 'Article Created Successfuly!', 'data': result});
    })
};

exports.update = (req, res) => {
    const oldArticleData = req.article;
    const editArticle = req.body;
    editArticle.name = editArticle.title;
    editArticle.tags = editArticle.tags || 'uncategorized';
    if(Object.keys(editArticle.tags).length==0) editArticle.tags = 'uncategorized';
    oldArticleData.author = req.user;

    assign(oldArticleData, editArticle);
    oldArticleData.save((err, result)=>{
        if(err) return res.json({'success': 'false',  'msg': err});
        return res.json({'success': 'true', 'msg': 'Article Updated Successfuly', 'data': result })
    })
};

exports.delete = (req, res) => {
    const article = req.article;
    if(article){
        article.remove((err) => {
            if(err) return res.json({'success': 'false', 'msg': err});
            return res.json({'success': 'true', 'msg': 'Article deleted successfuly!'});
        })
    }else{
        return res.json({'success': 'false', 'msg': 'This Article does not exists anymore!'})
    }
};

exports.changeCs = (req, res) => {
    const article = req.article;
    const option = req.query.option;
    if(article && option){
        Article.changeCS(article.name, option, (err, result) => {
            if(err) return res.json({'success': 'false', 'msg': err});
            return res.json({'success': 'true', 'msg': 'Article Status Changed!', 'data': result});
        })
    }else{
        return res.json({'success': 'false', 'msg': 'This Article does not exists anymore!'})
    }
};

exports.plusView = (req, res) => {
    const article = req.article;
    if(article){
        Article.plusView(article.name, (err, result) => {
            if(err) return res.json({'success': 'false', 'msg': err});
            return res.json({'success': 'true', 'msg': 'Article Viewed', 'data': result});
        });
    }else{
        return res.json({'success': 'false', 'msg': 'This Article does not exists anymore!'})
    }
}
