'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Medicamentos', [
      {
        nombre: 'Paracetamol',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Ibuprofeno',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Amoxicilina',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Medicamentos', null, {});

  }
};