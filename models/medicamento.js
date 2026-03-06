'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Medicamento extends Model {

    static associate(models) {

      Medicamento.hasMany(models.Receta, {
        foreignKey: 'medicamentoId'
      });

    }

  }

  Medicamento.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }

  }, {
    sequelize,
    modelName: 'Medicamento',
  });

  return Medicamento;
};