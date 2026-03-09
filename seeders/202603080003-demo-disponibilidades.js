'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Disponibilidads', [

      {
        id: 1,
        profesionalId: 1,
        fecha: '2026-03-20',
        hora: '10:00',
        lugar: 'Consultorio 1',
        estado: 'DISPONIBLE',
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        id: 2,
        profesionalId: 1,
        fecha: '2026-03-20',
        hora: '10:30',
        lugar: 'Consultorio 1',
        estado: 'DISPONIBLE',
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        id: 3,
        profesionalId: 2,
        fecha: '2026-03-21',
        hora: '09:00',
        lugar: 'Consultorio 3',
        estado: 'DISPONIBLE',
        createdAt: new Date(),
        updatedAt: new Date()
      }

    ]);

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Disponibilidads', null, {});
  }
};