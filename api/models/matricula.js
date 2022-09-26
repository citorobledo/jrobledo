'use strict';
module.exports = (sequelize, DataTypes) => {
  const matricula = sequelize.define('matricula', {
    id_alumno: DataTypes.INTEGER,
    id_profesor: DataTypes.INTEGER,
    id_materia: DataTypes.INTEGER,
    id_carrera: DataTypes.INTEGER
  }, {});
  matricula.associate = function(models) {
    // associations can be defined here
  };
  return matricula;
};