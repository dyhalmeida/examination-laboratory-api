const Sequelize = require('sequelize');

/** Configuração de conexão com banco de dados */
const databaseConfig = require('../config/database');

/** Import dos models para conexão */
const Laboratory = require('../models/Laboratory');
const Exam = require('../models/Exam');

const models = [Laboratory, Exam];

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
