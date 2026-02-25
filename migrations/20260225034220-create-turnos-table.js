'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Turnos', {

      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },

      afiliado_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },

      profesional_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },

      disponibilidad_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
      },

      fecha: {
        type: Sequelize.DATE,
        allowNull: false
      },

      estado: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'pendiente'
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }

    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Turnos');
  }
};