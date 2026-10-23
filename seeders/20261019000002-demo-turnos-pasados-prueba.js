'use strict';

const { QueryTypes } = require('sequelize');

/**
 * ============================================================
 * FUNCIONALIDAD DE PRUEBA - NO APTA PARA PRODUCCIÓN
 * ============================================================
 * Crea turnos pasados, algunos con estado NO_ASISTIO, solo para ver cómo se
 * muestran "Completado" y "No asistió" en "Turnos anteriores".
 *
 * Esta app es exclusivamente para afiliados: ningún endpoint permite marcar
 * un turno como NO_ASISTIO. En un sistema real lo registraría un profesional
 * o la administración desde otra aplicación.
 *
 * Los datos que crea están identificados por profesional, fecha, hora y sede,
 * y el "down" borra únicamente esos.
 */

const SEDES = [
  'Sede Almagro - Av. Corrientes 3500, CABA',
  'Sede Belgrano - Av. Cabildo 2000, CABA',
  'Sede Morón - 9 de Julio 800, Morón (Provincia)'
];

const HORARIOS_PASADOS = [
  { profesionalId: 1, fecha: '2026-08-12', hora: '09:00', lugar: SEDES[0] },
  { profesionalId: 1, fecha: '2026-09-03', hora: '15:00', lugar: SEDES[2] },
  { profesionalId: 2, fecha: '2026-08-26', hora: '10:40', lugar: SEDES[1] },
  { profesionalId: 2, fecha: '2026-09-17', hora: '16:20', lugar: SEDES[0] }
];

// "horario" es la posición dentro de HORARIOS_PASADOS
const TURNOS_DE_PRUEBA = [
  { horario: 0, pacienteId: 1, estado: 'RESERVADO' },   // Juan: se muestra "Completado"
  { horario: 1, pacienteId: 1, estado: 'NO_ASISTIO' },  // Juan: "No asistió"
  { horario: 2, pacienteId: 3, estado: 'RESERVADO' },   // Pedro: se muestra "Completado"
  { horario: 3, pacienteId: 3, estado: 'NO_ASISTIO' }   // Pedro: "No asistió"
];

// Devuelve el id de cada horario de prueba (null si todavía no existe)
async function buscarIds(queryInterface) {
  const ids = [];

  for (const horario of HORARIOS_PASADOS) {
    const filas = await queryInterface.sequelize.query(
      `SELECT id FROM Disponibilidads
       WHERE profesionalId = :profesionalId
       AND fecha = :fecha
       AND hora = :hora
       AND lugar = :lugar`,
      { replacements: horario, type: QueryTypes.SELECT }
    );

    ids.push(filas.length > 0 ? filas[0].id : null);
  }

  return ids;
}

module.exports = {
  async up(queryInterface) {

    // Guarda: si ya se cargaron, no se vuelve a insertar
    const existentes = await buscarIds(queryInterface);

    if (existentes.some((id) => id !== null)) {
      console.log('Los turnos pasados de prueba ya existen, no se agrega nada.');
      return;
    }

    const ahora = new Date();

    await queryInterface.bulkInsert(
      'Disponibilidads',
      HORARIOS_PASADOS.map((horario) => ({
        ...horario,
        estado: 'RESERVADA',
        createdAt: ahora,
        updatedAt: ahora
      }))
    );

    const ids = await buscarIds(queryInterface);

    await queryInterface.bulkInsert(
      'Turnos',
      TURNOS_DE_PRUEBA.map((turno) => ({
        disponibilidadId: ids[turno.horario],
        solicitanteId: 1,
        pacienteId: turno.pacienteId,
        estado: turno.estado,
        createdAt: ahora,
        updatedAt: ahora
      }))
    );
  },

  async down(queryInterface) {
    const ids = (await buscarIds(queryInterface)).filter((id) => id !== null);

    if (ids.length === 0) {
      return;
    }

    await queryInterface.sequelize.query(
      'DELETE FROM Turnos WHERE disponibilidadId IN (:ids)',
      { replacements: { ids } }
    );

    await queryInterface.sequelize.query(
      'DELETE FROM Disponibilidads WHERE id IN (:ids)',
      { replacements: { ids } }
    );
  }
};