'use strict';
module.exports = (sequelize, DataTypes) => {
  const profesor = sequelize.define('profesor', {
    dni: DataTypes.INTEGER,
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING
  }, {});
  profesor.associate = function(models) {
    profesor.hasMany(models.matricula, {  // asociacion a la tabla matricula (tiene muchas)
      foreignKey: 'id_profesor'           // clave foranea de la tabla matricula
    });
   
  };
  return profesor;
};