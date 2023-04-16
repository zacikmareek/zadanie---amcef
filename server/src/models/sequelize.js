const config = require("../config/config");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  {
    host: config.db.options.host,
    port: config.db.options.port,
    dialect: config.db.options.dialect,
  }
);

module.exports = sequelize;
