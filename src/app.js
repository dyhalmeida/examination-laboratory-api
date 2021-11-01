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

/**
 * Instância a conexão com o banco de dados
 */
require('./database');

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/', home);
    this.app.use('/', laboratory);
  }
}

module.exports = new App().app;
