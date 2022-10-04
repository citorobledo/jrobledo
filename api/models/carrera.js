'use strict';
module.exports = (sequelize, DataTypes) => {
  const carrera = sequelize.define('carrera', {
    nombre: DataTypes.STRING
  }, {});

  //creo la asociacion  (uno a muchos:)
  carrera.associate = function(models) {
    carrera.hasMany(models.materia,{ // Modelo al que pertenece (carreara tiene muchas materias)
      as: 'materias de la carrera',  // nombre de mi relacion
      foreignKey: 'id_carrera'      // campo con el que voy a igualar
    
    })
  };
  return carrera;
};