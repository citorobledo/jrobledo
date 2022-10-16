'use strict';
module.exports = (sequelize, DataTypes) => {
  const matricula = sequelize.define('matricula', {
    id_alumno: DataTypes.INTEGER,
    id_profesor: DataTypes.INTEGER,
    id_materia: DataTypes.INTEGER,
    id_carrera: DataTypes.INTEGER
  }, {});
  matricula.associate = function(models) {
    /* 
      para la asociacion en una tabla intermedia 
      se hace un belongsTo en cada tabla que interviene en la relacion 
      y incluyo la clave foranea.
      luego en la tabla relacionada se implementa el hasMany a la misma foreignKey.
    */
    matricula.belongsTo(models.alumno, {
      foreignKey: 'id_alumno'
    });
    matricula.belongsTo(models.profesor, {
      foreignKey: 'id_profesor'
    });
    matricula.belongsTo(models.materia, {
      foreignKey: 'id_materia'
    });
    matricula.belongsTo(models.carrera, {
      foreignKey: 'id_carrera'
    });
  };
  return matricula;
};