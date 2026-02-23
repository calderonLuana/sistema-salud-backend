'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Profesional extends Model {

    static associate(models) {

      Profesional.belongsTo(models.Especialidad, {
        foreignKey: 'especialidad_id',
        as: 'especialidad'
      });

      Profesional.hasMany(models.Disponibilidad, {
        foreignKey: 'profesional_id',
        as: 'disponibilidades'
      });

      Profesional.hasMany(models.Turno, {
        foreignKey: 'profesional_id',
        as: 'turnos'
      });

    }

  }

  Profesional.init({

    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },

    matricula: {
      type: DataTypes.STRING,
      allowNull: false
    },

    especialidad_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }

  }, {

    sequelize,

    modelName: 'Profesional',

    tableName: 'Profesionales', 

    timestamps: true 

  });

  return Profesional;

};