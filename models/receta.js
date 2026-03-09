'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Receta extends Model {
    static associate(models) {

      Receta.belongsTo(models.Afiliado, {
        foreignKey: 'solicitanteId',
        as: 'solicitante'
      });

      Receta.belongsTo(models.Afiliado, {
        foreignKey: 'pacienteId',
        as: 'paciente'
      });

      Receta.belongsTo(models.Medicamento, {
        foreignKey: 'medicamentoId',
        as: 'medicamento'
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
      type: DataTypes.TEXT
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
    tableName: 'recetas'
  });

  return Receta;
};