'use strict';
module.exports = (sequelize, DataTypes) => {
  const alumno = sequelize.define('alumno', {
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING
  }, {});
  alumno.associate = function(models) {
    alumno.hasMany(models.matricula, {// asociacion a la tabla matricula (tiene muchas) 
      foreignKey: 'id_alumno'         // clave foranea de la tabla matricula
    });
  };
  return alumno;
};