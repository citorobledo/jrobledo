'use strict';
module.exports = (sequelize, DataTypes) => {
  const materia = sequelize.define('materia', {
    nombre: {
      type: DataTypes.STRING,
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
  materia.associate = function (models) {
    materia.hasMany(models.matricula,{  // asociacion a la tabla matricula (tiene muchas)
      foreignKey: 'id_materia'          //clave foranea de la tabla matricula
      });
  };
  return materia;
};