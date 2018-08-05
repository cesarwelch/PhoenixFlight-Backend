'use strict';
module.exports = (sequelize, DataTypes) => {
  var guest = sequelize.define('guest', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    plusone: DataTypes.INTEGER,
    plusonelist: DataTypes.STRING,
    binaryId: DataTypes.STRING
  }, {});
  guest.associate = function(models) {
    // associations can be defined here
  };
  return guest;
};