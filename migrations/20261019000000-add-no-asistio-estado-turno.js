'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Turnos', 'estado', {
      type: Sequelize.ENUM('RESERVADO', 'CANCELADO', 'NO_ASISTIO'),
      allowNull: false,
      defaultValue: 'RESERVADO'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      "UPDATE Turnos SET estado = 'RESERVADO' WHERE estado = 'NO_ASISTIO'"
    );

    await queryInterface.changeColumn('Turnos', 'estado', {
      type: Sequelize.ENUM('RESERVADO', 'CANCELADO'),
      allowNull: false,
      defaultValue: 'RESERVADO'
    });
  }
};