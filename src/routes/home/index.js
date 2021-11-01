const { Router } = require('express');
const homeController = require('../../controller/home');

const home = new Router();

home.get('/', homeController.index);

module.exports = home;
