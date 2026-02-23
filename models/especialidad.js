  'use strict';
  const {
    Model
  } = require('sequelize');
  module.exports = (sequelize, DataTypes) => {
    class Especialidad extends Model {
      static associate(models) {
  Especialidad.hasMany(models.Profesional, {
    foreignKey: 'especialidad_id'
  });    }
    }
    Especialidad.init({
      nombre: DataTypes.STRING
    }, {
      sequelize,
      modelName: 'Especialidad',
    });
    return Especialidad;
  };