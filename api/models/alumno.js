'use strict';
module.exports = (sequelize, DataTypes) => {
  const alumno = sequelize.define('alumno', {
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING
  }, {});
  alumno.associate = function(models) {
    // associations can be defined here
    alumno.belongsTo(models.materia, {// se agrega la asociacion a materia
      as: 'Materia-cursada',
      foreignKey: 'id_materia'
      
    })
  };
  return alumno;
};