'use strict';
module.exports = (sequelize, DataTypes) => {
  var Guest = sequelize.define('Guest', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    language: DataTypes.BOOLEAN,
    plus_one: DataTypes.INTEGER
  }, {});
  Guest.associate = function(models) {
    // associations can be defined here
  };
  return Guest;
};