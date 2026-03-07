'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('GrupoFamiliars', [
      {
        id: 1,
        numeroGrupo: 1001,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

    await queryInterface.bulkInsert('Afiliados', [

      {
        nombre: "Juan",
        apellido: "Perez",
        dni: "30123456",
        fechaNacimiento: new Date("1985-05-10"),
        tipoAfiliado: "TITULAR",
        estado: "ACTIVO",
        registrado: false,
        password: null,
        grupoFamiliarId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        nombre: "Maria",
        apellido: "Perez",
        dni: "30999888",
        fechaNacimiento: new Date("1987-08-15"),
        tipoAfiliado: "CONYUGE",
        estado: "ACTIVO",
        registrado: false,
        password: null,
        grupoFamiliarId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        nombre: "Pedro",
        apellido: "Perez",
        dni: "45111222",
        fechaNacimiento: new Date("2010-03-01"),
        tipoAfiliado: "HIJO",
        estado: "ACTIVO",
        registrado: false,
        password: null,
        grupoFamiliarId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }

    ]);

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Afiliados', null, {});
    await queryInterface.bulkDelete('GrupoFamiliars', null, {});
  }
};