'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Turnos', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },

  disponibilidadId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true,
    references: {
      model: 'Disponibilidads',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },

  solicitanteId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'Afiliados',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
  },

  pacienteId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'Afiliados',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
  },

  estado: {
    type: Sequelize.ENUM('RESERVADO', 'CANCELADO'),
    allowNull: false,
    defaultValue: 'RESERVADO'
  },

  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },

  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  }
});

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Turnos');
  }
};