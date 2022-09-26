'use strict';
module.exports = (sequelize, DataTypes) => {
  const matricula = sequelize.define('matricula', {
    id_alumno: DataTypes.INTEGER
  }, {});
  matricula.associate = function(models) {
    // associations can be defined here
  };
  return matricula;
};