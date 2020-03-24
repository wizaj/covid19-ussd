'use strict';

module.exports = function(sequelize, DataTypes) {
  var Registrant = sequelize.define('Registrant', {
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    has_fever: {
      type: DataTypes.STRING,
      allowNull: false
    },
    is_coughing: {
      type: DataTypes.STRING,
      allowNull: false
    },
    breathing_issues: {
      type: DataTypes.STRING,
      unique: false
    },
    travel_last_14_days: {
      type: DataTypes.STRING,
      allowNull: false
    },
    met_with_corona_patient: {
      type: DataTypes.STRING,
      allowNull: false
    },
    neighbourhood_or_estate: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return Registrant;
};
