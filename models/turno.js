'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Turno extends Model {

    static associate(models) {

      Turno.belongsTo(models.Disponibilidad, {
        foreignKey: 'disponibilidadId'
      });

      Turno.belongsTo(models.Afiliado, {
        foreignKey: 'solicitanteId',
        as: 'solicitante'
      });

      Turno.belongsTo(models.Afiliado, {
        foreignKey: 'pacienteId',
        as: 'paciente'
      });

    }

  }

  Turno.init({
    
   disponibilidadId: {
  type: DataTypes.INTEGER,
  allowNull: false
},
    solicitanteId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    pacienteId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    // NO_ASISTIO: FUNCIONALIDAD DE PRUEBA - NO APTA PARA PRODUCCIÓN.
    // Ningún endpoint de esta app lo asigna (la app es solo para afiliados);
    // en un sistema real lo registraría un profesional o la administración.
    estado: {
      type: DataTypes.ENUM('RESERVADO', 'CANCELADO', 'NO_ASISTIO'),
      defaultValue: 'RESERVADO'
    }

  }, {
    sequelize,
    modelName: 'Turno',
  });

  return Turno;
};