'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Profesionals', [

      {
        id: 1,
        nombre: 'Carlos',
        apellido: 'Lopez',
        especialidadId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        id: 2,
        nombre: 'Laura',
        apellido: 'Garcia',
        especialidadId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }

    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Profesionals', null, {});
  }
};