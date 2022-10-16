'use strict';
module.exports = (sequelize, DataTypes) => {
  const materia = sequelize.define('materia', {
    nombre: DataTypes.STRING
  }, {});
  materia.associate = function (models) {
    materia.hasMany(models.matricula,{  // asociacion a la tabla matricula (tiene muchas)
      foreignKey: 'id_materia'          //clave foranea de la tabla matricula
      });
  };
  return materia;
};