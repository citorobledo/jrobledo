'use strict';
module.exports = (sequelize, DataTypes) => {
  const profesor = sequelize.define('profesor', {
    id_materia: DataTypes.INTEGER,// se agregan el campos de la tabla
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING
  }, {});
  profesor.associate = function(models) {
    // associations can be defined here
    profesor.belongsTo(models.materia, {// se agrega la asociacion a materia
      as: 'Materia-Relacionada',
      foreignKey: 'id_materia'
    })
  };
  return profesor;
};