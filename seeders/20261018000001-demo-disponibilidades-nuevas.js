'use strict';

const SEDES = [
  'Sede Almagro - Av. Corrientes 3500, CABA',
  'Sede Belgrano - Av. Cabildo 2000, CABA',
  'Sede Morón - 9 de Julio 800, Morón (Provincia)'
];

const PROFESIONALES = [1, 2];

const FECHAS = [
  '2026-11-03', '2026-11-04', '2026-11-05',
  '2026-11-10', '2026-11-11', '2026-11-12',
  '2026-11-17', '2026-11-18', '2026-11-19'
];

const HORARIOS = ['09:00', '10:40', '15:00', '16:20'];

module.exports = {
  async up(queryInterface) {

    const [existentes] = await queryInterface.sequelize.query(
      'SELECT COUNT(*) AS total FROM Disponibilidads WHERE lugar IN (:sedes)',
      { replacements: { sedes: SEDES } }
    );

    if (Number(existentes[0].total) > 0) {
      console.log('Las disponibilidades de las tres sedes ya existen, no se agrega nada.');
      return;
    }

    const ahora = new Date();
    const filas = [];

    PROFESIONALES.forEach((profesionalId, indiceProfesional) => {
      FECHAS.forEach((fecha, indiceFecha) => {

        // Un profesional atiende en una sola sede por día
        const lugar = SEDES[(indiceFecha + indiceProfesional) % SEDES.length];

        HORARIOS.forEach((hora) => {
          filas.push({
            profesionalId,
            fecha,
            hora,
            lugar,
            estado: 'DISPONIBLE',
            createdAt: ahora,
            updatedAt: ahora
          });
        });
      });
    });

    await queryInterface.bulkInsert('Disponibilidads', filas);
  },

  async down(queryInterface) {

    await queryInterface.sequelize.query(
      `DELETE FROM Disponibilidads
       WHERE lugar IN (:sedes)
       AND fecha >= '2026-11-01'
       AND id NOT IN (SELECT disponibilidadId FROM Turnos)`,
      { replacements: { sedes: SEDES } }
    );
  }
};