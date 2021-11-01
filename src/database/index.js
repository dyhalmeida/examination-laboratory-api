// const mongoose = require("mongoose");
const Sequelize = require('sequelize');

/** Configuração de conexão com banco de dados */
const databaseConfig = require('../config/database');

const models = [];

class Database {
  constructor() {
    this.connectSQLite();
  }

  connectSQLite() {
    this.connection = new Sequelize(databaseConfig);
    models.map(model => model.init(this.connection));
  }
}

module.exports = new Database();
