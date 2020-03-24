'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var config    = require(__dirname + './../config/config');

var sequelize = new Sequelize(config.mysql.db, config.mysql.user,
  config.mysql.pass, { host: config.mysql.host, dialect: 'mysql', autoIncrement: true });
var db        = {};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js');
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

module.exports = db;
