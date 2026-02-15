'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Afiliados', 'grupo_familiar_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'GrupoFamiliars',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Afiliados', 'grupo_familiar_id');
  }
};