'use strict';

module.exports = (sequelize, DataTypes) => {

  const user = sequelize.define('user', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: {
          msg: "El nombre solo puede contener letras"
        },
        len: {
          args: [3, 50],
          msg: "El nombre tiene que ser entre 3-50 caracteres"
        }
      }
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: {
          msg: "El apellido solo puede contener letras"
        },
        len: {
          args: [3, 50],
          msg: "El apellido tiene que ser entre 3-50 caracteres"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "El email tiene que ser valido"
        }
      }
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, 255],
          msg: "La contraseña tiene que ser entre 6-50 cracteres"
        }
      }
    },
  }, {
    tableName: "users"
  });

  user.associate = function(models) {
    // associations can be defined here
  };

  return user;
};