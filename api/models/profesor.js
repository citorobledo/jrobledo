'use strict';
module.exports = (sequelize, DataTypes) => {
  const profesor = sequelize.define('profesor', {
    dni: {
      type : DataTypes.INTEGER,
      validate: {
        isInt: {
          args: true,
          msg: "El DNI debe tener solo números",
        },
          len: {
            args: [8, 8],
            msg: "El DNI debe tener 8 dígitos"
      }
    }
    },
    nombre: {
      type: DataTypes.STRING,
      validate: {
        isAlpha: {
          args: true,
          msg: "El nombre solo puede contener letras"
        },
        len: {
          args: [3, 50],
          msg: "El nombre debe tener entre 3 y 50 caracteres"
        }
      }
    },
    apellido: {
      type: DataTypes.STRING,
      validate: {
        isAlpha: {
          args: true,
          msg: "El apellido solo puede contener letras"
        },
        len: {
          args: [3, 50],
          msg: "El apellido debe tener entre 3 y 50 caracteres"    
        }
      }
    },
  }, {});
  profesor.associate = function(models) {
    profesor.hasMany(models.matricula, {  // asociacion a la tabla matricula (tiene muchas)
      foreignKey: 'id_profesor'           // clave foranea de la tabla matricula
    });
   
  };
  return profesor;
};