'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Quitamos temporalmente la clave foránea
    await queryInterface.removeConstraint(
      'Turnos',
      'turnos_ibfk_1'
    );

    // Quitamos el índice UNIQUE de disponibilidadId
    await queryInterface.removeIndex(
      'Turnos',
      'disponibilidadId'
    );

    // Creamos nuevamente un índice, pero NO UNIQUE
    await queryInterface.addIndex(
      'Turnos',
      ['disponibilidadId'],
      {
        name: 'disponibilidadId'
      }
    );

    // Volvemos a crear la clave foránea
    await queryInterface.addConstraint(
      'Turnos',
      {
        fields: ['disponibilidadId'],
        type: 'foreign key',
        name: 'turnos_ibfk_1',
        references: {
          table: 'Disponibilidads',
          field: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    );
  },

  async down(queryInterface, Sequelize) {
    // Quitamos temporalmente la clave foránea
    await queryInterface.removeConstraint(
      'Turnos',
      'turnos_ibfk_1'
    );

    // Quitamos el índice normal
    await queryInterface.removeIndex(
      'Turnos',
      'disponibilidadId'
    );

    // Volvemos a crear el índice UNIQUE
    await queryInterface.addIndex(
      'Turnos',
      ['disponibilidadId'],
      {
        unique: true,
        name: 'disponibilidadId'
      }
    );

    // Volvemos a crear la clave foránea
    await queryInterface.addConstraint(
      'Turnos',
      {
        fields: ['disponibilidadId'],
        type: 'foreign key',
        name: 'turnos_ibfk_1',
        references: {
          table: 'Disponibilidads',
          field: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    );
  }
};