'use strict';
module.exports = (sequelize, DataTypes) => {
  var Guest = sequelize.define('Guest', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    response: DataTypes.BOOLEAN,
    plusone: DataTypes.INTEGER,
    plusonelist: DataTypes.STRING,
    invitationsent: DataTypes.BOOLEAN
  }, {});
  Guest.associate = function(models) {
    // associations can be defined here
  };
  return Guest;
};