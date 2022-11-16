'use strict';
const faker = require('faker');
module.exports = {
  up: (queryInterface, Sequelize) => {
  
      let profesores =
        Array.from({ length: 10 }, () => ({
          nombre: faker.name.firstName(),
          apellido: faker.name.lastName(),
          dni: faker.datatype.number( {min:20000000, max:29999999} ),
        }));
      return queryInterface.bulkInsert('profesors',profesores, {});
    
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('profesors', null, {});// null borra todo si se cambia por un campo se borra solo ese campo se pone {nombre:"juan"}
  }
};
