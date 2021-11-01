/**
 * Import libs
 */
const express = require('express');
const cors = require('cors');

/**
 * Import routes
 */
const home = require('./routes/home');

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
  }
}

module.exports = new App().app;
