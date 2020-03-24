'use strict';

module.exports = function(sequelize, DataTypes) {
  var Registrant = sequelize.define('Registrant', {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phone_number: {
      type: DataTypes.STRING,
      unique: true
    },
    language_pref: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });
  return Registrant;
};
