'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Recetas', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
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

  medicamentoId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'Medicamentos',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
  },

  presentacion: {
    type: Sequelize.STRING,
    allowNull: false
  },

  cantidadComprimidos: {
    type: Sequelize.INTEGER,
    allowNull: false
  },

  cantidad: {
    type: Sequelize.INTEGER,
    allowNull: false
  },

  observaciones: {
    type: Sequelize.TEXT,
    allowNull: true
  },

  estado: {
    type: Sequelize.ENUM('PENDIENTE', 'APROBADA', 'RECHAZADA'),
    allowNull: false,
    defaultValue: 'PENDIENTE'
  },

  fechaSolicitud: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
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
    await queryInterface.dropTable('Receta');
  }
};