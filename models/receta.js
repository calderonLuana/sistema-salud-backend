'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Receta extends Model {

    static associate(models) {

      // Relación con Medicamento
      Receta.belongsTo(models.Medicamento, {
        foreignKey: 'medicamentoId'
      });

      // Relación con Afiliado (solicitante)
      Receta.belongsTo(models.Afiliado, {
        foreignKey: 'solicitanteId',
        as: 'solicitante'
      });

      // Relación con Afiliado (paciente)
      Receta.belongsTo(models.Afiliado, {
        foreignKey: 'pacienteId',
        as: 'paciente'
      });

    }

  }

  Receta.init({

    solicitanteId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    pacienteId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    medicamentoId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    presentacion: {
      type: DataTypes.STRING,
      allowNull: false
    },

    cantidadComprimidos: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    observaciones: {
      type: DataTypes.TEXT,
      allowNull: true
    },

    estado: {
      type: DataTypes.ENUM('PENDIENTE', 'APROBADA', 'RECHAZADA'),
      defaultValue: 'PENDIENTE'
    },

    fechaSolicitud: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }

  }, {
    sequelize,
    modelName: 'Receta',
  });

  return Receta;
};