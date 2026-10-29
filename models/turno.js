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

    // NO_ASISTIO: solo para pruebas
    // en un sistema real lo registra administracion 
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