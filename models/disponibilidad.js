'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Disponibilidad extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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