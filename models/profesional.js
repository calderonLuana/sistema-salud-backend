'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Profesional extends Model {

    static associate(models) {

      // Profesional pertenece a Especialidad
      Profesional.belongsTo(models.Especialidad, {
        foreignKey: 'especialidadId'
      });

      // Profesional 1 ─── N Disponibilidad
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