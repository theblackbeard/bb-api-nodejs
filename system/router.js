'use strict';
const express = require('express');
const Router  = express.Router();
const UserController = require('../app/controllers/user-controller');
const ArticleController = require('../app/controllers/article-controller');
const AboutController = require('../app/controllers/about-controller');
const TagController = require('../app/controllers/tag-controller');
const Auth = require('./middleware/auth');
const passport = require('passport');

const rp = passport.authenticate('jwt', { session: false});
const ra = Auth.requireLogin;

Router.get('/', (req, res) => {
    res.json({'success': 'true', 'msg' : 'Home Api'});
})

Router.param('idUser', UserController.load);
Router.get('/users', rp, ra, UserController.index);

Router.post('/users/register', UserController.store);
Router.get('/users/:idUser', rp, ra, UserController.show);
Router.put('/users/:idUser', rp, ra, UserController.update);
Router.delete('/users/:idUser', rp, ra, UserController.delete);
Router.post('/users/auth', UserController.auth);

Router.param('idProfile', AboutController.load);
Router.get('/profile', AboutController.index);
Router.post('/profile/register',rp, ra, AboutController.store);
Router.get('/profile/:idProfile', rp, ra, AboutController.show);
Router.put('/profile/:idProfile', rp, ra, AboutController.update);
Router.delete('/profile/:idProfile', rp, ra, AboutController.delete);

Router.param('name', ArticleController.load);
Router.get('/articles', ArticleController.index);
Router.post('/articles/register', rp, ra, ArticleController.store);
Router.get('/articles/:name', rp, ra, ArticleController.show);
Router.put('/articles/:name', rp, ra, ArticleController.update);
Router.delete('/articles/:name', rp, ra, ArticleController.delete);
Router.put('/articles/cs/:name', rp, ra, ArticleController.changeCs);
Router.put('/articles/view/:name', ArticleController.plusView);

Router.param('nameTag', TagController.load);
Router.get('/tags', rp, ra, TagController.index);
Router.get('/tags/sync', rp,ra, TagController.indexSync);
Router.post('/tags/register',rp, ra, TagController.store);
Router.get('/tags/:nameTag', TagController.show);
Router.delete('/tags/:nameTag', rp, ra, TagController.delete);

module.exports = Router;