'use strict';

module.exports = (sequelize, DataTypes) => {

  const user = sequelize.define('user', {
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
          msg: "La contraseña tiene que ser entre 6-255 cracteres"
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