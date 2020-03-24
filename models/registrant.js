'use strict';

module.exports = function(sequelize, DataTypes) {
  var Registrant = sequelize.define('Registrant', {
    has_fever: {
      type: DataTypes.STRING,
      allowNull: false
    },
    is_coughing: {
      type: DataTypes.STRING,
      allowNull: true
    },
    breathing_issues: {
      type: DataTypes.STRING,
      unique: true
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
