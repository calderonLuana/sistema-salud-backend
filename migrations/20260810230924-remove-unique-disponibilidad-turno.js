'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      'Turnos',
      'turnos_ibfk_1'
    );

    
    await queryInterface.removeIndex(
      'Turnos',
      'disponibilidadId'
    );

    await queryInterface.addIndex(
      'Turnos',
      ['disponibilidadId'],
      {
        name: 'disponibilidadId'
      }
    );

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
    await queryInterface.removeConstraint(
      'Turnos',
      'turnos_ibfk_1'
    );

    await queryInterface.removeIndex(
      'Turnos',
      'disponibilidadId'
    );

    await queryInterface.addIndex(
      'Turnos',
      ['disponibilidadId'],
      {
        unique: true,
        name: 'disponibilidadId'
      }
    );

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