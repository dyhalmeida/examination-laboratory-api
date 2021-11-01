/**
 * Import libs
 */
const express = require('express');
const cors = require('cors');

/**
 * Import routes
 */
const home = require('./routes/home');
const laboratory = require('./routes/laboratory');
const exam = require('./routes/exam');

/**
 * Instância a conexão com o banco de dados
 */
require('./database');

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.setEnvironments();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/', home);
    this.app.use('/', laboratory);
    this.app.use('/', exam);
  }

  setEnvironments() {
    this.app.set('port', process.env.APP_PORT || 3333);
  }
}

module.exports = new App().app;
