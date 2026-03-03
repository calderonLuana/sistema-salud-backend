'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Afiliados', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      grupoFamiliarId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'GrupoFamiliars',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      dni: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },

      nombre: {
        type: Sequelize.STRING,
        allowNull: false
      },

      apellido: {
        type: Sequelize.STRING,
        allowNull: false
      },

      fechaNacimiento: {
        type: Sequelize.DATE,
        allowNull: false
      },

      tipoAfiliado: {
        type: Sequelize.ENUM('TITULAR', 'CONYUGE', 'HIJO'),
        allowNull: false
      },

      estado: {
        type: Sequelize.ENUM('ACTIVO', 'INACTIVO'),
        allowNull: false,
        defaultValue: 'ACTIVO'
      },

      registrado: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },

      password: {
        type: Sequelize.STRING,
        allowNull: true
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
    await queryInterface.dropTable('Afiliados');
  }
};