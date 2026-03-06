'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Profesional extends Model {

    static associate(models) {

      Profesional.belongsTo(models.Especialidad, {
        foreignKey: 'especialidadId'
      });

      Profesional.hasMany(models.Disponibilidad, {
        foreignKey: 'profesionalId'
      });

    }

  }

  Profesional.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },

    apellido: {
      type: DataTypes.STRING,
      allowNull: false
    },

    especialidadId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }

  }, {
    sequelize,
    modelName: 'Profesional',
  });

  return Profesional;
};