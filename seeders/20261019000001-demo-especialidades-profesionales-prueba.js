'use strict';

const { QueryTypes } = require('sequelize');

/**
 * DATOS DE PRUEBA - NO APTOS PARA PRODUCCIÓN
 * Más especialidades y profesionales para probar el buscador y el formulario
 * de solicitud de turnos.
 */

// Las mismas tres sedes de prueba que usa el seeder 20261018000001
const SEDES = [
  'Sede Almagro - Av. Corrientes 3500, CABA',
  'Sede Belgrano - Av. Cabildo 2000, CABA',
  'Sede Morón - 9 de Julio 800, Morón (Provincia)'
];

const ESPECIALIDADES_NUEVAS = ['Dermatologia', 'Traumatologia', 'Oftalmologia'];

// El orden importa: determina en qué sede atiende cada profesional cada día.
// Con este orden, el Dr. Gomez atiende el 19/11 en la sede de Morón.
// Cardiologia ya existe (especialidad 3) pero no tenía profesionales.
const PROFESIONALES_NUEVOS = [
  { nombre: 'Pablo', apellido: 'Gomez', especialidad: 'Dermatologia' },
  { nombre: 'Martin', apellido: 'Echeverria', especialidad: 'Cardiologia' },
  { nombre: 'Ana', apellido: 'Fernandez', especialidad: 'Traumatologia' },
  { nombre: 'Sofia', apellido: 'Ruiz', especialidad: 'Oftalmologia' }
];

const FECHAS = [
  '2026-11-05', '2026-11-12', '2026-11-19',
  '2026-11-26', '2026-12-03', '2026-12-10'
];

const HORARIOS = ['09:20', '10:40', '16:00'];

async function buscarUno(queryInterface, sql, replacements) {
  const filas = await queryInterface.sequelize.query(sql, {
    replacements,
    type: QueryTypes.SELECT
  });

  return filas.length > 0 ? filas[0] : null;
}

module.exports = {
  async up(queryInterface) {
    const ahora = new Date();

    // 1) Especialidades nuevas (solo si no existen)
    for (const nombre of ESPECIALIDADES_NUEVAS) {
      const existente = await buscarUno(
        queryInterface,
        'SELECT id FROM Especialidads WHERE nombre = :nombre',
        { nombre }
      );

      if (!existente) {
        await queryInterface.bulkInsert('Especialidads', [
          { nombre, createdAt: ahora, updatedAt: ahora }
        ]);
      }
    }

    // 2) Profesionales y 3) sus disponibilidades
    for (let k = 0; k < PROFESIONALES_NUEVOS.length; k++) {
      const { nombre, apellido, especialidad } = PROFESIONALES_NUEVOS[k];

      const esp = await buscarUno(
        queryInterface,
        'SELECT id FROM Especialidads WHERE nombre = :especialidad',
        { especialidad }
      );

      if (!esp) {
        throw new Error(`No existe la especialidad ${especialidad}`);
      }

      let prof = await buscarUno(
        queryInterface,
        'SELECT id FROM Profesionals WHERE nombre = :nombre AND apellido = :apellido',
        { nombre, apellido }
      );

      if (!prof) {
        await queryInterface.bulkInsert('Profesionals', [
          { nombre, apellido, especialidadId: esp.id, createdAt: ahora, updatedAt: ahora }
        ]);

        prof = await buscarUno(
          queryInterface,
          'SELECT id FROM Profesionals WHERE nombre = :nombre AND apellido = :apellido',
          { nombre, apellido }
        );
      }

      // Si el profesional ya tiene horarios, no se vuelven a cargar
      const conHorarios = await buscarUno(
        queryInterface,
        'SELECT id FROM Disponibilidads WHERE profesionalId = :id LIMIT 1',
        { id: prof.id }
      );

      if (conHorarios) {
        continue;
      }

      const filas = [];

      FECHAS.forEach((fecha, indiceFecha) => {
        // Un profesional atiende en una sola sede por día
        const lugar = SEDES[(indiceFecha + k) % SEDES.length];

        HORARIOS.forEach((hora) => {
          filas.push({
            profesionalId: prof.id,
            fecha,
            hora,
            lugar,
            estado: 'DISPONIBLE',
            createdAt: ahora,
            updatedAt: ahora
          });
        });
      });

      await queryInterface.bulkInsert('Disponibilidads', filas);
    }
  },

  async down(queryInterface) {
    // Solo borra lo que este seeder creó y nadie usa todavía:
    // Disponibilidad -> Turno tiene ON DELETE CASCADE, así que no se
    // borran horarios que ya tengan turnos.
    for (const { nombre, apellido } of PROFESIONALES_NUEVOS) {
      const prof = await buscarUno(
        queryInterface,
        'SELECT id FROM Profesionals WHERE nombre = :nombre AND apellido = :apellido',
        { nombre, apellido }
      );

      if (!prof) continue;

      await queryInterface.sequelize.query(
        `DELETE FROM Disponibilidads
         WHERE profesionalId = :id
         AND id NOT IN (SELECT disponibilidadId FROM Turnos)`,
        { replacements: { id: prof.id } }
      );

      await queryInterface.sequelize.query(
        `DELETE FROM Profesionals
         WHERE id = :id
         AND NOT EXISTS (
           SELECT 1 FROM Disponibilidads WHERE profesionalId = :id
         )`,
        { replacements: { id: prof.id } }
      );
    }

    for (const nombre of ESPECIALIDADES_NUEVAS) {
      await queryInterface.sequelize.query(
        `DELETE FROM Especialidads
         WHERE nombre = :nombre
         AND NOT EXISTS (
           SELECT 1 FROM Profesionals WHERE especialidadId = Especialidads.id
         )`,
        { replacements: { nombre } }
      );
    }
  }
};