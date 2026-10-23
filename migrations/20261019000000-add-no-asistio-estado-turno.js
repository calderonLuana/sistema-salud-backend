'use strict';

/**
 * ============================================================
 * FUNCIONALIDAD DE PRUEBA - NO APTA PARA PRODUCCIÓN
 * ============================================================
 * Agrega el estado NO_ASISTIO al ENUM de Turnos.estado, solo para
 * poder visualizar cómo se vería en la aplicación.
 *
 * Esta app es exclusivamente para afiliados: ningún endpoint permite
 * marcar un turno como NO_ASISTIO. En un sistema real, ese estado lo
 * registraría un profesional o la administración desde otra aplicación.
 */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Turnos', 'estado', {
      type: Sequelize.ENUM('RESERVADO', 'CANCELADO', 'NO_ASISTIO'),
      allowNull: false,
      defaultValue: 'RESERVADO'
    });
  },

  async down(queryInterface, Sequelize) {
    // Los NO_ASISTIO pasan a RESERVADO (un turno pasado reservado se muestra
    // como "Completado") para que el cambio de ENUM no falle por datos.
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