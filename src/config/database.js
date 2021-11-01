require('dotenv/config');
const { resolve } = require('path');

module.exports = {
  dialect: 'sqlite',
  storage: resolve(__dirname, '..', 'database', 'database.sqlite'),
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
