'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Disponibilidads', [

      {
        id: 1,
        profesionalId: 1,
        fecha: '2026-09-10',
        hora: '10:00',
        lugar: 'Consultorio 1',
        estado: 'DISPONIBLE',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        profesionalId: 1,
        fecha: '2026-09-10',
        hora: '10:30',
        lugar: 'Consultorio 1',
        estado: 'DISPONIBLE',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        profesionalId: 2,
        fecha: '2026-09-11',
        hora: '09:00',
        lugar: 'Consultorio 3',
        estado: 'DISPONIBLE',
        createdAt: new Date(),
        updatedAt: new Date()
      },


      {
        id: 4,
        profesionalId: 1,
        fecha: '2026-09-15',
        hora: '10:00',
        lugar: 'Consultorio 1',
        estado: 'DISPONIBLE',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        profesionalId: 1,
        fecha: '2026-09-15',
        hora: '11:00',
        lugar: 'Consultorio 1',
        estado: 'DISPONIBLE',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        profesionalId: 2,
        fecha: '2026-09-16',
        hora: '09:00',
        lugar: 'Consultorio 2',
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