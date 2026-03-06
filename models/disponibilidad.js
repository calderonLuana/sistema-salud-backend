'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Disponibilidad extends Model {

    static associate(models) {

      Disponibilidad.belongsTo(models.Profesional, {
        foreignKey: 'profesionalId'
      });

      Disponibilidad.hasOne(models.Turno, {
        foreignKey: 'disponibilidadId'
      });

    }

  }

  Disponibilidad.init({
    profesionalId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },

    hora: {
      type: DataTypes.TIME,
      allowNull: false
    },

    lugar: {
      type: DataTypes.STRING,
      allowNull: false
    },

    estado: {
      type: DataTypes.ENUM('DISPONIBLE', 'RESERVADA'),
      defaultValue: 'DISPONIBLE'
    }

  }, {
    sequelize,
    modelName: 'Disponibilidad',
  });

  return Disponibilidad;
};