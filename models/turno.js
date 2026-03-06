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
      allowNull: false,
      unique: true
    },

    solicitanteId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    pacienteId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    estado: {
      type: DataTypes.ENUM('RESERVADO', 'CANCELADO'),
      defaultValue: 'RESERVADO'
    }

  }, {
    sequelize,
    modelName: 'Turno',
  });

  return Turno;
};