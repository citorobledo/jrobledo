'use strict';
const faker = require('faker');
module.exports = {
  up: (queryInterface, Sequelize) => {
  
      let alumnos =
        Array.from({ length: 10 }, () => ({
          nombre: faker.name.firstName(),
          apellido: faker.name.lastName(),
          dni: faker.datatype.number( {min:30000000, max:39999999} ),
        }));
      return queryInterface.bulkInsert('alumnos',alumnos, {});
    
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('alumnos', null, {});// null borra todo si se cambia por un campo se borra solo ese campo se pone {nombre:"juan"}
  }
};
