  'use strict';
  const {
  Model
  } = require('sequelize');
  module.exports = (sequelize, DataTypes) => {
  class Disponibilidad extends Model {
  static associate(models) {
  Disponibilidad.belongsTo(models.Profesional, {
  foreignKey: "profesional_id"
  });

  Disponibilidad.hasMany(models.Turno, {
  foreignKey: 'disponibilidad_id'
  });
  }
  }
  Disponibilidad.init({
  profesional_id: DataTypes.INTEGER,
  fecha: DataTypes.DATE,
  horario: DataTypes.STRING,
  ubicacion: DataTypes.STRING
  
  }, {
  sequelize,
  modelName: 'Disponibilidad',
  });
  return Disponibilidad;
  };