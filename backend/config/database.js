const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DBNAME, process.env.DBUSER, process.env.DBPASS, {
  host: process.env.DBHOST || 'localhost',
  dialect: 'mysql',
  logging: false,
});

module.exports = sequelize;
