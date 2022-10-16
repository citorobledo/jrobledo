'use strict';
module.exports = (sequelize, DataTypes) => {
  const carrera = sequelize.define('carrera', {
    nombre: DataTypes.STRING
  }, {});
  carrera.associate = function(models) {
    carrera.hasMany(models.matricula, { // asociacion a la tabla matricula (tiene muchas)
      foreignKey: 'id_carrera'          // clave foranea de la tabla matricula
    });
  };
  
  return carrera;
};