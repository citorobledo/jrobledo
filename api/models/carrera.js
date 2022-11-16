'use strict';
module.exports = (sequelize, DataTypes) => {
  const carrera = sequelize.define('carrera', {
    nombre: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isAlphanumeric: {
          args: true,
          msg: "El nombre solo puede contener letras y números"
        },
        len: {
          args: [3, 50],
          msg: "El nombre debe tener entre 3 y 50 caracteres"
        }
      }
    }
  }, {});
  carrera.associate = function(models) {
    carrera.hasMany(models.matricula, { // asociacion a la tabla matricula (tiene muchas)
      foreignKey: 'id_carrera'          // clave foranea de la tabla matricula
    });
  };
  
  return carrera;
};