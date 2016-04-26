'use strict';
const express = require('express');
const Router  = express.Router();
const UserController = require('../app/controllers/user-controller');
const ArticleController = require('../app/controllers/article-controller');
const AboutController = require('../app/controllers/about-controller');
const TagController = require('../app/controllers/tag-controller');
const Auth = require('./middleware/auth');

Router.get('/', (req, res) => {
    res.json({'success': 'true', 'msg' : 'Home Api'});
})

Router.param('idUser', UserController.load);
Router.get('/users', Auth.requireLogin, UserController.index);
Router.post('/users/register', UserController.store);
Router.get('/users/:idUser', UserController.show);
Router.put('/users/:idUser', UserController.update);
Router.delete('/users/:idUser', UserController.delete);
Router.post('/users/auth', UserController.auth);

Router.param('idProfile', AboutController.load);
Router.get('/profile', AboutController.index);
Router.post('/profile/register', AboutController.store);
Router.get('/profile/:idProfile', AboutController.show);
Router.put('/profile/:idProfile', AboutController.update);
Router.delete('/profile/:idProfile', AboutController.delete);

Router.param('name', ArticleController.load);
Router.get('/articles', ArticleController.index);
Router.post('/articles/register', ArticleController.store);
Router.get('/articles/:name', ArticleController.show);
Router.put('/articles/:name', ArticleController.update);
Router.delete('/articles/:name', ArticleController.delete);
Router.put('/articles/cs/:name', ArticleController.changeCs);
Router.put('/articles/view/:name', ArticleController.plusView);

Router.param('nameTag', TagController.load);
Router.get('/tags', TagController.index);
Router.get('/tags/sync', TagController.indexSync);
Router.post('/tags/register', TagController.store);
Router.get('/tags/:nameTag', TagController.show);
Router.delete('/tags/:nameTag', TagController.delete);

module.exports = Router;